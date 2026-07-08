const https = require('https');
const BASE_URL = 'https://www.mapaturisticodelquindio.com';
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;

const pingGoogleSearchConsole = () => {
  console.log(`📡 Pinging Google Search Console with sitemap: ${SITEMAP_URL}`);
  
  const options = {
    hostname: 'www.google.com',
    path: `/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    method: 'GET'
  };

  const req = https.request(options, (res) => {
    if (res.statusCode === 200) {
      console.log('✅ Google Search Console ping successful!');
    } else {
      console.error(`❌ Google Search Console ping failed with status ${res.statusCode}`);
    }
  });

  req.on('error', (e) => {
    console.error('❌ Error pinging Google Search Console:', e);
  });

  req.end();
};

pingGoogleSearchConsole();
