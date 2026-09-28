// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// TODO: reemplazar por el dominio final cuando lo tengas (afecta canonical, OG y sitemap).
const SITE = 'https://tomasbozzini.vercel.app';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  trailingSlash: 'never',

  fonts: [
    {
      // Archivo variable, subconjunto latino, con los dos ejes: peso y ancho.
      // Un solo archivo sirve los títulos (ancho expandido) y la interfaz (ancho normal).
      name: 'Archivo',
      cssVariable: '--ff-archivo',
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/archivo-latin-variable.woff2'],
            weight: '400 700',
            style: 'normal',
            stretch: '62% 125%',
          },
        ],
      },
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), sitemap()],
});
