/**
 * Base de datos central del sitio
 * Aquí se agregan/editan todos los negocios, municipios y sitios turísticos
 */

const MUNICIPIOS = [
  { id: "armenia",    nombre: "Armenia",    emoji: "🏙️", desc: "Capital del Quindío, ciudad de la eterna primavera.", lat: 4.5339, lng: -75.6811, km: 0 },
  { id: "circasia",   nombre: "Circasia",   emoji: "🌿", desc: "Pueblo patrimonial rodeado de cafetales y naturaleza.", lat: 4.6167, lng: -75.6333, km: 14 },
  { id: "salento",    nombre: "Salento",    emoji: "☕", desc: "El pueblo más antiguo del Quindío, corazón cafetero.", lat: 4.6367, lng: -75.5711, km: 35 },
  { id: "filandia",   nombre: "Filandia",   emoji: "🎨", desc: "Mirador del Quindío, artesanías y paisaje cultural.", lat: 4.6736, lng: -75.6547, km: 28 },
  { id: "montenegro", nombre: "Montenegro", emoji: "🎢", desc: "Sede del Parque del Café, turismo familiar.", lat: 4.5667, lng: -75.75, km: 22 },
  { id: "quimbaya",   nombre: "Quimbaya",   emoji: "🌺", desc: "Tierra de flores y tradición cafetera.", lat: 4.6167, lng: -75.7667, km: 30 },
  { id: "calarca",    nombre: "Calarcá",    emoji: "🦋", desc: "Ciudad de las acacias, puerta al Tolima.", lat: 4.5167, lng: -75.6333, km: 8 },
  { id: "buenavista", nombre: "Buenavista", emoji: "🏔️", desc: "Mirador natural con vistas al Valle del Cauca.", lat: 4.7, lng: -75.7167, km: 45 },
  { id: "pijao",      nombre: "Pijao",      emoji: "🌄", desc: "Pueblo slow food, tranquilidad y montaña.", lat: 4.3333, lng: -75.7, km: 55 },
  { id: "cordoba",    nombre: "Córdoba",    emoji: "🌾", desc: "Municipio cafetero de tradición y paisaje.", lat: 4.7667, lng: -75.65, km: 38 },
  { id: "genova",     nombre: "Génova",     emoji: "🌊", desc: "Biodiversidad y ecoturismo en el sur del Quindío.", lat: 4.0167, lng: -75.7667, km: 80 },
  { id: "la-tebaida", nombre: "La Tebaida", emoji: "🌞", desc: "Clima cálido, portal de entrada al Quindío.", lat: 4.45, lng: -75.7833, km: 15 }
];

