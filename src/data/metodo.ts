/**
 * Como trabajo. Seis pasos.
 *
 * REGLA DE ESCRITURA: nada de Scrum, Kanban ni «metodologias agiles». Eso lo
 * pone todo el mundo y no significa nada; ademas es facil de desmontar en una
 * entrevista. Cada paso de aqui describe algo que se hace de verdad y que
 * tiene una consecuencia visible en este sitio o en los repositorios
 * publicos, asi que se puede comprobar.
 *
 * El hilo comun es la restriccion que define este trabajo: los sistemas sobre
 * los que se opera NO SE PUEDEN APAGAR, y que no son solo suyos: parte de
 * lo que escribe lo consume el sistema de otra persona. De ahi salen los seis.
 */

export interface Paso {
  titulo: { en: string; es: string };
  cuerpo: { en: string; es: string };
}

export const pasos: Paso[] = [
  {
    titulo: {
      en: 'Open what is already there',
      es: 'Abrir lo que ya hay',
    },
    cuerpo: {
      en:
        'Before proposing any architecture I open the system that holds the business up ' +
        'today: its files, its binaries, the spreadsheets people actually work from. More ' +
        'than once the thing that decided the project was not in the documentation but ' +
        'inside a .dbf nobody had looked at. Listing files is not auditing them — they have ' +
        'to be opened.',
      es:
        'Antes de proponer arquitectura abro el sistema que sostiene el negocio hoy: sus ' +
        'ficheros, sus binarios, las hojas de cálculo con las que se trabaja de verdad. Más ' +
        'de una vez lo que decidió el proyecto no estaba en la documentación, sino dentro de ' +
        'un .dbf que nadie había mirado. Listar ficheros no es auditarlos: hay que abrirlos.',
    },
  },
  {
    titulo: {
      en: 'Write the constraints before the features',
      es: 'Escribir las restricciones antes que las funcionalidades',
    },
    cuerpo: {
      en:
        'Anyone can hand over a feature list. What decides the design are the constraints: ' +
        'the operation cannot stop, the data is a sensitive category, the kitchen screen is a ' +
        'modest tablet on shared Wi-Fi. Written down first, the architecture almost follows ' +
        'on its own — and the constraints nobody mentioned show up in the first week instead ' +
        'of the last.',
      es:
        'Una lista de funcionalidades la entrega cualquiera. Lo que decide el diseño son las ' +
        'restricciones: que la operación no se puede detener, que el dato es de categoría ' +
        'sensible, que la pantalla de cocina es una tableta modesta sobre wifi compartido. ' +
        'Escritas primero, la arquitectura sale casi sola — y las restricciones que nadie ' +
        'mencionó aparecen en la primera semana en vez de en la última.',
    },
  },
  {
    titulo: {
      en: 'One change at a time, verified afterwards',
      es: 'Un cambio por vez, verificado después',
    },
    cuerpo: {
      en:
        'On systems people use every day, a large batch does not get debugged — it gets ' +
        'rolled back whole. So: the concrete plan before executing, and the result checked ' +
        'after. It is slower to describe and considerably faster when something goes wrong.',
      es:
        'En sistemas que se usan todos los días, un lote grande no se depura: se revierte ' +
        'entero. Así que el plan concreto antes de ejecutar, y la comprobación del resultado ' +
        'después. Es más lento de contar y bastante más rápido cuando algo sale mal.',
    },
  },
  {
    titulo: {
      en: 'Back up before touching the irreversible',
      es: 'Respaldar antes de tocar lo irreversible',
    },
    cuerpo: {
      en:
        'Before anything that cannot be undone, a backup — and the backup verified against ' +
        'the original, because an unverified backup is a belief, not a backup. Containment ' +
        'comes before tidying up, too: if something is exposed, it gets closed first and ' +
        'documented second. Covering a problem is not fixing it.',
      es:
        'Antes de cualquier cosa que no se pueda deshacer, un respaldo — y el respaldo ' +
        'verificado contra el original, porque un respaldo sin verificar es una creencia, no ' +
        'un respaldo. Contener va también antes que embellecer: si algo está expuesto, se ' +
        'cierra primero y se documenta después. Tapar un problema no es arreglarlo.',
    },
  },
  {
    titulo: {
      en: 'Do not break what someone else depends on',
      es: 'No romper lo que otro depende',
    },
    cuerpo: {
      en:
        'Part of what I write is consumed by a colleague’s system. An endpoint already in ' +
        'production is a contract: you extend it, you do not reshape it — and when it has to ' +
        'change, you say so before and you check after. It costs an extra conversation on ' +
        'day one and it saves the phone call on day two.',
      es:
        'Parte de lo que escribo lo consume el sistema de un compañero. Un endpoint que ya ' +
        'está en producción es un contrato: se amplía, no se le cambia la forma — y cuando ' +
        'hay que cambiarlo, se avisa antes y se comprueba después. Cuesta una conversación ' +
        'de más el primer día y ahorra la llamada del segundo.',
    },
  },
  {
    titulo: {
      en: 'Take the reusable half out',
      es: 'Sacar fuera la parte reutilizable',
    },
    cuerpo: {
      en:
        'When a piece carries technical value and no business rules, I pull it out, strip it ' +
        'and publish it. The client keeps their product; I keep code already proven in ' +
        'production. The packages above came out that way — and extracting one of them ' +
        'surfaced two correctness bugs that had been hiding for years.',
      es:
        'Cuando una pieza lleva valor técnico y ninguna regla de negocio, la extraigo, la ' +
        'despojo y la publico. Al cliente le queda su producto; a mí, código ya probado en ' +
        'producción. Los paquetes de aquí arriba salieron así — y extraer uno de ellos sacó a ' +
        'la luz dos defectos de corrección que llevaban años escondidos.',
    },
  },
];

/**
 * El cierre enlaza al roadmap de este mismo repositorio. Es la prueba del
 * paso 3 y del 4: no es que diga que documento las decisiones, es que se
 * pueden leer, con las correcciones incluidas.
 */
export const REGISTRO_URL =
  'https://github.com/DanielMoranV/DanielMoranV.github.io/blob/main/docs/ROADMAP.md';
