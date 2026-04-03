export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export const skills: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', level: 85 },
      { name: 'Astro', level: 80 },
      { name: 'TypeScript', level: 75 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'JavaScript', level: 90 },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'C# / .NET Core', level: 80 },
      { name: 'MVC', level: 75 },
      { name: 'REST APIs', level: 80 },
    ],
  },
  {
    name: 'Bases de Datos',
    skills: [
      { name: 'SQL Server', level: 80 },
      { name: 'PostgreSQL', level: 70 },
    ],
  },
  {
    name: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', level: 65 },
      { name: 'Vercel', level: 85 },
      { name: 'Railway', level: 70 },
      { name: 'GitHub / Git', level: 85 },
    ],
  },
  {
    name: 'Herramientas IA',
    skills: [
      { name: 'Cursor', level: 80 },
      { name: 'Claude AI', level: 80 },
    ],
  },
];
