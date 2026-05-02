import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, useReducedMotion } from 'framer-motion';
import { motion } from 'framer-motion';
import { X, Minus, Square, ArrowUpRight, ExternalLink } from 'lucide-react';

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
    dockLabel: string;
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
    dockLabel: 'Minimizado',
  },
  en: {
    title: 'Featured ',
    titleHighlight: 'Projects',
    subtitle:
      'Applications and systems developed for clients in the financial and real estate sectors.',
    view: 'View',
    all: 'All',
    filtersLabel: 'Filter',
    dockLabel: 'Minimized',
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

function ProjectPreview({
  title,
  url,
  emoji,
  tags,
  previewImage,
}: {
  title: string;
  url?: string;
  emoji?: string;
  tags: string[];
  previewImage?: string;
}) {
  const host = url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'preview';
  const Wrapper = url ? 'a' : 'div';

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface-2 to-background">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-28 -right-28 h-80 w-80 rounded-full bg-accent-cyan/14 blur-3xl" />
        <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-accent/12 blur-3xl" />
        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:56px_56px]" />
      </div>

      <div className="relative p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-3xl shrink-0">{emoji ?? '💼'}</span>
            <div className="min-w-0">
              <p className="text-text-primary font-heading font-bold text-lg truncate">{title}</p>
              <p className="text-text-muted text-xs font-mono truncate">{host}</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-500/90" />
            <span className="h-2 w-2 rounded-full bg-yellow-500/90" />
            <span className="h-2 w-2 rounded-full bg-green-500/90" />
          </div>
        </div>

        <div className="mt-4">
          {previewImage ? (
            <Wrapper
              {...(url
                ? {
                    href: url,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    'aria-label': `Abrir ${title}`,
                  }
                : {})}
              className={`group/preview relative block overflow-hidden rounded-xl border border-border/70 bg-background/20 ${
                url
                  ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-2'
                  : ''
              }`}
            >
              <img
                src={previewImage}
                alt={`Preview de ${title}`}
                className="block w-full h-auto transition-transform duration-500 ease-out group-hover/preview:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent"
                aria-hidden="true"
              />
              {url && (
                <div className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-2 rounded-full border border-accent-cyan/25 bg-background/40 px-3 py-1 text-xs font-medium text-accent-cyan opacity-0 translate-y-1 transition-all duration-300 group-hover/preview:opacity-100 group-hover/preview:translate-y-0">
                  Abrir
                  <span aria-hidden="true">↗</span>
                </div>
              )}
            </Wrapper>
          ) : (
            <Wrapper
              {...(url
                ? {
                    href: url,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    'aria-label': `Abrir ${title}`,
                  }
                : {})}
              className={`group/preview block rounded-xl border border-border/70 bg-background/15 p-3 ${
                url
                  ? 'cursor-pointer hover:border-accent-cyan/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-2 transition-colors'
                  : ''
              }`}
            >
              <div className="grid grid-cols-12 gap-2.5 transition-transform duration-500 ease-out group-hover/preview:scale-[1.01]">
                <div className="col-span-7 h-24 rounded-xl border border-border/70 bg-background/25" />
                <div className="col-span-5 h-24 rounded-xl border border-border/70 bg-background/25" />
                <div className="col-span-5 h-20 rounded-xl border border-border/70 bg-background/25" />
                <div className="col-span-7 h-20 rounded-xl border border-border/70 bg-background/25" />
              </div>
            </Wrapper>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.slice(0, 6).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-background/40 text-text-secondary text-[11px] rounded border border-border/70 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: ProjectData;
  t: typeof translations.es;
  isMinimized: boolean;
  isExpanded: boolean;
  isClosed: boolean;
  onExpand: () => void;
  onMinimize: () => void;
  onClose: () => void;
  onRestore: () => void;
  prefersReducedMotion: boolean | null;
}

function ProjectCard({
  project,
  t,
  isMinimized,
  isExpanded,
  isClosed,
  onExpand,
  onMinimize,
  onClose,
  onRestore: _onRestore,
  prefersReducedMotion,
}: ProjectCardProps) {
  const handleRed = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleYellow = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMinimize();
  };

  const handleGreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    onExpand();
  };

  if (isClosed) return null;

  return (
    <motion.article
      layout
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
      animate={
        isMinimized
          ? { opacity: 0, y: 50, scale: 0.8 }
          : isExpanded
            ? { opacity: 1, scale: 1, zIndex: 50 }
            : { opacity: 1, scale: 1, zIndex: 1 }
      }
      exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
      className={`rounded-3xl border border-border bg-surface-2/60 glass-panel overflow-hidden ${
        isExpanded ? 'fixed inset-4 md:inset-10 z-50 shadow-2xl' : ''
      }`}
      onClick={() => !isMinimized && onExpand()}
    >
      {isExpanded && (
        <div className="absolute inset-0 bg-background/95 backdrop-blur-xl overflow-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center"
                    aria-label="Cerrar"
                  >
                    <X className="w-2 h-2 text-red-900 opacity-0 hover:opacity-100" />
                  </button>
                  <button
                    type="button"
                    onClick={onMinimize}
                    className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors flex items-center justify-center"
                    aria-label="Minimizar"
                  >
                    <Minus className="w-2 h-2 text-yellow-900 opacity-0 hover:opacity-100" />
                  </button>
                  <button
                    type="button"
                    onClick={onExpand}
                    className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors flex items-center justify-center"
                    aria-label="Expandir"
                  >
                    <Square className="w-1.5 h-1.5 text-green-900 opacity-0 hover:opacity-100" />
                  </button>
                </div>
                <h3 className="text-lg font-bold font-heading text-text-primary">
                  {project.title}
                </h3>
              </div>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm hover:bg-accent/90 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  {t.view}
                </a>
              )}
            </div>
            <ProjectPreview
              title={project.title}
              url={project.demoUrl}
              emoji={project.image}
              tags={project.tags}
              previewImage={project.previewImage}
            />
            <div className="mt-4 px-5 pb-5">
              <p className="text-text-secondary text-sm leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-background/50 text-text-muted text-xs rounded-full border border-border font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {!isExpanded && (
        <>
          <div className="p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-3xl shrink-0">{project.image}</span>
                <div className="min-w-0">
                  <p className="text-text-primary font-heading font-bold text-lg truncate">
                    {project.title}
                  </p>
                  <p className="text-text-muted text-xs font-mono truncate">
                    {project.demoUrl?.replace(/^https?:\/\//, '').replace(/\/$/, '') || 'preview'}
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleRed}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
                  aria-label="Cerrar"
                >
                  <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100" />
                </button>
                <button
                  type="button"
                  onClick={handleYellow}
                  className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors flex items-center justify-center group"
                  aria-label="Minimizar"
                >
                  <Minus className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100" />
                </button>
                <button
                  type="button"
                  onClick={handleGreen}
                  className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors flex items-center justify-center group"
                  aria-label="Expandir"
                >
                  <Square className="w-1.5 h-1.5 text-green-900 opacity-0 group-hover:opacity-100" />
                </button>
              </div>
            </div>

            <div className="mt-4">
              {project.previewImage ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/preview relative block overflow-hidden rounded-xl border border-border/70 bg-background/20"
                >
                  <img
                    src={project.previewImage}
                    alt={`Preview de ${project.title}`}
                    className="block w-full h-auto transition-transform duration-500 ease-out group-hover/preview:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                </a>
              ) : (
                <div className="block rounded-xl border border-border/70 bg-background/15 p-3">
                  <div className="grid grid-cols-12 gap-2.5">
                    <div className="col-span-7 h-24 rounded-xl border border-border/70 bg-background/25" />
                    <div className="col-span-5 h-24 rounded-xl border border-border/70 bg-background/25" />
                    <div className="col-span-5 h-20 rounded-xl border border-border/70 bg-background/25" />
                    <div className="col-span-7 h-20 rounded-xl border border-border/70 bg-background/25" />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.slice(0, 6).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-background/40 text-text-secondary text-[11px] rounded border border-border/70 font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="px-5 pb-5">
            <div className="flex items-center justify-between gap-3 mt-1 mb-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-accent-cyan font-mono text-xs">{project.year}</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span className="text-text-muted text-xs font-mono truncate">{project.type}</span>
              </div>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent-cyan text-sm font-medium hover:underline"
                >
                  {t.view}
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
            </div>

            <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>
        </>
      )}
    </motion.article>
  );
}

