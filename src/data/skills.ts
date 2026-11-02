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
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 90 },
      { name: 'Astro', level: 85 },
      { name: 'JavaScript', level: 90 },
      { name: 'Tailwind CSS', level: 90 },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'C# / .NET Core', level: 80 },
      { name: 'Node.js', level: 75 },
      { name: 'REST APIs', level: 80 },
    ],
  },
  {
    name: 'Bases de Datos',
    skills: [
      { name: 'SQL Server', level: 80 },
      { name: 'PostgreSQL', level: 75 },
    ],
  },
  {
    name: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', level: 75 },
      { name: 'Vercel', level: 90 },
      { name: 'Railway', level: 75 },
      { name: 'GitHub / Git', level: 90 },
    ],
  },
  {
    name: 'Herramientas IA',
    skills: [
      { name: 'Cursor', level: 85 },
      { name: 'Claude AI', level: 85 },
    ],
  },
];
