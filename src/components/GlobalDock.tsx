'use client';

import { createPortal } from 'react-dom';
import { useCallback, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

import esI18n from '../i18n/es.json';
import enI18n from '../i18n/en.json';
import { getLocaleFromUrl } from '../i18n';
import type { Locale } from '../i18n';
import { PORTFOLIO_SOCIAL } from '../data/social';
import { openFloatingWhatsAppChat } from '../lib/openFloatingWhatsApp';
import {
  DOCK_HERO_ACTIVATE_EVENT,
  DOCK_HERO_DOCK_BUTTON_KEY,
  DOCK_HERO_META_EVENT,
  DOCK_META_EVENT,
  DOCK_PROJECT_ACTIVATE_EVENT,
  DOCK_REGISTER_REF_KEY,
  type DockHeroMetaDetail,
  type DockMetaSlot,
} from '../lib/portfolioDockBridge';

import { Dock } from './ui/Dock';

const CAL_BOOKING_URL = 'https://cal.com/matias-gomez-ugzqgi';

export default function GlobalDock() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [locale, setLocale] = useState<Locale>('es');
  const [dockSlots, setDockSlots] = useState<DockMetaSlot[]>([]);
  const [heroMeta, setHeroMeta] = useState<DockHeroMetaDetail | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setLocale(getLocaleFromUrl(window.location.pathname));
  }, []);

  useEffect(() => {
    const onMeta = (e: Event) => {
      const detail = (e as CustomEvent<{ slots: DockMetaSlot[] }>).detail;
      if (detail?.slots) setDockSlots(detail.slots);
    };
    window.addEventListener(DOCK_META_EVENT, onMeta);
    return () => window.removeEventListener(DOCK_META_EVENT, onMeta);
  }, []);

  useEffect(() => {
    const onHero = (e: Event) => {
      const detail = (e as CustomEvent<DockHeroMetaDetail>).detail;
      if (detail?.state && detail.title) setHeroMeta(detail);
    };
    window.addEventListener(DOCK_HERO_META_EVENT, onHero);
    return () => window.removeEventListener(DOCK_HERO_META_EVENT, onHero);
  }, []);

  const pw = locale === 'en' ? enI18n.projectsWindow : esI18n.projectsWindow;

  const registerProjectDockRef = useCallback((id: number, el: HTMLButtonElement | null) => {
    const bag = window as unknown as Record<string, unknown>;
    const fn = bag[DOCK_REGISTER_REF_KEY];
    if (typeof fn === 'function') {
      (fn as (i: number, e: HTMLButtonElement | null) => void)(id, el);
    }
  }, []);

  const openCalendarFromDock = useCallback(() => {
    window.open(CAL_BOOKING_URL, '_blank', 'noopener,noreferrer');
  }, []);

  const assignHeroDockButton = useCallback((el: HTMLButtonElement | null) => {
    const w = window as unknown as Record<string, unknown>;
    if (el) w[DOCK_HERO_DOCK_BUTTON_KEY] = el;
    else delete w[DOCK_HERO_DOCK_BUTTON_KEY];
  }, []);

  useEffect(() => {
    if (heroMeta?.state !== 'minimized') {
      assignHeroDockButton(null);
    }
  }, [heroMeta?.state, assignHeroDockButton]);

  const settingsMinimized =
    heroMeta?.state === 'minimized'
      ? {
          titleAttr: pw.dockSettings,
          onActivate: () => {
            window.dispatchEvent(new CustomEvent(DOCK_HERO_ACTIVATE_EVENT));
          },
          onDockButtonRef: assignHeroDockButton,
        }
      : null;

  const dockProjectSlots = dockSlots.map((s) => ({
    ...s,
    onActivate: () => {
      window.dispatchEvent(
        new CustomEvent(DOCK_PROJECT_ACTIVATE_EVENT, { detail: { projectId: s.id } })
      );
    },
  }));

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 flex justify-center px-3 pb-3 pt-1"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="pointer-events-auto flex w-full justify-center">
        <Dock
          projects={dockProjectSlots}
          settingsMinimized={settingsMinimized}
          reducedMotion={!!prefersReducedMotion}
          registerProjectDockRef={registerProjectDockRef}
          onWhatsAppClick={openFloatingWhatsAppChat}
          onCalendarClick={openCalendarFromDock}
          labels={{
            dockTitle: pw.dockTitle,
            whatsapp: pw.dockWhatsApp,
            calendar: pw.dockCalendar,
            linkedIn: pw.dockLinkedIn,
            github: pw.dockGitHub,
            gmail: pw.dockGmail,
          }}
          social={{
            linkedIn: PORTFOLIO_SOCIAL.linkedin,
            github: PORTFOLIO_SOCIAL.github,
            gmail: PORTFOLIO_SOCIAL.gmail,
          }}
        />
      </div>
    </div>,
    document.body
  );
}
