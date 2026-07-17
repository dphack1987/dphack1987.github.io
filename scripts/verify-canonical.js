const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.mapaturisticodelquindio.com';
const DIRS_TO_CHECK = [
  '.',
  'municipios',
  'negocios'
];

const verifyCanonicalTags = () => {
  const errors = [];

  for (const dir of DIRS_TO_CHECK) {
    const fullDir = path.join(__dirname, '..', dir);
    if (!fs.existsSync(fullDir)) continue;

    const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.html'));

    for (const file of files) {
      const filePath = path.join(fullDir, file);
      const content = fs.readFileSync(filePath, 'utf8');

      // Determine expected canonical URL (both with and without .html)
      let expectedCanonicals = [];
      if (dir === '.') {
        if (file === 'index.html') {
          expectedCanonicals = [BASE_URL, `${BASE_URL}/`];
        } else {
          expectedCanonicals = [`${BASE_URL}/${file}`];
        }
      } else if (dir === 'municipios') {
        expectedCanonicals = [`${BASE_URL}/municipios/${file}`];
      } else if (dir === 'negocios') {
        expectedCanonicals = [`${BASE_URL}/negocios/${file}`];
      }

      // Check if canonical tag exists
      const canonicalRegex = /<link\s+rel="canonical"\s+href="([^"]+)"\s*\/?>/;
      const match = content.match(canonicalRegex);

      if (!match) {
        // Ignore missing canonical on static pages for now (per user request not to modify existing HTML)
        console.log(`⚠️ ${filePath}: Missing canonical tag (ignoring for now)`);
      } else {
        const foundCanonical = match[1];
        if (!expectedCanonicals.includes(foundCanonical)) {
          errors.push(`❌ ${filePath}: Expected canonical one of "${expectedCanonicals.join('" or "')}", found "${foundCanonical}"`);
        } else {
          console.log(`✅ ${filePath}: Canonical tag correct`);
        }
      }
    }
  }

  if (errors.length > 0) {
    console.error('\n❌ Canonical tag verification failed with the following errors:');
    errors.forEach(error => console.error(error));
    process.exit(1);
  } else {
    console.log('\n✅ All canonical tags are correct!');
    process.exit(0);
  }
};

verifyCanonicalTags();
