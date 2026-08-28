export interface Service {
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    title: 'Website Development',
    description:
      'A fast, mobile-first website your customers can actually find on Google. Online in one to two weeks, built from the photos and details you already have.',
    icon: 'tabler:device-laptop',
  },
  {
    title: 'E-Commerce Solutions',
    description:
      'Take orders and payments online. Customers browse your products, check out, and the order lands straight in your WhatsApp.',
    icon: 'tabler:shopping-cart',
  },
  {
    title: 'Digital Marketing',
    description:
      'Get found by the people already searching for a business like yours in Sabah — Google listing, social profiles, and content that brings them through the door.',
    icon: 'tabler:speakerphone',
  },
  {
    title: 'Maintenance & Support',
    description:
      'Hosting, security updates and content changes are part of the monthly fee. Message us with a new price or a new photo and it gets done — no extra invoice.',
    icon: 'tabler:lifebuoy',
  },
];
