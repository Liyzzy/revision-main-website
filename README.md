# Main Website

The official agency website for our Sabah-based web team. This project is built to showcase our services, pricing, portfolio, and contact flow for local businesses that want to digitize their presence with modern, fast, custom-built websites.

## Overview

Revision Main Website is our main business landing page and portfolio website. It is designed to act as both a public brand presence and a lead-generation tool for potential clients.

The website focuses on:
- Presenting our agency clearly
- Explaining our service packages
- Building trust with local businesses in Sabah
- Making it easy for visitors to contact us through WhatsApp or other channels

## Goals

- Build a professional online presence for our agency
- Show that we can create modern, high-performance websites
- Use the site itself as proof of our design and development quality
- Provide a scalable base for future pages such as portfolio, blog, and service details

## Planned Features

- Hero section with strong call-to-action
- Service and pricing sections
- Portfolio or demo project showcase
- Team introduction
- FAQ section
- WhatsApp contact flow
- Future blog/content section for SEO

## Tech Stack

- [Astro](https://astro.build/) for the website framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- TypeScript support through Astro
- GitHub for version control and collaboration

## Getting Started

Clone the repository first:

```bash
git clone https://github.com/Liyzzy/revision-main-website.git
cd revision-main-website
```

Then pick **one** of the two options below. Docker is the easiest — you don't
need Node.js installed at all.

### Option A — Docker (recommended)

The only prerequisite is [Docker Desktop](https://www.docker.com/products/docker-desktop/)
(Windows/macOS) or Docker Engine + Compose (Linux). From the project folder:

```bash
docker compose up
```

That's it. The first run takes a couple of minutes to build; after that it
starts in seconds. Open:

```bash
http://localhost:8080
```

This builds the real production site and serves it with nginx — exactly what a
visitor would get.

**Working on the code?** Use the dev server instead. It has hot reload, so the
browser updates as soon as you save a file:

```bash
docker compose --profile dev up dev
```

Open http://localhost:4321. Your local files are mounted into the container, so
edit them normally in your editor.

Other useful commands:

```bash
docker compose up -d          # run in the background
docker compose down           # stop and clean up
docker compose up --build     # rebuild after changing dependencies
docker compose logs -f        # follow the logs
```

Notes:

- If port 8080 or 4321 is already taken, change the left-hand number in the
  `ports:` section of `docker-compose.yml` (e.g. `"3000:80"`).
- The dev server watches files by polling (the only reliable way to see edits
  through a Docker mount on Windows/macOS), so the first start takes about
  30 seconds before it prints `ready`. Give it a moment.
- `docker compose up` serves whatever was built into the image. After changing
  source files, re-run with `--build` to see them on port 8080 — or just use the
  dev server, which needs no rebuild.

### Option B — Node.js directly

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

The site will usually be available at:

```bash
http://localhost:4321
```

## Project Structure

```bash
revision-main-website/
├── docker/
│   └── nginx.conf          # web server config for the production image
├── public/
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   └── styles/
├── astro.config.mjs
├── docker-compose.yml      # `docker compose up` entry point
├── Dockerfile              # dev + production images
├── package.json
└── README.md
```

## Current Status

This project is currently in active development. The current focus is building the main homepage layout, styling system, and reusable sections for the agency website.

## Future Improvements

- Add reusable Astro components
- Improve SEO metadata and social previews
- Add portfolio case studies
- Add testimonials
- Add deployment workflow
- Add bilingual support (English / Bahasa Malaysia)

## Team

Built by a Sabah-based student team working on modern websites for local businesses.

## License

This project is currently not licensed for public reuse.