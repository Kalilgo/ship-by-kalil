'use client';

import { ChevronUp } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

import { getLocaleFromUrl } from '../i18n';
import type { Locale } from '../i18n';
import esI18n from '../i18n/es.json';
import enI18n from '../i18n/en.json';

const SHOW_AFTER_PX = 380;

const labels: Record<Locale, string> = {
  es: esI18n.nav.scrollToTop,
  en: enI18n.nav.scrollToTop,
};

export default function ScrollToTop() {
  const reducedMotion = useReducedMotion();
  const [locale, setLocale] = useState<Locale>(() =>
    typeof window !== 'undefined' ? getLocaleFromUrl(window.location.pathname) : 'es'
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setLocale(getLocaleFromUrl(window.location.pathname));
  }, []);

  const onScroll = useCallback(() => {
    setVisible(window.scrollY > SHOW_AFTER_PX);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  const scrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="scroll-top"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: 12 }}
          transition={{ type: 'spring', stiffness: 420, damping: 28 }}
          className="fixed left-3 z-[50] sm:left-5"
          style={{
            bottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))',
          }}
        >
          <button
            type="button"
            onClick={scrollTop}
            aria-label={labels[locale]}
            title={labels[locale]}
            className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border/80 bg-gradient-to-b from-surface-2/95 to-background/90 text-foreground shadow-[0_8px_28px_-12px_rgba(0,0,0,0.65)] backdrop-blur-md [@media(pointer:coarse)]:backdrop-blur-none transition-[transform,box-shadow] hover:border-accent-cyan/35 hover:shadow-[0_10px_32px_-10px_rgba(6,182,212,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70 active:scale-[0.94]"
          >
            <ChevronUp className="size-[46%] min-w-[18px] stroke-[2.25]" aria-hidden />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
