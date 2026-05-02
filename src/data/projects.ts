export interface Project {
  id: number;
  title: string;
  description: { es: string; en: string };
  tags: string[];
  type: 'Freelance' | 'Personal' | 'Trabajo';
  year: string;
  featured: boolean;
  /** Emoji or short visual label shown on the project card */
  image?: string;
  /** Optional real screenshot/preview image (path under /public) */
  previewImage?: string;
  demoUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Cerquetech',
    description: {
      es: 'Landing page de alto rendimiento creada con Astro para una empresa de tecnología. Optimizada para SEO, con load time inferior a 1 segundo y diseño responsivo.',
      en: 'High-performance landing page created with Astro for a technology company. Optimized for SEO, with load time under 1 second and responsive design.',
    },
    tags: ['Astro', 'React', 'Tailwind', 'TypeScript'],
    type: 'Freelance',
    year: '2025',
    featured: true,
    demoUrl: 'https://cerquetech.com/',
    image: '🚀',
    previewImage: '/projects/cerquetech-preview.png',
  },
  {
    id: 2,
    title: 'FinanzasArgy',
    description: {
      es: 'Landing page de alto rendimiento creada con Astro para una empresa de tecnología. Optimizada para SEO, con load time inferior a 1 segundo y diseño responsivo.',
      en: 'High-performance landing page created with Astro for a technology company. Optimized for SEO, with load time under 1 second and responsive design.',
    },
    tags: ['Next.js', 'React', 'Tailwind', 'Vercel'],
    type: 'Freelance',
    year: '2020',
    featured: true,
    demoUrl: 'https://www.finanzasargy.com/',
    image: '📈',
    previewImage: '/projects/finanzasargy-preview.png',
  },
  {
    id: 3,
    title: 'PropI',
    description: {
      es: 'Landing page de alto rendimiento creada con Astro para una empresa de tecnología. Optimizada para SEO, con load time inferior a 1 segundo y diseño responsivo.',
      en: 'High-performance landing page created with Astro for a technology company. Optimized for SEO, with load time under 1 second and responsive design.',
    },
    tags: ['React', '.NET', 'SQL Server', 'AWS'],
    type: 'Freelance',
    year: '2024',
    featured: true,
    demoUrl: 'https://app.somospropi.com/',
    image: '🏠',
    previewImage: '/projects/propi-preview.png',
  },
];
