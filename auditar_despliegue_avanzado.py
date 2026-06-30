
import os
import json
from bs4 import BeautifulSoup

# Mapeo de municipios a sus enlaces Knowledge Graph (mismo que generator.js)
MUNICIPIOS_KG = {
    "Armenia": {
        "sameAs": ["https://es.wikipedia.org/wiki/Armenia_(Quind%C3%ADo)", "https://www.wikidata.org/wiki/Q11078"]
    },
    "Calarca": {
        "sameAs": ["https://es.wikipedia.org/wiki/Calarc%C3%A1", "https://www.wikidata.org/wiki/Q1066231"]
    },
    "Circasia": {
        "sameAs": ["https://es.wikipedia.org/wiki/Circasia", "https://www.wikidata.org/wiki/Q1066261"]
    },
    "Filandia": {
        "sameAs": ["https://es.wikipedia.org/wiki/Filandia", "https://www.wikidata.org/wiki/Q1441183"]
    },
    "La Tebaida": {
        "sameAs": ["https://es.wikipedia.org/wiki/La_Tebaida", "https://www.wikidata.org/wiki/Q16939914"]
    },
    "Montenegro": {
        "sameAs": ["https://es.wikipedia.org/wiki/Montenegro_(Quind%C3%ADo)", "https://www.wikidata.org/wiki/Q1441268"]
    },
    "Quimbaya": {
        "sameAs": ["https://es.wikipedia.org/wiki/Quimbaya_(Quind%C3%ADo)", "https://www.wikidata.org/wiki/Q1441290"]
    },
    "Salento": {
        "sameAs": ["https://es.wikipedia.org/wiki/Salento_(Quind%C3%ADo)", "https://www.wikidata.org/wiki/Q1441118"]
    },
    "Buenavista": {
        "sameAs": ["https://es.wikipedia.org/wiki/Buenavista_(Quind%C3%ADo)", "https://www.wikidata.org/wiki/Q1066220"]
    },
    "Cordoba": {
        "sameAs": ["https://es.wikipedia.org/wiki/C%C3%B3rdoba_(Quind%C3%ADo)", "https://www.wikidata.org/wiki/Q1066265"]
    },
    "Genova": {
        "sameAs": ["https://es.wikipedia.org/wiki/G%C3%A9nova_(Quind%C3%ADo)", "https://www.wikidata.org/wiki/Q1441206"]
    },
    "Pijao": {
        "sameAs": ["https://es.wikipedia.org/wiki/Pijao_(Quind%C3%ADo)", "https://www.wikidata.org/wiki/Q1441297"]
    }
}


import unicodedata

def normalize_municipio_name(name):
    """Normaliza nombres de municipios para búsqueda (sin acentos, minúsculas, sin espacios)."""
    return unicodedata.normalize("NFD", name).encode("ascii", "ignore").decode("utf-8").lower().replace(" ", "")


def get_municipio_from_filename(filename):
    """Extrae el nombre del municipio del nombre del archivo HTML y lo normaliza."""
    parts = filename.split("-en-")
    if len(parts) < 2:
        return None
    municipio_part = parts[1].replace(".html", "").replace("-", " ")
    return normalize_municipio_name(municipio_part)


# Mapeo normalizado para auditoría
MUNICIPIOS_KG_NORMALIZED = {}
for key in MUNICIPIOS_KG:
    normalized_key = normalize_municipio_name(key)
    MUNICIPIOS_KG_NORMALIZED[normalized_key] = MUNICIPIOS_KG[key]


