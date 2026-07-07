
const fs = require('fs');
const path = require('path');

const PAUTANTES_PATH = path.join(__dirname, '../data/pautantes.json');
const MASTER_DATA_PATH = path.join(__dirname, '../data/master-data.json');

// Leer pautantes.json
const pautantes = JSON.parse(fs.readFileSync(PAUTANTES_PATH, 'utf8'));
const masterData = JSON.parse(fs.readFileSync(MASTER_DATA_PATH, 'utf8'));

// Mapear pautantes a la estructura de master-data
const negociosMapeados = pautantes.map(p => {
  // Generar slug desde el nombre
  let slug = p.nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  // Generar schema type
  let schemaType = 'LocalBusiness';
  if (p.categoria === 'alojamiento') schemaType = 'Hotel';
  else if (p.categoria === 'gastronomia') schemaType = 'Restaurant';
  else if (p.categoria === 'sitio-turistico') schemaType = 'TouristAttraction';

  return {
    id: p.id,
    nombre: p.nombre,
    slug: slug,
    categoria: p.categoria,
    tipo: p.tipo,
    municipioId: p.municipio || 'armenia',
    descripcion: p.desc,
    descripcionLong: p.desc,
    direccion: p.direccion || '',
    lat: p.lat,
    lng: p.lng,
    servicios: p.servicios,
    precioRango: p.precio,
    telefono: p.telefono,
    whatsapp: p.whatsapp,
    email: p.email || '',
    url: p.url || '',
    maps: p.maps,
    imagen: p.imagen,
    galeria: p.imagen ? [p.imagen] : [],
    nivel: p.nivel,
    palabrasClave: [
      p.nombre,
      p.tipo,
      p.categoria,
      p.municipio || 'armenia',
      'Quindío',
      'Eje Cafetero'
    ],
    fechaPublicacion: '2026-01-15',
    fechaActualizacion: new Date().toISOString().split('T')[0],
    rating: {
      valor: 4.8,
      cantidad: 24
    },
    author: {
      name: 'Equipo Mapa Turístico del Quindío',
      url: 'https://www.mapaturisticodelquindio.com'
    },
    schema: {
      '@type': schemaType,
      priceRange: '$$',
      servesCuisine: ['Colombiana', 'Cafetera'],
      openingHours: ['Mo-Su 00:00-23:59']
    },
    transporte: []
  };
});

// Agregar los negocios mapeados al master data
masterData.negocios = negociosMapeados;

// Escribir master-data.json actualizado
fs.writeFileSync(MASTER_DATA_PATH, JSON.stringify(masterData, null, 2));

console.log('✅ Migración de pautantes a master-data completada!');
console.log(`📍 Total de negocios migrados: ${negociosMapeados.length}`);
