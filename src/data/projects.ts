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
  demoUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Cerquetech Landing Page',
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
  },
  {
    id: 2,
    title: 'FinanzasArgy',
    description: {
      es: 'Plataforma financiera líder en Argentina con más de 298K seguidores. Muestra cotizaciones del dólar, criptomonedas, bonos y noticias financieras en tiempo real. Actualización automática cada 5 minutos con más de 50K visitas mensuales.',
      en: 'Leading financial platform in Argentina with more than 298K followers. Shows dollar, cryptocurrency, bonds and financial news in real time.',
    },
    tags: ['Next.js', 'React', 'Tailwind', 'Vercel'],
    type: 'Freelance',
    year: '2020',
    featured: true,
    demoUrl: 'https://www.finanzasargy.com/',
    image: '📈',
  },
  {
    id: 3,
    title: 'PropI',
    description: {
      es: 'Sistema inmobiliario completo con gestión de propiedades, clientes, alquileres y ventas. Panel de administración con métricas y reportes automáticos.',
      en: 'Complete real estate system with property, client, rental and sales management. Administration panel with metrics and automatic reports.',
    },
    tags: ['React', '.NET', 'SQL Server', 'AWS'],
    type: 'Freelance',
    year: '2024',
    featured: true,
    demoUrl: 'https://app.somospropi.com/',
    image: '🏠',
  },
];
