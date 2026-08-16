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
}

export const trabajos: Trabajo[] = [
  {
    nombre: 'AlmaZen',
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
    url: 'https://surgimed-pe.web.app/',
    modelo: 'cliente',
    stack: ['Firebase Hosting', 'GitHub Actions'],
    que: {
      en: 'Corporate site with continuous deployment from the repository',
      es: 'Sitio institucional con despliegue continuo desde el repositorio',
    },
  },
];
