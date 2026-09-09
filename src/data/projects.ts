export interface Project {
  name: string;
  description: string;
  image: string | null;

  link?: string;
}

export const projects: Project[] = [
  {
    name: 'Medical Clinic',
    description:
      'Built around one job, getting appointments booked. Treatment list, doctor profiles, opening hours, a map, and a booking form that actually works on a phone.',
    image: '/images/clinic-demo.webp',
  },
  {
    name: 'Non-Profit Campaigns',
    description:
      'For an organisation running several programmes at once. Every campaign gets its own page, with impact numbers, volunteer sign-up, and a form that adapts to who is filling it in.',
    image: '/images/ngo-demo.webp',
  },
  {
    name: 'Creative Portfolio',
    description:
      'A single-page site for a freelancer or a small studio. Work, skills and contact all on one scroll. The simplest thing we build and the quickest to get live.',
    image: '/images/portfolio-demo.webp',
  },
];
