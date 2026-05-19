import ElegantCarousel, { SlideData } from './ValuesCarrousel-21sDev/ElegantCarousel';

const slides: SlideData[] = [
  {
    title: 'Familia',
    subtitle: 'SHPE National Convention 2025',
    description:
      'At Stevens SHPE, we are more than a professional organization. We are familia. Every year, we send 25+ sponsored students to the National Convention, connecting them with industry leaders and opportunities that shape their careers.',
    accent: '#16a34a',
    imageUrl: '/about/JoeSimon.jpg',
  },
  {
    title: 'Service',
    subtitle: 'Hoboken Grace Toy Drive',
    description:
      'We give back. Through initiatives like the Hoboken Grace Toy Drive, our members serve the local community with purpose. Great engineers build more than products.',
    accent: '#e63946',
    imageUrl: '/about/Service.jpg',
  },
  {
    title: 'Education',
    subtitle: 'MOCK INTERVIEWS',
    description:
      'From mock interviews to technical workshops, we give our members the tools to compete. Growth does not stop at graduation. It starts here.',
    accent: '#7c3aed',
    imageUrl: '/about/Education.jpg',
  },
  {
    title: 'Resilience',
    subtitle: 'LEADERSHPE X SHPETINA',
    description:
      'Latinos are 9% of the engineering workforce. Latinas, just 2%. We are changing that. We build leaders who do not just break barriers. They redefine what is possible.',
    accent: '#f59e0b',
    imageUrl: '/about/Rescilence.jpg',
  },
];

export default function CarrouselValues() {
  return <ElegantCarousel slides={slides} />;
}

