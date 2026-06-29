import xml.etree.ElementTree as ET
import os

# Cargar sitemap
tree = ET.parse('sitemap.xml')
root = tree.getroot()

# Extraer todas las URLs
namespaces = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
urls = [loc.text for loc in root.findall('.//sm:loc', namespaces)]

print(f"Total de URLs en sitemap: {len(urls)}")
print()

# Mostrar primeras 5
print("Primeras 5 URLs:")
for url in urls[:5]:
    print(f"  {url}")
print()

# Mostrar ultimas 5
print("Ultimas 5 URLs:")
for url in urls[-5:]:
    print(f"  {url}")
print()

# Verificar que todas existan como archivos
errores = 0
print("Verificando que todas las URLs correspondan a archivos...")
for url in urls:
    filename = url.split('/')[-1]
    if not os.path.exists(filename):
        print(f"  FALTA: {filename}")
        errores +=1

if errores ==0:
    print("Todos los archivos del sitemap existen!")
