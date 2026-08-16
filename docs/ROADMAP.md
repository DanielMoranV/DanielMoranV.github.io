# Roadmap del perfil técnico

Estado de <https://danielmoranv.github.io/>: qué está hecho, qué falta y qué decisiones ya
están tomadas para no volver a discutirlas.

Última actualización: **16 de agosto de 2026**.

> **Este repositorio es público.** Aquí no entran credenciales, siglas internas de clientes,
> nombres de repositorios privados ni rutas de código ajeno. El trabajo de cliente se cuenta
> por su ingeniería, nunca por sus datos.

---

## Dónde estamos

| | |
|---|---|
| Framework | Astro 7 estático, Tailwind 4, sin framework de cliente |
| Idiomas | Inglés en `/`, castellano en `/es/` |
| JavaScript en el cliente | Solo el conmutador de tema (~25 líneas) |
| Peticiones a terceros | **Cero** |
| Fuentes | 3 familias autoalojadas, 116 KB |
| Peso de una visita | 169 KB en 15 peticiones |
| Lighthouse | 100 / 100 / 100 / 100, medido |
| Secciones | 8 · perfil, notas, producción, trayectoria, código abierto, método, stack, contacto |
| Páginas | 8 · portada y 3 case studies, en los dos idiomas |
| Despliegue | GitHub Actions en cada push a `main` |

---

## Hecho

### Cimientos (`c04e169`, `3fea58c`)

- **Tarjeta Open Graph** en los dos idiomas, `favicon.svg` y `apple-touch-icon`. Antes,
  compartir el enlace en LinkedIn o WhatsApp mostraba un rectángulo gris sin icono, que es
  literalmente la primera impresión de quien lo recibe.
- **JSON-LD `Person`** con `sameAs`, ubicación y `knowsAbout`, para que buscar el nombre
  devuelva este sitio y no un homónimo. Solo declara cosas visibles en la página.
- **Sitemap generado** con `@astrojs/sitemap` en vez de escrito a mano, con alternancia
  `en`/`es-PE` por URL, y `robots.txt` que lo apunta.
- **Navegación visible en móvil.** Los enlaces de sección eran `hidden sm:inline`, así que en
  el teléfono solo quedaban el nombre y el idioma — y el teléfono es justo donde se abre un
  enlace que llega por LinkedIn.
- **La capa FastAPI** en la nota del motor DBF: el motor no es un script que alguien recuerda
  lanzar, vive detrás de un servicio.

### Dirección visual «ficha técnica» (`4a87111`)

- **Tipografía como identidad.** Newsreader para titulares —una serif de texto, no
  decorativa—, Martian Mono para sellos y cifras, Public Sans para el cuerpo.
- **Autoalojadas, 116 KB.** La primera descarga pesaba 356 KB: las tres familias son
  variables y Google devolvía **el mismo `woff2` una vez por cada peso pedido**. Se deduplica
  por hash de contenido y se declara con rango (`font-weight: 300 400`).
- **Conmutador de tema de tres estados.** Claro, oscuro y sistema, siendo «sistema» la
  ausencia de atributo y de clave en `localStorage`, así que sigue al sistema en vivo sin
  escuchar nada. Sin destello: la preferencia se escribe en la raíz antes del primer pintado.
- **Escala tipográfica declarada** como tokens, y un ancho por tipo de contenido. El
  `max-w-3xl` único desapareció.
- **Banda de cuatro cifras**, que es lo único que un lector no técnico puede evaluar solo.
- Contrastes comprobados en las dos paletas: todo AA, la mayoría AAA.

### Material gráfico (`42943c6`)

- **Retrato** en el hero, cuadrado y convertido a `webp` (11 KB).
- **Ocho logotipos** de producto y cliente, a 28 px dentro de una placa con fondo claro fijo.
  Contener el color era la única forma de meter marcas a todo color en una página de serif,
  mono y un solo acento sin que se la comieran. Además salva en tema oscuro a los que llevan
  texto blanco o línea fina.

### Case studies (`—`)

- **Tres páginas interiores por idioma**, con la misma estructura fija en las seis:
  contexto → problema → **restricciones** → decisiones *y la alternativa descartada* →
  resultado → prueba. Un formato constante se lee en diagonal, y quien compara candidatos
  lee en diagonal.
- **La alternativa descartada tiene tratamiento visual propio.** Una decisión sin
  alternativa descartada no es una decisión, es una preferencia.
- **URLs traducidas**: `/case-studies/<slug>/` y `/es/casos/<slug>/`, con el mismo slug para
  que los `hreflang` se emparejen entre traducciones y no contra la portada.
