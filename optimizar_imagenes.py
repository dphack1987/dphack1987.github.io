import os
from PIL import Image
from pathlib import Path

# Configuración
CALIDAD_WEBP = 80  # 80% calidad (sin pérdida perceptible)
CARPETAS_IMAGENES = [
    "assets/images/alojamientos",
    "assets/images/cafes",
    "assets/images/gastronomia",
    "assets/images/atractivos turisticos",
    "assets/images/hoteles",
    "assets/images/agencias operadoras turisticas"
]

def optimize_image(img_path):
    """Convierte una imagen a WebP y devuelve la ruta del nuevo archivo."""
    try:
        webp_path = Path(img_path).with_suffix(".webp")
        # Si ya existe el WebP, saltar
        if webp_path.exists():
            return str(webp_path)
        img = Image.open(img_path)
        # Convertir a RGB si es necesario (para PNG con transparencia)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        # Guardar como WebP con calidad optimizada
        img.save(webp_path, "webp", quality=CALIDAD_WEBP, optimize=True)
        print(f"Convertido: {img_path} to {webp_path}")
        return str(webp_path)
    except Exception as e:
        print(f"Error al convertir {img_path}: {e}")
        return None

def batch_optimize_images():
    """Optimiza todas las imágenes en las carpetas especificadas."""
    print(f"Optimizando imágenes con calidad {CALIDAD_WEBP}%...\n")
    total_convertidos = 0
    for carpeta in CARPETAS_IMAGENES:
        if not os.path.exists(carpeta):
            print(f"Carpeta no encontrada: {carpeta}")
            continue
        for root, dirs, files in os.walk(carpeta):
            for file in files:
                if file.lower().endswith((".jpg", ".jpeg", ".png")):
                    img_path = os.path.join(root, file)
                    if optimize_image(img_path):
                        total_convertidos += 1
    print(f"\nOptimización completada: {total_convertidos} imágenes convertidas a WebP!")

if __name__ == "__main__":
    batch_optimize_images()
