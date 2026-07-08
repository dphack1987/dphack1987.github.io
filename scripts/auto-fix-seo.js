const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const publicDir = path.join(__dirname, '../');
const backupDir = path.join(__dirname, '../backups/auto-fix-seo-' + Date.now());
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

const skipDirs = new Set(['node_modules', '.git', 'assets', 'data', 'proposed_patches', 'backups']);

function findHTML(dir, out) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (skipDirs.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findHTML(fullPath, out);
    } else if (entry.name.endsWith('.html')) {
      out.push(fullPath);
    }
  }
}

const files = [];
findHTML(publicDir, files);
console.log('Found', files.length, 'HTML files');

let modified = 0;
const modifiedFiles = [];

files.forEach(filePath => {
  const rel = path.relative(publicDir, filePath);
  const html = fs.readFileSync(filePath, 'utf8');
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  let changed = false;

  const titleEl = doc.querySelector('title');
  const title = titleEl ? titleEl.textContent.trim() : '';
  const h1 = doc.querySelector('h1') ? doc.querySelector('h1').textContent.trim() : '';

  // Meta description
  let metaDesc = doc.querySelector('meta[name="description"]');
  const descContent = metaDesc ? (metaDesc.getAttribute('content') || '').trim() : '';
  if (!metaDesc || descContent.length < 50) {
    const generated = (title || h1 ? `${title || h1} — ` : '') + (doc.querySelector('p') ? doc.querySelector('p').textContent.trim().slice(0, 120) : 'Guía turística, rutas, alojamientos y servicios en el Quindío.');
    const finalDesc = generated.slice(0, 150).replace(/\s+$/,'');
    if (!metaDesc) {
      metaDesc = doc.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      metaDesc.setAttribute('content', finalDesc);
      doc.head.appendChild(metaDesc);
    } else {
      metaDesc.setAttribute('content', finalDesc);
    }
    changed = true;
  }

  // Canonical
  let canonical = doc.querySelector('link[rel="canonical"]');
  if (!canonical) {
    const link = doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    const relUrl = rel.replace(/\\\\/g, '/');
    const url = relUrl === 'index.html' ? 'https://www.mapaturisticodelquindio.com/' : `https://www.mapaturisticodelquindio.com/${relUrl}`;
    link.setAttribute('href', url);
    doc.head.appendChild(link);
    changed = true;
  }

  // JSON-LD
  let schema = doc.querySelector('script[type="application/ld+json"]');
  if (!schema) {
    const json = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title || h1 || path.basename(filePath),
      url: (rel === 'index.html') ? 'https://www.mapaturisticodelquindio.com/' : `https://www.mapaturisticodelquindio.com/${rel.replace(/\\\\/g, '/')}`,
      description: (doc.querySelector('meta[name="description"]') || { getAttribute: () => '' }).getAttribute('content') || ''
    };
    const s = doc.createElement('script');
    s.setAttribute('type', 'application/ld+json');
    s.textContent = JSON.stringify(json, null, 2);
    doc.head.appendChild(s);
    changed = true;
  }

  if (changed) {
    // backup
    const destBackup = path.join(backupDir, rel);
    const destDir = path.dirname(destBackup);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(filePath, destBackup);

    fs.writeFileSync(filePath, dom.serialize(), 'utf8');
    modified++;
    modifiedFiles.push(rel);
    console.log('Patched:', rel);
  }
});

console.log('\nDone. Modified files:', modified);
if (modified > 0) console.log('Files:', modifiedFiles.join('\n'));
console.log('Backups saved to', backupDir);
