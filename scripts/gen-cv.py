# -*- coding: utf-8 -*-
"""
Genera el CV en PDF, en los dos idiomas, con la tipografia y la paleta del
sitio: el CV y el portafolio tienen que verse como una sola cosa.

    python scripts/gen-cv.py     ->  public/cv.pdf  y  public/cv-es.pdf

COMO. Se compone un HTML con las fuentes incrustadas en base64 y se imprime
con Chrome en modo headless. Sin LaTeX, sin Word y sin dependencias de
Python: las mismas tres familias que el sitio, asi que el PDF que descarga un
reclutador y la pagina que acaba de leer son reconociblemente lo mismo.

DECISIONES DE CONTENIDO, heredadas del portafolio y no negociables aqui:

- La experiencia de DESARROLLO empieza en noviembre de 2022. Lo anterior
  -soporte tecnico, redes, logistica- va en una linea aparte y etiquetado
  como lo que fue. Contarlo como experiencia de programacion es inflar la
  cifra, y un entrevistador lo desmonta en una pregunta.
- La clinica SI se nombra. Nada mas de dentro: ni siglas internas, ni
  dominios, ni nombres de repositorio.
- El chatbot del call center NO lleva enlace: su repositorio es privado.
- Fuera la certificacion de Gemini para K-12: es un programa para profesores
  de primaria y secundaria, y al lado de ocho sistemas en produccion resta.
"""
import base64
import subprocess
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
FUENTES = RAIZ / "public" / "fonts"
SALIDA = RAIZ / "public"
TEMP = RAIZ / "scripts" / "_cv_tmp"

CHROME = Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe")

# TELEFONO va en None a proposito. Este repositorio es publico y el PDF se
# sirve desde el sitio, asi que un numero aqui queda en una URL fija y
# rastreable, indexable y facil de raspar. El correo si va: ya estaba publico
# en el perfil y es el canal que se quiere.
#
# Para una copia con telefono, destinada a enviarse directamente en una
# candidatura: poner el numero aqui, ejecutar el script, guardar los PDF
# FUERA del repositorio y volver a dejarlo en None antes de commitear.
TELEFONO = None


def fuente_b64(nombre):
    return base64.b64encode((FUENTES / nombre).read_bytes()).decode("ascii")


# --------------------------------------------------------------- contenido

PRODUCTOS = [
    ("AlmaZen", "propio", "ERP multiempresa: inventario, compras, ventas, POS, facturación SUNAT y agente de IA",
     "ERP: inventory, purchasing, sales, POS, SUNAT e-invoicing, AI agent",
     "Laravel · Livewire · PostgreSQL · Gemini", "almazenapp.djasoft.net.pe"),
    ("Mozaico", "propio", "Gestión de restaurantes con salón y cocina sincronizados por WebSockets",
     "Restaurant management, floor and kitchen synced over WebSockets",
     "Go · Gin · sqlx · React 19 · PostgreSQL", "mozaicopro.djasoft.net.pe"),
    ("EasyPay", "propio", "Personal, asistencia, horarios y cálculo de planillas",
     "Staff, attendance, scheduling and payroll runs",
     "TypeScript · NestJS", "easypay.djasoft.net.pe"),
    ("Agenda EH", "propio", "Matriz de Eisenhower con sincronización bidireccional con Google Calendar",
     "Eisenhower matrix with two-way Google Calendar sync",
     "Vue 3 · Firestore · OAuth 2.0", "agenda-eh.web.app"),
    ("Master Color", "cliente", "Comercio electrónico, gestión de pedidos y app de soporte en campo",
     "E-commerce, order management and a field-support app",
     "Laravel · Vue 3 · Flutter · AWS S3", "mastercolor.net.pe"),
    ("Otto Tonsmann", "cliente", "Caja, comprobantes y padrón de alumnos con acceso por roles y auditoría",
     "Cash desk, receipts and student registry with RBAC and audit trail",
     "Vue 3 · Firebase", "otto-tonsmann.web.app"),
    ("CONERI", "cliente", "Catálogo con carrito de cotización y panel de administración",
     "Catalog with a quote cart and an admin panel",
     "Firebase · Cloud Functions · Cloudflare Pages", "coneri.pe"),
    ("SURGIMED", "cliente", "Sitio institucional con despliegue continuo desde el repositorio",
     "Corporate site with continuous deployment from the repository",
     "Firebase Hosting · GitHub Actions", "surgimed-pe.web.app"),
]

