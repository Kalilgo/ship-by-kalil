export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  type: 'Freelance' | 'Personal' | 'Trabajo';
  year: string;
  featured: boolean;
  demoUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Landing Page Astro',
    description:
      'Landing page de alto rendimiento creada con Astro para una empresa de tecnología. Optimizada para SEO, con load time inferior a 1 segundo y diseño responsivo.',
    tags: ['Astro', 'React', 'Tailwind', 'TypeScript'],
    type: 'Freelance',
    year: '2025',
    featured: true,
  },
  {
    id: 2,
    title: 'FinanzasArgy',
    description:
      'Plataforma financiera líder en Argentina con más de 298K seguidores. Muestra cotizaciones del dólar, criptomonedas, bonos y noticias financieras en tiempo real. Actualización automática cada 5 minutos con más de 50K visitas mensuales.',
    tags: ['Next.js', 'React', 'Tailwind', 'Vercel'],
    type: 'Freelance',
    year: '2020',
    featured: true,
    demoUrl: 'https://www.finanzasargy.com/',
  },
  {
    id: 3,
    title: 'PropI',
    description:
      'Sistema inmobiliario completo con gestión de propiedades, clientes, alquileres y ventas. Panel de administración con métricas y reportes automáticos.',
    tags: ['React', '.NET', 'SQL Server', 'AWS'],
    type: 'Freelance',
    year: '2024',
    featured: true,
    demoUrl: 'https://app.somospropi.com/',
  },
];
