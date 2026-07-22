const fs = require('fs');
const path = require('path');

const masterData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/master-data.json'), 'utf8')
);

// ============================================
// SISTEMA DE CACHÉ PARA DISTANCIAS
// ============================================
// Mejora performance: evita recalcular distancias múltiples veces
const distanceCache = {};
const cacheStats = {
  hits: 0,
  misses: 0,
  calculations: 0
};

function buildSeoText(text, fallback, maxLength = 155) {
  if (!text || typeof text !== 'string') {
    text = fallback || '';
  }

  text = text.trim();

  if (text.length === 0 && fallback) {
    text = fallback;
  }

  if (text.length > maxLength) {
    return `${text.slice(0, maxLength - 3).trim()}...`;
  }

  return text;
}

function buildSeoTitle(text, fallback, maxLength = 80) {
  if (!text || typeof text !== 'string') {
    text = fallback || '';
  }

  text = text.trim();
  if (text.length === 0) {
    return fallback || '';
  }

  // Aumentar maxLength para títulos SEO - Google permite hasta ~60-70 caracteres
  // pero para este caso aumentamos a 80 para evitar cortes innecesarios
  if (text.length > maxLength) {
    return text.slice(0, maxLength).trim();
  }

  return text;
}

function buildSeoDescription(text, fallback, maxLength = 155) {
  const candidate = (text && text.trim()) || '';
  if (candidate.length >= 50 && candidate.length <= maxLength) {
    return candidate;
  }

  const fallbackText = fallback && fallback.trim() ? fallback.trim() : candidate;
  if (fallbackText.length >= 50) {
    return buildSeoText(fallbackText, '', maxLength);
  }

  const merged = `${candidate}${candidate && fallbackText ? ' ' : ''}${fallbackText}`.trim();
  if (merged.length >= 50) {
    return buildSeoText(merged, '', maxLength);
  }

  const padded = `${merged} Descubre más detalles y reserva directamente con WhatsApp.`;
  return buildSeoText(padded, '', maxLength);
}

