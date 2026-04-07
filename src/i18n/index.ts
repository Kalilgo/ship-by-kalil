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

export function getLocaleFromUrl(pathname: string): Locale {
  const storedLocale = getStoredLocale();
  if (storedLocale) {
    return storedLocale;
  }

  const segments = pathname.split('/').filter(Boolean);
  const potentialLocale = segments[0];

  if (potentialLocale && (potentialLocale === 'es' || potentialLocale === 'en')) {
    return potentialLocale as Locale;
  }

  return defaultLocale;
}

export function getPathForLocale(path: string, locale: Locale): string {
  if (locale === defaultLocale) {
    return path.replace(/^\/en/, '') || '/';
  }
  return path.startsWith('/') ? `/${locale}${path}` : `/${locale}/${path}`;
}
