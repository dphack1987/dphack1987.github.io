
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom'); // npm install jsdom

console.log('🔍 Validando SEO de las páginas...\n');
const errors = [];
const warnings = [];

// Leer todas las páginas HTML
const publicDir = path.join(__dirname, '../');
const htmlFiles = [];
function findHTML(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && !['node_modules', '.git', 'assets', 'data', 'proposed_patches', 'backups'].includes(entry.name)) {
      findHTML(fullPath);
    } else if (entry.name.endsWith('.html')) {
      htmlFiles.push(fullPath);
    }
  }
}
findHTML(publicDir);

htmlFiles.forEach(filePath => {
  const html = fs.readFileSync(filePath, 'utf8');
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const relativePath = path.relative(publicDir, filePath);

  // Validar title
  const title = doc.querySelector('title');
  if (!title || title.textContent.trim().length < 10) {
    errors.push(`${relativePath}: Title debe tener al menos 10 caracteres`);
  } else if (title.textContent.length > 60) {
    warnings.push(`${relativePath}: Title excede 60 caracteres (${title.textContent.length})`);
  }

  // Validar meta description
  const metaDesc = doc.querySelector('meta[name="description"]');
  if (!metaDesc || metaDesc.getAttribute('content').length < 50) {
    errors.push(`${relativePath}: Meta description debe tener al menos 50 caracteres`);
  } else if (metaDesc.getAttribute('content').length > 160) {
    warnings.push(`${relativePath}: Meta description excede 160 caracteres`);
  }

  // Validar h1
  const h1 = doc.querySelector('h1');
  if (!h1) {
    errors.push(`${relativePath}: Falta etiqueta H1`);
  }

  // Validar canonical
  const canonical = doc.querySelector('link[rel="canonical"]');
  if (!canonical) {
    warnings.push(`${relativePath}: Falta enlace canónico`);
  }

  // Validar Schema JSON-LD
  const schema = doc.querySelector('script[type="application/ld+json"]');
  if (!schema) {
    warnings.push(`${relativePath}: Falta Schema JSON-LD`);
  }
});

console.log(`📄 Analizadas ${htmlFiles.length} páginas`);

if (warnings.length > 0) {
  console.log('\n⚠️ Warnings:');
  warnings.forEach(w => console.log(`  - ${w}`));
}

if (errors.length > 0) {
  console.error('\n❌ Errores de SEO:');
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
} else {
  console.log('\n✅ Todas las páginas pasan la validación SEO!');
  process.exit(0);
}
