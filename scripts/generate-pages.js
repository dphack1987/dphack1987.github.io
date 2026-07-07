
const fs = require('fs');
const path = require('path');

const masterData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/master-data.json'), 'utf8')
);

// Generar BreadcrumbList Schema
const generateBreadcrumbList = (type, item) =&gt; {
  const items = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://www.mapaturisticodelquindio.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Quindío",
      "item": "https://www.mapaturisticodelquindio.com/municipios-del-quindio.html"
    }
  ];
  
  if (type === 'municipio') {
    items.push({
      "@type": "ListItem",
      "position": 3,
      "name": item.nombre,
      "item": `https://www.mapaturisticodelquindio.com/municipios/${item.slug}`
    });
  } else if (type === 'negocio') {
    const municipio = masterData.municipios.find(m =&gt; m.id === item.municipioId) || masterData.municipios[0];
    items.push({
      "@type": "ListItem",
      "position": 3,
      "name": municipio.nombre,
      "item": `https://www.mapaturisticodelquindio.com/municipios/${municipio.slug}`
    });
    items.push({
      "@type": "ListItem",
      "position": 4,
      "name": item.nombre,
      "item": `https://www.mapaturisticodelquindio.com/negocios/${item.slug}`
    });
  }
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items
  };
};

// Generar Schema para Negocio (incluye Offer/Event si aplica)
const generateNegocioSchema = (negocio, municipio) =&gt; {
  const baseSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": negocio.schema['@type'] || 'LocalBusiness',
        "name": negocio.nombre,
        "description": negocio.descripcionLong,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": negocio.direccion,
          "addressLocality": municipio.nombre,
          "addressRegion": "Quindío",
          "addressCountry": "CO"
        },
        "telephone": negocio.telefono,
        "url": negocio.url,
        "image": negocio.imagen,
        "priceRange": negocio.schema.priceRange || "$$",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": negocio.lat,
          "longitude": negocio.lng
        },
        "author": {
          "@type": "Organization",
          "name": negocio.author.name,
          "url": negocio.author.url
        },
        "aggregateRating": negocio.rating ? {
          "@type": "AggregateRating",
          "ratingValue": negocio.rating.valor,
          "reviewCount": negocio.rating.cantidad
        } : undefined
      },
      generateBreadcrumbList('negocio', negocio)
    ]
  };
  
  // Añadir Offer si tiene promociones (ej: descuentos, paquetes)
  if (negocio.precioRango &amp;&amp; negocio.precioRango !== 'Consultar') {
    baseSchema['@graph'].push({
      "@type": "Offer",
      "name": `Reserva en ${negocio.nombre}`,
      "description": negocio.descripcion,
      "priceCurrency": "COP",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": negocio.nombre
      }
    });
  }
  
  // Añadir Event si es un atractivo turístico con experiencias
  if (negocio.categoria === 'sitio-turistico') {
    baseSchema['@graph'].push({
      "@type": "Event",
      "name": `Visita a ${negocio.nombre}`,
      "description": negocio.descripcionLong,
      "location": {
        "@type": "Place",
        "name": negocio.nombre,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": municipio.nombre,
          "addressRegion": "Quindío",
          "addressCountry": "CO"
        }
      },
      "startDate": new Date().toISOString().split('T')[0],
      "endDate": "2026-12-31"
    });
  }
  
  return baseSchema;
};

// Consejos de Local pregenerados (simula IA)
const CONSEJOS_LOCAL = {
  armenia: "Consejo de Local: ¡Armenia tiene el clima perfecto! Lleva ropa ligera pero un suéter para las noches. No te pierdas el Parque de la Vida y el Mercado de Artesanías.",
  circasia: "Consejo de Local: Circasia es el pueblo más bonito del mundo. Visita el Parque Principal temprano para fotos sin gente y prueba el café en las tiendas cercanas.",
  salento: "Consejo de Local: Para el Valle del Cocora, lleva botas de agua (si ha llovido), protector solar y suficiente agua. El sendero de los Aposentos es imprescindible.",
  montenegro: "Consejo de Local: El Parque Nacional del Café es mejor visitarlo entre semana para evitar multitudes. Llega temprano para disfrutar todas las atracciones.",
  filandia: "Consejo de Local: Filandia es romance en estado puro. El Mirador Encanto tiene la mejor vista, y las panaderías del centro hacen pan fresco todas las tardes.",
  calarca: "Consejo de Local: Calarcá es la capital mundial del café. Haz un tour de café en una finca cercana y prueba el café tinto con pan de queso.",
  "la-tebaida": "Consejo de Local: La Tebaida es perfecta para descansar. Disfruta la tranquilidad y la comida típica en los restaurantes del centro.",
  ginebra: "Consejo de Local: Ginebra es pequeño pero acogedor. Pregunta por las fincas cafeteras cercanas, muchas ofrecen tours sin cita previa."
};

