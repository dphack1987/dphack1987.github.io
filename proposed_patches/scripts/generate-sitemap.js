const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.mapaturisticodelquindio.com';
const OUTPUT_PATH = path.join(__dirname, '../../proposed_patches_sitemap.xml');

// Helper to filter unwanted slugs/paths
const isAllowedPath = (p) => {
  if (!p) return false;
  const lower = p.toLowerCase();
  if (lower.includes('copia') || lower.includes('sitio-liberado')) return false;
  if (lower.startsWith('en/') || lower.startsWith('/en/')) return false;
  return true;
};

// Load static pages from original script but filter
const STATIC_PAGES = [
  '',
  'alojamientos.html',
  'agencias-operadoras-turisticas.html',
  'alquiler-finca-hoteles.html',
  'anunciate.html',
  'empresas-de-transporte.html',
  'finca-para-alquilar-quindio.html',
  'hospedaje-armenia.html',
  'mapa-de-calarca-2026.html',
  'mapa-de-circasia-2025.html',
  'mapa-del-quindio.html',
  'municipios-del-quindio.html',
  'pauta.html',
  'quindio-comercial.html',
  'reservar-hotel-quindio.html',
  'sitios-turisticos.html',
  'top-pueblos.html',
  'transporte-aeropuerto-armenia.html'
].filter(p => isAllowedPath(p));

const staticUrls = STATIC_PAGES.map(page => {
  const loc = page === '' ? BASE_URL : `${BASE_URL}/${page}`;
  let lastmod = new Date().toISOString().split('T')[0];
  const filePath = path.join(__dirname, '../../', page || 'index.html');
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    lastmod = stats.mtime.toISOString().split('T')[0];
  }
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${page === '' ? '1.0' : '0.9'}</priority>\n  </url>`;
});

let municipioUrls = [];
const masterDataPath = path.join(__dirname, '../../data/master-data.json');
if (fs.existsSync(masterDataPath)) {
  const masterData = JSON.parse(fs.readFileSync(masterDataPath, 'utf8'));
  if (masterData.municipios && Array.isArray(masterData.municipios)) {
    municipioUrls = masterData.municipios.filter(m => isAllowedPath(m.slug)).map(muni => {
      const loc = `${BASE_URL}/municipios/${muni.slug}.html`;
      const filePath = path.join(__dirname, '../../municipios/', `${muni.slug}.html`);
      let lastmod = new Date().toISOString().split('T')[0];
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        lastmod = stats.mtime.toISOString().split('T')[0];
      }
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>`;
    });
  }
}

let negocioUrls = [];
if (fs.existsSync(masterDataPath)) {
  const masterData = JSON.parse(fs.readFileSync(masterDataPath, 'utf8'));
  if (masterData.negocios && Array.isArray(masterData.negocios)) {
    negocioUrls = masterData.negocios.filter(n => isAllowedPath(n.slug)).map(negocio => {
      const loc = `${BASE_URL}/negocios/${negocio.slug}.html`;
      const filePath = path.join(__dirname, '../../negocios/', `${negocio.slug}.html`);
      let lastmod = new Date().toISOString().split('T')[0];
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        lastmod = stats.mtime.toISOString().split('T')[0];
      }
      if (negocio.fechaActualizacion) lastmod = negocio.fechaActualizacion;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
    });
  }
}

const allUrls = [...staticUrls, ...municipioUrls, ...negocioUrls];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allUrls.join('\n')}\n</urlset>`;

fs.writeFileSync(OUTPUT_PATH, sitemap);
console.log('✅ Proposed sitemap generado en:', OUTPUT_PATH);
console.log('📄 Total de URLs:', allUrls.length);
