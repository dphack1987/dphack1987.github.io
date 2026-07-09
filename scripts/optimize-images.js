const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(__dirname, '../assets/images');
const OUT_DIR = path.join(__dirname, '../assets/images-optimized');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function walk(dir, cb) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, cb);
    else cb(full);
  }
}

(async () => {
  const converted = [];
  walk(IMAGES_DIR, file => {
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;
    const rel = path.relative(IMAGES_DIR, file);
    const outDir = path.join(OUT_DIR, path.dirname(rel));
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const baseName = path.basename(file, ext);
    const outWebp = path.join(outDir, baseName + '.webp');
    const outAvif = path.join(outDir, baseName + '.avif');

    sharp(file)
      .resize({ width: 1600 })
      .toFile(outWebp)
      .then(() => {
        converted.push(outWebp);
        console.log('Created', outWebp);
      })
      .catch(err => console.error('Error webp', file, err));

    sharp(file)
      .resize({ width: 1600 })
      .toFormat('avif')
      .toFile(outAvif)
      .then(() => {
        converted.push(outAvif);
        console.log('Created', outAvif);
      })
      .catch(err => console.error('Error avif', file, err));
  });
})();
