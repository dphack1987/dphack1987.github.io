#!/usr/bin/env node

/**
 * 🔍 VALIDADOR DE PÁGINAS GENERADAS
 * 
 * Valida:
 * ✅ Que todas las páginas HTML existan
 * ✅ Que todos los links internos sean válidos
 * ✅ Que no haya broken links (404s)
 * ✅ Que las secciones de negocios cercanos existan
 * ✅ Que los atributos data-* sean correctos
 * ✅ Que no haya duplicados
 */

const fs = require('fs');
const path = require('path');

// Colores para terminal
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m'
};

// Estadísticas
const stats = {
  totalPages: 0,
  pagesChecked: 0,
  linksChecked: 0,
  brokenLinks: [],
  missingFiles: [],
  validationErrors: [],
  warnings: []
};

// ─────────────────────────────────────────────────────────────

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function findAllHtmlFiles() {
  const files = [];
  
  // Buscar en /municipios/
  const municipiosDir = path.join(__dirname, '../municipios');
  if (fs.existsSync(municipiosDir)) {
    fs.readdirSync(municipiosDir)
      .filter(f => f.endsWith('.html'))
      .forEach(f => {
        files.push({ path: path.join(municipiosDir, f), type: 'municipio' });
      });
  }
  
  // Buscar en /negocios/
  const negociosDir = path.join(__dirname, '../negocios');
  if (fs.existsSync(negociosDir)) {
    fs.readdirSync(negociosDir)
      .filter(f => f.endsWith('.html'))
      .forEach(f => {
        files.push({ path: path.join(negociosDir, f), type: 'negocio' });
      });
  }
  
  return files;
}

function validatePageStructure(filePath, type) {
  const content = fs.readFileSync(filePath, 'utf8');
  const filename = path.basename(filePath);
  const errors = [];
  
  // Validar que tiene estructura básica
  if (!content.includes('<html')) {
    errors.push(`${filename}: No tiene tag <html>`);
  }
  if (!content.includes('<body')) {
    errors.push(`${filename}: No tiene tag <body>`);
  }
  
  // Validar atributos data-* (solo negocios)
  if (type === 'negocio') {
    if (!content.includes('data-negocio-slug')) {
      errors.push(`${filename}: Falta atributo data-negocio-slug`);
    }
    if (!content.includes('data-municipio')) {
      errors.push(`${filename}: Falta atributo data-municipio`);
    }
  }
  
  // Validar que tiene sección de negocios cercanos (si es negocio)
  if (type === 'negocio') {
    if (!content.includes('Más') || !content.includes('cercanos')) {
      // Es un warning, no error crítico
      stats.warnings.push(`${filename}: Podría no tener sección de negocios cercanos`);
    }
  }
  
  // Validar que tiene analytics-sheets.js
  if (!content.includes('analytics-sheets.js')) {
    stats.warnings.push(`${filename}: No carga analytics-sheets.js`);
  }
  
  return errors;
}

function extractLinks(filePath, content) {
  const links = [];
  const regex = /href=["']([^"']+)["']/g;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    const href = match[1];
    
    // Filtrar solo links internos relativos
    if (href.startsWith('/') || href.startsWith('../') || !href.startsWith('http')) {
      links.push({
        href: href,
        fullPath: path.resolve(path.dirname(filePath), href)
      });
    }
  }
  
  return links;
}

function validateLinks(filePath, type) {
  const content = fs.readFileSync(filePath, 'utf8');
  const filename = path.basename(filePath);
  const links = extractLinks(filePath, content);
  const errors = [];
  
  links.forEach(link => {
    // Normalizar path (remover #anchors)
    const cleanPath = link.fullPath.split('#')[0];
    
    // No validar links a whatsapp, email, etc.
    if (link.href.includes('wa.me') || link.href.includes('mailto:')) {
      return;
    }
    
    // Validar que el archivo existe
    if (!fs.existsSync(cleanPath)) {
      errors.push({
        file: filename,
        link: link.href,
        message: `Broken link: ${link.href}`
      });
      stats.brokenLinks.push({
        from: filename,
        to: link.href
      });
    }
  });
  
  return errors;
}

