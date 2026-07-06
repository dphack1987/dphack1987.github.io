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
    imagen: IMG + 'alojamientos/armont.jpg', nivel:'estandar', lat:4.52, lng:-75.64
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
    imagen: IMG + 'alojamientos/hotel_descanso.jpg', nivel:'estandar', lat:4.519, lng:-75.635
  },
  {
    id:'hotel-gran-chaparral', nombre:'Hotel Gran Chaparral', categoria:'alojamiento', tipo:'Hotel',
    municipio:'calarca', desc:'Hotel de categoría en Calarcá con restaurante y salones de eventos.',
    servicios:['Restaurante','WiFi','Parqueadero','Eventos'],
    precio:'Desde $150.000/noche', telefono:'+57 300 000 0005', whatsapp:'573000000005',
    maps:'https://maps.google.com/?q=Hotel+Gran+Chaparral+Calarca',
    imagen: IMG + 'alojamientos/hotel-gran-chaparral.jpg', nivel:'premium', lat:4.518, lng:-75.633
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
    imagen: IMG + 'alojamientos/peñas.jpg', nivel:'estandar', lat:4.516, lng:-75.631
  },
  {
    id:'ticlan', nombre:'Ticlan Hotel', categoria:'alojamiento', tipo:'Hotel Boutique',
    municipio:'calarca', desc:'Hotel boutique moderno en Calarcá con diseño contemporáneo y servicio personalizado.',
    servicios:['WiFi','Bar','Restaurante','Parqueadero'],
    precio:'Desde $160.000/noche', telefono:'+57 300 000 0008', whatsapp:'573000000008',
    maps:'https://maps.google.com/?q=Ticlan+Hotel+Calarca',
    imagen: IMG + 'alojamientos/ticlan.jpg', nivel:'premium', lat:4.515, lng:-75.630
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
    id:'quindio-travel', nombre:'Quindío Travel', categoria:'agencia', tipo:'Operador turístico',
    municipio:'armenia', desc:'Planes turísticos para el Quindío y el Eje Cafetero. RNT 18152.',
    servicios:['Tours guiados','Paquetes turísticos','Transporte','Guías'],
    precio:'Tours desde $80.000/persona', telefono:'+57 317 442 6044', whatsapp:'573174426044',
    maps:'https://maps.google.com/?q=Quindio+Travel+Armenia',
    imagen: './pautas_publicitarias/agencias_de_turismo/agencia_operador_turistico_quindiotravel.png', nivel:'premium', lat:4.5339, lng:-75.6811
  },
  {
    id:'buen-vuelo-tours', nombre:'Buen Vuelo Tours', categoria:'agencia', tipo:'Agencia de viajes',
    municipio:'armenia', desc:'¡Somos tus cómplices en la aventura de explorar el mundo. RNT 185697 / RNT 144322.',
    servicios:['Tours','Paquetes turísticos','Transporte','Guías'],
    precio:'Consultar', telefono:'+57 301 204 2819', whatsapp:'573012042819',
    maps:'https://maps.google.com/?q=Buen+Vuelo+Tours+Armenia',
    imagen: './pautas_publicitarias/agencias_de_turismo/buen_vuelo_tours.png', nivel:'premium', lat:4.535, lng:-75.683
  },
  {
    id:'del-eje', nombre:'Del Eje (Experiencias de Turismo)', categoria:'agencia', tipo:'Agencia de experiencias',
    municipio:'montenegro', desc:'Alojamientos, transporte, entrada a los parques temáticos. Operando desde Hotel Campestre La Manuela.',
    servicios:['Alojamientos','Transporte','Entrada a parques temáticos','Guías'],
    precio:'Consultar', telefono:'+57 301 857 3715', whatsapp:'573018573715',
    maps:'https://maps.google.com/?q=Km+5+vía+Armenia+-+Montenegro+Vereda+el+Halón',
    imagen: './pautas_publicitarias/agencias_de_turismo/del_eje_2.png', nivel:'estandar', lat:4.56, lng:-75.73
  },
  {
    id:'julian-arrubla', nombre:'Julián Arrubla Vélez', categoria:'agencia', tipo:'Guía de turismo',
    municipio:'armenia', desc:'Guía de turismo / Guía cuyabro. TP 2719, RNT 66504.',
    servicios:['Tours guiados','Guía bilingüe','Cultura cafetera'],
    precio:'Consultar', telefono:'+57 321 899 5839', whatsapp:'573218995839',
    maps:'https://maps.google.com/?q=Julián+Arrubla+Vélez+Armenia',
    imagen: './pautas_publicitarias/agencias_de_turismo/juan_arrubla.png', nivel:'premium', lat:4.534, lng:-75.682
  },
  {
    id:'enlaces-viajes', nombre:'Enlaces Viajes y Turismo', categoria:'agencia', tipo:'Agencia de viajes',
    municipio:'armenia', desc:'Experiencias que cambian vidas.',
    servicios:['Tours','Paquetes turísticos'],
    precio:'Consultar', telefono:'+57 322 654 2124', whatsapp:'573226542124',
    maps:'https://maps.google.com/?q=Cra+13+A+%23+1N+-+05+Local+3+Armenia',
    imagen: './pautas_publicitarias/agencias_de_turismo/viajes_turismo_enlaces.png', nivel:'estandar', lat:4.53, lng:-75.68
  },
  {
    id:'rutas-y-turismo', nombre:'Rutas y Turismo', categoria:'agencia', tipo:'Agencia de Viajes',
    municipio:'armenia', desc:'Especialistas en transportes especiales, logística de eventos, alojamiento rural y guianza especializada.',
    servicios:['Transporte turístico','Logística de eventos','Alojamiento rural','Guianza'],
    precio:'Consultar', telefono:'+57 310 463 1678', whatsapp:'573104631678',
    maps:'https://www.rutasyturismo.com',
    imagen: './pautas_publicitarias/Transportes/rutas_y_turismo.png', nivel:'premium', lat:4.536, lng:-75.684
  },

  /* ALOJAMIENTOS/FINCAS */
  {
    id:'casa-campestre-la-cosecha', nombre:'Casa Campestre La Cosecha', categoria:'alojamiento', tipo:'Casa campestre',
    municipio:'pueblo-tapao', desc:'Km 2.4 vía Armenia - Pueblo Tapao, Quindío.',
    servicios:['Alojamiento','Jardín','Desayuno'],
    precio:'Consultar', telefono:'+57 315 699 9060', whatsapp:'573156999060',
    maps:'https://maps.google.com/?q=Casa+Campestre+La+Cosecha+Quindio',
    imagen: './pautas_publicitarias/Alquiler_de_fincas/casa_campestre_lacosecha.png', nivel:'premium', lat:4.48, lng:-75.7
  },
  {
    id:'finca-cafetera-el-ocaso', nombre:'Finca Cafetera El Ocaso', categoria:'alojamiento', tipo:'Finca cafetera',
    municipio:'salento', desc:'Finca cafetera / Café - tour - hotel en Salento, Quindío.',
    servicios:['Tour del café','Alojamiento','Desayuno'],
    precio:'Consultar', telefono:'+57 313 425 3669', whatsapp:'573134253669',
    maps:'https://maps.google.com/?q=Finca+El+Ocaso+Salento',
    imagen: './pautas_publicitarias/Alquiler_de_fincas/finca_cafetera_el_ocaso.png', nivel:'premium', lat:4.6367, lng:-75.5711
  },
  {
    id:'la-floresta-hotel-campestre', nombre:'La Floresta Hotel Campestre', categoria:'alojamiento', tipo:'Hotel campestre',
    municipio:'armenia', desc:'Naturaleza que inspira, experiencia que transforma. Tradición en turismo ecológico. Km 3 vía Armenia al aeropuerto.',
    servicios:['Circuito ecológico','Piscina','Terrazas','Auditorio','Sala de internet','WiFi','Parqueadero'],
    precio:'Consultar', telefono:'+57 312 328 1021', whatsapp:'573123281021',
    maps:'https://maps.google.com/?q=Km+3+vía+Armenia+al+aeropuerto',
    imagen: './pautas_publicitarias/Alquiler_de_fincas/hotel_cafe_cafe_campestre.png', nivel:'premium', lat:4.5, lng:-75.6
  },
  {
    id:'hacienda-moraleja', nombre:'Hacienda Moraleja', categoria:'alojamiento', tipo:'Hacienda / Alojamiento',
    municipio:'calarca', desc:'Restaurante, glamping, alojamiento, eventos y noche romántica. Km 7 vía Calarcá / Barcelona.',
    servicios:['Restaurante','Glamping','Alojamiento','Eventos'],
    precio:'Consultar', telefono:'+57 320 683 4432', whatsapp:'573206834432',
    maps:'https://maps.google.com/?q=Hacienda+Moraleja+Calarca',
    imagen: './pautas_publicitarias/Alquiler_de_fincas/hotel_delirio_campestre_quindio.png', nivel:'estandar', lat:4.53, lng:-75.62
  },
  {
    id:'alma-nativa-hotel-campestre', nombre:'Alma Nativa Hotel Campestre', categoria:'alojamiento', tipo:'Hotel campestre',
    municipio:'calarca', desc:'Reconecta contigo. Calarcá vía Barcelona, Vereda La Albania.',
    servicios:['Habitaciones familiares','Habitaciones dobles','Habitaciones luxury'],
    precio:'Consultar', telefono:'+57 310 575 2469', whatsapp:'573105752469',
    maps:'https://maps.google.com/?q=Alma+Nativa+Hotel+Campestre+Calarca',
    imagen: './pautas_publicitarias/Alquiler_de_fincas/hotel_delirio_campestre_quindio.png', nivel:'premium', lat:4.52, lng:-75.61
  },
  {
    id:'hotel-cafe-cafe', nombre:'Hotel Café Café Campestre', categoria:'alojamiento', tipo:'Hotel campestre',
    municipio:'armenia', desc:'Tradición, naturaleza y confort en el Quindío.',
    servicios:['Habitaciones','WiFi','Desayuno','Parqueadero'],
    precio:'Consultar', telefono:'+57 311 418 7558', whatsapp:'573114187558',
    maps:'https://maps.google.com/?q=Hotel+Café+Café+Campestre+Quindio',
    imagen: './pautas_publicitarias/Alquiler_de_fincas/hotel_cafe_cafe_campestre.png', nivel:'premium', lat:4.54, lng:-75.69
  },
  {
    id:'hotel-delirio-campestre', nombre:'Hotel Delirio Campestre Quindío', categoria:'alojamiento', tipo:'Hotel campestre',
    municipio:'montenegro', desc:'Km 1 vía Montenegro, Parque del Café, Montenegro, Quindío.',
    servicios:['Habitaciones','WiFi','Desayuno','Parqueadero'],
    precio:'Consultar', telefono:'+57 320 256 8458', whatsapp:'573202568458',
    maps:'https://maps.google.com/?q=Hotel+Delirio+Campestre+Quindio',
    imagen: './pautas_publicitarias/Alquiler_de_fincas/hotel_delirio_campestre_quindio.png', nivel:'estandar', lat:4.5667, lng:-75.75
  },
  {
    id:'linaje-salvaje', nombre:'Linaje Salvaje', categoria:'alojamiento', tipo:'Hotel',
    municipio:'calarca', desc:'Vía Albania km 8 vía Calarcá - Barcelona, Quindío.',
    servicios:['Habitaciones','WiFi','Desayuno','Parqueadero'],
    precio:'Consultar', telefono:'+57 313 732 1433', whatsapp:'573137321433',
    maps:'https://maps.google.com/?q=Linaje+Salvaje+Quindio',
    imagen: './pautas_publicitarias/Alquiler_de_fincas/hotel_cafe_cafe_campestre.png', nivel:'estandar', lat:4.55, lng:-75.6
  },
  {
    id:'hotel-el-bosque', nombre:'Hotel El Bosque', categoria:'alojamiento', tipo:'Hotel',
    municipio:'armenia', desc:'Lo mejor en calidad y precio en el centro de la ciudad de Armenia, Quindío.',
    servicios:['Habitaciones','WiFi','Desayuno','Parqueadero'],
    precio:'Consultar', telefono:'+57 317 647 1482', whatsapp:'573176471482',
    maps:'https://maps.google.com/?q=Hotel+El+Bosque+Armenia',
    imagen: './pautas_publicitarias/hoteles_armenia/hotel_el_bosque_armenia.png', nivel:'premium', lat:4.533, lng:-75.68
  },
  {
    id:'isa-victory-hotel', nombre:'Isa Victory Hotel', categoria:'alojamiento', tipo:'Hotel boutique',
    municipio:'armenia', desc:'Comodidad, diseño y ubicación premium en el norte de Armenia, Quindío. Av Bolívar 21 Norte 47.',
    servicios:['Gimnasio','Restaurante','Bar','Salón de eventos','Zona coworking','Sky club'],
    precio:'Consultar', telefono:'+57 320 770 7079', whatsapp:'573207707079',
    maps:'https://maps.google.com/?q=Isa+Victory+Hotel+Armenia',
    imagen: './pautas_publicitarias/hoteles_armenia/hotel_san_jerónimo.png', nivel:'premium', lat:4.54, lng:-75.68
  },
  {
    id:'hotel-san-jeronimo', nombre:'Hotel San Jerónimo', categoria:'alojamiento', tipo:'Hotel',
    municipio:'armenia', desc:'A better rest just one place. Cra 14 #14-14 Armenia-Quindío.',
    servicios:['Desayuno','Modernidad','WiFi','Aire acondicionado'],
    precio:'Consultar', telefono:'+57 310 831 4719', whatsapp:'573108314719',
    maps:'https://maps.google.com/?q=Hotel+San+Jerónimo+Armenia',
    imagen: './pautas_publicitarias/hoteles_armenia/hotel_san_jerónimo.png', nivel:'estandar', lat:4.535, lng:-75.683
  },

  /* ARTESANÍAS */
  {
    id:'artesanias-turron-y-cafe', nombre:'Artesanías Turrón y Café', categoria:'artesanias', tipo:'Artesanías, bisutería y dulcería',
    municipio:'armenia', desc:'Las mejores artesanías del departamento. Cra 14 # 14-43 Armenia, Quindío.',
    servicios:['Artesanías','Bisutería','Dulcería','Café'],
    precio:'Consultar', telefono:'+57 310 398 3619', whatsapp:'573103983619',
    maps:'https://maps.google.com/?q=Artesanías+Turrón+y+Café+Armenia',
    imagen: './pautas_publicitarias/artesanias/artesanias_turronycafe.png', nivel:'premium', lat:4.53, lng:-75.68
  },
  {
    id:'ceramicas-el-alfarero', nombre:'Cerámicas El Alfarero', categoria:'artesanias', tipo:'Puesto de alfarero',
    municipio:'circasia', desc:'Puesto de alfarero donde enseñan a hacer vasijas. Venta de productos de arcilla: ceniceros, móviles, pebeteros, candeleros de mesa y pared, materas pequeñas, lapiceras, joyeros, móviles de chorotes y bohíos. Centro Artesanal Plaza de Bolívar, Circasia.',
    servicios:['Taller de alfarería','Venta de artesanías'],
    precio:'Consultar', telefono:'+57 320 617 8498', whatsapp:'573206178498',
    maps:'https://maps.google.com/?q=Cerámicas+El+Alfarero+Circasia',
    imagen: './pautas_publicitarias/artesanias/ceramicas_alfarero.jpg', nivel:'estandar', lat:4.6167, lng:-75.6333
  },

  /* ATRACTIVOS TURÍSTICOS */
  {
    id:'cascadas-rio-verde', nombre:'Reserva Natural Cascadas de Río Verde', categoria:'sitio-turistico', tipo:'Plan de pasadía turístico y ecoturismo',
    municipio:'cordoba', desc:'Incluye entrada a la reserva, póliza de accidentes, transporte en Willys desde Córdoba, recorrido experiencia, baño en las cascadas, acompañamiento permanente de un intérprete ambiental y cultural, guía de turismo, refrigerio y almuerzo. Operador aliado: Quindío Travel.',
    servicios:['Senderismo','Baños en cascadas','Guía ambiental','Transporte en Willys','Refrigerio','Almuerzo'],
    precio:'Consultar', telefono:'+57 317 442 6044', whatsapp:'573174426044',
    maps:'https://maps.google.com/?q=Reserva+Natural+Cascadas+de+Río+Verde+Cordoba',
    imagen: './pautas_publicitarias/atractivos_turisticos/cascadas_rio_verde.png', nivel:'premium', lat:4.7667, lng:-75.65
  },
  {
    id:'complejo-soleden', nombre:'Complejo Turístico y Deportivo Soledén', categoria:'sitio-turistico', tipo:'Complejo recreativo y deportivo',
    municipio:'armenia', desc:'Pasa por todos los gustos y todas las edades. Pasaporte multiatracciones: piscinas, lago, tirolesa, almuerzo y refrigerio. Vigilado Supersubsidio.',
    servicios:['Piscinas','Lago','Tirolesa','Almuerzo','Refrigerio'],
    precio:'Pasaporte desde $13.600', telefono:'+57 300 000 0099', whatsapp:'5730000000099',
    maps:'https://soleden.co',
    imagen: './pautas_publicitarias/atractivos_turisticos/Complejo_Turístico_y_Deportivo_Soledén.png', nivel:'premium', lat:4.54, lng:-75.69
  },
  {
    id:'ecoparque-penas-blancas', nombre:'Ecoparque Peñas Blancas', categoria:'sitio-turistico', tipo:'Ecoparque',
    municipio:'calarca', desc:'Eco bachaco (alojamiento ancestral en superadobe, temperatura constante, sueño profundo y relajamiento total).',
    servicios:['Alojamiento','Senderismo','Aventura','Restaurante'],
    precio:'Consultar', telefono:'+57 310 396 7951', whatsapp:'573103967951',
    maps:'https://www.calarca.net/ecoparquepenasblancas',
    imagen: './pautas_publicitarias/atractivos_turisticos/parque_los_arrieros.png', nivel:'premium', lat:4.5, lng:-75.63
  },
  {
    id:'finca-las-flores', nombre:'Finca Las Flores', categoria:'sitio-turistico', tipo:'Recorrido de cacao tradicional',
    municipio:'genova', desc:'Finca Las Flores, Vereda las Brisas, Génova, Quindío.',
    servicios:['Tour del cacao','Taller de chocolate','Degustación'],
    precio:'Consultar', telefono:'+57 320 955 5062', whatsapp:'573209555062',
    maps:'https://maps.google.com/?q=Finca+Las+Flores+Genova',
    imagen: './pautas_publicitarias/atractivos_turisticos/quinti_casa_patasarriba.png', nivel:'estandar', lat:4.0167, lng:-75.7667
  },
  {
    id:'la-pequena-granja-mama-lulu', nombre:'La Pequeña Granja de Mamá Lulú', categoria:'sitio-turistico', tipo:'Turismo académico y científico',
    municipio:'quimbaya', desc:'Turismo académico y científico, recorridos agroecológicos, posada nativa, restaurante típico y tienda artesanal. Vereda Palermo, Quimbaya, Quindío.',
    servicios:['Recorridos agroecológicos','Restaurante típico','Posada nativa','Tienda artesanal'],
    precio:'Consultar', telefono:'+57 311 389 4646', whatsapp:'573113894646',
    maps:'https://www.granjamamalulu.com',
    imagen: './pautas_publicitarias/atractivos_turisticos/recorrido_cacaotero.png', nivel:'premium', lat:4.6167, lng:-75.7667
  },
  {
    id:'jardin-botanico-del-quindio', nombre:'Jardín Botánico del Quindío', categoria:'sitio-turistico', tipo:'Centro de investigación, educación y conservación ambiental',
    municipio:'calarca', desc:'Avistamiento de aves endémicas, mariposas exóticas y escondidas, mariposario único. Av. Centenario No. 15-190, Calarcá, Quindío.',
    servicios:['Avistamiento de aves','Mariposario','Senderos','Educación ambiental'],
    precio:'Consultar', telefono:'+57 310 404 5223', whatsapp:'573104045223',
    maps:'https://maps.google.com/?q=Jardín+Botánico+del+Quindío+Calarca',
    imagen: './pautas_publicitarias/atractivos_turisticos/Complejo_Turístico_y_Deportivo_Soledén.png', nivel:'premium', lat:4.5167, lng:-75.6333
  },
  {
    id:'el-laberinto-mil-caminos', nombre:'El Laberinto Mil Caminos', categoria:'sitio-turistico', tipo:'Atracción turística / Laberinto',
    municipio:'quimbaya', desc:'Vereda Morelia Alta, Quimbaya, Quindío.',
    servicios:['Laberinto','Senderos','Fotografía'],
    precio:'Consultar', telefono:'+57 317 112 9239', whatsapp:'573171129239',
    maps:'https://www.laberintomilcaminos.com',
    imagen: './pautas_publicitarias/atractivos_turisticos/parque_los_arrieros.png', nivel:'estandar', lat:4.6, lng:-75.77
  },
  {
    id:'mirador-encanto-filandia', nombre:'Mirador Encanto Filandia', categoria:'sitio-turistico', tipo:'Mirador y cafetería',
    municipio:'filandia', desc:'Calle 7 #7-29, Filandia, Colombia.',
    servicios:['Mirador','Cafetería','Fotografía'],
    precio:'Consultar', telefono:'+57 320 936 9950', whatsapp:'573209369950',
    maps:'https://maps.google.com/?q=Mirador+Encanto+Filandia',
    imagen: './pautas_publicitarias/atractivos_turisticos/quinti_casa_patasarriba.png', nivel:'estandar', lat:4.6736, lng:-75.6547
  },
  {
    id:'turismo-panaca', nombre:'Turismo PANACA', categoria:'sitio-turistico', tipo:'Parque temático',
    municipio:'quimbaya', desc:'Diseñamos experiencias que se sienten, se viven y se recuerdan. En Turismo PANACA creamos planes para viajar, aprender y compartir.',
    servicios:['Tours','Aventura','Gastronomía','Niños'],
    precio:'Consultar', telefono:'+57 300 000 0100', whatsapp:'5730000000100',
    maps:'https://maps.google.com/?q=PANACA+Quindio',
    imagen: './pautas_publicitarias/atractivos_turisticos/Complejo_Turístico_y_Deportivo_Soledén.png', nivel:'premium', lat:4.62, lng:-75.77
  },
  {
    id:'parque-los-arrieros', nombre:'Parque Los Arrieros', categoria:'sitio-turistico', tipo:'Parque',
    municipio:'quimbaya', desc:'Tradición, cultura y diversión en familia. Quimbaya - Quindío.',
    servicios:['Aventura','Cultura','Gastronomía','Restaurante'],
    precio:'Consultar', telefono:'+57 313 610 7681', whatsapp:'573136107681',
    maps:'https://www.parquelosarrieros.com',
    imagen: './pautas_publicitarias/atractivos_turisticos/parque_los_arrieros.png', nivel:'premium', lat:4.61, lng:-75.77
  },
  {
    id:'qinti-parque-montana', nombre:'Qinti (Parque en la Montaña)', categoria:'sitio-turistico', tipo:'Ecoparque',
    municipio:'cordoba', desc:'La Casa Cafetera al Revés, 17 estaciones para tomar fotografías. Córdoba, Quindío.',
    servicios:['Tirolesa','Canopy','Senderismo','Restaurante','Fotografía'],
    precio:'Consultar', telefono:'+57 312 681 5139', whatsapp:'573126815139',
    maps:'https://maps.google.com/?q=Qinti+Parque+en+la+Montaña+Cordoba',
    imagen: './pautas_publicitarias/atractivos_turisticos/quinti_casa_patasarriba.png', nivel:'premium', lat:4.7667, lng:-75.66
  },
  {
    id:'finca-la-alejandra', nombre:'Finca La Alejandra (Territorio Paisaje)', categoria:'sitio-turistico', tipo:'Recorrido cacaotero',
    municipio:'genova', desc:'¡Tu experiencia con el chocolate! Un plan diferente en el Quindío... Deleita tus sentidos con el proceso del chocolate del árbol a la taza. Territorio Paisaje también ofrece alojamientos, parques temáticos, recorridos y rutas turísticas, guianza y servicio de transporte.',
    servicios:['Tour del cacao','Alojamiento','Guianza','Transporte'],
    precio:'Consultar', telefono:'+57 314 657 3393', whatsapp:'573146573393',
    maps:'https://maps.google.com/?q=Finca+La+Alejandra+Territorio+Paisaje',
    imagen: './pautas_publicitarias/atractivos_turisticos/recorrido_cacaotero.png', nivel:'premium', lat:4.02, lng:-75.77
  },

  /* CENTROS COMERCIALES */
  {
    id:'centro-comercial-sansur', nombre:'Centro Comercial SanSur', categoria:'quindio-comercial', tipo:'Centro comercial',
    municipio:'armenia', desc:'Eventos y promociones para toda la familia. Cra 18 # 59-37, Armenia, Quindío.',
    servicios:['Moda','Calzado','Belleza','Tecnología','Comida','Café','Juegos','Supermercado','Cajeros'],
    precio:'Consultar', telefono:'+57 304 610 2606', whatsapp:'573046102606',
    maps:'https://maps.google.com/?q=Centro+Comercial+SanSur+Armenia',
    imagen: './pautas_publicitarias/Centros_Comerciales/centro_comercial_sansur.png', nivel:'premium', lat:4.52, lng:-75.69
  },
  {
    id:'unicentro-armenia', nombre:'Unicentro Armenia', categoria:'quindio-comercial', tipo:'Centro comercial',
    municipio:'armenia', desc:'Un espacio para tod@s.',
    servicios:['Moda','Calzado','Belleza','Tecnología','Comida','Café','Juegos','Supermercado','Cajeros'],
    precio:'Consultar', telefono:'+57 300 000 0101', whatsapp:'5730000000101',
    maps:'https://www.unicentrodearmenia.com',
    imagen: './pautas_publicitarias/Centros_Comerciales/centro_comercial_sansur.png', nivel:'premium', lat:4.55, lng:-75.68
  },

  /* COCTELES/LICORES */
  {
    id:'dos-cielos-boutique', nombre:'Dos Cielos Boutique de Licores', categoria:'gastronomia', tipo:'Boutique de licores',
    municipio:'armenia', desc:'Carrera 14 # 14 Norte - 30, Armenia, Quindío.',
    servicios:['Venta de licores','Degustaciones'],
    precio:'Consultar', telefono:'+57 302 347 8080', whatsapp:'573023478080',
    maps:'https://maps.google.com/?q=Dos+Cielos+Boutique+de+Licores+Armenia',
    imagen: './pautas_publicitarias/Cocteles_licores/boutique_licores_doscielos.png', nivel:'premium', lat:4.53, lng:-75.68
  },
  {
    id:'cantina-el-desmadre', nombre:'Cantina El Desmadre', categoria:'gastronomia', tipo:'Cantina',
    municipio:'armenia', desc:'Cra 16 # 21N, Barrio Laureles; Armenia Q.',
    servicios:['Cocteles','Licores','Comida'],
    precio:'Consultar', telefono:'+57 313 776 8567', whatsapp:'573137768567',
    maps:'https://maps.google.com/?q=Cantina+El+Desmadre+Armenia',
    imagen: './pautas_publicitarias/Cocteles_licores/cantina_el_desmadre.png', nivel:'estandar', lat:4.54, lng:-75.69
  },

  /* GASTRONOMÍA */
  {
    id:'la-fogata-steak-house', nombre:'La Fogata Steak House', categoria:'gastronomia', tipo:'Restaurante',
    municipio:'armenia', desc:'ESTD 1963. Av Bolívar 14N - 39, Armenia, Quindío.',
    servicios:['Carnes','Parrilla','Comida típica','Reservas'],
    precio:'Menú desde $30.000', telefono:'+57 312 248 0291', whatsapp:'573122480291',
    maps:'https://maps.google.com/?q=La+Fogata+Steak+House+Armenia',
    imagen: './pautas_publicitarias/Cocteles_licores/la_fogata.png', nivel:'premium', lat:4.53, lng:-75.68
  },
  {
    id:'la-fogata-express', nombre:'La Fogata Express', categoria:'gastronomia', tipo:'Restaurante',
    municipio:'circasia', desc:'Circasia Roof Top, Centro Artesanal Plaza Principal, Piso 3.',
    servicios:['Comida','Cocteles'],
    precio:'Menú desde $25.000', telefono:'+57 310 214 7135', whatsapp:'573102147135',
    maps:'https://maps.google.com/?q=La+Fogata+Express+Circasia',
    imagen: './pautas_publicitarias/Cocteles_licores/lafogata_circasia.png', nivel:'estandar', lat:4.6167, lng:-75.6333
  },
  {
    id:'restaurante-magangue-altavista', nombre:'Restaurante Magangué Altavista', categoria:'gastronomia', tipo:'Restaurante',
    municipio:'armenia', desc:'Calle 17 # 13 - 50 Segundo Piso, Por Calle Real, Armenia, Colombia.',
    servicios:['Comida','Reservas','Domicilios'],
    precio:'Menú desde $28.000', telefono:'+57 318 601 1957', whatsapp:'573186011957',
    maps:'https://maps.google.com/?q=Restaurante+Magangué+Altavista+Armenia',
    imagen: './pautas_publicitarias/comida_de_mar/restaurante_magangue.png', nivel:'estandar', lat:4.535, lng:-75.68
  },
  {
    id:'arepa-town', nombre:'Classic Arepa Town Fast Food', categoria:'gastronomia', tipo:'Comida rápida',
    municipio:'armenia', desc:'Calle 50 Containers de los naranjos local 10, Armenia, Colombia.',
    servicios:['Arepas','Comida rápida','Domicilios'],
    precio:'Menú desde $15.000', telefono:'+57 314 562 1785', whatsapp:'573145621785',
    maps:'https://maps.google.com/?q=Classic+Arepa+Town+Fast+Food+Armenia',
    imagen: './pautas_publicitarias/Comidas_Rapidas/arepa_town.png', nivel:'estandar', lat:4.52, lng:-75.69
  },
  {
    id:'john-chewing-food', nombre:'John Chewing Food', categoria:'gastronomia', tipo:'Comida rápida',
    municipio:'armenia', desc:'¡La Buena Comida Alegra la Vida! Antiguo Estadio San José, Frente a las canchas sintéticas local 1.',
    servicios:['Comida rápida','Domicilios'],
    precio:'Menú desde $18.000', telefono:'+57 322 839 1293', whatsapp:'573228391293',
    maps:'https://maps.google.com/?q=John+Chewing+Food+Armenia',
    imagen: './pautas_publicitarias/Comidas_Rapidas/jhon_chewing_food.png', nivel:'estandar', lat:4.53, lng:-75.69
  },
  {
    id:'mostricos', nombre:'MostRicos', categoria:'gastronomia', tipo:'Comida rápida',
    municipio:'armenia', desc:'Sede 1: Barrio Granada Cra 23e 11-84 Piso 2. Sede 2: Cra 14 21 Norte. Plato destacado: Bomba Nuclear.',
    servicios:['Comida rápida','Domicilios'],
    precio:'Menú desde $20.000', telefono:'+57 304 245 1420', whatsapp:'573042451420',
    maps:'https://maps.google.com/?q=MostRicos+Armenia',
    imagen: './pautas_publicitarias/Comidas_Rapidas/mostricos.png', nivel:'premium', lat:4.54, lng:-75.68
  },
  {
    id:'sandukes', nombre:'SánDukes', categoria:'gastronomia', tipo:'Sanducheria',
    municipio:'armenia', desc:'¡Comiendo SANO Y delicioso! Menú sánduches: Encendido (costilla ahumada, miel-bbq, queso), Nevado (pollo desmechado en salsa blanca, queso), Ranchero (carne desmechada, tocino, chorizo, cheddar), Despeinado (carne desmechada, salsa de la casa, queso), Paisaje (pollo desmechado, verduras salteadas, queso), Hawaiano (piña calada, queso, jamón). Todos incluyen tomate, lechuga, pepino (excepto Hawaiano). Menú línea dulce: arequipe de maracuyá, arequipe de café, muffin de zanahoria (nueces, pasas, cubierta blanca), tarta de queso (receta española premiada).',
    servicios:['Sánduches','Postres','Domicilios'],
    precio:'Menú desde $12.000', telefono:'+57 321 407 7605', whatsapp:'573214077605',
    maps:'https://maps.google.com/?q=SánDukes+Armenia',
    imagen: './pautas_publicitarias/Comidas_Rapidas/sanduches_sandukes.png', nivel:'estandar', lat:4.53, lng:-75.68
  },
  {
    id:'el-fogon-cuyabro', nombre:'El Fogón Cuyabro', categoria:'gastronomia', tipo:'Restaurante típico',
    municipio:'armenia', desc:'¡Sabor de Casa, Corazón Paisa! Sabor que nace de nuestras raíces. Parque Sucre, carrera 14 #12-48.',
    servicios:['Comida típica','Domicilios','Reservas'],
    precio:'Menú desde $25.000', telefono:'+57 311 386 2329', whatsapp:'573113862329',
    maps:'https://maps.google.com/?q=El+Fogón+Cuyabro+Armenia',
    imagen: './pautas_publicitarias/Gastronomia_tipica/restaurante_el_fogon.png', nivel:'premium', lat:4.535, lng:-75.68
  },
  {
    id:'el-roble', nombre:'El Roble', categoria:'gastronomia', tipo:'Restaurante campestre',
    municipio:'armenia', desc:'Ven a vivir El Roble. Comida típica con la mejor sazón. Km 12 vía Armenia - Pereira.',
    servicios:['Comida típica','Reservas','Restaurante'],
    precio:'Menú desde $30.000', telefono:'+57 317 517 1403', whatsapp:'573175171403',
    maps:'https://maps.google.com/?q=El+Roble+Km+12+vía+Armenia+-+Pereira',
    imagen: './pautas_publicitarias/Gastronomia_tipica/restaurante_la_feria_del_platano.png', nivel:'estandar', lat:4.6, lng:-75.65
  },
  {
    id:'la-feria-del-platano', nombre:'La Feria del Plátano', categoria:'gastronomia', tipo:'Restaurante típico',
    municipio:'armenia', desc:'Sabor típico del Quindío. Platos destacados: sancocho de gallina, bandeja paisa, chuleta de cerdo. Sedes: Sagrada Familia - Privilegio Mall.',
    servicios:['Comida típica','Domicilios','Reservas'],
    precio:'Menú desde $25.000', telefono:'+57 316 480 5446', whatsapp:'573164805446',
    maps:'https://maps.google.com/?q=La+Feria+del+Plátano+Armenia',
    imagen: './pautas_publicitarias/Gastronomia_tipica/restaurante_la_feria_del_platano.png', nivel:'premium', lat:4.53, lng:-75.68
  },
  {
    id:'anatolia', nombre:'Anatolia', categoria:'gastronomia', tipo:'Restaurante',
    municipio:'armenia', desc:'Un encuentro de sabores en Quindío. Avenida 19 # 35 norte 41, Armenia, Quindío.',
    servicios:['Comida','Reservas'],
    precio:'Menú desde $30.000', telefono:'+57 311 701 1653', whatsapp:'573117011653',
    maps:'https://maps.google.com/?q=Anatolia+Armenia',
    imagen: './pautas_publicitarias/Tiendas_de_cafe/anatolia.png', nivel:'premium', lat:4.54, lng:-75.68
  },

  /* DEPORTES */
  {
    id:'camino-al-futbol', nombre:'Camino al Fútbol', categoria:'deporte', tipo:'Formación deportiva',
    municipio:'armenia', desc:'Formación deportiva de alto nivel / Formación integral. Formación, espíritu y valores.',
    servicios:['Formación deportiva','Entrenamientos','Valores'],
    precio:'Consultar', telefono:'+57 316 402 6653', whatsapp:'573164026653',
    maps:'https://maps.google.com/?q=Camino+al+Fútbol+Armenia',
    imagen: './pautas_publicitarias/Deportes_y_entretenimiento/camino_al_futbol.png', nivel:'estandar', lat:4.53, lng:-75.68
  },

  /* GRUPOS MUSICALES */
  {
    id:'orquesta-quinta-base', nombre:'Orquesta Quinta Base', categoria:'entretenimiento', tipo:'Orquesta',
    municipio:'armenia', desc:'SU EVENTO MERECE LO MEJOR NOSOTROS LO TENEMOS. ORQUESTA QUINTA BASE.',
    servicios:['Música en vivo','Eventos'],
    precio:'Consultar', telefono:'+57 313 683 3186', whatsapp:'573136833186',
    maps:'https://maps.google.com/?q=Orquesta+Quinta+Base+Armenia',
    imagen: './pautas_publicitarias/grupos_musicales/orquesta_quinta_base.png', nivel:'premium', lat:4.53, lng:-75.68
  },

  /* POSTRES/DULCES */
  {
    id:'reina-querida', nombre:'Reina Querida', categoria:'gastronomia', tipo:'Piononos y cremas',
    municipio:'armenia', desc:'¡Ven! Esto te va a gustar... La mezcla ideal entre suavidad y dulzura ✨ Un rincón acogedor con sabor a tradición 🧡 Calle 22 Norte 14-40 Edificio Zona-L lc 6, Armenia, Quindío. Especialidad: piononos y cremas.',
    servicios:['Postres','Piononos','Cremas','Domicilios'],
    precio:'Consultar', telefono:'+57 300 000 0102', whatsapp:'5730000000102',
    maps:'https://maps.google.com/?q=Reina+Querida+Armenia',
    imagen: './pautas_publicitarias/postres_y_dulces/reina__querida.png', nivel:'premium', lat:4.54, lng:-75.68
  },

  /* SEGUROS */
  {
    id:'confia-seguros', nombre:'Confia Seguros', categoria:'seguro', tipo:'Seguros',
    municipio:'armenia', desc:'Respaldo y Tranquilidad. Nombre de la asesora: DIANA MARÍA PRIETO CORREA. Cargo: Asesora en Gestión, Tendencias y Riesgos.',
    servicios:['Seguros de vida','Seguros de automóvil','Seguros de salud','Asesoría en riesgos'],
    precio:'Consultar', telefono:'+57 315 486 1761', whatsapp:'573154861761',
    maps:'https://maps.google.com/?q=Confia+Seguros+Armenia',
    imagen: './pautas_publicitarias/seguros/seguros_confia.png', nivel:'premium', lat:4.534, lng:-75.681
  },
  {
    id:'diana-seguros', nombre:'Diana Seguros de Viaje', categoria:'seguro', tipo:'Seguro de Viaje',
    municipio:'armenia', desc:'Seguros de viaje para turistas nacionales e internacionales. Protege tu aventura en el Quindío.',
    servicios:['Seguro médico','Asistencia 24h','Cancelación','Equipaje'],
    precio:'Desde $15.000/día', telefono:'+57 300 000 0025', whatsapp:'5730000000025',
    maps:'https://maps.google.com/?q=Diana+Seguros+Armenia',
    imagen: IMG + 'seguro de viajes/diana_seguros.jpg', nivel:'estandar', lat:4.534, lng:-75.681
  },

  /* CAFÉS */
  {
    id:'cafe-la-terraza', nombre:'Café La Terraza', categoria:'cafe', tipo:'Café',
    municipio:'armenia', desc:'Tu café de origen, siempre fresco y delicioso. ¡Visítanos en la Plaza de Bolívar! Cll 20 entre Carreras 14 y 15. Abierto todos los días.',
    servicios:['Cafés','Pastelería','WiFi'],
    precio:'Desde $6.000', telefono:'+57 316 446 9365', whatsapp:'573164469365',
    maps:'https://maps.google.com/?q=Café+La+Terraza+Armenia',
    imagen: './pautas_publicitarias/Tiendas_de_cafe/cafe_la_terraza.png', nivel:'premium', lat:4.53, lng:-75.68
  },
  {
    id:'cafe-sensorial', nombre:'Café Sensorial', categoria:'cafe', tipo:'Café Especializado',
    municipio:'armenia', desc:'Tu historia en cada taza / Aroma, tradición. Medium Roast. Especialidades destacadas: Espresso | Latte | Cold Brew. Parque Fundadores — Local 07.',
    servicios:['Cafés especiales','Pastelería','WiFi','Catas'],
    precio:'Desde $8.000', telefono:'+57 311 711 3473', whatsapp:'573117113473',
    maps:'https://maps.google.com/?q=Café+Sensorial+Armenia',
    imagen: './pautas_publicitarias/Tiendas_de_cafe/cafe_sensorial.png', nivel:'premium', lat:4.535, lng:-75.685
  },
  {
    id:'queso-y-cafe', nombre:'Queso & Café', categoria:'cafe', tipo:'Café y snacks',
    municipio:'armenia', desc:'Armenia - Quindío • Tradición • ¡Llegamos a Laureles, Armenia! Ven y disfruta de los mejores pandebonos del mundo. Te esperamos en nuestra nueva sede: Calle 22 Norte Cra 14 - 28 Edificio Torre Ele local 1.',
    servicios:['Café','Pandebonos','Snacks','WiFi'],
    precio:'Desde $5.000', telefono:'+57 300 000 0103', whatsapp:'5730000000103',
    maps:'https://maps.google.com/?q=Queso+%26+Café+Armenia',
    imagen: './pautas_publicitarias/Tiendas_de_cafe/queso_y_cafe.png', nivel:'estandar', lat:4.54, lng:-75.68
  },
  {
    id:'cafeina-coffee-shop', nombre:'Tienda de Café & Academia Cafeína', categoria:'cafe', tipo:'Café y Academia',
    municipio:'armenia', desc:'Cafeína Coffee Shop. Tienda de café & academia. Capacitaciones personalizadas: barismo, catas y calidad del café, tostión, mantenimiento de máquinas, tienda de café especial. Calle 17N #10-30 Barrio El Nogal, Armenia, Quindío.',
    servicios:['Cafés especiales','Capacitaciones en barismo','Catas','Mantenimiento de máquinas','Tienda de café'],
    precio:'Consultar', telefono:'+57 317 439 3457', whatsapp:'573174393457',
    maps:'https://maps.google.com/?q=Cafeína+Coffee+Shop+Armenia',
    imagen: './pautas_publicitarias/Tiendas_de_cafe/tienda_de_cafe_y_academia_cafeina.png', nivel:'premium', lat:4.53, lng:-75.69
  },

  /* TRANSPORTE */
  {
    id:'radio-taxi-quindio', nombre:'Radio Taxi del Quindío', categoria:'transporte', tipo:'Taxi',
    municipio:'armenia', desc:'Desde 1991. Pide un taxi a cualquier hora del día 24/7. Descarga la app en App Store y Google Play.',
    servicios:['Taxi 24h','App de taxi','Transporte seguro'],
    precio:'Consultar', telefono:'+57 311 542 2222', whatsapp:'573115422222',
    maps:'https://maps.google.com/?q=Radio+Taxi+del+Quindío',
    imagen: './pautas_publicitarias/Transportes/radio_taxi.png', nivel:'premium', lat:4.53, lng:-75.68
  },
  {
    id:'joselu-transporte', nombre:'Joselu Transporte y Turismo', categoria:'transporte', tipo:'Transporte turístico',
    municipio:'armenia', desc:'¿A dónde quieres ir hoy?',
    servicios:['Transporte turístico','Transporte privado','Turismo'],
    precio:'Consultar', telefono:'+57 302 215 3132', whatsapp:'573022153132',
    maps:'https://maps.google.com/?q=Joselu+Transporte+y+Turismo',
    imagen: './pautas_publicitarias/Transportes/transportes_joselu.png', nivel:'estandar', lat:4.53, lng:-75.68
  },
  {
    id:'mocca-aventura-y-cafe', nombre:'Mocca Aventura y Café', categoria:'transporte', tipo:'Operadora y transporte turístico',
    municipio:'armenia', desc:'Operadora y transporte turístico. Somos una operadora turística y de transporte del eje cafetero, donde cada tour es a través del corazón del eje.',
    servicios:['Transporte turístico','Tours','Guías'],
    precio:'Consultar', telefono:'+57 311 704 3170', whatsapp:'573117043170',
    maps:'https://maps.google.com/?q=Mocca+Aventura+y+Café',
    imagen: './pautas_publicitarias/Transportes/transportes_mocca.png', nivel:'premium', lat:4.53, lng:-75.68
  },
  {
    id:'transportes-union-cafetera', nombre:'Transportes Unión Cafetera', categoria:'transporte', tipo:'Transporte',
    municipio:'armenia', desc:'Transequin - Unión Cafetera. RNT 65574. Expertos en transporte / Afíliate a nuestro Parque Automotor. Servicios: transporte escolar, empresarial, de salud y transporte de turismo. Vigilado SuperTransporte.',
    servicios:['Transporte escolar','Transporte empresarial','Transporte de salud','Transporte turístico'],
    precio:'Consultar', telefono:'+57 300 590 8383', whatsapp:'573005908383',
    maps:'https://www.unioncafetera.com',
    imagen: './pautas_publicitarias/Transportes/transportes_union_cafetera.png', nivel:'premium', lat:4.53, lng:-75.68
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

/* ── HELPERS ── */
function generateSchemaOrg(negocio) {
  let type, schema = {
    "@context": "https://schema.org",
    "name": negocio.nombre,
    "telephone": negocio.telefono || `+57${negocio.whatsapp}`,
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

function getNegociosByCategoria(cat){ return NEGOCIOS.filter(n=>n.categoria===cat) }
function getNegociosByMunicipio(mun){ return NEGOCIOS.filter(n=>n.municipio===mun) }
function getNegocioById(id){ return NEGOCIOS.find(n=>n.id===id) }
function getMunicipioById(id){ return MUNICIPIOS.find(m=>m.id===id) }
