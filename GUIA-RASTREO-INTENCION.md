# 🚀 Guía de Rastreo de Intención Pura para Retargeting Turístico

¡Listo para hacer que tus anuncios parezcan leer la mente de los turistas? Esta guía te explica paso a paso cómo configurar todo el sistema.

---

## 📋 Índice
1. [Configuración del Pixel de Meta (Facebook/Instagram)](#1-configuración-del-pixel-de-meta-facebookinstagram)
2. [Configuración de Google Ads y GA4](#2-configuración-de-google-ads-y-ga4)
3. [Crear Audiencias Personalizadas en Meta Ads](#3-crear-audiencias-personalizadas-en-meta-ads)
4. [Crear Anuncios Personalizados en Meta](#4-crear-anuncios-personalizados-en-meta)
5. [Insertar tus IDs en el generador](#5-insertar-tus-ids-en-el-generador)

---

## 1. Configuración del Pixel de Meta (Facebook/Instagram)

### Paso 1.1: Crear un Pixel en Meta Business Manager
1. Abre [Meta Business Manager](https://business.facebook.com/)
2. Ve a **Configuración de Negocio** → **Píxeles de Facebook**
3. Haz clic en **Agregar**
4. Nombra tu pixel: `Pixel Mapa Turístico Quindío`
5. Ingresa tu sitio web: `https://www.mapaturisticodelquindio.com`
6. Haz clic en **Continuar**

### Paso 1.2: Obtener tu Pixel ID
1. En la página de tu pixel, copia el **ID del Pixel** (ej: `1234567890123456`)
2. Guárdalo, lo necesitarás después!

---

## 2. Configuración de Google Ads y GA4

### Paso 2.1: Crear una propiedad GA4
1. Abre [Google Analytics](https://analytics.google.com/)
2. Haz clic en **Administrar** → **Crear propiedad**
3. Nombra tu propiedad: `Mapa Turístico Quindío GA4`
4. Completa la información del negocio
5. Copia tu **ID de medición GA4** (empieza por `G-`, ej: `G-ABC123DEF456`)

### Paso 2.2: Vincular GA4 a Google Ads
1. Abre [Google Ads](https://ads.google.com/)
2. Ve a **Herramientas y configuración** → **Vinculaciones** → **Google Analytics (GA4)**
3. Haz clic en **Vincular** y selecciona tu propiedad GA4
4. Activa la opción de **Importar audiencias**

---

## 3. Crear Audiencias Personalizadas en Meta Ads

### 3.1 Audiencia: "Visitaron Aventura en Salento"
1. En Meta Ads Manager, ve a **Audiencia Manager**
2. Haz clic en **Crear audiencia** → **Audiencia personalizada**
3. Selecciona **Página web**
4. Elige:
   - **Evento**: `VisitaTuristica` (el evento personalizado que creamos)
   - **Filtrar por parámetro**:
     - Campo: `categoria` → Contiene: `aventura`
     - Campo: `municipio` → Contiene: `salento`
5. Nombra la audiencia: `Aventura - Salento`
6. Define la duración: `180 días`
7. Haz clic en **Crear audiencia**

### 3.2 Crear más audiencias por municipio y categoría
Repite el proceso para:
- `Alojamiento - Filandia`
- `Cafés - Circasia`
- `Glamping - Salento`
- etc...

---

## 4. Crear Anuncios Personalizados en Meta

### 4.1 Plantilla de Anuncio Perfecta
**Título:**  
`¿Planeando tu viaje a [MUNICIPIO]?`

**Texto del anuncio:**  
`¡Encontramos la [CATEGORÍA] perfecta para tu visita a [MUNICIPIO], Quindío! Reserva hoy mismo y asegura tu cupo antes de que se acabe.`

**Llamada a la acción:**  
`Reservar ahora` → Enlace directo a la página de la categoría.

### 4.2 Paso a Paso para crear el anuncio
1. En Ads Manager, ve a **Crear anuncio**
2. Objetivo: **Conversiones** o **Tráfico**
3. Selecciona tu audiencia personalizada
4. Carga tu video/imagen
5. Usa la plantilla de texto personalizada
6. Publica tu anuncio!

---

## 5. Insertar tus IDs en el generador

### Paso 5.1: Edita el archivo `generator.js`
1. Abre el archivo `generator.js`
2. Encuentra estas líneas y reemplázalos con tus IDs reales:
```javascript
// ===== META PIXEL (FACEBOOK/INSTAGRAM) =====
fbq('init', 'TU_PIXEL_ID_AQUI'); // <-- Reemplaza con tu Pixel ID (ej: '1234567890123456')

// ===== GOOGLE ADS / ANALYTICS =====
gtag('config', 'TU_GA4_ID_AQUI'); // <-- Reemplaza con tu GA4 ID (ej: 'G-ABC123DEF456')
gtag('config', 'TU_GOOGLE_ADS_ID_AQUI'); // <-- Reemplaza con tu Google Ads ID (ej: 'AW-987654321')
```

### Paso 5.2: Regenera todas las páginas
Ejecuta el generador para que los cambios se apliquen a todas las landing pages:
```bash
cd dphack1987.github.io
node generator.js
```

### Paso 5.3: Sube los cambios a GitHub
```bash
git add .
git commit -m "🎯 Configurar píxeles de Meta y Google Ads"
git push origin main
```

---

## 🧪 Prueba tu sistema
1. Abre tu navegador en modo incógnito
2. Visita una página como `turismo-de-aventura-en-salento.html`
3. Abre la consola de desarrollador (F12) → Ve a la pestaña **Network**
4. Verifica que se envían los eventos a Meta y Google Ads
5. ¡Listo! Ahora tus anuncios personalizados aparecerán a ese usuario en Instagram y Facebook.

---

## 💡 Tips avanzados
- **Crear segmentos más específicos**: Usa el historial de navegación en LocalStorage para crear audiencias super personalizadas
- **A/B Testing**: Prueba diferentes textos de anuncios para ver cuál convierte más
- **Seguimiento de conversiones**: Configura eventos de conversión cuando un usuario hace clic en WhatsApp
- **Lookalike Audiences**: Usa tus audiencias personalizadas para crear audiencias similares de turistas interesados en el Quindío

¡Felicidades! Ahora tienes un sistema de retargeting de clase mundial para tu plataforma turística 🚀

---

**Si tienes dudas, ¡contáctanos!**