function validateDataIntegrity() {
  const files = findAllHtmlFiles();
  const slugs = new Set();
  const duplicates = [];
  
  files.forEach(f => {
    const content = fs.readFileSync(f.path, 'utf8');
    const match = content.match(/data-negocio-slug=["']([^"']+)["']/);
    
    if (match) {
      const slug = match[1];
      if (slugs.has(slug)) {
        duplicates.push(slug);
      }
      slugs.add(slug);
    }
  });
  
  if (duplicates.length > 0) {
    stats.validationErrors.push(`Slugs duplicados: ${duplicates.join(', ')}`);
  }
  
  return duplicates.length === 0;
}

function generateReport() {
  const files = findAllHtmlFiles();
  
  log('\n═════════════════════════════════════════════════════════════', 'blue');
  log('📊 REPORTE DE VALIDACIÓN DE PÁGINAS', 'blue');
  log('═════════════════════════════════════════════════════════════', 'blue');
  
  stats.totalPages = files.length;
  
  // Validar cada página
  log(`\n🔍 Validando ${files.length} páginas...`);
  
  files.forEach((file, index) => {
    const errors = validatePageStructure(file.path, file.type);
    const linkErrors = validateLinks(file.path, file.type);
    
    if (errors.length > 0 || linkErrors.length > 0) {
      stats.validationErrors.push(...errors);
      stats.validationErrors.push(...linkErrors);
    }
    
    stats.pagesChecked++;
    stats.linksChecked += linkErrors.length;
  });
  
  // Validar integridad de datos
  log('\n🔐 Validando integridad de datos...');
  const dataOk = validateDataIntegrity();
  
  // Resultados
  log('\n─────────────────────────────────────────────────────────────', 'blue');
  log('RESULTADOS', 'blue');
  log('─────────────────────────────────────────────────────────────', 'blue');
  
  log(`\n📄 Páginas procesadas: ${stats.pagesChecked} / ${stats.totalPages}`);
  
  if (stats.brokenLinks.length > 0) {
    log(`\n❌ BROKEN LINKS ENCONTRADOS: ${stats.brokenLinks.length}`, 'red');
    stats.brokenLinks.forEach(link => {
      log(`   ${link.from} → ${link.to}`, 'red');
    });
  } else {
    log(`\n✅ No hay broken links`, 'green');
  }
  
  if (stats.validationErrors.length > 0) {
    log(`\n⚠️  ERRORES DE VALIDACIÓN: ${stats.validationErrors.length}`, 'yellow');
    stats.validationErrors.forEach(err => {
      const message = typeof err === 'string' ? err : err.message;
      log(`   ${message}`, 'yellow');
    });
  } else {
    log(`\n✅ Todas las páginas son válidas`, 'green');
  }
  
  if (stats.warnings.length > 0) {
    log(`\n⚠️  ADVERTENCIAS: ${stats.warnings.length}`, 'yellow');
    stats.warnings.slice(0, 5).forEach(warn => {
      log(`   ${warn}`, 'yellow');
    });
    if (stats.warnings.length > 5) {
      log(`   ... y ${stats.warnings.length - 5} más`, 'yellow');
    }
  }
  
  // Resumen
  log('\n─────────────────────────────────────────────────────────────', 'blue');
  const passed = stats.validationErrors.length === 0 && stats.brokenLinks.length === 0;
  
  if (passed) {
    log('✅ VALIDACIÓN EXITOSA', 'green');
    log('Todas las páginas están correctas y listas para producción', 'green');
  } else {
    log('❌ VALIDACIÓN CON ERRORES', 'red');
    log(`Necesitas corregir ${stats.brokenLinks.length} broken links y ${stats.validationErrors.length} errores`, 'red');
  }
  
  log('─────────────────────────────────────────────────────────────', 'blue');
  
  // Estadísticas generales
  log('\n📈 ESTADÍSTICAS GENERALES', 'blue');
  log(`   Total de páginas: ${stats.totalPages}`);
  log(`   Páginas sin errores: ${stats.totalPages - stats.validationErrors.length}`);
  log(`   Links validados: ${stats.linksChecked}`);
  log(`   Porcentaje de éxito: ${((stats.totalPages - stats.validationErrors.length) / stats.totalPages * 100).toFixed(1)}%`);
  
  log('\n');
  
  process.exit(passed ? 0 : 1);
}

// ─────────────────────────────────────────────────────────────

// Ejecutar validación
if (require.main === module) {
  generateReport();
}

module.exports = {
  findAllHtmlFiles,
  validatePageStructure,
  validateLinks,
  validateDataIntegrity
};
