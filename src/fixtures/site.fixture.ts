/**
 * Fixture canónico del sitio: rutas, i18n, payloads y límites para pruebas o futuros tests.
 * Importá desde tests o scripts de smoke (`import { siteFixture } from '../fixtures/site.fixture'`).
 */

export const siteFixture = {
  brand: {
    name: 'kalil.dev',
    defaultSiteUrl: 'https://kalil.dev',
  },

  locales: ['es', 'en'] as const,

  /** Rutas estáticas conocidas (para sitemap manual o E2E) */
  routes: {
    homeEs: '/',
    homeEn: '/en/',
    cv: '/cv/',
    notFound: '/404.html',
  },

  /** IDs de sección usados en anclas (#) */
  sectionIds: ['sobre-mi', 'skills', 'proyectos', 'experiencia', 'contacto'] as const,

  /** API contacto: mismos límites que el handler (mantener en sync) */
  contact: {
    maxLengths: {
      name: 120,
      email: 254,
      subject: 200,
      message: 8000,
    },
    validPayload: {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Fixture subject',
      message: 'Hello from site fixture.',
    },
    invalidPayload: {
      missingFields: {},
      xssAttempt: {
        name: '<script>alert(1)</script>',
        email: 'a@b.co',
        subject: 'x',
        message: 'y',
      },
    },
  },

  env: {
    publicKeys: ['PUBLIC_SITE_URL'] as const,
    serverKeys: ['RESEND_API_KEY', 'CONTACT_EMAIL'] as const,
  },
} as const;

export type SiteFixture = typeof siteFixture;
