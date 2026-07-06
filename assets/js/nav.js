/**
 * Header universal — UN SOLO HEADER: logo + barra roja/amarilla
 * Se inyecta en todas las páginas internas (no en index.html)
 */
(function () {
  const isRoot = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
  if (isRoot) return;

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
          <a href="${p}index.html"${active('index.html')}>Home</a>
          <a href="https://mapa-armenia-2026.vercel.app/" target="_blank" rel="noopener">Mapa Armenia 2026</a>
          <a href="https://mapa-circasia-digital-2.vercel.app/" target="_blank" rel="noopener">Mapa de Circasia 2025</a>
          <a href="${p}alquiler-finca-hoteles.html"${active('alquiler-finca-hoteles')}>Alquiler Finca hoteles</a>
          <a href="https://mapaquindio.vercel.app/" target="_blank" rel="noopener">Mapa del Quindío</a>
          <a href="${p}quindio-comercial.html"${active('quindio-comercial')}>Quindío Comercial</a>
          <a href="${p}municipios-del-quindio.html"${active('municipios-del-quindio')}>Municipios del Quindío</a>
          <a href="${p}agencias-operadoras-turisticas.html"${active('agencias-operadoras')}>Agencias Operadoras Turísticas</a>
          <a href="${p}sitios-turisticos.html"${active('sitios-turisticos')}>Atractivos Turísticos</a>
          <a href="${p}alojamientos.html"${active('alojamientos')}>Alojamientos</a>
          <a href="https://mapa-calarca-2026.vercel.app/" target="_blank" rel="noopener">Mapa Calarcá 2026</a>
          <a href="${p}anunciate.html"${active('anunciate')}>📣 Anúnciate</a>
        </div>
      </nav>
    </div>
    <div class="nav-drawer" id="navDrawer">
      <a href="${p}index.html">🏠 Home</a>
      <a href="https://mapa-armenia-2026.vercel.app/" target="_blank" rel="noopener">🗺️ Mapa Armenia 2026</a>
      <a href="https://mapa-circasia-digital-2.vercel.app/" target="_blank" rel="noopener">🗺️ Mapa de Circasia 2025</a>
      <a href="${p}alquiler-finca-hoteles.html">🏡 Alquiler Finca hoteles</a>
      <a href="https://mapaquindio.vercel.app/" target="_blank" rel="noopener">🗺️ Mapa del Quindío</a>
      <a href="${p}quindio-comercial.html">🛍️ Quindío Comercial</a>
      <a href="${p}municipios-del-quindio.html">🏘️ Municipios del Quindío</a>
      <a href="${p}agencias-operadoras-turisticas.html">🧭 Agencias Operadoras Turísticas</a>
      <a href="${p}sitios-turisticos.html">🎡 Atractivos Turísticos</a>
      <a href="${p}alojamientos.html">🏨 Alojamientos</a>
      <a href="https://mapa-calarca-2026.vercel.app/" target="_blank" rel="noopener">🗺️ Mapa Calarcá 2026</a>
      <a href="${p}anunciate.html">📣 Anúnciate</a>
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
