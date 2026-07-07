
const fs = require('fs');
const path = require('path');

const masterData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/master-data.json'), 'utf8')
);

// Convertir negocios a GeoJSON
const features = masterData.negocios.map(negocio => ({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [negocio.lng, negocio.lat]
  },
  properties: {
    id: negocio.id,
    nombre: negocio.nombre,
    categoria: negocio.categoria,
    tipo: negocio.tipo,
    municipioId: negocio.municipioId,
    descripcion: negocio.descripcion,
    imagen: negocio.imagen,
    nivel: negocio.nivel,
    rating: negocio.rating,
    whatsapp: negocio.whatsapp,
    maps: negocio.maps
  }
}));

const municipiosFeatures = masterData.municipios.map(municipio => ({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [municipio.lng, municipio.lat]
  },
  properties: {
    id: municipio.id,
    nombre: municipio.nombre,
    tipo: 'municipio',
    descripcion: municipio.descripcion,
    emoji: municipio.emoji,
    banner: municipio.banner
  }
}));

const geoJSON = {
  type: 'FeatureCollection',
  features: [...features, ...municipiosFeatures]
};

fs.writeFileSync(
  path.join(__dirname, '../assets/js/map-data.geojson'),
  JSON.stringify(geoJSON, null, 2)
);

console.log('✅ GeoJSON generado exitosamente!');
console.log(`📍 ${features.length} negocios + ${municipiosFeatures.length} municipios`);
