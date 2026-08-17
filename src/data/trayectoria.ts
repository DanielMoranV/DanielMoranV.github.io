/**
 * Trayectoria formal en el sector salud.
 *
 * REGLA DE PUBLICACION, heredada de la bitacora y no negociable:
 * la clinica SI se nombra —es practica normal y anade credibilidad
 * verificable— pero NO aparece nada mas de dentro. Ni siglas internas, ni
 * dominios, ni nombres de repositorio, ni codigo. Se cuenta la INGENIERIA,
 * no se ensena el sistema.
 *
 * Por eso ninguno de estos tres sistemas enlaza a nada: son privados y de la
 * clinica. El unico enlace es al motor DBF, que se extrajo a proposito sin
 * una sola regla de negocio para poder publicarlo.
 *
 * No confundir «no ensenar el codigo» con «no contar el trabajo»: esto es
 * mas de la mitad de la semana, y el sitio estuvo sin una linea al respecto.
 */

/**
 * Noviembre de 2022: cuando la programacion pasa a ser el trabajo, no una
 * parte de el. Antes hubo seis anos de soporte tecnico, redes y logistica, y
 * contarlos como experiencia de desarrollo seria inflar la cifra — un
 * entrevistador lo desmonta en una pregunta.
 *
 * Los anos se calculan en cada compilacion, no se escriben a mano: un
 * portafolio que dice «3+ anos» tres anos despues envejece solo, y es
 * exactamente el tipo de dato que nadie se acuerda de actualizar.
 */
export const INICIO = new Date('2022-11-01T00:00:00Z');

export const ANIOS = Math.floor(
  (Date.now() - INICIO.getTime()) / (365.2425 * 24 * 60 * 60 * 1000)
);

export interface Puesto {
  periodo: string;
  cargo: { en: string; es: string };
  organizacion: string;
  lugar: string;
  logo?: string;
  que: { en: string; es: string };
}

export interface Sistema {
  nombre: { en: string; es: string };
  /** `servicio` = en produccion; `curso` = en construccion ahora mismo. */
  estado: 'servicio' | 'curso';
  que: { en: string; es: string };
  stack: string[];
  /** Solo si hay algo publico y vivo que ensenar. Casi nunca lo hay. */
  prueba?: { texto: string; url: string };
}

export const puesto: Puesto = {
  periodo: '2022 —',
  cargo: {
    en: 'Backend developer & systems analyst (full stack)',
    es: 'Desarrollador backend y analista de sistemas (full stack)',
  },
  organizacion: 'Clínica Santa Rosa',
  lugar: 'Sullana, Piura',
  logo: '/projects/santa-rosa.webp',
  que: {
    en:
      'More than half of my week is clinical software. Since November 2022 I have built and ' +
      'maintained the systems a private clinic runs on: the intranet its staff uses every ' +
      'day, medical insurance management, and the data layer that pulls history out of a ' +
      '1990s system. The code belongs to the clinic and is not published — what follows is ' +
      'the engineering.',
    es:
      'Más de la mitad de mi semana es software clínico. Desde noviembre de 2022 construyo y ' +
      'mantengo los sistemas sobre los que funciona una clínica privada: la intranet que usa ' +
      'el personal todos los días, la gestión de seguros médicos y la capa de datos que saca ' +
      'el histórico de un sistema de los noventa. El código es de la clínica y no se publica ' +
      '— lo que sigue es la ingeniería.',
  },
};

/**
 * El arco dentro del mismo empleo. El sitio contaba el estado ACTUAL como si
 * fuera el punto de partida, y el punto de partida es justo lo que explica
 * por que el software encaja: se aprendio el negocio haciendolo, no leyendo
 * un requerimiento.
 *
 * Y tiene un efecto secundario que conviene entender: el contrato dice
 * «Soporte TI». Contar el arco convierte esa confirmacion de RR. HH. de
 * contradiccion en primera linea de la propia historia.
 *
 * Fechas verificadas contra la creacion de los repositorios, no estimadas.
 */
export interface Tramo {
  periodo: string;
  titulo: { en: string; es: string };
  que: { en: string; es: string };
}

export const tramos: Tramo[] = [
  {
    periodo: '2022 — 2024',
    titulo: { en: 'IT support', es: 'Soporte TI' },
    que: {
      en:
        'Hardware and software support, and the insurance collections and refunds desk. I ' +
        'learned the system from the business side rather than from a requirements ' +
        'document, which is where every improvement I later proposed came from. First ' +
        'applications on my own initiative: a ticketing app and a medical appointments app.',
      es:
        'Soporte de hardware y software, y la mesa de cobranza de seguros y devoluciones. ' +
        'Aprendí el sistema desde el lado del negocio y no desde un documento de ' +
        'requisitos, que es de donde salieron todas las mejoras que propuse después. ' +
        'Primeras aplicaciones por iniciativa propia: una de tickets y una de citas médicas.',
    },
  },
  {
    periodo: '2024 —',
    titulo: { en: 'The job changes', es: 'El encargo cambia' },
    que: {
      en:
        'I proposed the medical insurance system and it was approved. Built decoupled from ' +
        'the legacy system, with a rudimentary migrator — a DBF viewer and Python on ' +
        'Windows — good enough for one-off loads but not for daily operation.',
      es:
        'Propuse el sistema de gestión de seguros médicos y se aprobó. Construido ' +
        'desacoplado del sistema heredado, con un migrador rudimentario —un visor de DBF y ' +
        'Python sobre Windows— que servía para cargas puntuales pero no para el día a día.',
    },
  },
  {
    periodo: '2025 —',
    titulo: { en: 'The data layer', es: 'La capa de datos' },
    que: {
      en:
        'A Linux server of my own next to the Windows Server the 1990s systems run on, with ' +
        'a shared folder across operating systems on the same LAN and two network uplinks ' +
        'from different providers for redundancy. On top of it, the DBF engine, the service ' +
        'that exposes it, and the endpoints another developer on the team now consumes.',
      es:
        'Un servidor Linux propio junto al Windows Server donde corren los sistemas de los ' +
        'noventa, con una carpeta compartida entre sistemas operativos en la misma red y dos ' +
        'salidas de red de proveedores distintos por redundancia. Encima, el motor DBF, el ' +
        'servicio que lo expone, y los endpoints que hoy consume otro desarrollador del ' +
        'equipo.',
    },
  },
];

