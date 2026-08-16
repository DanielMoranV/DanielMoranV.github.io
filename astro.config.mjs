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
      // `lastmod` con la fecha del build. Es lo unico honesto que hay: el
      // sitio no guarda fecha de publicacion por pagina, y una fecha
      // inventada por URL es peor que ninguna.
      serialize: (item) => ({ ...item, lastmod: new Date().toISOString() }),
    }),
  ],

  // La hoja pesa ~5 KB, justo por encima del umbral con el que Astro decide
  // solo. Servida aparte era la unica peticion que bloqueaba el pintado;
  // incrustada desaparece ese viaje de ida y vuelta. Se paga con no poder
  // cachearla entre paginas, que en un perfil —donde la mayoria de visitas
  // son de una sola pagina— sale a cuenta.
  build: { inlineStylesheets: 'always' },

  vite: {
    plugins: [tailwindcss()],
  },
});
