/**
 * BASE DE DATOS CENTRAL — Mapa Turístico del Quindío
 * Imágenes reales de anunciantes organizadas por categoría
 */

/* ── RUTAS BASE ── */
const IMG = './assets/images/';

/* ── MUNICIPIOS ── */
const MUNICIPIOS = [
  { id:'armenia',    nombre:'Armenia',    emoji:'🏙️', desc:'Capital del Quindío, ciudad de la eterna primavera.', lat:4.5339, lng:-75.6811, km:0 },
  { id:'circasia',   nombre:'Circasia',   emoji:'🌿', desc:'Pueblo patrimonial rodeado de cafetales y naturaleza.', lat:4.6167, lng:-75.6333, km:14 },
  { id:'salento',    nombre:'Salento',    emoji:'☕', desc:'El pueblo más antiguo del Quindío, corazón cafetero.', lat:4.6367, lng:-75.5711, km:35 },
  { id:'filandia',   nombre:'Filandia',   emoji:'🎨', desc:'Mirador del Quindío, artesanías y paisaje cultural.', lat:4.6736, lng:-75.6547, km:28 },
  { id:'montenegro', nombre:'Montenegro', emoji:'🎢', desc:'Sede del Parque del Café, turismo familiar.', lat:4.5667, lng:-75.75, km:22 },
  { id:'quimbaya',   nombre:'Quimbaya',   emoji:'🌺', desc:'Tierra de flores y tradición cafetera.', lat:4.6167, lng:-75.7667, km:30 },
  { id:'calarca',    nombre:'Calarcá',    emoji:'🦋', desc:'Ciudad de las acacias, puerta al Tolima.', lat:4.5167, lng:-75.6333, km:8 },
  { id:'buenavista', nombre:'Buenavista', emoji:'🏔️', desc:'Mirador natural con vistas al Valle del Cauca.', lat:4.7, lng:-75.7167, km:45 },
  { id:'pijao',      nombre:'Pijao',      emoji:'🌄', desc:'Pueblo slow food, tranquilidad y montaña.', lat:4.3333, lng:-75.7, km:55 },
  { id:'cordoba',    nombre:'Córdoba',    emoji:'🌾', desc:'Municipio cafetero de tradición y paisaje.', lat:4.7667, lng:-75.65, km:38 },
  { id:'genova',     nombre:'Génova',     emoji:'🌊', desc:'Biodiversidad y ecoturismo en el sur del Quindío.', lat:4.0167, lng:-75.7667, km:80 },
  { id:'la-tebaida', nombre:'La Tebaida', emoji:'🌞', desc:'Clima cálido, portal de entrada al Quindío.', lat:4.45, lng:-75.7833, km:15 }
];

