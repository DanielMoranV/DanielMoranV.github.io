// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://danielmoranv.github.io',

  // Ingles por defecto y sin prefijo: quien llega aqui es un lector tecnico,
  // normalmente de fuera. El castellano vive en /es.
  //
  // Este sitio es el perfil de DESARROLLADOR. La marca vendedora —productos,
  // precio, casos contados para un dueno de empresa— vive en djasoft.net.pe,
  // con su propio repo. No se mezclan a proposito.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
