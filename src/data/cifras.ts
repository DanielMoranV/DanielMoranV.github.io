/**
 * Las cuatro cifras de la banda bajo el hero.
 *
 * REGLA: solo entran cifras que se puedan sostener si te preguntan como se
 * midieron. Una cifra floja invita a que te interroguen sobre ella en lugar
 * de sobre tu trabajo, asi que aqui no hay disponibilidades del 99,9 % ni
 * mejoras del 30 % sin linea base.
 *
 * El texto es deliberadamente mas prudente que el del documento de diseno:
 * los usuarios lo son de sistemas que mantengo, que no es lo mismo que de
 * producto propio.
 */

export interface Cifra {
  valor: { en: string; es: string };
  que: { en: string; es: string };
}

export const cifras: Cifra[] = [
  {
    valor: { en: '500,000+', es: '500.000+' },
    que: {
      en: 'records migrated without closing for a day',
      es: 'registros migrados sin cerrar un solo día',
    },
  },
  {
    valor: { en: '8', es: '8' },
    que: {
      en: 'products in production with a live URL',
      es: 'productos en producción con URL viva',
    },
  },
  {
    valor: { en: '50+', es: '50+' },
    que: {
      en: 'daily users on systems I maintain',
      es: 'usuarios diarios en sistemas que mantengo',
    },
  },
  {
    valor: { en: '20+', es: '20+' },
    que: {
      en: 'business modules built and in service',
      es: 'módulos de negocio construidos y en servicio',
    },
  },
];
