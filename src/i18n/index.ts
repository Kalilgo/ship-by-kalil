export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export type Locale = 'es' | 'en';
export const defaultLocale: Locale = 'es';

export function getLocaleFromUrl(pathname: string): Locale {
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