function escapeHtmlAttribute(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildSeoMetaTags(titleText, descriptionText, canonicalUrl, keywords = []) {
  const safeTitle = escapeHtmlAttribute(titleText || '');
  const safeDescription = escapeHtmlAttribute(descriptionText || '');
  const safeCanonical = escapeHtmlAttribute(canonicalUrl || '');
  const safeKeywords = escapeHtmlAttribute((keywords || []).join(', '));

  return `
  <meta name="description" content="${safeDescription}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <meta property="og:title" content="${safeTitle}">
  <meta property="og:description" content="${safeDescription}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${safeCanonical}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${safeTitle}">
  <meta name="twitter:description" content="${safeDescription}">
  ${safeKeywords ? `<meta name="keywords" content="${safeKeywords}">` : ''}
  `;
}

function getCachedDistance(lat1, lon1, lat2, lon2) {
  // Crear key única (con rounding para usar menos memoria)
  const key = `${lat1.toFixed(4)}_${lon1.toFixed(4)}_${lat2.toFixed(4)}_${lon2.toFixed(4)}`;
  
  if (distanceCache[key] !== undefined) {
    cacheStats.hits++;
    return distanceCache[key];
  }
  
  cacheStats.misses++;
  return null;
}

function setCachedDistance(lat1, lon1, lat2, lon2, distance) {
  const key = `${lat1.toFixed(4)}_${lon1.toFixed(4)}_${lat2.toFixed(4)}_${lon2.toFixed(4)}`;
  distanceCache[key] = distance;
}

// ============================================
// FUNCIONES DE GEO-PROXIMIDAD (SEO INTERNO)
// ============================================

/**
 * Calcula distancia en km entre dos puntos usando Haversine formula
 * Con caché para evitar recálculos
 * @param {number} lat1 - Latitud punto 1
 * @param {number} lon1 - Longitud punto 1
 * @param {number} lat2 - Latitud punto 2
 * @param {number} lon2 - Longitud punto 2
 * @returns {number} Distancia en km
 */
function calcularDistancia(lat1, lon1, lat2, lon2) {
  // Verificar caché primero
  const cached = getCachedDistance(lat1, lon1, lat2, lon2);
  if (cached !== null) {
    return cached;
  }

  // Calcular si no está en caché
  const R = 6371; // Radio de la tierra en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  // Guardar en caché
  setCachedDistance(lat1, lon1, lat2, lon2, distance);
  cacheStats.calculations++;
  
  return distance;
}

/**
 * Encuentra negocios cercanos ordenados por distancia
 * @param {Object} negocioActual - Negocio para el cual buscar cercanos
 * @param {number} maxResultados - Cantidad máxima de resultados
 * @param {number} maxDistanciaKm - Distancia máxima en km
 * @returns {Array} Array de negocios cercanos con distancia calculada
 */
function obtenerNegociosCercanos(negocioActual, maxResultados = 5, maxDistanciaKm = 15) {
  if (!negocioActual.lat || !negocioActual.lng) {
    return [];
  }

  // Filtrar negocios cercanos (excluyendo el actual)
  const negociosCercanos = masterData.negocios
    .filter(n => n.slug !== negocioActual.slug && n.lat && n.lng)
    .map(negocio => ({
      ...negocio,
      distancia: calcularDistancia(
        negocioActual.lat,
        negocioActual.lng,
        negocio.lat,
        negocio.lng
      )
    }))
    .filter(n => n.distancia <= maxDistanciaKm)
    .sort((a, b) => a.distancia - b.distancia)
    .slice(0, maxResultados);

  return negociosCercanos;
}

/**
 * Genera sección HTML de "Negocios Cercanos" con keywords SEO
 * @param {Object} negocio - Negocio actual
 * @param {Object} municipio - Municipio actual
 * @returns {string} HTML de la sección
 */
function generarSeccionNegociosCercanos(negocio, municipio) {
  const cercanos = obtenerNegociosCercanos(negocio);
  
  const tipoNegocio = negocio.tipo || negocio.categoria;
  const categoria = negocio.categoria || 'negocio';

  // Obtener página de destino por categoría
  let paginaDestino = '../index.html';
  let textoEnlace = `Ver más ${categoria}s en el Quindío`;
  if (categoria === 'alojamiento') {
    paginaDestino = '../alojamientos.html';
    textoEnlace = `Ver otros alojamientos en ${municipio.nombre}`;
  } else if (categoria === 'sitio-turistico') {
    paginaDestino = '../sitios-turisticos.html';
    textoEnlace = `Ver más sitios turísticos en ${municipio.nombre}`;
  } else if (categoria === 'transporte') {
    paginaDestino = '../empresas-de-transporte.html';
    textoEnlace = `Ver más transportes en ${municipio.nombre}`;
  } else if (categoria === 'gastronomia') {
    paginaDestino = '../quindio-comercial.html';
    textoEnlace = `Ver más gastronomía en ${municipio.nombre}`;
  }

  const linksHTML = cercanos
    .map(n => {
      const municipioCercano = masterData.municipios.find(m => m.id === n.municipioId);
      const nombreMunicipio = municipioCercano ? municipioCercano.nombre : 'Quindío';
      // Keywords: tipo de negocio + nombre + municipio
      const anchorText = `${n.tipo || n.categoria} ${n.nombre} en ${nombreMunicipio}`;
      return `
        <li style="margin-bottom: 12px;">
          <a href="../negocios/${n.slug}.html" style="color: #059669; text-decoration: none; font-weight: 600; hover: underline;">
            ${n.nombre}
          </a>
          <span style="color: #9ca3af; font-size: 14px;">• ${n.municipioId === municipio.id ? 'En la misma ciudad' : `A ${n.distancia.toFixed(1)} km`}</span>
        </li>
      `;
    })
    .join('');

  return `
    <section style="margin-top: 48px; padding: 40px; background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border-radius: 24px;">
      <h2 style="color: #064e3b; font-size: 24px; font-weight: 800; margin-bottom: 24px;">
        🏘️ Más ${tipoNegocio}s en ${municipio.nombre}
      </h2>
      <p style="color: #6b7280; margin-bottom: 20px;">
        Descubre otros ${tipoNegocio}s similares en las cercanías de ${negocio.nombre}.
      </p>
      <ul style="list-style: none; padding: 0; margin: 0;">
        ${linksHTML}
      </ul>
      <div style="margin-top: 24px;">
        <a href="${paginaDestino}" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: #059669; color: white; font-weight: 700; text-decoration: none; border-radius: 50px; transition: all 0.3s;">
          🔍 ${textoEnlace}
        </a>
      </div>
    </section>
  `;
}

// Generar BreadcrumbList Schema
const generateBreadcrumbList = (type, item) => {
  const items = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://www.mapaturisticodelquindio.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Quindío",
      "item": "https://www.mapaturisticodelquindio.com/municipios-del-quindio.html"
    }
  ];

  if (type === 'municipio') {
    items.push({
      "@type": "ListItem",
      "position": 3,
      "name": item.nombre,
      "item": `https://www.mapaturisticodelquindio.com/municipios/${item.slug}.html`
    });
  } else if (type === 'negocio') {
    const municipio = masterData.municipios.find(m => m.id === item.municipioId) || masterData.municipios[0];
    items.push({
      "@type": "ListItem",
      "position": 3,
      "name": municipio.nombre,
      "item": `https://www.mapaturisticodelquindio.com/municipios/${municipio.slug}.html`
    });
    items.push({
      "@type": "ListItem",
      "position": 4,
      "name": item.nombre,
      "item": `https://www.mapaturisticodelquindio.com/negocios/${item.slug}.html`
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items
  };
};

// Generar Schema global para Quindío
const generateGlobalQuindioSchema = () => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AdministrativeArea",
        "name": "Quindío",
        "description": "Departamento del Eje Cafetero colombiano, famoso por su café, paisajes y cultura.",
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "Quindío",
          "addressCountry": "CO"
        },
        "url": "https://www.mapaturisticodelquindio.com",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 4.55,
          "longitude": -75.68
        },
        "sameAs": "https://es.wikipedia.org/wiki/Quind%C3%ADo"
      },
      {
        "@type": "TouristDestination",
        "name": "Quindío",
        "description": "Destino turístico del Eje Cafetero colombiano, con paisajes cafeteros, pueblos tradicionales y experiencias auténticas.",
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "Quindío",
          "addressCountry": "CO"
        },
        "url": "https://www.mapaturisticodelquindio.com",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 4.55,
          "longitude": -75.68
        },
        "touristType": [
          "Ecoturismo",
          "Turismo cultural",
          "Turismo gastronómico"
        ]
      }
    ]
  };
};

