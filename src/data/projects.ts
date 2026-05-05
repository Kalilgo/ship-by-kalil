export interface Project {
  id: number;
  title: string;
  description: { es: string; en: string };
  /** Detalle de alcance / entregas (cara trasera de la tarjeta). */
  whatWasDone: { es: string; en: string };
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
    whatWasDone: {
      es: 'Diseñé y desarrollé la página web desde cero, a partir de los requerimientos iniciales del cliente. A lo largo del proyecto, implementé mejoras visuales y funcionales de forma iterativa, incorporando nuevas secciones y ajustes según las necesidades que fueron surgiendo, hasta lograr un resultado final alineado con la identidad y los objetivos del negocio.',
      en: 'I designed and built the landing from the client’s initial brief. Over the project I iterated on visual and functional improvements—new sections and refinements as needs evolved—delivering a final result aligned with the brand and business goals.',
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
      es: 'Plataforma financiera líder en Argentina con más de 298K seguidores. Muestra cotizaciones del dólar, criptomonedas, bonos y noticias financieras en tiempo real. Actualización automática cada 5 minutos con más de 50K visitas mensuales.',
      en: 'Leading financial platform in Argentina with more than 298K followers. Shows dollar, cryptocurrency, bonds and financial news in real time.',
    },
    whatWasDone: {
      es: 'Trabajé en el desarrollo de nuevas features solicitadas por el cliente, ampliando las capacidades funcionales de la plataforma. Lideré la migración completa de infraestructura desde Vercel y Railway hacia AWS, mejorando la escalabilidad, el rendimiento y la confiabilidad del sistema. También implementé nuevos módulos y me encargué del mantenimiento continuo, asegurando la estabilidad operativa de la aplicación.',
      en: 'I shipped new features requested by the client, extending what the platform could do. I led a full infrastructure migration from Vercel and Railway to AWS for better scalability, performance, and reliability. I also built new modules and handled ongoing maintenance to keep the app running smoothly.',
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
      es: 'Sistema inmobiliario completo con gestión de propiedades, clientes, alquileres y ventas. Panel de administración con métricas y reportes automáticos.',
      en: 'Complete real estate system with property, client, rental and sales management. Administration panel with metrics and automatic reports.',
    },
    whatWasDone: {
      es: 'Desarrollé e implementé nuevas funcionalidades a medida según los requerimientos del cliente, adaptando la plataforma a las necesidades reales de sus usuarios. Paralelamente, llevé a cabo mejoras continuas de UI/UX para optimizar la experiencia de navegación, logrando interfaces más intuitivas, limpias y fáciles de usar.',
      en: 'I developed and implemented custom features to match the client’s requirements, shaping the product around real user needs. In parallel, I kept improving UI/UX so navigation felt clearer, cleaner, and easier to use.',
    },
    tags: ['React', '.NET', 'SQL Server', 'AWS'],
    type: 'Freelance',
    year: '2024',
    featured: true,
    demoUrl: 'https://somospropi.com/',
    image: '🏠',
    previewImage: '/projects/propi-preview.png',
  },
];
