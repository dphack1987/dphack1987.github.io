const fs = require('fs');
const path = require('path');

// ------------------------------
// DATOS BASE
// ------------------------------
const masterData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/master-data.json'), 'utf8'));

const MUNICIPIOS = [
  { id:'armenia', nombre:'Armenia', emoji:'🏙️', desc:'Capital del Quindío, ciudad de la eterna primavera.', lat:4.5339, lng:-75.6811, km:0 },
  { id:'circasia', nombre:'Circasia', emoji:'🌿', desc:'Pueblo patrimonial rodeado de cafetales y naturaleza.', lat:4.6167, lng:-75.6333, km:14 },
  { id:'salento', nombre:'Salento', emoji:'☕', desc:'El pueblo más antiguo del Quindío, corazón cafetero.', lat:4.6367, lng:-75.5711, km:35 },
  { id:'filandia', nombre:'Filandia', emoji:'🎨', desc:'Mirador del Quindío, artesanías y paisaje cultural.', lat:4.6736, lng:-75.6547, km:28 },
  { id:'montenegro', nombre:'Montenegro', emoji:'🎢', desc:'Sede del Parque del Café, turismo familiar.', lat:4.5667, lng:-75.75, km:22 },
  { id:'quimbaya', nombre:'Quimbaya', emoji:'🌺', desc:'Tierra de flores y tradición cafetera.', lat:4.6167, lng:-75.7667, km:30 },
  { id:'calarca', nombre:'Calarcá', emoji:'🦋', desc:'Ciudad de las acacias, puerta al Tolima.', lat:4.5167, lng:-75.6333, km:8 },
  { id:'buenavista', nombre:'Buenavista', emoji:'🏔️', desc:'Mirador natural con vistas al Valle del Cauca.', lat:4.7, lng:-75.7167, km:45 },
  { id:'pijao', nombre:'Pijao', emoji:'🌄', desc:'Pueblo slow food, tranquilidad y montaña.', lat:4.3333, lng:-75.7, km:55 },
  { id:'cordoba', nombre:'Córdoba', emoji:'🌾', desc:'Municipio cafetero de tradición y paisaje.', lat:4.7667, lng:-75.65, km:38 },
  { id:'genova', nombre:'Génova', emoji:'🌊', desc:'Biodiversidad y ecoturismo en el sur del Quindío.', lat:4.0167, lng:-75.7667, km:80 },
  { id:'la-tebaida', nombre:'La Tebaida', emoji:'🌞', desc:'Clima cálido, portal de entrada al Quindío.', lat:4.45, lng:-75.7833, km:15 }
];

const NEGOCIOS = masterData.negocios.map(item => ({
  ...item,
  id: item.id,
  slug: item.slug,
  imagen: item.imagen,
  nombre: item.nombre,
  desc: item.descripcion,
  municipio: item.municipioId,
  lat: item.lat,
  lng: item.lng,
  telefono: item.telefono,
  whatsapp: item.whatsapp
}));

const ITINERARIOS = [
  { id:'fin-de-semana-calarca', titulo:'Fin de semana en Calarcá', duracion:'2 días', emoji:'☕', desc:'El itinerario perfecto para conocer el corazón del Paisaje Cultural Cafetero.', dias:[{dia:'Día 1',actividades:['Llegada a Calarcá','Recorrido por el centro histórico','Cena en La Talanquera']},{dia:'Día 2',actividades:['Tour en La Recuca (proceso del café)','Cata de cafés especiales en Origen Café','Regreso']}], negocios:['recuca','domo-aves','la-talanquera']}
];

// ------------------------------
// FUNCIONES SEO
// ------------------------------
function generateMetaTitle(categoria, municipio) {
  const titles = [
    `¿Buscas ${categoria} en ${municipio}? Encuentra los mejores aquí sin comisiones`,
    `${categoria} en ${municipio} | Mapa Turístico del Quindío 2026`,
    `Mejores ${categoria} en ${municipio} - Guía Completa 2026`,
    `${categoria} económicos en ${municipio} 2026 | Ofertas y Precios`
  ];
  return titles[Math.floor(Math.random() * titles.length)].slice(0, 60);
}

function generateMetaDescription(categoria, municipio) {
  const descriptions = [
    `Descubre los mejores ${categoria} en ${municipio}. Contacto directo sin comisiones. Guía completa 2026 del Quindío.`,
    `Encuentra ${categoria} en ${municipio} con fotos reales y contacto directo. ¡No pagues comisiones!`,
    `Precios de ${categoria} en ${municipio} 2026. Guía turística completa del Quindío.`
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)].slice(0, 155);
}

