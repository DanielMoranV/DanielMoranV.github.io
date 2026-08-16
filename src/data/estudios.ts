/**
 * Case studies. La capa 2 de la estrategia: el codigo comercial no se
 * publica, asi que lo que sostiene el portafolio es la NARRATIVA — el
 * problema, las restricciones, las decisiones y por que se descarto la
 * alternativa obvia.
 *
 * Ningun reclutador lee 680 ficheros; lee esto en cinco minutos y prueba la
 * demo. Y saber explicar por que se eligio una arquitectura pesa mas que el
 * codigo en si: es lo que separa mid de senior.
 *
 * ESTRUCTURA FIJA, deliberadamente igual en los tres: contexto, problema,
 * restricciones, decisiones, resultado, prueba. Un formato constante se lee
 * en diagonal, y quien compara candidatos lee en diagonal.
 *
 * REGLAS
 * - Cada afirmacion tiene que ser comprobable en el codigo o en un enlace
 *   vivo. Si no se puede ensenar, no se escribe.
 * - Del trabajo de cliente se cuenta la INGENIERIA. Ni siglas internas, ni
 *   dominios, ni nombres de repositorio, ni datos.
 * - `descartado` no es adorno. Una decision sin alternativa descartada no es
 *   una decision, es una preferencia.
 */

export interface Bilingue {
  en: string;
  es: string;
}

export interface Decision {
  titulo: Bilingue;
  cuerpo: Bilingue;
  /** La alternativa obvia, y por que no. */
  descartado?: Bilingue;
}

export interface Estudio {
  slug: string;
  sello: Bilingue;
  titulo: Bilingue;
  /** Una linea. Es lo que se lee en la portada y en la tarjeta de enlace. */
  resumen: Bilingue;
  periodo: string;
  rol: Bilingue;
  stack: string[];
  contexto: Bilingue;
  problema: Bilingue;
  restricciones: Bilingue[];
  decisiones: Decision[];
  resultado: Bilingue[];
  /** Diagrama a dibujar. Se trazan con los tokens y currentColor. */
  diagrama?: 'dbf' | 'ia' | 'tiempo-real';
  prueba?: { texto: string; url: string };
}

