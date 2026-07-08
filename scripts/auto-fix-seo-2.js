const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const publicDir = path.join(__dirname, '../');
const backupDir = path.join(__dirname, '../backups/auto-fix-seo-2-' + Date.now());
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
  const rel = path.relative(publicDir, filePath).replace(/\\\\/g, '/');
  let html = fs.readFileSync(filePath, 'utf8');
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  let changed = false;

  // Title: truncate to 60 chars preserving important suffix
  const titleEl = doc.querySelector('title');
  if (titleEl) {
    const t = titleEl.textContent.trim();
    if (t.length > 60) {
      const allowed = 60;
      // Try to preserve after last pipe or dash
      let newTitle = t;
      const parts = t.split('|');
      if (parts.length > 1) {
        newTitle = parts.map(p=>p.trim()).slice(0, parts.length).join(' | ');
        if (newTitle.length > allowed) newTitle = t.slice(0, allowed - 3) + '...';
      } else if (t.includes('—')) {
        newTitle = t.split('—').map(s=>s.trim()).slice(0,2).join(' — ');
        if (newTitle.length > allowed) newTitle = t.slice(0, allowed - 3) + '...';
      } else {
        newTitle = t.slice(0, allowed - 3) + '...';
      }
      titleEl.textContent = newTitle;
      changed = true;
    }
  }

  // Meta description: trim to 150 chars if >160
  const metaDesc = doc.querySelector('meta[name="description"]');
  if (metaDesc) {
    const c = (metaDesc.getAttribute('content') || '').trim();
    if (c.length > 160) {
      const newC = c.slice(0,150).trim();
      metaDesc.setAttribute('content', newC);
      changed = true;
    }
  }

  // Ensure JSON-LD exists (if not, reuse minimal)
  let schema = doc.querySelector('script[type="application/ld+json"]');
  if (!schema) {
    const title = (doc.querySelector('title')||{}).textContent || '';
    const h1 = doc.querySelector('h1') ? doc.querySelector('h1').textContent.trim() : '';
    const desc = (doc.querySelector('meta[name="description"]')||{}).getAttribute && doc.querySelector('meta[name="description"]').getAttribute('content') || '';
    const json = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title || h1 || path.basename(filePath),
      url: `https://www.mapaturisticodelquindio.com/${rel}`,
      description: desc
    };
    const s = doc.createElement('script');
    s.setAttribute('type', 'application/ld+json');
    s.textContent = JSON.stringify(json, null, 2);
    doc.head.appendChild(s);
    changed = true;
  }

  if (changed) {
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
