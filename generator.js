const fs = require('fs');
const path = require('path');

// Función para capitalizar texto
function titleCase(str) {
  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Cargar datos de negocios y municipios
const dataContent = fs.readFileSync(path.join(__dirname, 'assets', 'js', 'datos.js'), 'utf8');
const wrapped = `
${dataContent}
module.exports = { MUNICIPIOS, NEGOCIOS };
`;
const tempFile = path.join(__dirname, 'temp-datos.js');
fs.writeFileSync(tempFile, wrapped, 'utf8');
const { MUNICIPIOS, NEGOCIOS } = require(tempFile);
fs.unlinkSync(tempFile);

// Cargar rutas SEO
const rutasSeo = JSON.parse(fs.readFileSync(path.join(__dirname, 'rutas_seo.json'), 'utf8'));

// Mapear categorías de rutasSeo a categorías de negocios
const CATEGORIA_NEGOCIOS_MAP = {
  "alojamiento": "alojamiento",
  "hoteles": "alojamiento",
  "glamping": "alojamiento",
  "fincas cafeteras": "alojamiento",
  "restaurantes": "gastronomia",
  "cafés especiales": "cafe",
  "turismo de aventura": "sitio-turistico",
  "alquiler de fincas": "alojamiento",
  "pasadías": "sitio-turistico",
  "rutas turísticas": "sitio-turistico"
};

const CATEGORIAS_EMOJIS = {
  "alojamiento": "🏡",
  "hoteles": "🏨",
  "glamping": "⛺",
  "fincas cafeteras": "☕",
  "restaurantes": "🍴",
  "cafés especiales": "☕",
  "turismo de aventura": "🎢",
  "alquiler de fincas": "🏡",
  "pasadías": "📅",
  "rutas turísticas": "🗺️"
};

// Mapeo de municipios con sus entidades de Knowledge Graph (Wikidata + Wikipedia)
const MUNICIPIOS_KG = {
  "Armenia": {
    sameAs: ["https://es.wikipedia.org/wiki/Armenia_(Quind%C3%ADo)", "https://www.wikidata.org/wiki/Q11078"]
  },
  "Calarcá": {
    sameAs: ["https://es.wikipedia.org/wiki/Calarc%C3%A1", "https://www.wikidata.org/wiki/Q1066231"]
  },
  "Circasia": {
    sameAs: ["https://es.wikipedia.org/wiki/Circasia", "https://www.wikidata.org/wiki/Q1066261"]
  },
  "Filandia": {
    sameAs: ["https://es.wikipedia.org/wiki/Filandia", "https://www.wikidata.org/wiki/Q1441183"]
  },
  "La Tebaida": {
    sameAs: ["https://es.wikipedia.org/wiki/La_Tebaida", "https://www.wikidata.org/wiki/Q16939914"]
  },
  "Montenegro": {
    sameAs: ["https://es.wikipedia.org/wiki/Montenegro_(Quind%C3%ADo)", "https://www.wikidata.org/wiki/Q1441268"]
  },
  "Quimbaya": {
    sameAs: ["https://es.wikipedia.org/wiki/Quimbaya_(Quind%C3%ADo)", "https://www.wikidata.org/wiki/Q1441290"]
  },
  "Salento": {
    sameAs: ["https://es.wikipedia.org/wiki/Salento_(Quind%C3%ADo)", "https://www.wikidata.org/wiki/Q1441118"]
  },
  "Buenavista": {
    sameAs: ["https://es.wikipedia.org/wiki/Buenavista_(Quind%C3%ADo)", "https://www.wikidata.org/wiki/Q1066220"]
  },
  "Córdoba": {
    sameAs: ["https://es.wikipedia.org/wiki/C%C3%B3rdoba_(Quind%C3%ADo)", "https://www.wikidata.org/wiki/Q1066265"]
  },
  "Génova": {
    sameAs: ["https://es.wikipedia.org/wiki/G%C3%A9nova_(Quind%C3%ADo)", "https://www.wikidata.org/wiki/Q1441206"]
  },
  "Pijao": {
    sameAs: ["https://es.wikipedia.org/wiki/Pijao_(Quind%C3%ADo)", "https://www.wikidata.org/wiki/Q1441297"]
  }
};

// Corregir rutas de imágenes (usar WebP)
function getOptimalImagePath(imgPath) {
  if (!imgPath) return '';
  return imgPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
}

// Función para renderizar una tarjeta de negocio (HTML estático)
function renderBizCard(biz) {
  const municipioNombre = getMunicipioName(biz.municipio);
  const servicios = (biz.servicios || []).slice(0, 4).map(s => `<span class="biz-tag">${s}</span>`).join('');
  const nivelBadge = biz.nivel === 'premium' ? '⭐ Premium' : '✓ Verificado';
  const imgPath = getOptimalImagePath(biz.imagen || '');
  const imgTag = imgPath ? `<img src="${imgPath}" alt="${biz.nombre} en ${municipioNombre}, Departamento del Quindío, Colombia" class="biz-card-img" loading="lazy">` : '';
  
  return `
    <article class="biz-card" role="listitem" id="${biz.id}">
      <div class="biz-card-img-wrap">
        ${imgTag}
        <span class="biz-badge ${biz.nivel || 'estandar'}">${nivelBadge}</span>
      </div>
      <div class="biz-card-body">
        <div class="biz-tipo">${biz.tipo} · ${municipioNombre}, Departamento del Quindío</div>
        <h3>${biz.nombre}</h3>
        <p>${biz.desc || biz.descripcion || ''}</p>
        <div class="biz-servicios">${servicios}</div>
        <div class="biz-precio">💰 ${biz.precio || ''}</div>
        <div class="biz-actions">
          <a href="https://wa.me/${biz.whatsapp}?text=Hola%2C%20quiero%20contactar%20con%20${encodeURIComponent(biz.nombre)}" target="_blank" rel="noopener" class="btn-wa">💬 Contactar</a>
          <a href="${biz.maps}" target="_blank" rel="noopener" class="btn-maps">📍 Llegar</a>
          <a href="tel:${biz.telefono}" class="btn-tel">📞</a>
        </div>
      </div>
    </article>
  `;
}

// Helper para obtener nombre de municipio
function getMunicipioName(munId) {
  const mun = MUNICIPIOS.find(m => m.id === munId);
  return mun ? mun.nombre : munId;
}

// Función para generar Schema.org con Knowledge Graph y Speakable
function generarSchema(ruta, negociosFiltrados) {
  const kg = MUNICIPIOS_KG[ruta.municipio] || {};
  const itemListElements = negociosFiltrados.map((n, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": n.nombre,
    "url": `${ruta.url}.html#${n.id}`,
    "item": {
      "@type": ruta.tipo_schema,
      "name": n.nombre,
      "description": n.desc || n.descripcion,
      "telephone": n.telefono,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": ruta.municipio,
        "addressRegion": "Quindío",
        "addressCountry": "CO"
      }
    }
  }));

  return {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    "name": ruta.titulo,
    "description": ruta.meta_descripcion,
    "sameAs": kg.sameAs,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["#respuesta-directa-ia"]
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": `Los mejores ${ruta.categoria} en ${ruta.municipio}`,
      "description": ruta.meta_descripcion,
      "itemListElement": itemListElements
    }
  };
}

