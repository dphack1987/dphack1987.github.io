const fs = require('fs');
const path = require('path');

const root = process.cwd();
const indexFile = path.join(root, 'data', 'pautas_images_index.json');
const outFile = path.join(root, 'data', 'pautas_categorized.json');

function normalizeKey(s) {
  return s.toString().trim()
    .toLowerCase()
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_\-]/g, '');
}

function main() {
  if (!fs.existsSync(indexFile)) {
    console.error('No existe', indexFile);
    process.exit(1);
  }
  const index = JSON.parse(fs.readFileSync(indexFile, 'utf8'));
  const byCat = {};

  for (const it of index) {
    const catRaw = it.categoria || 'sin_categoria';
    const key = normalizeKey(catRaw);
    if (!byCat[key]) byCat[key] = { displayName: catRaw, items: [] };

    const item = {
      filename: it.filename,
      file: it.file,
      matched: !!it.matched,
    };
    if (it.matched && it.pautante) {
      item.pautante = {
        id: it.pautante.id || null,
        nombre: it.pautante.nombre || null,
        telefono: it.pautante.telefono || null,
        whatsapp: it.pautante.whatsapp || null,
        maps: it.pautante.maps || null,
        imagen_field: it.pautante.imagen_field || null
      };
    }

    byCat[key].items.push(item);
  }

  fs.writeFileSync(outFile, JSON.stringify(byCat, null, 2), 'utf8');
  console.log('Generado', outFile);
}

main();
