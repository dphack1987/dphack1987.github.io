const fs = require('fs');
const path = require('path');

const root = './';
const htmlFiles = fs.readdirSync(root).filter(file => file.endsWith('.html'));

console.log('--- Verificando Enlaces Internos ---');

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const links = content.match(/href="([^"]+)"/g) || [];
    
    links.forEach(link => {
        const url = link.replace('href="', '').replace('"', '');
        if (url.startsWith('http') || url.startsWith('#') || url.startsWith('mailto')) return;
        
        // Si el enlace es un archivo local y no existe
        if (!fs.existsSync(path.join(root, url))) {
            console.warn(`[ENLACE ROTO en ${file}]: ${url}`);
        }
    });
});
console.log('--- Verificación Finalizada ---');