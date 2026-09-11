export interface Project {
  name: string;
  description: string;
  image: string | null;

  link?: string;
}

// Live demos are built into public/demos by `npm run build:demos`,
// which also takes the thumbnails in public/images/demos.
export const projects: Project[] = [
  {
    name: 'Photography Studio',
    description:
      'A dark, editorial site for photographers and videographers. Portfolio with filters and a full screen viewer, private client galleries opened with a code, and packages that lead straight to an enquiry.',
    image: '/images/demos/photography.webp',
    link: '/demos/photography/',
  },
  {
    name: 'Food and Product Sellers',
    description:
      'For home kitchens, cafes and snack brands. A menu and a shop with search filters, opening hours that update themselves, and a basket that sends the order to WhatsApp.',
    image: '/images/demos/food.webp',
    link: '/demos/food/',
  },
  {
    name: 'Maintenance Services',
    description:
      'For aircon, electrical and plumbing businesses. A callout form right on the home page, a page for every trade, clear package prices and a map of the areas covered.',
    image: '/images/demos/maintenance.webp',
    link: '/demos/maintenance/',
  },
  {
    name: 'Event Invitations',
    description:
      'Digital invites for weddings, birthdays and ticketed events. RSVP for each session, directions that open in Waze, a wishes wall, and a place for guests to send a gift or buy a ticket.',
    image: '/images/demos/events.webp',
    link: '/demos/events/',
  },
  {
    name: 'Tuition Centre',
    description:
      'For tuition centres and class providers. A weekly timetable, instructor profiles, and real student sign up and login with a dashboard for their classes.',
    image: '/images/demos/tuition.webp',
    link: '/demos/tuition/',
  },
  {
    name: 'Boutique Hotel',
    description:
      'A calm, upmarket site for a small hotel. Rooms, dining and guest reviews, with a booking window that walks guests through dates, room and details.',
    image: '/images/demos/hotel.webp',
    link: '/demos/hotel/',
  },
  {
    name: 'Property Agency',
    description:
      'For property agents and developers. Featured listings, a room by room walkthrough, market price charts and profiles of the agents.',
    image: '/images/demos/property.webp',
    link: '/demos/property/',
  },
  {
    name: 'Cafe',
    description:
      'A bold, playful site for a coffee bar. Menu, story and location pages, plus a switch that flips the whole site between oat and dairy mode.',
    image: '/images/demos/cafe.webp',
    link: '/demos/cafe/',
  },
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
