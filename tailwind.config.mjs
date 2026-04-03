/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0F',
        surface: '#12121A',
        'surface-2': '#1A1A26',
        border: '#2A2A3A',
        accent: '#2563EB',
        'accent-cyan': '#06B6D4',
        'text-primary': '#F0F0F5',
        'text-secondary': '#8888AA',
      },
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