- **Diagramas de mecanismo** dibujados con las cajas y los tokens de la página, no como
  imagen: cambian de tema solos, se pueden seleccionar, los lee un lector de pantalla y no
  pesan nada.
- El layout se generalizó para admitir páginas interiores: título, descripción, `og:type` y
  rutas por idioma. Y la barra ahora sabe dónde está — fuera de la portada, un `#notas` a
  secas no apunta a nada.

### Mantenimiento y auditoría

- **Actions al día.** `checkout@v7`, `setup-node@v7`, `upload-pages-artifact@v5` y
  `deploy-pages@v5`. Las anteriores apuntaban a Node 20, ya deprecado, y GitHub las forzaba
  a Node 24 con un aviso en cada ejecución. Se revisaron los cambios de cada versión antes
  de subirlas: ninguno de ruptura para este workflow.
- **Lighthouse: 100 en las cuatro categorías**, en la portada y en un case study. Medido, no
  supuesto. FCP 0,3 s · LCP 0,4 s · TBT 0 ms · CLS 0.
- **Dos mejoras que salieron de la medición:** los logotipos estaban a 3,4× de su tamaño de
  pantalla y bajaron a ~2,3× (49 KB → 32 KB), y la hoja de estilos se incrusta, con lo que
  desaparece la única petición que bloqueaba el pintado.

> **Lo que Lighthouse sigue marcando y no se va a corregir:** audita con
> `deviceScaleFactor: 1`, así que da por «demasiado grande» cualquier imagen preparada para
> pantallas de doble densidad. Bajar de 2× ahorraría 20 KB y dejaría el retrato y los
> logotipos borrosos en la mayoría de pantallas actuales. Una métrica al 100 no es motivo
> para empeorar lo que se ve.

### CV en PDF

- **Uno por idioma**, generados con `scripts/gen-cv.py`: se compone un HTML con las tres
  fuentes del sitio incrustadas y se imprime con Chrome. Sin LaTeX, sin Word y sin
  dependencias. El PDF que descarga un reclutador y la página que acaba de leer son
  reconociblemente lo mismo.
- Dos páginas: perfil, cifras, experiencia con logros, los ocho productos, los case studies
  con su URL, código abierto, stack, formación e idiomas.
- **Sin teléfono, a propósito.** El repositorio es público y el fichero se sirve desde una
  URL fija: un número ahí queda indexable y fácil de raspar. Para una copia con teléfono
  destinada a enviarse en una candidatura, el script lo dice en su cabecera — y esa copia se
  guarda fuera del repositorio.

### Cómo trabajo

- **Cinco pasos**, ninguno de ellos Scrum ni Kanban. El hilo común es la restricción que
  define este trabajo: los sistemas que se tocan **no se pueden apagar**.
- Cada paso describe algo comprobable en este sitio o en los repositorios públicos, no una
  aspiración: abrir los binarios y no solo listarlos, escribir las restricciones antes que
  las funcionalidades, un cambio por vez verificado después, respaldar y **verificar el
  respaldo** antes de lo irreversible, y extraer la mitad reutilizable.
- El cierre enlaza a este mismo roadmap. Es la prueba del método en vez de su enunciado: las
  decisiones están escritas, y las correcciones también.
- Se reutiliza la rejilla de decisiones de los case studies en lugar de inventar un
  componente. El boceto pedía los cinco pasos en fila; a cinco columnas los párrafos caían a
  veinticinco caracteres por línea, así que van en dos columnas desde 1024 px.

### Trayectoria (`7865d9e`, `cfaede5`)

- Sección propia con el puesto y **cuatro sistemas**: plataforma de datos y migración,
  intranet clínica, gestión de seguros médicos y el chatbot con IA, declarado *en curso*.
- **La experiencia arranca en 2022**, que es cuando la programación pasa a ser el trabajo.
  Los años se calculan en cada compilación, no se escriben a mano.

---

## Pendiente

### P0 — cierran huecos que un reclutador nota

- [ ] **Testimonios.** Dos o tres citas de clientes que pagaron, con atribución en mono, sin
      comillas decorativas ni foto. Pesan más que cualquier cosa que uno escriba sobre sí
      mismo, y hay que pedirlas mientras el trabajo está reciente.

### P1 — el salto de mid a senior

- [ ] **Capturas** para los case studies. Solo de producto propio; de sistemas de cliente se
      cuenta la ingeniería, no se enseñan los datos. Hoy cada estudio lleva un diagrama de
      mecanismo dibujado con los tokens, que era lo que se podía hacer sin material.

