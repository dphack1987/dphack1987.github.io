import glob

# Leer el diseño base del index.html
with open('index.html', 'r', encoding='utf-8') as f:
    base_content = f.read()

# Buscar todos los archivos HTML
archivos = glob.glob("*.html")

for ar in archivos:
    if ar == "index.html":
        continue
    
    with open(ar, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Si detectamos que es un archivo basura de Wix
    if "wixsite" in content:
        print(f"Modernizando archivo: {ar}")
        with open(ar, 'w', encoding='utf-8') as f:
            f.write(base_content)

print("¡Proceso terminado, Zenythos 2.0!")