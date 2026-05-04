export interface CvExperience {
  period: string;
  role: string;
  company: string;
  description: string;
  highlights: string[];
}

export interface CvEducation {
  degree: string;
  institution: string;
  location: string;
  period: string;
  status: string;
}

export interface CvContent {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  portfolioUrl: string;
  profile: string;
  experience: CvExperience[];
  education: CvEducation[];
  skills: {
    frontend: string[];
    backend: string[];
    cloud: string[];
    tools: string[];
  };
  aptitudes: string[];
  personal: {
    birth: string;
    dni: string;
    nationality: string;
    status: string;
  };
}

export interface CvPageLabels {
  professionalProfile: string;
  professionalExperience: string;
  technicalSkills: string;
  education: string;
  aptitudes: string;
  contact: string;
  personalData: string;
  email: string;
  websitePortfolio: string;
  birthDate: string;
  idDoc: string;
  nationality: string;
  maritalStatus: string;
  skillCategories: Record<keyof CvContent['skills'], string>;
}

export const cvByLocale: Record<'es' | 'en', CvContent> = {
  es: {
    name: 'Matías Kalil Gómez',
    title: 'Desarrollador Web Full Stack',
    location: 'Roque Sáenz Peña 1475, San Miguel, Buenos Aires',
    phone: '+54 9 11 6137-5359',
    email: 'gomezukalil@gmail.com',
    portfolioUrl: 'https://ship-by-kalil.vercel.app/',
    profile: `Desarrollador web Full Stack con experiencia en proyectos freelance de desarrollo de aplicaciones para el sector financiero e inmobiliario. Proactivo, resolutivo y con fuerte capacidad de aprendizaje autónomo. Con conocimiento de herramientas modernas de desarrollo asistido por inteligencia artificial. Orientado a la entrega de soluciones de calidad, con capacidad para el trabajo en equipo y la gestión eficiente de proyectos bajo metodologías ágiles.`,
    experience: [
      {
        period: '2024 – Actualidad',
        role: 'Desarrollador Web Full Stack (Freelance)',
        company: 'Equipo de desarrollo independiente',
        description:
          'Desarrollo de aplicaciones web para empresas del sector financiero e inmobiliario.',
        highlights: [
          'Implementación de interfaces modernas con React y Astro',
          'Desarrollo de APIs y servicios backend con .NET Core',
          'Gestión de bases de datos relacionales con SQL Server y PostgreSQL',
          'Despliegue y administración de infraestructura en AWS, Vercel y Railway',
          'Uso de herramientas de desarrollo asistidas por IA: Cursor y Claude AI',
          'Colaboración en equipo con flujo de trabajo basado en Git y GitHub',
        ],
      },
    ],
    education: [
      {
        degree: 'Licenciatura en Sistemas',
        institution: 'Universidad Nacional de General Sarmiento',
        location: 'Malvinas Argentinas',
        period: 'Agosto 2019 – Presente',
        status: 'En curso',
      },
      {
        degree: 'Diplomatura en Programación .NET',
        institution: 'Universidad Tecnológica Nacional',
        location: 'Modalidad a distancia',
        period: 'Julio 2021 – Presente',
        status: 'En curso',
      },
      {
        degree: 'Bachiller en Ciencias Sociales',
        institution: 'Escuela Nuestra Señora Del Valle',
        location: 'San Miguel',
        period: '2011 – 2016',
        status: 'Completado',
      },
    ],
    skills: {
      frontend: ['React', 'Astro', 'Tailwind CSS', 'TypeScript', 'Next.js'],
      backend: ['.NET Core', 'C#', 'Node.js', 'SQL Server', 'PostgreSQL'],
      cloud: ['AWS', 'Vercel', 'Railway'],
      tools: ['Git', 'GitHub', 'Cursor', 'Claude AI', 'Figma'],
    },
    aptitudes: [
      'Proactivo, perseverante y resolutivo ante situaciones nuevas y complejas',
      'Organizado, diligente y con atención al detalle',
      'Fuerte capacidad para el trabajo en equipo y comunicación efectiva',
      'Aprendizaje continuo y adaptación rápida a nuevas tecnologías',
      'Pensamiento analítico orientado a la resolución de problemas',
    ],
    personal: {
      birth: '22/05/1999',
      dni: '41.874.133',
      nationality: 'Argentina',
      status: 'Soltero',
    },
  },
  en: {
    name: 'Matías Kalil Gómez',
    title: 'Full Stack Web Developer',
    location: 'Roque Sáenz Peña 1475, San Miguel, Buenos Aires, Argentina',
    phone: '+54 9 11 6137-5359',
    email: 'gomezukalil@gmail.com',
    portfolioUrl: 'https://ship-by-kalil.vercel.app/',
    profile: `Full Stack web developer with experience in freelance projects building applications for the financial and real estate sectors. Proactive, resourceful, and a strong self-learner. Familiar with modern AI-assisted development tools. Focused on delivering quality solutions, teamwork, and efficient project delivery using agile practices.`,
    experience: [
      {
        period: '2024 – Present',
        role: 'Full Stack Web Developer (Freelance)',
        company: 'Independent development team',
        description: 'Web application development for companies in the financial and real estate sectors.',
        highlights: [
          'Modern UI implementation with React and Astro',
          'API and backend service development with .NET Core',
          'Relational database management with SQL Server and PostgreSQL',
          'Deployment and infrastructure on AWS, Vercel, and Railway',
          'AI-assisted development tools: Cursor and Claude AI',
          'Team collaboration with Git and GitHub–based workflows',
        ],
      },
    ],
    education: [
      {
        degree: 'Bachelor’s in Information Systems',
        institution: 'Universidad Nacional de General Sarmiento',
        location: 'Malvinas Argentinas',
        period: 'August 2019 – Present',
        status: 'In progress',
      },
      {
        degree: '.NET Programming Diploma',
        institution: 'Universidad Tecnológica Nacional',
        location: 'Distance learning',
        period: 'July 2021 – Present',
        status: 'In progress',
      },
      {
        degree: 'High School Diploma in Social Sciences',
        institution: 'Escuela Nuestra Señora Del Valle',
        location: 'San Miguel',
        period: '2011 – 2016',
        status: 'Completed',
      },
    ],
    skills: {
      frontend: ['React', 'Astro', 'Tailwind CSS', 'TypeScript', 'Next.js'],
      backend: ['.NET Core', 'C#', 'Node.js', 'SQL Server', 'PostgreSQL'],
      cloud: ['AWS', 'Vercel', 'Railway'],
      tools: ['Git', 'GitHub', 'Cursor', 'Claude AI', 'Figma'],
    },
    aptitudes: [
      'Proactive, persistent, and resourceful in new and complex situations',
      'Organized, diligent, and detail-oriented',
      'Strong teamwork and communication skills',
      'Continuous learning and quick adaptation to new technologies',
      'Analytical thinking focused on problem solving',
    ],
    personal: {
      birth: '05/22/1999',
      dni: '41.874.133',
      nationality: 'Argentine',
      status: 'Single',
    },
  },
};

