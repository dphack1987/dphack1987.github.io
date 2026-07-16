const fs = require("fs");
const path = require("path");
const root = ".";

function audit(file) {
    const content = fs.readFileSync(file, "utf8");
    const links = content.match(/href="([^"]*)"/g) || [];
    links.forEach(link => {
        const url = link.replace("href=", "").replace(/"/g, "");
        if (url.startsWith("http") || url.startsWith("#") || url.startsWith("mailto") || url.includes("${")) return;
        if (!fs.existsSync(path.join(root, url.split("#")[0]))) {
            console.warn(`[ENLACE ROTO en ${file}]: ${url}`);
        }
    });
}
const files = fs.readdirSync(root).filter(f => f.endsWith(".html"));
files.forEach(audit);
