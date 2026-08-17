/**
 * Lo que esta en produccion, listado por su stack.
 *
 * REGLA HEREDADA DE UN FALLO REAL: `url` debe apuntar al producto ACTUAL. Ya
 * paso que un enlace respondia 200 y servia la version anterior, y ningun check
 * automatico lo detecta. Al tocar esta lista, abrir cada enlace y mirar QUE
 * sirve. Esta misma lista existe en el repo de djasoft.net.pe: si cambia una
 * URL aqui, cambia alli.
 */

export interface Trabajo {
  nombre: string;
  url: string;
  /** `propio` = producto de suscripcion; `cliente` = encargo pagado. */
  modelo: 'propio' | 'cliente';
  stack: string[];
  que: { en: string; es: string };
  /**
   * Marca del producto o del cliente, en public/projects/. Se pinta pequena y
   * dentro de una placa clara: son logos a todo color —escudos, degradados,
   * ilustraciones— y esta pagina es serif, mono y un solo acento. Contenerlos
   * en una celda propia es lo que evita que se coman la direccion visual.
   */
  logo: string;
  /**
   * Ano de inicio. SOLO el ano, a proposito: el mes es precision que no
   * puedo sostener en todos —algunos proyectos empezaron antes de que
   * existiera su repositorio— y en una lista de siete productos anade
   * ruido sin cambiar la lectura. Lo que importa es la curva.
   */
  desde: string;
  /**
   * Fuera del listado publicado mientras se define su situacion. No se
   * borra la entrada: se apaga, para que cuando vuelva no haya que
   * reconstruirla ni reinventar el dato.
   */
  oculto?: boolean;
}

const catalogo: Trabajo[] = [
  {
    nombre: 'AlmaZen',
    desde: '2025',
    logo: '/projects/almazen.webp',
    url: 'https://almazenapp.djasoft.net.pe/',
    modelo: 'propio',
    stack: ['Laravel', 'Livewire', 'PostgreSQL', 'Gemini'],
    que: {
      en: 'Multi-tenant ERP: inventory, purchasing, sales, POS, SUNAT e-invoicing, AI agent',
      es: 'ERP multiempresa: inventario, compras, ventas, POS, facturación SUNAT, agente de IA',
    },
  },
  {
    nombre: 'Mozaico',
    desde: '2026',
    logo: '/projects/mozaicopro.webp',
    url: 'https://mozaicopro.djasoft.net.pe/',
    modelo: 'propio',
    stack: ['Go', 'Gin', 'sqlx', 'React 19', 'PostgreSQL'],
    que: {
      en: 'Restaurant management with floor and kitchen synced over WebSockets',
      es: 'Gestión de restaurantes con salón y cocina sincronizados por WebSockets',
    },
  },
  {
    nombre: 'EasyPay',
    desde: '2026',
    logo: '/projects/easypay.webp',
    url: 'https://easypay.djasoft.net.pe/',
    modelo: 'propio',
    stack: ['TypeScript', 'NestJS'],
    que: {
      en: 'Staff, attendance, scheduling and payroll runs',
      es: 'Personal, asistencia, horarios y cálculo de planillas',
    },
  },
  {
    nombre: 'Agenda EH',
    desde: '2026',
    oculto: true,
    logo: '/projects/agenda-eh.svg',
    url: 'https://agenda-eh.web.app/',
    modelo: 'propio',
    stack: ['Vue 3', 'Firestore', 'OAuth 2.0'],
    que: {
      en: 'Eisenhower matrix with two-way Google Calendar sync',
      es: 'Matriz de Eisenhower con sincronización bidireccional con Google Calendar',
    },
  },
  {
    nombre: 'Master Color',
    desde: '2025',
    logo: '/projects/master-color.webp',
    url: 'https://www.mastercolor.net.pe/',
    modelo: 'cliente',
    stack: ['Laravel', 'Vue 3', 'Flutter', 'AWS S3'],
    que: {
      en: 'E-commerce, order management and a Flutter field-support app',
      es: 'Comercio electrónico, gestión de pedidos y app de soporte en campo con Flutter',
    },
  },
  {
    nombre: 'Otto Tonsmann',
    desde: '2026',
    logo: '/projects/otto-tonsmann.webp',
    url: 'https://otto-tonsmann.web.app/',
    modelo: 'cliente',
    stack: ['Vue 3', 'Firebase'],
    que: {
      en: 'Cash desk, receipts and student registry with role-based access and audit trail',
      es: 'Caja, comprobantes y padrón de alumnos con acceso por roles y auditoría',
    },
  },
  {
    nombre: 'CONERI',
    desde: '2024',
    logo: '/projects/coneri.webp',
    url: 'https://coneri.pe/',
    modelo: 'cliente',
    stack: ['Firebase', 'Cloud Functions', 'Cloudflare Pages'],
    que: {
      en: 'Catalog with a quote cart and an admin panel, orphaned images cleaned by triggers',
      es: 'Catálogo con carrito de cotización y panel, imágenes huérfanas limpiadas por triggers',
    },
  },
  {
    nombre: 'SURGIMED',
    desde: '2024',
    logo: '/projects/surgimed.webp',
    url: 'https://surgimed-pe.web.app/',
    modelo: 'cliente',
    stack: ['Firebase Hosting', 'GitHub Actions'],
    que: {
      en: 'Corporate site with continuous deployment from the repository',
      es: 'Sitio institucional con despliegue continuo desde el repositorio',
    },
  },
];

/**
 * Lo que se publica. `oculto` no es un borrado: un producto apagado sigue
 * aqui con su ficha entera, y encenderlo es quitar una linea.
 */
export const trabajos = catalogo.filter((w) => !w.oculto);
export const PROPIOS = trabajos.filter((w) => w.modelo === 'propio').length;
export const CLIENTES = trabajos.filter((w) => w.modelo === 'cliente').length;
