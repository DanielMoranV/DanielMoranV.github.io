/** Cadenas del perfil tecnico. Los datos viven en src/data. */

export const idiomas = { en: 'English', es: 'Español' } as const;
export type Idioma = keyof typeof idiomas;

/** La marca vendedora. Publico distinto, dominio distinto. */
export const MARCA_URL = 'https://djasoft.net.pe';

export const t = {
  en: {
    htmlLang: 'en',
    titulo: 'Daniel Morán Vílchez — Full Stack Developer & Data Engineer',
    descripcion:
      'Full stack developer and data engineer in Piura, Peru. Go, Laravel, TypeScript and ' +
      'the DBF engine that writes to FoxPro tables while the legacy app stays open.',
    otroIdioma: 'Español',

    navTrabajo: 'Work',
    navNotas: 'Engineering notes',
    navCodigo: 'Open source',
    navContacto: 'Contact',

    heroTitulo: 'I build the software companies run on.',
    heroEntrada:
      'Full stack developer and data engineer in Piura, Peru. Eight products in production — ' +
      'ERPs, payroll, e-commerce, electronic invoicing — four of them mine and sold by ' +
      'subscription, four built for clients who paid for them. Everything below has a live ' +
      'URL or a public repository.',

    notasTitulo: 'Engineering notes',
    notasEntrada:
      'Four problems worth writing about. Each one links to the code or to the running system.',
    pruebaEtiqueta: 'Proof',

    trabajoTitulo: 'In production',
    trabajoEntrada:
      'Every link opens the real system. The business case for each of these lives on the ' +
      'product site; here is the stack.',
    modeloPropio: 'own product',
    modeloCliente: 'client work',

    codigoTitulo: 'Open source',
    codigoEntrada:
      'The products stay private because they are sold. These are the pieces that carry the ' +
      'engineering and none of the business rules, published in full.',

    stackTitulo: 'Stack',
    stackEntrada: 'What I actually ship with, not what I have read about.',

    contactoTitulo: 'Contact',
    contactoEntrada:
      'Open to engineering roles and to consulting on legacy integration, Peruvian tax and ' +
      'regulatory domains, or putting an LLM inside a product without handing it the keys.',

    pieMarca: 'Djasoft — my product brand',
    pieDerechos: 'Daniel Morán Vílchez',
  },

  es: {
    htmlLang: 'es',
    titulo: 'Daniel Morán Vílchez — Desarrollador full stack e ingeniero de datos',
    descripcion:
      'Desarrollador full stack e ingeniero de datos en Piura, Perú. Go, Laravel, TypeScript ' +
      'y el motor DBF que escribe en tablas FoxPro con la aplicación de siempre abierta.',
    otroIdioma: 'English',

    navTrabajo: 'Trabajo',
    navNotas: 'Notas de ingeniería',
    navCodigo: 'Código abierto',
    navContacto: 'Contacto',

    heroTitulo: 'Construyo el software sobre el que funcionan las empresas.',
    heroEntrada:
      'Desarrollador full stack e ingeniero de datos en Piura, Perú. Ocho productos en ' +
      'producción —ERPs, planillas, comercio electrónico, facturación electrónica—, cuatro ' +
      'míos y vendidos por suscripción, cuatro construidos para clientes que pagaron por ' +
      'ellos. Todo lo de abajo tiene URL viva o repositorio público.',

    notasTitulo: 'Notas de ingeniería',
    notasEntrada:
      'Cuatro problemas que merecen contarse. Cada uno enlaza al código o al sistema en marcha.',
    pruebaEtiqueta: 'Prueba',

    trabajoTitulo: 'En producción',
    trabajoEntrada:
      'Cada enlace abre el sistema real. El argumento comercial de cada uno vive en el sitio ' +
      'de producto; aquí está el stack.',
    modeloPropio: 'producto propio',
    modeloCliente: 'por encargo',

    codigoTitulo: 'Código abierto',
    codigoEntrada:
      'Los productos son privados porque se venden. Estas son las piezas que llevan la ' +
      'ingeniería y ninguna regla de negocio, publicadas enteras.',

    stackTitulo: 'Stack',
    stackEntrada: 'Con lo que trabajo de verdad, no lo que he leído.',

    contactoTitulo: 'Contacto',
    contactoEntrada:
      'Abierto a puestos de ingeniería y a consultoría sobre integración con sistemas ' +
      'heredados, dominios regulados peruanos, o meter un LLM dentro de un producto sin ' +
      'entregarle las llaves.',

    pieMarca: 'Djasoft — mi marca de producto',
    pieDerechos: 'Daniel Morán Vílchez',
  },
} as const;

/** Agrupado por lo que se usa, no por popularidad. */
export const stack = [
  { grupo: { en: 'Backend', es: 'Backend' }, items: ['Go · Gin · sqlx', 'PHP · Laravel', 'TypeScript · NestJS', 'Python'] },
  { grupo: { en: 'Frontend', es: 'Frontend' }, items: ['React 19', 'Vue 3', 'Livewire', 'Astro', 'Tailwind'] },
  { grupo: { en: 'Data', es: 'Datos' }, items: ['PostgreSQL · PL/pgSQL', 'Firestore', 'FoxPro · DBF', 'ETL'] },
  { grupo: { en: 'Mobile', es: 'Móvil' }, items: ['Flutter'] },
  { grupo: { en: 'Infrastructure', es: 'Infraestructura' }, items: ['Firebase', 'Cloudflare Pages', 'AWS S3', 'GitHub Actions', 'WebSockets'] },
];