const TEMPLATES = {
  municipio: (municipio) =&gt; `
&lt;!DOCTYPE html&gt;
&lt;html lang="es"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;${municipio.nombre} - Qué Ver y Hacer | Mapa Turístico del Quindío 2026&lt;/title&gt;
  &lt;meta name="description" content="Descubre ${municipio.nombre}: atractivos turísticos, alojamientos, restaurantes y más. Guía completa del Quindío sin intermediarios."&gt;
  &lt;meta name="keywords" content="${municipio.palabrasClave.join(', ')}"&gt;
  &lt;link rel="canonical" href="https://www.mapaturisticodelquindio.com/municipios/${municipio.slug}"&gt;
  &lt;meta name="theme-color" content="#059669"&gt;
  &lt;link rel="stylesheet" href="../assets/css/main.css"&gt;
  &lt;script src="https://cdnjs.cloudflare.com/ajax/libs/quicklink/2.3.0/quicklink.umd.js"&gt;&lt;/script&gt;
  &lt;script type="application/ld+json"&gt;
  ${JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": municipio.schema['@type'] || 'City',
        "name": municipio.nombre,
        "description": municipio.descripcion,
        "location": {
          "@type": "Place",
          "name": "Quindío, Colombia"
        },
        "url": `https://www.mapaturisticodelquindio.com/municipios/${municipio.slug}`,
        "author": {
          "@type": "Organization",
          "name": municipio.author.name,
          "url": municipio.author.url
        },
        "sameAs": municipio.schema.sameAs || ''
      },
      generateBreadcrumbList('municipio', municipio)
    ]
  }, null, 2)}
  &lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;script src="../assets/js/nav.js"&gt;&lt;/script&gt;
  &lt;section class="hero"&gt;
    &lt;div class="hero-bg" style="background-image:url('${municipio.banner}')"&gt;&lt;/div&gt;
    &lt;div class="hero-inner"&gt;
      &lt;h1&gt;${municipio.emoji} ${municipio.nombre} - Quindío&lt;/h1&gt;
      &lt;p class="hero-desc"&gt;${municipio.descripcionLong}&lt;/p&gt;
    &lt;/div&gt;
  &lt;/section&gt;

  &lt;!-- Guía de Experto --&gt;
  &lt;section style="padding: 64px 24px; background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);"&gt;
    &lt;div style="max-width: 900px; margin: 0 auto;"&gt;
      &lt;div style="background: white; border-radius: 24px; padding: 40px; box-shadow: 0 10px 40px rgba(16, 185, 129, 0.15);"&gt;
        &lt;div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;"&gt;
          &lt;span style="font-size: 40px;"&gt;👨‍🌾&lt;/span&gt;
          &lt;div&gt;
            &lt;h2 style="color: #064e3b; font-size: 24px; font-weight: 800; margin: 0;"&gt;Guía de Experto&lt;/h2&gt;
            &lt;p style="color: #6b7280; margin: 0; font-size: 14px;"&gt;Consejo directo de un local&lt;/p&gt;
          &lt;/div&gt;
        &lt;/div&gt;
        &lt;p style="color: #374151; font-size: 18px; line-height: 1.8; margin: 0;"&gt;
          ${CONSEJOS_LOCAL[municipio.id] || `Consejo de Local: ¡Disfruta ${municipio.nombre}! Lleva protector solar, agua y tu cámara. Las mejores fotos son al amanecer.`}
        &lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/section&gt;

  &lt;!-- Motor de Ruta Inteligente --&gt;
  &lt;section style="padding: 64px 24px;"&gt;
    &lt;div style="max-width: 1000px; margin: 0 auto;"&gt;
      &lt;div style="text-align: center; margin-bottom: 40px;"&gt;
        &lt;h2 style="color: #064e3b; font-size: 32px; font-weight: 800; margin-bottom: 12px;"&gt;🤖 Crea tu Itinerario Ideal&lt;/h2&gt;
        &lt;p style="color: #6b7280; font-size: 18px;"&gt;Selecciona tus preferencias y generamos la ruta perfecta para ti&lt;/p&gt;
      &lt;/div&gt;
      &lt;div style="background: white; border-radius: 24px; padding: 40px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);"&gt;
        &lt;div id="preferencias-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;"&gt;
          &lt;button class="filtro-btn" data-filter="cafe" style="padding: 16px 24px; border: 2px solid #059669; border-radius: 16px; background: white; color: #059669; font-weight: 700; cursor: pointer; transition: all 0.3s;"&gt;☕ Café&lt;/button&gt;
          &lt;button class="filtro-btn" data-filter="aventura" style="padding: 16px 24px; border: 2px solid #059669; border-radius: 16px; background: white; color: #059669; font-weight: 700; cursor: pointer; transition: all 0.3s;"&gt;🧗 Aventura&lt;/button&gt;
          &lt;button class="filtro-btn" data-filter="mascotas" style="padding: 16px 24px; border: 2px solid #059669; border-radius: 16px; background: white; color: #059669; font-weight: 700; cursor: pointer; transition: all 0.3s;"&gt;🐶 Mascotas&lt;/button&gt;
          &lt;button class="filtro-btn" data-filter="gastronomia" style="padding: 16px 24px; border: 2px solid #059669; border-radius: 16px; background: white; color: #059669; font-weight: 700; cursor: pointer; transition: all 0.3s;"&gt;🍴 Gastronomía&lt;/button&gt;
          &lt;button class="filtro-btn" data-filter="relax" style="padding: 16px 24px; border: 2px solid #059669; border-radius: 16px; background: white; color: #059669; font-weight: 700; cursor: pointer; transition: all 0.3s;"&gt;🧘 Relax&lt;/button&gt;
          &lt;button class="filtro-btn" data-filter="familia" style="padding: 16px 24px; border: 2px solid #059669; border-radius: 16px; background: white; color: #059669; font-weight: 700; cursor: pointer; transition: all 0.3s;"&gt;👨‍👩‍👧‍👦 Familia&lt;/button&gt;
        &lt;/div&gt;
        &lt;button id="generar-ruta-btn" style="width: 100%; padding: 16px; background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; font-size: 18px; font-weight: 800; border: none; border-radius: 16px; cursor: pointer; transition: transform 0.3s;"&gt;✨ Generar Mi Itinerario Ideal&lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/section&gt;

  &lt;footer class="footer"&gt;
    &lt;img src="../assets/images/logo_mapa/logo.png" alt="Mapa Turístico del Quindío" class="footer-logo"&gt;
    &lt;p&gt;© 2026 www.mapaturisticodelquindio.com — Hecho con ❤️ en el Quindío&lt;/p&gt;
  &lt;/footer&gt;
  &lt;script src="../assets/js/app.js"&gt;&lt;/script&gt;
  &lt;script&gt;
    // Inicializar quicklink
    window.addEventListener('load', () =&gt; {
      quicklink.listen();
    });

    // Motor de Ruta Inteligente
    const filtrosSeleccionados = new Set();
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    
    filtroBtns.forEach(btn =&gt; {
      btn.addEventListener('click', () =&gt; {
        const filter = btn.dataset.filter;
        if (filtrosSeleccionados.has(filter)) {
          filtrosSeleccionados.delete(filter);
          btn.style.background = 'white';
          btn.style.color = '#059669';
        } else {
          filtrosSeleccionados.add(filter);
          btn.style.background = '#059669';
          btn.style.color = 'white';
        }
      });
    });
    
    document.getElementById('generar-ruta-btn').addEventListener('click', () =&gt; {
      const filters = Array.from(filtrosSeleccionados).join(',');
      if (filters) {
        window.location.href = `../?filter=${filters}#mapa`;
      } else {
        alert('Por favor selecciona al menos una preferencia');
      }
    });
  &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
  `,
  negocio: (negocio) =&gt; {
    const municipio = masterData.municipios.find(m =&gt; m.id === negocio.municipioId) || masterData.municipios[0];
    return `