LOGROS = {
    "es": [
        ("Plataforma de datos y migración",
         "Motor DBF propio en Python que lee y <b>escribe</b> las tablas FoxPro a nivel de byte con bloqueo por "
         "rangos, de modo que la aplicación de los noventa sigue abierta en cada escritorio y no se entera. "
         "Expuesto como servicio con FastAPI: migraciones por rango de fechas como trabajos asíncronos "
         "consultables, planificador gobernable en caliente y endpoints de analítica. "
         "<b>Más de 500.000 registros históricos a PostgreSQL sin un solo día de cierre</b>, y unos 2.000 diarios "
         "por el pipeline automatizado."),
        ("Intranet clínica",
         "API central en Laravel 12 que orquesta admisiones, historias, recursos humanos y soporte informático, "
         "con eventos en tiempo real por WebSockets para que las pantallas de admisión no se desincronicen. "
         "Estampa datos y firmas sobre plantillas PDF existentes. Cliente SPA en Vue 3 con calendario de turnos, "
         "lectura de códigos de barras desde la cámara del navegador y exportación de PDF y Excel en el cliente."),
        ("Gestión de seguros médicos",
         "Ciclo completo del seguro —admisión, historia, facturación, auditoría médica y liquidación— con acceso "
         "por roles que separa auditores, facturadores y administración. Notificaciones en vivo por WebSockets e "
         "importación y exportación masiva en Excel. Laravel 11, Vue 3 y despliegue con Docker."),
        ("Chatbot con IA para el call center <i>(en desarrollo)</i>",
         "Asistente conversacional para descargar de llamadas repetidas las líneas de la clínica. "
         "Python en el servidor, cliente en Vue, empaquetado en Docker."),
        ("Infraestructura y continuidad",
         "Administración de PostgreSQL y MySQL, respaldos automatizados y servidores Linux. Acceso remoto seguro "
         "a los sistemas internos mediante Docker Compose y túneles de Cloudflare, sin exponer puertos."),
    ],
    "en": [
        ("Data platform and migration",
         "A DBF engine of my own in Python that reads and <b>writes</b> FoxPro tables at byte level with "
         "byte-range locking, so the 1990s application stays open on every desk and never notices. Exposed as a "
         "FastAPI service: migrations by date range as asynchronous jobs you can follow, a scheduler that starts "
         "and stops while the system is up, and analytics endpoints. "
         "<b>Over 500,000 historical records into PostgreSQL with zero days of downtime</b>, and around 2,000 a "
         "day through the automated pipeline."),
        ("Clinical intranet",
         "A central Laravel 12 API orchestrating admissions, records, human resources and IT support, with "
         "real-time events over WebSockets so admission screens stay in sync. It stamps data and signatures onto "
         "existing PDF templates. Vue 3 single-page client with a shift calendar, barcode reading from the "
         "browser camera, and PDF and Excel export done on the client."),
        ("Medical insurance management",
         "The full insurance cycle — admission, clinical record, billing, medical audit and settlement — with "
         "role-based access separating auditors, billers and administration. Live notifications over WebSockets "
         "and bulk Excel import and export. Laravel 11, Vue 3, deployed with Docker."),
        ("AI chatbot for the call centre <i>(in development)</i>",
         "A conversational assistant to take repeated calls off the clinic's phone lines. Python on the server, "
         "a Vue client, packaged in Docker."),
        ("Infrastructure and continuity",
         "PostgreSQL and MySQL administration, automated backups and Linux servers. Secure remote access to "
         "internal systems through Docker Compose and Cloudflare Tunnels, without exposing ports."),
    ],
}

