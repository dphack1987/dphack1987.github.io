/**
 * BASE DE DATOS CENTRAL — Mapa Turístico del Quindío
 * Imágenes reales de anunciantes organizadas por categoría
 * Generado automáticamente con scripts/generate-data.js
 */

const MUNICIPIOS = [
  {
    "id": "armenia",
    "nombre": "Armenia",
    "emoji": "🏙️",
    "desc": "Capital del Quindío, ciudad de la eterna primavera.",
    "lat": 4.5339,
    "lng": -75.6811,
    "km": 0
  },
  {
    "id": "circasia",
    "nombre": "Circasia",
    "emoji": "🌿",
    "desc": "Pueblo patrimonial rodeado de cafetales y naturaleza.",
    "lat": 4.6167,
    "lng": -75.6333,
    "km": 14
  },
  {
    "id": "salento",
    "nombre": "Salento",
    "emoji": "☕",
    "desc": "El pueblo más antiguo del Quindío, corazón cafetero.",
    "lat": 4.6367,
    "lng": -75.5711,
    "km": 35
  },
  {
    "id": "filandia",
    "nombre": "Filandia",
    "emoji": "🎨",
    "desc": "Mirador del Quindío, artesanías y paisaje cultural.",
    "lat": 4.6736,
    "lng": -75.6547,
    "km": 28
  },
  {
    "id": "montenegro",
    "nombre": "Montenegro",
    "emoji": "🎢",
    "desc": "Sede del Parque del Café, turismo familiar.",
    "lat": 4.5667,
    "lng": -75.75,
    "km": 22
  },
  {
    "id": "quimbaya",
    "nombre": "Quimbaya",
    "emoji": "🌺",
    "desc": "Tierra de flores y tradición cafetera.",
    "lat": 4.6167,
    "lng": -75.7667,
    "km": 30
  },
  {
    "id": "calarca",
    "nombre": "Calarcá",
    "emoji": "🦋",
    "desc": "Ciudad de las acacias, puerta al Tolima.",
    "lat": 4.5167,
    "lng": -75.6333,
    "km": 8
  },
  {
    "id": "buenavista",
    "nombre": "Buenavista",
    "emoji": "🏔️",
    "desc": "Mirador natural con vistas al Valle del Cauca.",
    "lat": 4.7,
    "lng": -75.7167,
    "km": 45
  },
  {
    "id": "pijao",
    "nombre": "Pijao",
    "emoji": "🌄",
    "desc": "Pueblo slow food, tranquilidad y montaña.",
    "lat": 4.3333,
    "lng": -75.7,
    "km": 55
  },
  {
    "id": "cordoba",
    "nombre": "Córdoba",
    "emoji": "🌾",
    "desc": "Municipio cafetero de tradición y paisaje.",
    "lat": 4.7667,
    "lng": -75.65,
    "km": 38
  },
  {
    "id": "genova",
    "nombre": "Génova",
    "emoji": "🌊",
    "desc": "Biodiversidad y ecoturismo en el sur del Quindío.",
    "lat": 4.0167,
    "lng": -75.7667,
    "km": 80
  },
  {
    "id": "la-tebaida",
    "nombre": "La Tebaida",
    "emoji": "🌞",
    "desc": "Clima cálido, portal de entrada al Quindío.",
    "lat": 4.45,
    "lng": -75.7833,
    "km": 15
  }
];

