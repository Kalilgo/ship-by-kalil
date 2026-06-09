export interface ExperienceItem {
  period: { es: string; en: string };
  role: { es: string; en: string };
  company: { es: string; en: string };
  description: { es: string; en: string };
  tech: string[];
  current: boolean;
}

export const experience: ExperienceItem[] = [
  {
    period: { es: '2024 — Presente', en: '2024 — Present' },
    role: { es: 'Desarrollador Web Full Stack', en: 'Full Stack Web Developer' },
    company: { es: 'Equipo Freelance Independiente', en: 'Independent Freelance Team' },
    description: {
      es: 'Desarrollo de aplicaciones web para el sector financiero e inmobiliario. Trabajo en equipo con metodologías ágiles.',
      en: 'Web application development for the financial and real estate sectors. Teamwork with agile methodologies.',
    },
    tech: ['React', 'Astro', 'C#', '.NET', 'AWS', 'PostgreSQL'],
    current: true,
  },
  {
    period: { es: '2019 — Presente', en: '2019 — Present' },
    role: { es: 'Lic. en Sistemas (en curso)', en: 'Systems Degree (in progress)' },
    company: {
      es: 'Universidad Nacional de General Sarmiento',
      en: 'Universidad Nacional de General Sarmiento',
    },
    description: {
      es: 'Carrera universitaria orientada al desarrollo de software y sistemas de información.',
      en: 'University degree focused on software development and information systems.',
    },
    tech: [],
    current: false,
  },
  {
    period: { es: 'Marzo 2021 — Agosto 2021', en: 'March 2021 — August 2021' },
    role: { es: 'Diplomatura en Programación .NET', en: '.NET Programming Diploma' },
    company: { es: 'Universidad Tecnológica Nacional', en: 'Universidad Tecnológica Nacional' },
    description: {
      es: 'Formación en desarrollo con tecnología .NET Core, C#, MVC y SQL Server.',
      en: 'Training in .NET Core development, C#, MVC, and SQL Server.',
    },
    tech: ['C#', '.NET Core', 'SQL Server'],
    current: false,
  },
];
