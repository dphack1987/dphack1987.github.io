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
          
          <div class="menu-group">
            <span class="menu-group-label">🏘️ Turismo</span>
            <div class="menu-group-items">
              <a href="${p}municipios-del-quindio.html"${active('municipios-del-quindio')}>Municipios</a>
              <a href="${p}sitios-turisticos.html"${active('sitios-turisticos')}>Atractivos Turísticos</a>
              <a href="${p}alojamientos.html"${active('alojamientos')}>Alojamientos</a>
              <a href="${p}empresas-de-transporte.html"${active('empresas-de-transporte')}>Transporte</a>
              <a href="${p}agencias-operadoras-turisticas.html"${active('agencias-operadoras')}>Agencias Turísticas</a>
            </div>
          </div>
          
          <div class="menu-group">
            <span class="menu-group-label">🛍️ Comercio</span>
            <div class="menu-group-items">
              <a href="${p}quindio-comercial.html"${active('quindio-comercial')}>Quindío Comercial</a>
              <a href="${p}anunciate.html"${active('anunciate')}>Anúnciate</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div class="nav-drawer" id="navDrawer">
      <a href="${p}index.html">🏠 Home</a>
      
      <div class="nav-drawer-section">
        <div class="nav-drawer-section-title">🗺️ Mapas</div>
        <a href="https://mapa-armenia-2026.vercel.app/" target="_blank" rel="noopener">Mapa Armenia 2026</a>
        <a href="https://mapa-circasia-digital-2.vercel.app/" target="_blank" rel="noopener">Mapa de Circasia 2025</a>
        <a href="https://mapaquindio.vercel.app/" target="_blank" rel="noopener">Mapa del Quindío</a>
        <a href="https://mapa-calarca-2026.vercel.app/" target="_blank" rel="noopener">Mapa Calarcá 2026</a>
      </div>
      
      <div class="nav-drawer-section">
        <div class="nav-drawer-section-title">🏘️ Turismo</div>
        <a href="${p}municipios-del-quindio.html">Municipios</a>
        <a href="${p}sitios-turisticos.html">Atractivos Turísticos</a>
        <a href="${p}alojamientos.html">Alojamientos</a>
        <a href="${p}empresas-de-transporte.html">Transporte</a>
        <a href="${p}agencias-operadoras-turisticas.html">Agencias Turísticas</a>
      </div>
      
      <div class="nav-drawer-section">
        <div class="nav-drawer-section-title">🗺️ Mapas</div>
        <a href="${p}mapa-del-quindio.html">Mapa Quindío</a>
        <a href="${p}mapa-de-circasia-2025.html">Mapa Circasia 2025</a>
        <a href="${p}mapa-de-calarca-2026.html">Mapa Calarcá 2026</a>
        <a href="https://mapa-armenia-2026.vercel.app/" target="_blank" rel="noopener">Mapa Armenia 2026</a>
        <a href="https://mapaquindio.vercel.app/" target="_blank" rel="noopener">Mapa general</a>
      </div>
      
      <div class="nav-drawer-section">
        <div class="nav-drawer-section-title">🛍️ Comercio</div>
        <a href="${p}quindio-comercial.html">Quindío Comercial</a>
        <a href="${p}anunciate.html">Anúnciate</a>
      </div>
      
      <a href="${p}anunciate.html" style="font-weight:800;">📣 Anúnciate</a>
    </div>`}   }  }   ;

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
