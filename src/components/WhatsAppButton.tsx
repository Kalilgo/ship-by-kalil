'use client';

import { FloatingWhatsApp } from 'react-floating-whatsapp';
import { useEffect, useState } from 'react';

import { getLocaleFromUrl } from '../i18n';
import type { Locale } from '../i18n';

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
  const [locale, setLocale] = useState<Locale>('es');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocale(getLocaleFromUrl(window.location.pathname));
    setMounted(true);
  }, []);

  const t = translations[locale];

  if (!mounted) return null;

  return (
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
      style={{ zIndex: 9999 }}
      avatar="/images/matias-kalil-portrait.png"
    />
  );
}