CASOS = [
    ("foxpro-dbf", "Escribir en tablas FoxPro que siguen abiertas",
     "Writing to FoxPro tables that are still open"),
    ("ia-en-producto", "Un agente dentro del ERP, sin entregarle las llaves",
     "An agent inside the ERP, without handing it the keys"),
    ("tiempo-real-sin-orm", "Un backend de restaurante sin ORM",
     "A restaurant backend without an ORM"),
]

OPEN_SOURCE = [
    ("py-foxpro-engine", "Python · MIT",
     "Lee y escribe tablas FoxPro (.dbf) a nivel de byte, con bloqueo por rangos. Sin dependencias.",
     "Reads and writes FoxPro (.dbf) tables at byte level with byte-range locking. No dependencies."),
    ("sunat-comprobantes", "Packagist · MIT",
     "Utilidades de facturación electrónica para SUNAT, publicadas como djasoft/sunat-comprobantes.",
     "Peruvian electronic invoicing (SUNAT) utilities, published as djasoft/sunat-comprobantes."),
    ("nomenclador", "Python · MIT",
     "Renombra facturas PDF en masa, con OCR de reserva y la nomenclatura de cada aseguradora.",
     "Bulk-renames PDF invoices, with OCR fallback and each insurer's naming scheme."),
    ("almazen-api · almazen_frontend", "Laravel · Vue 3",
     "La versión desacoplada de AlmaZen, publicada entera. PolyForm Noncommercial.",
     "The decoupled version of AlmaZen, published in full. PolyForm Noncommercial."),
]

# (etiqueta_es, etiqueta_en, valor_es, valor_en). Casi todo son nombres de
# tecnologia y no se traducen; lo que si cambia va escrito dos veces.
STACK = [
    ("Backend", "Backend",
     "Go · Gin · sqlx · PHP · Laravel · Livewire · TypeScript · NestJS · Python · FastAPI",
     "Go · Gin · sqlx · PHP · Laravel · Livewire · TypeScript · NestJS · Python · FastAPI"),
    ("Frontend", "Frontend",
     "Vue 3 · PrimeVue · Pinia · React 19 · Livewire · Astro · TailwindCSS",
     "Vue 3 · PrimeVue · Pinia · React 19 · Livewire · Astro · TailwindCSS"),
    ("Datos", "Data",
     "PostgreSQL · PL/pgSQL · MySQL · Redis · Firestore · SQLAlchemy · Eloquent · FoxPro · DBF · ETL",
     "PostgreSQL · PL/pgSQL · MySQL · Redis · Firestore · SQLAlchemy · Eloquent · FoxPro · DBF · ETL"),
    ("Móvil", "Mobile",
     "Flutter · Dart · SQLite (Drift) · C# (escritorio)",
     "Flutter · Dart · SQLite (Drift) · C# (desktop)"),
    ("Infraestructura", "Infrastructure",
     "Docker · Linux · Nginx · GitHub Actions · Cloudflare (Pages, Tunnels) · Firebase · AWS (EC2, S3)",
     "Docker · Linux · Nginx · GitHub Actions · Cloudflare (Pages, Tunnels) · Firebase · AWS (EC2, S3)"),
    ("IA", "AI",
     "Function calling · RBAC por herramienta · Gemini · Ollama · OpenRouter",
     "Function calling · per-tool RBAC · Gemini · Ollama · OpenRouter"),
]

