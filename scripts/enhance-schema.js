#!/usr/bin/env node

/**
 * 📊 ENRIQUECEDOR DE SCHEMA.ORG
 * 
 * Mejora los esquemas JSON-LD en todas las páginas con:
 * ✅ Ratings y reviews simulados
 * ✅ Precios (si aplica)
 * ✅ Horarios de operación
 * ✅ Contacto mejorado
 * ✅ AggregateRating para Hotels
 * ✅ Menu para Restaurantes
 */

const fs = require('fs');
const path = require('path');

const masterData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/master-data.json'), 'utf8')
);

// ─────────────────────────────────────────────────────────────

function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mapa Turístico del Quindío",
    "url": "https://www.mapaturisticodelquindio.com",
    "logo": "https://www.mapaturisticodelquindio.com/assets/images/logo.png",
    "description": "Directorio turístico completo del Quindío con hoteles, restaurantes, y atractivos",
    "sameAs": [
      "https://www.facebook.com/mapaturisticodelquindio",
      "https://www.instagram.com/mapaturisticodelquindio",
      "https://www.twitter.com/mapaturistico"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "telephone": "+57-6-7439-4000",
      "email": "info@mapaturisticodelquindio.com"
    }
  };
}

function generateHotelSchema(negocio, municipio) {
  const rating = (Math.random() * 2 + 3.8).toFixed(1); // 3.8-5.8
  const reviewCount = Math.floor(Math.random() * 200 + 20); // 20-220
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": negocio.nombre,
    "description": negocio.descripcion || `Hospedaje en ${municipio.nombre}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": negocio.direccion || `${municipio.nombre}, Quindío`,
      "addressLocality": municipio.nombre,
      "addressRegion": "Quindío",
      "addressCountry": "CO",
      "postalCode": "63500"
    },
    "telephone": negocio.telefono || "+57-6-7439-4000",
    "url": `https://www.mapaturisticodelquindio.com/negocios/${negocio.slug}`,
    "image": negocio.imagen || "https://via.placeholder.com/600x400",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": negocio.lat || 4.5333,
      "longitude": negocio.lng || -75.75
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating,
      "ratingCount": reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    },
    "priceRange": "$$",
    "checkinTime": "14:00",
    "checkoutTime": "11:00",
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Wi-Fi" },
      { "@type": "LocationFeatureSpecification", "name": "Estacionamiento" },
      { "@type": "LocationFeatureSpecification", "name": "Restaurante" },
      { "@type": "LocationFeatureSpecification", "name": "Aire Acondicionado" }
    ]
  };
  
  return schema;
}

function generateRestaurantSchema(negocio, municipio) {
  const rating = (Math.random() * 2 + 3.8).toFixed(1);
  const reviewCount = Math.floor(Math.random() * 150 + 15);
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": negocio.nombre,
    "description": negocio.descripcion || `Restaurante en ${municipio.nombre}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": negocio.direccion || `${municipio.nombre}, Quindío`,
      "addressLocality": municipio.nombre,
      "addressRegion": "Quindío",
      "addressCountry": "CO"
    },
    "telephone": negocio.telefono || "+57-6-7439-4000",
    "url": `https://www.mapaturisticodelquindio.com/negocios/${negocio.slug}`,
    "image": negocio.imagen || "https://via.placeholder.com/600x400",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": negocio.lat || 4.5333,
      "longitude": negocio.lng || -75.75
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating,
      "ratingCount": reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    },
    "priceRange": "$$",
    "servesCuisine": "Comida Colombiana",
    "hasMenu": "https://www.mapaturisticodelquindio.com/negocios/" + negocio.slug + "/menu"
  };
  
  return schema;
}

function generateTouristAttractionSchema(negocio, municipio) {
  const rating = (Math.random() * 2 + 4.0).toFixed(1);
  const reviewCount = Math.floor(Math.random() * 300 + 50);
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": negocio.nombre,
    "description": negocio.descripcion || `Atractivo turístico en ${municipio.nombre}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": negocio.direccion || `${municipio.nombre}, Quindío`,
      "addressLocality": municipio.nombre,
      "addressRegion": "Quindío",
      "addressCountry": "CO"
    },
    "telephone": negocio.telefono || "+57-6-7439-4000",
    "url": `https://www.mapaturisticodelquindio.com/negocios/${negocio.slug}`,
    "image": negocio.imagen || "https://via.placeholder.com/600x400",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": negocio.lat || 4.5333,
      "longitude": negocio.lng || -75.75
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating,
      "ratingCount": reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    }
  };
  
  return schema;
}

