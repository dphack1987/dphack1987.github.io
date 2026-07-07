
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.mapaturisticodelquindio.com';
const DATE = new Date().toISOString().split('T')[0];
const OUTPUT_PATH = path.join(__dirname, '../sitemap.xml');

// Archivos HTML estáticos del sitio
const STATIC_PAGES = [
  '', // Index
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
];

// Generar URLs para páginas estáticas
const staticUrls = STATIC_PAGES.map(page => {
  const loc = page === '' ? BASE_URL : `${BASE_URL}/${page}`;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${DATE}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;
});

// Cargar municipios desde data/master-data.json si existe
let municipioUrls = [];
const masterDataPath = path.join(__dirname, '../data/master-data.json');
if (fs.existsSync(masterDataPath)) {
  const masterData = JSON.parse(fs.readFileSync(masterDataPath, 'utf8'));
  if (masterData.municipios && Array.isArray(masterData.municipios)) {
    municipioUrls = masterData.municipios.map(muni => {
      const loc = `${BASE_URL}/municipios/${muni.slug}.html`;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${DATE}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });
  }
}

// Cargar negocios desde data/master-data.json si existe
let negocioUrls = [];
if (fs.existsSync(masterDataPath)) {
  const masterData = JSON.parse(fs.readFileSync(masterDataPath, 'utf8'));
  if (masterData.negocios && Array.isArray(masterData.negocios)) {
    negocioUrls = masterData.negocios.map(negocio => {
      const loc = `${BASE_URL}/negocios/${negocio.slug}.html`;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${DATE}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });
  }
}

// Combinar todas las URLs
const allUrls = [...staticUrls, ...municipioUrls, ...negocioUrls];

// Generar el sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.join('\n')}
</urlset>`;

// Escribir el sitemap a disco
fs.writeFileSync(OUTPUT_PATH, sitemap);
console.log('✅ Sitemap generado exitosamente en:', OUTPUT_PATH);
console.log('📄 Total de URLs:', allUrls.length);