export const estudios: Estudio[] = [
  {
    slug: 'foxpro-dbf',
    sello: { en: 'Living systems', es: 'Sistemas vivos' },
    titulo: {
      en: 'Writing to FoxPro tables that are still open',
      es: 'Escribir en tablas FoxPro que siguen abiertas',
    },
    resumen: {
      en: 'Getting 500,000+ records out of a 1990s system without closing the business for a single day.',
      es: 'Sacar más de 500.000 registros de un sistema de los noventa sin cerrar la operación un solo día.',
    },
    periodo: '2023 —',
    rol: { en: 'Design and implementation', es: 'Diseño e implementación' },
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'FoxPro · DBF', 'Alembic', 'Docker'],
    contexto: {
      en:
        'FoxPro still runs the daily operation of a private clinic, and the application sits ' +
        'open on every desk from eight in the morning. The history is needed in reporting, ' +
        'web systems and analytics, but it lives in .dbf files the application holds open all ' +
        'day.',
      es:
        'FoxPro sostiene la operación diaria de una clínica privada, y la aplicación está ' +
        'abierta en cada escritorio desde las ocho de la mañana. El histórico hace falta en ' +
        'reportes, web y análisis, pero vive en ficheros .dbf que la aplicación tiene ' +
        'abiertos todo el día.',
    },
    problema: {
      en:
        'Every normal route — ODBC, exporting by hand, a third-party Windows tool — needs ' +
        'nobody to be using the table. That means closing the business for a weekend, ' +
        'repeating it every time the data needs refreshing, and still not solving the ' +
        'continuous flow the reporting actually needs.',
      es:
        'Todas las vías normales —ODBC, exportar a mano, un ejecutable de Windows de ' +
        'terceros— exigen que nadie esté usando la tabla. Eso significa cerrar el negocio un ' +
        'fin de semana, repetirlo cada vez que haya que refrescar, y aun así no resuelve el ' +
        'flujo continuo que los reportes necesitan de verdad.',
    },
    restricciones: [
      {
        en: 'The operation cannot stop. Not for one shift.',
        es: 'La operación no se puede detener. Ni un turno.',
      },
      {
        en: 'The 1990s application is untouchable: no source, no vendor, no support contract.',
        es: 'La aplicación de los noventa no se toca: sin fuentes, sin proveedor y sin contrato de soporte.',
      },
      {
        en: 'Health data is a sensitive category under Peruvian law. Nothing leaves the clinic network uncontrolled.',
        es: 'Los datos de salud son categoría sensible en la ley peruana. Nada sale de la red de la clínica sin control.',
      },
      {
        en: 'It has to run without depending on a particular Windows runtime or a 32-bit driver.',
        es: 'Tiene que correr sin depender de un runtime de Windows concreto ni de un driver de 32 bits.',
      },
    ],
    decisiones: [
      {
        titulo: { en: 'Write the DBF engine, do not adopt one', es: 'Escribir el motor DBF en vez de adoptar uno' },
        cuerpo: {
          en:
            'A parser that understands the table header, the null flags and the 0x1A ' +
            'end-of-file marker, and that reads and writes records at their byte offsets. ' +
            'No dependencies at all.',
          es:
            'Un parser que entiende la cabecera de la tabla, los flags de nulidad y el ' +
            'marcador de fin de fichero 0x1A, y que lee y escribe registros en su ' +
            'desplazamiento de bytes. Sin ninguna dependencia.',
        },
        descartado: {
          en:
            'The VFP ODBC driver needs a 32-bit Microsoft runtime and locks the whole table. ' +
            'The read-only Python libraries solve half the problem: they read, and the job ' +
            'here is to write.',
          es:
            'El driver ODBC de VFP exige un runtime de Microsoft de 32 bits y bloquea la ' +
            'tabla entera. Las librerías de Python que hay resuelven la mitad del problema: ' +
            'leen, y aquí hay que escribir.',
        },
      },
      {
        titulo: { en: 'Lock byte ranges, not the file', es: 'Bloquear por rangos de bytes, no el fichero' },
        cuerpo: {
          en:
            'The engine holds only the bytes of the record it is touching. The legacy ' +
            'application keeps reading and writing the same file at the same time and never ' +
            'notices. This is the decision the whole thing hangs on.',
          es:
            'El motor retiene solo los bytes del registro que está tocando. La aplicación de ' +
            'siempre sigue leyendo y escribiendo el mismo fichero a la vez, y no se entera. ' +
            'Es la decisión de la que cuelga todo lo demás.',
        },
        descartado: {
          en:
            'An exclusive file lock is what off-the-shelf tools take, and it is exactly what ' +
            'forces the maintenance window this project exists to avoid.',
          es:
            'El bloqueo exclusivo del fichero es lo que toman las herramientas al uso, y es ' +
            'justo lo que obliga a la ventana de parada que este proyecto existe para evitar.',
        },
      },
      {
        titulo: { en: 'Reserve the native auto-increments', es: 'Reservar los autoincrementales nativos' },
        cuerpo: {
          en:
            'FoxPro keeps its own counters. Inserting without reserving them breaks ' +
            'referential integrity with the old system — silently, and days later.',
          es:
            'FoxPro lleva sus propios contadores. Insertar sin reservarlos rompe la ' +
            'integridad referencial con el sistema viejo, en silencio y días después.',
        },
      },
      {
        titulo: { en: 'Ship it as a service, not a script', es: 'Entregarlo como servicio, no como script' },
        cuerpo: {
          en:
            'A FastAPI service where a migration is launched by date range and followed by ' +
            'its id, next to a scheduler that starts and stops while the system is up, and ' +
            'endpoints that serve the aggregates once the data has landed.',
          es:
            'Un servicio FastAPI donde una migración se dispara por rango de fechas y se ' +
            'sigue por su identificador, junto a un planificador que se arranca y se para con ' +
            'el sistema en marcha, y endpoints que sirven los agregados cuando el dato ha ' +
            'aterrizado.',
        },
        descartado: {
          en: 'A cron job someone remembers to check is a job that stops being checked.',
          es: 'Un cron que alguien se acuerda de mirar es un cron que se deja de mirar.',
        },
      },
      {
        titulo: { en: 'Extract the engine and publish it', es: 'Extraer el motor y publicarlo' },
        cuerpo: {
          en:
            'The technical value is in the engine; the commercial value and the data belong ' +
            'to the client. So the engine came out stripped of every business rule and went ' +
            'out under MIT, and the pipeline that knows about the clinic stayed private.',
          es:
            'El valor técnico está en el motor; el valor comercial y los datos son del ' +
            'cliente. Así que el motor salió despojado de toda regla de negocio y se publicó ' +
            'con licencia MIT, y el pipeline que sabe de la clínica se quedó privado.',
        },
      },
    ],
    resultado: [
      {
        en: 'Over 500,000 historical records in PostgreSQL, with zero days of downtime.',
        es: 'Más de 500.000 registros históricos en PostgreSQL, con cero días de parada.',
      },
      {
        en: 'Around 2,000 records a day through the automated pipeline.',
        es: 'Alrededor de 2.000 registros diarios por el pipeline automatizado.',
      },
      {
        en: 'The engine published as a standalone, dependency-free package.',
        es: 'El motor publicado como paquete independiente y sin dependencias.',
      },
      {
        en:
          'Extracting it surfaced two correctness bugs that had been hiding inside the ' +
          'pipeline: opening the file without binary mode, which corrupts the EOF marker and ' +
          'throws off the record count, and a header lock that was never released for the ' +
          'whole session. Pulling a piece out into the open is itself a review.',
        es:
          'Extraerlo sacó dos defectos de corrección que llevaban escondidos dentro del ' +
          'pipeline: abrir el fichero sin modo binario, que corrompe el marcador EOF y ' +
          'descuadra el conteo de registros, y un bloqueo de cabecera que no se soltaba en ' +
          'toda la sesión. Sacar una pieza a la luz es, en sí mismo, una revisión.',
      },
    ],
    diagrama: 'dbf',
    prueba: { texto: 'py-foxpro-engine', url: 'https://github.com/DanielMoranV/py-foxpro-engine' },
  },

  {
    slug: 'ia-en-producto',
    sello: { en: 'Applied AI', es: 'IA aplicada' },
    titulo: {
      en: 'An agent inside the ERP, without handing it the keys',
      es: 'Un agente dentro del ERP, sin entregarle las llaves',
    },
    resumen: {
      en: 'Two AI features in two products, built deliberately opposite because their threat models are opposite.',
      es: 'Dos funciones de IA en dos productos, construidas al revés la una de la otra porque sus modelos de amenaza son opuestos.',
    },
    periodo: '2025 —',
    rol: { en: 'Design and implementation', es: 'Diseño e implementación' },
    stack: ['Laravel', 'PostgreSQL', 'Gemini', 'Ollama', 'OpenRouter', 'RBAC'],
    contexto: {
      en:
        'AlmaZen is a multi-tenant ERP sold by subscription: inventory, purchasing, sales, ' +
        'POS and SUNAT electronic invoicing. Owners keep asking questions the database ' +
        'already answers — how much stock is left, what margin the month left, who owes ' +
        'money — but that take five screens to reach.',
      es:
        'AlmaZen es un ERP multiempresa vendido por suscripción: inventario, compras, ventas, ' +
        'POS y facturación electrónica SUNAT. Los dueños preguntan una y otra vez cosas que ' +
        'la base ya responde —cuánto stock queda, qué margen dejó el mes, quién debe— pero ' +
        'que exigen atravesar cinco pantallas.',
    },
    problema: {
      en:
        'A conversational assistant over an ERP is an attack surface before it is a feature. ' +
        'If the model can query, it can query what the person asking has no right to see; ' +
        'and if it can write SQL, it can walk out of its own tenant.',
      es:
        'Un asistente conversacional sobre un ERP es una superficie de ataque antes que una ' +
        'funcionalidad. Si el modelo puede consultar, puede consultar lo que quien pregunta ' +
        'no tiene derecho a ver; y si puede escribir SQL, puede salirse de su propia empresa.',
    },
    restricciones: [
      {
        en: 'Multi-tenant: each company has its own schema and can never see another one.',
        es: 'Multiempresa: cada empresa tiene su esquema y jamás puede ver el de otra.',
      },
      {
        en: 'Permissions already exist and are the source of truth. The AI does not get its own judgement.',
        es: 'Los permisos ya existen y son la fuente de verdad. La IA no tiene criterio propio.',
      },
      {
        en: 'The provider API key must never reach the client.',
        es: 'La clave del proveedor no puede llegar nunca al cliente.',
      },
      {
        en: 'Cost has to be capped per subscription plan, not discovered at the end of the month.',
        es: 'El coste tiene que estar acotado por plan de suscripción, no descubrirse a fin de mes.',
      },
    ],
    decisiones: [
      {
        titulo: { en: 'Tools, not a free prompt', es: 'Herramientas, no prompt libre' },
        cuerpo: {
          en:
            '29 read-only tools with an explicit contract each: stock levels, sales ' +
            'summaries, margin analysis, expiring batches, customer debt, cash position, ' +
            'inventory valuation. The model composes answers out of them; it does not invent ' +
            'access.',
          es:
            '29 herramientas de solo lectura, cada una con su contrato explícito: niveles de ' +
            'stock, resúmenes de ventas, análisis de margen, lotes por vencer, deuda de ' +
            'clientes, posición de caja, valorización de inventario. El modelo compone la ' +
            'respuesta con ellas; no se inventa el acceso.',
        },
        descartado: {
          en:
            'Giving it the database and trusting the system prompt to hold the line. A prompt ' +
            'is a suggestion, not a permission system.',
          es:
            'Darle la base y confiar en que el prompt aguante. Un prompt es una sugerencia, ' +
            'no un sistema de permisos.',
        },
      },
      {
        titulo: {
          en: 'The permission decides which tools exist, not what the model replies',
          es: 'El permiso decide qué herramientas existen, no qué responde el modelo',
        },
        cuerpo: {
          en:
            'A user who cannot see margins is not handed the margin tool. The question then ' +
            'has nowhere to resolve — there is nothing to refuse, because there is nothing to ' +
            'call.',
          es:
            'Al usuario que no puede ver márgenes no se le entrega la herramienta de ' +
            'márgenes. La pregunta entonces no tiene dónde resolverse: no hay nada que negar, ' +
            'porque no hay nada que llamar.',
        },
        descartado: {
          en:
            'Filtering the answer afterwards. That is asking a language model to keep a ' +
            'secret it has already been told, which is the one thing it is worst at.',
          es:
            'Filtrar la respuesta a posteriori. Eso es pedirle a un modelo de lenguaje que ' +
            'guarde un secreto que ya le has contado, que es justo lo que peor se le da.',
        },
      },
      {
        titulo: { en: 'Re-validate at execution time', es: 'Revalidar en tiempo de ejecución' },
        cuerpo: {
          en:
            'The toolset is assembled when the session opens, and permissions can change ' +
            'inside a session. Every call checks again before it runs.',
          es:
            'El conjunto de herramientas se arma al abrir la sesión, y los permisos pueden ' +
            'cambiar dentro de esa sesión. Cada llamada vuelve a comprobar antes de ejecutar.',
        },
      },
      {
        titulo: { en: 'Fence the SQL tool three ways', es: 'Vallar la herramienta SQL por tres lados' },
        cuerpo: {
          en:
            'Read-only SELECT, restricted to the caller’s tenant schema, with a forced row ' +
            'limit. Any one of the three alone would not be enough.',
          es:
            'SELECT de solo lectura, restringido al esquema de la empresa que llama, y con un ' +
            'límite de filas forzado. Cualquiera de los tres por separado no bastaría.',
        },
      },
      {
        titulo: { en: 'Provider behind a contract', es: 'Proveedor detrás de un contrato' },
        cuerpo: {
          en:
            'A single interface the tools never see through. Gemini today; swapping it does ' +
            'not touch a single tool. Usage is metered as a monthly per-plan quota on the ' +
            'server, and the key stays in the backend.',
          es:
            'Una sola interfaz que las herramientas no atraviesan nunca. Hoy Gemini; ' +
            'cambiarlo no toca ni una herramienta. El uso se mide como cuota mensual por plan ' +
            'en el servidor, y la clave se queda en el backend.',
        },
      },
      {
        titulo: {
          en: 'The other product got the opposite design, on purpose',
          es: 'El otro producto se construyó al revés, a propósito',
        },
        cuerpo: {
          en:
            'Master Color runs a public sales chatbot with no tools at all: the catalog is ' +
            'composed into the system prompt and the model can see nothing else. For an ' +
            'unauthenticated endpoint, no tool surface means no tool surface to abuse. ' +
            'Hardened with per-IP rate limiting, bounded message and history size and a ' +
            'capped conversation window, on a self-hosted Ollama model with OpenRouter as ' +
            'fallback.',
          es:
            'Master Color tiene un chatbot de ventas público sin ninguna herramienta: el ' +
            'catálogo se compone dentro del prompt y el modelo no ve nada más. En un endpoint ' +
            'sin autenticar, no tener superficie de herramientas es no tener superficie que ' +
            'abusar. Endurecido con limitación de tasa por IP, tamaño de mensaje e historial ' +
            'acotados y ventana de conversación con tope, sobre un modelo Ollama autoalojado ' +
            'con OpenRouter de reserva.',
        },
      },
    ],
    resultado: [
      {
        en:
          'Two products, the same technology, opposite threat models — and the design follows ' +
          'the threat model, not the fashion.',
        es:
          'Dos productos, la misma tecnología, modelos de amenaza opuestos — y el diseño ' +
          'sigue al modelo de amenaza, no a la moda.',
      },
      {
        en: 'Authenticated and sensitive: tools plus a permission per user.',
        es: 'Autenticado y sensible: herramientas más un permiso por usuario.',
      },
      {
        en: 'Anonymous and public: context only, and nothing to reach for.',
        es: 'Anónimo y público: solo contexto, y nada que alcanzar.',
      },
    ],
    diagrama: 'ia',
    prueba: { texto: 'almazenapp.djasoft.net.pe', url: 'https://almazenapp.djasoft.net.pe/' },
  },

  {
    slug: 'tiempo-real-sin-orm',
    sello: { en: 'Go · real time', es: 'Go · tiempo real' },
    titulo: {
      en: 'A restaurant backend without an ORM',
      es: 'Un backend de restaurante sin ORM',
    },
    resumen: {
      en: 'Floor and kitchen on the same order state, with hand-written SQL and no polling.',
      es: 'Salón y cocina sobre el mismo estado de comanda, con SQL escrito a mano y sin sondeo.',
    },
    periodo: '2025 —',
    rol: { en: 'Design and implementation', es: 'Diseño e implementación' },
    stack: ['Go', 'Gin', 'sqlx', 'PostgreSQL · PL/pgSQL', 'WebSockets', 'React 19', 'Vite'],
    contexto: {
      en:
        'Mozaico runs the floor, the kitchen and the till of a restaurant. An order changes ' +
        'state many times in a few minutes — taken, fired, ready, served, charged — and every ' +
        'one of those changes has to show up on a different screen, in a different room, ' +
        'without anyone reloading anything.',
      es:
        'Mozaico lleva el salón, la cocina y la caja de un restaurante. Una comanda cambia de ' +
        'estado muchas veces en pocos minutos —tomada, lanzada, lista, servida, cobrada— y ' +
        'cada uno de esos cambios tiene que aparecer en una pantalla distinta, en otra sala, ' +
        'sin que nadie recargue nada.',
    },
    problema: {
      en:
        'The default pattern — an ORM plus polling — fails at both ends. The ORM hides the ' +
        'cost of the query exactly where the cost matters, and polling every few seconds ' +
        'multiplies load without improving how fast the kitchen actually finds out.',
      es:
        'El patrón por defecto —un ORM más sondeo— falla por las dos puntas. El ORM esconde ' +
        'el coste de la consulta justo donde el coste importa, y sondear cada pocos segundos ' +
        'multiplica la carga sin mejorar la rapidez con la que la cocina se entera.',
    },
    restricciones: [
      {
        en: 'An order state cannot land half-written. It goes in whole or not at all.',
        es: 'El estado de una comanda no puede quedar a medias. Entra entero o no entra.',
      },
      {
        en: 'Kitchen screens are modest devices, often on shared Wi-Fi.',
        es: 'Las pantallas de cocina son dispositivos modestos, y a menudo sobre wifi compartido.',
      },
      {
        en: 'Floor and kitchen cannot diverge, not even for a second: that is a wrong dish.',
        es: 'Salón y cocina no pueden divergir ni un segundo: eso es un plato equivocado.',
      },
    ],
    decisiones: [
      {
        titulo: { en: 'sqlx over hand-written SQL', es: 'sqlx sobre SQL escrito a mano' },
        cuerpo: {
          en:
            'The SQL sits next to the query it serves, so what you read is what runs. On the ' +
            'hot paths that is the difference between tuning a query and guessing at a ' +
            'generated one.',
          es:
            'El SQL vive junto a la consulta que sirve, así que lo que se lee es lo que se ' +
            'ejecuta. En los caminos calientes esa es la diferencia entre afinar una consulta ' +
            'y adivinar qué generó el ORM.',
        },
        descartado: {
          en:
            'A full ORM. It buys speed on the first CRUD screen and charges for it on every ' +
            'query that matters afterwards.',
          es:
            'Un ORM completo. Regala velocidad en la primera pantalla CRUD y la cobra en cada ' +
            'consulta que importa después.',
        },
      },
      {
        titulo: { en: 'PL/pgSQL for what must not be split', es: 'PL/pgSQL para lo que no se puede partir' },
        cuerpo: {
          en:
            'The operations that have to be atomic live as functions in PostgreSQL, next to ' +
            'the data, instead of as a transaction stitched together in application code.',
          es:
            'Las operaciones que tienen que ser atómicas viven como funciones en PostgreSQL, ' +
            'junto a los datos, en vez de como una transacción cosida en el código de la ' +
            'aplicación.',
        },
      },
      {
        titulo: { en: 'WebSockets instead of polling', es: 'WebSockets en vez de sondeo' },
        cuerpo: {
          en:
            'State travels to the floor and kitchen screens over gorilla/websocket, so a dish ' +
            'marked ready appears where it is needed without a reload and without a poll.',
          es:
            'El estado viaja a las pantallas de salón y cocina por gorilla/websocket, así que ' +
            'un plato marcado como listo aparece donde hace falta sin recargar y sin sondear.',
        },
        descartado: {
          en:
            'Polling every few seconds: more load, more battery on the tablets, and still a ' +
            'delay the kitchen can feel.',
          es:
            'Sondear cada pocos segundos: más carga, más batería en las tabletas, y aun así ' +
            'un retraso que la cocina nota.',
        },
      },
    ],
    resultado: [
      {
        en: 'It is the repository with the most commits I have written.',
        es: 'Es el repositorio con más commits que he escrito.',
      },
      {
        en: 'A dish marked ready shows up where it is needed with no reload and no polling.',
        es: 'Un plato marcado como listo aparece donde hace falta sin recargar y sin sondear.',
      },
      {
        en:
          'No latency numbers here on purpose: the system is in production but not ' +
          'instrumented for it, and a figure I cannot explain how I measured is worse than no ' +
          'figure at all.',
        es:
          'Aquí no hay cifras de latencia a propósito: el sistema está en producción pero no ' +
          'instrumentado para medirla, y una cifra que no puedo explicar cómo medí es peor ' +
          'que ninguna cifra.',
      },
    ],
    diagrama: 'tiempo-real',
    prueba: { texto: 'mozaicopro.djasoft.net.pe', url: 'https://mozaicopro.djasoft.net.pe/' },
  },
];

export const porSlug = (slug: string) => estudios.find((e) => e.slug === slug);
