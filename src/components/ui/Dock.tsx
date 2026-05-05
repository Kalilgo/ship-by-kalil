import { useEffect, useRef, useState, type MouseEventHandler } from 'react';
import { Calendar } from 'lucide-react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  type SpringOptions,
} from 'framer-motion';

import { SystemSettingsDockIcon } from './SystemSettingsIcon';

const SPRING: SpringOptions = { mass: 0.12, stiffness: 220, damping: 14 };

export interface DockProjectSlot {
  id: number;
  emoji: string;
  title: string;
  thumbnailDataUrl?: string | null;
  onActivate: () => void;
}

interface DockMagnifyItemProps {
  mouseX: MotionValue<number>;
  reducedMotion: boolean;
  /** En táctil no hay hover fino: tamaño fijo sin efecto macOS */
  sizeFixed: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  titleAttr: string;
  onButtonRef?: (el: HTMLButtonElement | null) => void;
  showActiveDot?: boolean;
  minimizedDot?: boolean;
  /** Miniatura estilo macOS (proyectos minimizados). */
  thumbnailUrl?: string | null;
}

function DockMagnifyItem({
  mouseX,
  reducedMotion,
  sizeFixed,
  children,
  className = '',
  onClick,
  titleAttr,
  onButtonRef,
  showActiveDot,
  minimizedDot,
  thumbnailUrl,
}: DockMagnifyItemProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const setRefs = (el: HTMLButtonElement | null) => {
    ref.current = el;
    onButtonRef?.(el);
  };

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return 300;
    return val - bounds.left - bounds.width / 2;
  });

  const sizeSync = useTransform(distance, [-130, 0, 130], [42, 72, 42]);
  const sizeSpring = useSpring(sizeSync, SPRING);

  const baseSize = 42;

  return (
    <div className="relative flex flex-col items-center justify-center gap-1">
      <div className="group/dock-tip relative flex flex-col items-center justify-center">
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-[100] mb-2 block max-w-[min(14rem,calc(100vw-2rem))] -translate-x-1/2 truncate rounded-md border border-border/90 bg-surface-2/95 px-2.5 py-1 text-center text-[11px] font-medium text-text-primary shadow-[0_8px_24px_-8px_rgba(0,0,0,0.75)] backdrop-blur-md [@media(pointer:coarse)]:hidden opacity-0 transition-opacity duration-150 ease-out group-hover/dock-tip:opacity-100"
        >
          {titleAttr}
        </span>
        <motion.button
        ref={setRefs}
        type="button"
        aria-label={titleAttr}
        onClick={onClick}
        whileTap={reducedMotion ? undefined : { scale: 0.88 }}
        transition={{ type: 'spring', stiffness: 520, damping: 22 }}
        style={
          reducedMotion || sizeFixed
            ? { width: baseSize, height: baseSize }
            : { width: sizeSpring, height: sizeSpring }
        }
        className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-b from-surface-2/95 to-background/90 shadow-[0_8px_28px_-12px_rgba(0,0,0,0.65)] backdrop-blur-md [@media(pointer:coarse)]:backdrop-blur-none transition-opacity hover:border-accent-cyan/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70 active:brightness-110 active:duration-75 ${className}`}
      >
        {thumbnailUrl ? (
          <>
            <span
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${thumbnailUrl})` }}
              aria-hidden
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent" aria-hidden />
          </>
        ) : null}
        <span
          className={`relative z-[1] flex size-full items-center justify-center p-1 ${thumbnailUrl ? 'opacity-90 drop-shadow-sm' : ''}`}
        >
          {children}
        </span>
        </motion.button>
      </div>
      <span
        className={`h-1 w-1 rounded-full transition-colors ${
          showActiveDot
            ? minimizedDot
              ? 'bg-amber-400/90 shadow-[0_0_8px_rgba(251,191,36,0.55)]'
              : 'bg-white/85 shadow-[0_0_8px_rgba(255,255,255,0.35)]'
            : 'bg-transparent'
        }`}
        aria-hidden
      />
    </div>
  );
}

interface DockSocialButtonProps {
  mouseX: MotionValue<number>;
  reducedMotion: boolean;
  sizeFixed: boolean;
  titleAttr: string;
  href: string;
  children: React.ReactNode;
}

