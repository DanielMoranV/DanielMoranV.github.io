/**
 * Notas de ingenieria: el trabajo contado por su parte dificil, no por su
 * resultado comercial. Ese mismo trabajo, contado para un dueno de empresa,
 * esta en djasoft.net.pe — aqui interesa COMO, alli interesa PARA QUE.
 *
 * REGLA: cada afirmacion tecnica de aqui tiene que ser comprobable en el
 * codigo o en un enlace vivo. Si no se puede ensenar, no se escribe.
 *
 * La primera nota es la DESTACADA: el motor DBF es lo mas dificil de igualar
 * de todo el perfil, y en la direccion visual «ficha tecnica» se lleva ficha
 * de metadatos propia, dos parrafos y el contraste antes/ahora. Las otras
 * tres son fichas cortas.
 */

export interface Caso {
  id: string;
  /** Solo una. Cambia la maquetacion, no solo el orden. */
  destacado?: boolean;
  /** Etiqueta corta del dominio, para escanear la pagina de un vistazo. */
  sello: { en: string; es: string };
  titulo: { en: string; es: string };
  /** Un elemento por parrafo. El primero, en la destacada, va con mas tinta. */
  cuerpo: { en: string[]; es: string[] };
  /** Metadatos de la columna izquierda. Solo en la destacada. */
  ficha?: { etiqueta: { en: string; es: string }; valor: { en: string; es: string } }[];
  /** El cambio, en dos celdas. Solo en la destacada. */
  contraste?: {
    antes: { en: string; es: string };
    ahora: { en: string; es: string };
  };
  /** Enlace a la prueba: repo publico o producto en vivo. */
  prueba?: { texto: string; url: string };
  /** Slug del case study, si esta escrito. Ver src/data/estudios.ts. */
  estudio?: string;
}