const NEGOCIOS = [
  // ── ALOJAMIENTOS ──────────────────────────────────────────────
  {
    id: "finca-hotel-la-dulcera",
    nombre: "Finca Hotel La Dulcera",
    categoria: "alojamiento",
    tipo: "Finca Hotel",
    municipio: "quimbaya",
    descripcion: "Finca cafetera con piscina, cabalgatas y desayuno típico incluido. Rodeada de guaduales y cafetales.",
    servicios: ["Piscina", "Cabalgatas", "Desayuno incluido", "WiFi", "Parqueadero"],
    precio: "Desde $180.000/noche",
    telefono: "+57 300 000 0001",
    whatsapp: "573000000001",
    maps: "https://maps.google.com/?q=Finca+Hotel+La+Dulcera+Quimbaya",
    imagen: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
    nivel: "premium",
    lat: 4.63, lng: -75.77
  },
  {
    id: "hotel-cafe-campestre",
    nombre: "Hotel Café Campestre",
    categoria: "alojamiento",
    tipo: "Hotel Boutique",
    municipio: "salento",
    descripcion: "Hotel boutique en el corazón de Salento con vista al Valle del Cocora. Arquitectura colonial restaurada.",
    servicios: ["Restaurante", "Bar", "WiFi", "Tours guiados", "Terraza panorámica"],
    precio: "Desde $220.000/noche",
    telefono: "+57 300 000 0002",
    whatsapp: "573000000002",
    maps: "https://maps.google.com/?q=Hotel+Cafe+Campestre+Salento",
    imagen: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
    nivel: "premium",
    lat: 4.637, lng: -75.571
  },
  {
    id: "mama-luz",
    nombre: "Hospedaje Mamá Luz",
    categoria: "alojamiento",
    tipo: "Hospedaje",
    municipio: "circasia",
    descripcion: "Hospedaje familiar con ambiente acogedor, jardín y desayuno casero. Ideal para viajeros independientes.",
    servicios: ["Desayuno", "Jardín", "WiFi", "Cocina compartida"],
    precio: "Desde $80.000/noche",
    telefono: "+57 300 000 0003",
    whatsapp: "573000000003",
    maps: "https://maps.google.com/?q=Hospedaje+Mama+Luz+Circasia",
    imagen: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80",
    nivel: "estandar",
    lat: 4.617, lng: -75.633
  },

  // ── SITIOS TURÍSTICOS ─────────────────────────────────────────
  {
    id: "parque-del-cafe",
    nombre: "Parque del Café",
    categoria: "sitio-turistico",
    tipo: "Parque Temático",
    municipio: "montenegro",
    descripcion: "El parque temático más importante del Eje Cafetero. Atracciones mecánicas, show del café, zona de niños y gastronomía.",
    servicios: ["Atracciones mecánicas", "Show del café", "Restaurantes", "Zona infantil", "Tiendas"],
    precio: "Adultos $85.000 · Niños $65.000",
    telefono: "+57 6 7491417",
    whatsapp: "573006749141",
    maps: "https://maps.google.com/?q=Parque+del+Cafe+Montenegro+Quindio",
    imagen: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80",
    nivel: "premium",
    lat: 4.5667, lng: -75.75
  },
  {
    id: "valle-del-cocora",
    nombre: "Valle del Cocora",
    categoria: "sitio-turistico",
    tipo: "Atracción Natural",
    municipio: "salento",
    descripcion: "Hogar de la palma de cera, árbol nacional de Colombia. Senderismo entre palmas gigantes y niebla andina.",
    servicios: ["Senderismo", "Avistamiento de aves", "Fotografía", "Guías locales"],
    precio: "Entrada libre · Guía desde $30.000",
    telefono: "+57 300 000 0005",
    whatsapp: "573000000005",
    maps: "https://maps.google.com/?q=Valle+del+Cocora+Salento",
    imagen: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=80",
    nivel: "premium",
    lat: 4.638, lng: -75.497
  },
  {
    id: "quinti-parque-montana",
    nombre: "Quinti Parque en la Montaña",
    categoria: "sitio-turistico",
    tipo: "Ecoparque",
    municipio: "circasia",
    descripcion: "Ecoparque con tirolesa, canopy, senderismo y vista panorámica al Quindío. Aventura para toda la familia.",
    servicios: ["Tirolesa", "Canopy", "Senderismo", "Restaurante", "Parqueadero"],
    precio: "Desde $45.000/persona",
    telefono: "+57 300 000 0006",
    whatsapp: "573000000006",
    maps: "https://maps.google.com/?q=Quinti+Parque+Circasia",
    imagen: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    nivel: "estandar",
    lat: 4.62, lng: -75.64
  },
  {
    id: "parque-los-arrieros",
    nombre: "Parque Los Arrieros",
    categoria: "sitio-turistico",
    tipo: "Parque Cultural",
    municipio: "filandia",
    descripcion: "Parque temático sobre la cultura arriera y cafetera. Recorridos a caballo, museo y gastronomía típica.",
    servicios: ["Cabalgatas", "Museo", "Gastronomía", "Tienda artesanal"],
    precio: "Desde $35.000/persona",
    telefono: "+57 300 000 0007",
    whatsapp: "573000000007",
    maps: "https://maps.google.com/?q=Parque+Los+Arrieros+Filandia",
    imagen: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80",
    nivel: "estandar",
    lat: 4.674, lng: -75.655
  },

  // ── AGENCIAS Y ACTIVIDADES ────────────────────────────────────
  {
    id: "cabalgatas-el-carmelo",
    nombre: "Cabalgatas El Carmelo",
    categoria: "agencia",
    tipo: "Actividad Turística",
    municipio: "salento",
    descripcion: "Cabalgatas por los cafetales y el Valle del Cocora. Guías expertos, caballos bien cuidados, experiencia auténtica.",
    servicios: ["Cabalgatas", "Guía bilingüe", "Seguro incluido", "Transporte al punto de inicio"],
    precio: "Desde $60.000/persona",
    telefono: "+57 300 000 0008",
    whatsapp: "573000000008",
    maps: "https://maps.google.com/?q=Cabalgatas+El+Carmelo+Salento",
    imagen: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&q=80",
    nivel: "premium",
    lat: 4.636, lng: -75.572
  },
  {
    id: "mirador-mano-acaime",
    nombre: "Mirador Mano de Acaime",
    categoria: "sitio-turistico",
    tipo: "Mirador Natural",
    municipio: "salento",
    descripcion: "Santuario de colibríes a 2.800 msnm. Avistamiento de más de 20 especies de colibríes en su hábitat natural.",
    servicios: ["Avistamiento de aves", "Senderismo", "Bebidas calientes", "Guía local"],
    precio: "Entrada $5.000 · Bebida $5.000",
    telefono: "+57 300 000 0009",
    whatsapp: "573000000009",
    maps: "https://maps.google.com/?q=Mirador+Mano+de+Acaime+Salento",
    imagen: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=80",
    nivel: "estandar",
    lat: 4.645, lng: -75.49
  },

  // ── TRANSPORTE ────────────────────────────────────────────────
  {
    id: "flota-magdalena",
    nombre: "Flota Magdalena",
    categoria: "transporte",
    tipo: "Empresa de Transporte",
    municipio: "armenia",
    descripcion: "Servicio de transporte intermunicipal desde Armenia hacia todos los municipios del Quindío y ciudades principales.",
    servicios: ["Rutas intermunicipales", "Bogotá", "Medellín", "Cali", "Pereira"],
    precio: "Armenia-Bogotá desde $45.000",
    telefono: "+57 6 7460000",
    whatsapp: "573006746000",
    maps: "https://maps.google.com/?q=Terminal+de+Transportes+Armenia",
    imagen: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80",
    nivel: "estandar",
    lat: 4.534, lng: -75.681
  },

  // ── FINCAS ────────────────────────────────────────────────────
  {
    id: "alquiler-finca-quindio",
    nombre: "Fincas del Quindío",
    categoria: "finca",
    tipo: "Alquiler de Fincas",
    municipio: "armenia",
    descripcion: "Directorio de fincas para alquiler en todo el Quindío. Desde fincas íntimas para parejas hasta grandes propiedades para grupos.",
    servicios: ["Piscina", "BBQ", "Cocina equipada", "Parqueadero", "Zona de juegos"],
    precio: "Desde $350.000/noche",
    telefono: "+57 300 000 0010",
    whatsapp: "573000000010",
    maps: "https://maps.google.com/?q=Fincas+Quindio+Colombia",
    imagen: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=600&q=80",
    nivel: "estandar",
    lat: 4.54, lng: -75.69
  }
];

