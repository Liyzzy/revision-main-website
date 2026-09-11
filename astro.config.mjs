// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// Files bind-mounted into a container don't emit filesystem events on
// Windows/macOS hosts, so the dev container asks Vite to poll instead.
// Set only by the Docker dev stage — a no-op when running npm run dev locally.
const inDockerDev = process.env.DOCKER_DEV === 'true';

// The demos in public/demos are plain folders of HTML. nginx serves
// /demos/x/about from /demos/x/about/index.html, but the dev server only
// serves exact file paths, so point those requests at the file. Dev only.
/** @type {import('vite').Plugin} */
const demoFolders = {
  name: 'demo-folders',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      const [pathname, query] = (req.url ?? '').split('?');
      if (pathname.startsWith('/demos/') && !path.extname(pathname)) {
        const file = path.join(server.config.publicDir, pathname);
        const found = [path.join(file, 'index.html'), `${file}.html`].find((f) => fs.existsSync(f));
        if (found) {
          const url = path.relative(server.config.publicDir, found).split(path.sep).join('/');
          req.url = `/${url}${query ? `?${query}` : ''}`;
        }
      }
      next();
    });
  },
};

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss(), demoFolders],
    server: inDockerDev ? { watch: { usePolling: true, interval: 300 } } : {}
  }
});
