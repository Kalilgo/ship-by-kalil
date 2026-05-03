'use client';

import { FloatingWhatsApp } from 'react-floating-whatsapp';
import { useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { getLocaleFromUrl } from '../i18n';
import type { Locale } from '../i18n';
import { attachPortfolioWhatsAppOpener } from '../lib/openFloatingWhatsApp';

import './WhatsAppButton.css';

const translations = {
  es: {
    message:
      '¡Hola! Soy Matías, desarrollador web. Si estás buscando sumar alguien a tu equipo o tenés un proyecto, escribime y lo charlamos 🚀',
    status: 'Normalmente responde en 1 hora',
    placeholder: 'Escribe tu mensaje...',
  },
  en: {
    message:
      "Hi! I'm Matías, web developer. If you're looking to add someone to your team or have a project, let's chat 🚀",
    status: 'Usually responds within 1 hour',
    placeholder: 'Write your message...',
  },
};

export default function WhatsAppButton() {
  const [locale, setLocale] = useState<Locale>(() =>
    typeof window !== 'undefined' ? getLocaleFromUrl(window.location.pathname) : 'es'
  );
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = document.createElement('div');
    el.setAttribute('data-portfolio-whatsapp-root', '');
    document.body.appendChild(el);
    setPortalEl(el);
    return () => {
      el.remove();
    };
  }, []);

  useEffect(() => {
    setLocale(getLocaleFromUrl(window.location.pathname));
  }, []);

  useEffect(() => {
    return attachPortfolioWhatsAppOpener(() => {
      window.setTimeout(() => {
        const root = document.querySelector('.floating-whatsapp');
        const launcher =
          root?.querySelector<HTMLElement>(':scope > div.floating-whatsapp-button') ??
          document.querySelector<HTMLElement>('div.floating-whatsapp-button');
        launcher?.click();
      }, 0);
    });
  }, []);

  const t = translations[locale];

  const widget = (
    <FloatingWhatsApp
      phoneNumber="+5401161375359"
      accountName="Matías Kalil Gómez"
      chatMessage={t.message}
      statusMessage={t.status}
      placeholder={t.placeholder}
      messageDelay={1}
      chatboxHeight={380}
      allowEsc
      allowClickAway
      notification
      notificationDelay={15}
      notificationSound
      style={{ zIndex: 10020 }}
      avatar="/images/matias-kalil-portrait.png"
    />
  );

  return portalEl ? createPortal(widget, portalEl) : null;
}
