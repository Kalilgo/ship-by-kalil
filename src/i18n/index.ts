export const languages = {
  es: 'Español',
  en: 'English',
} as const;

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
