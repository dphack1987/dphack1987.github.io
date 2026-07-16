const fs = require('fs');
const path = require('path');

// Cargar master-data.json
const masterData = JSON.parse(fs.readFileSync('./data/master-data.json', 'utf8'));

console.log('--- Iniciando Auditoría de Enlaces ---');

masterData.negocios.forEach(negocio => {
    const rutaArchivo = path.join(__dirname, '..', negocio.url); // Ajusta la ruta según tu estructura
    
    if (!fs.existsSync(rutaArchivo)) {
        console.error(`[ERROR 404]: No se encontró el archivo: ${negocio.url}`);
    }
});

console.log('--- Auditoría finalizada ---');