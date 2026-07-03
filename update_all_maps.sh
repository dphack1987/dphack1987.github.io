#!/bin/bash

# --- CONFIGURACIÓN DE REPOSITORIOS ---
# Formato: "nombre-de-la-carpeta-local:URL-del-repo-de-github"
# El nombre de la carpeta será la URL (ej: /mapa-circasia/)
declare -a REPOS=(
    "mapa-circasia:https://github.com/dphack1987/mapa-circasia-digital-2.git"
    "mapa-del-quindio:https://github.com/dphack1987/mapa-quindio-2025.git"
)

echo "🚀 Iniciando sincronización de todos los mapas..."

# Verificar que estamos en el directorio correcto
if [ ! -d ".git" ]; then
    echo "❌ Error: No estás en la raíz del repositorio principal de GitHub Pages."
    exit 1
fi

# --- BUCLE DE ACTUALIZACIÓN ---
for repo_info in "${REPOS[@]}"; do
    IFS=':' read -r folder_name repo_url <<< "$repo_info"
    
    echo ""
    echo "--------------------------------------------------"
    echo "🔄 Procesando: $folder_name desde $repo_url"
    echo "--------------------------------------------------"

    # 1. Limpiar la carpeta local del proyecto para evitar archivos obsoletos
    echo "🧹 Limpiando la carpeta local ./$folder_name"
    rm -rf "./$folder_name"
    mkdir -p "./$folder_name" # -p crea el directorio si no existe

    # 2. Clonar el repositorio a una carpeta temporal
    echo "📥 Clonando el repositorio..."
    git clone "$repo_url" temp_clone

    # 3. Mover el contenido clonado a la carpeta final
    echo "📦 Moviendo archivos a la carpeta final..."
    # Esto mueve TODO el contenido de la carpeta clonada (incluyendo archivos ocultos)
    shopt -s dotglob # Para incluir archivos ocultos como .htaccess si los hubiera
    mv temp_clone/* "./$folder_name/"
    shopt -u dotglob

    # 4. Limpiar la carpeta temporal
    echo "🗑️ Eliminando carpeta temporal..."
    rm -rf temp_clone
    
    echo "✅ Proyecto $folder_name actualizado en ./$folder_name/"
done

echo ""
echo "--------------------------------------------------"
echo "⬆️ Subiendo todos los cambios a GitHub..."
echo "--------------------------------------------------"

# Añadir, hacer commit y subir todos los cambios
git add .
git commit -m "Automatización: Actualizar todos los mapas a la última versión"
git push origin main

echo ""
echo "🎉 ¡Todos los mapas han sido actualizados y subidos con éxito!"
echo "📍 URLs:"
echo "   - Mapa de Circasia: www.mapaturisticodelquindio.com/mapa-circasia/"
echo "   - Mapa del Quindío: www.mapaturisticodelquindio.com/mapa-del-quindio/"
