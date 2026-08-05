/**
 * Single source of truth for portfolio projects.
 *
 * This used to be copy-pasted into BOTH index.astro and projects.astro,
 * which means every edit had to be made twice (and they had already drifted).
 * Now both pages import from here.
 *
 * `image: null` renders a "Coming soon" placeholder box instead of a broken
 * image icon. When you have a real screenshot, drop it in `public/images/`
 * and set `image: '/images/whatever.jpg'`.
 */
export interface Project {
  name: string;
  description: string;
  image: string | null;
  /** Optional link to a case-study page. Leave undefined until those exist. */
  link?: string;
}

export const projects: Project[] = [
  {
    name: 'Project A',
    description: 'A brief description of Project A.',
    image: null,
  },
  {
    name: 'Project B',
    description: 'A brief description of Project B.',
    image: null,
  },
  {
    name: 'Project C',
    description: 'A brief description of Project C.',
    image: null,
  },
];
