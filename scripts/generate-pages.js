
const fs = require('fs');
const path = require('path');

const masterData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/master-data.json'), 'utf8')
);

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
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "${municipio.schema.type}",
    "name": "${municipio.nombre}",
    "description": "${municipio.descripcion}",
    "location": {
      "@type": "Place",
      "name": "Quindío, Colombia"
    },
    "url": "https://www.mapaturisticodelquindio.com/municipios/${municipio.slug}",
    "author": {
      "@type": "Organization",
      "name": "${municipio.author.name}",
      "url": "${municipio.author.url}"
    },
    "sameAs": "${municipio.schema.sameAs || ''}"
  }
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
  <footer class="footer">
    <img src="../assets/images/logo_mapa/logo.png" alt="Mapa Turístico del Quindío" class="footer-logo">
    <p>© 2026 www.mapaturisticodelquindio.com</p>
  </footer>
  <script src="../assets/js/app.js"></script>
</body>
</html>
  `,
  negocio: (negocio) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${negocio.nombre} - ${masterData.municipios.find(m => m.id === negocio.municipioId).nombre} | Mapa Turístico del Quindío</title>
  <meta name="description" content="${negocio.descripcionLong}">
  <meta name="keywords" content="${negocio.palabrasClave.join(', ')}">
  <link rel="canonical" href="https://www.mapaturisticodelquindio.com/negocios/${negocio.slug}">
  <link rel="stylesheet" href="../assets/css/main.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "${negocio.schema.type}",
    "name": "${negocio.nombre}",
    "description": "${negocio.descripcionLong}",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "${negocio.direccion}",
      "addressLocality": "${masterData.municipios.find(m => m.id === negocio.municipioId).nombre}",
      "addressRegion": "Quindío",
      "addressCountry": "CO"
    },
    "telephone": "${negocio.telefono}",
    "url": "${negocio.url}",
    "image": "${negocio.imagen}",
    "priceRange": "${negocio.schema.priceRange}",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": ${negocio.lat},
      "longitude": ${negocio.lng}
    },
    "author": {
      "@type": "Organization",
      "name": "${negocio.author.name}",
      "url": "${negocio.author.url}"
    },
    "aggregateRating": ${negocio.rating ? JSON.stringify({
      "@type": "AggregateRating",
      "ratingValue": negocio.rating.valor,
      "reviewCount": negocio.rating.cantidad
    }) : 'null'}
  }
  </script>
</head>
<body>
  <script src="../assets/js/nav.js"></script>
  <div class="container">
    <h1>${negocio.nombre}</h1>
    <div style="padding:32px;background:white;border-radius:24px;box-shadow:0 8px 32px rgba(16,185,129,0.12);">
      <img src="${negocio.imagen}" alt="${negocio.nombre}" style="width:100%;border-radius:16px;">
      <p style="margin-top:16px;color:#6b7280;">${negocio.descripcionLong}</p>
    </div>
  </div>
  <script src="../assets/js/app.js"></script>
</body>
</html>
  `
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