export const sistemas: Sistema[] = [
  {
    nombre: { en: 'Data platform and migration', es: 'Plataforma de datos y migración' },
    estado: 'servicio',
    que: {
      en:
        'A motor of my own that reads and writes the 1990s FoxPro tables at byte level with ' +
        'byte-range locking, and a FastAPI service that fires migrations by date range, ' +
        'follows them by id and serves the aggregates. Over 500,000 historical records ' +
        'reached PostgreSQL without closing the operation for a single day. It is not a ' +
        'one-off migration: it is the data layer the area runs on. Another developer on ' +
        'the team consumes its endpoints from the legacy system to build his own ' +
        'dashboards, the integration runs both ways — an admission recorded in the old ' +
        'system shows up in the intranet, and the other way round — and the digital ' +
        'clinical record being built now will be fed from here.',
      es:
        'Un motor propio que lee y escribe las tablas FoxPro de los noventa a nivel de byte, ' +
        'con bloqueo por rangos, y un servicio en FastAPI que dispara migraciones por rango ' +
        'de fechas, las sigue por su identificador y sirve los agregados. Más de 500.000 ' +
        'registros históricos llegaron a PostgreSQL sin cerrar la operación un solo día. ' +
        'No es una migración de una vez: es la capa de datos sobre la que funciona el ' +
        'área. Otro desarrollador del equipo consume sus endpoints desde el sistema ' +
        'heredado para construir sus propios tableros, la integración va en los dos ' +
        'sentidos —un ingreso registrado en el sistema antiguo aparece en la intranet, y ' +
        'al revés— y la historia clínica digital que se construye ahora se alimentará de ' +
        'aquí.',
    },
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'FoxPro · DBF', 'Alembic'],
    prueba: { texto: 'py-foxpro-engine', url: 'https://github.com/DanielMoranV/py-foxpro-engine' },
  },
  {
    nombre: { en: 'Clinical intranet', es: 'Intranet clínica' },
    estado: 'servicio',
    que: {
      en:
        'A central API that orchestrates admissions, records, human resources and IT support ' +
        'in one place, with real-time events over WebSockets so admission screens stay in ' +
        'sync. It stamps data and signatures onto existing PDF templates instead of ' +
        'rebuilding them. The client is a single-page app with a shift calendar, barcode ' +
        'reading straight from the browser camera, and PDF and Excel export done on the ' +
        'client so the server never carries it.',
      es:
        'Una API central que orquesta admisiones, historias, recursos humanos y soporte ' +
        'informático en un solo sitio, con eventos en tiempo real por WebSockets para que ' +
        'las pantallas de admisión no se desincronicen. Estampa datos y firmas sobre ' +
        'plantillas PDF que ya existían, en vez de rehacerlas. El cliente es una SPA con ' +
        'calendario de turnos, lectura de códigos de barras desde la cámara del navegador y ' +
        'exportación de PDF y Excel en el propio cliente, para no cargar al servidor.',
    },
    stack: ['Laravel 12', 'Vue 3', 'Reverb', 'JWT', 'MySQL'],
  },
  {
    nombre: { en: 'Medical insurance management', es: 'Gestión de seguros médicos' },
    estado: 'servicio',
    que: {
      en:
        'The full insurance cycle: admission, clinical record, billing, medical audit and ' +
        'settlement, with role-based access separating auditors, billers and administration ' +
        'so each one sees only their own stage. Live notifications over WebSockets, and bulk ' +
        'Excel import and export, which is what this kind of work actually runs on.',
      es:
        'El ciclo completo del seguro: admisión, historia clínica, facturación, auditoría ' +
        'médica y liquidación, con acceso por roles que separa a auditores, facturadores y ' +
        'administración para que cada uno vea solo su etapa. Notificaciones en vivo por ' +
        'WebSockets, e importación y exportación masiva en Excel, que es de lo que vive de ' +
        'verdad este trabajo.',
    },
    stack: ['Laravel 11', 'Vue 3', 'RBAC', 'Reverb', 'Docker'],
  },
  {
    nombre: {
      en: 'AI chatbot for the call centre',
      es: 'Chatbot con IA para el call center',
    },
    estado: 'curso',
    que: {
      en:
        'In development: a conversational assistant to take the repeated calls off the ' +
        'clinic’s phone lines. Python on the server, a Vue client, packaged in Docker. It ' +
        'is the third AI I put inside a product rather than beside it — and the first one ' +
        'whose callers are patients.',
      es:
        'En construcción: un asistente conversacional que se lleve las llamadas repetidas de ' +
        'las líneas de la clínica. Python en el servidor, cliente en Vue, empaquetado en ' +
        'Docker. Es la tercera IA que meto dentro de un producto en vez de al lado — y la ' +
        'primera cuyos interlocutores son pacientes.',
    },
    stack: ['Python', 'Vue 3', 'Docker'],
  },
];
