export type Locale = 'es' | 'en';
export const defaultLocale: Locale = 'es';
export const STORAGE_KEY = 'locale';

export function getStoredLocale(): Locale | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'es' || stored === 'en') {
      return stored as Locale;
    }
  } catch {
    // localStorage not available
  }
  return null;
}

export function setStoredLocale(locale: Locale): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // localStorage not available
  }
}

/**
 * Idioma según la ruta (fuente de verdad para SSR y primer paint).
 * `/en` y `/en/*` → inglés; el resto (incl. `/`, `/cv`) → español por defecto.
 * La preferencia en localStorage la aplica el script inline de `Layout` redirigiendo a la URL correcta.
 */
export function getLocaleFromUrl(pathname: string): Locale {
  const path = pathname.split('?')[0] ?? pathname;
  if (path === '/en' || path.startsWith('/en/')) {
    return 'en';
  }
  return defaultLocale;
}

export function getPathForLocale(path: string, locale: Locale): string {
  if (locale === defaultLocale) {
    return path.replace(/^\/en/, '') || '/';
  }
  return path.startsWith('/') ? `/${locale}${path}` : `/${locale}/${path}`;
}

/**
 * Href for the language switcher: same logical page in the other locale (e.g. /cv ↔ /en/cv).
 */
export function getAlternateLocaleUrl(pathname: string, target: Locale): string {
  const raw = pathname.split('?')[0] ?? '/';
  let p = raw;
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);

  const onEnglishSite = p === '/en' || p.startsWith('/en/');

  if (p === '/cv' || p === '/en/cv') {
    return target === defaultLocale ? '/cv' : '/en/cv';
  }

  if (target === defaultLocale) {
    const stripped = p.replace(/^\/en(?=\/|$)/, '') || '/';
    return stripped === '' ? '/' : stripped.startsWith('/') ? stripped : `/${stripped}`;
  }

  if (onEnglishSite) {
    if (p === '/en') return '/en/';
    return p;
  }
  if (p === '/') return '/en/';
  return `/en${p}`;
}
