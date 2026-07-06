const fs = require('fs');
const path = require('path');

// 1. Lee los datos desde data/pautantes.json
const rawData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/pautantes.json'), 'utf8'));

// 2. Lista completa de municipios
const MUNICIPIOS = [
  { id: 'armenia', nombre: 'Armenia', emoji: '🏙️', desc: 'Capital del Quindío, ciudad de la eterna primavera.', lat: 4.5339, lng: -75.6811, km: 0 },
  { id: 'circasia', nombre: 'Circasia', emoji: '🌿', desc: 'Pueblo patrimonial rodeado de cafetales y naturaleza.', lat: 4.6167, lng: -75.6333, km: 14 },
  { id: 'salento', nombre: 'Salento', emoji: '☕', desc: 'El pueblo más antiguo del Quindío, corazón cafetero.', lat: 4.6367, lng: -75.5711, km: 35 },
  { id: 'filandia', nombre: 'Filandia', emoji: '🎨', desc: 'Mirador del Quindío, artesanías y paisaje cultural.', lat: 4.6736, lng: -75.6547, km: 28 },
  { id: 'montenegro', nombre: 'Montenegro', emoji: '🎢', desc: 'Sede del Parque del Café, turismo familiar.', lat: 4.5667, lng: -75.75, km: 22 },
  { id: 'quimbaya', nombre: 'Quimbaya', emoji: '🌺', desc: 'Tierra de flores y tradición cafetera.', lat: 4.6167, lng: -75.7667, km: 30 },
  { id: 'calarca', nombre: 'Calarcá', emoji: '🦋', desc: 'Ciudad de las acacias, puerta al Tolima.', lat: 4.5167, lng: -75.6333, km: 8 },
  { id: 'buenavista', nombre: 'Buenavista', emoji: '🏔️', desc: 'Mirador natural con vistas al Valle del Cauca.', lat: 4.7, lng: -75.7167, km: 45 },
  { id: 'pijao', nombre: 'Pijao', emoji: '🌄', desc: 'Pueblo slow food, tranquilidad y montaña.', lat: 4.3333, lng: -75.7, km: 55 },
  { id: 'cordoba', nombre: 'Córdoba', emoji: '🌾', desc: 'Municipio cafetero de tradición y paisaje.', lat: 4.7667, lng: -75.65, km: 38 },
  { id: 'genova', nombre: 'Génova', emoji: '🌊', desc: 'Biodiversidad y ecoturismo en el sur del Quindío.', lat: 4.0167, lng: -75.7667, km: 80 },
  { id: 'la-tebaida', nombre: 'La Tebaida', emoji: '🌞', desc: 'Clima cálido, portal de entrada al Quindío.', lat: 4.45, lng: -75.7833, km: 15 }
];

// 3. Transformar datos de pautantes.json al formato de datos.js
const NEGOCIOS = rawData.map(item => ({
  id: item.id || item.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '-').replace(/[^a-z0-9-]/g, ''),
  nombre: item.nombre,
  categoria: item.categoria,
  tipo: item.tipo,
  municipio: item.municipio,
  descripcion: item.descripcion,
  servicios: item.servicios || [],
  precio: item.precio || 'Consultar',
  telefono: item.telefono || '',
  whatsapp: String(item.whatsapp).replace(/\D/g, ''),
  maps: item.maps || `https://maps.google.com/?q=${encodeURIComponent(item.nombre)}`,
  imagen: item.imagen,
  nivel: item.nivel || 'estandar',
  lat: parseFloat(item.lat),
  lng: parseFloat(item.lng)
}));

