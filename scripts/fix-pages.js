
const fs = require('fs');
const path = require('path');

// Obtener todas las páginas HTML excepto las de municipios y negocios generadas
const rootHtmlFiles = [
  'index.html',
  'mapa-de-calarca-2026.html',
  'mapa-de-circasia-2025.html',
  'mapa-del-quindio.html',
  'quindio-comercial.html',
  'alquiler-finca-hoteles.html',
  'alojamientos.html',
  'sitios-turisticos.html',
  'pauta.html',
  'transporte-aeropuerto-armenia.html',
  'finca-para-alquilar-quindio.html',
  'hospedaje-armenia.html',
  'reservar-hotel-quindio.html',
  'top-pueblos.html',
  'agencias-operadoras-turisticas.html',
  'empresas-de-transporte.html',
  'anunciate.html',
  'municipios-del-quindio.html'
];

console.log("🔧 Fixing pages to include nav.js...\n");

rootHtmlFiles.forEach(filename => {
  const filePath = path.join(__dirname, '..', filename);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Agregar <script src="./assets/js/nav.js"></script> right after <body> if not already there
    if (!content.includes('assets/js/nav.js')) {
      // Agregar nav.js después de la etiqueta <body>
      content = content.replace(/<body>/i, '<body>\n  <script src="./assets/js/nav.js"></script>');
      
      // Para archivos en subdirectorios, ajustar la ruta relativa (ej: ./ → ../)
      if (filename.includes('/')) {
        content = content.replace(/src="\.\//g, 'src="../');
      }

      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed ${filename}`);
    } else {
      console.log(`ℹ️ ${filename} already has nav.js`);
    }
  }
});

console.log("\n✅ All pages fixed!");
