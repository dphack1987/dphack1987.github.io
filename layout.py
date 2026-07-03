import glob
import os

# 1. Leemos el Home para obtener sus partes vitales
with open('index.html', 'r', encoding='utf-8') as f:
    home = f.read()

# Extraemos Header y Footer
header_start = home.find('<div class="site-header">')
header_end = home.find('')
header_html = home[header_start:header_end]

footer_start = home.find('')
footer_html = home[footer_start:]

# Extraemos el bloque CSS completo
css_start = home.find('<style>')
css_end = home.find('</style>') + 8
css_block = home[css_start:css_end]

# 2. Aplicamos a cada página
for archivo in glob.glob("*.html"):
    if archivo == "index.html": continue
    
    with open(archivo, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Aquí inyectamos el ADN visual
    new_page = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {css_block}
</head>
<body>
    {header_html}
    <main style="padding: 40px 20px; max-width: 1000px; margin: 0 auto;">
        {content} 
    </main>
    {footer_html}
</body>
</html>"""
    
    with open(archivo, 'w', encoding='utf-8') as f:
        f.write(new_page)
    print(f"Arquitectura aplicada a: {archivo}")