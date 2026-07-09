Operaciones y scripts útiles

1) Generar sitemap y validar SEO (local)

  npm run generate-sitemap
  npm run validate-seo

2) Ejecutar Lighthouse (local o URL pública)

  Recomendado instalar Chrome y ejecutar:

  npx lighthouse https://www.mapaturisticodelquindio.com --output html --output-path ./reports/lighthouse.html --view

  Para ejecutar contra servidor local (ej. si sirves con `npx http-server`):

  npx http-server -p 8080
  npx lighthouse http://localhost:8080/index.html --output html --output-path ./reports/lighthouse-local.html --view

3) Optimizar imágenes (crea `assets/images-optimized`)

  Requiere instalar la dependencia `sharp`:

  npm install --save-dev sharp
  node ./scripts/optimize-images.js

4) CI (GitHub Actions)

  El workflow `/.github/workflows/seo-sitemap.yml` ejecuta `npm run generate-sitemap` y `npm run validate-seo` en `push` y `pull_request` sobre `main`.

5) Rollback

  Los backups generados por los scripts automáticos están en `backups/auto-fix-seo-*` y `backups/auto-fix-seo-2-*`.
