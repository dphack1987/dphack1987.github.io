const fs = require('fs');
const path = require('path');

const GTM_ID = 'GTM-K26DGM6J';

const GTM_HEAD = `  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${GTM_ID}');</script>
  <!-- End Google Tag Manager -->
`;

const GTM_BODY = `  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
`;

const filesToUpdate = [
  'index.html',
  'alojamientos.html',
  'sitios-turisticos.html',
  'alquiler-finca-hoteles.html',
  'hoteles.html',
  'agencias-operadoras-turisticas.html',
  'parque-del-cafe.html',
  'parque-los-arrieros.html',
  'municipios-del-quindio.html',
  'mapa-del-quindio.html',
  'mapa-circasia.html',
  'mapa-de-circasia-2025.html',
  'contacto.html',
  'anunciate.html',
  'centros-comerciales.html',
  'quindio-comercial.html',
  'empresas-de-transporte.html',
  'cabalgatas-el-carmelo.html',
  'empresas-de-transporte.html',
];

filesToUpdate.forEach(filename => {
  const filePath = path.join(__dirname, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ File not found: ${filename}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if GTM is already present to avoid duplicates
  if (content.includes('Google Tag Manager')) {
    console.log(`✅ GTM already present in: ${filename}`);
    return;
  }
  
  // Add GTM to <head> right after <head> tag
  content = content.replace(/<head>\s*/gi, `<head>\n${GTM_HEAD}`);
  
  // Add GTM noscript to <body> right after <body> tag
  content = content.replace(/<body>\s*/gi, `<body>\n${GTM_BODY}`);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Updated GTM in: ${filename}`);
});

console.log('\n🎉 Done!');