&lt;!DOCTYPE html&gt;
&lt;html lang="es"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;${negocio.nombre} - ${municipio.nombre} | Mapa Turístico del Quindío&lt;/title&gt;
  &lt;meta name="description" content="${negocio.descripcionLong}"&gt;
  &lt;meta name="keywords" content="${negocio.palabrasClave.join(', ')}"&gt;
  &lt;link rel="canonical" href="https://www.mapaturisticodelquindio.com/negocios/${negocio.slug}"&gt;
  &lt;link rel="stylesheet" href="../assets/css/main.css"&gt;
  &lt;script src="https://cdnjs.cloudflare.com/ajax/libs/quicklink/2.3.0/quicklink.umd.js"&gt;&lt;/script&gt;
  &lt;script type="application/ld+json"&gt;
  ${JSON.stringify(generateNegocioSchema(negocio, municipio), null, 2)}
  &lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;script src="../assets/js/nav.js"&gt;&lt;/script&gt;
  &lt;div class="container" style="max-width: 1000px; margin: 0 auto; padding: 24px;"&gt;
    &lt;h1 style="color: #064e3b; font-size: 36px; font-weight: 800; margin-bottom: 24px;"&gt;${negocio.nombre}&lt;/h1&gt;
    &lt;div style="padding:32px;background:white;border-radius:24px;box-shadow:0 8px 32px rgba(16,185,129,0.12);"&gt;
      &lt;img src="${negocio.imagen}" alt="${negocio.nombre}" style="width:100%;border-radius:16px; margin-bottom: 24px;" loading="lazy"&gt;
      &lt;p style="margin-top:16px;color:#374151; font-size: 18px; line-height: 1.8;"&gt;${negocio.descripcionLong}&lt;/p&gt;
      ${negocio.servicios &amp;&amp; negocio.servicios.length &gt; 0 ? `
        &lt;div style="margin-top: 24px;"&gt;
          &lt;h3 style="color: #064e3b; font-weight: 700; margin-bottom: 12px;"&gt;🛠️ Servicios&lt;/h3&gt;
          &lt;div style="display: flex; flex-wrap: wrap; gap: 8px;"&gt;
            ${negocio.servicios.map(s =&gt; `&lt;span style="background: #dcfce7; color: #064e3b; padding: 6px 12px; border-radius: 20px; font-size: 14px; font-weight: 600;"&gt;${s}&lt;/span&gt;`).join('')}
          &lt;/div&gt;
        &lt;/div&gt;
      ` : ''}
      ${negocio.whatsapp ? `
        &lt;a href="https://wa.me/${negocio.whatsapp}" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 8px; margin-top: 24px; padding: 14px 32px; background: #25D366; color: white; font-weight: 800; text-decoration: none; border-radius: 50px; transition: transform 0.3s;"&gt;💬 Contactar por WhatsApp&lt;/a&gt;
      ` : ''}
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;footer class="footer"&gt;
    &lt;img src="../assets/images/logo_mapa/logo.png" alt="Mapa Turístico del Quindío" class="footer-logo"&gt;
    &lt;p&gt;© 2026 www.mapaturisticodelquindio.com — Hecho con ❤️ en el Quindío&lt;/p&gt;
  &lt;/footer&gt;
  &lt;script src="../assets/js/app.js"&gt;&lt;/script&gt;
  &lt;script&gt;
    // Inicializar quicklink
    window.addEventListener('load', () =&gt; {
      quicklink.listen();
    });
  &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
  `}
};

// Asegurar directorios existan
const municipiosDir = path.join(__dirname, '../municipios');
const negociosDir = path.join(__dirname, '../negocios');
[municipiosDir, negociosDir].forEach(dir =&gt; {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Generar páginas de municipios
masterData.municipios.forEach(municipio =&gt; {
  const filePath = path.join(municipiosDir, `${municipio.slug}.html`);
  fs.writeFileSync(filePath, TEMPLATES.municipio(municipio));
  console.log(`✅ Página de municipio creada: municipios/${municipio.slug}.html`);
});

// Generar páginas de negocios
masterData.negocios.forEach(negocio =&gt; {
  const filePath = path.join(negociosDir, `${negocio.slug}.html`);
  fs.writeFileSync(filePath, TEMPLATES.negocio(negocio));
  console.log(`✅ Página de negocio creada: negocios/${negocio.slug}.html`);
});

// Generar sitemap
const sitemap = `&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"&gt;
  &lt;url&gt;&lt;loc&gt;https://www.mapaturisticodelquindio.com/&lt;/loc&gt;&lt;lastmod&gt;${masterData.lastUpdated.split('T')[0]}&lt;/lastmod&gt;&lt;changefreq&gt;weekly&lt;/changefreq&gt;&lt;priority&gt;1.0&lt;/priority&gt;&lt;/url&gt;
  ${masterData.municipios.map(m =&gt; `&lt;url&gt;&lt;loc&gt;https://www.mapaturisticodelquindio.com/municipios/${m.slug}&lt;/loc&gt;&lt;lastmod&gt;${masterData.lastUpdated.split('T')[0]}&lt;/lastmod&gt;&lt;changefreq&gt;weekly&lt;/changefreq&gt;&lt;priority&gt;0.8&lt;/priority&gt;&lt;/url&gt;`).join('\n')}
  ${masterData.negocios.map(n =&gt; `&lt;url&gt;&lt;loc&gt;https://www.mapaturisticodelquindio.com/negocios/${n.slug}&lt;/loc&gt;&lt;lastmod&gt;${n.fechaActualizacion}&lt;/lastmod&gt;&lt;changefreq&gt;monthly&lt;/changefreq&gt;&lt;priority&gt;0.7&lt;/priority&gt;&lt;/url&gt;`).join('\n')}
&lt;/urlset&gt;`;

fs.writeFileSync(path.join(__dirname, '../sitemap.xml'), sitemap);
console.log('\n✅ Sitemap actualizado!');

