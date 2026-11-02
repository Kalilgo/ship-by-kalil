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
  githubUrl?: string;
  linkedinUrl?: string;
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
  downloadPdf: string;
  skillCategories: Record<keyof CvContent['skills'], string>;
}

export const cvByLocale: Record<'es' | 'en', CvContent> = {
  es: {
    name: 'Matías Kalil Gómez',
    title: 'Desarrollador Web Full Stack',
    location: 'San Miguel, Buenos Aires, Argentina',
    phone: '+54 9 11 6137-5359',
    email: 'gomezukalil@gmail.com',
    portfolioUrl: 'https://kalil.dev/',
    githubUrl: 'https://github.com/Kalilgo',
    linkedinUrl: 'https://www.linkedin.com/in/matias-kalil-gomez/',
    profile: `Desarrollador Web Full Stack enfocado a aplicaciones web para el sector financiero e inmobiliario. Especializado en React, Astro, TypeScript, .NET Core y AWS. Experiencia en desarrollo de features, migraciones de infraestructura y despliegue en producción. Orientado a soluciones escalables, rendimiento y trabajo en equipo bajo metodologías ágiles.`,
    experience: [
      {
        period: '2024 – Actualidad',
        role: 'Desarrollador Web Full Stack (Freelance)',
        company: 'Equipo de desarrollo independiente',
        description:
          'Desarrollo de aplicaciones web para empresas del sector financiero e inmobiliario.',
        highlights: [
          'Desarrollo de interfaces modernas y responsivas con React, Astro y TypeScript',
          'Desarrollo de APIs y servicios backend con .NET Core y Node.js',
          'Gestión de bases de datos relacionales con SQL Server y PostgreSQL',
          'Lideré la migración de infraestructura de FinanzasArgy de Vercel/Railway a AWS (AWS Amplify)',
          'Desarrollo e implementación de funcionalidades a medida para proyectos fintech e inmobiliarios',
          'Despliegue en producción con AWS, Vercel y Railway, con control de versiones en Git/GitHub',
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
        period: 'Marzo 2021 – Agosto 2021',
        status: 'Completado',
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
      frontend: ['React', 'Astro', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
      backend: ['.NET Core', 'C#', 'Node.js', 'REST APIs'],
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
    location: 'Buenos Aires, Argentina',
    phone: '+54 9 11 6137-5359',
    email: 'gomezukalil@gmail.com',
    portfolioUrl: 'https://kalil.dev/',
    githubUrl: 'https://github.com/Kalilgo',
    linkedinUrl: 'https://www.linkedin.com/in/matias-kalil-gomez/',
    profile: `Full Stack Web Developer focused on building web applications for the financial and real estate sectors. Specialized in React, Astro, TypeScript, .NET Core and AWS. Experienced in shipping features, migrating infrastructure and deploying to production. Focused on scalable solutions, performance and delivering value under agile methodologies.`,
    experience: [
      {
        period: '2024 – Present',
        role: 'Full Stack Web Developer (Freelance)',
        company: 'Independent development team',
        description:
          'Web application development for companies in the financial and real estate sectors.',
        highlights: [
          'Built modern, responsive UIs with React, Astro and TypeScript',
          'Developed APIs and backend services with .NET Core and Node.js',
          'Managed relational databases with SQL Server and PostgreSQL',
          'Led migration of FinanzasArgy infrastructure from Vercel/Railway to AWS (AWS Amplify)',
          'Shipped custom features for fintech and real estate projects',
          'Deployed to production on AWS, Vercel and Railway using Git/GitHub workflows',
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
        period: 'March 2021 – August 2021',
        status: 'Completed',
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
      frontend: ['React', 'Astro', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
      backend: ['.NET Core', 'C#', 'Node.js', 'REST APIs'],
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
      birth: '',
      dni: '',
      nationality: 'Argentine',
      status: '',
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
    downloadPdf: 'Descargar',
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
    downloadPdf: 'Download',
    skillCategories: {
      frontend: 'Frontend',
      backend: 'Backend',
      cloud: 'Cloud',
      tools: 'Tools',
    },
  },
};
