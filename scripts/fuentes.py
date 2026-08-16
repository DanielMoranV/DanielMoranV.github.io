# -*- coding: utf-8 -*-
"""
Descarga las tres familias de la direccion 1b y las deja en public/fonts/.

Se ejecuta UNA VEZ. El sitio no hace ninguna peticion a terceros: las fuentes
se sirven desde el propio dominio, que es un requisito del brief, no un gusto.

Dos decisiones que ahorran 250 KB:

1. Solo el subconjunto `latin`. Cubre el castellano entero (tildes y enye
   viven en U+00C0-00FF) y evita bajar cirilico y griego que nadie lee aqui.
2. Deduplicado por contenido. Google devuelve un @font-face por peso, pero
   para estas tres familias el woff2 es el MISMO fichero variable en todos:
   pedir 300 y 400 por separado bajaba dos veces lo mismo. Se guarda una vez
   y se declara con rango de peso (`font-weight: 300 400`), que es lo que la
   fuente variable sabe hacer de todas formas.
"""
import hashlib
import re
import urllib.request
from pathlib import Path

RAIZ = Path(r"C:\Code\perfil-tecnico")
DEST = RAIZ / "public" / "fonts"
DEST.mkdir(parents=True, exist_ok=True)
for viejo in DEST.glob("*.woff2"):
    viejo.unlink()

CSS = (
    "https://fonts.googleapis.com/css2"
    "?family=Newsreader:wght@300;400"      # titulares y cifras
    "&family=Public+Sans:wght@400;600"     # cuerpo
    "&family=Martian+Mono:wght@400;500"    # sellos, metadatos
    "&display=swap"
)

# Con UA de Chrome, Google sirve woff2. Con el UA por defecto, sirve ttf.
UA = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}


def bajar(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


css = bajar(CSS).decode("utf-8")

# Cada @font-face lleva su subconjunto en un comentario justo antes.
partes = re.split(r"/\*\s*([\w-]+)\s*\*/", css)
caras = []
for i in range(1, len(partes), 2):
    if partes[i] != "latin":
        continue
    cuerpo = partes[i + 1]
    caras.append(
        {
            "fam": re.search(r"font-family:\s*'([^']+)'", cuerpo).group(1),
            "peso": int(re.search(r"font-weight:\s*(\d+)", cuerpo).group(1)),
            "rango": re.search(r"unicode-range:\s*([^;]+);", cuerpo).group(1).strip(),
            "url": re.search(r"url\((https://[^)]+\.woff2)\)", cuerpo).group(1),
        }
    )

# Agrupar por (familia, hash del fichero): un woff2, una regla.
grupos = {}
for c in caras:
    datos = bajar(c["url"])
    clave = (c["fam"], hashlib.sha1(datos).hexdigest())
    g = grupos.setdefault(
        clave, {"fam": c["fam"], "datos": datos, "rango": c["rango"], "pesos": []}
    )
    g["pesos"].append(c["peso"])

reglas = []
for g in grupos.values():
    lo, hi = min(g["pesos"]), max(g["pesos"])
    nombre = f"{g['fam'].lower().replace(' ', '-')}.woff2"
    (DEST / nombre).write_bytes(g["datos"])
    peso = f"{lo}" if lo == hi else f"{lo} {hi}"
    print(f"  {nombre:22s} {len(g['datos']) / 1024:6.1f} KB   font-weight: {peso}")
    reglas.append(
        "@font-face {\n"
        f"  font-family: '{g['fam']}';\n"
        "  font-style: normal;\n"
        f"  font-weight: {peso};\n"
        "  font-display: swap;\n"
        f"  src: url('/fonts/{nombre}') format('woff2');\n"
        f"  unicode-range: {g['rango']};\n"
        "}"
    )

(RAIZ / "src" / "styles" / "_fuentes.css").write_text(
    "/*\n"
    "  GENERADO por scripts/fuentes.py. No editar a mano.\n"
    "\n"
    "  Subconjunto latino, servido desde el propio dominio: el sitio no hace\n"
    "  ninguna peticion a terceros, y eso es una caracteristica del producto.\n"
    "  Un fichero por familia, con rango de peso: las tres son variables y\n"
    "  Google devolvia el mismo woff2 una vez por cada peso pedido.\n"
    "*/\n\n" + "\n\n".join(reglas) + "\n",
    encoding="utf-8",
)

total = sum(f.stat().st_size for f in DEST.glob("*.woff2")) / 1024
print(f"\n  {len(reglas)} ficheros, {total:.1f} KB en total")
