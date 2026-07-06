const fs = require('fs');
const path = require('path');

const root = process.cwd();
const pautasDir = path.join(root, 'pautas_publicitarias');
const pautantesFile = path.join(root, 'data', 'pautantes.json');
const outFile = path.join(root, 'data', 'pautas_images_index.json');

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const ent of entries) {
    if (ent.isDirectory()) {
      const sub = path.join(dir, ent.name);
      const subfiles = fs.readdirSync(sub, { withFileTypes: true })
        .filter(e => e.isFile())
        .map(e => ({ dir: ent.name, name: e.name, full: path.join(sub, e.name) }));
      files.push(...subfiles);
    }
  }
  return files;
}

function normalizeName(s) {
  return s.toString().toLowerCase()
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

function main() {
  if (!fs.existsSync(pautantesFile)) {
    console.error('No existe', pautantesFile);
    process.exit(1);
  }
  const pautantes = JSON.parse(fs.readFileSync(pautantesFile, 'utf8'));
  const files = walkDir(pautasDir);

  const index = [];
  for (const f of files) {
    const relPath = './pautas_publicitarias/' + f.dir + '/' + f.name;
    const filename = f.name;

    // Try exact match against pautantes.imagen
    let match = pautantes.find(p => {
      if (!p.imagen) return false;
      const img = p.imagen.toString();
      // compare filename or ending of path
      return img.endsWith('/' + filename) || img.endsWith('\\' + filename) || img === relPath || img === relPath.replace(/\\/g, '/');
    });

    // fallback: match by normalized basename
    if (!match) {
      const base = filename.replace(/\.[^.]+$/, '');
      const norm = normalizeName(base);
      match = pautantes.find(p => {
        if (!p.imagen) return false;
        const imgBase = path.basename(p.imagen.toString()).replace(/\.[^.]+$/, '');
        return normalizeName(imgBase) === norm || normalizeName((p.id || '') ) === norm || normalizeName((p.nombre || '')) === norm;
      });
    }

    const item = {
      categoria: f.dir,
      file: relPath.replace(/\\/g, '/'),
      filename,
      matched: !!match,
    };
    if (match) {
      item.pautante = {
        id: match.id || null,
        nombre: match.nombre || null,
        telefono: match.telefono || null,
        whatsapp: match.whatsapp || null,
        maps: match.maps || null,
        imagen_field: match.imagen || null
      };
    }
    index.push(item);
  }

  fs.writeFileSync(outFile, JSON.stringify(index, null, 2), 'utf8');
  const matched = index.filter(i => i.matched).length;
  console.log('Generado', outFile);
  console.log('Total imágenes:', index.length, 'Matched:', matched, 'No matched:', index.length - matched);
}

main();
