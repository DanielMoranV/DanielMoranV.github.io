# -*- coding: utf-8 -*-
"""
Genera las tarjetas Open Graph y los iconos.

    python scripts/gen-og.py

Se ejecuta a mano y sus salidas se commitean en public/: un PNG que no cambia
no merece una dependencia de build.

QUE PRODUCE
- public/og.png y og-es.png       -> el perfil, una por idioma
- public/og/<producto>.png        -> una por producto propio
- public/favicon.svg, apple-touch-icon.png

POR QUE LOS PRODUCTOS TAMBIEN. almazenapp, mozaicopro y easypay no tienen
ninguna etiqueta og:, asi que compartir sus enlaces —en LinkedIn, WhatsApp,
Slack o un correo— da una tarjeta vacia. Las imagenes se sirven desde este
sitio, que ya es estatico y publico, para que cada producto solo tenga que
anadir cuatro lineas de <meta> y ningun despliegue de assets.

TIPOGRAFIA. Las mismas familias que el sitio, descargadas en TTF porque
Pillow no lee woff2. Se cachean fuera del repositorio: son un detalle de
generacion, no una dependencia del sitio.
"""
import re
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

RAIZ = Path(__file__).resolve().parent.parent
SALIDA = RAIZ / "public"
(SALIDA / "og").mkdir(parents=True, exist_ok=True)
CACHE = Path.home() / ".cache" / "djasoft-fuentes-ttf"
CACHE.mkdir(parents=True, exist_ok=True)

# Paleta oscura ACTUAL del sitio (src/styles/global.css). La version anterior
# de este script llevaba la paleta azul del diseno viejo: una tarjeta que no
# se parece al sitio al que lleva es peor que no tener tarjeta.
FONDO = "#0d0f10"
TEXTO = "#eceeed"
SUAVE = "#98a0a0"
ACENTO = "#6fc0a4"
BORDE = "#23292a"
ACENTO_SOLIDO = "#2f6b58"


def ttf(familia, peso):
    """Descarga (y cachea) el TTF de una familia. Pillow no lee woff2."""
    destino = CACHE / f"{familia.replace(' ', '-').lower()}-{peso}.ttf"
    if not destino.exists():
        url = f"https://fonts.googleapis.com/css2?family={familia.replace(' ', '+')}:wght@{peso}"
        # Sin User-Agent moderno, Google devuelve TTF en vez de woff2.
        css = urllib.request.urlopen(url, timeout=60).read().decode()
        enlace = re.search(r"url\((https://[^)]+\.ttf)\)", css).group(1)
        destino.write_bytes(urllib.request.urlopen(enlace, timeout=60).read())
    return destino


SERIF = ttf("Newsreader", 300)
SERIF_M = ttf("Newsreader", 400)
SANS = ttf("Public Sans", 400)
MONO = ttf("Martian Mono", 400)


def f(ruta, tam):
    return ImageFont.truetype(str(ruta), tam)


def tarjeta(destino, sello, titulo, lema, stack, url, serif_titulo=SERIF, tam=76):
    """
    Tarjeta Open Graph, 1200x630 — la proporcion que piden LinkedIn y X.

    Misma reticula en todas: filo de acento arriba, sello en mono, titulo en
    serif, lema, y el pie con stack a la izquierda y dominio a la derecha.
    Puestas juntas se ven como una familia, que es el punto.
    """
    img = Image.new("RGB", (1200, 630), FONDO)
    d = ImageDraw.Draw(img)

    d.rectangle([0, 0, 1200, 6], fill=ACENTO_SOLIDO)
    d.line([80, 516, 1120, 516], fill=BORDE, width=1)

    d.text((80, 150), sello.upper(), font=f(MONO, 17), fill=ACENTO)
    d.text((80, 208), titulo, font=f(serif_titulo, tam), fill=TEXTO)
    d.text((80, 330), lema, font=f(SANS, 31), fill=SUAVE)

    d.text((80, 550), stack, font=f(MONO, 17), fill=SUAVE)
    ancho = d.textlength(url, font=f(MONO, 17))
    d.text((1120 - ancho, 550), url, font=f(MONO, 17), fill=SUAVE)

    img.save(destino, "PNG", optimize=True)
    print(f"  {destino.relative_to(SALIDA)!s:26s} {destino.stat().st_size // 1024:3d} KB")


print("Perfil:")
tarjeta(
    SALIDA / "og.png",
    "Piura, Peru · full stack + data",
    "Daniel Morán Vílchez",
    "I build the software companies run on.",
    "Go · Laravel · Python · TypeScript · PostgreSQL",
    "danielmoranv.github.io",
)
tarjeta(
    SALIDA / "og-es.png",
    "Piura, Perú · full stack + datos",
    "Daniel Morán Vílchez",
    "Construyo el software sobre el que funcionan las empresas.",
    "Go · Laravel · Python · TypeScript · PostgreSQL",
    "danielmoranv.github.io",
)

