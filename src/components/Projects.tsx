import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefCallback,
} from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { projects as projectsSource } from '../data/projects';
import { getLocaleFromUrl } from '../i18n';
import type { Locale } from '../i18n';
import esI18n from '../i18n/es.json';
import enI18n from '../i18n/en.json';

import {
  dockMinimizeKeyframeUniform,
  dockMinimizeKeyframeXY,
  dockMinimizeMotionStyle,
  dockMinimizePerspectiveClass,
  dockMinimizeTransition,
} from '../lib/dockMinimizeMotion';
import {
  DOCK_META_EVENT,
  DOCK_PROJECT_ACTIVATE_EVENT,
  DOCK_REGISTER_REF_KEY,
} from '../lib/portfolioDockBridge';

import { TechTagIcon } from './ui/TechTagIcon';
import { WindowTrafficLights } from './ui/WindowTrafficLights';

const translations: Record<
  Locale,
  {
    title: string;
    titleHighlight: string;
    subtitle: string;
    view: string;
    all: string;
    filtersLabel: string;
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
  },
  en: {
    title: 'Featured ',
    titleHighlight: 'Projects',
    subtitle:
      'Applications and systems developed for clients in the financial and real estate sectors.',
    view: 'View',
    all: 'All',
    filtersLabel: 'Filter',
  },
};

type WindowState = 'open' | 'minimized' | 'closed' | 'maximized';

function buildInitialWindowStates(): Record<number, WindowState> {
  const o: Record<number, WindowState> = {};
  projectsSource.forEach((p) => {
    o[p.id] = 'open';
  });
  return o;
}