const NEGOCIOS = [
  {
    "id": "armont",
    "nombre": "Hotel Armont",
    "slug": "hotel-armont",
    "categoria": "alojamiento",
    "tipo": "Hotel",
    "municipioId": "calarca",
    "descripcion": "Hotel moderno en Calarcá con todas las comodidades para tu estadía en el Quindío.",
    "descripcionLong": "Hotel moderno en Calarcá con todas las comodidades para tu estadía en el Quindío.",
    "direccion": "",
    "lat": 4.5167,
    "lng": -75.6333,
    "servicios": [
      "WiFi",
      "Parqueadero",
      "Restaurante",
      "Aire acondicionado"
    ],
    "precioRango": "Desde $120.000/noche",
    "telefono": "+57 300 000 0001",
    "whatsapp": "573000000001",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Hotel+Armont+Calarca",
    "imagen": "./pautas_publicitarias/hoteles_armenia/hotel_el_bosque_armenia.png",
    "galeria": [
      "./pautas_publicitarias/hoteles_armenia/hotel_el_bosque_armenia.png"
    ],
    "nivel": "estandar",
    "palabrasClave": [
      "Hotel Armont",
      "Hotel",
      "alojamiento",
      "calarca",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "Hotel",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Hotel moderno en Calarcá con todas las comodidades para tu estadía en el Quindío.",
    "municipio": "calarca"
  },
  {
    "id": "casa-campestre-la-cosecha",
    "nombre": "Casa Campestre La Cosecha",
    "slug": "casa-campestre-la-cosecha",
    "categoria": "alojamiento",
    "tipo": "Casa campestre",
    "municipioId": "pueblo-tapao",
    "descripcion": "Km 2.4 vía Armenia - Pueblo Tapao, Quindío.",
    "descripcionLong": "Km 2.4 vía Armenia - Pueblo Tapao, Quindío.",
    "direccion": "",
    "lat": 4.4923,
    "lng": -75.7153,
    "servicios": [
      "Alojamiento",
      "Jardín",
      "Desayuno"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 315 699 9060",
    "whatsapp": "573156999060",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Casa+Campestre+La+Cosecha+Quindio",
    "imagen": "./pautas_publicitarias/Alquiler_de_fincas_quindio/casa_campestre_lacosecha.png",
    "galeria": [
      "./pautas_publicitarias/Alquiler_de_fincas_quindio/casa_campestre_lacosecha.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Casa Campestre La Cosecha",
      "Casa campestre",
      "alojamiento",
      "pueblo-tapao",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "Hotel",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Km 2.4 vía Armenia - Pueblo Tapao, Quindío.",
    "municipio": "pueblo-tapao"
  },
  {
    "id": "finca-cafetera-el-ocaso",
    "nombre": "Finca Cafetera El Ocaso",
    "slug": "finca-cafetera-el-ocaso",
    "categoria": "alojamiento",
    "tipo": "Finca cafetera",
    "municipioId": "salento",
    "descripcion": "Finca cafetera / Café - tour - hotel en Salento, Quindío.",
    "descripcionLong": "Finca cafetera / Café - tour - hotel en Salento, Quindío.",
    "direccion": "",
    "lat": 4.6374,
    "lng": -75.5699,
    "servicios": [
      "Tour del café",
      "Alojamiento",
      "Desayuno"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 313 425 3669",
    "whatsapp": "573134253669",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Finca+El+Ocaso+Salento",
    "imagen": "./pautas_publicitarias/Alquiler_de_fincas_quindio/finca_cafetera_el_ocaso.png",
    "galeria": [
      "./pautas_publicitarias/Alquiler_de_fincas_quindio/finca_cafetera_el_ocaso.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Finca Cafetera El Ocaso",
      "Finca cafetera",
      "alojamiento",
      "salento",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "Hotel",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Finca cafetera / Café - tour - hotel en Salento, Quindío.",
    "municipio": "salento"
  },
  {
    "id": "la-floresta-hotel-campestre",
    "nombre": "La Floresta Hotel Campestre",
    "slug": "la-floresta-hotel-campestre",
    "categoria": "alojamiento",
    "tipo": "Hotel campestre",
    "municipioId": "armenia",
    "descripcion": "Naturaleza que inspira, experiencia que transforma. Tradición en turismo ecológico. Km 3 vía Armenia al aeropuerto.",
    "descripcionLong": "Naturaleza que inspira, experiencia que transforma. Tradición en turismo ecológico. Km 3 vía Armenia al aeropuerto.",
    "direccion": "",
    "lat": 4.5291,
    "lng": -75.712,
    "servicios": [
      "Circuito ecológico",
      "Piscina",
      "Terrazas",
      "Auditorio",
      "Sala de internet",
      "WiFi",
      "Parqueadero"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 312 328 1021",
    "whatsapp": "573123281021",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Km+3+vía+Armenia+al+aeropuerto",
    "imagen": "./pautas_publicitarias/Alquiler_de_fincas_quindio/finca_la_floresta.png",
    "galeria": [
      "./pautas_publicitarias/Alquiler_de_fincas_quindio/finca_la_floresta.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "La Floresta Hotel Campestre",
      "Hotel campestre",
      "alojamiento",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "Hotel",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Naturaleza que inspira, experiencia que transforma. Tradición en turismo ecológico. Km 3 vía Armenia al aeropuerto.",
    "municipio": "armenia"
  },
  {
    "id": "hacienda-moraleja",
    "nombre": "Hacienda Moraleja",
    "slug": "hacienda-moraleja",
    "categoria": "alojamiento",
    "tipo": "Hacienda / Alojamiento",
    "municipioId": "calarca",
    "descripcion": "Restaurante, glamping, alojamiento, eventos y noche romántica. Km 7 vía Calarcá / Barcelona.",
    "descripcionLong": "Restaurante, glamping, alojamiento, eventos y noche romántica. Km 7 vía Calarcá / Barcelona.",
    "direccion": "",
    "lat": 4.53,
    "lng": -75.62,
    "servicios": [
      "Restaurante",
      "Glamping",
      "Alojamiento",
      "Eventos"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 320 683 4432",
    "whatsapp": "573206834432",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Hacienda+Moraleja+Calarca",
    "imagen": "./pautas_publicitarias/Alquiler_de_fincas_quindio/hacienda_moraleja.png",
    "galeria": [
      "./pautas_publicitarias/Alquiler_de_fincas_quindio/hacienda_moraleja.png"
    ],
    "nivel": "estandar",
    "palabrasClave": [
      "Hacienda Moraleja",
      "Hacienda / Alojamiento",
      "alojamiento",
      "calarca",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "Hotel",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Restaurante, glamping, alojamiento, eventos y noche romántica. Km 7 vía Calarcá / Barcelona.",
    "municipio": "calarca"
  },
  {
    "id": "alma-nativa-hotel-campestre",
    "nombre": "Alma Nativa Hotel Campestre",
    "slug": "alma-nativa-hotel-campestre",
    "categoria": "alojamiento",
    "tipo": "Hotel campestre",
    "municipioId": "calarca",
    "descripcion": "Reconecta contigo. Calarcá vía Barcelona, Vereda La Albania.",
    "descripcionLong": "Reconecta contigo. Calarcá vía Barcelona, Vereda La Albania.",
    "direccion": "",
    "lat": 4.52,
    "lng": -75.61,
    "servicios": [
      "Habitaciones familiares",
      "Habitaciones dobles",
      "Habitaciones luxury"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 310 575 2469",
    "whatsapp": "573105752469",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Alma+Nativa+Hotel+Campestre+Calarca",
    "imagen": "./pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_alma_nativa.png",
    "galeria": [
      "./pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_alma_nativa.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Alma Nativa Hotel Campestre",
      "Hotel campestre",
      "alojamiento",
      "calarca",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "Hotel",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Reconecta contigo. Calarcá vía Barcelona, Vereda La Albania.",
    "municipio": "calarca"
  },
  {
    "id": "hotel-cafe-cafe",
    "nombre": "Hotel Café Café Campestre",
    "slug": "hotel-cafe-cafe-campestre",
    "categoria": "alojamiento",
    "tipo": "Hotel campestre",
    "municipioId": "armenia",
    "descripcion": "Tradición, naturaleza y confort en el Quindío.",
    "descripcionLong": "Tradición, naturaleza y confort en el Quindío.",
    "direccion": "",
    "lat": 4.5401,
    "lng": -75.6912,
    "servicios": [
      "Habitaciones",
      "WiFi",
      "Desayuno",
      "Parqueadero"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 311 418 7558",
    "whatsapp": "573114187558",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Hotel+Café+Café+Campestre+Quindio",
    "imagen": "./pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_cafe_cafe_campestre.png",
    "galeria": [
      "./pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_cafe_cafe_campestre.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Hotel Café Café Campestre",
      "Hotel campestre",
      "alojamiento",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "Hotel",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Tradición, naturaleza y confort en el Quindío.",
    "municipio": "armenia"
  },
  {
    "id": "hotel-delirio-campestre",
    "nombre": "Hotel Delirio Campestre Quindío",
    "slug": "hotel-delirio-campestre-quindio",
    "categoria": "alojamiento",
    "tipo": "Hotel campestre",
    "municipioId": "montenegro",
    "descripcion": "Km 1 vía Montenegro, Parque del Café, Montenegro, Quindío.",
    "descripcionLong": "Km 1 vía Montenegro, Parque del Café, Montenegro, Quindío.",
    "direccion": "",
    "lat": 4.5642,
    "lng": -75.7489,
    "servicios": [
      "Habitaciones",
      "WiFi",
      "Desayuno",
      "Parqueadero"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 320 256 8458",
    "whatsapp": "573202568458",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Hotel+Delirio+Campestre+Quindio",
    "imagen": "./pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_deliriocampestre.png",
    "galeria": [
      "./pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_deliriocampestre.png"
    ],
    "nivel": "estandar",
    "palabrasClave": [
      "Hotel Delirio Campestre Quindío",
      "Hotel campestre",
      "alojamiento",
      "montenegro",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "Hotel",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Km 1 vía Montenegro, Parque del Café, Montenegro, Quindío.",
    "municipio": "montenegro"
  },
  {
    "id": "linaje-salvaje",
    "nombre": "Linaje Salvaje",
    "slug": "linaje-salvaje",
    "categoria": "alojamiento",
    "tipo": "Hotel",
    "municipioId": "calarca",
    "descripcion": "Vía Albania km 8 vía Calarcá - Barcelona, Quindío.",
    "descripcionLong": "Vía Albania km 8 vía Calarcá - Barcelona, Quindío.",
    "direccion": "",
    "lat": 4.501,
    "lng": -75.5591,
    "servicios": [
      "Habitaciones",
      "WiFi",
      "Desayuno",
      "Parqueadero"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 313 732 1433",
    "whatsapp": "573137321433",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Linaje+Salvaje+Quindio",
    "imagen": "./pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_linaje_salvaje.png",
    "galeria": [
      "./pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_linaje_salvaje.png"
    ],
    "nivel": "estandar",
    "palabrasClave": [
      "Linaje Salvaje",
      "Hotel",
      "alojamiento",
      "calarca",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "Hotel",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Vía Albania km 8 vía Calarcá - Barcelona, Quindío.",
    "municipio": "calarca"
  },
  {
    "id": "hotel-el-bosque",
    "nombre": "Hotel El Bosque",
    "slug": "hotel-el-bosque",
    "categoria": "alojamiento",
    "tipo": "Hotel",
    "municipioId": "armenia",
    "descripcion": "Lo mejor en calidad y precio en el centro de la ciudad de Armenia, Quindío.",
    "descripcionLong": "Lo mejor en calidad y precio en el centro de la ciudad de Armenia, Quindío.",
    "direccion": "",
    "lat": 4.533,
    "lng": -75.68,
    "servicios": [
      "Habitaciones",
      "WiFi",
      "Desayuno",
      "Parqueadero"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 317 647 1482",
    "whatsapp": "573176471482",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Hotel+El+Bosque+Armenia",
    "imagen": "./pautas_publicitarias/hoteles_armenia/hotel_el_bosque_armenia.png",
    "galeria": [
      "./pautas_publicitarias/hoteles_armenia/hotel_el_bosque_armenia.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Hotel El Bosque",
      "Hotel",
      "alojamiento",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "Hotel",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Lo mejor en calidad y precio en el centro de la ciudad de Armenia, Quindío.",
    "municipio": "armenia"
  },
  {
    "id": "isa-victory-hotel",
    "nombre": "Isa Victory Hotel",
    "slug": "isa-victory-hotel",
    "categoria": "alojamiento",
    "tipo": "Hotel boutique",
    "municipioId": "armenia",
    "descripcion": "Comodidad, diseño y ubicación premium en el norte de Armenia, Quindío. Av Bolívar 21 Norte 47.",
    "descripcionLong": "Comodidad, diseño y ubicación premium en el norte de Armenia, Quindío. Av Bolívar 21 Norte 47.",
    "direccion": "",
    "lat": 4.54,
    "lng": -75.68,
    "servicios": [
      "Gimnasio",
      "Restaurante",
      "Bar",
      "Salón de eventos",
      "Zona coworking",
      "Sky club"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 320 770 7079",
    "whatsapp": "573207707079",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Isa+Victory+Hotel+Armenia",
    "imagen": "./pautas_publicitarias/hoteles_armenia/hotel_isa_victory.png",
    "galeria": [
      "./pautas_publicitarias/hoteles_armenia/hotel_isa_victory.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Isa Victory Hotel",
      "Hotel boutique",
      "alojamiento",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "Hotel",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Comodidad, diseño y ubicación premium en el norte de Armenia, Quindío. Av Bolívar 21 Norte 47.",
    "municipio": "armenia"
  },
  {
    "id": "hotel-san-jeronimo",
    "nombre": "Hotel San Jerónimo",
    "slug": "hotel-san-jeronimo",
    "categoria": "alojamiento",
    "tipo": "Hotel",
    "municipioId": "armenia",
    "descripcion": "A better rest just one place. Cra 14 #14-14 Armenia-Quindío.",
    "descripcionLong": "A better rest just one place. Cra 14 #14-14 Armenia-Quindío.",
    "direccion": "",
    "lat": 4.5344,
    "lng": -75.6808,
    "servicios": [
      "Desayuno",
      "Modernidad",
      "WiFi",
      "Aire acondicionado"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 310 831 4719",
    "whatsapp": "573108314719",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Hotel+San+Jerónimo+Armenia",
    "imagen": "./pautas_publicitarias/hoteles_armenia/hotel_san_jeronimo.png",
    "galeria": [
      "./pautas_publicitarias/hoteles_armenia/hotel_san_jeronimo.png"
    ],
    "nivel": "estandar",
    "palabrasClave": [
      "Hotel San Jerónimo",
      "Hotel",
      "alojamiento",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "Hotel",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "A better rest just one place. Cra 14 #14-14 Armenia-Quindío.",
    "municipio": "armenia"
  },
  {
    "id": "cascadas-rio-verde",
    "nombre": "Reserva Natural Cascadas de Río Verde",
    "slug": "reserva-natural-cascadas-de-rio-verde",
    "categoria": "sitio-turistico",
    "tipo": "Plan de pasadía turístico y ecoturismo",
    "municipioId": "cordoba",
    "descripcion": "Incluye entrada a la reserva, póliza de accidentes, transporte en Willys desde Córdoba, recorrido experiencia, baño en las cascadas, acompañamiento permanente de un intérprete ambiental y cultural, guía de turismo, refrigerio y almuerzo. Operador aliado: Quindío Travel.",
    "descripcionLong": "Incluye entrada a la reserva, póliza de accidentes, transporte en Willys desde Córdoba, recorrido experiencia, baño en las cascadas, acompañamiento permanente de un intérprete ambiental y cultural, guía de turismo, refrigerio y almuerzo. Operador aliado: Quindío Travel.",
    "direccion": "",
    "lat": 4.7667,
    "lng": -75.65,
    "servicios": [
      "Senderismo",
      "Baños en cascadas",
      "Guía ambiental",
      "Transporte en Willys",
      "Refrigerio",
      "Almuerzo"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 317 442 6044",
    "whatsapp": "573174426044",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Reserva+Natural+Cascadas+de+Río+Verde+Cordoba",
    "imagen": "./pautas_publicitarias/atractivos_turisticos/cascadas_rio_verde.png",
    "galeria": [
      "./pautas_publicitarias/atractivos_turisticos/cascadas_rio_verde.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Reserva Natural Cascadas de Río Verde",
      "Plan de pasadía turístico y ecoturismo",
      "sitio-turistico",
      "cordoba",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "TouristAttraction",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Incluye entrada a la reserva, póliza de accidentes, transporte en Willys desde Córdoba, recorrido experiencia, baño en las cascadas, acompañamiento permanente de un intérprete ambiental y cultural, guía de turismo, refrigerio y almuerzo. Operador aliado: Quindío Travel.",
    "municipio": "cordoba"
  },
  {
    "id": "complejo-soleden",
    "nombre": "Complejo Turístico y Deportivo Soledén",
    "slug": "complejo-turistico-y-deportivo-soleden",
    "categoria": "sitio-turistico",
    "tipo": "Complejo recreativo y deportivo",
    "municipioId": "armenia",
    "descripcion": "Pasa por todos los gustos y todas las edades. Pasaporte multiatracciones: piscinas, lago, tirolesa, almuerzo y refrigerio. Vigilado Supersubsidio.",
    "descripcionLong": "Pasa por todos los gustos y todas las edades. Pasaporte multiatracciones: piscinas, lago, tirolesa, almuerzo y refrigerio. Vigilado Supersubsidio.",
    "direccion": "",
    "lat": 4.5448,
    "lng": -75.6863,
    "servicios": [
      "Piscinas",
      "Lago",
      "Tirolesa",
      "Almuerzo",
      "Refrigerio"
    ],
    "precioRango": "Pasaporte desde $13.600",
    "telefono": "+57 300 000 0099",
    "whatsapp": "5730000000099",
    "email": "",
    "url": "",
    "maps": "https://soleden.co",
    "imagen": "./pautas_publicitarias/atractivos_turisticos/Complejo_Turístico_y_Deportivo_Soledén.png",
    "galeria": [
      "./pautas_publicitarias/atractivos_turisticos/Complejo_Turístico_y_Deportivo_Soledén.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Complejo Turístico y Deportivo Soledén",
      "Complejo recreativo y deportivo",
      "sitio-turistico",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "TouristAttraction",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Pasa por todos los gustos y todas las edades. Pasaporte multiatracciones: piscinas, lago, tirolesa, almuerzo y refrigerio. Vigilado Supersubsidio.",
    "municipio": "armenia"
  },
  {
    "id": "ecoparque-penas-blancas",
    "nombre": "Ecoparque Peñas Blancas",
    "slug": "ecoparque-penas-blancas",
    "categoria": "sitio-turistico",
    "tipo": "Ecoparque",
    "municipioId": "calarca",
    "descripcion": "Eco bachaco (alojamiento ancestral en superadobe, temperatura constante, sueño profundo y relajamiento total).",
    "descripcionLong": "Eco bachaco (alojamiento ancestral en superadobe, temperatura constante, sueño profundo y relajamiento total).",
    "direccion": "",
    "lat": 4.5,
    "lng": -75.63,
    "servicios": [
      "Alojamiento",
      "Senderismo",
      "Aventura",
      "Restaurante"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 310 396 7951",
    "whatsapp": "573103967951",
    "email": "",
    "url": "",
    "maps": "https://www.calarca.net/ecoparquepenasblancas",
    "imagen": "./pautas_publicitarias/atractivos_turisticos/parque_los_arrieros.png",
    "galeria": [
      "./pautas_publicitarias/atractivos_turisticos/parque_los_arrieros.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Ecoparque Peñas Blancas",
      "Ecoparque",
      "sitio-turistico",
      "calarca",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "TouristAttraction",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Eco bachaco (alojamiento ancestral en superadobe, temperatura constante, sueño profundo y relajamiento total).",
    "municipio": "calarca"
  },
  {
    "id": "finca-las-flores",
    "nombre": "Finca Las Flores",
    "slug": "finca-las-flores",
    "categoria": "sitio-turistico",
    "tipo": "Recorrido de cacao tradicional",
    "municipioId": "genova",
    "descripcion": "Finca Las Flores, Vereda las Brisas, Génova, Quindío.",
    "descripcionLong": "Finca Las Flores, Vereda las Brisas, Génova, Quindío.",
    "direccion": "",
    "lat": 4.0167,
    "lng": -75.7667,
    "servicios": [
      "Tour del cacao",
      "Taller de chocolate",
      "Degustación"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 320 955 5062",
    "whatsapp": "573209555062",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Finca+Las+Flores+Genova",
    "imagen": "./pautas_publicitarias/atractivos_turisticos/quinti_casa_patasarriba.png",
    "galeria": [
      "./pautas_publicitarias/atractivos_turisticos/quinti_casa_patasarriba.png"
    ],
    "nivel": "estandar",
    "palabrasClave": [
      "Finca Las Flores",
      "Recorrido de cacao tradicional",
      "sitio-turistico",
      "genova",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "TouristAttraction",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Finca Las Flores, Vereda las Brisas, Génova, Quindío.",
    "municipio": "genova"
  },
  {
    "id": "la-pequena-granja-mama-lulu",
    "nombre": "La Pequeña Granja de Mamá Lulú",
    "slug": "la-pequena-granja-de-mama-lulu",
    "categoria": "sitio-turistico",
    "tipo": "Turismo académico y científico",
    "municipioId": "quimbaya",
    "descripcion": "Turismo académico y científico, recorridos agroecológicos, posada nativa, restaurante típico y tienda artesanal. Vereda Palermo, Quimbaya, Quindío.",
    "descripcionLong": "Turismo académico y científico, recorridos agroecológicos, posada nativa, restaurante típico y tienda artesanal. Vereda Palermo, Quimbaya, Quindío.",
    "direccion": "",
    "lat": 4.6167,
    "lng": -75.7667,
    "servicios": [
      "Recorridos agroecológicos",
      "Restaurante típico",
      "Posada nativa",
      "Tienda artesanal"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 311 389 4646",
    "whatsapp": "573113894646",
    "email": "",
    "url": "",
    "maps": "https://www.granjamamalulu.com",
    "imagen": "./pautas_publicitarias/atractivos_turisticos/recorrido_cacaotero.png",
    "galeria": [
      "./pautas_publicitarias/atractivos_turisticos/recorrido_cacaotero.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "La Pequeña Granja de Mamá Lulú",
      "Turismo académico y científico",
      "sitio-turistico",
      "quimbaya",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "TouristAttraction",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Turismo académico y científico, recorridos agroecológicos, posada nativa, restaurante típico y tienda artesanal. Vereda Palermo, Quimbaya, Quindío.",
    "municipio": "quimbaya"
  },
  {
    "id": "jardin-botanico-del-quindio",
    "nombre": "Jardín Botánico del Quindío",
    "slug": "jardin-botanico-del-quindio",
    "categoria": "sitio-turistico",
    "tipo": "Centro de investigación, educación y conservación ambiental",
    "municipioId": "calarca",
    "descripcion": "Avistamiento de aves endémicas, mariposas exóticas y escondidas, mariposario único. Av. Centenario No. 15-190, Calarcá, Quindío.",
    "descripcionLong": "Avistamiento de aves endémicas, mariposas exóticas y escondidas, mariposario único. Av. Centenario No. 15-190, Calarcá, Quindío.",
    "direccion": "",
    "lat": 4.5167,
    "lng": -75.6333,
    "servicios": [
      "Avistamiento de aves",
      "Mariposario",
      "Senderos",
      "Educación ambiental"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 310 404 5223",
    "whatsapp": "573104045223",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Jardín+Botánico+del+Quindío+Calarca",
    "imagen": "./pautas_publicitarias/atractivos_turisticos/Complejo_Turístico_y_Deportivo_Soledén.png",
    "galeria": [
      "./pautas_publicitarias/atractivos_turisticos/Complejo_Turístico_y_Deportivo_Soledén.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Jardín Botánico del Quindío",
      "Centro de investigación, educación y conservación ambiental",
      "sitio-turistico",
      "calarca",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "TouristAttraction",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Avistamiento de aves endémicas, mariposas exóticas y escondidas, mariposario único. Av. Centenario No. 15-190, Calarcá, Quindío.",
    "municipio": "calarca"
  },
  {
    "id": "el-laberinto-mil-caminos",
    "nombre": "El Laberinto Mil Caminos",
    "slug": "el-laberinto-mil-caminos",
    "categoria": "sitio-turistico",
    "tipo": "Atracción turística / Laberinto",
    "municipioId": "quimbaya",
    "descripcion": "Vereda Morelia Alta, Quimbaya, Quindío.",
    "descripcionLong": "Vereda Morelia Alta, Quimbaya, Quindío.",
    "direccion": "",
    "lat": 4.6,
    "lng": -75.77,
    "servicios": [
      "Laberinto",
      "Senderos",
      "Fotografía"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 317 112 9239",
    "whatsapp": "573171129239",
    "email": "",
    "url": "",
    "maps": "https://www.laberintomilcaminos.com",
    "imagen": "./pautas_publicitarias/atractivos_turisticos/parque_los_arrieros.png",
    "galeria": [
      "./pautas_publicitarias/atractivos_turisticos/parque_los_arrieros.png"
    ],
    "nivel": "estandar",
    "palabrasClave": [
      "El Laberinto Mil Caminos",
      "Atracción turística / Laberinto",
      "sitio-turistico",
      "quimbaya",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "TouristAttraction",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Vereda Morelia Alta, Quimbaya, Quindío.",
    "municipio": "quimbaya"
  },
  {
    "id": "mirador-encanto-filandia",
    "nombre": "Mirador Encanto Filandia",
    "slug": "mirador-encanto-filandia",
    "categoria": "sitio-turistico",
    "tipo": "Mirador y cafetería",
    "municipioId": "filandia",
    "descripcion": "Calle 7 #7-29, Filandia, Colombia.",
    "descripcionLong": "Calle 7 #7-29, Filandia, Colombia.",
    "direccion": "",
    "lat": 4.6736,
    "lng": -75.6547,
    "servicios": [
      "Mirador",
      "Cafetería",
      "Fotografía"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 320 936 9950",
    "whatsapp": "573209369950",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Mirador+Encanto+Filandia",
    "imagen": "./pautas_publicitarias/atractivos_turisticos/quinti_casa_patasarriba.png",
    "galeria": [
      "./pautas_publicitarias/atractivos_turisticos/quinti_casa_patasarriba.png"
    ],
    "nivel": "estandar",
    "palabrasClave": [
      "Mirador Encanto Filandia",
      "Mirador y cafetería",
      "sitio-turistico",
      "filandia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "TouristAttraction",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Calle 7 #7-29, Filandia, Colombia.",
    "municipio": "filandia"
  },
  {
    "id": "turismo-panaca",
    "nombre": "Turismo PANACA",
    "slug": "turismo-panaca",
    "categoria": "sitio-turistico",
    "tipo": "Parque temático",
    "municipioId": "quimbaya",
    "descripcion": "Diseñamos experiencias que se sienten, se viven y se recuerdan. En Turismo PANACA creamos planes para viajar, aprender y compartir.",
    "descripcionLong": "Diseñamos experiencias que se sienten, se viven y se recuerdan. En Turismo PANACA creamos planes para viajar, aprender y compartir.",
    "direccion": "",
    "lat": 4.62,
    "lng": -75.77,
    "servicios": [
      "Tours",
      "Aventura",
      "Gastronomía",
      "Niños"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 300 000 0100",
    "whatsapp": "5730000000100",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=PANACA+Quindio",
    "imagen": "./pautas_publicitarias/atractivos_turisticos/Complejo_Turístico_y_Deportivo_Soledén.png",
    "galeria": [
      "./pautas_publicitarias/atractivos_turisticos/Complejo_Turístico_y_Deportivo_Soledén.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Turismo PANACA",
      "Parque temático",
      "sitio-turistico",
      "quimbaya",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "TouristAttraction",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Diseñamos experiencias que se sienten, se viven y se recuerdan. En Turismo PANACA creamos planes para viajar, aprender y compartir.",
    "municipio": "quimbaya"
  },
  {
    "id": "parque-los-arrieros",
    "nombre": "Parque Los Arrieros",
    "slug": "parque-los-arrieros",
    "categoria": "sitio-turistico",
    "tipo": "Parque",
    "municipioId": "quimbaya",
    "descripcion": "Tradición, cultura y diversión en familia. Quimbaya - Quindío.",
    "descripcionLong": "Tradición, cultura y diversión en familia. Quimbaya - Quindío.",
    "direccion": "",
    "lat": 4.61,
    "lng": -75.77,
    "servicios": [
      "Aventura",
      "Cultura",
      "Gastronomía",
      "Restaurante"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 313 610 7681",
    "whatsapp": "573136107681",
    "email": "",
    "url": "",
    "maps": "https://www.parquelosarrieros.com",
    "imagen": "./pautas_publicitarias/atractivos_turisticos/parque_los_arrieros.png",
    "galeria": [
      "./pautas_publicitarias/atractivos_turisticos/parque_los_arrieros.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Parque Los Arrieros",
      "Parque",
      "sitio-turistico",
      "quimbaya",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "TouristAttraction",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Tradición, cultura y diversión en familia. Quimbaya - Quindío.",
    "municipio": "quimbaya"
  },
  {
    "id": "qinti-parque-montana",
    "nombre": "Qinti (Parque en la Montaña)",
    "slug": "qinti-parque-en-la-montana",
    "categoria": "sitio-turistico",
    "tipo": "Ecoparque",
    "municipioId": "cordoba",
    "descripcion": "La Casa Cafetera al Revés, 17 estaciones para tomar fotografías. Córdoba, Quindío.",
    "descripcionLong": "La Casa Cafetera al Revés, 17 estaciones para tomar fotografías. Córdoba, Quindío.",
    "direccion": "",
    "lat": 4.7667,
    "lng": -75.66,
    "servicios": [
      "Tirolesa",
      "Canopy",
      "Senderismo",
      "Restaurante",
      "Fotografía"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 312 681 5139",
    "whatsapp": "573126815139",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Qinti+Parque+en+la+Montaña+Cordoba",
    "imagen": "./pautas_publicitarias/atractivos_turisticos/quinti_casa_patasarriba.png",
    "galeria": [
      "./pautas_publicitarias/atractivos_turisticos/quinti_casa_patasarriba.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Qinti (Parque en la Montaña)",
      "Ecoparque",
      "sitio-turistico",
      "cordoba",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "TouristAttraction",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "La Casa Cafetera al Revés, 17 estaciones para tomar fotografías. Córdoba, Quindío.",
    "municipio": "cordoba"
  },
  {
    "id": "finca-la-alejandra",
    "nombre": "Finca La Alejandra (Territorio Paisaje)",
    "slug": "finca-la-alejandra-territorio-paisaje",
    "categoria": "sitio-turistico",
    "tipo": "Recorrido cacaotero",
    "municipioId": "genova",
    "descripcion": "¡Tu experiencia con el chocolate! Un plan diferente en el Quindío... Deleita tus sentidos con el proceso del chocolate del árbol a la taza. Territorio Paisaje también ofrece alojamientos, parques temáticos, recorridos y rutas turísticas, guianza y servicio de transporte.",
    "descripcionLong": "¡Tu experiencia con el chocolate! Un plan diferente en el Quindío... Deleita tus sentidos con el proceso del chocolate del árbol a la taza. Territorio Paisaje también ofrece alojamientos, parques temáticos, recorridos y rutas turísticas, guianza y servicio de transporte.",
    "direccion": "",
    "lat": 4.02,
    "lng": -75.77,
    "servicios": [
      "Tour del cacao",
      "Alojamiento",
      "Guianza",
      "Transporte"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 314 657 3393",
    "whatsapp": "573146573393",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Finca+La+Alejandra+Territorio+Paisaje",
    "imagen": "./pautas_publicitarias/atractivos_turisticos/recorrido_cacaotero.png",
    "galeria": [
      "./pautas_publicitarias/atractivos_turisticos/recorrido_cacaotero.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Finca La Alejandra (Territorio Paisaje)",
      "Recorrido cacaotero",
      "sitio-turistico",
      "genova",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "TouristAttraction",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "¡Tu experiencia con el chocolate! Un plan diferente en el Quindío... Deleita tus sentidos con el proceso del chocolate del árbol a la taza. Territorio Paisaje también ofrece alojamientos, parques temáticos, recorridos y rutas turísticas, guianza y servicio de transporte.",
    "municipio": "genova"
  },
  {
    "id": "centro-comercial-sansur",
    "nombre": "Centro Comercial SanSur",
    "slug": "centro-comercial-sansur",
    "categoria": "quindio-comercial",
    "tipo": "Centro comercial",
    "municipioId": "armenia",
    "descripcion": "Eventos y promociones para toda la familia. Cra 18 # 59-37, Armenia, Quindío.",
    "descripcionLong": "Eventos y promociones para toda la familia. Cra 18 # 59-37, Armenia, Quindío.",
    "direccion": "",
    "lat": 4.52,
    "lng": -75.69,
    "servicios": [
      "Moda",
      "Calzado",
      "Belleza",
      "Tecnología",
      "Comida",
      "Café",
      "Juegos",
      "Supermercado",
      "Cajeros"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 304 610 2606",
    "whatsapp": "573046102606",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Centro+Comercial+SanSur+Armenia",
    "imagen": "./pautas_publicitarias/Centros Comerciales/centro_comercial_sansur.png",
    "galeria": [
      "./pautas_publicitarias/Centros Comerciales/centro_comercial_sansur.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Centro Comercial SanSur",
      "Centro comercial",
      "quindio-comercial",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "LocalBusiness",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Eventos y promociones para toda la familia. Cra 18 # 59-37, Armenia, Quindío.",
    "municipio": "armenia"
  },
  {
    "id": "unicentro-armenia",
    "nombre": "Unicentro Armenia",
    "slug": "unicentro-armenia",
    "categoria": "quindio-comercial",
    "tipo": "Centro comercial",
    "municipioId": "armenia",
    "descripcion": "Un espacio para tod@s.",
    "descripcionLong": "Un espacio para tod@s.",
    "direccion": "",
    "lat": 4.55,
    "lng": -75.68,
    "servicios": [
      "Moda",
      "Calzado",
      "Belleza",
      "Tecnología",
      "Comida",
      "Café",
      "Juegos",
      "Supermercado",
      "Cajeros"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 300 000 0101",
    "whatsapp": "5730000000101",
    "email": "",
    "url": "",
    "maps": "https://www.unicentrodearmenia.com",
    "imagen": "./pautas_publicitarias/Centros Comerciales/centro_comercial_unicentro.png",
    "galeria": [
      "./pautas_publicitarias/Centros Comerciales/centro_comercial_unicentro.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Unicentro Armenia",
      "Centro comercial",
      "quindio-comercial",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "LocalBusiness",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Un espacio para tod@s.",
    "municipio": "armenia"
  },
  {
    "id": "dos-cielos-boutique",
    "nombre": "Dos Cielos Boutique de Licores",
    "slug": "dos-cielos-boutique-de-licores",
    "categoria": "gastronomia",
    "tipo": "Boutique de licores",
    "municipioId": "armenia",
    "descripcion": "Carrera 14 # 14 Norte - 30, Armenia, Quindío.",
    "descripcionLong": "Carrera 14 # 14 Norte - 30, Armenia, Quindío.",
    "direccion": "",
    "lat": 4.53,
    "lng": -75.68,
    "servicios": [
      "Venta de licores",
      "Degustaciones"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 302 347 8080",
    "whatsapp": "573023478080",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Dos+Cielos+Boutique+de+Licores+Armenia",
    "imagen": "./pautas_publicitarias/Cocteles_licores/boutique_licores_doscielos.png",
    "galeria": [
      "./pautas_publicitarias/Cocteles_licores/boutique_licores_doscielos.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Dos Cielos Boutique de Licores",
      "Boutique de licores",
      "gastronomia",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "Restaurant",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Carrera 14 # 14 Norte - 30, Armenia, Quindío.",
    "municipio": "armenia"
  },
  {
    "id": "cantina-el-desmadre",
    "nombre": "Cantina El Desmadre",
    "slug": "cantina-el-desmadre",
    "categoria": "gastronomia",
    "tipo": "Cantina",
    "municipioId": "armenia",
    "descripcion": "Cra 16 # 21N, Barrio Laureles; Armenia Q.",
    "descripcionLong": "Cra 16 # 21N, Barrio Laureles; Armenia Q.",
    "direccion": "",
    "lat": 4.54,
    "lng": -75.69,
    "servicios": [
      "Cocteles",
      "Licores",
      "Comida"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 313 776 8567",
    "whatsapp": "573137768567",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Cantina+El+Desmadre+Armenia",
    "imagen": "./pautas_publicitarias/Cocteles_licores/cantina_el_desmadre.png",
    "galeria": [
      "./pautas_publicitarias/Cocteles_licores/cantina_el_desmadre.png"
    ],
    "nivel": "estandar",
    "palabrasClave": [
      "Cantina El Desmadre",
      "Cantina",
      "gastronomia",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "Restaurant",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Cra 16 # 21N, Barrio Laureles; Armenia Q.",
    "municipio": "armenia"
  },
  {
    "id": "la-fogata-steak-house",
    "nombre": "La Fogata Steak House",
    "slug": "la-fogata-steak-house",
    "categoria": "gastronomia",
    "tipo": "Restaurante",
    "municipioId": "armenia",
    "descripcion": "ESTD 1963. Av Bolívar 14N - 39, Armenia, Quindío.",
    "descripcionLong": "ESTD 1963. Av Bolívar 14N - 39, Armenia, Quindío.",
    "direccion": "",
    "lat": 4.53,
    "lng": -75.68,
    "servicios": [
      "Carnes",
      "Parrilla",
      "Comida típica",
      "Reservas"
    ],
    "precioRango": "Menú desde $30.000",
    "telefono": "+57 312 248 0291",
    "whatsapp": "573122480291",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=La+Fogata+Steak+House+Armenia",
    "imagen": "./pautas_publicitarias/Cocteles_licores/la_fogata.png",
    "galeria": [
      "./pautas_publicitarias/Cocteles_licores/la_fogata.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "La Fogata Steak House",
      "Restaurante",
      "gastronomia",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "Restaurant",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "ESTD 1963. Av Bolívar 14N - 39, Armenia, Quindío.",
    "municipio": "armenia"
  },
  {
    "id": "la-fogata-express",
    "nombre": "La Fogata Express",
    "slug": "la-fogata-express",
    "categoria": "gastronomia",
    "tipo": "Restaurante",
    "municipioId": "circasia",
    "descripcion": "Circasia Roof Top, Centro Artesanal Plaza Principal, Piso 3.",
    "descripcionLong": "Circasia Roof Top, Centro Artesanal Plaza Principal, Piso 3.",
    "direccion": "",
    "lat": 4.6167,
    "lng": -75.6333,
    "servicios": [
      "Comida",
      "Cocteles"
    ],
    "precioRango": "Menú desde $25.000",
    "telefono": "+57 310 214 7135",
    "whatsapp": "573102147135",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=La+Fogata+Express+Circasia",
    "imagen": "./pautas_publicitarias/Cocteles_licores/lafogata_circasia.png",
    "galeria": [
      "./pautas_publicitarias/Cocteles_licores/lafogata_circasia.png"
    ],
    "nivel": "estandar",
    "palabrasClave": [
      "La Fogata Express",
      "Restaurante",
      "gastronomia",
      "circasia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "Restaurant",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Circasia Roof Top, Centro Artesanal Plaza Principal, Piso 3.",
    "municipio": "circasia"
  },
  {
    "id": "restaurante-magangue-altavista",
    "nombre": "Restaurante Magangué Altavista",
    "slug": "restaurante-magangue-altavista",
    "categoria": "gastronomia",
    "tipo": "Restaurante",
    "municipioId": "armenia",
    "descripcion": "Calle 17 # 13 - 50 Segundo Piso, Por Calle Real, Armenia, Colombia.",
    "descripcionLong": "Calle 17 # 13 - 50 Segundo Piso, Por Calle Real, Armenia, Colombia.",
    "direccion": "",
    "lat": 4.535,
    "lng": -75.68,
    "servicios": [
      "Comida",
      "Reservas",
      "Domicilios"
    ],
    "precioRango": "Menú desde $28.000",
    "telefono": "+57 318 601 1957",
    "whatsapp": "573186011957",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Restaurante+Magangué+Altavista+Armenia",
    "imagen": "./pautas_publicitarias/comida_de_mar/restaurante_magangue.png",
    "galeria": [
      "./pautas_publicitarias/comida_de_mar/restaurante_magangue.png"
    ],
    "nivel": "estandar",
    "palabrasClave": [
      "Restaurante Magangué Altavista",
      "Restaurante",
      "gastronomia",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "Restaurant",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Calle 17 # 13 - 50 Segundo Piso, Por Calle Real, Armenia, Colombia.",
    "municipio": "armenia"
  },
  {
    "id": "arepa-town",
    "nombre": "Classic Arepa Town Fast Food",
    "slug": "classic-arepa-town-fast-food",
    "categoria": "gastronomia",
    "tipo": "Comida rápida",
    "municipioId": "armenia",
    "descripcion": "Calle 50 Containers de los naranjos local 10, Armenia, Colombia.",
    "descripcionLong": "Calle 50 Containers de los naranjos local 10, Armenia, Colombia.",
    "direccion": "",
    "lat": 4.52,
    "lng": -75.69,
    "servicios": [
      "Arepas",
      "Comida rápida",
      "Domicilios"
    ],
    "precioRango": "Menú desde $15.000",
    "telefono": "+57 314 562 1785",
    "whatsapp": "573145621785",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Classic+Arepa+Town+Fast+Food+Armenia",
    "imagen": "./pautas_publicitarias/Comidas_Rapidas/arepa_town.png",
    "galeria": [
      "./pautas_publicitarias/Comidas_Rapidas/arepa_town.png"
    ],
    "nivel": "estandar",
    "palabrasClave": [
      "Classic Arepa Town Fast Food",
      "Comida rápida",
      "gastronomia",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "Restaurant",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Calle 50 Containers de los naranjos local 10, Armenia, Colombia.",
    "municipio": "armenia"
  },
  {
    "id": "john-chewing-food",
    "nombre": "John Chewing Food",
    "slug": "john-chewing-food",
    "categoria": "gastronomia",
    "tipo": "Comida rápida",
    "municipioId": "armenia",
    "descripcion": "¡La Buena Comida Alegra la Vida! Antiguo Estadio San José, Frente a las canchas sintéticas local 1.",
    "descripcionLong": "¡La Buena Comida Alegra la Vida! Antiguo Estadio San José, Frente a las canchas sintéticas local 1.",
    "direccion": "",
    "lat": 4.53,
    "lng": -75.69,
    "servicios": [
      "Comida rápida",
      "Domicilios"
    ],
    "precioRango": "Menú desde $18.000",
    "telefono": "+57 322 839 1293",
    "whatsapp": "573228391293",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=John+Chewing+Food+Armenia",
    "imagen": "./pautas_publicitarias/Comidas_Rapidas/jhon_chewing_food.png",
    "galeria": [
      "./pautas_publicitarias/Comidas_Rapidas/jhon_chewing_food.png"
    ],
    "nivel": "estandar",
    "palabrasClave": [
      "John Chewing Food",
      "Comida rápida",
      "gastronomia",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "Restaurant",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "¡La Buena Comida Alegra la Vida! Antiguo Estadio San José, Frente a las canchas sintéticas local 1.",
    "municipio": "armenia"
  },
  {
    "id": "mostricos",
    "nombre": "MostRicos",
    "slug": "mostricos",
    "categoria": "gastronomia",
    "tipo": "Comida rápida",
    "municipioId": "armenia",
    "descripcion": "Sede 1: Barrio Granada Cra 23e 11-84 Piso 2. Sede 2: Cra 14 21 Norte. Plato destacado: Bomba Nuclear.",
    "descripcionLong": "Sede 1: Barrio Granada Cra 23e 11-84 Piso 2. Sede 2: Cra 14 21 Norte. Plato destacado: Bomba Nuclear.",
    "direccion": "",
    "lat": 4.54,
    "lng": -75.68,
    "servicios": [
      "Comida rápida",
      "Domicilios"
    ],
    "precioRango": "Menú desde $20.000",
    "telefono": "+57 304 245 1420",
    "whatsapp": "573042451420",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=MostRicos+Armenia",
    "imagen": "./pautas_publicitarias/Comidas_Rapidas/mostricos.png",
    "galeria": [
      "./pautas_publicitarias/Comidas_Rapidas/mostricos.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "MostRicos",
      "Comida rápida",
      "gastronomia",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "Restaurant",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Sede 1: Barrio Granada Cra 23e 11-84 Piso 2. Sede 2: Cra 14 21 Norte. Plato destacado: Bomba Nuclear.",
    "municipio": "armenia"
  },
  {
    "id": "sandukes",
    "nombre": "SánDukes",
    "slug": "sandukes",
    "categoria": "gastronomia",
    "tipo": "Sanducheria",
    "municipioId": "armenia",
    "descripcion": "¡Comiendo SANO Y delicioso! Menú sánduches: Encendido (costilla ahumada, miel-bbq, queso), Nevado (pollo desmechado en salsa blanca, queso), Ranchero (carne desmechada, tocino, chorizo, cheddar), Despeinado (carne desmechada, salsa de la casa, queso), Paisaje (pollo desmechado, verduras salteadas, queso), Hawaiano (piña calada, queso, jamón). Todos incluyen tomate, lechuga, pepino (excepto Hawaiano). Menú línea dulce: arequipe de maracuyá, arequipe de café, muffin de zanahoria (nueces, pasas, cubierta blanca), tarta de queso (receta española premiada).",
    "descripcionLong": "¡Comiendo SANO Y delicioso! Menú sánduches: Encendido (costilla ahumada, miel-bbq, queso), Nevado (pollo desmechado en salsa blanca, queso), Ranchero (carne desmechada, tocino, chorizo, cheddar), Despeinado (carne desmechada, salsa de la casa, queso), Paisaje (pollo desmechado, verduras salteadas, queso), Hawaiano (piña calada, queso, jamón). Todos incluyen tomate, lechuga, pepino (excepto Hawaiano). Menú línea dulce: arequipe de maracuyá, arequipe de café, muffin de zanahoria (nueces, pasas, cubierta blanca), tarta de queso (receta española premiada).",
    "direccion": "",
    "lat": 4.53,
    "lng": -75.68,
    "servicios": [
      "Sánduches",
      "Postres",
      "Domicilios"
    ],
    "precioRango": "Menú desde $12.000",
    "telefono": "+57 321 407 7605",
    "whatsapp": "573214077605",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=SánDukes+Armenia",
    "imagen": "./pautas_publicitarias/Comidas_Rapidas/sanduches_sandukes.png",
    "galeria": [
      "./pautas_publicitarias/Comidas_Rapidas/sanduches_sandukes.png"
    ],
    "nivel": "estandar",
    "palabrasClave": [
      "SánDukes",
      "Sanducheria",
      "gastronomia",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "Restaurant",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "¡Comiendo SANO Y delicioso! Menú sánduches: Encendido (costilla ahumada, miel-bbq, queso), Nevado (pollo desmechado en salsa blanca, queso), Ranchero (carne desmechada, tocino, chorizo, cheddar), Despeinado (carne desmechada, salsa de la casa, queso), Paisaje (pollo desmechado, verduras salteadas, queso), Hawaiano (piña calada, queso, jamón). Todos incluyen tomate, lechuga, pepino (excepto Hawaiano). Menú línea dulce: arequipe de maracuyá, arequipe de café, muffin de zanahoria (nueces, pasas, cubierta blanca), tarta de queso (receta española premiada).",
    "municipio": "armenia"
  },
  {
    "id": "el-fogon-cuyabro",
    "nombre": "El Fogón Cuyabro",
    "slug": "el-fogon-cuyabro",
    "categoria": "gastronomia",
    "tipo": "Restaurante típico",
    "municipioId": "armenia",
    "descripcion": "¡Sabor de Casa, Corazón Paisa! Sabor que nace de nuestras raíces. Parque Sucre, carrera 14 #12-48.",
    "descripcionLong": "¡Sabor de Casa, Corazón Paisa! Sabor que nace de nuestras raíces. Parque Sucre, carrera 14 #12-48.",
    "direccion": "",
    "lat": 4.535,
    "lng": -75.68,
    "servicios": [
      "Comida típica",
      "Domicilios",
      "Reservas"
    ],
    "precioRango": "Menú desde $25.000",
    "telefono": "+57 311 386 2329",
    "whatsapp": "573113862329",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=El+Fogón+Cuyabro+Armenia",
    "imagen": "./pautas_publicitarias/Gastronomia_tipica/restaurante_el_fogon.png",
    "galeria": [
      "./pautas_publicitarias/Gastronomia_tipica/restaurante_el_fogon.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "El Fogón Cuyabro",
      "Restaurante típico",
      "gastronomia",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "Restaurant",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "¡Sabor de Casa, Corazón Paisa! Sabor que nace de nuestras raíces. Parque Sucre, carrera 14 #12-48.",
    "municipio": "armenia"
  },
  {
    "id": "el-roble",
    "nombre": "El Roble",
    "slug": "el-roble",
    "categoria": "gastronomia",
    "tipo": "Restaurante campestre",
    "municipioId": "armenia",
    "descripcion": "Ven a vivir El Roble. Comida típica con la mejor sazón. Km 12 vía Armenia - Pereira.",
    "descripcionLong": "Ven a vivir El Roble. Comida típica con la mejor sazón. Km 12 vía Armenia - Pereira.",
    "direccion": "",
    "lat": 4.6,
    "lng": -75.65,
    "servicios": [
      "Comida típica",
      "Reservas",
      "Restaurante"
    ],
    "precioRango": "Menú desde $30.000",
    "telefono": "+57 317 517 1403",
    "whatsapp": "573175171403",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=El+Roble+Km+12+vía+Armenia+-+Pereira",
    "imagen": "./pautas_publicitarias/Gastronomia_tipica/restaurante_el_roble.png",
    "galeria": [
      "./pautas_publicitarias/Gastronomia_tipica/restaurante_el_roble.png"
    ],
    "nivel": "estandar",
    "palabrasClave": [
      "El Roble",
      "Restaurante campestre",
      "gastronomia",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "Restaurant",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Ven a vivir El Roble. Comida típica con la mejor sazón. Km 12 vía Armenia - Pereira.",
    "municipio": "armenia"
  },
  {
    "id": "la-feria-del-platano",
    "nombre": "La Feria del Plátano",
    "slug": "la-feria-del-platano",
    "categoria": "gastronomia",
    "tipo": "Restaurante típico",
    "municipioId": "armenia",
    "descripcion": "Sabor típico del Quindío. Platos destacados: sancocho de gallina, bandeja paisa, chuleta de cerdo. Sedes: Sagrada Familia - Privilegio Mall.",
    "descripcionLong": "Sabor típico del Quindío. Platos destacados: sancocho de gallina, bandeja paisa, chuleta de cerdo. Sedes: Sagrada Familia - Privilegio Mall.",
    "direccion": "",
    "lat": 4.53,
    "lng": -75.68,
    "servicios": [
      "Comida típica",
      "Domicilios",
      "Reservas"
    ],
    "precioRango": "Menú desde $25.000",
    "telefono": "+57 316 480 5446",
    "whatsapp": "573164805446",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=La+Feria+del+Plátano+Armenia",
    "imagen": "./pautas_publicitarias/Gastronomia_tipica/restaurante_la_feria_del_platano.png",
    "galeria": [
      "./pautas_publicitarias/Gastronomia_tipica/restaurante_la_feria_del_platano.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "La Feria del Plátano",
      "Restaurante típico",
      "gastronomia",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "Restaurant",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Sabor típico del Quindío. Platos destacados: sancocho de gallina, bandeja paisa, chuleta de cerdo. Sedes: Sagrada Familia - Privilegio Mall.",
    "municipio": "armenia"
  },
  {
    "id": "anatolia",
    "nombre": "Anatolia",
    "slug": "anatolia",
    "categoria": "gastronomia",
    "tipo": "Restaurante",
    "municipioId": "armenia",
    "descripcion": "Un encuentro de sabores en Quindío. Avenida 19 # 35 norte 41, Armenia, Quindío.",
    "descripcionLong": "Un encuentro de sabores en Quindío. Avenida 19 # 35 norte 41, Armenia, Quindío.",
    "direccion": "",
    "lat": 4.54,
    "lng": -75.68,
    "servicios": [
      "Comida",
      "Reservas"
    ],
    "precioRango": "Menú desde $30.000",
    "telefono": "+57 311 701 1653",
    "whatsapp": "573117011653",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Anatolia+Armenia",
    "imagen": "./pautas_publicitarias/Tiendas_de_cafe/anatolia.png",
    "galeria": [
      "./pautas_publicitarias/Tiendas_de_cafe/anatolia.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Anatolia",
      "Restaurante",
      "gastronomia",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "Restaurant",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Un encuentro de sabores en Quindío. Avenida 19 # 35 norte 41, Armenia, Quindío.",
    "municipio": "armenia"
  },
  {
    "id": "camino-al-futbol",
    "nombre": "Camino al Fútbol",
    "slug": "camino-al-futbol",
    "categoria": "deporte",
    "tipo": "Formación deportiva",
    "municipioId": "armenia",
    "descripcion": "Formación deportiva de alto nivel / Formación integral. Formación, espíritu y valores.",
    "descripcionLong": "Formación deportiva de alto nivel / Formación integral. Formación, espíritu y valores.",
    "direccion": "",
    "lat": 4.53,
    "lng": -75.68,
    "servicios": [
      "Formación deportiva",
      "Entrenamientos",
      "Valores"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 316 402 6653",
    "whatsapp": "573164026653",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Camino+al+Fútbol+Armenia",
    "imagen": "./pautas_publicitarias/Deportes y entretenimiento/camino_al_futbol.png",
    "galeria": [
      "./pautas_publicitarias/Deportes y entretenimiento/camino_al_futbol.png"
    ],
    "nivel": "estandar",
    "palabrasClave": [
      "Camino al Fútbol",
      "Formación deportiva",
      "deporte",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "LocalBusiness",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Formación deportiva de alto nivel / Formación integral. Formación, espíritu y valores.",
    "municipio": "armenia"
  },
  {
    "id": "orquesta-quinta-base",
    "nombre": "Orquesta Quinta Base",
    "slug": "orquesta-quinta-base",
    "categoria": "entretenimiento",
    "tipo": "Orquesta",
    "municipioId": "armenia",
    "descripcion": "SU EVENTO MERECE LO MEJOR NOSOTROS LO TENEMOS. ORQUESTA QUINTA BASE.",
    "descripcionLong": "SU EVENTO MERECE LO MEJOR NOSOTROS LO TENEMOS. ORQUESTA QUINTA BASE.",
    "direccion": "",
    "lat": 4.53,
    "lng": -75.68,
    "servicios": [
      "Música en vivo",
      "Eventos"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 313 683 3186",
    "whatsapp": "573136833186",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Orquesta+Quinta+Base+Armenia",
    "imagen": "./pautas_publicitarias/grupos_musicales/orquesta_quinta_base.png",
    "galeria": [
      "./pautas_publicitarias/grupos_musicales/orquesta_quinta_base.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Orquesta Quinta Base",
      "Orquesta",
      "entretenimiento",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "LocalBusiness",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "SU EVENTO MERECE LO MEJOR NOSOTROS LO TENEMOS. ORQUESTA QUINTA BASE.",
    "municipio": "armenia"
  },
  {
    "id": "reina-querida",
    "nombre": "Reina Querida",
    "slug": "reina-querida",
    "categoria": "gastronomia",
    "tipo": "Piononos y cremas",
    "municipioId": "armenia",
    "descripcion": "¡Ven! Esto te va a gustar... La mezcla ideal entre suavidad y dulzura ✨ Un rincón acogedor con sabor a tradición 🧡 Calle 22 Norte 14-40 Edificio Zona-L lc 6, Armenia, Quindío. Especialidad: piononos y cremas.",
    "descripcionLong": "¡Ven! Esto te va a gustar... La mezcla ideal entre suavidad y dulzura ✨ Un rincón acogedor con sabor a tradición 🧡 Calle 22 Norte 14-40 Edificio Zona-L lc 6, Armenia, Quindío. Especialidad: piononos y cremas.",
    "direccion": "",
    "lat": 4.54,
    "lng": -75.68,
    "servicios": [
      "Postres",
      "Piononos",
      "Cremas",
      "Domicilios"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 300 000 0102",
    "whatsapp": "5730000000102",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Reina+Querida+Armenia",
    "imagen": "./pautas_publicitarias/postres_y_dulces/reina__querida.png",
    "galeria": [
      "./pautas_publicitarias/postres_y_dulces/reina__querida.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Reina Querida",
      "Piononos y cremas",
      "gastronomia",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "Restaurant",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "¡Ven! Esto te va a gustar... La mezcla ideal entre suavidad y dulzura ✨ Un rincón acogedor con sabor a tradición 🧡 Calle 22 Norte 14-40 Edificio Zona-L lc 6, Armenia, Quindío. Especialidad: piononos y cremas.",
    "municipio": "armenia"
  },
  {
    "id": "confia-seguros",
    "nombre": "Confia Seguros",
    "slug": "confia-seguros",
    "categoria": "seguro",
    "tipo": "Seguros",
    "municipioId": "armenia",
    "descripcion": "Respaldo y Tranquilidad. Nombre de la asesora: DIANA MARÍA PRIETO CORREA. Cargo: Asesora en Gestión, Tendencias y Riesgos.",
    "descripcionLong": "Respaldo y Tranquilidad. Nombre de la asesora: DIANA MARÍA PRIETO CORREA. Cargo: Asesora en Gestión, Tendencias y Riesgos.",
    "direccion": "",
    "lat": 4.534,
    "lng": -75.681,
    "servicios": [
      "Seguros de vida",
      "Seguros de automóvil",
      "Seguros de salud",
      "Asesoría en riesgos"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 315 486 1761",
    "whatsapp": "573154861761",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Confia+Seguros+Armenia",
    "imagen": "./pautas_publicitarias/seguros/seguros_confia.png",
    "galeria": [
      "./pautas_publicitarias/seguros/seguros_confia.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Confia Seguros",
      "Seguros",
      "seguro",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "LocalBusiness",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Respaldo y Tranquilidad. Nombre de la asesora: DIANA MARÍA PRIETO CORREA. Cargo: Asesora en Gestión, Tendencias y Riesgos.",
    "municipio": "armenia"
  },
  {
    "id": "diana-seguros",
    "nombre": "Diana Seguros de Viaje",
    "slug": "diana-seguros-de-viaje",
    "categoria": "seguro",
    "tipo": "Seguro de Viaje",
    "municipioId": "armenia",
    "descripcion": "Seguros de viaje para turistas nacionales e internacionales. Protege tu aventura en el Quindío.",
    "descripcionLong": "Seguros de viaje para turistas nacionales e internacionales. Protege tu aventura en el Quindío.",
    "direccion": "",
    "lat": 4.534,
    "lng": -75.681,
    "servicios": [
      "Seguro médico",
      "Asistencia 24h",
      "Cancelación",
      "Equipaje"
    ],
    "precioRango": "Desde $15.000/día",
    "telefono": "+57 300 000 0025",
    "whatsapp": "5730000000025",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Diana+Seguros+Armenia",
    "imagen": "./assets/images/decoraciones/2151973988.jpg",
    "galeria": [
      "./assets/images/decoraciones/2151973988.jpg"
    ],
    "nivel": "estandar",
    "palabrasClave": [
      "Diana Seguros de Viaje",
      "Seguro de Viaje",
      "seguro",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "LocalBusiness",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Seguros de viaje para turistas nacionales e internacionales. Protege tu aventura en el Quindío.",
    "municipio": "armenia"
  },
  {
    "id": "cafe-la-terraza",
    "nombre": "Café La Terraza",
    "slug": "cafe-la-terraza",
    "categoria": "cafe",
    "tipo": "Café",
    "municipioId": "armenia",
    "descripcion": "Tu café de origen, siempre fresco y delicioso. ¡Visítanos en la Plaza de Bolívar! Cll 20 entre Carreras 14 y 15. Abierto todos los días.",
    "descripcionLong": "Tu café de origen, siempre fresco y delicioso. ¡Visítanos en la Plaza de Bolívar! Cll 20 entre Carreras 14 y 15. Abierto todos los días.",
    "direccion": "",
    "lat": 4.53,
    "lng": -75.68,
    "servicios": [
      "Cafés",
      "Pastelería",
      "WiFi"
    ],
    "precioRango": "Desde $6.000",
    "telefono": "+57 316 446 9365",
    "whatsapp": "573164469365",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Café+La+Terraza+Armenia",
    "imagen": "./pautas_publicitarias/Tiendas_de_cafe/cafe_la_terraza.png",
    "galeria": [
      "./pautas_publicitarias/Tiendas_de_cafe/cafe_la_terraza.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Café La Terraza",
      "Café",
      "cafe",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "LocalBusiness",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Tu café de origen, siempre fresco y delicioso. ¡Visítanos en la Plaza de Bolívar! Cll 20 entre Carreras 14 y 15. Abierto todos los días.",
    "municipio": "armenia"
  },
  {
    "id": "cafe-sensorial",
    "nombre": "Café Sensorial",
    "slug": "cafe-sensorial",
    "categoria": "cafe",
    "tipo": "Café Especializado",
    "municipioId": "armenia",
    "descripcion": "Tu historia en cada taza / Aroma, tradición. Medium Roast. Especialidades destacadas: Espresso | Latte | Cold Brew. Parque Fundadores — Local 07.",
    "descripcionLong": "Tu historia en cada taza / Aroma, tradición. Medium Roast. Especialidades destacadas: Espresso | Latte | Cold Brew. Parque Fundadores — Local 07.",
    "direccion": "",
    "lat": 4.535,
    "lng": -75.685,
    "servicios": [
      "Cafés especiales",
      "Pastelería",
      "WiFi",
      "Catas"
    ],
    "precioRango": "Desde $8.000",
    "telefono": "+57 311 711 3473",
    "whatsapp": "573117113473",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Café+Sensorial+Armenia",
    "imagen": "./pautas_publicitarias/Tiendas_de_cafe/cafe_sensorial.png",
    "galeria": [
      "./pautas_publicitarias/Tiendas_de_cafe/cafe_sensorial.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Café Sensorial",
      "Café Especializado",
      "cafe",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "LocalBusiness",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Tu historia en cada taza / Aroma, tradición. Medium Roast. Especialidades destacadas: Espresso | Latte | Cold Brew. Parque Fundadores — Local 07.",
    "municipio": "armenia"
  },
  {
    "id": "queso-y-cafe",
    "nombre": "Queso & Café",
    "slug": "queso-cafe",
    "categoria": "cafe",
    "tipo": "Café y snacks",
    "municipioId": "armenia",
    "descripcion": "Armenia - Quindío • Tradición • ¡Llegamos a Laureles, Armenia! Ven y disfruta de los mejores pandebonos del mundo. Te esperamos en nuestra nueva sede: Calle 22 Norte Cra 14 - 28 Edificio Torre Ele local 1.",
    "descripcionLong": "Armenia - Quindío • Tradición • ¡Llegamos a Laureles, Armenia! Ven y disfruta de los mejores pandebonos del mundo. Te esperamos en nuestra nueva sede: Calle 22 Norte Cra 14 - 28 Edificio Torre Ele local 1.",
    "direccion": "",
    "lat": 4.54,
    "lng": -75.68,
    "servicios": [
      "Café",
      "Pandebonos",
      "Snacks",
      "WiFi"
    ],
    "precioRango": "Desde $5.000",
    "telefono": "+57 300 000 0103",
    "whatsapp": "5730000000103",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Queso+%26+Café+Armenia",
    "imagen": "./pautas_publicitarias/Tiendas_de_cafe/queso_y_cafe.png",
    "galeria": [
      "./pautas_publicitarias/Tiendas_de_cafe/queso_y_cafe.png"
    ],
    "nivel": "estandar",
    "palabrasClave": [
      "Queso & Café",
      "Café y snacks",
      "cafe",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "LocalBusiness",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Armenia - Quindío • Tradición • ¡Llegamos a Laureles, Armenia! Ven y disfruta de los mejores pandebonos del mundo. Te esperamos en nuestra nueva sede: Calle 22 Norte Cra 14 - 28 Edificio Torre Ele local 1.",
    "municipio": "armenia"
  },
  {
    "id": "cafeina-coffee-shop",
    "nombre": "Tienda de Café & Academia Cafeína",
    "slug": "tienda-de-cafe-academia-cafeina",
    "categoria": "cafe",
    "tipo": "Café y Academia",
    "municipioId": "armenia",
    "descripcion": "Cafeína Coffee Shop. Tienda de café & academia. Capacitaciones personalizadas: barismo, catas y calidad del café, tostión, mantenimiento de máquinas, tienda de café especial. Calle 17N #10-30 Barrio El Nogal, Armenia, Quindío.",
    "descripcionLong": "Cafeína Coffee Shop. Tienda de café & academia. Capacitaciones personalizadas: barismo, catas y calidad del café, tostión, mantenimiento de máquinas, tienda de café especial. Calle 17N #10-30 Barrio El Nogal, Armenia, Quindío.",
    "direccion": "",
    "lat": 4.53,
    "lng": -75.69,
    "servicios": [
      "Cafés especiales",
      "Capacitaciones en barismo",
      "Catas",
      "Mantenimiento de máquinas",
      "Tienda de café"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 317 439 3457",
    "whatsapp": "573174393457",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Cafeína+Coffee+Shop+Armenia",
    "imagen": "./pautas_publicitarias/Tiendas_de_cafe/tienda_de_cafe_y_academia_cafeina.png",
    "galeria": [
      "./pautas_publicitarias/Tiendas_de_cafe/tienda_de_cafe_y_academia_cafeina.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Tienda de Café & Academia Cafeína",
      "Café y Academia",
      "cafe",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "LocalBusiness",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Cafeína Coffee Shop. Tienda de café & academia. Capacitaciones personalizadas: barismo, catas y calidad del café, tostión, mantenimiento de máquinas, tienda de café especial. Calle 17N #10-30 Barrio El Nogal, Armenia, Quindío.",
    "municipio": "armenia"
  },
  {
    "id": "radio-taxi-quindio",
    "nombre": "Radio Taxi del Quindío",
    "slug": "radio-taxi-del-quindio",
    "categoria": "transporte",
    "tipo": "Taxi",
    "municipioId": "armenia",
    "descripcion": "Desde 1991. Pide un taxi a cualquier hora del día 24/7. Descarga la app en App Store y Google Play.",
    "descripcionLong": "Desde 1991. Pide un taxi a cualquier hora del día 24/7. Descarga la app en App Store y Google Play.",
    "direccion": "",
    "lat": 4.53,
    "lng": -75.68,
    "servicios": [
      "Taxi 24h",
      "App de taxi",
      "Transporte seguro"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 311 542 2222",
    "whatsapp": "573115422222",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Radio+Taxi+del+Quindío",
    "imagen": "./pautas_publicitarias/Transportes/radio_taxi.png",
    "galeria": [
      "./pautas_publicitarias/Transportes/radio_taxi.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Radio Taxi del Quindío",
      "Taxi",
      "transporte",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "LocalBusiness",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Desde 1991. Pide un taxi a cualquier hora del día 24/7. Descarga la app en App Store y Google Play.",
    "municipio": "armenia"
  },
  {
    "id": "joselu-transporte",
    "nombre": "Joselu Transporte y Turismo",
    "slug": "joselu-transporte-y-turismo",
    "categoria": "transporte",
    "tipo": "Transporte turístico",
    "municipioId": "armenia",
    "descripcion": "¿A dónde quieres ir hoy?",
    "descripcionLong": "¿A dónde quieres ir hoy?",
    "direccion": "",
    "lat": 4.53,
    "lng": -75.68,
    "servicios": [
      "Transporte turístico",
      "Transporte privado",
      "Turismo"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 302 215 3132",
    "whatsapp": "573022153132",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Joselu+Transporte+y+Turismo",
    "imagen": "./pautas_publicitarias/Transportes/transportes_joselu.png",
    "galeria": [
      "./pautas_publicitarias/Transportes/transportes_joselu.png"
    ],
    "nivel": "estandar",
    "palabrasClave": [
      "Joselu Transporte y Turismo",
      "Transporte turístico",
      "transporte",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "LocalBusiness",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "¿A dónde quieres ir hoy?",
    "municipio": "armenia"
  },
  {
    "id": "mocca-aventura-y-cafe",
    "nombre": "Mocca Aventura y Café",
    "slug": "mocca-aventura-y-cafe",
    "categoria": "transporte",
    "tipo": "Operadora y transporte turístico",
    "municipioId": "armenia",
    "descripcion": "Operadora y transporte turístico. Somos una operadora turística y de transporte del eje cafetero, donde cada tour es a través del corazón del eje.",
    "descripcionLong": "Operadora y transporte turístico. Somos una operadora turística y de transporte del eje cafetero, donde cada tour es a través del corazón del eje.",
    "direccion": "",
    "lat": 4.53,
    "lng": -75.68,
    "servicios": [
      "Transporte turístico",
      "Tours",
      "Guías"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 311 704 3170",
    "whatsapp": "573117043170",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Mocca+Aventura+y+Café",
    "imagen": "./pautas_publicitarias/Transportes/transportes_mocca.png",
    "galeria": [
      "./pautas_publicitarias/Transportes/transportes_mocca.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Mocca Aventura y Café",
      "Operadora y transporte turístico",
      "transporte",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "LocalBusiness",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Operadora y transporte turístico. Somos una operadora turística y de transporte del eje cafetero, donde cada tour es a través del corazón del eje.",
    "municipio": "armenia"
  },
  {
    "id": "transportes-union-cafetera",
    "nombre": "Transportes Unión Cafetera",
    "slug": "transportes-union-cafetera",
    "categoria": "transporte",
    "tipo": "Transporte",
    "municipioId": "armenia",
    "descripcion": "Transequin - Unión Cafetera. RNT 65574. Expertos en transporte / Afíliate a nuestro Parque Automotor. Servicios: transporte escolar, empresarial, de salud y transporte de turismo. Vigilado SuperTransporte.",
    "descripcionLong": "Transequin - Unión Cafetera. RNT 65574. Expertos en transporte / Afíliate a nuestro Parque Automotor. Servicios: transporte escolar, empresarial, de salud y transporte de turismo. Vigilado SuperTransporte.",
    "direccion": "",
    "lat": 4.53,
    "lng": -75.68,
    "servicios": [
      "Transporte escolar",
      "Transporte empresarial",
      "Transporte de salud",
      "Transporte turístico"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 300 590 8383",
    "whatsapp": "573005908383",
    "email": "",
    "url": "",
    "maps": "https://www.unioncafetera.com",
    "imagen": "./pautas_publicitarias/Transportes/transportes_union_cafetera.png",
    "galeria": [
      "./pautas_publicitarias/Transportes/transportes_union_cafetera.png"
    ],
    "nivel": "premium",
    "palabrasClave": [
      "Transportes Unión Cafetera",
      "Transporte",
      "transporte",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "LocalBusiness",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Transequin - Unión Cafetera. RNT 65574. Expertos en transporte / Afíliate a nuestro Parque Automotor. Servicios: transporte escolar, empresarial, de salud y transporte de turismo. Vigilado SuperTransporte.",
    "municipio": "armenia"
  },
  {
    "id": "buen-vuelo-tours",
    "nombre": "Buen Vuelo Tours",
    "slug": "buen-vuelo-tours",
    "categoria": "agencia",
    "tipo": "Agencia de viajes y turismo",
    "municipioId": "armenia",
    "descripcion": "Agencia de viajes y turismo en Armenia, Quindío.",
    "descripcionLong": "Agencia de viajes y turismo en Armenia, Quindío.",
    "lat": 4.5339,
    "lng": -75.6811,
    "direccion": "",
    "servicios": [
      "Tours",
      "Reservas",
      "Transporte",
      "Asesoría"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 301 204 2819",
    "whatsapp": "573012042819",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Buen+Vuelo+Tours+Armenia",
    "imagen": "./pautas_publicitarias/agencias_de_turismo/buen_vuelo_tours.png",
    "galeria": [
      "./pautas_publicitarias/agencias_de_turismo/buen_vuelo_tours.png"
    ],
    "nivel": "estandar",
    "palabrasClave": [
      "Buen Vuelo Tours",
      "Agencia de viajes y turismo",
      "agencia",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "LocalBusiness",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Agencia de viajes y turismo en Armenia, Quindío.",
    "municipio": "armenia"
  },
  {
    "id": "juan-arrubla",
    "nombre": "Juan Arrubla",
    "slug": "juan-arrubla",
    "categoria": "guia",
    "tipo": "Guía turístico",
    "municipioId": "armenia",
    "descripcion": "Guía de turismo local en Armenia y alrededores.",
    "descripcionLong": "Guía de turismo local en Armenia y alrededores.",
    "lat": 4.5339,
    "lng": -75.6811,
    "direccion": "",
    "servicios": [
      "Guianza",
      "Tours",
      "Rutas personalizadas"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 321 899 5839",
    "whatsapp": "573218995839",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Juan+Arrubla+Armenia",
    "imagen": "./pautas_publicitarias/agencias_de_turismo/juan_arrubla.png",
    "galeria": [
      "./pautas_publicitarias/agencias_de_turismo/juan_arrubla.png"
    ],
    "nivel": "estandar",
    "palabrasClave": [
      "Juan Arrubla",
      "Guía turístico",
      "guia",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "LocalBusiness",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Guía de turismo local en Armenia y alrededores.",
    "municipio": "armenia"
  },
  {
    "id": "artesanias-turron-y-cafe",
    "nombre": "Artesanías Turrón y Café",
    "slug": "artesanias-turron-y-cafe",
    "categoria": "artesanias",
    "tipo": "Artesanías",
    "municipioId": "armenia",
    "descripcion": "Tienda de artesanía, bisutería y dulcería en Armenia.",
    "descripcionLong": "Tienda de artesanía, bisutería y dulcería en Armenia.",
    "lat": 4.5339,
    "lng": -75.6811,
    "direccion": "",
    "servicios": [
      "Artesanías",
      "Dulces",
      "Regalos"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 310 398 3619",
    "whatsapp": "573103983619",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Artesanías+Turrón+y+Café+Armenia",
    "imagen": "./pautas_publicitarias/artesanias/artesanias_turronycafe.png",
    "galeria": [
      "./pautas_publicitarias/artesanias/artesanias_turronycafe.png"
    ],
    "nivel": "estandar",
    "palabrasClave": [
      "Artesanías Turrón y Café",
      "Artesanías",
      "artesanias",
      "armenia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "LocalBusiness",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Tienda de artesanía, bisutería y dulcería en Armenia.",
    "municipio": "armenia"
  },
  {
    "id": "ceramicas-el-alfarero",
    "nombre": "Cerámicas El Alfarero",
    "slug": "ceramicas-el-alfarero",
    "categoria": "artesanias",
    "tipo": "Artesanía",
    "municipioId": "circasia",
    "descripcion": "Puesto de alfarería en el Centro Artesanal Plaza de Bolívar, Circasia.",
    "descripcionLong": "Puesto de alfarería en el Centro Artesanal Plaza de Bolívar, Circasia.",
    "lat": 4.6167,
    "lng": -75.6333,
    "direccion": "",
    "servicios": [
      "Cerámica",
      "Piezas de barro",
      "Clases"
    ],
    "precioRango": "Consultar",
    "telefono": "+57 320 617 8498",
    "whatsapp": "573206178498",
    "email": "",
    "url": "",
    "maps": "https://maps.google.com/?q=Cerámicas+El+Alfarero+Circasia",
    "imagen": "./pautas_publicitarias/artesanias/ceramicas_alfarero.jpg",
    "galeria": [
      "./pautas_publicitarias/artesanias/ceramicas_alfarero.jpg"
    ],
    "nivel": "estandar",
    "palabrasClave": [
      "Cerámicas El Alfarero",
      "Artesanía",
      "artesanias",
      "circasia",
      "Quindío",
      "Eje Cafetero"
    ],
    "fechaPublicacion": "2026-01-15",
    "fechaActualizacion": "2026-07-07",
    "rating": {
      "valor": 4.8,
      "cantidad": 24
    },
    "author": {
      "name": "Equipo Mapa Turístico del Quindío",
      "url": "https://www.mapaturisticodelquindio.com"
    },
    "schema": {
      "@type": "LocalBusiness",
      "priceRange": "$$",
      "servesCuisine": [
        "Colombiana",
        "Cafetera"
      ],
      "openingHours": [
        "Mo-Su 00:00-23:59"
      ]
    },
    "transporte": [],
    "desc": "Puesto de alfarería en el Centro Artesanal Plaza de Bolívar, Circasia.",
    "municipio": "circasia"
  }
];

const ITINERARIOS = [
  {
    "id": "fin-de-semana-calarca",
    "titulo": "Fin de semana en Calarcá",
    "duracion": "2 días",
    "emoji": "☕",
    "desc": "El itinerario perfecto para conocer el corazón del Paisaje Cultural Cafetero.",
    "dias": [
      {
        "dia": "Día 1",
        "actividades": [
          "Llegada a Calarcá",
          "Recorrido por el centro histórico",
          "Cena en La Talanquera"
        ]
      },
      {
        "dia": "Día 2",
        "actividades": [
          "Tour en La Recuca (proceso del café)",
          "Cata de cafés especiales en Origen Café",
          "Regreso"
        ]
      }
    ],
    "negocios": [
      "recuca",
      "domo-aves",
      "la-talanquera"
    ]
  }
];

/* ── HELPERS ── */
function getNegociosByCategoria(cat) { return NEGOCIOS.filter(n => n.categoria === cat); }
function getNegociosByMunicipio(mun) { return NEGOCIOS.filter(n => n.municipio === mun); }
function getNegocioById(id) { return NEGOCIOS.find(n => n.id === id); }
function getMunicipioById(id) { return MUNICIPIOS.find(m => m.id === id); }