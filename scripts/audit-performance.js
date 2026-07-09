#!/usr/bin/env node

/**
 * ⚡ AUDITOR DE PERFORMANCE
 * 
 * Analiza:
 * ✅ Tamaño de archivos HTML
 * ✅ Compresión posible
 * ✅ Imágenes no optimizadas
 * ✅ CSS/JS inline vs externo
 * ✅ Métricas de velocidad
 */

const fs = require('fs');
const path = require('path');

// Colores para terminal
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  gray: '\x1b[90m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function analyzePage(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const stats = fs.statSync(filePath);
  const filename = path.basename(filePath);
  
  const analysis = {
    filename,
    size: stats.size,
    lines: content.split('\n').length,
    hasCss: (content.match(/<style[\s>]/g) || []).length,
    hasJs: (content.match(/<script[\s>]/g) || []).length,
    hasImages: (content.match(/<img[\s]/g) || []).length,
    hasLazyLoad: content.includes('loading="lazy"'),
    hasWebp: content.includes('.webp'),
    inlineSize: 0,
    externalScripts: [],
    inlineCss: 0,
    inlineJs: 0,
    recommendations: []
  };
  
  // Analizar CSS inline
  const cssMatches = content.match(/<style[^>]*>([\s\S]*?)<\/style>/g) || [];
  cssMatches.forEach(match => {
    analysis.inlineCss += match.length;
  });
  
  // Analizar JS inline
  const jsMatches = content.match(/<script[^>]*>([\s\S]*?)<\/script>/g) || [];
  jsMatches.forEach(match => {
    if (!match.includes('application/ld+json')) {
      analysis.inlineJs += match.length;
    }
  });
  
  // Buscar scripts externos
  const scriptSrcMatches = content.match(/<script[^>]*src=["']([^"']+)["'][^>]*>/g) || [];
  analysis.externalScripts = scriptSrcMatches.map(s => {
    const match = s.match(/src=["']([^"']+)["']/);
    return match ? match[1] : '';
  }).filter(s => s);
  
  // Generar recomendaciones
  if (analysis.size > 500000) {
    analysis.recommendations.push({
      severity: 'warning',
      message: `Archivo muy grande (${formatBytes(analysis.size)}). Considera dividir en múltiples archivos.`
    });
  }
  
  if (analysis.inlineJs > 50000) {
    analysis.recommendations.push({
      severity: 'warning',
      message: `Mucho JavaScript inline (${formatBytes(analysis.inlineJs)}). Considera extraer a archivo externo.`
    });
  }
  
  if (analysis.inlineCss > 30000) {
    analysis.recommendations.push({
      severity: 'info',
      message: `Mucho CSS inline (${formatBytes(analysis.inlineCss)}). Considera extraer a archivo externo.`
    });
  }
  
  if (!analysis.hasWebp && analysis.hasImages > 0) {
    analysis.recommendations.push({
      severity: 'warning',
      message: 'No hay imágenes en formato WebP. Considera convertir JPG/PNG a WebP para mejor compresión.'
    });
  }
  
  if (!analysis.hasLazyLoad && analysis.hasImages > 3) {
    analysis.recommendations.push({
      severity: 'info',
      message: 'No hay lazy loading en imágenes. Agrega loading="lazy" para mejorar performance.'
    });
  }
  
  if (analysis.externalScripts.length === 0 && analysis.hasJs > 0) {
    analysis.recommendations.push({
      severity: 'info',
      message: 'Todo JavaScript está inline. Considera crear archivo externo para mejor caché.'
    });
  }
  
  return analysis;
}

function generateReport() {
  log('\n═════════════════════════════════════════════════════════════', 'blue');
  log('⚡ AUDITORÍA DE PERFORMANCE', 'blue');
  log('═════════════════════════════════════════════════════════════', 'blue');
  
  const negociosDir = path.join(__dirname, '../negocios');
  const files = fs.readdirSync(negociosDir)
    .filter(f => f.endsWith('.html'))
    .slice(0, 10); // Analizar primeros 10 para no ser demasiado lento
  
  const analyses = files.map(f => analyzePage(path.join(negociosDir, f)));
  
  // Estadísticas generales
  const totalSize = analyses.reduce((sum, a) => sum + a.size, 0);
  const avgSize = totalSize / analyses.length;
  const totalImages = analyses.reduce((sum, a) => sum + a.hasImages, 0);
  const totalInlineJs = analyses.reduce((sum, a) => sum + a.inlineJs, 0);
  
  log('\n📊 ESTADÍSTICAS GENERALES', 'blue');
  log(`   Páginas analizadas: ${analyses.length}`);
  log(`   Tamaño total: ${formatBytes(totalSize)}`);
  log(`   Tamaño promedio: ${formatBytes(avgSize)}`);
  log(`   Imágenes totales: ${totalImages}`);
  log(`   JavaScript inline: ${formatBytes(totalInlineJs)}`);
  
  // Páginas más grandes
  log('\n📈 PÁGINAS MÁS GRANDES', 'blue');
  const sorted = [...analyses].sort((a, b) => b.size - a.size);
  sorted.slice(0, 5).forEach((a, i) => {
    const color = a.size > 500000 ? 'red' : a.size > 300000 ? 'yellow' : 'green';
    log(`   ${i + 1}. ${a.filename}: ${formatBytes(a.size)}`, color);
  });
  
  // Recomendaciones agregadas
  const allRecommendations = analyses.flatMap(a => 
    a.recommendations.map(r => ({ ...r, file: a.filename }))
  );
  
  if (allRecommendations.length > 0) {
    log('\n💡 RECOMENDACIONES', 'yellow');
    allRecommendations.slice(0, 10).forEach(r => {
      const color = r.severity === 'warning' ? 'red' : 'yellow';
      log(`   [${r.severity.toUpperCase()}] ${r.file}: ${r.message}`, color);
    });
    if (allRecommendations.length > 10) {
      log(`   ... y ${allRecommendations.length - 10} más recomendaciones`, 'gray');
    }
  }
  
  // Oportunidades de compresión
  log('\n🗜️  OPORTUNIDADES DE COMPRESIÓN', 'blue');
  
  const gzipSavings = (totalSize * 0.3).toFixed(0); // Estimación: 30% con gzip
  log(`   Con gzip: ${formatBytes(totalSize)} → ${formatBytes(totalSize * 0.7)}`);
  log(`   Ahorro estimado: ${formatBytes(gzipSavings)} (${(30).toFixed(0)}%)`);
  
  // Recomendación final
  log('\n═════════════════════════════════════════════════════════════', 'blue');
  log('✅ SCORE DE PERFORMANCE', 'green');
  log('═════════════════════════════════════════════════════════════', 'blue');
  
  const score = 100 - (
    (analyses.filter(a => a.size > 500000).length * 10) +
    (analyses.filter(a => a.inlineJs > 50000).length * 5) +
    (analyses.filter(a => !a.hasWebp && a.hasImages > 0).length * 5)
  );
  
  const scoreColor = score >= 80 ? 'green' : score >= 60 ? 'yellow' : 'red';
  log(`   Score: ${score}/100`, scoreColor);
  
  if (score >= 80) {
    log(`   Excelente performance. Continúa monitoreando.`, 'green');
  } else if (score >= 60) {
    log(`   Performance aceptable. Implementa las recomendaciones.`, 'yellow');
  } else {
    log(`   Performance baja. Urgente mejorar.`, 'red');
  }
  
  log('\n');
}

if (require.main === module) {
  generateReport();
}

module.exports = { analyzePage };
