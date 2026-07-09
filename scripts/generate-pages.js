const fs = require('fs');
const path = require('path');

const masterData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/master-data.json'), 'utf8')
);

// ============================================
// FUNCIONES DE GEO-PROXIMIDAD (SEO INTERNO)
// ============================================

/**
 * Calcula distancia en km entre dos puntos usando Haversine formula
 * @param {number} lat1 - Latitud punto 1
 * @param {number} lon1 - Longitud punto 1
 * @param {number} lat2 - Latitud punto 2
 * @param {number} lon2 - Longitud punto 2
 * @returns {number} Distancia en km
 */
function calcularDistancia(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radio de la tierra en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
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
  
  if (cercanos.length === 0) {
    return ''; // No mostrar sección si no hay cercanos
  }

  const tipoNegocio = negocio.tipo || negocio.categoria;
  const linksHTML = cercanos
    .map(n => {
      const municipioCercano = masterData.municipios.find(m => m.id === n.municipioId);
      const nombreMunicipio = municipioCercano ? municipioCercano.nombre : 'Quindío';
      // Keywords: tipo de negocio + nombre + municipio
      const anchorText = `${n.tipo || n.categoria} ${n.nombre} en ${nombreMunicipio}`;
      return `
        <li style="margin-bottom: 12px;">
          <a href="../negocios/${n.slug}" style="color: #059669; text-decoration: none; font-weight: 600; hover: underline;">
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
      "item": `https://www.mapaturisticodelquindio.com/municipios/${item.slug}`
    });
  } else if (type === 'negocio') {
    const municipio = masterData.municipios.find(m => m.id === item.municipioId) || masterData.municipios[0];
    items.push({
      "@type": "ListItem",
      "position": 3,
      "name": municipio.nombre,
      "item": `https://www.mapaturisticodelquindio.com/municipios/${municipio.slug}`
    });
    items.push({
      "@type": "ListItem",
      "position": 4,
      "name": item.nombre,
      "item": `https://www.mapaturisticodelquindio.com/negocios/${item.slug}`
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
        "url": `https://www.mapaturisticodelquindio.com/municipios/${municipio.slug}`,
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
  municipio: (municipio) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${municipio.nombre} - Qué Ver y Hacer | Mapa Turístico del Quindío 2026</title>
  <meta name="description" content="Descubre ${municipio.nombre}: atractivos turísticos, alojamientos, restaurantes y más. Guía completa del Quindío sin intermediarios.">
  <meta name="keywords" content="${municipio.palabrasClave.join(', ')}">
  <link rel="canonical" href="https://www.mapaturisticodelquindio.com/municipios/${municipio.slug}">
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
  `,
  negocio: (negocio) => {
    const municipio = masterData.municipios.find(m => m.id === negocio.municipioId) || masterData.municipios[0];
    return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${negocio.nombre} - ${municipio.nombre} | Mapa Turístico del Quindío</title>
  <meta name="description" content="${negocio.descripcionLong}">
  <meta name="keywords" content="${negocio.palabrasClave.join(', ')}">
  <link rel="canonical" href="https://www.mapaturisticodelquindio.com/negocios/${negocio.slug}">
  <link rel="stylesheet" href="../assets/css/main.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/quicklink/2.3.0/quicklink.umd.js"></script>
  <script type="application/ld+json">
  ${JSON.stringify(generateNegocioSchema(negocio, municipio), null, 2)}
  </script>
</head>
<body data-negocio-slug="${negocio.slug}" data-municipio="${municipio.id}">
  <script src="../assets/js/nav.js"></script>
  <script src="../assets/js/analytics-sheets.js"></script>
  <div class="container" style="max-width: 1000px; margin: 0 auto; padding: 24px;">
    <h1 style="color: #064e3b; font-size: 36px; font-weight: 800; margin-bottom: 24px;">${negocio.nombre}</h1>
    <div style="padding:32px;background:white;border-radius:24px;box-shadow:0 8px 32px rgba(16,185,129,0.12);">
      <img src="${negocio.imagen}" alt="${negocio.nombre}" style="width:100%;border-radius:16px; margin-bottom: 24px;" loading="lazy">
      <p style="margin-top:16px;color:#374151; font-size: 18px; line-height: 1.8;">${negocio.descripcionLong}</p>
      ${negocio.servicios && negocio.servicios.length > 0 ? `
        <div style="margin-top: 24px;">
          <h3 style="color: #064e3b; font-weight: 700; margin-bottom: 12px;">🛠️ Servicios</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${negocio.servicios.map(s => `<span style="background: #dcfce7; color: #064e3b; padding: 6px 12px; border-radius: 20px; font-size: 14px; font-weight: 600;">${s}</span>`).join('')}
          </div>
        </div>
      ` : ''}
      ${negocio.whatsapp ? `
        <a href="https://wa.me/${negocio.whatsapp}" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 8px; margin-top: 24px; padding: 14px 32px; background: #25D366; color: white; font-weight: 800; text-decoration: none; border-radius: 50px; transition: transform 0.3s;">💬 Contactar por WhatsApp</a>
      ` : ''}
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
  `}
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
  ${masterData.municipios.map(m => `<url><loc>https://www.mapaturisticodelquindio.com/municipios/${m.slug}</loc><lastmod>${masterData.lastUpdated.split('T')[0]}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`).join('\n')}
  ${masterData.negocios.map(n => `<url><loc>https://www.mapaturisticodelquindio.com/negocios/${n.slug}</loc><lastmod>${n.fechaActualizacion}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '../sitemap.xml'), sitemap);
console.log('\n✅ Sitemap actualizado!');