// Generar Schema para Negocio (incluye Offer/Event si aplica)
const generateNegocioSchema = (negocio, municipio) => {
  const globalSchema = generateGlobalQuindioSchema();
  const negocioSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": negocio.schema['@type'] || 'LocalBusiness',
        "name": negocio.nombre,
        "description": negocio.descripcionLong,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": negocio.direccion,
          "addressLocality": municipio.nombre,
          "addressRegion": "Quindío",
          "addressCountry": "CO"
        },
        "telephone": negocio.telefono,
        "url": negocio.url,
        "image": negocio.imagen,
        "priceRange": negocio.schema.priceRange || "$$",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": negocio.lat,
          "longitude": negocio.lng
        },
        "author": {
          "@type": "Organization",
          "name": negocio.author.name,
          "url": negocio.author.url
        },
        "aggregateRating": negocio.rating ? {
          "@type": "AggregateRating",
          "ratingValue": negocio.rating.valor,
          "reviewCount": negocio.rating.cantidad
        } : undefined,
        "potentialAction": {
          "@type": "ReserveAction",
          "name": `Reservar en ${negocio.nombre}`,
          "url": negocio.whatsapp ? `https://wa.me/${negocio.whatsapp}` : negocio.maps,
          "target": negocio.whatsapp ? `https://wa.me/${negocio.whatsapp}` : negocio.maps,
          "actionStatus": "https://schema.org/PotentialActionStatus"
        }
      },
      generateBreadcrumbList('negocio', negocio)
    ]
  };
  // Combine global and negocio schemas
  negocioSchema['@graph'].unshift(...globalSchema['@graph']);

  // Añadir Offer si tiene precio definido
  if (negocio.precioRango && negocio.precioRango !== 'Consultar') {
    negocioSchema['@graph'].push({
      "@type": "Offer",
      "name": `Reserva en ${negocio.nombre}`,
      "description": negocio.descripcion,
      "priceCurrency": "COP",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": negocio.nombre
      }
    });
  }

  // Añadir Event si es un atractivo turístico
  if (negocio.categoria === 'sitio-turistico') {
    negocioSchema['@graph'].push({
      "@type": "Event",
      "name": `Visita a ${negocio.nombre}`,
      "description": negocio.descripcionLong,
      "location": {
        "@type": "Place",
        "name": negocio.nombre,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": municipio.nombre,
          "addressRegion": "Quindío",
          "addressCountry": "CO"
        }
      },
      "startDate": new Date().toISOString().split('T')[0],
      "endDate": "2026-12-31"
    });
  }

  return negocioSchema;
};

// Consejos de Local pregenerados (simula IA)
const CONSEJOS_LOCAL = {
  armenia: "Consejo de Local: ¡Armenia tiene el clima perfecto! Lleva ropa ligera pero un suéter para las noches. No te pierdas el Parque de la Vida y el Mercado de Artesanías.",
  circasia: "Consejo de Local: Circasia es el pueblo más bonito del mundo. Visita el Parque Principal temprano para fotos sin gente y prueba el café en las tiendas cercanas.",
  salento: "Consejo de Local: Para el Valle del Cocora, lleva botas de agua (si ha llovido), protector solar y suficiente agua. El sendero de los Aposentos es imprescindible.",
  montenegro: "Consejo de Local: El Parque Nacional del Café es mejor visitarlo entre semana para evitar multitudes. Llega temprano para disfrutar todas las atracciones.",
  filandia: "Consejo de Local: Filandia es romance en estado puro. El Mirador Encanto tiene la mejor vista, y las panaderías del centro hacen pan fresco todas las tardes.",
  calarca: "Consejo de Local: Calarcá es la capital mundial del café. Haz un tour de café en una finca cercana y prueba el café tinto con pan de queso.",
  "la-tebaida": "Consejo de Local: La Tebaida es perfecta para descansar. Disfruta la tranquilidad y la comida típica en los restaurantes del centro.",
  ginebra: "Consejo de Local: Ginebra es pequeño pero acogedor. Pregunta por las fincas cafeteras cercanas, muchas ofrecen tours sin cita previa."
};

