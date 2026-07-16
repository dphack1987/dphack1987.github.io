const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const rootDir = path.resolve(__dirname, '..');
const scanDirs = [path.join(rootDir, 'assets/images'), path.join(rootDir, 'logo_mapa')];
const extensions = new Set(['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff']);
const htmlExtensions = new Set(['.html', '.htm']);

function walk(dirPath, results = []) {
  if (!fs.existsSync(dirPath)) return results;

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (['.git', 'node_modules', 'backups'].includes(entry.name)) continue;
      walk(fullPath, results);
    } else if (entry.isFile()) {
      results.push(fullPath);
    }
  }

  return results;
}

function ensureRelativePath(targetFile, referenceFile) {
  const rel = path.relative(path.dirname(referenceFile), targetFile).replace(/\\/g, '/');
  return rel.startsWith('.') ? rel : `./${rel}`;
}

async function convertToWebp(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!extensions.has(ext)) return false;

  const outputPath = filePath.replace(new RegExp(`${ext}$`), '.webp');
  if (fs.existsSync(outputPath)) {
    const srcStat = fs.statSync(filePath);
    const outStat = fs.statSync(outputPath);
    if (outStat.mtimeMs >= srcStat.mtimeMs) {
      return false;
    }
  }

  await sharp(filePath)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 78, effort: 4 })
    .toFile(outputPath);

  return true;
}

async function rewriteHtmlReferences(filePath) {
  if (!htmlExtensions.has(path.extname(filePath).toLowerCase())) return 0;

  const original = fs.readFileSync(filePath, 'utf8');
  let updated = original;
  let replacements = 0;

  updated = updated.replace(/(src|href)=(["'])([^"']+)(\2)/g, (match, attr, quote, value) => {
    if (!value || /^(https?:|mailto:|tel:|data:|#)/i.test(value)) return match;

    const normalized = value.replace(/\\/g, '/');
    const resolvedPath = normalized.startsWith('/')
      ? path.resolve(rootDir, normalized.slice(1))
      : path.resolve(path.dirname(filePath), normalized);

    const ext = path.extname(resolvedPath).toLowerCase();
    if (!extensions.has(ext)) return match;

    const webpPath = resolvedPath.replace(new RegExp(`${ext}$`), '.webp');
    if (!fs.existsSync(webpPath)) return match;

    replacements += 1;
    return `${attr}=${quote}${ensureRelativePath(webpPath, filePath)}${quote}`;
  });

  if (replacements > 0) {
    fs.writeFileSync(filePath, updated, 'utf8');
  }

  return replacements;
}

(async () => {
  let converted = 0;
  let rewritten = 0;

  for (const dir of scanDirs) {
    const files = walk(dir);
    for (const file of files) {
      if (await convertToWebp(file)) converted += 1;
    }
  }

  const htmlFiles = walk(rootDir).filter(file => htmlExtensions.has(path.extname(file).toLowerCase()));
  for (const file of htmlFiles) {
    rewritten += await rewriteHtmlReferences(file);
  }

  console.log(`✅ Imágenes WebP generadas: ${converted}`);
  console.log(`✅ Referencias HTML actualizadas: ${rewritten}`);
})().catch(err => {
  console.error('❌ Error al optimizar imágenes:', err);
  process.exit(1);
});
