const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

console.log('🔍 DIAGNÓSTICO DE INDEXACIÓN - Google Search Console\n');
console.log('=' .repeat(60));

const publicDir = path.join(__dirname, '../');
const htmlFiles = [];

// Encontrar todas las páginas HTML
function findHTML(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && !['node_modules', '.git', 'assets', 'data', 'proposed_patches', 'logo_mapa', 'planes_turisticos_transporte_especial', 'planes_turisticos_transporte_taxi', 'pautas_publicitarias', 'analytics'].includes(entry.name)) {
      findHTML(fullPath);
    } else if (entry.name.endsWith('.html')) {
      htmlFiles.push(fullPath);
    }
  }
}
findHTML(publicDir);

// 1. Verificar páginas con noindex
console.log('\n📋 1. PÁGINAS CON ETIQUETA NOINDEX:');
const noindexPages = [];
htmlFiles.forEach(filePath => {
  const html = fs.readFileSync(filePath, 'utf8');
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const relativePath = path.relative(publicDir, filePath);
  
  const robots = doc.querySelector('meta[name="robots"]');
  const robotsContent = robots ? robots.getAttribute('content') || '' : '';
  if (/noindex/i.test(robotsContent)) {
    noindexPages.push(relativePath);
    console.log(`   ❌ ${relativePath}`);
  }
});
if (noindexPages.length === 0) {
  console.log('   ✅ No hay páginas con noindex');
}

// 2. Verificar sitemap.xml
console.log('\n📋 2. SITEMAP.XML:');
const sitemapPath = path.join(publicDir, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const urlCount = (sitemapContent.match(/<loc>/g) || []).length;
  console.log(`   ✅ Sitemap existe con ${urlCount} URLs`);
  
  // Verificar que index.html esté en el sitemap
  if (!sitemapContent.includes('https://www.mapaturisticodelquindio.com/')) {
    console.log('   ⚠️ La URL principal (/) NO está en el sitemap');
  } else {
    console.log('   ✅ URL principal está en el sitemap');
  }
} else {
  console.log('   ❌ No existe sitemap.xml');
}

// 3. Verificar robots.txt
console.log('\n📋 3. ROBOTS.TXT:');
const robotsPath = path.join(publicDir, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  console.log('   ✅ Robots.txt existe:');
  console.log(robotsContent.split('\n').map(l => '   ' + l).join('\n'));
  
  // Verificar Disallow
  if (/Disallow:\s*\//i.test(robotsContent) && !/Allow:\s*\//i.test(robotsContent)) {
    console.log('   ❌ WARNING: Todo el sitio está bloqueado');
  }
} else {
  console.log('   ❌ No existe robots.txt');
}

// 4. Verificar enlaces internos y archivos existentes
console.log('\n📋 4. VERIFICACIÓN DE ARCHIVOS HTML EXISTENTES VS SITEMAP:');
const sitemapUrls = [];
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const locMatches = sitemapContent.match(/<loc>([^<]+)<\/loc>/g) || [];
  locMatches.forEach(match => {
    const url = match.replace(/<\/?loc>/g, '');
    sitemapUrls.push(url);
  });
}

const existingUrls = htmlFiles.map(filePath => {
  const relativePath = path.relative(publicDir, filePath).replace(/\\/g, '/');
  return `https://www.mapaturisticodelquindio.com/${relativePath}`;
});

// URLs en sitemap pero no existen físicamente
const missingFiles = sitemapUrls.filter(url => {
  const relativePath = url.replace('https://www.mapaturisticodelquindio.com/', '');
  return !fs.existsSync(path.join(publicDir, relativePath));
});

if (missingFiles.length > 0) {
  console.log(`   ❌ ${missingFiles.length} URLs en sitemap pero archivos no existen (posibles 404):`);
  missingFiles.forEach(url => console.log(`      - ${url}`));
} else {
  console.log('   ✅ Todas las URLs del sitemap tienen archivo físico');
}

console.log(`\n📊 RESUMEN:`);
console.log(`   - Total páginas HTML: ${htmlFiles.length}`);
console.log(`   - URLs en sitemap: ${sitemapUrls.length}`);
console.log(`   - Páginas con noindex: ${noindexPages.length}`);
console.log(`   - Posibles 404: ${missingFiles.length}`);
console.log('\n✅ Diagnóstico completado!');
