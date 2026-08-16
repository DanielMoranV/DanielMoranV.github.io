/**
 * Notas de ingenieria: el trabajo contado por su parte dificil, no por su
 * resultado comercial. Ese mismo trabajo, contado para un dueno de empresa,
 * esta en djasoft.net.pe — aqui interesa COMO, alli interesa PARA QUE.
 *
 * REGLA: cada afirmacion tecnica de aqui tiene que ser comprobable en el
 * codigo o en un enlace vivo. Si no se puede ensenar, no se escribe.
 */

export interface Caso {
  id: string;
  /** Etiqueta corta del dominio, para escanear la pagina de un vistazo. */
  sello: { en: string; es: string };
  titulo: { en: string; es: string };
  cuerpo: { en: string; es: string };
  /** Enlace a la prueba: repo publico o producto en vivo. */
  prueba?: { texto: string; url: string };
}

export const casos: Caso[] = [
  {
    id: 'dbf',
    sello: { en: 'Legacy integration', es: 'Integración con sistemas vivos' },
    titulo: {
      en: 'Writing to FoxPro tables that are still open',
      es: 'Escribir en tablas FoxPro que siguen abiertas',
    },
    cuerpo: {
      en:
        'FoxPro still runs real operations, and the application sits open on every desk from ' +
        'eight in the morning. Moving that history anywhere normally means closing the ' +
        'business for a weekend. Instead I wrote a DBF engine in Python with no dependencies: ' +
        'it parses the table header, appends and edits records at their byte offsets, and ' +
        'takes byte-range locks, so it holds only the bytes of the record it is touching. The ' +
        'legacy application keeps reading and writing the same file at the same time and ' +
        'never notices. The engine is not a script someone remembers to run: it sits behind a ' +
        'FastAPI service where a migration is a job launched by date range and followed by its ' +
        'id, next to a scheduler that can be started and stopped while the system is up, and ' +
        'endpoints that serve the aggregates once the data has landed. Over 500,000 historical ' +
        'records reached reporting, web systems and analytics without closing for a single day.',
      es:
        'FoxPro sigue sosteniendo operaciones reales, y la aplicación está abierta en cada ' +
        'escritorio desde las ocho de la mañana. Mover ese histórico a cualquier sitio suele ' +
        'significar cerrar el negocio un fin de semana. En vez de eso escribí un motor DBF en ' +
        'Python sin dependencias: interpreta la cabecera de la tabla, inserta y edita ' +
        'registros en su desplazamiento de bytes, y bloquea por rangos, de modo que solo ' +
        'retiene los bytes del registro que está tocando. La aplicación de siempre sigue ' +
        'leyendo y escribiendo el mismo fichero a la vez, y no se entera. El motor no es un ' +
        'script que alguien se acuerda de lanzar: vive detrás de un servicio FastAPI donde una ' +
        'migración es un trabajo que se dispara por rango de fechas y se sigue por su ' +
        'identificador, junto a un planificador que se arranca y se para con el sistema en ' +
        'marcha, y endpoints que sirven los agregados una vez que el dato ha aterrizado. Más ' +
        'de 500.000 registros históricos llegaron a reportes, web y análisis sin cerrar un ' +
        'solo día.',
    },
    prueba: { texto: 'py-foxpro-engine', url: 'https://github.com/DanielMoranV/py-foxpro-engine' },
  },
  {
    id: 'mozaico',
    sello: { en: 'Go · real time', es: 'Go · tiempo real' },
    titulo: {
      en: 'A restaurant backend without an ORM',
      es: 'Un backend de restaurante sin ORM',
    },
    cuerpo: {
      en:
        'Mozaico is the repository with the most commits I have written. The backend is Go ' +
        'with Gin and sqlx — no ORM on purpose: the SQL is written by hand and sits next to ' +
        'the query it serves, with PL/pgSQL functions in PostgreSQL for the operations that ' +
        'must not be split. Order state travels to the floor and kitchen screens over ' +
        'gorilla/websocket, so a dish marked ready appears where it is needed without a ' +
        'reload or a poll. The client is React 19 and TypeScript 5.9 on Vite.',
      es:
        'Mozaico es el repositorio con más commits que he escrito. El backend es Go con Gin y ' +
        'sqlx —sin ORM a propósito: el SQL se escribe a mano y vive junto a la consulta que ' +
        'sirve, con funciones PL/pgSQL en PostgreSQL para las operaciones que no se pueden ' +
        'partir—. El estado de cada comanda viaja a las pantallas de salón y cocina por ' +
        'gorilla/websocket, así que un plato marcado como listo aparece donde hace falta sin ' +
        'recargar y sin sondear. El cliente es React 19 y TypeScript 5.9 sobre Vite.',
    },
    prueba: { texto: 'mozaicopro.djasoft.net.pe', url: 'https://mozaicopro.djasoft.net.pe/' },
  },
  {
    id: 'ia',
    sello: { en: 'Applied AI', es: 'IA aplicada' },
    titulo: {
      en: 'Two AI designs, deliberately opposite',
      es: 'Dos diseños de IA, opuestos a propósito',
    },
    cuerpo: {
      en:
        'AlmaZen ships a conversational agent that answers on stock, sales, margins and ' +
        'customer debt through 29 read-only tools, and every tool is gated by its own ' +
        'permission: a user who cannot see margins does not get the margin tool in their ' +
        'toolset, so the question has nowhere to resolve. Master Color runs a public sales ' +
        'chatbot with no tools at all — it sees the catalog and nothing else, because anyone ' +
        'on the internet can talk to it. Same technology, opposite threat models: one is ' +
        'authenticated and constrained per user, the other is anonymous and constrained by ' +
        'having nothing to reach for.',
      es:
        'AlmaZen incluye un agente conversacional que responde sobre stock, ventas, márgenes ' +
        'y deuda con 29 herramientas de solo lectura, y cada herramienta tiene su propio ' +
        'permiso: al usuario que no puede ver márgenes no se le entrega la herramienta de ' +
        'márgenes, así que la pregunta no tiene dónde resolverse. Master Color tiene un ' +
        'chatbot de ventas público sin ninguna herramienta —ve el catálogo y nada más, ' +
        'porque puede hablarle cualquiera en internet—. La misma tecnología con modelos de ' +
        'amenaza opuestos: uno está autenticado y limitado por usuario, el otro es anónimo y ' +
        'está limitado por no tener nada que alcanzar.',
    },
    prueba: { texto: 'almazenapp.djasoft.net.pe', url: 'https://almazenapp.djasoft.net.pe/' },
  },
  {
    id: 'sunat',
    sello: { en: 'Regulated domains', es: 'Dominios regulados' },
    titulo: {
      en: 'The part that is only hard if you are here',
      es: 'La parte que solo es difícil si estás aquí',
    },
    cuerpo: {
      en:
        'Peruvian electronic invoicing end to end on Greenter: submission to SUNAT, handling ' +
        'the CDR that comes back, voids and summary documents. Alongside it, SIAGIE and ' +
        'MINEDU rules in education, SUSALUD in healthcare, RENIEC lookups and the ubigeo ' +
        'tables. None of it is intellectually glamorous and all of it decides whether the ' +
        'software is usable at all — which is why an imported SaaS rarely gets it right. The ' +
        'reusable half is published on Packagist.',
      es:
        'Facturación electrónica peruana de punta a punta sobre Greenter: envío a SUNAT, ' +
        'tratamiento del CDR que vuelve, bajas y resúmenes. Al lado, las reglas de SIAGIE y ' +
        'MINEDU en educación, SUSALUD en salud, consultas a RENIEC y las tablas de ubigeo. ' +
        'Nada de esto es intelectualmente vistoso, y todo decide si el software sirve o no ' +
        'sirve — por eso un SaaS importado casi nunca lo resuelve bien. La mitad ' +
        'reutilizable está publicada en Packagist.',
    },
    prueba: { texto: 'sunat-comprobantes', url: 'https://github.com/DanielMoranV/sunat-comprobantes' },
  },
];