function Dock({
  minimizedProjects,
  projects,
  onRestore,
  t,
}: {
  minimizedProjects: number[];
  projects: ProjectData[];
  onRestore: (id: number) => void;
  t: typeof translations.es;
}) {
  if (minimizedProjects.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="flex items-center justify-center gap-2 mt-6 p-4 bg-surface-2/80 backdrop-blur-lg rounded-2xl border border-border/50"
    >
      <span className="text-text-muted text-xs mr-2">{t.dockLabel}:</span>
      {minimizedProjects.map((id) => {
        const project = projects.find((p) => p.id === id);
        if (!project) return null;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onRestore(id)}
            className="group flex items-center gap-2 px-3 py-2 bg-background/60 border border-border rounded-lg hover:border-accent-cyan/50 hover:bg-surface transition-all"
          >
            <span className="text-lg">{project.image}</span>
            <span className="text-text-secondary text-xs hidden group-hover:inline truncate max-w-[80px]">
              {project.title}
            </span>
          </button>
        );
      })}
    </motion.div>
  );
}

export default function Projects() {
  const [locale, setLocale] = useState<Locale>('es');
  const t = translations[locale];
  const prefersReducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<string>(translations.es.all);
  const [cardStates, setCardStates] = useState<
    Record<number, { minimized: boolean; expanded: boolean; closed: boolean }>
  >({});

  const getCardState = (id: number) =>
    cardStates[id] || { minimized: false, expanded: false, closed: false };

  const handleExpand = (id: number) => {
    setCardStates((prev) => ({
      ...prev,
      [id]: { ...getCardState(id), expanded: true },
    }));
  };

  const handleMinimize = (id: number) => {
    setCardStates((prev) => ({
      ...prev,
      [id]: { ...getCardState(id), minimized: true, expanded: false },
    }));
  };

  const handleClose = (id: number) => {
    setCardStates((prev) => ({
      ...prev,
      [id]: { ...getCardState(id), closed: true },
    }));
  };

  const handleRestore = (id: number) => {
    setCardStates((prev) => ({
      ...prev,
      [id]: { ...getCardState(id), minimized: false, expanded: false },
    }));
  };

  const minimizedIds = Object.entries(cardStates)
    .filter(([_, state]) => state.minimized && !state.closed)
    .map(([id]) => parseInt(id));

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

        {/* Grid cards (como CerqueTech) */}
        <motion.div
          layout={!prefersReducedMotion}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const state = getCardState(project.id);
              if (state.closed) return null;
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  t={t}
                  isMinimized={state.minimized}
                  isExpanded={state.expanded}
                  isClosed={state.closed}
                  onExpand={() => handleExpand(project.id)}
                  onMinimize={() => handleMinimize(project.id)}
                  onClose={() => handleClose(project.id)}
                  onRestore={() => handleRestore(project.id)}
                  prefersReducedMotion={prefersReducedMotion}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>

        <Dock
          minimizedProjects={minimizedIds}
          projects={projects}
          onRestore={handleRestore}
          t={t}
        />
      </div>
    </section>
  );
}
