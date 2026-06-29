import os
from pathlib import Path

# Rutas de carpetas de imágenes
carpetas = [
    "assets/images/alojamientos",
    "assets/images/cafes",
    "assets/images/gastronomia",
    "assets/images/atractivos turisticos",
    "assets/images/hoteles",
    "assets/images/agencias operadoras turisticas"
]

print("Verificando conversion a WebP...")
print()

total_original = 0
total_webp = 0

for carpeta in carpetas:
    if not os.path.exists(carpeta):
        continue
    print(f"Carpeta: {carpeta}")
    for root, dirs, files in os.walk(carpeta):
        for file in files:
            ext = Path(file).suffix.lower()
            if ext in ['.jpg', '.jpeg', '.png']:
                total_original +=1
                webp_file = Path(file).stem + '.webp'
                if os.path.exists(os.path.join(root, webp_file)):
                    print(f"  OK: {file} -> {webp_file}")
                    total_webp +=1
                else:
                    print(f"  FALTA: {file} (no tiene WebP)")

print()
print(f"Resumen: {total_original} imágenes originales, {total_webp} convertidas a WebP")
