const fs = require('fs');
const path = require('path');

const pautantes = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/pautantes.json'), 'utf8'));
const masterData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/master-data.json'), 'utf8'));

// Create a map of pauta id → { lat, lng }
const pautaCoords = {};
pautantes.forEach(p => {
  pautaCoords[p.id] = { lat: p.lat, lng: p.lng };
});

// Update masterData negocios
masterData.negocios.forEach(neg => {
  if (pautaCoords[neg.id]) {
    neg.lat = pautaCoords[neg.id].lat;
    neg.lng = pautaCoords[neg.id].lng;
    console.log(`Updated ${neg.id}: lat=${neg.lat}, lng=${neg.lng}`);
  }
});

// Write back to master-data.json
fs.writeFileSync(path.join(__dirname, '../data/master-data.json'), JSON.stringify(masterData, null, 2), 'utf8');
console.log('✅ master-data.json updated successfully!');
