/**
 * Header universal — UN SOLO HEADER: logo + barra roja/amarilla
 * Se inyecta en todas las páginas
 */
(function () {
  const isRoot = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');

  const depth = (window.location.pathname.match(/\//g) || []).length - 1;
  const p = depth > 1 ? '../'.repeat(depth - 1) : './';
  const cur = window.location.pathname;
  const active = (href) => cur.includes(href.replace('./', '')) ? ' class="active"' : '';

  const CATEGORIAS_MENU = {
    turismo: {
      label: "🗺️ Turismo y Mapas",
      items: [
        { id: "agencias_de_turismo", label: "Agencias de Turismo", url: "agencias-de-turismo.html" },
        { id: "atractivos_turisticos", label: "Atractivos Turísticos", url: "sitios-turisticos.html" },
        { id: "alquiler_de_fincas_quindio", label: "Alquiler de Fincas", url: "alquileres-fincas.html" },
        { id: "hoteles_armenia", label: "Hoteles Armenia", url: "alojamientos.html" },
        { id: "glamping", label: "Glampings", url: "glamping.html" },
        { id: "artesanias", label: "Artesanías", url: "artesanias.html" }
      ]
    },
    gastronomia: {
      label: "🍲 Gastronomía",
      items: [
        { id: "gastronomia_tipica", label: "Gastronomía Típica", url: "gastronomia-tipica.html" },
        { id: "comida_de_mar", label: "Comida de Mar", url: "comida-de-mar.html" },
        { id: "comidas_rapidas", label: "Comidas Rápidas", url: "comidas-rapidas.html" },
        { id: "tiendas_de_cafe", label: "Tiendas de Café", url: "tiendas-de-cafe.html" },
        { id: "postres_y_dulces", label: "Postres y Dulces", url: "postres-y-dulces.html" },
        { id: "cocteles_licores", label: "Cocteles y Licores", url: "cocteles-licores.html" }
      ]
    },
    comercio_servicios: {
      label: "🛍️ Comercio y Servicios",
      items: [
        { id: "centros_comerciales", label: "Centros Comerciales", url: "centros-comerciales.html" },
        { id: "transportes", label: "Transportes", url: "transportes.html" },
        { id: "deportes_y_entretenimiento", label: "Deportes y Entretenimiento", url: "entretenimiento.html" },
        { id: "seguros", label: "Seguros", url: "seguros.html" }
      ]
    }
  };

  const renderCategoriaGroups = () => Object.entries(CATEGORIAS_MENU).map(([, macro]) => `
          <div class="menu-group">
            <span class="menu-group-label">${macro.label}</span>
            <div class="menu-group-items">
              ${macro.items.map(item => `<a href="${p}${item.url}"${active(item.url)}>${item.label}</a>`).join('')}
            </div>
          </div>
        `).join('');

  const renderDrawerSections = () => Object.entries(CATEGORIAS_MENU).map(([, macro]) => `
        <div class="nav-drawer-section">
          <div class="nav-drawer-section-title">${macro.label}</div>
          ${macro.items.map(item => `<a href="${p}${item.url}">${item.label}</a>`).join('')}
        </div>
      `).join('');

  const html = `
    <div class="site-header">
      <div class="header-top">
        <a href="${p}index.html" class="nav-logo">
          <img src="${p}assets/images/logo mapaquindio-com.png" alt="Mapa Turístico del Quindío">
        </a>
        <button class="nav-toggle" id="navToggle" aria-label="Menú">
          <span></span><span></span><span></span>
        </button>
      </div>
      <nav class="menu-bar" role="navigation" aria-label="Menú principal">
        <div class="menu-bar-inner">
          <a href="${p}index.html"${active('index.html')}>🏠 Home</a>
          
          <div class="menu-group">
            <span class="menu-group-label">🗺️ Mapas</span>
            <div class="menu-group-items">
              <a href="${p}mapa-del-quindio.html"${active('mapa-del-quindio')}>Mapa Quindío</a>
              <a href="${p}mapa-de-circasia-2025.html"${active('mapa-de-circasia-2025')}>Mapa Circasia 2025</a>
              <a href="${p}mapa-de-calarca-2026.html"${active('mapa-de-calarca-2026')}>Mapa Calarcá 2026</a>
              <a href="https://mapa-armenia-2026.vercel.app/" target="_blank" rel="noopener">Mapa Armenia 2026</a>
              <a href="https://mapaquindio.vercel.app/" target="_blank" rel="noopener">Mapa general</a>
            </div>
          </div>
          
          ${renderCategoriaGroups()}
          <a href="${p}anunciate.html"${active('anunciate')}>🚀 Anúnciate</a>
        </div>
      </nav>
    </div>
    <div class="nav-drawer" id="navDrawer">
      <a href="${p}index.html">🏠 Home</a>
      
      <div class="nav-drawer-section">
        <div class="nav-drawer-section-title">🗺️ Mapas</div>
        <a href="${p}mapa-del-quindio.html">Mapa Quindío</a>
        <a href="${p}mapa-de-circasia-2025.html">Mapa Circasia 2025</a>
        <a href="${p}mapa-de-calarca-2026.html">Mapa Calarcá 2026</a>
        <a href="https://mapa-armenia-2026.vercel.app/" target="_blank" rel="noopener">Mapa Armenia 2026</a>
        <a href="https://mapaquindio.vercel.app/" target="_blank" rel="noopener">Mapa general</a>
      </div>
      
      ${renderDrawerSections()}
      
      <a href="${p}anunciate.html" style="font-weight:800;">📣 Anúnciate</a>
    </div>`;

  document.body.insertAdjacentHTML('afterbegin', html);
  document.body.style.paddingTop = 'var(--nav-h, 132px)';

  const toggle = document.getElementById('navToggle');
  const drawer = document.getElementById('navDrawer');
  toggle.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    toggle.classList.toggle('open', open);
  });
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    drawer.classList.remove('open');
    toggle.classList.remove('open');
  }));
})();
