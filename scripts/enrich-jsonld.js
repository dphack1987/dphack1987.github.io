const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const masterPath = path.join(__dirname, '../data/master-data.json');
const backupDir = path.join(__dirname, '../backups/enrich-jsonld-' + Date.now());
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

if (!fs.existsSync(masterPath)) {
  console.error('master-data.json not found');
  process.exit(1);
}

const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
if (!master.negocios || !Array.isArray(master.negocios)) {
  console.error('No negocios in master-data.json');
  process.exit(1);
}

const negocios = master.negocios.slice(0, 20); // primeros 20
const publicDir = path.join(__dirname, '../');
let modified = 0;

negocios.forEach(n => {
  const slug = n.slug;
  const filePath = path.join(publicDir, 'negocios', `${slug}.html`);
  if (!fs.existsSync(filePath)) return;
  const rel = path.relative(publicDir, filePath);
  const html = fs.readFileSync(filePath, 'utf8');
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // Build LocalBusiness schema using available fields
  const schema = {
    '@context': 'https://schema.org',
    '@type': n.schema && n.schema['@type'] ? n.schema['@type'] : 'LocalBusiness',
    name: n.nombre || n.id,
    description: n.descripcion || n.descripcionLong || '',
    url: n.url || (n.maps ? n.maps : `https://www.mapaturisticodelquindio.com/negocios/${slug}.html`),
    telephone: n.telefono || undefined,
    image: n.imagen || undefined,
    address: n.direccion && n.direccion.trim() ? { '@type': 'PostalAddress', 'streetAddress': n.direccion } : undefined,
    geo: (n.lat && n.lng) ? { '@type': 'GeoCoordinates', 'latitude': n.lat, 'longitude': n.lng } : undefined,
    priceRange: n.precioRango || (n.schema && n.schema.priceRange) || undefined,
    openingHours: (n.schema && n.schema.openingHours) || undefined,
    aggregateRating: n.rating && n.rating.valor ? { '@type': 'AggregateRating', ratingValue: n.rating.valor, reviewCount: n.rating.cantidad || 0 } : undefined,
  };

  // Remove undefined keys
  Object.keys(schema).forEach(k => schema[k] === undefined && delete schema[k]);

  // Backup
  const destBackup = path.join(backupDir, rel);
  const destDir = path.dirname(destBackup);
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(filePath, destBackup);

  // Replace or add JSON-LD
  let existing = doc.querySelector('script[type="application/ld+json"]');
  if (existing) {
    // Try to parse and merge if it's a graph
    try {
      const parsed = JSON.parse(existing.textContent);
      // If parsed is @graph or @type LocalBusiness, replace
      existing.textContent = JSON.stringify(schema, null, 2);
    } catch (e) {
      existing.textContent = JSON.stringify(schema, null, 2);
    }
  } else {
    const s = doc.createElement('script');
    s.setAttribute('type', 'application/ld+json');
    s.textContent = JSON.stringify(schema, null, 2);
    doc.head.appendChild(s);
  }

  fs.writeFileSync(filePath, dom.serialize(), 'utf8');
  modified++;
  console.log('Enriched:', slug);
});

console.log('Done. Modified:', modified);
console.log('Backups saved to', backupDir);