/** Misma magnificación que el resto; enlaces externos en nueva pestaña (mailto en mismo tab). */
function DockSocialButton({ mouseX, reducedMotion, sizeFixed, titleAttr, href, children }: DockSocialButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return 300;
    return val - bounds.left - bounds.width / 2;
  });
  const sizeSync = useTransform(distance, [-130, 0, 130], [42, 72, 42]);
  const sizeSpring = useSpring(sizeSync, SPRING);
  const baseSize = 42;

  const open = () => {
    if (href.startsWith('mailto:')) {
      window.location.href = href;
    } else {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center gap-1">
      <div className="group/dock-tip relative flex flex-col items-center justify-center">
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-[100] mb-2 block max-w-[min(14rem,calc(100vw-2rem))] -translate-x-1/2 truncate rounded-md border border-border/90 bg-surface-2/95 px-2.5 py-1 text-center text-[11px] font-medium text-text-primary shadow-[0_8px_24px_-8px_rgba(0,0,0,0.75)] backdrop-blur-md [@media(pointer:coarse)]:hidden opacity-0 transition-opacity duration-150 ease-out group-hover/dock-tip:opacity-100"
        >
          {titleAttr}
        </span>
        <motion.button
        ref={ref}
        type="button"
        aria-label={titleAttr}
        onClick={(e) => {
          e.stopPropagation();
          open();
        }}
        whileTap={reducedMotion ? undefined : { scale: 0.88 }}
        transition={{ type: 'spring', stiffness: 520, damping: 22 }}
        style={
          reducedMotion || sizeFixed
            ? { width: baseSize, height: baseSize }
            : { width: sizeSpring, height: sizeSpring }
        }
        className="relative flex shrink-0 items-center justify-center rounded-2xl border border-border/80 bg-gradient-to-b from-surface-2/95 to-background/90 shadow-[0_8px_28px_-12px_rgba(0,0,0,0.65)] backdrop-blur-md [@media(pointer:coarse)]:backdrop-blur-none transition-opacity hover:border-accent-cyan/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70 active:brightness-110 active:duration-75"
      >
        {children}
        </motion.button>
      </div>
      <span className="h-1 w-1 rounded-full bg-transparent" aria-hidden />
    </div>
  );
}

function DockSeparator() {
  return (
    <div
      className="h-9 w-px shrink-0 self-center rounded-full bg-border/70 sm:h-10"
      aria-hidden
    />
  );
}