export const casos: Caso[] = [
  {
    id: 'dbf',
    estudio: 'foxpro-dbf',
    destacado: true,
    sello: { en: 'Living systems', es: 'Sistemas vivos' },
    titulo: {
      en: 'Writing to FoxPro tables that are still open',
      es: 'Escribir en tablas FoxPro que siguen abiertas',
    },
    cuerpo: {
      en: [
        'FoxPro still runs real operations, and the application sits open on every desk from ' +
          'eight in the morning. Moving that history anywhere normally means closing the ' +
          'business for a weekend.',
        'Instead I wrote a DBF engine in Python with no dependencies that speaks FoxPro’s own ' +
          'locking protocol: it takes the exact byte range of the row it is touching, never ' +
          'the file, and writes each record in a single pass so no concurrent reader ever ' +
          'sees half a row. The legacy application keeps working and never notices. On top ' +
          'of it runs a FastAPI service that does two different things: it migrates by date ' +
          'range as a followable job, and it answers live queries without migrating ' +
          'anything — which is how reception resolves a patient while every cash desk is ' +
          'writing to that same file.',
      ],
      es: [
        'FoxPro sigue sosteniendo operaciones reales, y la aplicación está abierta en cada ' +
          'escritorio desde las ocho de la mañana. Mover ese histórico a cualquier sitio ' +
          'suele significar cerrar el negocio un fin de semana.',
        'En vez de eso escribí un motor DBF en Python sin dependencias que habla el mismo ' +
          'protocolo de bloqueo que FoxPro: toma el rango de bytes exacto de la fila que ' +
          'toca, nunca el fichero, y escribe cada registro de una sola pasada, así que ' +
          'ningún lector concurrente ve media fila. La aplicación de siempre sigue ' +
          'trabajando y no se entera. Encima corre un servicio FastAPI que hace dos cosas ' +
          'distintas: migra por rango de fechas como un trabajo que se puede seguir, y ' +
          'responde consultas en vivo sin migrar nada — que es como recepción resuelve un ' +
          'paciente mientras cada caja escribe en ese mismo fichero.',
      ],
    },
    ficha: [
      {
        etiqueta: { en: 'Language', es: 'Lenguaje' },
        valor: { en: 'Python, no dependencies', es: 'Python, sin dependencias' },
      },
      {
        etiqueta: { en: 'Service', es: 'Servicio' },
        valor: { en: 'FastAPI · jobs by date', es: 'FastAPI · jobs por fecha' },
      },
      {
        etiqueta: { en: 'Result', es: 'Resultado' },
        valor: {
          en: '500,000+ records, 0 days closed',
          es: '500.000+ registros, 0 días de cierre',
        },
      },
    ],
    contraste: {
      antes: {
        en: 'Close the business for a weekend, export by hand, hope the result lines up.',
        es: 'Cerrar la operación un fin de semana, exportar a mano y rezar por el resultado.',
      },
      ahora: {
        en: 'Concurrent byte-level writes with the app still open; the history reaches ' +
          'reporting, web systems and analytics.',
        es: 'Escritura concurrente byte a byte con la aplicación abierta; el histórico llega ' +
          'a reportes, web y análisis.',
      },
    },
    prueba: { texto: 'py-foxpro-engine', url: 'https://github.com/DanielMoranV/py-foxpro-engine' },
  },
  {
    id: 'mozaico',
    estudio: 'tiempo-real-sin-orm',
    sello: { en: 'Go · real time', es: 'Go · tiempo real' },
    titulo: {
      en: 'A restaurant backend without an ORM',
      es: 'Un backend de restaurante sin ORM',
    },
    cuerpo: {
      en: [
        'Mozaico is the repository with the most commits I have written. The SQL is written ' +
          'by hand and sits next to the query it serves, with PL/pgSQL functions in ' +
          'PostgreSQL for the operations that must not be split. Order state travels to the ' +
          'floor and kitchen screens over gorilla/websocket, so a dish marked ready appears ' +
          'where it is needed without a reload or a poll. The client is React 19 and ' +
          'TypeScript on Vite.',
      ],
      es: [
        'Mozaico es el repositorio con más commits que he escrito. El SQL se escribe a mano y ' +
          'vive junto a la consulta que sirve, con funciones PL/pgSQL en PostgreSQL para las ' +
          'operaciones que no se pueden partir. El estado de cada comanda viaja a las ' +
          'pantallas de salón y cocina por gorilla/websocket, así que un plato marcado como ' +
          'listo aparece donde hace falta sin recargar y sin sondear. El cliente es React 19 ' +
          'y TypeScript sobre Vite.',
      ],
    },
    prueba: { texto: 'mozaicopro', url: 'https://mozaicopro.djasoft.net.pe/' },
  },
  {
    id: 'ia',
    estudio: 'ia-en-producto',
    sello: { en: 'Applied AI', es: 'IA aplicada' },
    titulo: {
      en: 'Two AI designs, deliberately opposite',
      es: 'Dos diseños de IA, opuestos a propósito',
    },
    cuerpo: {
      en: [
        'AlmaZen answers on stock, sales, margins and customer debt through 29 read-only ' +
          'tools, and every tool is gated by its own permission: a user who cannot see ' +
          'margins does not get the margin tool, so the question has nowhere to resolve. ' +
          'Master Color runs a public sales chatbot with no tools at all — it sees the ' +
          'catalog and nothing else, because anyone on the internet can talk to it. Same ' +
          'technology, opposite threat models.',
      ],
      es: [
        'AlmaZen responde sobre stock, ventas, márgenes y deuda con 29 herramientas de solo ' +
          'lectura, y cada herramienta tiene su propio permiso: al usuario que no puede ver ' +
          'márgenes no se le entrega la herramienta, así que la pregunta no tiene dónde ' +
          'resolverse. Master Color tiene un chatbot de ventas público sin ninguna ' +
          'herramienta —ve el catálogo y nada más, porque puede hablarle cualquiera en ' +
          'internet—. La misma tecnología con modelos de amenaza opuestos.',
      ],
    },
    prueba: { texto: 'almazenapp', url: 'https://almazenapp.djasoft.net.pe/' },
  },
  {
    id: 'sunat',
    sello: { en: 'Regulated domains', es: 'Dominios regulados' },
    titulo: {
      en: 'The part that is only hard if you are here',
      es: 'La parte que solo es difícil si estás aquí',
    },
    cuerpo: {
      en: [
        'Peruvian electronic invoicing end to end on Greenter: submission to SUNAT, handling ' +
          'the CDR that comes back, voids and summary documents. Alongside it, SIAGIE and ' +
          'MINEDU rules in education, SUSALUD in healthcare, RENIEC lookups and the ubigeo ' +
          'tables. None of it is intellectually glamorous and all of it decides whether the ' +
          'software is usable at all.',
      ],
      es: [
        'Facturación electrónica peruana de punta a punta sobre Greenter: envío a SUNAT, ' +
          'tratamiento del CDR que vuelve, bajas y resúmenes. Al lado, las reglas de SIAGIE y ' +
          'MINEDU en educación, SUSALUD en salud, consultas a RENIEC y las tablas de ubigeo. ' +
          'Nada de esto es intelectualmente vistoso, y todo decide si el software sirve o no ' +
          'sirve.',
      ],
    },
    prueba: {
      texto: 'sunat-comprobantes',
      url: 'https://github.com/DanielMoranV/sunat-comprobantes',
    },
  },
];
