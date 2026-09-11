/**
 * Builds the demo templates and copies each one into public/demos/<slug>/,
 * so this site hosts every demo itself. One deploy covers everything.
 *
 *   npm run build:demos                   build every demo
 *   npm run build:demos -- cafe hotel     build only these slugs
 *   npm run build:demos -- --shots        also retake the card thumbnails
 *
 * The templates are separate projects kept outside this repo, in
 * "../DEMO WEBS FOR REVIZION" by default. Set DEMOS_DIR to point somewhere else.
 * Thumbnails need Chrome or Edge installed (or CHROME_PATH set).
 */
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const demosDir = path.resolve(root, process.env.DEMOS_DIR ?? '../DEMO WEBS FOR REVIZION');

// folder   template folder inside DEMOS_DIR
// out      build output folder of that template (default dist)
// env      extra environment for the build
// basePath true when the template adds /demos/<slug> itself, so no relocating
// shot     false to keep a hand made thumbnail (headless shots catch the cafe's
//          fade in animation halfway)
const demos = [
  { slug: 'photography', folder: 'Multimedia Photography' },
  { slug: 'food', folder: 'Food and Product Sellers' },
  { slug: 'maintenance', folder: 'Maintainence Services' },
  { slug: 'events', folder: 'Wedding' },
  { slug: 'tuition', folder: 'Class and Tuittion Reg' },
  { slug: 'hotel', folder: 'LUMINA HOTEL/website' },
  { slug: 'property', folder: 'Kinabalu Crest Properties/website' },
  {
    slug: 'cafe',
    folder: 'OAT AND CO/webapp',
    out: 'out',
    env: { NEXT_PUBLIC_BASE_PATH: '/demos/cafe' },
    basePath: true,
    shot: false,
  },
];

const args = process.argv.slice(2);
const takeShots = args.includes('--shots');
const only = args.filter((a) => !a.startsWith('--'));
const selected = only.length ? demos.filter((d) => only.includes(d.slug)) : demos;

if (only.length && selected.length !== only.length) {
  console.error(`Unknown demo. Pick from: ${demos.map((d) => d.slug).join(', ')}`);
  process.exit(1);
}

const failed = [];
const built = [];

for (const demo of selected) {
  const dir = path.join(demosDir, demo.folder);
  const target = path.join(publicDir, 'demos', demo.slug);
  const base = `/demos/${demo.slug}`;
  console.log(`\n=== ${demo.slug}  (${dir})`);

  try {
    if (!fs.existsSync(path.join(dir, 'package.json'))) throw new Error('template folder not found');
    if (!fs.existsSync(path.join(dir, 'node_modules'))) {
      run(fs.existsSync(path.join(dir, 'package-lock.json')) ? 'npm ci' : 'npm install', dir);
    }
    run('npm run build', dir, demo.env);

    const out = path.join(dir, demo.out ?? 'dist');
    if (!fs.existsSync(path.join(out, 'index.html'))) throw new Error(`no index.html in ${out}`);

    fs.rmSync(target, { recursive: true, force: true });
    fs.cpSync(out, target, { recursive: true });

    const changed = demo.basePath ? 0 : relocate(target, base);
    markNoIndex(target);
    console.log(`Copied to public${base}/${changed ? `, ${changed} links pointed at ${base}` : ''}`);
    built.push(demo);
  } catch (err) {
    console.error(`FAILED ${demo.slug}: ${err.message}`);
    failed.push(demo.slug);
  }
}

if (takeShots && built.length) await screenshots(built);

console.log(`\nDone. Built ${built.length} of ${selected.length}.`);
if (failed.length) {
  console.error(`Failed: ${failed.join(', ')}`);
  process.exit(1);
}

function run(command, cwd, env = {}) {
  console.log(`> ${command}`);
  const result = spawnSync(command, { cwd, env: { ...process.env, ...env }, stdio: 'inherit', shell: true });
  if (result.status !== 0) throw new Error(`"${command}" exited with ${result.status}`);
}

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

/**
 * Astro and Vite build for the domain root, so their links look like
 * "/about" or "/img/hero.jpg". Point every such link that matches a real file
 * or folder of the build at the demo folder instead. Checking the file exists
 * keeps unrelated strings in library code (like "/auth/v1") untouched.
 */
