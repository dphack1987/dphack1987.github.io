
const fs = require('fs');
const path = require('path');

const pautantesPath = path.join(__dirname, '../data/pautantes.json');
const datosPath = path.join(__dirname, '../assets/js/datos.js');
const publicDir = path.join(__dirname, '../');

console.log('🔍 Analizando proyecto...\n');

// 1. Leer datos de pautantes
const rawPautantes = JSON.parse(fs.readFileSync(pautantesPath, 'utf8'));
console.log(`✅ Cargados ${rawPautantes.length} negocios desde pautantes.json`);

// 2. Verificar rutas de imágenes
console.log('\n🔍 Verificando rutas de imágenes...');
let brokenImages = [];
rawPautantes.forEach((negocio, index) => {
  if (negocio.imagen) {
    const imagePath = path.join(publicDir, negocio.imagen.replace(/^\.\//, ''));
    if (!fs.existsSync(imagePath)) {
      brokenImages.push({
        index,
        negocio: negocio.nombre,
        imagen: negocio.imagen,
        ruta: imagePath
      });
    }
  }
});

if (brokenImages.length > 0) {
  console.error(`❌ Encontradas ${brokenImages.length} rutas de imágenes rotas:`);
  brokenImages.forEach(err => {
    console.error(`  - ${err.negocio} (index ${err.index}): ${err.imagen}`);
  });
} else {
  console.log('✅ Todas las rutas de imágenes son válidas');
}

// 3. Verificar carpeta pautantes.json vs datos.js
console.log('\n🔍 Verificando sincronización de datos...');
// Leer datos.js
if (fs.existsSync(datosPath)) {
  console.log('✅ assets/js/datos.js existe');
} else {
  console.error('❌ assets/js/datos.js NO existe');
}
