'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { createPortal } from 'react-dom';

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
  DOCK_HERO_ACTIVATE_EVENT,
  DOCK_HERO_DOCK_BUTTON_KEY,
  DOCK_HERO_META_EVENT,
} from '../lib/portfolioDockBridge';

import { WindowTrafficLights } from './ui/WindowTrafficLights';

type HeroMode = 'open' | 'minimized' | 'closed' | 'maximized';

interface HeroCodeShellProps {
  locale: Locale;
}

function getHeroDockButtonEl(): HTMLButtonElement | null {
  const el = (window as unknown as Record<string, unknown>)[DOCK_HERO_DOCK_BUTTON_KEY];
  return el instanceof HTMLButtonElement ? el : null;
}

export default function HeroCodeShell({ locale }: HeroCodeShellProps) {
  const t = locale === 'en' ? enI18n.hero : esI18n.hero;
  const about = locale === 'en' ? enI18n.about : esI18n.about;
  const pw = locale === 'en' ? enI18n.projectsWindow : esI18n.projectsWindow;
  const prefersReducedMotion = useReducedMotion();

  const [mode, setMode] = useState<HeroMode>('open');
  const [minimizeAnim, setMinimizeAnim] = useState<{ dx: number; dy: number } | null>(null);
  const minimizeAnimRef = useRef(minimizeAnim);
  minimizeAnimRef.current = minimizeAnim;

  const panelRef = useRef<HTMLDivElement>(null);
  const maximizedRef = useRef<HTMLDivElement>(null);

  const emitHeroMeta = useCallback(() => {
    window.dispatchEvent(
      new CustomEvent(DOCK_HERO_META_EVENT, {
        detail: {
          state: mode,
          title: pw.dockSettings,
        },
      })
    );
  }, [mode, pw.dockSettings]);

  useEffect(() => {
    emitHeroMeta();
  }, [emitHeroMeta]);

  useEffect(() => {
    const onActivate = () => {
      setMode('open');
      setMinimizeAnim(null);
    };
    window.addEventListener(DOCK_HERO_ACTIVATE_EVENT, onActivate);
    return () => window.removeEventListener(DOCK_HERO_ACTIVATE_EVENT, onActivate);
  }, []);

  const finishMinimizeAnim = useCallback(() => {
    if (!minimizeAnimRef.current) return;
    setMode('minimized');
    setMinimizeAnim(null);
  }, []);

  const handleMinimize = useCallback(() => {
    if (mode === 'maximized') {
      const modalEl = maximizedRef.current;
      if (prefersReducedMotion || !modalEl) {
        setMode('minimized');
        return;
      }
      const dockEl = getHeroDockButtonEl();
      const cr = modalEl.getBoundingClientRect();
      const cx = cr.left + cr.width / 2;
      const cy = cr.top + cr.height / 2;
      let dx: number;
      let dy: number;
      if (dockEl) {
        const dr = dockEl.getBoundingClientRect();
        dx = dr.left + dr.width / 2 - cx;
        dy = dr.top + dr.height / 2 - cy;
      } else {
        dx = window.innerWidth / 2 - cx;
        dy = window.innerHeight - 72 - cy;
      }
      setMinimizeAnim({ dx, dy });
      return;
    }

    const cardEl = panelRef.current;
    if (prefersReducedMotion || !cardEl) {
      setMode('minimized');
      return;
    }
    const dockEl = getHeroDockButtonEl();
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
      dx = window.innerWidth / 2 - cx;
      dy = window.innerHeight - 72 - cy;
    }
    setMinimizeAnim({ dx, dy });
  }, [mode, prefersReducedMotion]);

  const minimizeActive = !!minimizeAnim;

  const codeBlock = (
    <>
      <pre className="overflow-x-hidden break-words whitespace-pre-wrap text-accent-cyan">
        <code>
          <span className="text-text-secondary">{'const'}</span> {t.codeVariable} = {'{'}
          {'\n'}
          {t.codeKeyName}: <span className="text-accent">&quot;Matías Kalil Gómez&quot;</span>,
          {'\n'}
          {t.codeKeyRole}: <span className="text-accent">&quot;{about.role}&quot;</span>,{'\n'}
          {t.codeKeyStack}: [<span className="text-accent">&quot;React&quot;</span>,{' '}
          <span className="text-accent">&quot;Angular&quot;</span>,{' '}
          <span className="text-accent">&quot;Astro&quot;</span>,{'\n'}
          <span className="text-accent">&quot;.NET&quot;</span>,{' '}
          <span className="text-accent">&quot;AWS&quot;</span>],
          {'\n'}
          {t.codeKeyMission}: <span className="text-accent">&quot;{t.codeMission}&quot;</span>,
          {'\n'}
          {t.codeKeyStatus}: <span className="text-accent">&quot;{t.codeStatus}&quot;</span>
          {'\n'}
          {'}'};
        </code>
      </pre>
      <div className="mt-3 flex items-center gap-2 border-t border-border/30 pt-3">
        <span className="select-none font-mono text-xs text-accent-cyan/60">~</span>
        <span className="font-mono text-xs text-text-secondary/50">{t.codeTerminalReady}</span>
        <span
          className="animate-blink select-none font-mono text-sm text-accent-cyan"
          aria-hidden="true"
        >
          ▋
        </span>
      </div>
    </>
  );

  if (mode === 'closed') {
    return (
      <div className="relative hidden min-h-[220px] min-w-0 md:block">
        <div className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-surface-2/40 p-6 text-center">
          <p className="mb-4 max-w-xs text-sm text-text-secondary">{pw.dockHeroClosedHint}</p>
          <button
            type="button"
            onClick={() => setMode('open')}
            className="rounded-full border border-accent-cyan/40 bg-accent-cyan/10 px-4 py-2 text-sm font-medium text-accent-cyan transition hover:bg-accent-cyan/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70"
          >
            {pw.restore}
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'minimized') {
    return (
      <div className="relative hidden min-h-[220px] min-w-0 md:block">
        <div
          role="button"
          tabIndex={0}
          onClick={() => setMode('open')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setMode('open');
            }
          }}
          className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-xl border border-amber-500/25 bg-surface-2/50 p-6 text-center transition hover:border-amber-500/45"
        >
          <span className="mb-2 font-mono text-3xl" aria-hidden>
            ⌘
          </span>
          <p className="max-w-xs text-sm text-text-secondary">{pw.dockHeroMinimizedHint}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {mode !== 'maximized' ? (
        <div
          className={`relative hidden min-w-0 md:block ${!prefersReducedMotion ? dockMinimizePerspectiveClass : ''}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent-cyan/20 blur-3xl" />
          <motion.div
            ref={panelRef}
            layout={!prefersReducedMotion && !minimizeActive}
            initial={false}
            animate={
              minimizeActive && minimizeAnim
                ? prefersReducedMotion
                  ? {
                      x: minimizeAnim.dx,
                      y: minimizeAnim.dy,
                      scaleX: 0.1,
                      scaleY: 0.04,
                      rotateX: 0,
                      opacity: 0.2,
                      borderRadius: 999,
                    }
                  : dockMinimizeKeyframeXY(minimizeAnim.dx, minimizeAnim.dy, 12)
                : {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    scaleX: 1,
                    scaleY: 1,
                    rotateX: 0,
                    borderRadius: 12,
                  }
            }
            transition={
              prefersReducedMotion && minimizeActive
                ? { duration: 0.12, ease: 'easeOut' }
                : dockMinimizeTransition(minimizeActive)
            }
            style={{
              ...dockMinimizeMotionStyle,
              zIndex: minimizeActive ? 80 : undefined,
            }}
            onAnimationComplete={finishMinimizeAnim}
            className="relative glass-panel min-w-0 max-w-full rounded-xl border border-border bg-surface-2/90 p-5 font-mono text-xs md:p-6 md:text-sm"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="hidden sm:block">
                <WindowTrafficLights
                  labels={{ close: pw.close, minimize: pw.minimize, maximize: pw.maximize }}
                  onClose={() => setMode('closed')}
                  onMinimize={handleMinimize}
                  onMaximize={() => setMode('maximized')}
                />
              </div>
              <span className="font-mono text-[10px] text-text-muted sm:hidden">
                {pw.dockHeroTitle}
              </span>
            </div>
            {codeBlock}
          </motion.div>
        </div>
      ) : null}

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {mode === 'maximized' ? (
              <motion.div
                key="hero-max"
                role="presentation"
                className="fixed inset-0 z-[150]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              >
                <button
                  type="button"
                  aria-label={pw.modalOverlayClose}
                  className="absolute inset-0 bg-background/80 backdrop-blur-md"
                  onClick={() => setMode('open')}
                />
                <div
                  className={`pointer-events-none absolute inset-0 flex items-center justify-center p-4 md:p-8 ${!prefersReducedMotion ? dockMinimizePerspectiveClass : ''}`}
                >
                  <motion.div
                    ref={maximizedRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label={pw.dockHeroTitle}
                    className="pointer-events-auto max-h-[min(94vh,920px)] w-full max-w-[min(96vw,48rem)] overflow-y-auto rounded-2xl border border-border bg-surface-2/95 p-6 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.65)] backdrop-blur-xl"
                    initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96 }}
                    animate={
                      minimizeAnim
                        ? prefersReducedMotion
                          ? {
                              x: minimizeAnim.dx,
                              y: minimizeAnim.dy,
                              scale: 0.12,
                              rotateX: 0,
                              opacity: 0.2,
                              borderRadius: 999,
                            }
                          : dockMinimizeKeyframeUniform(minimizeAnim.dx, minimizeAnim.dy, 16)
                        : { opacity: 1, scale: 1, x: 0, y: 0, rotateX: 0, borderRadius: 16 }
                    }
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={
                      prefersReducedMotion && minimizeAnim
                        ? { duration: 0.12, ease: 'easeOut' }
                        : dockMinimizeTransition(!!minimizeAnim)
                    }
                    style={dockMinimizeMotionStyle}
                    onAnimationComplete={finishMinimizeAnim}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="mb-4 flex justify-end">
                      <WindowTrafficLights
                        labels={{ close: pw.close, minimize: pw.minimize, maximize: pw.maximize }}
                        onClose={() => setMode('open')}
                        onMinimize={handleMinimize}
                        hideMaximize
                      />
                    </div>
                    {codeBlock}
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