/* ── NEGOCIOS ── */
const NEGOCIOS = [

  /* ALOJAMIENTOS */
  {
    id:'armont', nombre:'Hotel Armont', categoria:'alojamiento', tipo:'Hotel',
    municipio:'calarca', desc:'Hotel moderno en Calarcá con todas las comodidades para tu estadía en el Quindío.',
    servicios:['WiFi','Parqueadero','Restaurante','Aire acondicionado'],
    precio:'Desde $120.000/noche', telefono:'+57 300 000 0001', whatsapp:'573000000001',
    maps:'https://maps.google.com/?q=Hotel+Armont+Calarca',
    imagen: IMG + 'hoteles/armont.jpg', nivel:'estandar', lat:4.52, lng:-75.64
  },
  {
    id:'chalet-alemania', nombre:'Chalet Alemania', categoria:'alojamiento', tipo:'Finca Hotel',
    municipio:'calarca', desc:'Finca hotel de estilo europeo en las montañas del Quindío. Ambiente único y tranquilo.',
    servicios:['Piscina','Desayuno','WiFi','Jardín','Parqueadero'],
    precio:'Desde $200.000/noche', telefono:'+57 300 000 0002', whatsapp:'573000000002',
    maps:'https://maps.google.com/?q=Chalet+Alemania+Calarca+Quindio',
    imagen: IMG + 'alojamientos/chalet-alemania.jpg', nivel:'premium', lat:4.51, lng:-75.63
  },
  {
    id:'finca-san-miguel', nombre:'Finca San Miguel', categoria:'alojamiento', tipo:'Finca Hotel',
    municipio:'calarca', desc:'Finca cafetera tradicional con piscina y desayuno típico incluido.',
    servicios:['Piscina','Desayuno','Cabalgatas','WiFi'],
    precio:'Desde $180.000/noche', telefono:'+57 300 000 0003', whatsapp:'573000000003',
    maps:'https://maps.google.com/?q=Finca+San+Miguel+Quindio',
    imagen: IMG + 'alojamientos/finca_san_miguel.jpg', nivel:'estandar', lat:4.53, lng:-75.65
  },
  {
    id:'hotel-descanso', nombre:'Hotel El Descanso', categoria:'alojamiento', tipo:'Hotel',
    municipio:'calarca', desc:'Hotel familiar en el centro de Calarcá, cómodo y bien ubicado.',
    servicios:['WiFi','Parqueadero','Desayuno'],
    precio:'Desde $90.000/noche', telefono:'+57 300 000 0004', whatsapp:'573000000004',
    maps:'https://maps.google.com/?q=Hotel+El+Descanso+Calarca',
    imagen: IMG + 'hoteles/hotel_descanso.jpg', nivel:'estandar', lat:4.519, lng:-75.635
  },
  {
    id:'hotel-gran-chaparral', nombre:'Hotel Gran Chaparral', categoria:'alojamiento', tipo:'Hotel',
    municipio:'calarca', desc:'Hotel de categoría en Calarcá con restaurante y salones de eventos.',
    servicios:['Restaurante','WiFi','Parqueadero','Eventos'],
    precio:'Desde $150.000/noche', telefono:'+57 300 000 0005', whatsapp:'573000000005',
    maps:'https://maps.google.com/?q=Hotel+Gran+Chaparral+Calarca',
    imagen: IMG + 'hoteles/hotel-gran-chaparral.jpg', nivel:'premium', lat:4.518, lng:-75.633
  },
  {
    id:'marta-cecilia', nombre:'Hospedaje Marta Cecilia', categoria:'alojamiento', tipo:'Hospedaje',
    municipio:'calarca', desc:'Hospedaje familiar acogedor con ambiente hogareño y desayuno casero.',
    servicios:['Desayuno','WiFi','Cocina compartida'],
    precio:'Desde $70.000/noche', telefono:'+57 300 000 0006', whatsapp:'573000000006',
    maps:'https://maps.google.com/?q=Hospedaje+Marta+Cecilia+Calarca',
    imagen: IMG + 'alojamientos/marta_cecilia.jpg', nivel:'estandar', lat:4.517, lng:-75.632
  },
  {
    id:'hotel-penas', nombre:'Hotel Las Peñas', categoria:'alojamiento', tipo:'Hotel',
    municipio:'calarca', desc:'Hotel con vista a las montañas del Quindío, piscina y zonas verdes.',
    servicios:['Piscina','WiFi','Parqueadero','Restaurante'],
    precio:'Desde $130.000/noche', telefono:'+57 300 000 0007', whatsapp:'573000000007',
    maps:'https://maps.google.com/?q=Hotel+Las+Penas+Calarca',
    imagen: IMG + 'hoteles/peñas.jpg', nivel:'estandar', lat:4.516, lng:-75.631
  },
  {
    id:'ticlan', nombre:'Ticlan Hotel', categoria:'alojamiento', tipo:'Hotel Boutique',
    municipio:'calarca', desc:'Hotel boutique moderno en Calarcá con diseño contemporáneo y servicio personalizado.',
    servicios:['WiFi','Bar','Restaurante','Parqueadero'],
    precio:'Desde $160.000/noche', telefono:'+57 300 000 0008', whatsapp:'573000000008',
    maps:'https://maps.google.com/?q=Ticlan+Hotel+Calarca',
    imagen: IMG + 'hoteles/ticlan.jpg', nivel:'premium', lat:4.515, lng:-75.630
  },

  /* ATRACTIVOS TURÍSTICOS */
  {
    id:'domo-aves', nombre:'Domo de las Aves', categoria:'sitio-turistico', tipo:'Atracción Natural',
    municipio:'calarca', desc:'Santuario de aves con más de 100 especies en su hábitat natural. Experiencia única de avistamiento.',
    servicios:['Avistamiento de aves','Guía especializado','Fotografía','Senderos'],
    precio:'Desde $25.000/persona', telefono:'+57 300 000 0009', whatsapp:'573000000009',
    maps:'https://maps.google.com/?q=Domo+de+las+Aves+Calarca',
    imagen: IMG + 'atractivos turisticos/domo_aves.jpg', nivel:'premium', lat:4.52, lng:-75.62
  },
  {
    id:'nueva-albania', nombre:'Nueva Albania', categoria:'sitio-turistico', tipo:'Atracción Turística',
    municipio:'calarca', desc:'Destino turístico con actividades de aventura, naturaleza y cultura cafetera.',
    servicios:['Senderismo','Cabalgatas','Gastronomía','Cultura cafetera'],
    precio:'Desde $30.000/persona', telefono:'+57 300 000 0010', whatsapp:'573000000010',
    maps:'https://maps.google.com/?q=Nueva+Albania+Calarca',
    imagen: IMG + 'atractivos turisticos/nueva_albania.jpg', nivel:'estandar', lat:4.51, lng:-75.61
  },
  {
    id:'quinti-parque', nombre:'Qinti Parque en la Montaña', categoria:'sitio-turistico', tipo:'Ecoparque',
    municipio:'circasia', desc:'Ecoparque con tirolesa, canopy, senderismo y vista panorámica al Quindío.',
    servicios:['Tirolesa','Canopy','Senderismo','Restaurante'],
    precio:'Desde $45.000/persona', telefono:'+57 300 000 0011', whatsapp:'573000000011',
    maps:'https://maps.google.com/?q=Qinti+Parque+Circasia',
    imagen: IMG + 'atractivos turisticos/quinti.jpg', nivel:'premium', lat:4.62, lng:-75.64
  },
  {
    id:'recuca', nombre:'La Recuca', categoria:'sitio-turistico', tipo:'Finca Cafetera',
    municipio:'calarca', desc:'Finca cafetera con recorrido completo del proceso del café de la mata a la taza.',
    servicios:['Tour del café','Cata','Gastronomía','Tienda'],
    precio:'Desde $35.000/persona', telefono:'+57 300 000 0012', whatsapp:'573000000012',
    maps:'https://maps.google.com/?q=La+Recuca+Calarca',
    imagen: IMG + 'atractivos turisticos/recuca.jpg', nivel:'premium', lat:4.513, lng:-75.628
  },

  /* GASTRONOMÍA */
  {
    id:'bendito-pekado', nombre:'Bendito Pekado', categoria:'gastronomia', tipo:'Restaurante',
    municipio:'calarca', desc:'Restaurante con cocina fusión y los mejores sabores del Eje Cafetero.',
    servicios:['Almuerzo','Cena','Reservas','Eventos'],
    precio:'Menú desde $25.000', telefono:'+57 300 000 0013', whatsapp:'573000000013',
    maps:'https://maps.google.com/?q=Bendito+Pekado+Calarca',
    imagen: IMG + 'gastronomia/bendito-pekado.jpg', nivel:'estandar', lat:4.519, lng:-75.634
  },
  {
    id:'bisonte-parrilla', nombre:'Bisonte Parrilla', categoria:'gastronomia', tipo:'Parrilla',
    municipio:'calarca', desc:'Las mejores carnes a la parrilla del Quindío. Ambiente familiar y acogedor.',
    servicios:['Parrilla','Domicilios','Reservas'],
    precio:'Menú desde $30.000', telefono:'+57 300 000 0014', whatsapp:'573000000014',
    maps:'https://maps.google.com/?q=Bisonte+Parrilla+Calarca',
    imagen: IMG + 'gastronomia/bisonte-parrilla.jpg', nivel:'estandar', lat:4.518, lng:-75.633
  },
  {
    id:'coma-parado', nombre:'Coma Parado', categoria:'gastronomia', tipo:'Restaurante',
    municipio:'calarca', desc:'Gastronomía típica del Quindío en un ambiente informal y delicioso.',
    servicios:['Desayunos','Almuerzos','Comida típica'],
    precio:'Menú desde $15.000', telefono:'+57 300 000 0015', whatsapp:'573000000015',
    maps:'https://maps.google.com/?q=Coma+Parado+Calarca',
    imagen: IMG + 'gastronomia/coma_parado.jpg', nivel:'estandar', lat:4.517, lng:-75.632
  },
  {
    id:'la-talanquera', nombre:'La Talanquera', categoria:'gastronomia', tipo:'Restaurante',
    municipio:'calarca', desc:'Restaurante campestre con vista al paisaje cafetero y cocina tradicional.',
    servicios:['Almuerzo','Cena','Vista panorámica','Eventos'],
    precio:'Menú desde $28.000', telefono:'+57 300 000 0016', whatsapp:'573000000016',
    maps:'https://maps.google.com/?q=La+Talanquera+Calarca',
    imagen: IMG + 'gastronomia/la-talanquera.jpg', nivel:'premium', lat:4.516, lng:-75.631
  },
  {
    id:'master-gourmet', nombre:'Master Gourmet', categoria:'gastronomia', tipo:'Restaurante',
    municipio:'calarca', desc:'Alta cocina en el corazón del Quindío. Experiencias gastronómicas únicas.',
    servicios:['Alta cocina','Maridaje','Reservas','Eventos privados'],
    precio:'Menú desde $45.000', telefono:'+57 300 000 0017', whatsapp:'573000000017',
    maps:'https://maps.google.com/?q=Master+Gourmet+Calarca',
    imagen: IMG + 'gastronomia/master_gourmet.jpg', nivel:'premium', lat:4.515, lng:-75.630
  },

  /* CAFÉS */
  {
    id:'amaranta-libros', nombre:'Amaranta Libros y Café', categoria:'cafe', tipo:'Café Cultural',
    municipio:'calarca', desc:'Café cultural con librería, exposiciones y los mejores cafés especiales del Quindío.',
    servicios:['Cafés especiales','Librería','Exposiciones','WiFi'],
    precio:'Desde $8.000', telefono:'+57 300 000 0018', whatsapp:'573000000018',
    maps:'https://maps.google.com/?q=Amaranta+Libros+Cafe+Calarca',
    imagen: IMG + 'cafes/amaranta-libros.jpg', nivel:'estandar', lat:4.519, lng:-75.634
  },
  {
    id:'cafe-rio', nombre:'Café del Río', categoria:'cafe', tipo:'Café',
    municipio:'calarca', desc:'Café con vista al río y los mejores granos de la región.',
    servicios:['Cafés especiales','Pastelería','Vista al río'],
    precio:'Desde $6.000', telefono:'+57 300 000 0019', whatsapp:'573000000019',
    maps:'https://maps.google.com/?q=Cafe+del+Rio+Calarca',
    imagen: IMG + 'cafes/cafe_rio.jpg', nivel:'estandar', lat:4.518, lng:-75.633
  },
  {
    id:'origen-cafe', nombre:'Origen Café', categoria:'cafe', tipo:'Café Especializado',
    municipio:'calarca', desc:'Café de especialidad con baristas certificados y granos de origen único.',
    servicios:['Café de especialidad','Catas','Barismo','Tienda'],
    precio:'Desde $9.000', telefono:'+57 300 000 0020', whatsapp:'573000000020',
    maps:'https://maps.google.com/?q=Origen+Cafe+Calarca',
    imagen: IMG + 'cafes/origen_cafe.jpg', nivel:'premium', lat:4.517, lng:-75.632
  },
  {
    id:'quindus', nombre:'Quindus Café', categoria:'cafe', tipo:'Café',
    municipio:'calarca', desc:'Café tradicional con la mejor selección de cafés del Quindío.',
    servicios:['Cafés','Snacks','WiFi'],
    precio:'Desde $5.000', telefono:'+57 300 000 0021', whatsapp:'573000000021',
    maps:'https://maps.google.com/?q=Quindus+Cafe+Calarca',
    imagen: IMG + 'cafes/quindus.jpg', nivel:'estandar', lat:4.516, lng:-75.631
  },
  {
    id:'raiz-coffee', nombre:'Raíz Coffee', categoria:'cafe', tipo:'Café Especializado',
    municipio:'calarca', desc:'Café de especialidad con enfoque en sostenibilidad y comercio justo.',
    servicios:['Café de especialidad','Métodos de preparación','Tienda online'],
    precio:'Desde $8.000', telefono:'+57 300 000 0022', whatsapp:'573000000022',
    maps:'https://maps.google.com/?q=Raiz+Coffee+Calarca',
    imagen: IMG + 'cafes/raiz_coffe.jpg', nivel:'estandar', lat:4.515, lng:-75.630
  },
  {
    id:'tertulia', nombre:'La Tertulia', categoria:'cafe', tipo:'Café Cultural',
    municipio:'calarca', desc:'Espacio cultural con café, música en vivo y tertulias literarias.',
    servicios:['Café','Música en vivo','Eventos culturales','WiFi'],
    precio:'Desde $7.000', telefono:'+57 300 000 0023', whatsapp:'573000000023',
    maps:'https://maps.google.com/?q=La+Tertulia+Calarca',
    imagen: IMG + 'cafes/tertulia1.jpg', nivel:'estandar', lat:4.514, lng:-75.629
  },

  /* AGENCIAS */
  {
    id:'quindio-travel', nombre:'Quindío Travel', categoria:'agencia', tipo:'Agencia de Viajes',
    municipio:'calarca', desc:'Agencia de viajes especializada en el Eje Cafetero. Tours, paquetes y experiencias únicas.',
    servicios:['Tours guiados','Paquetes turísticos','Transporte','Guías bilingües'],
    precio:'Tours desde $80.000/persona', telefono:'+57 300 000 0024', whatsapp:'573000000024',
    maps:'https://maps.google.com/?q=Quindio+Travel+Calarca',
    imagen: IMG + 'agencias operadoras turisticas/quindio_travel.jpg', nivel:'premium', lat:4.519, lng:-75.634
  },

  /* SEGUROS */
  {
    id:'diana-seguros', nombre:'Diana Seguros de Viaje', categoria:'seguro', tipo:'Seguro de Viaje',
    municipio:'armenia', desc:'Seguros de viaje para turistas nacionales e internacionales. Protege tu aventura en el Quindío.',
    servicios:['Seguro médico','Asistencia 24h','Cancelación','Equipaje'],
    precio:'Desde $15.000/día', telefono:'+57 300 000 0025', whatsapp:'573000000025',
    maps:'https://maps.google.com/?q=Diana+Seguros+Armenia',
    imagen: IMG + 'seguro de viajes/diana_seguros.jpg', nivel:'estandar', lat:4.534, lng:-75.681
  }
];

