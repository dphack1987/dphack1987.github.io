import glob

# 1. Obtenemos el Header y CSS del index.html
with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()
    # Extraemos el bloque de estilos
    head_start = index_content.find('<head>')
    head_end = index_content.find('</head>')
    header_block = index_content[head_start:head_end+7]

# 2. Aplicamos a todas las páginas
for archivo in glob.glob("*.html"):
    if archivo == "index.html": continue
    
    with open(archivo, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Reemplazamos el head viejo por el nuevo (el del index)
    if '<head>' in content and '</head>' in content:
        start = content.find('<head>')
        end = content.find('</head>')
        new_content = content[:start] + header_block + content[end+7:]
        
        with open(archivo, 'w', encoding='utf-8') as f:
            f.write(new_content)
            print(f"Estandarizado diseño en: {archivo}")

print("¡Diseño unificado en todas las páginas, hermano!")