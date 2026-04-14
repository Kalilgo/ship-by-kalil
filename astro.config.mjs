import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

/** Production URL (Open Graph, canonical, sitemap). Override with PUBLIC_SITE_URL in .env */
const site =
  process.env.PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://kalil.dev';

export default defineConfig({
  site,
  integrations: [react(), tailwind(), sitemap()],
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: false },
  }),
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
});