# El titulo de producto va en serif de 400: a 76 px el peso 300 se afina
# demasiado en una palabra corta.
PRODUCTOS = [
    (
        "almazen",
        "ERP multiempresa · facturación SUNAT",
        "AlmaZen",
        "Inventario, ventas, POS y facturación electrónica.",
        "Laravel · Livewire · PostgreSQL · Gemini",
        "almazenapp.djasoft.net.pe",
    ),
    (
        "mozaico",
        "Gestión de restaurantes · tiempo real",
        "MozaicoPro",
        "Salón y cocina sobre el mismo estado de comanda.",
        "Go · Gin · PostgreSQL · React 19",
        "mozaicopro.djasoft.net.pe",
    ),
    (
        "easypay",
        "Personal, asistencia y planillas",
        "EasyPay",
        "Asistencia, horarios y cálculo de planillas.",
        "TypeScript · NestJS · PostgreSQL",
        "easypay.djasoft.net.pe",
    ),
]

print("Productos:")
for slug, sello, titulo, lema, stack, url in PRODUCTOS:
    tarjeta(SALIDA / "og" / f"{slug}.png", sello, titulo, lema, stack, url,
            serif_titulo=SERIF_M, tam=80)

def banner(destino, sello, titular, evidencia, pie, tam=50):
    """
    Portada de LinkedIn, 1584x396.

    ZONA SEGURA. LinkedIn superpone la foto de perfil abajo a la izquierda y
    recorta los lados en pantallas estrechas, asi que todo el texto vive a
    partir de x=470 y por encima de y=340.

    NO REPITE EL NOMBRE. LinkedIn ya lo pinta justo debajo; una portada que lo
    repite desaprovecha el unico sitio del perfil donde cabe un argumento.

    TRES NIVELES, no cuatro: dominio (sello), propuesta (titular) y evidencia
    (stack + prueba). Mas jerarquia que eso no se lee en un banner.
    """
    img = Image.new("RGB", (1584, 396), FONDO)
    d = ImageDraw.Draw(img)

    d.rectangle([0, 0, 1584, 5], fill=ACENTO_SOLIDO)
    d.line([430, 66, 430, 330], fill=BORDE, width=1)

    d.text((470, 92), sello.upper(), font=f(MONO, 14), fill=ACENTO)
    d.text((470, 134), titular, font=f(SERIF, tam), fill=TEXTO)
    d.text((470, 244), evidencia, font=f(MONO, 15), fill=SUAVE)
    d.line([470, 286, 1500, 286], fill=BORDE, width=1)
    d.text((470, 300), pie, font=f(MONO, 14), fill=SUAVE)

    img.save(destino, "PNG", optimize=True)
    print(f"  {destino.relative_to(SALIDA)!s:30s} {destino.stat().st_size // 1024:3d} KB")


# Tres posicionamientos distintos del mismo perfil, para comparar. El texto
# de cada uno sale de hechos ya verificados en el portafolio y en el CV.
PORTADAS = [
    (
        "a-legacy",
        "Sistemas heredados · datos · Piura, Perú · remoto",
        "Modernizo sistemas que no se pueden apagar.",
        "Go · Laravel · Python/FastAPI · PostgreSQL · Docker",
        "8 productos en producción  ·  danielmoranv.github.io",
        50,
    ),
    (
        "b-salud",
        "Software clínico · ingeniería de datos · dominios regulados",
        "500.000 registros migrados sin cerrar un solo día.",
        "Python · FastAPI · Laravel · PostgreSQL · FoxPro/DBF",
        "Intranet clínica · seguros médicos · SUNAT  ·  danielmoranv.github.io",
        46,
    ),
    (
        "c-producto",
        "ERP multiempresa · facturación SUNAT · IA en producto",
        "Ocho productos en producción. Cuatro son míos.",
        "Go · Laravel · TypeScript · React 19 · PostgreSQL",
        "Vendidos por suscripción y por encargo  ·  danielmoranv.github.io",
        50,
    ),
]

print("Portadas de LinkedIn:")
for slug, sello, titular, evidencia, pie, tam in PORTADAS:
    banner(SALIDA / f"linkedin-{slug}.png", sello, titular, evidencia, pie, tam)

# Icono tactil de iOS: PNG opaco de 180x180. iOS rellena la transparencia de
# negro, asi que el fondo va solido.
print("Iconos:")
ico = Image.new("RGB", (180, 180), ACENTO_SOLIDO)
d = ImageDraw.Draw(ico)
fuente = f(SERIF_M, 118)
caja = d.textbbox((0, 0), "D", font=fuente)
d.text(
    ((180 - (caja[2] - caja[0])) / 2 - caja[0], (180 - (caja[3] - caja[1])) / 2 - caja[1]),
    "D",
    font=fuente,
    fill="#ffffff",
)
ico.save(SALIDA / "apple-touch-icon.png", "PNG", optimize=True)
print(f"  {'apple-touch-icon.png':26s} {(SALIDA / 'apple-touch-icon.png').stat().st_size // 1024:3d} KB")
