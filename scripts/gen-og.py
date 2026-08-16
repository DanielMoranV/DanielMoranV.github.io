# -*- coding: utf-8 -*-
"""
Genera los recursos de imagen del perfil tecnico.

Se ejecuta UNA VEZ y sus salidas se commitean en public/. No es parte del
build: un PNG estatico que no cambia no merece una dependencia de build.

Paleta: la del sitio en oscuro (src/styles/global.css), para que la tarjeta
que se ve al compartir el enlace sea reconociblemente el mismo sitio.
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

SALIDA = Path(r"C:\Code\perfil-tecnico\public")
SALIDA.mkdir(parents=True, exist_ok=True)

FONDO = "#0f1115"
TEXTO = "#e8eaed"
SUAVE = "#9aa2b1"
ENLACE = "#6ea8ff"
BORDE = "#262a33"
ACENTO_SOLIDO = "#1c6feb"

F = r"C:\Windows\Fonts"
BOLD = f"{F}\\segoeuib.ttf"
SEMI = f"{F}\\seguisb.ttf"
REG = f"{F}\\segoeui.ttf"
MONO = f"{F}\\consola.ttf"


def fuente(ruta, tam):
    try:
        return ImageFont.truetype(ruta, tam)
    except OSError:
        return ImageFont.truetype(REG, tam)


def tarjeta(destino, rol, lema, stack):
    """Tarjeta Open Graph, 1200x630 (la proporcion que piden LinkedIn y X)."""
    img = Image.new("RGB", (1200, 630), FONDO)
    d = ImageDraw.Draw(img)

    # Filo superior de acento: identifica la tarjeta de un vistazo.
    d.rectangle([0, 0, 1200, 6], fill=ACENTO_SOLIDO)
    # Linea del pie, del mismo gris que los bordes del sitio.
    d.line([80, 520, 1120, 520], fill=BORDE, width=1)

    d.text((80, 168), "Daniel Morán Vílchez", font=fuente(BOLD, 74), fill=TEXTO)
    d.text((80, 272), rol, font=fuente(SEMI, 36), fill=ENLACE)
    d.text((80, 352), lema, font=fuente(REG, 34), fill=SUAVE)

    d.text((80, 552), stack, font=fuente(MONO, 23), fill=SUAVE)
    url = "danielmoranv.github.io"
    ancho = d.textlength(url, font=fuente(MONO, 23))
    d.text((1120 - ancho, 552), url, font=fuente(MONO, 23), fill=SUAVE)

    img.save(destino, "PNG", optimize=True)
    print(f"  {destino.name}  {destino.stat().st_size // 1024} KB")


STACK = "Go  ·  Laravel  ·  Python  ·  TypeScript  ·  PostgreSQL"

print("Tarjetas Open Graph:")
tarjeta(
    SALIDA / "og.png",
    "Full Stack Developer & Data Engineer",
    "I build the software companies run on.",
    STACK,
)
tarjeta(
    SALIDA / "og-es.png",
    "Desarrollador full stack e ingeniero de datos",
    "Construyo el software sobre el que funcionan las empresas.",
    STACK,
)

# Icono tactil de iOS: PNG opaco de 180x180, sin transparencia (iOS la
# rellena de negro y el monograma se pierde).
print("Icono tactil:")
ico = Image.new("RGB", (180, 180), ACENTO_SOLIDO)
d = ImageDraw.Draw(ico)
f = fuente(BOLD, 112)
caja = d.textbbox((0, 0), "D", font=f)
d.text(
    ((180 - (caja[2] - caja[0])) / 2 - caja[0], (180 - (caja[3] - caja[1])) / 2 - caja[1]),
    "D",
    font=f,
    fill="#ffffff",
)
ico.save(SALIDA / "apple-touch-icon.png", "PNG", optimize=True)
print(f"  apple-touch-icon.png  {(SALIDA / 'apple-touch-icon.png').stat().st_size // 1024} KB")