def auditar_archivo(filepath):
    """Audita un solo archivo HTML y devuelve los resultados."""
    resultados = {
        "archivo": os.path.basename(filepath),
        "wikidata": False,
        "speakable": False,
        "wpo": False,
        "errores": []
    }

    try:
        with open(filepath, "r", encoding="utf-8") as f:
            html = f.read()
        soup = BeautifulSoup(html, "html.parser")
    except Exception as e:
        resultados["errores"].append(f"Error al leer archivo: {e}")
        return resultados

    # 1. Verificar Wikidata/Knowledge Graph
    try:
        script_ld_json = soup.find("script", type="application/ld+json")
        if script_ld_json:
            schema = json.loads(script_ld_json.string)
            municipio = get_municipio_from_filename(os.path.basename(filepath))
            if municipio and municipio in MUNICIPIOS_KG_NORMALIZED:
                expected_sameAs = MUNICIPIOS_KG_NORMALIZED[municipio]["sameAs"]
                if "sameAs" in schema and set(schema["sameAs"]) == set(expected_sameAs):
                    resultados["wikidata"] = True
                else:
                    resultados["errores"].append(f"sameAs incorrecto o faltante. Esperado: {expected_sameAs}")
            else:
                resultados["errores"].append(f"No se pudo mapear el municipio: {municipio}")
        else:
            resultados["errores"].append("Falta el script JSON-LD de Schema.org")
    except Exception as e:
        resultados["errores"].append(f"Error al verificar Wikidata: {e}")

    # 2. Verificar Bloques de Voz e IA (Speakable y Respuesta Directa)
    try:
        respuesta_div = soup.find("div", id="respuesta-directa-ia")
        if respuesta_div:
            contenido = respuesta_div.get_text(strip=True)
            if len(contenido) <= 160:
                # Verificar que speakable apunte al selector correcto
                script_ld_json = soup.find("script", type="application/ld+json")
                if script_ld_json:
                    schema = json.loads(script_ld_json.string)
                    if "speakable" in schema:
                        speakable_selectors = schema["speakable"].get("cssSelector", [])
                        if "#respuesta-directa-ia" in speakable_selectors:
                            resultados["speakable"] = True
                        else:
                            resultados["errores"].append(f"speakable no apunta a #respuesta-directa-ia. Selectores encontrados: {speakable_selectors}")
                    else:
                        resultados["errores"].append("Falta la propiedad speakable en Schema.org")
            else:
                resultados["errores"].append(f"Contenido de respuesta-directa-ia es demasiado largo ({len(contenido)} caracteres, max 160)")
        else:
            resultados["errores"].append("Falta el div #respuesta-directa-ia")
    except Exception as e:
        resultados["errores"].append(f"Error al verificar speakable/IA: {e}")

    # 3. Verificar WPO (Carga Híbrida de Leaflet)
    try:
        # Verificar que no haya etiquetas <link> o <script> de Leaflet en el head (bloqueantes)
        leaflet_css_head = soup.find("link", rel="stylesheet", href=lambda x: x and "leaflet" in x.lower())
        leaflet_js_head = soup.find("script", src=lambda x: x and "leaflet" in x.lower())
        if not leaflet_css_head and not leaflet_js_head:
            # Verificar que el script de Leaflet se carga dinámicamente
            if "loadMap()" in html or "leafletJs = document.createElement('script')" in html:
                resultados["wpo"] = True
            else:
                resultados["errores"].append("No se encontró el script de carga dinámica de Leaflet")
        else:
            resultados["errores"].append("Se encontraron etiquetas de Leaflet bloqueantes en el head")
    except Exception as e:
        resultados["errores"].append(f"Error al verificar WPO: {e}")

    return resultados


def main():
    # Obtener la carpeta del proyecto
    carpeta_proyecto = os.path.dirname(os.path.abspath(__file__))

    # Encontrar todos los archivos HTML (excluir index, alojamientos, etc. para enfocarnos en las 120 generadas)
    archivos_html = [
        os.path.join(carpeta_proyecto, f)
        for f in os.listdir(carpeta_proyecto)
        if f.endswith(".html") and "-en-" in f  # Filtrar solo las páginas generadas programáticamente
    ]

    print(f"Iniciando auditoria de {len(archivos_html)} archivos HTML generados programaticamente...")
    print("-" * 80)

    total_wikidata_ok = 0
    total_speakable_ok = 0
    total_wpo_ok = 0
    archivos_con_errores = []

    for archivo in archivos_html:
        res = auditar_archivo(archivo)
        if res["wikidata"]:
            total_wikidata_ok += 1
        if res["speakable"]:
            total_speakable_ok += 1
        if res["wpo"]:
            total_wpo_ok += 1
        if len(res["errores"]) > 0:
            archivos_con_errores.append(res)

        # Mostrar progreso cada 20 archivos
        if (archivos_html.index(archivo) + 1) % 20 == 0:
            print(f"Procesados {archivos_html.index(archivo) + 1}/{len(archivos_html)} archivos...")

    print("-" * 80)
    print("\nREPORTE DE AUDITORIA:")
    print(f"Total de archivos auditados: {len(archivos_html)}")
    print(f"Archivos con Wikidata correcto: {total_wikidata_ok}/{len(archivos_html)}")
    print(f"Archivos con Speakable correcto: {total_speakable_ok}/{len(archivos_html)}")
    print(f"Archivos con WPO correcto: {total_wpo_ok}/{len(archivos_html)}")

    if len(archivos_con_errores) == 0:
        print("\nEXCELENTE: Todos los archivos pasaron todas las verificaciones!")
    else:
        print(f"\nADVERTENCIA: {len(archivos_con_errores)} archivos con errores:")
        for res in archivos_con_errores[:10]:  # Mostrar solo los primeros 10 errores para no saturar
            print(f"\n- {res['archivo']}:")
            for err in res["errores"]:
                print(f"  * {err}")
        if len(archivos_con_errores) > 10:
            print(f"\n... y {len(archivos_con_errores) - 10} archivos más con errores.")


if __name__ == "__main__":
    # Instalar BeautifulSoup4 si no está presente
    try:
        from bs4 import BeautifulSoup
    except ImportError:
        print("Instalando dependencia BeautifulSoup4...")
        import subprocess
        subprocess.check_call(["python", "-m", "pip", "install", "beautifulsoup4"])
        from bs4 import BeautifulSoup
    main()

