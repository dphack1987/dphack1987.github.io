import json
import re

# Cargar rutas
with open('rutas_seo.json', 'r', encoding='utf-8') as f:
    rutas = json.load(f)

print(f"Total de rutas generadas: {len(rutas)}")
print()

# Verificar slugs
errores = 0
print("Verificando slugs...")
for ruta in rutas:
    slug = ruta['slug']
    # Comprobar que no hay mayúsculas ni caracteres especiales
    if slug != slug.lower():
        print(f"Slug con mayusculas: {slug}")
        errores +=1
    # Comprobar que no hay caracteres raros
    if re.search(r'[^a-z0-9\-]', slug):
        print(f"Slug con caracteres especiales: {slug}")
        errores +=1

if errores ==0:
    print("Todos los slugs son correctos (minusculas, sin caracteres especiales)")
