import fs from 'fs';
import path from 'path';

const root = 'c:/Users/Gloria/Documents/www.mapaturisticodelquindio.com';
const pages = [
  'planes/plan-express-quindio.html',
  'planes/plan-cafe-y-paisajes.html',
  'planes/plan-fin-de-semana-quindio.html',
  'planes/plan-taxi-urbano.html',
  'planes/plan-taxi-rural.html',
  'planes/plan-taxi-experiencia.html'
];

let ok = true;

for (const p of pages) {
  const content = fs.readFileSync(path.join(root, p), 'utf8');
  if (!content.includes('id="pd-occupancy"')) {
    console.error(`${p}: missing pd-occupancy selector`);
    ok = false;
  }
  if (!content.includes('src="/scripts/plan-detail.js"')) {
    console.error(`${p}: incorrect plan-detail script src`);
    ok = false;
  }
  const imgMatch = content.match(/<img src="([^"]+)" alt="([^"]+)"/);
  if (!imgMatch) {
    console.error(`${p}: missing hero image`);
    ok = false;
  } else {
    console.log(`${p}: hero image ${imgMatch[1]}`);
  }
}

const script = fs.readFileSync(path.join(root, 'scripts/plan-detail.js'), 'utf8');
try {
  new Function(script);
  console.log('plan-detail.js syntax OK (module syntax not checked)');
} catch (e) {
  console.error('plan-detail.js syntax ERROR', e.message);
  ok = false;
}

process.exit(ok ? 0 : 1);
