import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import { projects as projectsSource } from '../data/projects';
import { getLocaleFromUrl } from '../i18n';
import type { Locale } from '../i18n';

const translations: Record<
  Locale,
  {
    title: string;
    titleHighlight: string;
    subtitle: string;
    view: string;
    all: string;
    filtersLabel: string;
    viewProject: string;
    code: string;
    flipHint: string;
  }
> = {
  es: {
    title: 'Proyectos ',
    titleHighlight: 'Destacados',
    subtitle:
      'Aplicaciones y sistemas desarrollados para clientes del sector financiero e inmobiliario.',
    view: 'Ver',
    all: 'Todos',
    filtersLabel: 'Filtrar',
    viewProject: 'Ver proyecto',
    code: 'Ver código',
    flipHint: 'Hover para más info',
  },
  en: {
    title: 'Featured ',
    titleHighlight: 'Projects',
    subtitle:
      'Applications and systems developed for clients in the financial and real estate sectors.',
    view: 'View',
    all: 'All',
    filtersLabel: 'Filter',
    viewProject: 'View project',
    code: 'View code',
    flipHint: 'Hover for more',
  },
};

interface ProjectData {
  id: number;
  title: string;
  description: string;
  tags: string[];
  type: string;
  year: string;
  featured: boolean;
  previewImage?: string;
  demoUrl?: string;
  repoUrl?: string;
  image?: string;
}

function FlipCard({
  project,
  t,
  prefersReducedMotion,
}: {
  project: ProjectData;
  t: typeof translations.es;
  prefersReducedMotion: boolean | null;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.article
      initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative h-[380px] perspective-1000"
    >
      <motion.div
        className="relative w-full h-full preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
        onClick={() => !prefersReducedMotion && setIsFlipped(!isFlipped)}
      >
        {/* FRONT - Technologies, URL, +info */}
        <div
          className="absolute inset-0 backface-hidden rounded-3xl border border-border bg-surface-2/60 glass-panel overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="h-full flex flex-col p-5">
            <div className="mb-4">
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent-cyan hover:underline text-sm font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.image && <span className="text-lg">{project.image}</span>}
                  <span className="font-heading font-bold text-lg text-text-primary">
                    {project.title}
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              ) : (
                <div className="inline-flex items-center gap-2">
                  {project.image && <span className="text-lg">{project.image}</span>}
                  <span className="font-heading font-bold text-lg text-text-primary">
                    {project.title}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-auto">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-background/50 text-text-secondary text-xs rounded-full border border-border/60 font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>

            <button
              type="button"
              className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 border border-border/50 text-text-muted rounded-xl text-sm hover:border-accent-cyan/40 hover:text-accent-cyan transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                if (!prefersReducedMotion) setIsFlipped(true);
              }}
            >
              <span>+info</span>
            </button>
          </div>
        </div>

        {/* BACK - Description + what was done */}
        <div
          className="absolute inset-0 backface-hidden rounded-3xl border border-accent-cyan/30 bg-gradient-to-br from-surface-2 to-background p-5 flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">{project.image}</span>
            <h3 className="text-lg font-bold font-heading text-text-primary">{project.title}</h3>
          </div>

          <p className="text-text-secondary text-sm leading-relaxed mb-4">{project.description}</p>

          <div className="flex-1">
            <p className="text-accent-cyan text-xs font-mono uppercase mb-2">Lo que se realizó</p>
            <ul className="text-text-secondary text-sm space-y-1">
              <li>• Desarrollo completo del proyecto</li>
              <li>• Implementación de funcionalidades</li>
              <li>• Diseño responsivo y optimizado</li>
            </ul>
          </div>

          <div className="flex gap-3 mt-4">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-accent text-white rounded-xl font-medium text-sm hover:bg-accent/90 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ArrowUpRight className="w-4 h-4" />
                {t.viewProject}
              </a>
            )}
            <button
              type="button"
              className="px-4 py-2.5 border border-border text-text-muted rounded-xl text-sm hover:border-accent-cyan/40 hover:text-accent-cyan transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
            >
              ←
            </button>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function Projects() {
  const [locale, setLocale] = useState<Locale>('es');
  const t = translations[locale];
  const prefersReducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<string>(translations.es.all);

  useEffect(() => {
    const pathLocale = getLocaleFromUrl(window.location.pathname);
    setLocale(pathLocale);
  }, []);

  useEffect(() => {
    setActiveFilter(locale === 'en' ? translations.en.all : translations.es.all);
  }, [locale]);

  const projects: ProjectData[] = useMemo(
    () =>
      projectsSource.map((p) => ({
        ...p,
        description: p.description[locale],
      })),
    [locale]
  );
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));
  const filterChips = [t.all, ...allTags.slice(0, 6)];
  const filteredProjects =
    activeFilter === t.all ? projects : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <section id="proyectos" className="py-20 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-4">
          {t.title}
          <span className="text-accent-cyan">{t.titleHighlight}</span>
        </h2>
        <p className="text-text-secondary mb-8 max-w-2xl">{t.subtitle}</p>

        {/* Filters (como CerqueTech) */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <span className="sr-only">{t.filtersLabel}</span>
          {filterChips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setActiveFilter(chip)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
                activeFilter === chip
                  ? 'bg-accent-cyan text-background shadow-[0_0_24px_-8px_rgba(6,182,212,0.55)]'
                  : 'bg-surface-2 text-text-secondary hover:text-text-primary border border-transparent hover:border-border'
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Grid cards con flip */}
        <motion.div
          layout={!prefersReducedMotion}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout={!prefersReducedMotion}
                initial={{
                  opacity: prefersReducedMotion ? 1 : 0,
                  y: prefersReducedMotion ? 0 : 18,
                  scale: prefersReducedMotion ? 1 : 0.98,
                }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: prefersReducedMotion ? 1 : 0.98 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.28,
                  delay: prefersReducedMotion ? 0 : index * 0.04,
                }}
              >
                <FlipCard project={project} t={t} prefersReducedMotion={prefersReducedMotion} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