function relocate(dir, base) {
  const exists = (p) => {
    const clean = p.split(/[?#]|\$\{/)[0];
    try {
      return clean.length > 1 && fs.existsSync(path.join(dir, decodeURIComponent(clean)));
    } catch {
      return false;
    }
  };
  // A quote (plain or HTML encoded) or CSS url( right before a path.
  const link = /(["'`]|&quot;|&#34;|&#39;|&#x27;|url\(\s*|url=)(\/(?!\/)[^"'`()\s<>,;&\\]*)/g;
  // Links to the demo's own home page, href="/".
  const home = /(\b(?:href|action)=)(["'])\/\2/g;
  // Extra candidates inside srcset="a.jpg 1x, b.jpg 2x".
  const srcset = /(\b(?:image)?srcset=)(["'])(.*?)\2/g;

  let count = 0;
  const prefix = (p) => {
    count++;
    return base + p;
  };

  for (const file of walk(dir)) {
    if (!/\.(html|css|js|mjs|json|txt|xml|svg|webmanifest)$/i.test(file)) continue;
    const before = fs.readFileSync(file, 'utf8');
    // "/#section" is a link to a section of the demo's home page.
    let after = before.replace(link, (m, lead, p) => (exists(p) || p.startsWith('/#') ? lead + prefix(p) : m));
    after = after.replace(home, (m, attr, q) => `${attr}${q}${prefix('/')}${q}`);
    after = after.replace(srcset, (m, attr, q, list) => {
      const fixed = list.replace(/(^|,\s*)(\/(?!\/)[^\s,]+)/g, (mm, sep, p) =>
        p.startsWith(`${base}/`) || !exists(p) ? mm : sep + prefix(p),
      );
      return `${attr}${q}${fixed}${q}`;
    });
    if (after !== before) fs.writeFileSync(file, after);
  }
  return count;
}

/** Demo businesses are made up, so keep them out of search results. */
function markNoIndex(dir) {
  for (const file of walk(dir)) {
    if (!file.endsWith('.html')) continue;
    const html = fs.readFileSync(file, 'utf8');
    if (/<meta[^>]+name=["']?robots/i.test(html)) continue;
    const tagged = html.replace(/<head(\s[^>]*)?>/i, (m) => `${m}<meta name="robots" content="noindex">`);
    if (tagged !== html) fs.writeFileSync(file, tagged);
  }
}

/** Saves a 1280x800 shot of each demo home page to public/images/demos/<slug>.webp */
async function screenshots(list) {
  const browser = findBrowser();
  if (!browser) {
    console.error('\nNo Chrome or Edge found for thumbnails. Set CHROME_PATH and run again with --shots.');
    return;
  }
  const shotsDir = path.join(publicDir, 'images', 'demos');
  fs.mkdirSync(shotsDir, { recursive: true });
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'demo-shots-'));
  const server = await serve(publicDir);
  const { port } = server.address();

  console.log('\n=== thumbnails');
  for (const demo of list.filter((d) => d.shot !== false)) {
    const file = path.join(shotsDir, `${demo.slug}.webp`);
    fs.rmSync(file, { force: true });
    await new Promise((resolve) => {
      const child = spawn(browser, [
        '--headless=new',
        '--disable-gpu',
        '--hide-scrollbars',
        '--no-first-run',
        '--no-default-browser-check',
        '--mute-audio',
        `--user-data-dir=${profile}`,
        '--blink-settings=preferredColorScheme=1', // light mode, whatever the OS uses
        '--force-device-scale-factor=1',
        '--window-size=1280,800',
        '--virtual-time-budget=8000',
        `--screenshot=${file}`,
        `http://127.0.0.1:${port}/demos/${demo.slug}/`,
      ], { stdio: 'ignore', windowsHide: true });
      const timer = setTimeout(() => child.kill(), 90_000);
      child.on('error', resolve);
      child.on('exit', () => {
        clearTimeout(timer);
        resolve();
      });
    });
    console.log(fs.existsSync(file) ? `Saved public/images/demos/${demo.slug}.webp` : `No thumbnail for ${demo.slug}`);
  }
  server.closeAllConnections();
  server.close();
  // The browser can hold on to its temp profile for a moment after exiting.
  fs.rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 500 }, () => {});
}

function findBrowser() {
  const env = process.env;
  const candidates = [
    env.CHROME_PATH,
    `${env['PROGRAMFILES(X86)']}\\Microsoft\\Edge\\Application\\msedge.exe`,
    `${env.PROGRAMFILES}\\Microsoft\\Edge\\Application\\msedge.exe`,
    `${env.PROGRAMFILES}\\Google\\Chrome\\Application\\chrome.exe`,
    `${env['PROGRAMFILES(X86)']}\\Google\\Chrome\\Application\\chrome.exe`,
    `${env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/microsoft-edge',
  ];
  return candidates.find((p) => p && !p.startsWith('undefined') && fs.existsSync(p));
}

/** Tiny static server for the thumbnails, resolving folders the way nginx does. */
function serve(dir) {
  const types = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript',
    '.mjs': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.txt': 'text/plain; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
  };
  const server = http.createServer((req, res) => {
    let file;
    try {
      file = path.join(dir, decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    } catch {
      return res.writeHead(400).end();
    }
    if (!file.startsWith(dir)) return res.writeHead(403).end();
    const found = [file, path.join(file, 'index.html'), `${file}.html`].find(
      (f) => fs.existsSync(f) && fs.statSync(f).isFile(),
    );
    if (!found) return res.writeHead(404).end();
    res.writeHead(200, { 'Content-Type': types[path.extname(found).toLowerCase()] ?? 'application/octet-stream' });
    fs.createReadStream(found).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}
