// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://citizendata.ie',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  },

  adapter: cloudflare()
});