// Generar Schema para Municipio con global Quindío
const generateMunicipioSchema = (municipio) => {
  const globalSchema = generateGlobalQuindioSchema();
  const municipioSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": municipio.schema['@type'] || 'City',
        "name": municipio.nombre,
        "description": municipio.descripcion,
        "location": {
          "@type": "Place",
          "name": "Quindío, Colombia"
        },
        "url": `https://www.mapaturisticodelquindio.com/municipios/${municipio.slug}.html`,
        "author": {
          "@type": "Organization",
          "name": municipio.author.name,
          "url": municipio.author.url
        },
        "sameAs": municipio.schema.sameAs || ''
      },
      generateBreadcrumbList('municipio', municipio)
    ]
  };
  // Combine global and municipio schemas
  municipioSchema['@graph'].unshift(...globalSchema['@graph']);
  return municipioSchema;
};

const TEMPLATES = {
  municipio: (municipio) => {
    const titleText = buildSeoTitle(
      `${municipio.nombre} - Qué Ver y Hacer | Mapa Turístico del Quindío 2026`,
      `Descubre ${municipio.nombre} en el Quindío`,
      80
    );
    const descriptionText = buildSeoDescription(
      municipio.textoSeo || municipio.descripcionLong,
      `Descubre ${municipio.nombre} en el Quindío, Quindío. Encuentra los mejores planes, atractivos y servicios turísticos en esta región de la Zona Cafetera.`,
      155
    );
    const canonicalUrl = `https://www.mapaturisticodelquindio.com/municipios/${municipio.slug}.html`;

    return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtmlAttribute(titleText)}</title>
  ${buildSeoMetaTags(titleText, descriptionText, canonicalUrl, municipio.palabrasClave)}
  <link rel="alternate" hreflang="es" href="${canonicalUrl}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta name="theme-color" content="#059669">
  <link rel="stylesheet" href="../assets/css/main.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/quicklink/2.3.0/quicklink.umd.js"></script>
  <script type="application/ld+json">
  ${JSON.stringify(generateMunicipioSchema(municipio), null, 2)}
  </script>
</head>
<body>
  <script src="../assets/js/nav.js"></script>
  <section class="hero">
    <div class="hero-bg" style="background-image:url('${municipio.banner}')"></div>
    <div class="hero-inner">
      <h1>${municipio.emoji} ${municipio.nombre} - Quindío</h1>
      <p class="hero-desc">${municipio.descripcionLong}</p>
    </div>
  </section>

  <!-- Guía de Experto -->
  <section style="padding: 32px 24px 0;">
    <div style="max-width: 900px; margin: 0 auto;">
      <div style="background: white; border-radius: 24px; padding: 32px; box-shadow: 0 10px 30px rgba(16, 185, 129, 0.12);">
        <h2 style="color: #064e3b; font-size: 24px; font-weight: 800; margin: 0 0 12px;">¿Qué hacer en ${municipio.nombre}?</h2>
        <p style="color: #374151; font-size: 17px; line-height: 1.8; margin: 0;">${municipio.textoSeo || municipio.descripcionLong}</p>
      </div>
    </div>
  </section>

  <section style="padding: 64px 24px; background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);">
    <div style="max-width: 900px; margin: 0 auto;">
      <div style="background: white; border-radius: 24px; padding: 40px; box-shadow: 0 10px 40px rgba(16, 185, 129, 0.15);">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
          <span style="font-size: 40px;">👨‍🌾</span>
          <div>
            <h2 style="color: #064e3b; font-size: 24px; font-weight: 800; margin: 0;">Guía de Experto</h2>
            <p style="color: #6b7280; margin: 0; font-size: 14px;">Consejo directo de un local</p>
          </div>
        </div>
        <p style="color: #374151; font-size: 18px; line-height: 1.8; margin: 0;">
          ${CONSEJOS_LOCAL[municipio.id] || `Consejo de Local: ¡Disfruta ${municipio.nombre}! Lleva protector solar, agua y tu cámara. Las mejores fotos son al amanecer.`}
        </p>
      </div>
    </div>
  </section>

  <section style="padding: 0 24px 24px;">
    <div style="max-width: 1000px; margin: 0 auto; background: linear-gradient(135deg, #064e3b 0%, #059669 100%); border-radius: 24px; padding: 28px; color: white; box-shadow: 0 16px 50px rgba(5, 150, 105, 0.2);">
      <h2 style="margin: 0 0 10px; font-size: 24px; font-weight: 800;">Reserva directa y sin intermediarios</h2>
      <p style="margin: 0 0 20px; color: rgba(255,255,255,0.92); line-height: 1.7;">Planea tu visita a ${municipio.nombre} con alojamiento, transporte y experiencias cercanas en un solo lugar.</p>
      <div style="display: flex; flex-wrap: wrap; gap: 12px;">
        <a href="../alojamientos.html" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 18px; border-radius: 999px; background: white; color: #064e3b; font-weight: 700; text-decoration: none;">🏨 Ver alojamientos</a>
        <a href="../empresas-de-transporte.html" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 18px; border-radius: 999px; background: rgba(255,255,255,0.16); color: white; font-weight: 700; text-decoration: none; border: 1px solid rgba(255,255,255,0.25);">🚍 Solicitar transporte</a>
        <a href="../sitios-turisticos.html" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 18px; border-radius: 999px; background: rgba(255,255,255,0.16); color: white; font-weight: 700; text-decoration: none; border: 1px solid rgba(255,255,255,0.25);">🎡 Ver sitios turísticos</a>
      </div>
    </div>
  </section>

  <!-- Motor de Ruta Inteligente -->
  <section style="padding: 64px 24px;">
    <div style="max-width: 1000px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 40px;">
        <h2 style="color: #064e3b; font-size: 32px; font-weight: 800; margin-bottom: 12px;">🤖 Crea tu Itinerario Ideal</h2>
        <p style="color: #6b7280; font-size: 18px;">Selecciona tus preferencias y generamos la ruta perfecta para ti</p>
      </div>
      <div style="background: white; border-radius: 24px; padding: 40px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);">
        <div id="preferencias-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;">
          <button class="filtro-btn" data-filter="cafe" style="padding: 16px 24px; border: 2px solid #059669; border-radius: 16px; background: white; color: #059669; font-weight: 700; cursor: pointer; transition: all 0.3s;">☕ Café</button>
          <button class="filtro-btn" data-filter="aventura" style="padding: 16px 24px; border: 2px solid #059669; border-radius: 16px; background: white; color: #059669; font-weight: 700; cursor: pointer; transition: all 0.3s;">🧗 Aventura</button>
          <button class="filtro-btn" data-filter="mascotas" style="padding: 16px 24px; border: 2px solid #059669; border-radius: 16px; background: white; color: #059669; font-weight: 700; cursor: pointer; transition: all 0.3s;">🐶 Mascotas</button>
          <button class="filtro-btn" data-filter="gastronomia" style="padding: 16px 24px; border: 2px solid #059669; border-radius: 16px; background: white; color: #059669; font-weight: 700; cursor: pointer; transition: all 0.3s;">🍴 Gastronomía</button>
          <button class="filtro-btn" data-filter="relax" style="padding: 16px 24px; border: 2px solid #059669; border-radius: 16px; background: white; color: #059669; font-weight: 700; cursor: pointer; transition: all 0.3s;">🧘 Relax</button>
          <button class="filtro-btn" data-filter="familia" style="padding: 16px 24px; border: 2px solid #059669; border-radius: 16px; background: white; color: #059669; font-weight: 700; cursor: pointer; transition: all 0.3s;">👨‍👩‍👧‍👦 Familia</button>
        </div>
        <button id="generar-ruta-btn" style="width: 100%; padding: 16px; background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; font-size: 18px; font-weight: 800; border: none; border-radius: 16px; cursor: pointer; transition: transform 0.3s;">✨ Generar Mi Itinerario Ideal</button>
      </div>
    </div>
  </section>

  <footer class="footer">
    <img src="../assets/images/logo_mapa/logo.png" alt="Mapa Turístico del Quindío" class="footer-logo">
    <p>© 2026 www.mapaturisticodelquindio.com — Hecho con ❤️ en el Quindío</p>
  </footer>
  <script src="../assets/js/app.js"></script>
  <script>
    // Inicializar quicklink
    window.addEventListener('load', () => {
      quicklink.listen();
    });

    // Motor de Ruta Inteligente
    const filtrosSeleccionados = new Set();
    const filtroBtns = document.querySelectorAll('.filtro-btn');

    filtroBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        if (filtrosSeleccionados.has(filter)) {
          filtrosSeleccionados.delete(filter);
          btn.style.background = 'white';
          btn.style.color = '#059669';
        } else {
          filtrosSeleccionados.add(filter);
          btn.style.background = '#059669';
          btn.style.color = 'white';
        }
      });
    });

    document.getElementById('generar-ruta-btn').addEventListener('click', () => {
      const filters = Array.from(filtrosSeleccionados).join(',');
      if (filters) {
        window.location.href = '../?filter=' + filters + '#mapa';
      } else {
        alert('Por favor selecciona al menos una preferencia');
      }
    });
  </script>
