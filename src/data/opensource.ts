/**
 * Piezas publicadas enteras: codigo con valor tecnico y sin valor comercial
 * propio, extraido de los productos y despojado de reglas de negocio.
 */

export interface Pieza {
  nombre: string;
  url: string;
  /** Distintivo corto: donde esta publicado, o el lenguaje y la licencia. */
  sello: string;
  que: { en: string; es: string };
}

export const piezas: Pieza[] = [
  {
    nombre: 'py-foxpro-engine',
    url: 'https://github.com/DanielMoranV/py-foxpro-engine',
    sello: 'Python · MIT',
    que: {
      en:
        'Reads and writes FoxPro (.dbf) tables natively, speaking FoxPro’s own byte-range ' +
        'locking protocol: it appends and edits while the 1990s application is open on every ' +
        'desk. No dependencies, no ODBC, no Windows binaries. Its README states its limits ' +
        'up front.',
      es:
        'Lee y escribe tablas FoxPro (.dbf) de forma nativa, hablando el mismo protocolo de ' +
        'bloqueo por rangos que usa FoxPro: inserta y edita mientras la aplicación de los ' +
        'noventa sigue abierta en cada escritorio. Sin dependencias, sin ODBC y sin ' +
        'ejecutables de Windows. Su README dice sus límites por delante.',
    },
  },
  {
    nombre: 'sunat-comprobantes',
    url: 'https://github.com/DanielMoranV/sunat-comprobantes',
    sello: 'Packagist · MIT',
    que: {
      en:
        'Peruvian electronic invoicing (SUNAT) utilities, published on Packagist as ' +
        'djasoft/sunat-comprobantes.',
      es:
        'Utilidades de facturación electrónica para SUNAT, publicadas en Packagist como ' +
        'djasoft/sunat-comprobantes.',
    },
  },
  {
    nombre: 'nomenclador',
    url: 'https://github.com/DanielMoranV/nomenclador',
    sello: 'Python · MIT',
    que: {
      en:
        'Bulk-renames PDF invoices — reading native text, falling back to OCR when the PDF is ' +
        'a scan, and applying each insurer’s required naming scheme.',
      es:
        'Renombra facturas PDF en masa. Lee el texto nativo y, si el PDF viene escaneado, ' +
        'recurre a OCR. Aplica las nomenclaturas que exige cada aseguradora.',
    },
  },
  {
    nombre: 'almazen-api · almazen_frontend',
    url: 'https://github.com/DanielMoranV/almazen-api',
    sello: 'Laravel · Vue 3',
    que: {
      en:
        'The decoupled version of AlmaZen, published in full: a Laravel API and a Vue 3 ' +
        'client, under PolyForm Noncommercial.',
      es:
        'La versión desacoplada de AlmaZen, publicada entera: API en Laravel y cliente en ' +
        'Vue 3, con licencia PolyForm Noncommercial.',
    },
  },
];