// 4. Itinerarios (se puede extender)
const ITINERARIOS = [
  {
    id: 'fin-de-semana-calarca',
    titulo: 'Fin de semana en Calarcá',
    duracion: '2 días',
    emoji: '☕',
    desc: 'El itinerario perfecto para conocer el corazón del Paisaje Cultural Cafetero.',
    dias: [
      { dia: 'Día 1', actividades: ['Llegada a Calarcá', 'Recorrido por el centro histórico', 'Cena en La Talanquera'] },
      { dia: 'Día 2', actividades: ['Tour en La Recuca (proceso del café)', 'Cata de cafés especiales en Origen Café', 'Regreso'] }
    ],
    negocios: ['recuca', 'domo-aves', 'la-talanquera']
  },
  {
    id: 'aventura-quindio',
    titulo: 'Aventura en el Quindío',
    duracion: '3 días',
    emoji: '🎢',
    desc: 'Adrenalina, naturaleza y cultura cafetera en tres días intensos.',
    dias: [
      { dia: 'Día 1', actividades: ['Qinti Parque en la Montaña', 'Noche en Circasia'] },
      { dia: 'Día 2', actividades: ['Mapa Calarcá 2026 — recorrido guiado', 'Gastronomía local'] },
      { dia: 'Día 3', actividades: ['Nueva Albania', 'Regreso'] }
    ],
    negocios: ['quinti-parque', 'nueva-albania', 'bendito-pekado']
  },
  {
    id: 'ruta-del-cafe',
    titulo: 'Ruta del Café',
    duracion: '2 días',
    emoji: '🌿',
    desc: 'Conoce el café de la mata a la taza en fincas cafeteras auténticas.',
    dias: [
      { dia: 'Día 1', actividades: ['La Recuca — tour completo del café', 'Cata de cafés especiales en Origen Café'] },
      { dia: 'Día 2', actividades: ['Quindío Travel — tour por fincas cafeteras', 'Regreso'] }
    ],
    negocios: ['recuca', 'origen-cafe', 'quindio-travel']
  }
];

// 5. Generar el contenido de assets/js/datos.js
const outputContent = `/**
 * BASE DE DATOS CENTRAL — Mapa Turístico del Quindío
 * Imágenes reales de anunciantes organizadas por categoría
 * Generado automáticamente con scripts/generate-data.js
 */

const IMG = './assets/images/';

const MUNICIPIOS = ${JSON.stringify(MUNICIPIOS, null, 2)};

const NEGOCIOS = ${JSON.stringify(NEGOCIOS, null, 2)};

const ITINERARIOS = ${JSON.stringify(ITINERARIOS, null, 2)};

/* ── HELPERS ── */
function generateSchemaOrg(negocio) {
  let type, schema = {
    "@context": "https://schema.org",
    "name": negocio.nombre,
    "telephone": negocio.telefono || \`+57\${negocio.whatsapp}\`,
    "url": window.location.href,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": negocio.municipio,
      "addressRegion": "Quindío",
      "addressCountry": "CO"
    }
  };

  switch (negocio.categoria) {
    case 'alojamiento':
      schema["@type"] = negocio.tipo.includes('Finca') ? "LodgingBusiness" : "Hotel";
      schema["priceRange"] = negocio.precio;
      break;
    case 'sitio-turistico':
      schema["@type"] = "TouristAttraction";
      break;
    case 'gastronomia':
    case 'cafe':
      schema["@type"] = "Restaurant";
      schema["servesCuisine"] = "Colombiana";
      break;
    case 'agencia':
      schema["@type"] = "TravelAgency";
      break;
    case 'transporte':
      schema["@type"] = "LocalBusiness";
      break;
    default:
      schema["@type"] = "LocalBusiness";
  }

  if (negocio.lat && negocio.lng) {
    schema["geo"] = {
      "@type": "GeoCoordinates",
      "latitude": negocio.lat,
      "longitude": negocio.lng
    };
  }

  return schema;
}

function getNegociosByCategoria(cat) { return NEGOCIOS.filter(n => n.categoria === cat); }
function getNegociosByMunicipio(mun) { return NEGOCIOS.filter(n => n.municipio === mun); }
function getNegocioById(id) { return NEGOCIOS.find(n => n.id === id); }
function getMunicipioById(id) { return MUNICIPIOS.find(m => m.id === id); }
`;

// 6. Escribir el archivo
fs.writeFileSync(path.join(__dirname, '../assets/js/datos.js'), outputContent.trim(), 'utf8');
console.log('✅ Archivo assets/js/datos.js generado exitosamente!');
console.log(`✅ ${NEGOCIOS.length} pautantes procesados.`);