</body>
</html>
  `},
  negocio: (negocio) => {
    const municipio = masterData.municipios.find(m => m.id === negocio.municipioId) || masterData.municipios[0];
    const rawTitle = `${negocio.nombre} en ${municipio.nombre} | Mapa Turístico del Quindío`;
    const titleText = buildSeoTitle(rawTitle, `${negocio.nombre} en ${municipio.nombre}`, 80);
    const descriptionText = buildSeoDescription(
      negocio.textoSeo || negocio.descripcionLong,
      `${negocio.nombre} en ${municipio.nombre}, Quindío. Reserva directo con un contacto seguro y descubre su oferta turística en el corazón del Eje Cafetero.`,
      155
    );
    const canonicalUrl = `https://www.mapaturisticodelquindio.com/negocios/${negocio.slug}.html`;

    return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtmlAttribute(titleText)}</title>
  ${buildSeoMetaTags(titleText, descriptionText, canonicalUrl, negocio.palabrasClave)}
  <link rel="alternate" hreflang="es" href="${canonicalUrl}">
  <link rel="canonical" href="${canonicalUrl}">
  <link rel="stylesheet" href="../assets/css/main.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/quicklink/2.3.0/quicklink.umd.js"></script>
  <script type="application/ld+json">
  ${JSON.stringify(generateNegocioSchema(negocio, municipio), null, 2)}
  </script>
  <style>
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
      margin-top: 32px;
    }
    .gallery-item {
      position: relative;
      aspect-ratio: 4/3;
      background: #f8fafc;
      border-radius: 16px;
      overflow: hidden;
      border: 2px dashed #d1d5db;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 12px;
      padding: 20px;
      text-align: center;
    }
    .gallery-item.has-image {
      border: none;
      background: transparent;
    }
    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: none;
    }
    .gallery-item.has-image img {
      display: block;
    }
    .gallery-placeholder {
      font-size: 48px;
      opacity: 0.3;
    }
    .gallery-placeholder-text {
      color: #6b7280;
      font-size: 14px;
      font-weight: 500;
    }
    .info-section {
      background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
      border-radius: 24px;
      padding: 32px;
      margin-top: 32px;
      border: 1px solid rgba(5, 150, 105, 0.16);
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-top: 24px;
    }
    .info-item {
      background: white;
      padding: 20px;
      border-radius: 16px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    }
    .info-item h4 {
      color: #064e3b;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .info-item p {
      color: #374151;
      font-size: 15px;
      line-height: 1.6;
      margin: 0;
    }
    .contact-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 16px;
    }
    .contact-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      border-radius: 50px;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.3s;
      font-size: 14px;
    }
    .contact-btn-whatsapp {
      background: #25D366;
      color: white;
    }
    .contact-btn-whatsapp:hover {
      background: #1ebe5d;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
    }
    .contact-btn-phone {
      background: #059669;
      color: white;
    }
    .contact-btn-phone:hover {
      background: #047857;
      transform: translateY(-2px);
    }
    .contact-btn-email {
      background: #f59e0b;
      color: white;
    }
    .contact-btn-email:hover {
      background: #d97706;
      transform: translateY(-2px);
    }
    .visit-3d-section {
      background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
      border-radius: 24px;
      padding: 32px;
      margin-top: 32px;
      color: white;
      text-align: center;
    }
    .visit-3d-section h2 {
      font-size: 28px;
      font-weight: 800;
      margin-bottom: 12px;
    }
    .visit-3d-section p {
      font-size: 16px;
      opacity: 0.9;
      margin-bottom: 24px;
    }
    .visit-3d-container {
      position: relative;
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      aspect-ratio: 16/9;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      overflow: hidden;
      border: 2px solid rgba(255, 255, 255, 0.2);
    }
    .visit-3d-placeholder {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      padding: 32px;
      text-align: center;
    }
    .visit-3d-placeholder-icon {
      font-size: 64px;
      opacity: 0.5;
    }
    .visit-3d-placeholder-text {
      font-size: 18px;
      font-weight: 600;
      opacity: 0.8;
    }
    .visit-3d-placeholder-sub {
      font-size: 14px;
      opacity: 0.6;
      max-width: 400px;
    }
    .logo-section {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      border-radius: 24px;
      padding: 32px;
      margin-top: 32px;
      text-align: center;
      border: 2px solid rgba(245, 158, 11, 0.2);
    }
    .logo-section h2 {
      color: #92400e;
      font-size: 24px;
      font-weight: 800;
      margin-bottom: 16px;
    }
    .logo-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 24px;
      flex-wrap: wrap;
      margin-top: 24px;
    }
    .logo-item {
      background: white;
      padding: 20px;
      border-radius: 16px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      max-width: 200px;
    }
    .logo-item img {
      max-width: 120px;
      max-height: 80px;
      object-fit: contain;
    }
    .logo-item span {
      color: #374151;
      font-size: 14px;
      font-weight: 600;
    }
    @media (max-width: 768px) {
      .gallery-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .info-grid {
        grid-template-columns: 1fr;
      }
      .visit-3d-section h2 {
        font-size: 22px;
      }
      .logo-section h2 {
        font-size: 20px;
      }
      .logo-container {
        flex-direction: column;
      }
      .logo-item {
        max-width: 100%;
      }
    }
  </style>