// Plantilla HTML base (con contenido estático completo)
function generarPagina(ruta) {
  const categoriaNegocio = CATEGORIA_NEGOCIOS_MAP[ruta.categoria];
  const municipioId = MUNICIPIOS.find(m => m.nombre === ruta.municipio)?.id || ruta.municipio.toLowerCase().replace(/\s/g, '-');
  const municipio = MUNICIPIOS.find(m => m.nombre === ruta.municipio) || { lat: 4.53, lng: -75.68, nombre: ruta.municipio };

  const negociosFiltrados = NEGOCIOS.filter(
    n => n.categoria === categoriaNegocio && n.municipio === municipioId
  );

  const emoji = CATEGORIAS_EMOJIS[ruta.categoria];
  const schema = generarSchema(ruta, negociosFiltrados);
  const cardsHTML = negociosFiltrados.map(renderBizCard).join('');
  const emptyState = negociosFiltrados.length ? '' : `
    <div class="no-results">
      <div class="icon">${emoji}</div>
      <p>Próximamente agregaremos negocios en esta categoría.</p>
    </div>
  `;

  // Contenido único por página para SEO
  const municipioDesc = municipio.desc || 'Descubre todo lo que este municipio tiene para ofrecer.';
  const municipioEmoji = municipio.emoji || '🌿';
  const distanciaDesdeArmenia = municipio.km ? `A ${municipio.km} km de Armenia, la capital del Departamento del Quindío, Colombia.` : '';
  
  // Respuesta directa para IA y búsquedas por voz (máx 160 caracteres)
  const respuestaDirecta = `En ${ruta.municipio}, Quindío, encontrarás ${titleCase(ruta.categoria.toLowerCase())} perfectos para tu viaje por el Eje Cafetero.`;
  
  // Contenido especial para Filandia y "La Casa de Encanto"
  const contenidoEncanto = ruta.municipio === 'Filandia' ? `
    <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); padding: 32px; border-radius: 16px; margin-bottom: 48px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); border: 2px solid #fbbf24;">
      <h2 style="color: #92400e; margin-bottom: 16px; font-size: 1.7rem;">🏠 La arquitectura que inspiró la casa de Encanto</h2>
      <p style="font-size: 1.1rem; color: #78350f; line-height: 1.8;">
        Filandia, conocida como el "Mirador del Quindío", cautiva a sus visitantes con su colorida arquitectura colonial, balcones llenos de flores y calles empedradas que parecen sacadas de un cuento de hadas. Esta belleza única fue la fuente de inspiración para la magnífica casa de la película Disney "Encanto".
      </p>
      <p style="font-size: 1rem; color: #78350f; line-height: 1.7; margin-top: 16px;">
        ¡Ven y descubre el turismo en Filandia Quindío! Aquí encontrarás rutas turísticas del Eje Cafetero, fincas cafeteras, glampings y todo lo que necesitas para vivir una experiencia inolvidable en el corazón del Paisaje Cultural Cafetero.
      </p>
    </div>
  ` : '';

  // Script para carga híbrida del mapa (solo al interactuar)
  const mapScript = `
    <script>
      let mapLoaded = false;
      const mapContainer = document.getElementById('mapa-interactivo');
      
      function loadMap() {
        if (mapLoaded) return;
        mapLoaded = true;
        
        // Cargar CSS de Leaflet
        const leafletCss = document.createElement('link');
        leafletCss.rel = 'stylesheet';
        leafletCss.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(leafletCss);
        
        // Cargar JS de Leaflet y luego inicializar mapa
        const leafletJs = document.createElement('script');
        leafletJs.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        leafletJs.onload = function() {
          const map = L.map('mapa-interactivo', { scrollWheelZoom: false }).setView([${municipio.lat}, ${municipio.lng}], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map);
          ${negociosFiltrados.filter(n => n.lat).map(n => `
            L.marker([${n.lat}, ${n.lng}]).addTo(map).bindPopup(
              \`<b>${n.nombre}</b><br>${n.tipo}<br>${n.precio}<br><a href="https://wa.me/${n.whatsapp}?text=Hola%2C%20quiero%20reservar" target="_blank">💬 Contactar</a>\`
            );
          `).join('')}
        };
        document.body.appendChild(leafletJs);
      }
      
      // Cargar mapa al pasar el mouse o tocar
      mapContainer.addEventListener('mouseover', loadMap, { once: true });
      mapContainer.addEventListener('touchstart', loadMap, { once: true });
      // Opcionalmente cargar después de 2 segundos para usabilidad
      setTimeout(loadMap, 2000);
    </script>
  `;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${ruta.titulo}</title>
  <meta name="description" content="${ruta.meta_descripcion}">
  <link rel="canonical" href="${ruta.url}.html">
  <!-- Preconectar y preload de assets críticos para WPO -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" href="assets/css/main.css" as="style">
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"></noscript>
  <!-- Cargar CSS principal -->
  <link rel="stylesheet" href="assets/css/main.css">
  <!-- Schema.org -->
  <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
  </script>
</head>
<body>
  <header class="page-hero">
    <h1>${emoji} ${titleCase(ruta.categoria)} en ${ruta.municipio}, Departamento del Quindío, Colombia</h1>
    <p>${ruta.meta_descripcion}</p>
  </header>
  
  <!-- Bloque de respuesta directa para IA y búsquedas por voz -->
  <div id="respuesta-directa-ia" style="display: none;">
    ${respuestaDirecta}
  </div>
  
  <div class="container">
    <!-- Contenido único por municipio para SEO -->
    <div style="background: white; padding: 32px; border-radius: 16px; margin-bottom: 48px; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
      <h2 style="color: #059669; margin-bottom: 16px; font-size: 1.8rem;">${municipioEmoji} ¿Por qué visitar ${ruta.municipio} en el Departamento del Quindío?</h2>
      <p style="font-size: 1.1rem; color: #333; line-height: 1.8;">
        ${municipioDesc} ${distanciaDesdeArmenia}
      </p>
      <p style="font-size: 1rem; color: #666; line-height: 1.7; margin-top: 16px;">
        Aquí encontrarás las mejores opciones de ${titleCase(ruta.categoria.toLowerCase())} para tu viaje por el Departamento del Quindío, Colombia, con información detallada, fotos reales y contacto directo por WhatsApp.
      </p>
    </div>
    ${contenidoEncanto}
    <div style="margin-bottom:48px"><div id="mapa-interactivo"></div></div>
    <h2 style="color: #059669; margin-bottom: 24px; font-size: 1.6rem;">${emoji} Mejores ${titleCase(ruta.categoria.toLowerCase())} en ${ruta.municipio}, Quindío</h2>
    <div id="cards" class="cards-grid" role="list" aria-live="polite">
      ${cardsHTML}
    </div>
    ${emptyState}
    <div class="cta-anunciate">
      <h2>¿Tienes un negocio en ${ruta.municipio}?</h2>
      <p>Publica tu negocio y recibe contacto directo de turistas sin comisiones.</p>
      <a href="anunciate.html" class="btn-cta">📣 Publicar mi negocio</a>
    </div>
  </div>
  <div class="banner-strip">
    <div class="banner-strip-inner">
      <span class="banner-strip-label">Aliados</span>
      <div class="banner-strip-track">
        <div class="banner-item"><img src="pautas/p13.png" alt="Anunciante" loading="lazy"></div>
        <div class="banner-item"><img src="pautas/p14.png" alt="Anunciante" loading="lazy"></div>
        <div class="banner-item"><img src="pautas/p15.png" alt="Anunciante" loading="lazy"></div>
        <div class="banner-item"><img src="pautas/p16.png" alt="Anunciante" loading="lazy"></div>
        <div class="banner-item"><img src="pautas/p17.png" alt="Anunciante" loading="lazy"></div>
        <div class="banner-item"><img src="pautas/p18.png" alt="Anunciante" loading="lazy"></div>
      </div>
    </div>
  </div>
  <footer>
    <div class="footer-grid">
      <div class="footer-col"><h4>🌿 Mapa Turístico</h4><p style="color:#6b7280;font-size:.9rem">La plataforma turística del Quindío.</p></div>
      <div class="footer-col"><h4>Navegación</h4><a href="index.html">Inicio</a><a href="alojamientos.html">Alojamientos</a><a href="sitios-turisticos.html">Sitios Turísticos</a><a href="anunciate.html">Anúnciate</a></div>
    </div>
    <div class="footer-bottom"><p>© 2026 www.mapaturisticodelquindio.com</p></div>
  </footer>
  <!-- Scripts al final del body -->
  <script src="assets/js/datos.js" defer></script>
  <script src="assets/js/nav.js" defer></script>
  ${mapScript}
</body>
</html>`;
}

