// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// Files bind-mounted into a container don't emit filesystem events on
// Windows/macOS hosts, so the dev container asks Vite to poll instead.
// Set only by the Docker dev stage — a no-op when running npm run dev locally.
const inDockerDev = process.env.DOCKER_DEV === 'true';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: inDockerDev ? { watch: { usePolling: true, interval: 300 } } : {}
  }
});