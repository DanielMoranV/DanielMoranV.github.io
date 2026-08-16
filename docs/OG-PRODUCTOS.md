# Tarjetas de enlace para los productos

Qué hay que pegar en cada producto para que compartir su URL deje de dar una
tarjeta vacía. Las imágenes ya están generadas y publicadas; **solo faltan las
etiquetas `<meta>` en cada aplicación.**

Última actualización: **16 de agosto de 2026**.

---

## El problema, medido

| Producto | HTML | `<title>` | `description` | Etiquetas `og:` |
|---|---|---|---|---|
| `almazenapp.djasoft.net.pe` | 56 KB, servido | ✅ | ✅ | ❌ |
| `mozaicopro.djasoft.net.pe` | 1,2 KB (SPA) | ✅ | ❌ | ❌ |
| `easypay.djasoft.net.pe` | 1,1 KB (SPA) | ✅ | ❌ | ❌ |

Sin `og:`, el enlace se ve como un rectángulo gris **en todas partes**: LinkedIn,
WhatsApp, Slack, Telegram, X, Discord y las vistas previas de Gmail. LinkedIn
llegó a rechazar dos de los tres con *«Introduce un enlace válido»* al primer
intento, y solo los aceptó al reintentar.

Los tres responden en ~0,6 s, así que **no era lentitud**: era que no había nada
que leer.

---

## Las imágenes ya están listas

Generadas por [`scripts/gen-og.py`](../scripts/gen-og.py) con la tipografía y la
paleta del sitio, y servidas desde aquí:

| Producto | Imagen |
|---|---|
| AlmaZen | `https://danielmoranv.github.io/og/almazen.png` |
| MozaicoPro | `https://danielmoranv.github.io/og/mozaico.png` |
| EasyPay | `https://danielmoranv.github.io/og/easypay.png` |

**Por qué se sirven desde el portafolio y no desde cada producto:** este sitio ya
es estático, público y con despliegue automático, así que cada aplicación solo
necesita añadir texto —cero assets, cero cambios de build, cero riesgo—. Alojar
una imagen en un dominio distinto al de la página es práctica normal; ningún
rastreador lo penaliza.

Si más adelante quieres que cada producto sirva la suya, copia el PNG a su
carpeta pública y cambia la URL. Nada más.

---

## Qué pegar, producto a producto

Va **dentro de `<head>`**. Las cuatro primeras líneas son las que hacen el
trabajo; el resto mejora el resultado.

### AlmaZen — Laravel + Livewire

En el layout Blade principal (`resources/views/layouts/app.blade.php` o
equivalente), dentro de `<head>`:

```blade
<meta property="og:type" content="website">
<meta property="og:site_name" content="AlmaZen">
<meta property="og:title" content="AlmaZen — ERP de inventario, ventas y facturación electrónica SUNAT">
<meta property="og:description" content="ERP multiempresa para PYMEs de Perú: inventario multi-almacén, punto de venta, cotizaciones, créditos, caja y facturación electrónica SUNAT.">
<meta property="og:url" content="https://almazenapp.djasoft.net.pe/">
<meta property="og:image" content="https://danielmoranv.github.io/og/almazen.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="AlmaZen — ERP multiempresa con facturación electrónica SUNAT">
<meta property="og:locale" content="es_PE">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://danielmoranv.github.io/og/almazen.png">
```

AlmaZen ya tiene un `<title>` y una `description` buenos: **no los toques**, solo
añade lo de arriba.

### MozaicoPro — React + Vite

En `index.html` de la raíz del proyecto (el que Vite usa como plantilla),
dentro de `<head>`:

```html
<meta name="description" content="Gestión de restaurantes en tiempo real: salón, cocina y caja sobre el mismo estado de comanda, sincronizados por WebSockets.">

<meta property="og:type" content="website">
<meta property="og:site_name" content="MozaicoPro">
<meta property="og:title" content="MozaicoPro — gestión de restaurantes en tiempo real">
<meta property="og:description" content="Salón, cocina y caja sobre el mismo estado de comanda, sincronizados por WebSockets.">
<meta property="og:url" content="https://mozaicopro.djasoft.net.pe/">
<meta property="og:image" content="https://danielmoranv.github.io/og/mozaico.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="MozaicoPro — gestión de restaurantes en tiempo real">
<meta property="og:locale" content="es_PE">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://danielmoranv.github.io/og/mozaico.png">
```

**Ojo con la SPA:** las etiquetas van en el `index.html` **estático**, no
inyectadas por React al montar. Los rastreadores de LinkedIn y WhatsApp **no
ejecutan JavaScript**: leen el HTML tal como sale del servidor. Poner esto con
`react-helmet` no funciona para las vistas previas.

Falta además una `description`, que ahora mismo no tiene ninguna.

### EasyPay — SPA sobre NestJS

En el `index.html` que sirve la aplicación, dentro de `<head>`:

```html
<meta name="description" content="Gestión de personal y planillas: registro de trabajadores, control de asistencia, horarios y turnos, y liquidación de planilla con sus reportes.">

<meta property="og:type" content="website">
<meta property="og:site_name" content="EasyPay">
<meta property="og:title" content="EasyPay — personal, asistencia y planillas">
<meta property="og:description" content="Asistencia, horarios y cálculo de planillas, con sus reportes.">
<meta property="og:url" content="https://easypay.djasoft.net.pe/">
<meta property="og:image" content="https://danielmoranv.github.io/og/easypay.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="EasyPay — personal, asistencia y planillas">
<meta property="og:locale" content="es_PE">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://danielmoranv.github.io/og/easypay.png">
```

Mismo aviso que MozaicoPro: en el HTML estático, no por JavaScript.

---

## Cómo comprobar que funcionó

```sh
# Debe listar las etiquetas og:. Si sale vacio, no se desplego o va por JS.
curl -s https://almazenapp.djasoft.net.pe/ | grep -o '<meta property="og:[^>]*>'
```

Y después, en cada plataforma:

- **LinkedIn** — <https://www.linkedin.com/post-inspector/>. Obligatorio si ya
  compartiste el enlace antes: LinkedIn **cachea la vista previa** y seguirá
  enseñando la vieja hasta que fuerces el refresco ahí.
- **WhatsApp, Slack y X** se refrescan solos en unas horas.

---

## Detalle pendiente de decidir

**`Mozaico` o `MozaicoPro`.** El producto se anuncia como *MozaicoPro*, el
portafolio y el CV lo llaman *Mozaico*. La tarjeta generada usa **MozaicoPro**,
que es como se llama a sí mismo. Conviene unificar los tres canales; si el
nombre bueno es *Mozaico*, se cambia en `scripts/gen-og.py` y se regenera.