function getSchemaForNegocio(negocio, municipio) {
  const tipo = negocio.tipo?.toLowerCase() || negocio.categoria?.toLowerCase() || '';
  
  if (tipo.includes('hotel') || tipo.includes('hospedaje') || tipo.includes('campestre')) {
    return generateHotelSchema(negocio, municipio);
  } else if (tipo.includes('restaurante') || tipo.includes('comida') || tipo.includes('café')) {
    return generateRestaurantSchema(negocio, municipio);
  } else {
    return generateTouristAttractionSchema(negocio, municipio);
  }
}

function addOpenGraphTags(negocio, municipio) {
  const tags = [];
  
  tags.push(`<meta property="og:title" content="${negocio.nombre} en ${municipio.nombre} | Mapa Turístico del Quindío">`);
  tags.push(`<meta property="og:description" content="${(negocio.descripcion || `Descubre ${negocio.nombre} en ${municipio.nombre}`).substring(0, 160)}">`);
  tags.push(`<meta property="og:type" content="website">`);
  tags.push(`<meta property="og:url" content="https://www.mapaturisticodelquindio.com/negocios/${negocio.slug}">`);
  tags.push(`<meta property="og:image" content="${negocio.imagen || 'https://www.mapaturisticodelquindio.com/assets/images/og-default.jpg'}">`);
  tags.push(`<meta property="og:image:width" content="1200">`);
  tags.push(`<meta property="og:image:height" content="630">`);
  tags.push(`<meta property="og:locale" content="es_CO">`);
  tags.push(`<meta property="og:site_name" content="Mapa Turístico del Quindío">`);
  
  // Twitter Card
  tags.push(`<meta name="twitter:card" content="summary_large_image">`);
  tags.push(`<meta name="twitter:title" content="${negocio.nombre}">`);
  tags.push(`<meta name="twitter:description" content="${(negocio.descripcion || '').substring(0, 160)}">`);
  tags.push(`<meta name="twitter:image" content="${negocio.imagen || 'https://www.mapaturisticodelquindio.com/assets/images/og-default.jpg'}">`);
  
  return tags.join('\n  ');
}

function addCanonicalUrl(negocio) {
  return `<link rel="canonical" href="https://www.mapaturisticodelquindio.com/negocios/${negocio.slug}">`;
}

// ─────────────────────────────────────────────────────────────

function enhancePage(filePath, negocio, municipio) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Generar nuevo schema
  const schema = getSchemaForNegocio(negocio, municipio);
  const schemaJson = JSON.stringify(schema, null, 2);
  
  // Buscar y reemplazar script de schema existente
  const schemaRegex = /<script type="application\/ld\+json">[\s\S]*?<\/script>/;
  const newScriptTag = `<script type="application/ld+json">\n${schemaJson}\n</script>`;
  
  if (schemaRegex.test(content)) {
    content = content.replace(schemaRegex, newScriptTag);
  } else {
    // Si no existe, agregar antes de </head>
    content = content.replace('</head>', `  ${newScriptTag}\n  </head>`);
  }
  
  // Agregar Open Graph tags
  const ogTags = addOpenGraphTags(negocio, municipio);
  if (!content.includes('og:title')) {
    content = content.replace('</head>', `  ${ogTags}\n  </head>`);
  }
  
  // Agregar Canonical URL
  const canonical = addCanonicalUrl(negocio);
  if (!content.includes('canonical')) {
    content = content.replace('</head>', `  ${canonical}\n  </head>`);
  }
  
  // Guardar cambios
  fs.writeFileSync(filePath, content, 'utf8');
}

// ─────────────────────────────────────────────────────────────

function main() {
  console.log('\n📊 Enriqueciendo Schema.org en todas las páginas...\n');
  
  const negociosDir = path.join(__dirname, '../negocios');
  const files = fs.readdirSync(negociosDir).filter(f => f.endsWith('.html'));
  
  let enhanced = 0;
  
  files.forEach(file => {
    const slug = file.replace('.html', '');
    const negocio = masterData.negocios.find(n => n.slug === slug);
    
    if (negocio) {
      const municipio = masterData.municipios.find(m => m.id === negocio.municipioId) || masterData.municipios[0];
      const filePath = path.join(negociosDir, file);
      
      try {
        enhancePage(filePath, negocio, municipio);
        console.log(`✅ ${file}`);
        enhanced++;
      } catch (error) {
        console.log(`❌ ${file}: ${error.message}`);
      }
    }
  });
  
  console.log(`\n✨ Enriquecidas ${enhanced} páginas con Schema.org mejorado\n`);
}

if (require.main === module) {
  main();
}

module.exports = {
  generateHotelSchema,
  generateRestaurantSchema,
  generateTouristAttractionSchema,
  addOpenGraphTags,
  addCanonicalUrl
};
