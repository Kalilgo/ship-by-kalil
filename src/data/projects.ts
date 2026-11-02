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
      es: 'Landing page de alto rendimiento para Cerquetech, desarrollada con SvelteKit, TypeScript y Three.js para reforzar la identidad de marca con una experiencia visual diferenciada.',
      en: 'High-performance landing page for Cerquetech, built with SvelteKit, TypeScript and Three.js to deliver a distinctive, brand-aligned experience.',
    },
    whatWasDone: {
      es: 'Desarrollé la landing desde cero a partir del brief del cliente. Implementé un globo 3D interactivo, animaciones optimizadas, tipografía con Fontsource, formulario de contacto con EmailJS y ajustes iterativos de UX/UI para alinear el sitio con la marca. Desplegado en Vercel.',
      en: 'Built the landing from scratch based on the client brief. Implemented an interactive 3D globe, optimized animations, Fontsource typography, a contact form with EmailJS, and iterative UX/UI refinements to match the brand. Deployed on Vercel.',
    },
    tags: ['TypeScript', 'Vite', 'SvelteKit', 'Tailwind', 'Three.js', 'Bun', 'EmailJS', 'Vercel'],
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
      es: 'Plataforma financiera con foco en cotizaciones del dólar, criptomonedas, bonos y noticias. Actualización automática cada 5 minutos, con gran alcance en Argentina.',
      en: 'Financial platform focused on dollar rates, cryptocurrencies, bonds and news. Auto-updates every 5 minutes with wide reach in Argentina.',
    },
    whatWasDone: {
      es: 'Problema: infraestructura distribuida entre Vercel y Railway con necesidades de mayor escalabilidad y confiabilidad. Solución: lideré la migración completa a AWS (AWS Amplify) y desarrollé nuevas funcionalidades/módulos. Resultado: mayor estabilidad operativa, mejor escalabilidad y base más sólida para seguir creciendo. Mantenimiento continuo de la plataforma.',
      en: 'Problem: split infrastructure across Vercel and Railway needed better scalability and reliability. Solution: led full migration to AWS (AWS Amplify), shipped new features/modules. Result: improved stability, better scalability and a more robust foundation. Ongoing maintenance and support.',
    },
    tags: ['Astro', 'React', 'TypeScript', 'Tailwind', 'DaisyUI', 'Zustand', 'AWS Amplify', 'Bun'],
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
      es: 'Problema: sistema inmobiliario con necesidades de funcionalidades a medida para adaptar flujos reales. Solución: desarrollé e implementé features a medida, junto a mejoras continuas de UI/UX para optimizar la navegación. Resultado: interfaz más intuitiva, flujos más claros y mejor experiencia para el equipo y sus usuarios.',
      en: 'Problem: real estate platform needed custom features to fit real workflows. Solution: developed and implemented custom features alongside continuous UI/UX improvements. Result: cleaner, more intuitive interface with clearer workflows for the team and users.',
    },
    tags: ['React', 'TypeScript', 'Vite', 'MUI', 'Node.js', 'Prisma', 'PostgreSQL', 'AWS Lambda'],
    type: 'Freelance',
    year: '2024',
    featured: true,
    image: '🏠',
    previewImage: '/projects/propi-preview.png',
  },
];
