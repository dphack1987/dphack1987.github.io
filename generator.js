const fs = require('fs');
const path = require('path');

// Función para capitalizar texto (como .title() en Python)
function titleCase(str) {
  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// 1. Cargar datos de negocios y municipios
const dataContent = fs.readFileSync(path.join(__dirname, 'assets', 'js', 'datos.js'), 'utf8');
const wrapped = `
${dataContent}
module.exports = { MUNICIPIOS, NEGOCIOS };
`;
const tempFile = path.join(__dirname, 'temp-datos.js');
fs.writeFileSync(tempFile, wrapped, 'utf8');
const { MUNICIPIOS, NEGOCIOS } = require(tempFile);
fs.unlinkSync(tempFile);

// 2. Cargar rutas SEO generadas
const rutasSeo = JSON.parse(fs.readFileSync(path.join(__dirname, 'rutas_seo.json'), 'utf8'));

// 3. Mapear categorías de rutasSeo a categorías de negocios (para filtrar correctamente)
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

// 4. Corregir rutas de imágenes para páginas generadas
NEGOCIOS.forEach(n => {
  if (n.imagen) {
    n.imagen = n.imagen.replace('./assets/images/', 'assets/images/');
  }
});

// 5. Función para generar Schema.org
function generarSchema(ruta, negociosFiltrados) {
  const itemListElements = negociosFiltrados.map((n, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": n.nombre,
    "url": `${ruta.url}#${n.id}`,
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
    "mainEntity": {
      "@type": "ItemList",
      "name": `Los mejores ${ruta.categoria} en ${ruta.municipio}`,
      "description": ruta.meta_descripcion,
      "itemListElement": itemListElements
    }
  };
}

// 6. Plantilla HTML base
function generarPagina(ruta) {
  const categoriaNegocio = CATEGORIA_NEGOCIOS_MAP[ruta.categoria];
  const municipioId = MUNICIPIOS.find(m => m.nombre === ruta.municipio)?.id || ruta.municipio.toLowerCase().replace(/\s/g, '-');
  const municipio = MUNICIPIOS.find(m => m.nombre === ruta.municipio) || { lat: 4.53, lng: -75.68, nombre: ruta.municipio };

  const negociosFiltrados = NEGOCIOS.filter(
    n => n.categoria === categoriaNegocio && n.municipio === municipioId
  );

  const emoji = CATEGORIAS_EMOJIS[ruta.categoria];
  const schema = generarSchema(ruta, negociosFiltrados);

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${ruta.titulo}</title>
  <meta name="description" content="${ruta.meta_descripcion}">
  <link rel="canonical" href="${ruta.url}.html">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
  <link rel="stylesheet" href="assets/css/main.css">
  <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
  </script>
</head>
<body>
  <header class="page-hero">
    <h1>${emoji} ${titleCase(ruta.categoria)} en ${ruta.municipio}</h1>
    <p>${ruta.meta_descripcion}</p>
  </header>
  <div class="container">
    <div style="margin-bottom:48px"><div id="mapa-interactivo"></div></div>
    <div id="cards" class="cards-grid" role="list" aria-live="polite"></div>
    <div id="empty" class="no-results" style="${negociosFiltrados.length ? 'display:none' : ''}">
      <div class="icon">${emoji}</div>
      <p>Próximamente agregaremos negocios en esta categoría.</p>
    </div>
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
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script src="assets/js/datos.js"></script>
  <script src="assets/js/nav.js"></script>
  <script>
    const RUTA_SLUG = '${ruta.slug}';
    const CATEGORIA_RUTA = '${ruta.categoria}';
    const MUNICIPIO_RUTA = '${ruta.municipio}';
    const CATEGORIA_NEGOCIO = '${categoriaNegocio}';
    const MUNICIPIO_ID = '${municipioId}';
    let todos = NEGOCIOS.filter(n => n.categoria === CATEGORIA_NEGOCIO && n.municipio === MUNICIPIO_ID);
    let lista = [...todos];
    const map = L.map('mapa-interactivo', { scrollWheelZoom: false }).setView([${municipio.lat}, ${municipio.lng}], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map);
    todos.forEach(n => {
      if (!n.lat) return;
      L.marker([n.lat, n.lng]).addTo(map).bindPopup(
        \`<b>\${n.nombre}</b><br>\${n.tipo}<br>\${n.precio}<br><a href="https://wa.me/\${n.whatsapp}?text=Hola%2C%20quiero%20reservar" target="_blank">💬 Contactar</a>\`
      );
    });
    function render(l) {
      const c = document.getElementById('cards'), e = document.getElementById('empty');
      c.innerHTML = '';
      if (!l.length) { e.style.display = 'block'; return; }
      e.style.display = 'none';
      l.forEach(n => {
        const d = document.createElement('article');
        d.className = 'biz-card';
        d.setAttribute('role', 'listitem');
        d.id = n.id;
        d.innerHTML = \`<div class="biz-card-img-wrap"><img src="\${n.imagen}" alt="\${n.nombre}" class="biz-card-img" loading="lazy"><span class="biz-badge \${n.nivel}">\${n.nivel === 'premium' ? '⭐ Premium' : '✓ Verificado'}</span></div>
        <div class="biz-card-body"><div class="biz-tipo">\${n.tipo} · \${getMunicipioById(n.municipio)?.nombre}</div><h3>\${n.nombre}</h3><p>\${n.desc || n.descripcion}</p>
        <div class="biz-servicios">\${(n.servicios || []).slice(0, 4).map(s => \`<span class="biz-tag">\${s}</span>\`).join('')}</div>
        <div class="biz-precio">💰 \${n.precio}</div>
        <div class="biz-actions"><a href="https://wa.me/\${n.whatsapp}?text=Hola%2C%20quiero%20contactar%20con%20\${encodeURIComponent(n.nombre)}" target="_blank" rel="noopener" class="btn-wa">💬 Contactar</a><a href="\${n.maps}" target="_blank" rel="noopener" class="btn-maps">📍 Llegar</a><a href="tel:\${n.telefono}" class="btn-tel">📞</a></div></div>\`;
        c.appendChild(d);
      });
    }
    render(lista);
  </script>
</body>
</html>`;
}

// 7. Generar todas las páginas y sitemap
function generarTodo() {
  const urls = [];

  // Generar cada página desde rutasSeo
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
  console.log(`\nTotal de páginas generadas: ${urls.length}`);
}

generarTodo();
