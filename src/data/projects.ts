export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  type: 'Freelance' | 'Personal';
  year: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Sistema de Gestión Financiera',
    description:
      'Aplicación web para gestión de créditos y cobranzas para una financiera. Panel de control con métricas en tiempo real, gestión de clientes y generación de reportes.',
    tags: ['React', 'C#', '.NET', 'SQL Server', 'AWS'],
    type: 'Freelance',
    year: '2024',
    featured: true,
  },
  {
    id: 2,
    title: 'Portal Inmobiliario',
    description:
      'Plataforma web para listado y búsqueda de propiedades con filtros avanzados, galería de imágenes y formulario de contacto integrado.',
    tags: ['Astro', 'React', 'PostgreSQL', 'Vercel'],
    type: 'Freelance',
    year: '2024',
    featured: true,
  },
  {
    id: 3,
    title: 'API REST de Inventario',
    description:
      'Backend RESTful para manejo de inventario con autenticación JWT, roles de usuario y documentación automática con Swagger.',
    tags: ['C#', '.NET Core', 'SQL Server', 'Railway'],
    type: 'Personal',
    year: '2023',
    featured: false,
  },
];