const ITINERARIOS = [
  {
    id: "fin-de-semana-salento",
    titulo: "Fin de semana en Salento",
    duracion: "2 días",
    emoji: "☕",
    descripcion: "El itinerario clásico del Eje Cafetero: pueblo colonial, Valle del Cocora y colibríes.",
    dias: [
      { dia: "Día 1", actividades: ["Llegada a Salento", "Recorrido por el pueblo y mirador", "Cena en restaurante local"] },
      { dia: "Día 2", actividades: ["Valle del Cocora (senderismo 4h)", "Mirador Mano de Acaime", "Regreso a Armenia"] }
    ],
    negocios: ["valle-del-cocora", "mirador-mano-acaime", "hotel-cafe-campestre"]
  },
  {
    id: "aventura-familiar",
    titulo: "Aventura familiar 3 días",
    duracion: "3 días",
    emoji: "🎢",
    descripcion: "Parque del Café, cabalgatas y naturaleza. Perfecto para familias con niños.",
    dias: [
      { dia: "Día 1", actividades: ["Parque del Café (día completo)", "Alojamiento en Montenegro"] },
      { dia: "Día 2", actividades: ["Cabalgatas El Carmelo en Salento", "Tarde libre en el pueblo"] },
      { dia: "Día 3", actividades: ["Quinti Parque en la Montaña", "Regreso"] }
    ],
    negocios: ["parque-del-cafe", "cabalgatas-el-carmelo", "quinti-parque-montana"]
  },
  {
    id: "ruta-del-cafe",
    titulo: "Ruta del Café",
    duracion: "2 días",
    emoji: "🌿",
    descripcion: "Conoce el proceso del café de la mata a la taza en fincas cafeteras auténticas.",
    dias: [
      { dia: "Día 1", actividades: ["Finca cafetera en Quimbaya", "Recorrido del proceso del café", "Cata de cafés especiales"] },
      { dia: "Día 2", actividades: ["Filandia: artesanías y mirador", "Parque Los Arrieros", "Regreso"] }
    ],
    negocios: ["finca-hotel-la-dulcera", "parque-los-arrieros"]
  }
];

// Helpers
function getNegociosByCategoria(cat) {
  return NEGOCIOS.filter(n => n.categoria === cat);
}
function getNegociosByMunicipio(mun) {
  return NEGOCIOS.filter(n => n.municipio === mun);
}
function getNegocioById(id) {
  return NEGOCIOS.find(n => n.id === id);
}
function getMunicipioById(id) {
  return MUNICIPIOS.find(m => m.id === id);
}