### P2 — mantenimiento

- [ ] **Pegar las etiquetas `og:` en los tres productos.** Las imágenes ya están generadas y
      publicadas en `public/og/`; falta el `<meta>` en cada aplicación. Instrucciones exactas
      por stack en [`OG-PRODUCTOS.md`](OG-PRODUCTOS.md).
- [ ] **Enriquecer el chatbot** cuando avance. Hoy está descrito de forma deliberadamente
      conservadora porque es reciente: dice qué es y con qué está hecho, sin prometer
      alcance.

---

## Decisiones tomadas

No volver a abrirlas sin un motivo nuevo.

| Decisión | Por qué |
|---|---|
| **Este sitio no es la marca comercial** | `djasoft.net.pe` le habla a un dueño de empresa, en español y por lo que resuelve. Este le habla a quien va a leer código o contratar ingeniería. Dominio, idioma por defecto y paleta distintos a propósito |
| **Inglés por defecto** | El objetivo es remoto internacional. El castellano vive en `/es/` |
| **Dirección «ficha técnica»** | Se eligió entre dos propuestas. La identidad sale de la voz tipográfica, no de la retícula |
| **Cero peticiones a terceros** | Ni fuentes, ni CDN, ni analítica. El sitio carga al instante, y eso es una característica del producto |
| **La experiencia empieza en 2022** | Antes hubo seis años de soporte técnico, redes y logística. Contarlos como experiencia de desarrollo es inflar la cifra, y un entrevistador lo desmonta en una pregunta |
| **Los años, calculados en compilación** | Un portafolio que dice «3+ años» sigue diciéndolo tres años después |
| **Sin barras de aptitudes ni contadores** | Nadie las cree. Tampoco muros de logos sin contexto, «currently learning», carruseles ni formularios de contacto |
| **Nada de placeholders visibles** | Un retrato de relleno o un `cv.pdf` que devuelve 404 dicen «sitio a medias». Las piezas que faltan se apagan con una bandera hasta que exista el fichero |

---

## Reglas que costaron un fallo

1. **Un enlace que responde 200 puede servir software viejo**, y eso no lo detecta ningún
   check automático. Al tocar `src/data/trabajo.ts`, abrir cada enlace y mirar **qué** sirve.
2. **No enlazar repositorios privados.** Devuelven 404 al visitante. Se describe el trabajo
   sin enlace.
3. **El stack no se mide por los repositorios públicos.** Un producto en producción puede
   tener su repo real con otro nombre y en privado. Antes de decir que una tecnología no se
   usa, buscarla en los privados.
4. **La comprobación de que no se filtra nada se hace sobre el HTML compilado**, no sobre las
   fuentes.
5. **Los diagramas y los SVG, con `currentColor` y los tokens.** Un SVG con colores fijos se
   ve perfecto en el tema en que se dibujó e ilegible en el otro, y nadie lo detecta hasta
   que un visitante lo abre.
6. **Probar los diseños con el texto en castellano**, que ocupa hasta un 25 % más que el
   inglés y es el que rompe las cajas.

---

## Cómo se regenera cada cosa

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/

python scripts/fuentes.py   # vuelve a bajar y deduplicar las fuentes -> public/fonts/
python scripts/gen-og.py    # regenera las tarjetas OG y el icono tactil
```

Los dos scripts se ejecutan **a mano y en contadas ocasiones**: sus salidas se commitean.
Ficheros que no cambian no justifican una dependencia de build.

### Dónde vive cada cosa

| Ruta | Qué contiene |
|---|---|
| `src/data/casos.ts` | Notas de ingeniería: el trabajo por su parte difícil |
| `src/data/estudios.ts` | Los case studies, con sus decisiones y descartes |
| `src/data/metodo.ts` | Los cinco pasos de «cómo trabajo» |
| `docs/OG-PRODUCTOS.md` | Las etiquetas `og:` que faltan en los productos |
| `src/data/trabajo.ts` | Lo que está en producción, con su stack y su enlace vivo |
| `src/data/trayectoria.ts` | El puesto y los sistemas del sector salud |
| `src/data/cifras.ts` | Las cuatro cifras de la banda |
| `src/data/opensource.ts` | Piezas publicadas enteras |
| `src/i18n/ui.ts` | Cadenas de los dos idiomas, stack y banderas de contenido |
| `src/styles/global.css` | Tokens, temas y las piezas de la dirección visual |
| `src/styles/_fuentes.css` | Generado. No editar a mano |
