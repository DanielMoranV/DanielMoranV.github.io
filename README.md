# DanielMoranV.github.io

Perfil técnico, servido por GitHub Pages en **<https://danielmoranv.github.io/>**.

> GitHub reserva el nombre `<usuario>.github.io`: cualquier repositorio que se llame así se
> publica como el sitio personal del usuario. No es un repositorio normal.

## Qué es esto, y qué no

Este sitio es el **perfil de desarrollador**: arquitectura, decisiones técnicas, stack real y
código publicado. Le habla a quien va a leer código o a contratar ingeniería.

La **marca vendedora** vive aparte, en **<https://djasoft.net.pe>**: los mismos productos
contados para un dueño de empresa, en español, por lo que resuelven y no por cómo están
hechos. Los dos sitios son deliberadamente distintos —en dominio, en idioma por defecto y en
paleta— porque son dos públicos que compran cosas distintas. No se mezclan.

## Estado y plan

**[`docs/ROADMAP.md`](docs/ROADMAP.md)** — qué está hecho, qué falta, las decisiones ya
tomadas y las reglas que costaron un fallo. Empieza por ahí si retomas el proyecto.

## Estructura

Astro estático, bilingüe. Inglés en la raíz (`/`), castellano en `/es/`.

| Ruta | Qué contiene |
|---|---|
| `src/data/casos.ts` | Notas de ingeniería: el trabajo contado por su parte difícil |
| `src/data/trabajo.ts` | Lo que está en producción, con su stack y su enlace vivo |
| `src/data/trayectoria.ts` | El puesto y los sistemas del sector salud |
| `src/data/cifras.ts` | Las cuatro cifras de la banda bajo el hero |
| `src/data/opensource.ts` | Piezas publicadas enteras |
| `src/i18n/ui.ts` | Cadenas de las dos versiones, stack y banderas de contenido |
| `src/styles/global.css` | Tokens, temas y las piezas de la dirección visual |
| `scripts/` | Generadores de fuentes y de las tarjetas OG. Se ejecutan a mano |

**Regla heredada de un fallo real:** las `url` de `src/data/trabajo.ts` deben apuntar al
producto **actual**. Ya pasó que un enlace respondía 200 y servía la versión anterior, y eso
no lo detecta ningún check automático. Esa lista existe también en el repositorio de
djasoft.net.pe: si cambia una URL aquí, cambia allí.

## Desarrollo

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

## Despliegue

Automático con `.github/workflows/deploy.yml` en cada push a `main`.

**Requiere que Pages esté en Settings → Pages → Source: GitHub Actions.** Con el ajuste
anterior (*Deploy from a branch*, `main` / raíz) el workflow corre pero no publica: Pages
seguiría intentando servir el código fuente sin compilar.

## Historial

Entre septiembre de 2022 y agosto de 2026 este repositorio alojó una versión de pruebas de la
web de **CONERI**, que quedó obsoleta —el sitio de CONERI vive en su propio repositorio, en
<https://coneri.pe/>—, y después una página estática de una sola pantalla.