T = {
    "es": {
        "lang": "es",
        "rol": "Desarrollador full stack e ingeniero de datos",
        "ubic": "Piura, Perú · UTC−5 · disponible en remoto",
        "perfil_t": "Perfil",
        "perfil": (
            "Construyo software de gestión que las empresas usan todos los días, y me especializo en la parte "
            "incómoda: <b>modernizar sistemas que no se pueden apagar</b>. Ocho productos en producción, cuatro "
            "míos vendidos por suscripción y cuatro construidos para clientes que pagaron por ellos. Antes de "
            "programar a tiempo completo pasé seis años en soporte técnico e infraestructura, que es la razón por "
            "la que sé cómo se rompen los sistemas en producción: los sostuve antes de construirlos."
        ),
        "exp_t": "Experiencia",
        "puesto": "Desarrollador backend y analista de sistemas (full stack)",
        "empresa": "Clínica Santa Rosa — Sullana, Piura",
        "periodo": "noviembre 2022 – actualidad",
        "antes_t": "Antes de 2022 · soporte técnico e infraestructura",
        "antes": (
            "DANITEC, técnico de soporte (2020–2023) · CONERI E.I.R.L., subdirector de logística (2017–2020) · "
            "ECOEVEC S.A.C., especialista en TI (2017) · Municipalidad Distrital de Chalaco, soporte técnico "
            "(2016). Redes LAN/WLAN/WAN, mantenimiento de equipos y capacitación a usuarios."
        ),
        "prod_t": "Productos en producción",
        "prod_e": "Todos con URL viva. Los cuatro primeros son producto propio de suscripción; los cuatro siguientes, encargo pagado.",
        "casos_t": "Casos de estudio",
        "casos_e": "Escritos con la decisión y la alternativa descartada, no solo con el resultado:",
        "os_t": "Código abierto",
        "stack_t": "Stack",
        "edu_t": "Formación",
        # El titulo que SE TIENE es el de tecnico. La ingenieria esta en curso y
        # se dice asi: un CV que da por obtenido un grado que no lo esta se cae
        # en la primera verificacion, y no hace falta — tecnico titulado mas
        # bootcamp mas tres anos de produccion ya sostiene el perfil.
        "edu": [
            ("Universidad César Vallejo", "Ingeniería de Sistemas", "en curso"),
            ("Silabuz", "Bootcamp de desarrollo backend", "2022 – 2023"),
            ("I.E.S.T.P. Juan José Farfán Céspedes",
             "Técnico titulado en Computación e Informática", "2013 – 2015"),
        ],
        "cert_t": "Certificaciones e idiomas",
        "cert": "Laravel · Vue.js · Node.js — verificadas por Talently",
        "idiomas": "Español (nativo) · Inglés (profesional)",
        "propio": "propio",
        "cliente": "cliente",
    },
    "en": {
        "lang": "en",
        "rol": "Full Stack Developer & Data Engineer",
        "ubic": "Piura, Peru · UTC−5 · available remotely",
        "perfil_t": "Profile",
        "perfil": (
            "I build the business software companies run on every day, and I specialise in the uncomfortable "
            "part: <b>modernising systems that cannot be switched off</b>. Eight products in production, four of "
            "them mine and sold by subscription, four built for clients who paid for them. Before programming "
            "full time I spent six years in technical support and infrastructure, which is why I know how "
            "production systems break: I kept them running before I started building them."
        ),
        "exp_t": "Experience",
        "puesto": "Backend developer & systems analyst (full stack)",
        "empresa": "Clínica Santa Rosa — Sullana, Piura, Peru",
        "periodo": "November 2022 – present",
        "antes_t": "Before 2022 · technical support and infrastructure",
        "antes": (
            "DANITEC, desktop support technician (2020–2023) · CONERI E.I.R.L., logistics deputy manager "
            "(2017–2020) · ECOEVEC S.A.C., IT specialist (2017) · Chalaco District Council, technical support "
            "(2016). LAN/WLAN/WAN networks, hardware maintenance and user training."
        ),
        "prod_t": "Products in production",
        "prod_e": "All with a live URL. The first four are my own subscription products; the next four were commissioned and paid for.",
        "casos_t": "Case studies",
        "casos_e": "Written with the decision and the discarded alternative, not just the outcome:",
        "os_t": "Open source",
        "stack_t": "Stack",
        "edu_t": "Education",
        "edu": [
            ("Universidad César Vallejo", "BSc Systems Engineering", "in progress"),
            ("Silabuz", "Backend development bootcamp", "2022 – 2023"),
            ("I.E.S.T.P. Juan José Farfán Céspedes",
             "Higher Technician in Computing and IT — qualified", "2013 – 2015"),
        ],
        "cert_t": "Certifications and languages",
        "cert": "Laravel · Vue.js · Node.js — verified by Talently",
        "idiomas": "Spanish (native) · English (professional working)",
        "propio": "own",
        "cliente": "client",
    },
}