// Generar todas las páginas y sitemap
function generarTodo() {
  const urls = [];
  rutasSeo.forEach(ruta => {
    const html = generarPagina(ruta);
    const filePath = path.join(__dirname, `${ruta.slug}.html`);
    fs.writeFileSync(filePath, html, 'utf8');
    urls.push(`${ruta.url}.html`);
    console.log(`Generado: ${ruta.slug}.html`);
  });

  // Actualizar sitemap.xml
  const sitemapPath = path.join(__dirname, 'sitemap.xml');
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.mapaturisticodelquindio.com/index.html</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://www.mapaturisticodelquindio.com/alojamientos.html</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://www.mapaturisticodelquindio.com/sitios-turisticos.html</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://www.mapaturisticodelquindio.com/alquiler-finca-hoteles.html</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://www.mapaturisticodelquindio.com/hoteles.html</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://www.mapaturisticodelquindio.com/agencias-operadoras-turisticas.html</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://www.mapaturisticodelquindio.com/parque-del-cafe.html</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.mapaturisticodelquindio.com/parque-los-arrieros.html</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.mapaturisticodelquindio.com/municipios-del-quindio.html</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.mapaturisticodelquindio.com/mapa-del-quindio.html</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.mapaturisticodelquindio.com/mapa-circasia.html</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.mapaturisticodelquindio.com/mapa-de-circasia-2025.html</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.mapaturisticodelquindio.com/contacto.html</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.mapaturisticodelquindio.com/anunciate.html</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
${urls.map(url => `  <url><loc>${url}</loc><changefreq>weekly</changefreq><priority>0.85</priority></url>`).join('\n')}
</urlset>`;
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
  console.log(`\nSitemap actualizado con ${urls.length} nuevas URLs!`);
  console.log(`Total de páginas generadas: ${urls.length}`);
}

generarTodo();