function WhatsAppDockIcon({ className = '' }: { className?: string }) {
  return (
    <span
      className={`box-border flex aspect-square h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#25D366] shadow-inner ring-1 ring-black/10 sm:h-9 sm:w-9 [transform:translateZ(0)] ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0 text-white [transform:none] sm:h-5 sm:w-5" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </span>
  );
}

function LinkedInMark({ className = '' }: { className?: string }) {
  return (
    <span className={`flex size-[58%] min-w-[22px] items-center justify-center rounded-[11px] bg-[#0A66C2] shadow-inner ${className}`} aria-hidden>
      <svg viewBox="0 0 24 24" className="size-[62%] text-white" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    </span>
  );
}

function GitHubMark({ className = '' }: { className?: string }) {
  return (
    <span className={`flex size-[58%] min-w-[22px] items-center justify-center rounded-[11px] bg-[#24292f] shadow-inner ${className}`} aria-hidden>
      <svg viewBox="0 0 24 24" className="size-[62%] text-white" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    </span>
  );
}

function GmailMark({ className = '' }: { className?: string }) {
  return (
    <span
      className={`relative flex size-[58%] min-w-[22px] items-center justify-center overflow-hidden rounded-[11px] bg-white shadow-inner ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="size-[72%]">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    </span>
  );
}

export interface DockLabels {
  dockTitle: string;
  whatsapp: string;
  calendar: string;
  linkedIn: string;
  github: string;
  gmail: string;
}

/** Terminal del hero minimizado: icono de ajustes (solo visible al minimizar). */
export interface DockSettingsMinimizedState {
  onActivate: () => void;
  onDockButtonRef: (el: HTMLButtonElement | null) => void;
  titleAttr: string;
}

interface DockProps {
  projects: DockProjectSlot[];
  settingsMinimized: DockSettingsMinimizedState | null;
  reducedMotion: boolean;
  registerProjectDockRef: (id: number, el: HTMLButtonElement | null) => void;
  onWhatsAppClick: () => void;
  onCalendarClick: () => void;
  labels: DockLabels;
  social: {
    linkedIn: string;
    github: string;
    gmail: string;
  };
}

export function Dock({
  projects,
  settingsMinimized,
  reducedMotion,
  registerProjectDockRef,
  onWhatsAppClick,
  onCalendarClick,
  labels,
  social,
}: DockProps) {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  const showProjSep = projects.length > 0 || settingsMinimized !== null;

  const [coarsePointer, setCoarsePointer] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(pointer: coarse)');
    const sync = () => setCoarsePointer(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  /** Táctil: sin zoom por cursor; solo escritorio con puntero fino magnifica */
  const sizeFixed = reducedMotion || coarsePointer;

  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === 'visible') mouseX.set(Number.POSITIVE_INFINITY);
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [mouseX]);

  return (
    <motion.nav
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
      className="mx-auto inline-flex max-w-[min(100vw-1rem,52rem)] flex-nowrap items-center justify-center gap-2 rounded-[1.35rem] border border-border/90 bg-surface-2/65 px-3 py-2 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.55)] backdrop-blur-xl [@media(pointer:coarse)]:bg-surface-2/90 [@media(pointer:coarse)]:backdrop-blur-none sm:gap-2.5 sm:px-4"
      aria-label={labels.dockTitle}
    >
        {settingsMinimized ? (
          <DockMagnifyItem
            mouseX={mouseX}
            reducedMotion={reducedMotion}
            sizeFixed={sizeFixed}
            titleAttr={settingsMinimized.titleAttr}
            onButtonRef={settingsMinimized.onDockButtonRef}
            onClick={(e) => {
              e.stopPropagation();
              settingsMinimized.onActivate();
            }}
            showActiveDot
            minimizedDot
          >
            <SystemSettingsDockIcon />
          </DockMagnifyItem>
        ) : null}

        {projects.map((p) => (
          <DockMagnifyItem
            key={p.id}
            mouseX={mouseX}
            reducedMotion={reducedMotion}
            sizeFixed={sizeFixed}
            titleAttr={p.title}
            onButtonRef={(el) => registerProjectDockRef(p.id, el)}
            onClick={p.onActivate}
            showActiveDot
            minimizedDot
            thumbnailUrl={p.thumbnailDataUrl}
          >
            {!p.thumbnailDataUrl ? (
              <span className="select-none text-[1.35rem] leading-none sm:text-[1.5rem]" aria-hidden>
                {p.emoji}
              </span>
            ) : (
              <span className="sr-only">{p.title}</span>
            )}
          </DockMagnifyItem>
        ))}

        {showProjSep ? <DockSeparator /> : null}

        <DockMagnifyItem
          mouseX={mouseX}
          reducedMotion={reducedMotion}
          sizeFixed={sizeFixed}
          titleAttr={labels.whatsapp}
          onClick={(e) => {
            e.stopPropagation();
            onWhatsAppClick();
          }}
        >
          <WhatsAppDockIcon />
        </DockMagnifyItem>

        <DockMagnifyItem
          mouseX={mouseX}
          reducedMotion={reducedMotion}
          sizeFixed={sizeFixed}
          titleAttr={labels.calendar}
          onClick={onCalendarClick}
          className="text-accent-cyan"
        >
          <Calendar className="size-5 shrink-0 stroke-[1.75]" aria-hidden />
        </DockMagnifyItem>

        <DockSeparator />

        <DockSocialButton
          mouseX={mouseX}
          reducedMotion={reducedMotion}
          sizeFixed={sizeFixed}
          titleAttr={labels.linkedIn}
          href={social.linkedIn}
        >
          <LinkedInMark />
        </DockSocialButton>
        <DockSocialButton
          mouseX={mouseX}
          reducedMotion={reducedMotion}
          sizeFixed={sizeFixed}
          titleAttr={labels.github}
          href={social.github}
        >
          <GitHubMark />
        </DockSocialButton>
        <DockSocialButton
          mouseX={mouseX}
          reducedMotion={reducedMotion}
          sizeFixed={sizeFixed}
          titleAttr={labels.gmail}
          href={social.gmail}
        >
          <GmailMark />
        </DockSocialButton>
    </motion.nav>
  );
}
