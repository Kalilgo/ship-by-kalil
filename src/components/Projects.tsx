import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

import { projects as projectsSource } from '../data/projects';
import { staggerDelay } from '../lib/motion';
import { getLocaleFromUrl } from '../i18n';
import type { Locale } from '../i18n';

const translations: Record<
  Locale,
  {
    title: string;
    titleHighlight: string;
    subtitle: string;
    featured: string;
    all: string;
    view: string;
    private: string;
    code: string;
  }
> = {
  es: {
    title: 'Proyectos ',
    titleHighlight: 'Destacados',
    subtitle:
      'Aplicaciones y sistemas desarrollados para clientes del sector financiero e inmobiliario.',
    featured: 'Destacados',
    all: 'Todos',
    view: 'Ver',
    private: 'Privado',
    code: 'Código',
  },
  en: {
    title: 'Featured ',
    titleHighlight: 'Projects',
    subtitle:
      'Applications and systems developed for clients in the financial and real estate sectors.',
    featured: 'Featured',
    all: 'All',
    view: 'View',
    private: 'Private',
    code: 'Code',
  },
};

const typeColors: Record<string, string> = {
  Freelance: 'bg-accent/20 text-accent border-accent/30',
  Personal: 'bg-accent-cyan/20 text-accent-cyan border-accent-cyan/30',
  Trabajo: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

interface ProjectData {
  id: number;
  title: string;
  description: string;
  tags: string[];
  type: string;
  year: string;
  featured: boolean;
  demoUrl?: string;
  repoUrl?: string;
  image?: string;
}

export default function Projects() {
  const [locale, setLocale] = useState<Locale>('es');
  const t = translations[locale];
  const [activeFilter, setActiveFilter] = useState('Destacados');
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const pathLocale = getLocaleFromUrl(window.location.pathname);
    setLocale(pathLocale);
    setActiveFilter(pathLocale === 'es' ? 'Destacados' : 'Featured');
  }, []);

  useEffect(() => {
    setActiveFilter(locale === 'es' ? 'Destacados' : 'Featured');
  }, [locale]);

  const filterKey = locale === 'es' ? 'Destacados' : 'Featured';
  const allKey = locale === 'es' ? 'Todos' : 'All';

  const projects: ProjectData[] = useMemo(
    () =>
      projectsSource.map((p) => ({
        ...p,
        description: p.description[locale],
      })),
    [locale]
  );
  const featuredProjects = projects.filter((p) => p.featured);

  const filteredProjects =
    activeFilter === allKey
      ? projects
      : activeFilter === filterKey
        ? featuredProjects
        : projects.filter((p: ProjectData) => p.tags.includes(activeFilter));

  const allTags = Array.from(new Set(projects.flatMap((p: ProjectData) => p.tags)));

  return (
    <section id="proyectos" className="py-20 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-4">
          {t.title}
          <span className="text-accent-cyan">{t.titleHighlight}</span>
        </h2>
        <p className="text-text-secondary mb-8 max-w-2xl">{t.subtitle}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            type="button"
            onClick={() => setActiveFilter(filterKey)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
              activeFilter === filterKey
                ? 'bg-accent-cyan text-background shadow-[0_0_24px_-8px_rgba(6,182,212,0.55)]'
                : 'bg-surface-2 text-text-secondary hover:text-text-primary border border-transparent hover:border-border'
            }`}
          >
            {t.featured}
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter(allKey)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
              activeFilter === allKey
                ? 'bg-accent-cyan text-background shadow-[0_0_24px_-8px_rgba(6,182,212,0.55)]'
                : 'bg-surface-2 text-text-secondary hover:text-text-primary border border-transparent hover:border-border'
            }`}
          >
            {t.all}
          </button>
          {allTags.slice(0, 6).map((tag: string) => (
            <button
              type="button"
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
                activeFilter === tag
                  ? 'bg-accent-cyan text-background shadow-[0_0_24px_-8px_rgba(6,182,212,0.55)]'
                  : 'bg-surface-2 text-text-secondary hover:text-text-primary border border-transparent hover:border-border'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                layout={!prefersReducedMotion}
                initial={{
                  opacity: 0,
                  y: prefersReducedMotion ? 8 : 24,
                  scale: prefersReducedMotion ? 1 : 0.96,
                }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: prefersReducedMotion ? 1 : 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.2 }
                    : {
                        duration: 0.45,
                        delay: staggerDelay(index, 0.06, prefersReducedMotion),
                        type: 'spring',
                        stiffness: 120,
                      }
                }
                whileHover={prefersReducedMotion ? undefined : { y: -8 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-2 to-background border border-border hover:border-accent-cyan/90 transition-all duration-300 shadow-[0_0_0_0_rgba(6,182,212,0)] hover:shadow-[0_20px_50px_-24px_rgba(6,182,212,0.25)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/8 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{project.image || '💼'}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        typeColors[project.type] || 'bg-surface text-text-secondary'
                      }`}
                    >
                      {project.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-accent-cyan font-medium">{project.year}</span>
                    {project.featured && (
                      <span className="px-2 py-0.5 bg-accent-cyan/20 text-accent-cyan text-xs rounded-full">
                        {t.featured}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold font-heading text-text-primary mb-2 group-hover:text-accent-cyan transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-background/50 text-text-secondary text-xs rounded-md border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-2 border-t border-border/50">
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-accent-cyan text-sm font-medium hover:underline"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        {t.view}
                      </a>
                    ) : (
                      <span className="flex items-center gap-1 text-text-secondary text-sm">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        {t.private}
                      </span>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-text-secondary text-sm font-medium hover:text-text-primary"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        {t.code}
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
