
# 🏔️ Mapa Turístico del Quindío - Arquitectura Programmatic SEO

## 📋 Stack Tecnológico
- **Frontend**: HTML5, CSS3, Vanilla JavaScript, **MapLibre GL** (recomendado sobre Leaflet para mejor indexación geográfica)
- **Backend/Automatización**: Node.js
- **Datos**: JSON Maestro + GeoJSON
- **Despliegue**: GitHub Pages + Cloudflare (para Edge Computing y performance)
- **Testing**: jsdom (para validación SEO)

---

## 🗂️ Estructura de Archivos (Nueva Arquitectura)
```
www.mapaturisticodelquindio.com/
├── data/
│   ├── master-data.json       # Datos maestro unificados
│   └── pautantes.json         # Datos originales (legacy)
├── scripts/
│   ├── generate-data.js       # Generar datos.js legacy
│   ├── generate-geojson.js    # Convertir maestro a GeoJSON
│   ├── generate-pages.js      # Generar páginas SEO + sitemap
│   ├── validate-seo.js        # Validar calidad SEO
│   └── check-project.js       # Verificar rutas y datos
├── municipios/                # Páginas generadas (programáticas)
│   └── armenia-quindio.html
├── negocios/                  # Páginas generadas (programáticas)
│   └── hotel-el-bosque-armenia.html
├── assets/
│   └── js/
│       └── geolocation-content.js # Contenido dinámico por ubicación
│       └── map-data.geojson   # Datos para el mapa
└── package.json               # Scripts de automatización
```

---

## 🎯 Puntos Clave Definidos

### 1. Arquitectura de Datos
- **Archivo Maestro**: `data/master-data.json`
  - Unifica municipios, negocios y categorías
  - Incluye campos para **E-E-A-T**:
    - Autoría (`author.name`, `author.url`)
    - Fechas de publicación/actualización
    - Ratings y reviews
    - Schema Markup predefinido
  - Campos para **Schema**: `schema.type`, `schema.priceRange`, etc.

### 2. Sistema de Generación
- **Flujo**: `npm run build` → Genera todo automáticamente:
  1. `generate-data.js`: Actualiza datos.js (legacy)
  2. `generate-geojson.js`: Crea GeoJSON para mapa
  3. `generate-pages.js`: Genera landing pages + sitemap.xml
  4. `validate-seo.js`: Valida estándares SEO

### 3. Integración Geoespacial
- **Recomendación**: **MapLibre GL JS** (fork de Mapbox, open source, ligero para móviles)
  - Ventajas vs Leaflet: Mejor rendimiento en móviles, mejor indexación de datos geográficos por Google
  - Compatible con GeoJSON generado
  - Instrucciones de uso: https://maplibre.org/maplibre-gl-js/docs/

### 4. Estrategia de Edge Computing
- Implementación **client-side + Cloudflare** (para GitHub Pages):
  - Script `assets/js/geolocation-content.js`: Detecta ubicación del usuario y muestra banners/sugerencias personalizadas
  - Cloudflare Workers (opcional, para edge real): Permite modificar contenido en el edge antes de llegar al usuario
  - Ventajas: Mejor experiencia de usuario y engagement local

### 5. Pipeline de Calidad
- **Script**: `scripts/validate-seo.js`
- Valida:
  - Title (10-60 chars)
  - Meta description (50-160 chars)
  - Etiqueta H1
  - Enlace canónico
  - Schema JSON-LD
- Se ejecuta automáticamente antes del despliegue con `npm run build`

---

## 🚀 Instalación y Uso
1. Instalar dependencias: `npm install`
2. Añadir/modificar datos en `data/master-data.json`
3. Ejecutar el pipeline: `npm run build`
4. Desplegar a GitHub Pages (o tu hosting preferido)

---

## 📈 Mejoras a Futuro
- Migrar a un framework static site generator (**11ty** o **Astro**) para mejor rendimiento y DX
- Integrar una base de datos real (Supabase/PostgreSQL) para escalabilidad
- Añadir CI/CD con GitHub Actions para automatizar despliegues
- Implementar Cloudflare Workers para contenido edge avanzado
- Añadir tests end-to-end con Cypress