CIFRAS = {
    "es": [("500.000+", "registros migrados<br>sin parar la operación"), ("8", "productos<br>en producción"),
           ("50+", "usuarios diarios en<br>sistemas que mantengo"), ("20+", "módulos de negocio<br>en servicio")],
    "en": [("500,000+", "records migrated with<br>no downtime"), ("8", "products<br>in production"),
           ("50+", "daily users on systems<br>I maintain"), ("20+", "business modules<br>in service")],
}


def html(idioma):
    s = T[idioma]
    es = idioma == "es"

    cifras = "".join(
        f'<div><div class="cifra">{v}</div><div class="cifra-p">{q}</div></div>'
        for v, q in CIFRAS[idioma]
    )
    logros = "".join(
        f'<div class="logro"><div class="logro-t">{t}</div><p>{c}</p></div>'
        for t, c in LOGROS[idioma]
    )
    productos = "".join(
        f'<tr><td class="p-n">{nombre}'
        f'<span class="p-m">{s["propio"] if modelo == "propio" else s["cliente"]}</span></td>'
        f'<td>{d_es if es else d_en}</td>'
        f'<td class="p-s">{stack}</td><td class="p-u">{url}</td></tr>'
        for nombre, modelo, d_es, d_en, stack, url in PRODUCTOS
    )
    segmento = "es/casos" if es else "case-studies"
    casos = "".join(
        f'<li><b>{t_es if es else t_en}</b> '
        f'<span class="url">danielmoranv.github.io/{segmento}/{slug}</span></li>'
        for slug, t_es, t_en in CASOS
    )
    opensource = "".join(
        f'<div class="os"><div><b>{nombre}</b> <span class="os-l">{lic}</span></div>'
        f'<p>{d_es if es else d_en}</p></div>'
        for nombre, lic, d_es, d_en in OPEN_SOURCE
    )
    stack = "".join(
        f'<tr><td class="st-g">{g_es if es else g_en}</td><td>{v_es if es else v_en}</td></tr>'
        for g_es, g_en, v_es, v_en in STACK
    )
    edu = "".join(
        f'<tr><td class="ed-c">{c}</td><td>{t}</td><td class="ed-a">{a}</td></tr>' for c, t, a in s["edu"]
    )
    tel = f' · {TELEFONO}' if TELEFONO else ''

    return f"""<!doctype html>
<html lang="{s['lang']}"><head><meta charset="utf-8"><title>CV — Daniel Morán Vílchez</title>
<style>
@font-face {{ font-family:'Newsreader'; src:url(data:font/woff2;base64,{fuente_b64('newsreader.woff2')}) format('woff2'); font-weight:300 400; }}
@font-face {{ font-family:'Public Sans'; src:url(data:font/woff2;base64,{fuente_b64('public-sans.woff2')}) format('woff2'); font-weight:400 600; }}
@font-face {{ font-family:'Martian Mono'; src:url(data:font/woff2;base64,{fuente_b64('martian-mono.woff2')}) format('woff2'); font-weight:400 500; }}

@page {{ size: A4; margin: 13mm 14mm 12mm; }}
* {{ box-sizing: border-box; }}
body {{ margin:0; font-family:'Public Sans',sans-serif; font-size:8.6pt; line-height:1.5;
        color:#14171a; -webkit-print-color-adjust:exact; print-color-adjust:exact; }}
b {{ font-weight:600; }}
.mono {{ font-family:'Martian Mono',monospace; }}

h1 {{ font-family:'Newsreader',serif; font-weight:300; font-size:24pt; line-height:1.05;
      letter-spacing:-.02em; margin:0 0 2mm; }}
.rol {{ font-family:'Martian Mono',monospace; font-size:7.4pt; text-transform:uppercase;
        letter-spacing:.02em; color:#2f6b58; margin-bottom:1.5mm; }}
.contacto {{ font-size:8.2pt; color:#545b62; }}
.contacto a {{ color:#2f6b58; text-decoration:none; }}
header {{ padding-bottom:3mm; border-bottom:1px solid #dfe3e2; margin-bottom:3.5mm; }}

h2 {{ font-family:'Newsreader',serif; font-weight:400; font-size:12.5pt; margin:0 0 2mm;
      letter-spacing:-.01em; display:flex; align-items:baseline; gap:3mm; }}
h2::after {{ content:''; flex:1; height:1px; background:#dfe3e2; }}
section {{ margin-bottom:4mm; }}
/* Que nada se parta por la mitad al cambiar de pagina, y que ningun
   titulo se quede solo al pie. */
h2 {{ break-after: avoid; }}
tr, .logro, .os, .antes, .cifras {{ break-inside: avoid; }}
p {{ margin:0 0 1.5mm; }}

.cifras {{ display:grid; grid-template-columns:repeat(4,1fr); gap:4mm; margin:0 0 3.5mm;
           padding:2.5mm 0; background:#f2f4f3; border-top:1px solid #dfe3e2; border-bottom:1px solid #dfe3e2; }}
.cifras > div {{ padding:0 3mm; }}
.cifra {{ font-family:'Newsreader',serif; font-size:15pt; line-height:1; color:#2f6b58;
          font-variant-numeric:tabular-nums; }}
.cifra-p {{ font-family:'Martian Mono',monospace; font-size:5.9pt; text-transform:uppercase;
            line-height:1.5; color:#545b62; margin-top:1mm; }}

.puesto {{ display:flex; justify-content:space-between; align-items:baseline; gap:4mm; }}
.puesto b {{ font-size:9.6pt; }}
.empresa {{ font-family:'Martian Mono',monospace; font-size:6.4pt; text-transform:uppercase;
            color:#545b62; margin:.6mm 0 2mm; }}
.per {{ font-family:'Martian Mono',monospace; font-size:6.6pt; color:#545b62; white-space:nowrap; }}
.logro {{ margin-bottom:1.8mm; padding-left:3.5mm; border-left:1px solid #dfe3e2; }}
.logro-t {{ font-weight:600; font-size:8.8pt; margin-bottom:.3mm; }}
.logro p {{ color:#3f464d; margin:0; }}
.antes {{ margin-top:2.5mm; padding-top:2mm; border-top:1px solid #dfe3e2; }}
.antes-t {{ font-family:'Martian Mono',monospace; font-size:6.4pt; text-transform:uppercase;
            color:#545b62; margin-bottom:.8mm; }}
.antes p {{ color:#545b62; margin:0; }}

table {{ width:100%; border-collapse:collapse; }}
td {{ padding:1.1mm 0; vertical-align:top; border-bottom:1px solid #eceeed; }}
td + td {{ padding-left:3.5mm; }}
.entradilla {{ color:#545b62; margin-bottom:1.5mm; }}
.p-n {{ font-weight:600; width:31mm; }}
.p-m {{ display:block; font-family:'Martian Mono',monospace; font-size:5.7pt;
        text-transform:uppercase; color:#545b62; font-weight:400; }}
.p-s {{ font-family:'Martian Mono',monospace; font-size:6pt; color:#545b62; width:44mm; }}
.p-u {{ font-family:'Martian Mono',monospace; font-size:6pt; color:#2f6b58; width:37mm; }}

ul {{ margin:0; padding-left:4mm; }}
li {{ margin-bottom:.8mm; }}
.url {{ font-family:'Martian Mono',monospace; font-size:6pt; color:#2f6b58; }}

.oss {{ display:grid; grid-template-columns:1fr 1fr; gap:1.5mm 5mm; }}
.os p {{ margin:.3mm 0 0; color:#545b62; font-size:8.2pt; }}
.os-l {{ font-family:'Martian Mono',monospace; font-size:5.8pt; text-transform:uppercase; color:#545b62; }}

.st-g {{ font-family:'Martian Mono',monospace; font-size:6.2pt; text-transform:uppercase;
         color:#545b62; width:26mm; }}
.ed-c {{ font-weight:600; width:58mm; }}
.ed-a {{ font-family:'Martian Mono',monospace; font-size:6.4pt; color:#545b62;
         width:26mm; text-align:right; }}
.pie {{ font-family:'Martian Mono',monospace; font-size:6pt; color:#545b62; }}
</style></head>
<body>

<header>
  <h1>Daniel Morán Vílchez</h1>
  <div class="rol">{s['rol']}</div>
  <div class="contacto">{s['ubic']}<br>
    <a href="mailto:skaan.dmv@gmail.com">skaan.dmv@gmail.com</a>{tel} ·
    <a href="https://danielmoranv.github.io">danielmoranv.github.io</a> ·
    <a href="https://github.com/DanielMoranV">github.com/DanielMoranV</a> ·
    <a href="https://linkedin.com/in/danielmoranv">linkedin.com/in/danielmoranv</a>
  </div>
</header>

<section><h2>{s['perfil_t']}</h2><p>{s['perfil']}</p></section>

<div class="cifras">{cifras}</div>

<section>
  <h2>{s['exp_t']}</h2>
  <div class="puesto"><b>{s['puesto']}</b><span class="per">{s['periodo']}</span></div>
  <div class="empresa">{s['empresa']}</div>
  {logros}
  <div class="antes"><div class="antes-t">{s['antes_t']}</div><p>{s['antes']}</p></div>
</section>

<section>
  <h2>{s['prod_t']}</h2>
  <p class="entradilla">{s['prod_e']}</p>
  <table>{productos}</table>
</section>

<section>
  <h2>{s['casos_t']}</h2>
  <p class="entradilla">{s['casos_e']}</p>
  <ul>{casos}</ul>
</section>

<section><h2>{s['os_t']}</h2><div class="oss">{opensource}</div></section>

<section><h2>{s['stack_t']}</h2><table>{stack}</table></section>

<section><h2>{s['edu_t']}</h2><table>{edu}</table></section>

<section>
  <h2>{s['cert_t']}</h2>
  <p>{s['cert']}<br><span class="pie">{s['idiomas']}</span></p>
</section>

</body></html>"""


def main():
    if not CHROME.exists():
        sys.exit(f"No se encontro Chrome en {CHROME}")
    TEMP.mkdir(parents=True, exist_ok=True)

    for idioma, nombre in (("en", "cv.pdf"), ("es", "cv-es.pdf")):
        origen = TEMP / f"cv-{idioma}.html"
        origen.write_text(html(idioma), encoding="utf-8")
        destino = SALIDA / nombre
        subprocess.run(
            [
                str(CHROME), "--headless", "--disable-gpu", "--no-sandbox",
                "--no-pdf-header-footer", "--run-all-compositor-stages-before-draw",
                "--virtual-time-budget=6000",
                f"--print-to-pdf={destino}", origen.as_uri(),
            ],
            check=True, capture_output=True,
        )
        print(f"  {nombre:10s} {destino.stat().st_size / 1024:6.1f} KB")

    for f in TEMP.glob("*"):
        f.unlink()
    TEMP.rmdir()


if __name__ == "__main__":
    main()