interface ProjectData {
  id: number;
  title: string;
  description: string;
  whatWasDone: string;
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
  variant = 'card',
  windowLabels,
  onWindowClose,
  onWindowMinimize,
  onWindowMaximize,
  hideWindowControls,
  hideMaximizeButton,
  openPreviewLabel,
  modalDescription,
  omitHeader = false,
  omitTagRow = false,
  previewImageClassName,
  embedded = false,
}: {
  title: string;
  url?: string;
  emoji?: string;
  tags: string[];
  previewImage?: string;
  variant?: 'card' | 'modal';
  windowLabels: { close: string; minimize: string; maximize: string };
  onWindowClose?: () => void;
  onWindowMinimize?: () => void;
  onWindowMaximize?: () => void;
  hideWindowControls?: boolean;
  hideMaximizeButton?: boolean;
  openPreviewLabel: string;
  modalDescription?: string;
  /** Solo captura + chrome: sin fila título/host (evita duplicar en la tarjeta). */
  omitHeader?: boolean;
  /** Oculta chips de stack dentro del preview (p. ej. se muestran afuera con iconos). */
  omitTagRow?: boolean;
  /** Clases extra para la imagen (p. ej. altura máxima en tarjetas compactas). */
  previewImageClassName?: string;
  /** Dentro de FlipCard: marco más simple, menos decoración. */
  embedded?: boolean;
}) {
  const host = url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'preview';
  const Wrapper = url ? 'a' : 'div';
  const previewPadding =
    variant === 'modal' ? 'p-6 md:p-8' : embedded ? 'p-1.5 sm:p-2' : 'p-5';
  const imgRounded = variant === 'modal' ? 'rounded-2xl' : embedded ? 'rounded-lg' : 'rounded-xl';

  const shellClass = embedded
    ? 'relative overflow-hidden rounded-xl border border-border/50 bg-background/25'
    : 'relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface-2 to-background';

  return (
    <div className={shellClass}>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {embedded ? (
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:40px_40px] opacity-50" />
        ) : (
          <>
            <div className="absolute -top-28 -right-28 h-80 w-80 rounded-full bg-accent-cyan/14 blur-3xl" />
            <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-accent/12 blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:56px_56px] opacity-40" />
          </>
        )}
      </div>

      <div className={`relative ${previewPadding}`}>
        {omitHeader ? (
          !hideWindowControls && onWindowClose && onWindowMinimize ? (
            <div className="mb-3 flex justify-end">
              <div className="hidden sm:block">
                <WindowTrafficLights
                  labels={windowLabels}
                  onClose={onWindowClose}
                  onMinimize={onWindowMinimize}
                  onMaximize={onWindowMaximize}
                  hideMaximize={hideMaximizeButton || !onWindowMaximize}
                />
              </div>
            </div>
          ) : null
        ) : (
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="shrink-0 text-3xl">{emoji ?? '💼'}</span>
              <div className="min-w-0">
                <p className="truncate font-heading text-lg font-bold text-text-primary">{title}</p>
                <p className="truncate font-mono text-xs text-text-muted">{host}</p>
              </div>
            </div>
            {!hideWindowControls && onWindowClose && onWindowMinimize ? (
              <div className="hidden sm:block">
                <WindowTrafficLights
                  labels={windowLabels}
                  onClose={onWindowClose}
                  onMinimize={onWindowMinimize}
                  onMaximize={onWindowMaximize}
                  hideMaximize={hideMaximizeButton || !onWindowMaximize}
                />
              </div>
            ) : null}
          </div>
        )}

        <div className={omitHeader ? '' : 'mt-4'}>
          {previewImage ? (
            <Wrapper
              {...(url
                ? {
                    href: url,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    'aria-label': `${openPreviewLabel} ${title}`,
                  }
                : {})}
              className={`group/preview relative block overflow-hidden border bg-background/20 ${imgRounded} ${
                embedded ? 'border-border/45' : 'border-border/70'
              } ${
                url
                  ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-2'
                  : ''
              }`}
            >
              <img
                src={previewImage}
                alt=""
                className={`block h-auto w-full transition-transform duration-500 ease-out group-hover/preview:scale-[1.03] ${
                  variant === 'modal' ? 'max-h-[min(52vh,520px)] object-cover object-top sm:max-h-[56vh]' : ''
                } ${previewImageClassName ?? ''}`}
                loading="lazy"
                decoding="async"
              />
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${
                  embedded ? 'from-background/20' : 'from-background/40'
                }`}
                aria-hidden="true"
              />
              {url && (
                <div className="pointer-events-none absolute right-3 top-3 inline-flex translate-y-1 items-center gap-2 rounded-full border border-accent-cyan/25 bg-background/40 px-3 py-1 text-xs font-medium text-accent-cyan opacity-0 transition-all duration-300 group-hover/preview:translate-y-0 group-hover/preview:opacity-100">
                  {openPreviewLabel}
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
                    'aria-label': `${openPreviewLabel} ${title}`,
                  }
                : {})}
              className={`group/preview block rounded-xl border border-border/70 bg-background/15 p-3 ${
                url
                  ? 'cursor-pointer transition-colors hover:border-accent-cyan/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-2'
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

        {!omitTagRow ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.slice(0, 6).map((tag) => (
              <span
                key={tag}
                className="rounded border border-border/70 bg-background/40 px-2 py-0.5 font-mono text-[11px] text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {variant === 'modal' && modalDescription ? (
          <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-text-secondary md:text-base">
            {modalDescription}
          </p>
        ) : null}
      </div>
    </div>
  );
}

type ProjectsWindowCopy = (typeof esI18n)['projectsWindow'];

/** Tarjeta con flip 3D: frente = preview + descripción + stack; dorso = solo lo realizado. */
function FlipCardBody({
  project,
  pw,
  t,
  setWindow,
  handleMinimize,
  prefersReducedMotion,
  isWindowOpen,
}: {
  project: ProjectData;
  pw: ProjectsWindowCopy;
  t: (typeof translations)['es'];
  setWindow: (id: number, next: WindowState) => void;
  handleMinimize: (id: number) => void;
  prefersReducedMotion: boolean | null;
  isWindowOpen: boolean;
}) {
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    if (!isWindowOpen) setShowBack(false);
  }, [isWindowOpen]);

  const metaRow = (
    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2.5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-accent-cyan/30 bg-accent-cyan/[0.08] px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-accent-cyan">
          {project.year}
        </span>
        <span className="rounded-full border border-border/60 bg-background/30 px-3 py-1 font-mono text-[11px] text-text-secondary">
          {project.type}
        </span>
      </div>
      {project.demoUrl ? (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-accent-cyan transition hover:bg-accent-cyan/[0.08] hover:underline"
        >
          {t.view}
          <span aria-hidden="true">↗</span>
        </a>
      ) : null}
    </div>
  );

  const stackIcons = (
    <ul className="flex flex-wrap items-center gap-2.5 sm:gap-3" aria-label={`Stack: ${project.tags.join(', ')}`}>
      {project.tags.map((tag) => (
        <li key={tag}>
          <TechTagIcon tag={tag} />
        </li>
      ))}
    </ul>
  );

  const cardActionFooter = (mode: 'more' | 'less', onClick: () => void, ariaExpanded: boolean) => (
    <footer className="shrink-0 border-t border-border/40 bg-background/[0.35] px-5 py-3.5 sm:px-6 sm:py-4">
      <button
        type="button"
        onClick={onClick}
        aria-expanded={ariaExpanded}
        className="flex h-11 w-full items-center justify-center rounded-xl border border-accent-cyan/40 bg-accent-cyan/[0.08] text-sm font-semibold tracking-wide text-accent-cyan transition hover:border-accent-cyan/55 hover:bg-accent-cyan/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99] sm:h-12"
      >
        {mode === 'more' ? pw.cardMoreInfo : pw.cardLessInfo}
      </button>
    </footer>
  );

  /** Barra tipo ventana (dentro de cada cara del flip para que gire la carta entera). */
  const windowChrome = (
    <div className="flex shrink-0 items-center gap-3 border-b border-border/40 bg-surface-2/95 px-4 py-3 backdrop-blur-sm sm:gap-3.5 sm:px-5 sm:py-3.5">
      <div className="flex shrink-0 items-center">
        <WindowTrafficLights
          labels={{
            close: pw.close,
            minimize: pw.minimize,
            maximize: pw.maximize,
          }}
          onClose={() => setWindow(project.id, 'closed')}
          onMinimize={() => void handleMinimize(project.id)}
          onMaximize={() => setWindow(project.id, 'maximized')}
        />
      </div>
      <div className="flex min-w-0 flex-1 items-center justify-start gap-2.5 text-left">
        <span className="shrink-0 text-lg leading-none sm:text-xl" aria-hidden="true">
          {project.image ?? '💼'}
        </span>
        <h3 className="min-w-0 flex-1 truncate text-left font-heading text-[15px] font-semibold leading-snug text-text-primary sm:text-base">
          {project.title}
        </h3>
      </div>
    </div>
  );

  const frontScroll = (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-auto [scrollbar-gutter:stable]">
        <div className="flex flex-col gap-5 px-5 pb-1 pt-5 sm:gap-6 sm:px-6 sm:pb-2 sm:pt-6">
          <ProjectPreview
            embedded
            omitHeader
            omitTagRow
            hideWindowControls
            title={project.title}
            url={project.demoUrl}
            emoji={project.image}
            tags={project.tags}
            previewImage={project.previewImage}
            previewImageClassName="max-h-[min(17rem,36svh)] object-cover object-top sm:max-h-[min(19rem,40svh)] lg:max-h-[min(21rem,42svh)]"
            windowLabels={{
              close: pw.close,
              minimize: pw.minimize,
              maximize: pw.maximize,
            }}
            onWindowClose={() => setWindow(project.id, 'closed')}
            onWindowMinimize={() => void handleMinimize(project.id)}
            onWindowMaximize={() => setWindow(project.id, 'maximized')}
            openPreviewLabel={pw.openPreview}
          />
          <div className="flex flex-col gap-4">
            {metaRow}
            <p className="text-[15px] leading-relaxed text-text-secondary/95 sm:leading-[1.68]">
              {project.description}
            </p>
            <div className="border-t border-border/30 pt-4">{stackIcons}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const backScroll = (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl opacity-[0.09]"
        aria-hidden="true"
      >
        <div className="absolute -right-12 top-8 h-80 w-80 rounded-full bg-accent-cyan/45 blur-3xl" />
        <div className="absolute -left-8 bottom-10 h-64 w-64 rounded-full bg-accent/35 blur-3xl" />
      </div>
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-auto [scrollbar-gutter:stable]">
        <div className="flex flex-col gap-4 px-5 pb-6 pt-6 sm:px-6 sm:pb-7 sm:pt-7">
          <div className="h-px w-10 rounded-full bg-gradient-to-r from-accent-cyan/80 to-transparent" aria-hidden="true" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-cyan/90">{pw.cardDelivered}</p>
          <p className="max-w-prose text-[15px] leading-[1.72] text-text-secondary/95">{project.whatWasDone}</p>
        </div>
      </div>
    </div>
  );

  /** Altura fija compartida: misma caja en frente y dorso → sin franja gris; carta más alta. */
  const flipCardHeightClass =
    'h-[min(36rem,88svh)] min-h-[30rem] sm:h-[min(38rem,82svh)] sm:min-h-[34rem] lg:h-[min(40rem,78svh)] lg:min-h-[36rem]';

  /**
   * Grid superpuesto: las caras son `h-full` del contenedor de altura fija (sin huecos ni gris).
   * `rounded-3xl`: la ventana completa gira (chrome + contenido + pie).
   */
  const faceBase =
    'col-start-1 row-start-1 flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-surface-2 to-background/[0.97] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] [transform-style:preserve-3d]';

  if (prefersReducedMotion) {
    return (
      <div
        className={`flex flex-col overflow-hidden rounded-3xl border border-border/55 bg-gradient-to-b from-surface-2 to-background/95 shadow-[0_8px_32px_-20px_rgba(0,0,0,0.45)] ${flipCardHeightClass}`}
      >
        {windowChrome}
        {!showBack ? (
          <>
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{frontScroll}</div>
            {cardActionFooter('more', () => setShowBack(true), false)}
          </>
        ) : (
          <>
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{backScroll}</div>
            {cardActionFooter('less', () => setShowBack(false), true)}
          </>
        )}
      </div>
    );
  }

  return (
    <div className={`relative [transform-style:preserve-3d] ${flipCardHeightClass}`}>
      <div className="absolute inset-0 overflow-hidden rounded-3xl [perspective:1200px] [perspective-origin:50%_50%]">
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-surface-2 to-surface-2"
          aria-hidden="true"
        />
        <motion.div
          className="relative z-[1] h-full w-full rounded-3xl will-change-transform"
          style={{ transformStyle: 'preserve-3d', transformOrigin: '50% 50%' }}
          initial={false}
          animate={{ rotateY: showBack ? 180 : 0 }}
          transition={{
            type: 'tween',
            duration: 0.62,
            ease: [0.32, 0.72, 0, 1],
          }}
        >
          <div className="relative grid h-full w-full auto-rows-auto grid-cols-1 [transform-style:preserve-3d]">
            <div
              className={`${faceBase} [backface-visibility:hidden] [-webkit-backface-visibility:hidden] ${showBack ? 'pointer-events-none' : ''}`}
              style={{ transform: 'translateZ(2px)' }}
            >
              {windowChrome}
              {frontScroll}
              {cardActionFooter('more', () => setShowBack(true), false)}
            </div>

            <div
              className={`${faceBase} [backface-visibility:hidden] [-webkit-backface-visibility:hidden] ${
                showBack ? '' : 'pointer-events-none'
              }`}
              style={{ transform: 'rotateY(180deg) translateZ(2px)' }}
            >
              {windowChrome}
              {backScroll}
              {cardActionFooter('less', () => setShowBack(false), true)}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [locale, setLocale] = useState<Locale>('es');
  const t = translations[locale];
  const pw = locale === 'en' ? enI18n.projectsWindow : esI18n.projectsWindow;
  const prefersReducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<string>(translations.es.all);
  const [windowStates, setWindowStates] = useState<Record<number, WindowState>>(
    buildInitialWindowStates
  );
  const [minimizeAnim, setMinimizeAnim] = useState<{
    id: number;
    dx: number;
    dy: number;
  } | null>(null);

  const cardRefs = useRef<Map<number, HTMLElement>>(new Map());
  const dockRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const maximizedModalRef = useRef<HTMLDivElement>(null);
  const windowStatesRef = useRef(windowStates);
  const [dockThumbnails, setDockThumbnails] = useState<Record<number, string>>({});
  const [coarsePointer, setCoarsePointer] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(pointer: coarse)');
    const sync = () => setCoarsePointer(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    windowStatesRef.current = windowStates;
  }, [windowStates]);

  useEffect(() => {
    const pathLocale = getLocaleFromUrl(window.location.pathname);
    setLocale(pathLocale);
  }, []);

  useEffect(() => {
    setActiveFilter(locale === 'en' ? translations.en.all : translations.es.all);
  }, [locale]);

  const setWindow = useCallback((id: number, next: WindowState) => {
    setWindowStates((prev) => ({ ...prev, [id]: next }));
  }, []);

  const setCardRef = useCallback((id: number): RefCallback<HTMLElement> => {
    return (el) => {
      if (el) cardRefs.current.set(id, el);
      else cardRefs.current.delete(id);
    };
  }, []);

  const projects: ProjectData[] = useMemo(
    () =>
      projectsSource.map((p) => ({
        ...p,
        description: p.description[locale],
        whatWasDone: p.whatWasDone[locale],
      })),
    [locale]
  );

  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));
  const filterChips = [t.all, ...allTags.slice(0, 6)];
  const isAllProjectsFilter =
    activeFilter === translations.es.all || activeFilter === translations.en.all;
  const filteredProjects = isAllProjectsFilter
    ? projects
    : projects.filter((p) => p.tags.includes(activeFilter));

  const layoutGridEnabled = !prefersReducedMotion && minimizeAnim === null;

  const maximizedProject = useMemo(() => {
    const id = Number(
      Object.entries(windowStates).find(([, s]) => s === 'maximized')?.[0] ?? NaN
    );
    if (!Number.isFinite(id)) return null;
    return projects.find((p) => p.id === id) ?? null;
  }, [windowStates, projects]);

  useEffect(() => {
    if (!maximizedProject) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [maximizedProject]);

  useEffect(() => {
    if (!maximizedProject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setWindow(maximizedProject.id, 'open');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [maximizedProject, setWindow]);

  const captureDockThumbnail = useCallback(
    async (el: HTMLElement | null, projectId: number) => {
      if (!el || prefersReducedMotion) return;
      try {
        const { default: html2canvas } = await import('html2canvas');
        const canvas = await html2canvas(el, {
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#0a0a0f',
          logging: false,
        });
        const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
        setDockThumbnails((prev) => ({ ...prev, [projectId]: dataUrl }));
      } catch {
        /* Sin miniatura si falla CORS u otro error */
      }
    },
    [prefersReducedMotion]
  );

  const handleMinimize = useCallback(
    async (projectId: number) => {
      const ws = windowStatesRef.current;
      if (ws[projectId] === 'maximized') {
        const modalEl = maximizedModalRef.current;
        await captureDockThumbnail(modalEl, projectId);
        if (prefersReducedMotion || !modalEl) {
          setWindow(projectId, 'minimized');
          return;
        }
        const dockEl = dockRefs.current.get(projectId);
        if (!dockEl) {
          setWindow(projectId, 'minimized');
          return;
        }
        const cr = modalEl.getBoundingClientRect();
        const cx = cr.left + cr.width / 2;
        const cy = cr.top + cr.height / 2;
        const dr = dockEl.getBoundingClientRect();
        const dx = dr.left + dr.width / 2 - cx;
        const dy = dr.top + dr.height / 2 - cy;
        setMinimizeAnim({ id: projectId, dx, dy });
        return;
      }

      const cardEl = cardRefs.current.get(projectId);
      await captureDockThumbnail(cardEl ?? null, projectId);

      if (prefersReducedMotion || !cardEl) {
        setWindow(projectId, 'minimized');
        return;
      }
      const dockEl = dockRefs.current.get(projectId);
      const cr = cardEl.getBoundingClientRect();
      const cx = cr.left + cr.width / 2;
      const cy = cr.top + cr.height / 2;
      let dx: number;
      let dy: number;
      if (dockEl) {
        const dr = dockEl.getBoundingClientRect();
        dx = dr.left + dr.width / 2 - cx;
        dy = dr.top + dr.height / 2 - cy;
      } else {
        const targetX = window.innerWidth / 2;
        const targetY = window.innerHeight - 72;
        dx = targetX - cx;
        dy = targetY - cy;
      }
      setMinimizeAnim({ id: projectId, dx, dy });
    },
    [captureDockThumbnail, prefersReducedMotion, setWindow]
  );

  const handleMinimizeAnimationComplete = useCallback(
    (projectId: number) => {
      if (!minimizeAnim || minimizeAnim.id !== projectId) return;
      setWindow(projectId, 'minimized');
      setMinimizeAnim(null);
    },
    [minimizeAnim, setWindow]
  );

  const dockIds = useMemo(() => {
    const ids = new Set<number>();
    for (const p of filteredProjects) {
      if (windowStates[p.id] === 'minimized') ids.add(p.id);
    }
    if (minimizeAnim) ids.add(minimizeAnim.id);
    return Array.from(ids).sort((a, b) => a - b);
  }, [filteredProjects, windowStates, minimizeAnim]);

  const dockProjectSlots = useMemo(() => {
    return dockIds
      .map((id) => filteredProjects.find((p) => p.id === id))
      .filter((p): p is ProjectData => p != null)
      .map((p) => ({
        id: p.id,
        emoji: p.image ?? '💼',
        title: p.title,
        onActivate: () => {
          setMinimizeAnim((prev) => (prev?.id === p.id ? null : prev));
          setWindow(p.id, 'open');
        },
      }));
  }, [dockIds, filteredProjects, setWindow]);

  useEffect(() => {
    const w = window as unknown as Record<string, unknown>;
    w[DOCK_REGISTER_REF_KEY] = (id: number, el: HTMLButtonElement | null) => {
      if (el) dockRefs.current.set(id, el);
      else dockRefs.current.delete(id);
    };
    return () => {
      delete w[DOCK_REGISTER_REF_KEY];
    };
  }, []);

  useEffect(() => {
    const slots = dockProjectSlots.map((s) => ({
      id: s.id,
      emoji: s.emoji,
      title: s.title,
      thumbnailDataUrl: dockThumbnails[s.id] ?? null,
    }));
    window.dispatchEvent(new CustomEvent(DOCK_META_EVENT, { detail: { slots } }));
  }, [dockProjectSlots, dockThumbnails]);

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<{ projectId: number }>).detail?.projectId;
      if (typeof id !== 'number') return;
      setMinimizeAnim((prev) => (prev?.id === id ? null : prev));
      setWindow(id, 'open');
    };
    window.addEventListener(DOCK_PROJECT_ACTIVATE_EVENT, handler);
    return () => window.removeEventListener(DOCK_PROJECT_ACTIVATE_EVENT, handler);
  }, [setWindow]);

  useEffect(() => {
    return () => {
      window.dispatchEvent(new CustomEvent(DOCK_META_EVENT, { detail: { slots: [] } }));
    };
  }, []);

  return (
    <>
      <section id="proyectos" className="relative bg-surface py-20 pb-32 md:pb-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 font-heading text-3xl font-bold text-text-primary md:text-4xl">
            {t.title}
            <span className="text-accent-cyan">{t.titleHighlight}</span>
          </h2>
          <p className="mb-8 max-w-2xl text-text-secondary">{t.subtitle}</p>

          <div className="mb-10 flex flex-wrap items-center gap-2">
            <span className="sr-only">{t.filtersLabel}</span>
            {filterChips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setActiveFilter(chip)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
                  activeFilter === chip
                    ? 'bg-accent-cyan text-background shadow-[0_0_24px_-8px_rgba(6,182,212,0.55)]'
                    : 'border border-transparent bg-surface-2 text-text-secondary hover:border-border hover:text-text-primary'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>

          <motion.div
            layout={layoutGridEnabled}
            className={`grid grid-cols-1 gap-7 overflow-visible sm:gap-8 md:grid-cols-2 2xl:grid-cols-3 ${!prefersReducedMotion && !coarsePointer ? dockMinimizePerspectiveClass : ''}`}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const s = windowStates[project.id];
                const minimizeActive = minimizeAnim?.id === project.id;

                if (s === 'closed') {
                  return (
                    <motion.article
                      key={project.id}
                      id={`project-window-${project.id}`}
                      layout={!prefersReducedMotion}
                      initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
                      className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-dashed border-border/80 bg-surface-2/35 p-6 text-center"
                    >
                      <span className="mb-2 text-4xl" aria-hidden>
                        {project.image ?? '💼'}
                      </span>
                      <h3 className="mb-1 font-heading text-lg font-bold text-text-primary">
                        {project.title}
                      </h3>
                      <p className="mb-4 max-w-xs text-sm text-text-secondary">{pw.slotClosedHint}</p>
                      <button
                        type="button"
                        onClick={() => setWindow(project.id, 'open')}
                        className="rounded-full border border-accent-cyan/40 bg-accent-cyan/10 px-4 py-2 text-sm font-medium text-accent-cyan transition hover:bg-accent-cyan/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70"
                      >
                        {pw.restore}
                      </button>
                    </motion.article>
                  );
                }

                if (s === 'minimized') {
                  return (
                    <motion.article
                      key={project.id}
                      id={`project-window-${project.id}`}
                      layout={!prefersReducedMotion}
                      initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
                      className="flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-3xl border border-amber-500/25 bg-surface-2/50 p-6 text-center transition hover:border-amber-500/45"
                      role="button"
                      tabIndex={0}
                      onClick={() => setWindow(project.id, 'open')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setWindow(project.id, 'open');
                        }
                      }}
                    >
                      <span className="mb-2 text-4xl" aria-hidden>
                        {project.image ?? '💼'}
                      </span>
                      <h3 className="mb-1 font-heading text-lg font-bold text-text-primary">
                        {project.title}
                      </h3>
                      <p className="max-w-xs text-sm text-text-secondary">{pw.slotMinimizedHint}</p>
                    </motion.article>
                  );
                }

                if (s === 'maximized') {
                  return (
                    <motion.article
                      key={project.id}
                      id={`project-window-${project.id}`}
                      layout={!prefersReducedMotion}
                      className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-accent-cyan/30 bg-surface-2/55 p-6 text-center"
                    >
                      <span className="mb-2 text-4xl" aria-hidden>
                        {project.image ?? '💼'}
                      </span>
                      <h3 className="mb-1 font-heading text-lg font-bold text-text-primary">
                        {project.title}
                      </h3>
                      <p className="mb-4 max-w-xs text-sm text-text-secondary">{pw.slotMaximizedHint}</p>
                      <button
                        type="button"
                        onClick={() => setWindow(project.id, 'open')}
                        className="rounded-full border border-border bg-background/50 px-4 py-2 text-sm font-medium text-text-primary transition hover:border-accent-cyan/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70"
                      >
                        {pw.slotBackToGrid}
                      </button>
                    </motion.article>
                  );
                }

                return (
                  <motion.article
                    key={project.id}
                    id={`project-window-${project.id}`}
                    ref={setCardRef(project.id)}
                    layout={!prefersReducedMotion && minimizeAnim === null}
                    initial={{
                      opacity: prefersReducedMotion ? 1 : 0,
                      y: prefersReducedMotion ? 0 : 18,
                      scale: prefersReducedMotion ? 1 : 0.98,
                    }}
                    animate={
                      minimizeActive
                        ? prefersReducedMotion
                          ? {
                              x: minimizeAnim!.dx,
                              y: minimizeAnim!.dy,
                              scaleX: 0.1,
                              scaleY: 0.04,
                              rotateX: 0,
                              opacity: 0.2,
                              borderRadius: 999,
                            }
                          : dockMinimizeKeyframeXY(minimizeAnim!.dx, minimizeAnim!.dy, 24)
                        : {
                            opacity: 1,
                            y: 0,
                            x: 0,
                            scaleX: 1,
                            scaleY: 1,
                            rotateX: 0,
                            borderRadius: 24,
                          }
                    }
                    exit={{
                      opacity: 0,
                      y: 10,
                      scale: prefersReducedMotion ? 1 : 0.98,
                    }}
                    transition={{
                      ...(prefersReducedMotion && minimizeActive
                        ? { duration: 0.12, ease: 'easeOut' as const }
                        : dockMinimizeTransition(minimizeActive)),
                      delay:
                        prefersReducedMotion || minimizeActive ? 0 : index * 0.04,
                    }}
                    onAnimationComplete={() => {
                      if (minimizeActive) {
                        handleMinimizeAnimationComplete(project.id);
                      }
                    }}
                    style={{
                      ...dockMinimizeMotionStyle,
                      zIndex: minimizeActive ? 80 : undefined,
                    }}
                    className="group touch-pan-y overflow-visible rounded-3xl border border-border/60 bg-surface-2/90 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.5)] transition-[border-color,box-shadow] hover:border-accent-cyan/40 hover:shadow-[0_14px_44px_-22px_rgba(6,182,212,0.12)]"
                  >
                    <FlipCardBody
                      project={project}
                      pw={pw}
                      t={t}
                      setWindow={setWindow}
                      handleMinimize={handleMinimize}
                      prefersReducedMotion={prefersReducedMotion}
                      isWindowOpen={s === 'open'}
                    />
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence mode="wait">
            {maximizedProject ? (
              <motion.div
                key={`max-${maximizedProject.id}`}
                role="presentation"
                className="fixed inset-0 z-[200]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
              >
                <button
                  type="button"
                  aria-label={pw.modalOverlayClose}
                  className="absolute inset-0 bg-background/80 backdrop-blur-md"
                  onClick={() => setWindow(maximizedProject.id, 'open')}
                />
                <div
                  className={`pointer-events-none absolute inset-0 flex items-center justify-center p-3 sm:p-6 md:p-8 ${!prefersReducedMotion ? dockMinimizePerspectiveClass : ''}`}
                >
                  <motion.div
                    ref={maximizedModalRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={`max-title-${maximizedProject.id}`}
                    className="pointer-events-auto max-h-[min(94vh,920px)] w-full max-w-[min(96vw,80rem)] overflow-y-auto rounded-3xl border border-border bg-surface-2/95 p-5 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.65)] backdrop-blur-xl md:p-8"
                    initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96 }}
                    animate={
                      minimizeAnim && minimizeAnim.id === maximizedProject.id
                        ? prefersReducedMotion
                          ? {
                              x: minimizeAnim.dx,
                              y: minimizeAnim.dy,
                              scale: 0.12,
                              rotateX: 0,
                              opacity: 0.2,
                              borderRadius: 999,
                            }
                          : dockMinimizeKeyframeUniform(minimizeAnim.dx, minimizeAnim.dy, 24)
                        : { opacity: 1, scale: 1, x: 0, y: 0, rotateX: 0, borderRadius: 24 }
                    }
                    exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.98 }}
                    transition={
                      prefersReducedMotion && minimizeAnim && minimizeAnim.id === maximizedProject.id
                        ? { duration: 0.12, ease: 'easeOut' as const }
                        : dockMinimizeTransition(!!(minimizeAnim && minimizeAnim.id === maximizedProject.id))
                    }
                    style={dockMinimizeMotionStyle}
                    onAnimationComplete={() => {
                      if (minimizeAnim && maximizedProject && minimizeAnim.id === maximizedProject.id) {
                        handleMinimizeAnimationComplete(maximizedProject.id);
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h2
                        id={`max-title-${maximizedProject.id}`}
                        className="font-heading text-lg font-bold text-text-primary md:text-xl"
                      >
                        {maximizedProject.title}
                      </h2>
                      <WindowTrafficLights
                        labels={{
                          close: pw.close,
                          minimize: pw.minimize,
                          maximize: pw.maximize,
                        }}
                        onClose={() => setWindow(maximizedProject.id, 'open')}
                        onMinimize={() => {
                          void handleMinimize(maximizedProject.id);
                        }}
                        hideMaximize
                      />
                    </div>
                    <ProjectPreview
                      variant="modal"
                      title={maximizedProject.title}
                      url={maximizedProject.demoUrl}
                      emoji={maximizedProject.image}
                      tags={maximizedProject.tags}
                      previewImage={maximizedProject.previewImage}
                      modalDescription={`${maximizedProject.description}\n\n${pw.cardDelivered}: ${maximizedProject.whatWasDone}`}
                      windowLabels={{
                        close: pw.close,
                        minimize: pw.minimize,
                        maximize: pw.maximize,
                      }}
                      hideWindowControls
                      openPreviewLabel={pw.openPreview}
                    />
                    <div className="mt-6 flex flex-wrap gap-3">
                      {maximizedProject.demoUrl ? (
                        <a
                          href={maximizedProject.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-hero-primary inline-flex items-center gap-2 text-sm"
                        >
                          {t.view}
                          <span aria-hidden="true">↗</span>
                        </a>
                      ) : null}
                      {maximizedProject.repoUrl ? (
                        <a
                          href={maximizedProject.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-2 px-5 py-2.5 text-sm font-medium text-text-primary transition hover:border-accent-cyan/50"
                        >
                          {pw.viewRepo}
                          <span aria-hidden="true">↗</span>
                        </a>
                      ) : null}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
