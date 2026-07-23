
const fs = require('fs');
const path = require('path');

const PAUTANTES_PATH = path.join(__dirname, '../data/pautantes.json');
const MASTER_DATA_PATH = path.join(__dirname, '../data/master-data.json');
const PAUTANTES_DIR = path.join(__dirname, '../pautantes');

// Leer pautantes.json (como base)
let pautantesBase = [];
try {
  pautantesBase = JSON.parse(fs.readFileSync(PAUTANTES_PATH, 'utf8'));
} catch (e) {
  console.warn('⚠️ No se encontró pautantes.json, empezando de cero');
}
const masterData = JSON.parse(fs.readFileSync(MASTER_DATA_PATH, 'utf8'));

// Lista de directorios en pautantes
const pautanteDirs = fs.readdirSync(PAUTANTES_DIR, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log(`📂 Encontrados ${pautanteDirs.length} pautantes`);

const negociosMapeados = [];
const pautantesActualizados = [];

for (const slug of pautanteDirs) {
  const pautanteDir = path.join(PAUTANTES_DIR, slug);
  const jsonFiles = fs.readdirSync(pautanteDir).filter(file => file.endsWith('.json'));
  
  // Buscar el JSON file que corresponda
  let pautanteData = {};
  if (jsonFiles.length > 0) {
    const jsonPath = path.join(pautanteDir, jsonFiles[0]); // Tomar el primero, pero idealmente el que se llame como el slug
    try {
      pautanteData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      console.log(`✅ Leído ${jsonFiles[0]} para ${slug}`);
    } catch (e) {
      console.warn(`⚠️ Error al leer ${jsonPath}: ${e}`);
    }
  }

  // Buscar en la base de pautantes.json si existe
  let baseData = pautantesBase.find(p => (p.id === slug || p.nombre.toLowerCase().replace(/\s+/g, '-') === slug));

  // Fusionar datos
  const mergedData = { ...baseData, ...pautanteData };

  // Ahora procesar los datos
  // Normalizar campos:
  let finalId = mergedData.id || slug;
  let finalNombre = mergedData.nombre || baseData?.nombre || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  let finalCategoria = mergedData.categoria || baseData?.categoria || 'alojamiento';
  let finalTipo = mergedData.tipo || baseData?.tipo || 'Negocio';
  let finalMunicipio = mergedData.municipio || baseData?.municipio || 'armenia';
  let finalDesc = mergedData.desc || mergedData.descripcion || baseData?.desc || '';
  let finalDireccion = mergedData.direccion || mergedData.ubicacion || baseData?.direccion || '';
  let finalEmail = mergedData.email || (mergedData.contacto ? mergedData.contacto.email : '') || baseData?.email || '';
  let finalWebOficial = mergedData.web_oficial || (mergedData.contacto ? mergedData.contacto.web_oficial : '') || baseData?.url || '';
  let finalTelefono = mergedData.telefono || (mergedData.contacto ? mergedData.contacto.telefono : '') || baseData?.telefono || '';
  let finalWhatsapp = mergedData.whatsapp || (mergedData.contacto ? mergedData.contacto.whatsapp : '') || baseData?.whatsapp || '';
  let finalServicios = mergedData.servicios || baseData?.servicios || [];
  let finalExperiencias = mergedData.experiencias || baseData?.experiencias || [];
  let finalPrecio = mergedData.precio || baseData?.precio || 'Consultar';
  let finalMaps = mergedData.maps || baseData?.maps || '';
  let finalLat = mergedData.lat || baseData?.lat;
  let finalLng = mergedData.lng || baseData?.lng;
  let finalNivel = mergedData.nivel || baseData?.nivel || 'premium';
  let finalHorario = mergedData.horario || baseData?.horario || '';
  let finalDuracionEstimada = mergedData.duracion_estimada || baseData?.duracion_estimada || '';
  let finalIdealPara = mergedData.ideal_para || baseData?.ideal_para || [];
  let finalRecomendaciones = mergedData.recomendaciones || baseData?.recomendaciones || '';
  let finalOrdenSugerido = mergedData.orden_sugerido || baseData?.orden_sugerido || 1;
  let finalTagsItinerario = mergedData.tags_itinerario || baseData?.tags_itinerario || [];

  // Procesar imagen, logo, multimedia
  let finalImagen = mergedData.imagen || baseData?.imagen || '';
  // Si no hay imagen, buscar archivos en el directorio pautante
  if (!finalImagen) {
    const imageFiles = fs.readdirSync(pautanteDir)
      .filter(file => /\.(png|jpg|jpeg|webp)$/i.test(file) && !file.toLowerCase().includes('logo'));
    if (imageFiles.length > 0) {
      finalImagen = `./pautantes/${slug}/${imageFiles[0]}`;
    }
  }
  let finalLogo = mergedData.logo || '';
  if (!finalLogo) {
    const logoFiles = fs.readdirSync(pautanteDir)
      .filter(file => /\.(png|jpg|jpeg|webp)$/i.test(file) && file.toLowerCase().includes('logo'));
    if (logoFiles.length > 0) {
      finalLogo = `./pautantes/${slug}/${logoFiles[0]}`;
    }
  }
  let finalMultimedia = mergedData.multimedia || baseData?.multimedia || { fotos: [], videos: [] };
  // Cargar fotos del directorio si no hay
  if (finalMultimedia.fotos.length === 0) {
    const photoFiles = fs.readdirSync(pautanteDir)
      .filter(file => /\.(png|jpg|jpeg|webp)$/i.test(file));
    finalMultimedia.fotos = photoFiles.map(file => `./pautantes/${slug}/${file}`);
  }
  let finalGaleria = finalMultimedia.fotos.length > 0 ? finalMultimedia.fotos : (finalImagen ? [finalImagen] : []);

  // Generar schema type
  let schemaType = 'LocalBusiness';
  if (finalCategoria === 'alojamiento') schemaType = 'Hotel';
  else if (finalCategoria === 'gastronomia') schemaType = 'Restaurant';
  else if (finalCategoria === 'sitio-turistico') schemaType = 'TouristAttraction';

  // Crear pautante para pautantes.json
  const pautanteForPautantesJson = {
    id: finalId,
    nombre: finalNombre,
    categoria: finalCategoria,
    tipo: finalTipo,
    municipio: finalMunicipio,
    desc: finalDesc,
    direccion: finalDireccion,
    email: finalEmail,
    web_oficial: finalWebOficial,
    servicios: finalServicios,
    experiencias: finalExperiencias,
    precio: finalPrecio,
    telefono: finalTelefono,
    whatsapp: finalWhatsapp,
    maps: finalMaps,
    imagen: finalImagen,
    logo: finalLogo,
    multimedia: finalMultimedia,
    nivel: finalNivel,
    lat: finalLat,
    lng: finalLng,
    duracion_estimada: finalDuracionEstimada,
    horario: finalHorario,
    ideal_para: finalIdealPara,
    recomendaciones: finalRecomendaciones,
    orden_sugerido: finalOrdenSugerido,
    tags_itinerario: finalTagsItinerario
  };
  
  pautantesActualizados.push(pautanteForPautantesJson);

  // Crear negocio para master-data.json
  const negocioForMasterData = {
    id: finalId,
    nombre: finalNombre,
    slug: slug,
    categoria: finalCategoria,
    tipo: finalTipo,
    municipioId: finalMunicipio,
    descripcion: finalDesc,
    descripcionLong: finalDesc,
    direccion: finalDireccion,
    lat: finalLat,
    lng: finalLng,
    servicios: finalServicios,
    experiencias: finalExperiencias,
    precioRango: finalPrecio,
    telefono: finalTelefono,
    whatsapp: finalWhatsapp,
    email: finalEmail,
    url: finalWebOficial,
    maps: finalMaps,
    imagen: finalImagen,
    logo: finalLogo,
    multimedia: finalMultimedia,
    galeria: finalGaleria,
    nivel: finalNivel,
    palabrasClave: [
      finalNombre,
      finalTipo,
      finalCategoria,
      finalMunicipio,
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

  negociosMapeados.push(negocioForMasterData);
}

// Ordenar por orden_sugerido
pautantesActualizados.sort((a, b) => (a.orden_sugerido || 999) - (b.orden_sugerido || 999));
negociosMapeados.sort((a, b) => {
  const aOrd = pautantesActualizados.find(p => p.id === a.id)?.orden_sugerido || 999;
  const bOrd = pautantesActualizados.find(p => p.id === b.id)?.orden_sugerido || 999;
  return aOrd - bOrd;
});

// Guardar pautantes.json y master-data.json
fs.writeFileSync(PAUTANTES_PATH, JSON.stringify(pautantesActualizados, null, 2));
masterData.negocios = negociosMapeados;
fs.writeFileSync(MASTER_DATA_PATH, JSON.stringify(masterData, null, 2));

console.log('✅ Migración completada!');
console.log(`📋 pautantes.json actualizado con ${pautantesActualizados.length} pautantes`);
console.log(`📋 master-data.json actualizado con ${negociosMapeados.length} negocios`);