export const cvPageLabels: Record<'es' | 'en', CvPageLabels> = {
  es: {
    professionalProfile: 'Perfil Profesional',
    professionalExperience: 'Experiencia Profesional',
    technicalSkills: 'Habilidades Técnicas',
    education: 'Educación',
    aptitudes: 'Aptitudes',
    contact: 'Contacto',
    personalData: 'Datos Personales',
    email: 'Email',
    websitePortfolio: 'Sitio web / Portfolio',
    birthDate: 'Fecha de nacimiento',
    idDoc: 'DNI',
    nationality: 'Nacionalidad',
    maritalStatus: 'Estado civil',
    skillCategories: {
      frontend: 'Frontend',
      backend: 'Backend',
      cloud: 'Cloud',
      tools: 'Herramientas',
    },
  },
  en: {
    professionalProfile: 'Professional profile',
    professionalExperience: 'Work experience',
    technicalSkills: 'Technical skills',
    education: 'Education',
    aptitudes: 'Strengths',
    contact: 'Contact',
    personalData: 'Personal details',
    email: 'Email',
    websitePortfolio: 'Website / portfolio',
    birthDate: 'Date of birth',
    idDoc: 'National ID',
    nationality: 'Nationality',
    maritalStatus: 'Marital status',
    skillCategories: {
      frontend: 'Frontend',
      backend: 'Backend',
      cloud: 'Cloud',
      tools: 'Tools',
    },
  },
};