/* ── ITINERARIOS ── */
const ITINERARIOS = [
  {
    id:'fin-de-semana-calarca', titulo:'Fin de semana en Calarcá', duracion:'2 días', emoji:'☕',
    desc:'El itinerario perfecto para conocer el corazón del Paisaje Cultural Cafetero.',
    dias:[
      { dia:'Día 1', actividades:['Llegada a Calarcá','Recorrido por el centro histórico','Cena en La Talanquera'] },
      { dia:'Día 2', actividades:['Tour en La Recuca (proceso del café)','Domo de las Aves','Regreso'] }
    ],
    negocios:['recuca','domo-aves','la-talanquera']
  },
  {
    id:'aventura-quindio', titulo:'Aventura en el Quindío', duracion:'3 días', emoji:'🎢',
    desc:'Adrenalina, naturaleza y cultura cafetera en tres días intensos.',
    dias:[
      { dia:'Día 1', actividades:['Qinti Parque en la Montaña','Noche en Circasia'] },
      { dia:'Día 2', actividades:['Mapa Calarcá 2026 — recorrido guiado','Gastronomía local'] },
      { dia:'Día 3', actividades:['Nueva Albania','Regreso'] }
    ],
    negocios:['quinti-parque','nueva-albania','bendito-pekado']
  },
  {
    id:'ruta-del-cafe', titulo:'Ruta del Café', duracion:'2 días', emoji:'🌿',
    desc:'Conoce el café de la mata a la taza en fincas cafeteras auténticas.',
    dias:[
      { dia:'Día 1', actividades:['La Recuca — tour completo del café','Cata de cafés especiales en Origen Café'] },
      { dia:'Día 2', actividades:['Quindío Travel — tour por fincas cafeteras','Regreso'] }
    ],
    negocios:['recuca','origen-cafe','quindio-travel']
  }
];

/* Alias para plantillas que usan descripcion (sin cambiar diseño) */
NEGOCIOS.forEach(n => { if (n.desc) n.descripcion = n.desc; });

/* ── HELPERS ── */
function getNegociosByCategoria(cat){ return NEGOCIOS.filter(n=>n.categoria===cat) }
function getNegociosByMunicipio(mun){ return NEGOCIOS.filter(n=>n.municipio===mun) }
function getNegocioById(id){ return NEGOCIOS.find(n=>n.id===id) }
function getMunicipioById(id){ return MUNICIPIOS.find(m=>m.id===id) }
