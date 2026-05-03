/**
 * Abre el chat flotante (mismo comportamiento que el botón verde).
 * El launcher de react-floating-whatsapp es un **div** con clase `floating-whatsapp-button`.
 *
 * Projects y WhatsApp viven en islas Astro distintas: no hay Context compartido.
 * WhatsAppButton registra en `window` un opener que corre en el siguiente macrotick;
 * así el clic del dock no viaja a `document` y `allowClickAway` no cierra el panel al instante.
 */

import type { Locale } from '../i18n';

/** Expuesto en window por WhatsAppButton tras montar FloatingWhatsApp. */
export const PORTFOLIO_WHATSAPP_OPEN_KEY = '__portfolioOpenFloatingWhatsApp';

function windowBag(): Record<string, unknown> {
  return window as unknown as Record<string, unknown>;
}

/** Registra el opener global (p. ej. desde WhatsAppButton). Devuelve cleanup. */
export function attachPortfolioWhatsAppOpener(opener: () => void): () => void {
  windowBag()[PORTFOLIO_WHATSAPP_OPEN_KEY] = opener;
  return () => {
    delete windowBag()[PORTFOLIO_WHATSAPP_OPEN_KEY];
  };
}

/** Mismo número que en WhatsAppButton.tsx (solo dígitos para la API). */
const PHONE_DIGITS = '5401161375359';

const DEFAULT_MESSAGES: Record<Locale, string> = {
  es: '¡Hola! Soy Matías, desarrollador web. Si estás buscando sumar alguien a tu equipo o tenés un proyecto, escribime y lo charlamos 🚀',
  en: "Hi! I'm Matías, web developer. If you're looking to add someone to your team or have a project, let's chat 🚀",
};

function getLocaleQuick(): Locale {
  if (typeof window === 'undefined') return 'es';
  return window.location.pathname.startsWith('/en') ? 'en' : 'es';
}

/** Botón flotante que abre/cierra el panel (primer hijo con clase launcher). */
function getLauncherElement(): HTMLElement | null {
  const root = document.querySelector('.floating-whatsapp');
  if (!root) return null;
  const direct = root.querySelector<HTMLElement>(':scope > div.floating-whatsapp-button');
  if (direct) return direct;
  return document.querySelector<HTMLElement>('div.floating-whatsapp-button');
}

function clickLauncher(el: HTMLElement): void {
  el.click();
}

/** Igual que el envío del formulario del widget (nueva pestaña). */
function openWhatsAppApiFallback(): void {
  const locale = getLocaleQuick();
  const text = encodeURIComponent(DEFAULT_MESSAGES[locale]);
  const url = `https://api.whatsapp.com/send?phone=${PHONE_DIGITS}&text=${text}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/** Abre en el siguiente macrotick para no competir con la propagación del clic que disparó la acción. */
function scheduleLauncherClick(el: HTMLElement): void {
  window.setTimeout(() => {
    clickLauncher(el);
  }, 0);
}

function getRegisteredOpener(): (() => void) | undefined {
  if (typeof window === 'undefined') return undefined;
  const fn = windowBag()[PORTFOLIO_WHATSAPP_OPEN_KEY];
  return typeof fn === 'function' ? (fn as () => void) : undefined;
}

export function openFloatingWhatsAppChat(): void {
  const registered = getRegisteredOpener();
  if (registered) {
    registered();
    return;
  }

  const tryOpen = (): boolean => {
    const launcher = getLauncherElement();
    if (!launcher) return false;
    scheduleLauncherClick(launcher);
    return true;
  };

  if (tryOpen()) return;

  let attempts = 0;
  const maxAttempts = 40;
  const id = window.setInterval(() => {
    attempts += 1;
    const reg = getRegisteredOpener();
    if (reg) {
      window.clearInterval(id);
      reg();
      return;
    }
    if (tryOpen()) {
      window.clearInterval(id);
      return;
    }
    if (attempts >= maxAttempts) {
      window.clearInterval(id);
      openWhatsAppApiFallback();
    }
  }, 50);
}
