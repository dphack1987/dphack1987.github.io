const fs = require('fs');
const path = require('path');

const root = process.cwd();
const indexFile = path.join(root, 'data', 'pautas_images_index.json');
const pautantesFile = path.join(root, 'data', 'pautantes.json');
const outFile = path.join(root, 'data', 'pautas_images_index_enhanced.json');

function normalize(s) {
  return s.toString().toLowerCase()
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

function levenshtein(a, b) {
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
}

function main() {
  if (!fs.existsSync(indexFile) || !fs.existsSync(pautantesFile)) {
    console.error('Faltan archivos: asegúrate de tener', indexFile, pautantesFile);
    process.exit(1);
  }
  const index = JSON.parse(fs.readFileSync(indexFile, 'utf8'));
  const pautantes = JSON.parse(fs.readFileSync(pautantesFile, 'utf8'));

  let matchedBefore = index.filter(i => i.matched).length;
  let newlyMatched = 0;

  for (const it of index) {
    if (it.matched) continue;
    const filename = it.filename;
    const base = filename.replace(/\.[^.]+$/, '');
    const normBase = normalize(base);
    let best = null;
    let bestScore = 1.0; // lower is better (distance ratio)

    for (const p of pautantes) {
      const candidates = [];
      if (p.imagen) candidates.push(path.basename(p.imagen.toString()).replace(/\.[^.]+$/, ''));
      if (p.id) candidates.push(p.id);
      if (p.nombre) candidates.push(p.nombre);
      const uniq = Array.from(new Set(candidates.filter(Boolean)));
      for (const c of uniq) {
        const normC = normalize(c);
        if (!normC) continue;
        // substring matches give top priority
        if (normC === normBase || normBase.includes(normC) || normC.includes(normBase)) {
          best = p; bestScore = 0; break;
        }
        // token intersection
        const tokensA = new Set(normBase.split('_'));
        const tokensB = new Set(normC.split('_'));
        const intersection = [...tokensA].filter(x => tokensB.has(x));
        if (intersection.length >= 1) {
          const score = 0.2; // good
          if (score < bestScore) { best = p; bestScore = score; }
        }
        // levenshtein ratio
        const dist = levenshtein(normBase, normC);
        const ratio = dist / Math.max(normBase.length, normC.length);
        if (ratio < bestScore && ratio <= 0.4) {
          best = p; bestScore = ratio;
        }
      }
      if (bestScore === 0) break;
    }

    if (best) {
      it.matched = true;
      it.pautante = {
        id: best.id || null,
        nombre: best.nombre || null,
        telefono: best.telefono || null,
        whatsapp: best.whatsapp || null,
        maps: best.maps || null,
        imagen_field: best.imagen || null
      };
      newlyMatched++;
    }
  }

  fs.writeFileSync(outFile, JSON.stringify(index, null, 2), 'utf8');
  const matchedAfter = index.filter(i => i.matched).length;
  console.log('Total imágenes:', index.length);
  console.log('Matched antes:', matchedBefore);
  console.log('Nuevos matches:', newlyMatched);
  console.log('Matched después:', matchedAfter);
  console.log('Archivo generado:', outFile);
}

main();
