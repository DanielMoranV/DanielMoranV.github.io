/** Cadenas del perfil tecnico. Los datos viven en src/data. */

export const idiomas = { en: 'English', es: 'Español' } as const;
export type Idioma = keyof typeof idiomas;

/** La marca vendedora. Publico distinto, dominio distinto. */
export const MARCA_URL = 'https://djasoft.net.pe';

export const CORREO = 'skaan.dmv@gmail.com';
export const GITHUB = 'https://github.com/DanielMoranV';
export const LINKEDIN = 'https://linkedin.com/in/danielmoranv';

/**
 * El CV no se pinta hasta que exista el fichero: un enlace que devuelve 404 es
 * justo el fallo que este sitio vino a corregir. Para encenderlo, deja
 * public/cv.pdf y pon true.
 */
export const HAY_CV = false;

/** Retrato real, cuadrado. Se convirtio de profile.jfif a webp: 11 KB. */
export const FOTO = '/foto.webp';

export const t = {
  en: {
    htmlLang: 'en',
    titulo: 'Daniel Morán Vílchez — Full Stack Developer & Data Engineer',
    descripcion:
      'Full stack developer and data engineer in Piura, Peru. Go, Laravel, TypeScript and ' +
      'the DBF engine that writes to FoxPro tables while the legacy app stays open.',
    otroIdioma: 'Español',
    tarjetaAlt:
      'Daniel Morán Vílchez — Full Stack Developer & Data Engineer. Go, Laravel, Python, ' +
      'TypeScript, PostgreSQL.',

    marca: 'Daniel Morán Vílchez',
    marcaCorta: 'D. Morán V.',

    navTrabajo: 'Work',
    navNotas: 'Notes',
    navTrayectoria: 'Track record',
    navCodigo: 'Code',
    navContacto: 'Contact',

    temaLeyenda: 'Colour theme',
    temaClaro: 'Light',
    temaOscuro: 'Dark',
    temaSistema: 'System',

    heroMeta: 'Piura, Peru · full stack + data · 2016—',
    heroTitulo: 'I build the software companies run on.',
    heroEntrada:
      'Full stack developer and data engineer in Piura, Peru. Eight products in production — ' +
      'ERPs, payroll, e-commerce, electronic invoicing — four of them mine and sold by ' +
      'subscription, four built for clients who paid for them. Everything below has a live ' +
      'URL or a public repository.',
    heroCorreo: 'Email',
    heroGithub: 'GitHub',
    heroCv: 'CV.pdf ↓',
    fotoAlt: 'Daniel Morán Vílchez',

    notasTitulo: 'Engineering notes',
    notasEtiqueta: 'Four problems',
    destacada: 'Featured',
    antes: 'Before',
    ahora: 'Now',

    trabajoTitulo: 'In production',
    trabajoEtiqueta: 'Eight systems',
    trabajoPropio: 'Own product · subscription',
    trabajoCliente: 'Client work · commissioned',

    trayectoriaTitulo: 'Track record',
    trayectoriaEtiqueta: 'Healthcare · since 2022',
    sistemasEtiqueta: 'Flagship systems',
    estadoServicio: 'In service',
    estadoCurso: 'In progress',

    codigoTitulo: 'Open source',
    codigoEtiqueta: 'Published in full',
    codigoEntrada:
      'The products stay private because they are sold. These are the pieces that carry the ' +
      'engineering and none of the business rules, published in full.',

    stackTitulo: 'Stack',
    stackEtiqueta: 'What I ship with',

    contactoTitulo: 'Contact',
    contactoEtiqueta: 'Open to work',
    contactoEntrada:
      'Open to engineering roles and to consulting on legacy integration, Peruvian tax and ' +
      'regulatory domains, or putting an LLM inside a product without handing it the keys.',
    contactoLugar: 'Piura, Peru · UTC−5',

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
    tarjetaAlt:
      'Daniel Morán Vílchez — Desarrollador full stack e ingeniero de datos. Go, Laravel, ' +
      'Python, TypeScript, PostgreSQL.',

    marca: 'Daniel Morán Vílchez',
    marcaCorta: 'D. Morán V.',

    navTrabajo: 'Trabajo',
    navNotas: 'Notas',
    navTrayectoria: 'Trayectoria',
    navCodigo: 'Código',
    navContacto: 'Contacto',

    temaLeyenda: 'Tema de color',
    temaClaro: 'Claro',
    temaOscuro: 'Oscuro',
    temaSistema: 'Sistema',

    heroMeta: 'Piura, Perú · full stack + datos · 2016—',
    heroTitulo: 'Construyo el software sobre el que funcionan las empresas.',
    heroEntrada:
      'Desarrollador full stack e ingeniero de datos en Piura, Perú. Ocho productos en ' +
      'producción —ERPs, planillas, comercio electrónico, facturación electrónica—, cuatro ' +
      'míos y vendidos por suscripción, cuatro construidos para clientes que pagaron por ' +
      'ellos. Todo lo de abajo tiene URL viva o repositorio público.',
    heroCorreo: 'Correo',
    heroGithub: 'GitHub',
    heroCv: 'CV.pdf ↓',
    fotoAlt: 'Daniel Morán Vílchez',

    notasTitulo: 'Notas de ingeniería',
    notasEtiqueta: 'Cuatro problemas',
    destacada: 'Destacada',
    antes: 'Antes',
    ahora: 'Ahora',

    trabajoTitulo: 'En producción',
    trabajoEtiqueta: 'Ocho sistemas',
    trabajoPropio: 'Producto propio · suscripción',
    trabajoCliente: 'Por encargo · cliente',

    trayectoriaTitulo: 'Trayectoria',
    trayectoriaEtiqueta: 'Salud · desde 2022',
    sistemasEtiqueta: 'Sistemas bandera',
    estadoServicio: 'En servicio',
    estadoCurso: 'En curso',

    codigoTitulo: 'Código abierto',
    codigoEtiqueta: 'Publicado entero',
    codigoEntrada:
      'Los productos son privados porque se venden. Estas son las piezas que llevan la ' +
      'ingeniería y ninguna regla de negocio, publicadas enteras.',

    stackTitulo: 'Stack',
    stackEtiqueta: 'Con lo que trabajo',

    contactoTitulo: 'Contacto',
    contactoEtiqueta: 'Disponible',
    contactoEntrada:
      'Abierto a puestos de ingeniería y a consultoría sobre integración con sistemas ' +
      'heredados, dominios regulados peruanos, o meter un LLM dentro de un producto sin ' +
      'entregarle las llaves.',
    contactoLugar: 'Piura, Perú · UTC−5',

    pieMarca: 'Djasoft — mi marca de producto',
    pieDerechos: 'Daniel Morán Vílchez',
  },
} as const;

/** Agrupado por lo que se usa, no por popularidad. */
export const stack = [
  {
    grupo: { en: 'Backend', es: 'Backend' },
    items: ['Go · Gin · sqlx', 'PHP · Laravel', 'TypeScript · NestJS', 'Python · FastAPI'],
  },
  {
    grupo: { en: 'Frontend', es: 'Frontend' },
    items: ['React 19', 'Vue 3', 'Livewire', 'Astro', 'Tailwind'],
  },
  {
    grupo: { en: 'Data', es: 'Datos' },
    items: ['PostgreSQL · PL/pgSQL', 'Firestore', 'FoxPro · DBF', 'ETL'],
  },
  { grupo: { en: 'Mobile', es: 'Móvil' }, items: ['Flutter'] },
  {
    grupo: { en: 'Infrastructure', es: 'Infraestructura' },
    items: ['Firebase', 'Cloudflare Pages', 'AWS S3', 'GitHub Actions', 'WebSockets'],
  },
];
