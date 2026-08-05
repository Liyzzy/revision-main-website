# Re-Vision Digital — Build Roadmap

Where the site stands, and what's left. Check items off as you go.

_Last reviewed: 5 Aug 2026. Production build passes clean, 5 pages generated._

## Done

- [x] Astro 6 + Tailwind v4 foundation (`npm run build` passes, no errors)
- [x] Design tokens in `src/styles/global.css` (`@theme`) — the Tailwind v4 way
- [x] Light theme (white background, dark text, sage brand accent)
- [x] `Header.astro` — nav from `navigation.ts`, logo, WhatsApp CTA, working mobile menu
- [x] `Footer.astro` — brand block, link columns, socials, copyright
- [x] `MainLayout.astro` — Header + `<main>` + Footer + WhatsApp popup on every page
- [x] Reusable components: `Button.astro`, `Icon.astro`, `ProjectCard.astro`
- [x] Pages: `/` (Hero + Services + How it works + Portfolio teaser), `/about`, `/pricing`, `/projects`, `/contact`
- [x] `Steps.astro` — "How it works" section, content in `src/data/steps.ts`

### Bug-fix pass (done)

- [x] Fixed header no longer overlaps page content (`<main class="pt-16">` in MainLayout)
- [x] Logo restored in `Header.astro` — mobile header no longer has a stranded hamburger
- [x] Mobile menu closes when you tap a link, and reports `aria-expanded`
- [x] WhatsApp number consolidated into ONE constant (`WHATSAPP_NUMBER` in `navigation.ts`)
- [x] Project data consolidated into `src/data/projects.ts` — was duplicated across two pages
- [x] `/projects` no longer renders broken `<img>` tags for images that don't exist
- [x] Pricing table no longer contradicts its own FAQ (Starter is a 1-page site)
- [x] Currency format unified — `RM299/bln` → `RM299/month`
- [x] "WhatsApp Up" typo → "WhatsApp Us"
- [x] `h1` added to `/contact`, `/projects`, `/pricing` (they had none)
- [x] Dead `#` links removed; footer FAQ link points at the real `/pricing#faq` anchor
- [x] Pricing and Projects grids widened from `max-w-3xl` to `max-w-7xl`

---

## Phase 1 — Replace placeholder content

**These are the only things standing between you and a launchable site.**

- [ ] **Real WhatsApp number.** Open `src/navigation.ts`, change `WHATSAPP_NUMBER` on line 8. That one edit updates the header, the floating popup, the hero button, and the contact page. Format: country code + number, no `+`, no spaces (e.g. `601112345678`).
- [ ] **Real project content.** Edit `src/data/projects.ts` — real names, real descriptions. Put screenshots in `public/images/` and set `image: '/images/name.jpg'`. Until then the cards show a tidy "Image coming soon" box, which is fine.
- [x] **Hero image.** Currently `src/assets/images/hero-mockup.svg` — a vector
      laptop/phone mockup in the brand colour. Swap the import on line 10 of
      `index.astro` to change it. Replace with a real screenshot of a site you've
      built once you have one; that's the version that actually sells.
- [ ] **Real social links.** `socialLinks` in `navigation.ts` are still `#`. The footer hides any link set to `#`, so your socials currently don't render at all — fill them in to make them appear.
- [ ] **`about.astro`** — real team story and photos, replacing the placeholder paragraph.

## Phase 2 — SEO and sharing (important for an agency)

Right now sharing your site on WhatsApp or Facebook shows a bare URL with no preview card. Bad look for a company selling websites.

- [ ] `src/config.yaml` defines title templates, Open Graph, Twitter cards and Google Analytics — **and is imported by nothing**. `MainLayout.astro` hardcodes its own meta instead. Wire the config into the layout.
- [ ] Add `site: 'https://yourdomain.my'` to `astro.config.mjs` — required for canonical URLs and a sitemap.
- [ ] Add `@astrojs/sitemap` and a `robots.txt`.
- [ ] Create a real Open Graph image (1200×628) and reference it.

## Phase 3 — Missing pages and sections

Sections worth adding, in rough priority order (from reviewing the AstroWind homepage
and filtering out what only makes sense for a template showcase):

- [ ] **Pricing teaser on the homepage.** RM199/month is your hook and it's currently
      only on `/pricing`. AstroWind has no pricing section because it's free — don't
      inherit that gap.
- [ ] **Final call-to-action.** The homepage currently ends on the portfolio teaser
      with no closing ask.
- [ ] **"What's included" grid.** Different from Services: what's actually in the box
      each month (hosting, updates, WhatsApp button, Google listing). Justifies a
      recurring fee rather than a one-off build.
- [ ] **"Why you need a website"** — alternating image + bullets. Much of your market
      thinks a Facebook page is enough; nothing on the site currently argues otherwise.
- [ ] Team section on the homepage
- [ ] FAQ section on the homepage (or keep it on `/pricing` only — currently it's pricing-only, which is a reasonable choice)
- [ ] `/terms` and `/privacy` — links were removed from the footer until these exist; add them back once written
- [ ] Project detail pages, if you want "View Project" links to work (`ProjectCard` only renders the link when a project has one, so nothing is broken meanwhile)

## Phase 4 — Make it look less like AstroWind

Structurally the site is still AstroWind: centred hero, three equal cards, Inter for everything, same vertical rhythm. The cheapest differentiation is **typography and colour**, not layout.

- [ ] Pick a distinct display typeface for headings, keep Inter for body text
- [ ] Give the brand colour some conviction. `--color-brand-400` is currently `oklch(0.62 0.05 145)` — chroma `0.05` is very close to grey. Raising chroma toward `0.12–0.15` gives the site a personality without going WhatsApp-green.
- [ ] Break the symmetry somewhere: an asymmetric hero, or a services layout that isn't three identical cards

## Phase 5 — Pre-launch checklist

- [ ] **Colour contrast on buttons.** White text on `brand-400` (`#748F74`) is
      3.55:1 against white — below the 4.5:1 WCAG minimum for text that size.
      Affects the WhatsApp CTA in `Header.astro`, the `primary` variant in
      `Button.astro`, and the number badges in `Steps.astro`. Moving those to
      `brand-500` (4.73:1) fixes it and barely changes the look. The hero
      headline highlight already uses `brand-500` for this reason.
- [ ] Test every nav link, button, and the mobile menu end to end
- [ ] Lighthouse run in Chrome DevTools once content is real
- [ ] Deploy (Netlify or Vercel, both one-click for Astro)
- [ ] Delete `tailwind.config.mjs` — it's dead code, Tailwind v4 reads `@theme` from `global.css`

## Later / optional

- [ ] Blog for SEO (`config.yaml` already has a blog section defined, unused)
- [ ] Bilingual English / Bahasa Malaysia. **Note:** the site currently mixes both inconsistently in places — pick one as the default and be consistent until you build real i18n.
- [ ] Testimonials section — build it, but leave it OFF the site until you have two
      real quotes from real Sabah businesses. Never invent them.
- [ ] Stats bar — AstroWind has one, but theirs is an admitted joke ("huge fake
      numbers"). With zero clients, a stats bar reads as dishonest. Revisit later.
- [ ] Google Analytics (`config.yaml` has `id: null`)

---

**Suggested order:** Phase 1 first — it's pure content entry and it's what makes the site launchable. Phase 2 is the highest-value engineering work after that.
