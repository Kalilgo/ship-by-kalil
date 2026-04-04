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
  image?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'FinanzasArgy',
    description:
      'Plataforma financiera líder en Argentina con +298K seguidores. Cotizaciones del dólar, criptomonedas, bonos y noticias financieras en tiempo real. +50K visitas mensuales.',
    tags: ['Next.js', 'React', 'Tailwind', 'Vercel'],
    type: 'Freelance',
    year: '2020',
    featured: true,
    demoUrl: 'https://www.finanzasargy.com/',
    image: '📈',
  },
  {
    id: 2,
    title: 'PropI',
    description:
      'Sistema inmobiliario completo con gestión de propiedades, clientes, alquileres y ventas. Panel administrativo con métricas y reportes automáticos.',
    tags: ['React', '.NET', 'SQL Server', 'AWS'],
    type: 'Freelance',
    year: '2024',
    featured: true,
    demoUrl: 'https://app.somospropi.com/',
    image: '🏠',
  },
  {
    id: 3,
    title: 'Landing Page Astro',
    description:
      'Landing page de alto rendimiento para empresa tecnológica. Optimizada para SEO con load time inferior a 1 segundo y diseño responsivo.',
    tags: ['Astro', 'React', 'Tailwind', 'TypeScript'],
    type: 'Freelance',
    year: '2025',
    featured: true,
    image: '🚀',
  },
  {
    id: 4,
    title: 'E-commerce Platform',
    description:
      'Tienda online completa con panel de administración, pasarela de pagos, gestión de inventario y estadísticas de ventas.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    type: 'Personal',
    year: '2023',
    featured: false,
    image: '🛒',
  },
  {
    id: 5,
    title: 'Dashboard Financiero',
    description:
      'Dashboard interactivo para visualización de datos financieros con gráficos en tiempo real y exportación de reportes.',
    tags: ['React', 'D3.js', 'Python', 'AWS'],
    type: 'Freelance',
    year: '2024',
    featured: false,
    image: '📊',
  },
];
