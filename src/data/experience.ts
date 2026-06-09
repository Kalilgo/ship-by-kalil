export interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
  tech: string[];
  current: boolean;
}

export const experience: Experience[] = [
  {
    period: '2024 — Presente',
    role: 'Desarrollador Web Full Stack',
    company: 'Equipo Freelance Independiente',
    description:
      'Desarrollo de aplicaciones web para el sector financiero e inmobiliario. Trabajo en equipo con metodologías ágiles.',
    tech: ['React', 'Astro', 'C#', '.NET', 'AWS', 'PostgreSQL'],
    current: true,
  },
  {
    period: '2019 — Presente',
    role: 'Lic. en Sistemas (en curso)',
    company: 'Universidad Nacional de General Sarmiento',
    description:
      'Carrera universitaria orientada al desarrollo de software y sistemas de información.',
    tech: [],
    current: false,
  },
  {
    period: 'Marzo 2021 — Agosto 2021',
    role: 'Diplomatura en Programación .NET',
    company: 'Universidad Tecnológica Nacional',
    description: 'Formación en desarrollo con tecnología .NET Core, C#, MVC y SQL Server.',
    tech: ['C#', '.NET Core', 'SQL Server'],
    current: false,
  },
];
