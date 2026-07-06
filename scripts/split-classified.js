const fs = require('fs');
const path = require('path');

const input = path.join(__dirname, '..', 'data', 'informacion_verificada_clasificada.json');
const outDir = path.join(__dirname, '..', 'data', 'classified');

if (!fs.existsSync(input)) {
  console.error('Input file not found:', input);
  process.exit(1);
}

const raw = fs.readFileSync(input, 'utf8');
let obj;
try{
  obj = JSON.parse(raw);
}catch(e){
  console.error('Error parsing JSON:', e.message);
  process.exit(1);
}

if(!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const index = {};
for(const key of Object.keys(obj)){
  const items = obj[key] || [];
  const fname = path.join(outDir, `${key}.json`);
  fs.writeFileSync(fname, JSON.stringify(items, null, 2), 'utf8');
  index[key] = { count: items.length, file: `data/classified/${key}.json` };
  console.log('Wrote', fname, '(', items.length, 'items )');
}

// write index
fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(index, null, 2), 'utf8');
console.log('Wrote index.json');
