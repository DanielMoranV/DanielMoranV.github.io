// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
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

  // El sitemap se genera; no se escribe a mano. Cuando se anadan las paginas de
  // caso de estudio entraran solas, que es justo el fallo que un sitemap
  // estatico comete en silencio. Con la config i18n de arriba, cada URL declara
  // su alternativa en el otro idioma.
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es-PE' } },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