</head>
<body data-negocio-slug="${negocio.slug}" data-municipio="${municipio.id}">
  <script src="../assets/js/nav.js"></script>
  <script src="../assets/js/analytics-sheets.js"></script>
  <div class="container" style="max-width: 1000px; margin: 0 auto; padding: 24px;">
    <h1 style="color: #064e3b; font-size: 36px; font-weight: 800; margin-bottom: 24px;">${negocio.nombre}</h1>
    <div style="padding:32px;background:white;border-radius:24px;box-shadow:0 8px 32px rgba(16,185,129,0.12);">
      <img src="${negocio.imagen}" alt="${negocio.nombre}" style="width:100%;border-radius:16px; margin-bottom: 24px;" loading="lazy">
      <p style="margin-top:16px;color:#374151; font-size: 18px; line-height: 1.8;">${negocio.descripcionLong}</p>
      
      <!-- Galería de Imágenes -->
      <div class="gallery-grid">
        ${negocio.galeria && negocio.galeria.length > 0 ? 
          negocio.galeria.map((img, index) => `
            <div class="gallery-item has-image">
              <img src="${img}" alt="${negocio.nombre} - Imagen ${index + 1}" loading="lazy">
            </div>
          `).join('') :
          `
            <div class="gallery-item">
              <div class="gallery-placeholder">📷</div>
              <div class="gallery-placeholder-text">Próximamente</div>
            </div>
            <div class="gallery-item">
              <div class="gallery-placeholder">📷</div>
              <div class="gallery-placeholder-text">Próximamente</div>
            </div>
            <div class="gallery-item">
              <div class="gallery-placeholder">📷</div>
              <div class="gallery-placeholder-text">Próximamente</div>
            </div>
            <div class="gallery-item">
              <div class="gallery-placeholder">📷</div>
              <div class="gallery-placeholder-text">Próximamente</div>
            </div>
          `
        }
      </div>
      
      ${negocio.servicios && negocio.servicios.length > 0 ? `
        <div style="margin-top: 32px;">
          <h3 style="color: #064e3b; font-weight: 700; margin-bottom: 12px;">🛠️ Servicios</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${negocio.servicios.map(s => `<span style="background: #dcfce7; color: #064e3b; padding: 6px 12px; border-radius: 20px; font-size: 14px; font-weight: 600;">${s}</span>`).join('')}
          </div>
        </div>
      ` : ''}
      
      ${negocio.whatsapp ? `
        <div style="margin-top: 24px; display: flex; flex-wrap: wrap; gap: 12px;">
          <a href="https://wa.me/${negocio.whatsapp}" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 8px; padding: 14px 24px; background: #25D366; color: white; font-weight: 800; text-decoration: none; border-radius: 50px; transition: transform 0.3s;">💬 Contactar por WhatsApp</a>
          <a href="../municipios/${municipio.slug}.html" style="display: inline-flex; align-items: center; gap: 8px; padding: 14px 24px; background: #064e3b; color: white; font-weight: 800; text-decoration: none; border-radius: 50px; transition: transform 0.3s;">🏡 Ver ${municipio.nombre}</a>
          <a href="../alojamientos.html" style="display: inline-flex; align-items: center; gap: 8px; padding: 14px 24px; background: #f59e0b; color: white; font-weight: 800; text-decoration: none; border-radius: 50px; transition: transform 0.3s;">🛏️ Buscar alojamiento</a>
        </div>
      ` : ''}
      
      <div style="margin-top: 24px; padding: 20px; background: #f8fafc; border-radius: 16px; border: 1px solid #e5e7eb;">
        <h3 style="color: #064e3b; font-weight: 800; margin: 0 0 8px;">📍 ¿Por qué elegir ${negocio.nombre}?</h3>
        <p style="color: #374151; font-size: 16px; line-height: 1.7; margin: 0;">${negocio.textoSeo || `Este negocio en ${municipio.nombre} destaca por su ubicación, atención y conexión con el turismo del Quindío, siendo una opción útil para viajeros que buscan comodidad, cultura o experiencias auténticas.`}</p>
      </div>
    </div>
    
    <!-- Información Detallada -->
    <div class="info-section">
      <h2 style="color: #064e3b; font-size: 28px; font-weight: 800; margin-bottom: 8px;">📋 Información Completa</h2>
      <p style="color: #6b7280; font-size: 16px; margin-bottom: 24px;">Todo lo que necesitas saber para planificar tu visita</p>
      
      <div class="info-grid">
        <div class="info-item">
          <h4>📍 Dirección</h4>
          <p>${negocio.direccion || 'Por confirmar'}</p>
          ${negocio.direccion ? `
            <div class="contact-buttons">
              <a href="${negocio.maps}" target="_blank" rel="noopener" class="contact-btn contact-btn-phone">🗺️ Ver en Maps</a>
            </div>
          ` : ''}
        </div>
        
        <div class="info-item">
          <h4>📞 Contactos</h4>
          <div class="contact-buttons">
            ${negocio.whatsapp ? `
              <a href="https://wa.me/${negocio.whatsapp}" target="_blank" rel="noopener" class="contact-btn contact-btn-whatsapp">💬 WhatsApp</a>
            ` : ''}
            ${negocio.telefono ? `
              <a href="tel:${negocio.telefono}" class="contact-btn contact-btn-phone">📞 Llamar</a>
            ` : ''}
            ${negocio.email ? `
              <a href="mailto:${negocio.email}" class="contact-btn contact-btn-email">✉️ Email</a>
            ` : ''}
          </div>
        </div>
        
        <div class="info-item">
          <h4>💰 Rango de Precios</h4>
          <p>${negocio.precioRango || 'Consultar'}</p>
        </div>
        
        <div class="info-item">
          <h4>⭐ Valoración</h4>
          <p>${negocio.rating ? `${negocio.rating.valor}/5 (${negocio.rating.cantidad} reseñas)` : 'Sin valoraciones aún'}</p>
        </div>
        
        <div class="info-item">
          <h4>🏷️ Categoría</h4>
          <p>${negocio.tipo || 'Servicio turístico'}</p>
        </div>
        
        <div class="info-item">
          <h4>🌐 Sitio Web</h4>
          ${negocio.url ? `
            <a href="${negocio.url}" target="_blank" rel="noopener" class="contact-btn contact-btn-phone">🔗 Visitar sitio web</a>
          ` : '<p>No disponible</p>'}
        </div>
      </div>
    </div>
    
    <!-- Visita 3D -->
    <div class="visit-3d-section">
      <h2>🎮 Visita Virtual 3D</h2>
      <p>Explora ${negocio.nombre} como si estuvieras allí</p>
      <div class="visit-3d-container">
        <div class="visit-3d-placeholder">
          <div class="visit-3d-placeholder-icon">🏠</div>
          <div class="visit-3d-placeholder-text">Visita Virtual 3D</div>
          <div class="visit-3d-placeholder-sub">Próximamente podrás explorar este alojamiento en un entorno 3D interactivo</div>
        </div>
      </div>
    </div>
    
    <!-- Logo del Negocio -->
    <div class="logo-section">
      <h2>🏷️ Logo Oficial</h2>
      <p style="color: #6b7280; font-size: 16px; margin-bottom: 24px;">Identidad visual de ${negocio.nombre}</p>
      <div class="logo-container">
        <div class="logo-item">
          <img src="${negocio.imagen}" alt="Logo de ${negocio.nombre}" loading="lazy">
          <span>${negocio.nombre}</span>
        </div>
      </div>
    </div>
    
    ${generarSeccionNegociosCercanos(negocio, municipio)}
  </div>
  <footer class="footer">
    <img src="../assets/images/logo_mapa/logo.png" alt="Mapa Turístico del Quindío" class="footer-logo">
    <p>© 2026 www.mapaturisticodelquindio.com — Hecho con ❤️ en el Quindío</p>
  </footer>
  <script src="../assets/js/app.js"></script>
  <script>
    // Inicializar quicklink
    window.addEventListener('load', () => {
      quicklink.listen();
    });
  </script>
