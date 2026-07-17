const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../');
const sitemapPath = path.join(publicDir, 'sitemap.xml');

console.log('🔍 IDENTIFICANDO PÁGINAS HTML QUE NO ESTÁN EN EL SITEMAP\n');
console.log('='.repeat(70));

// 1. Obtener todas las páginas HTML del proyecto
const htmlFiles = [];
function findHTML(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip directories that shouldn't be indexed
      if (!['node_modules', '.git', 'assets', 'data', 'proposed_patches', 'logo_mapa', 
            'planes_turisticos_transporte_especial', 'planes_turisticos_transporte_taxi', 
            'pautas_publicitarias', 'analytics'].includes(entry.name)) {
        findHTML(fullPath);
      }
    } else if (entry.name.endsWith('.html')) {
      const relativePath = path.relative(publicDir, fullPath).replace(/\\/g, '/');
      htmlFiles.push(relativePath);
    }
  }
}
findHTML(publicDir);

// 2. Obtener todas las URLs del sitemap
const sitemapUrls = [];
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const locMatches = sitemapContent.match(/<loc>([^<]+)<\/loc>/g) || [];
  locMatches.forEach(match => {
    const url = match.replace(/<\/?loc>/g, '');
    const relativePath = url.replace('https://www.mapaturisticodelquindio.com/', '');
    sitemapUrls.push(relativePath || 'index.html');
  });
}

// 3. Identificar páginas que NO están en el sitemap
const missingFromSitemap = htmlFiles.filter(file => {
  // Convertir paths a formato sitemap
  let sitemapFormat = file;
  if (file === 'index.html') sitemapFormat = '';
  
  return !sitemapUrls.includes(file) && !sitemapUrls.includes(sitemapFormat);
});

console.log(`\n📊 RESUMEN:`);
console.log(`   - Total páginas HTML: ${htmlFiles.length}`);
console.log(`   - URLs en sitemap: ${sitemapUrls.length}`);
console.log(`   - Páginas NO en sitemap: ${missingFromSitemap.length}`);

if (missingFromSitemap.length > 0) {
  console.log(`\n📋 PÁGINAS QUE NO ESTÁN EN EL SITEMAP:`);
  missingFromSitemap.forEach((file, index) => {
    console.log(`   ${index + 1}. ${file}`);
  });
}

console.log('\n✅ Análisis completado!');
