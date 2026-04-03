// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://yourusername.github.io/devhub',
  base: '/devhub',
  output: 'static',
  build: {
    format: 'file'
  },
  integrations: [sitemap()]
});