</body>
</html>
  `},
};

// Asegurar directorios existan
const municipiosDir = path.join(__dirname, '../municipios');
const negociosDir = path.join(__dirname, '../negocios');
[municipiosDir, negociosDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Generar páginas de municipios
masterData.municipios.forEach(municipio => {
  const filePath = path.join(municipiosDir, `${municipio.slug}.html`);
  fs.writeFileSync(filePath, TEMPLATES.municipio(municipio));
  console.log(`✅ Página de municipio creada: municipios/${municipio.slug}.html`);
});

// Generar páginas de negocios
masterData.negocios.forEach(negocio => {
  const filePath = path.join(negociosDir, `${negocio.slug}.html`);
  fs.writeFileSync(filePath, TEMPLATES.negocio(negocio));
  console.log(`✅ Página de negocio creada: negocios/${negocio.slug}.html`);
});

// Generar sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.mapaturisticodelquindio.com/</loc><lastmod>${masterData.lastUpdated.split('T')[0]}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
  ${masterData.municipios.map(m => `<url><loc>https://www.mapaturisticodelquindio.com/municipios/${m.slug}.html</loc><lastmod>${masterData.lastUpdated.split('T')[0]}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`).join('\n')}
  ${masterData.negocios.map(n => `<url><loc>https://www.mapaturisticodelquindio.com/negocios/${n.slug}.html</loc><lastmod>${n.fechaActualizacion || masterData.lastUpdated.split('T')[0]}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '../sitemap.xml'), sitemap);
console.log('\n✅ Sitemap actualizado!');