function generateH1(categoria, municipio) {
  const options = [
    `${categoria} en ${municipio}`,
    `Mejores ${categoria} de ${municipio}`,
    `${categoria} económicos en ${municipio} 2026`
  ];
  return options[Math.floor(Math.random() * options.length)];
}

function generateSchemaOrg(biz) {
  let type = 'LocalBusiness';
  if (biz.categoria.includes('alojamiento')) type = 'LodgingBusiness';
  if (biz.categoria.includes('sitio')) type = 'TouristAttraction';
  if (biz.categoria.includes('gastronomia')) type = 'Restaurant';
  if (biz.categoria.includes('agencia')) type = 'TravelAgency';
  if (biz.categoria.includes('transporte')) type = 'LocalBusiness';

  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    "name": biz.nombre,
    "description": biz.desc,
    "telephone": biz.telefono || `+57${biz.whatsapp}`,
    "address": { "@type": "PostalAddress", "addressLocality": biz.municipio, "addressRegion": "Quindío", "addressCountry": "CO" },
    "potentialAction": [
      { "@type": "ReserveAction", "target": `https://wa.me/${String(biz.whatsapp).replace(/\D/g, '')}` },
      { "@type": "TradeAction", "target": `https://wa.me/${String(biz.whatsapp).replace(/\D/g, '')}` }
    ]
  };

  if (biz.lat && biz.lng) schema.geo = { "@type": "GeoCoordinates", "latitude": biz.lat, "longitude": biz.lng };
  return schema;
}

// ------------------------------
// PLANTILLAS HTML
// ------------------------------
function generatePageHTML(tipo, data) {
  let title, desc, h1, content;
  
  if (tipo === 'categoria-municipio') {
    title = generateMetaTitle(data.categoria, data.municipio);
    desc = generateMetaDescription(data.categoria, data.municipio);
    h1 = generateH1(data.categoria, data.municipio);
    content = `
      <section class="page-hero">
        <h1>${h1}</h1>
        <p>Descubre los mejores ${data.categoria} en ${data.municipio} con contacto directo, sin comisiones.</p>
      </section>
      <div class="container">
        <div class="search-bar">
          <input id="search-input" type="text" placeholder="Buscar ${data.categoria}...">
          <button>🔍 Buscar</button>
        </div>
        <div class="filtros">
          <button class="filtro-btn active" data-categoria="">Todos</button>
          <button class="filtro-btn" data-categoria="premium">⭐ Premium</button>
          <button class="filtro-btn" data-categoria="estandar">Estandar</button>
        </div>
        <div class="cards-grid" id="cards-container"></div>
      </div>
    `;
  }

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <meta name="theme-color" content="#059669">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./assets/css/main.css">
</head>
<body>
  <script src="./assets/js/nav.js"></script>
  ${content}
  <footer>
    <div class="footer-bottom">© 2026 www.mapaturisticodelquindio.com</div>
  </footer>
  <script src="./assets/js/datos.js"></script>
  <script src="./assets/js/app.js"></script>
</body>
</html>`;
}

// ------------------------------
// GENERAR ARCHIVO DATOS.JS
// ------------------------------
const outputContent = `/**
 * BASE DE DATOS CENTRAL — Mapa Turístico del Quindío
 * Imágenes reales de anunciantes organizadas por categoría
 * Generado automáticamente con scripts/generate-data.js
 */

const MUNICIPIOS = ${JSON.stringify(MUNICIPIOS, null, 2)};

const NEGOCIOS = ${JSON.stringify(NEGOCIOS, null, 2)};

const ITINERARIOS = ${JSON.stringify(ITINERARIOS, null, 2)};

/* ── HELPERS ── */
function getNegociosByCategoria(cat) { return NEGOCIOS.filter(n => n.categoria === cat); }
function getNegociosByMunicipio(mun) { return NEGOCIOS.filter(n => n.municipio === mun); }
function getNegocioById(id) { return NEGOCIOS.find(n => n.id === id); }
function getMunicipioById(id) { return MUNICIPIOS.find(m => m.id === id); }
`;

fs.writeFileSync(path.join(__dirname, '../assets/js/datos.js'), outputContent.trim(), 'utf8');
console.log('✅ Archivo assets/js/datos.js generado exitosamente!');
console.log(`✅ ${NEGOCIOS.length} pautantes procesados.`);
