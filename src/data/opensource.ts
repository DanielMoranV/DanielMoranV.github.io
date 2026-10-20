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
    nombre: 'angel-cli',
    url: 'https://github.com/DanielMoranV/angel-cli',
    sello: 'Python · MIT',
    que: {
      en:
        'Structured state management for AI-assisted workflows. Tracks tasks as typed ' +
        'Markdown files with YAML frontmatter, validates "memories" against git history ' +
        'via SHA diff, and exposes 7 native MCP tools so assistants like Cursor or ' +
        'Antigravity can manage tasks without leaving their interface.',
      es:
        'Gestión de estado estructurado para flujos de trabajo con IA. Registra tareas ' +
        'como ficheros Markdown tipados con frontmatter YAML, valida "memorias" contra ' +
        'el historial de git por SHA diff, y expone 7 herramientas MCP nativas para ' +
        'que asistentes como Cursor o Antigravity gestionen tareas sin salir de su entorno.',
    },
  },
  {
    nombre: 'agente-csr',
    url: 'https://github.com/DanielMoranV/AGENTE-CSR',
    sello: 'Python · MIT',
    que: {
      en:
        'AI analytics agent for hospital management reporting. Enforces strict read-only ' +
        'access to PostgreSQL (session-level `default_transaction_read_only`) and FoxPro DBF ' +
        'files, writes only inside an isolated workspace, and generates Excel, Word and PDF ' +
        'executive reports. Built to Peruvian health data-privacy law (Ley 29733 / Ley 26842). ' +
        '24 automated tests covering path-traversal, formula injection and permission matrix.',
      es:
        'Agente analítico de IA para reportes de gerencia hospitalaria. Impone solo lectura ' +
        'estricta sobre PostgreSQL (`default_transaction_read_only` a nivel de sesión) y ' +
        'archivos DBF de FoxPro, escribe únicamente dentro de un workspace aislado y genera ' +
        'reportes ejecutivos en Excel, Word y PDF. Construido conforme a la Ley N.º 29733 y ' +
        'la reserva de Historia Clínica (Ley N.º 26842). 24 pruebas automatizadas: ' +
        'path-traversal, inyección de fórmulas y matriz de permisos.',
    },
  },
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
