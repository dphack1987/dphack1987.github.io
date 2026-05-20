/**
 * Navbar + barra de menú estilo original — se inyecta en todas las páginas internas
 * El index.html tiene su propio navbar inline
 */
(function () {
  const isRoot = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
  if (isRoot) return;

  const depth = (window.location.pathname.match(/\//g) || []).length - 1;
  const p = depth > 1 ? '../'.repeat(depth - 1) : './';
  const cur = window.location.pathname;

  function active(href) {
    return cur.includes(href.replace('./', '').replace(p, '')) ? ' class="active"' : '';
  }

  const html = `
    <nav class="navbar" role="navigation" aria-label="Navegación principal">
      <div class="nav-inner">
        <a href="${p}index.html" class="nav-logo" aria-label="Inicio">
          <img src="${p}media/logo.jpg" alt="Mapa Turístico del Quindío">
        </a>
        <div class="nav-links">
          <a href="${p}index.html">Inicio</a>
          <a href="${p}municipios-del-quindio.html">Municipios</a>
          <a href="${p}sitios-turisticos.html">Sitios</a>
          <a href="${p}alojamientos.html">Alojamientos</a>
          <a href="${p}agencias-operadoras-turisticas.html">Agencias</a>
          <a href="${p}anunciate.html" class="nav-cta">📣 Anúnciate</a>
        </div>
        <button class="nav-toggle" id="navToggle" aria-label="Abrir menú" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="nav-drawer" id="navDrawer" role="menu" aria-hidden="true">
        <a href="${p}index.html">🏠 Home</a>
        <a href="https://mapa-circasia-digital-2.vercel.app/" target="_blank" rel="noopener">🗺️ Mapa de Circasia 2025</a>
        <a href="${p}alquiler-finca-hoteles.html">🏡 Alquiler Finca hoteles</a>
        <a href="https://mapaquindio.vercel.app/" target="_blank" rel="noopener">🗺️ Mapa del Quindío</a>
        <a href="${p}quindio-comercial.html">🛍️ Quindío Comercial</a>
        <a href="${p}municipios-del-quindio.html">🏘️ Municipios del Quindío</a>
        <a href="${p}agencias-operadoras-turisticas.html">🧭 Agencias Operadoras Turísticas</a>
        <a href="${p}sitios-turisticos.html">🎡 Atractivos Turísticos</a>
        <a href="${p}alojamientos.html">🏨 Alojamientos</a>
        <a href="${p}anunciate.html">📣 Anúnciate</a>
      </div>
    </nav>

    <div class="menu-bar" role="navigation" aria-label="Menú principal">
      <div class="menu-bar-inner">
        <a href="${p}index.html"${active('index.html')}>Home</a>
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
    </div>`;

  document.body.insertAdjacentHTML('afterbegin', html);

  // Ajustar padding-top del body para navbar + menu-bar
  document.body.style.paddingTop = 'calc(var(--nav-h) + 52px)';

  const toggle = document.getElementById('navToggle');
  const drawer = document.getElementById('navDrawer');

  toggle.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
    drawer.setAttribute('aria-hidden', !open);
  });

  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    drawer.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
  }));

  document.addEventListener('click', e => {
    if (!document.querySelector('.navbar').contains(e.target)) {
      drawer.classList.remove('open');
      toggle.classList.remove('open');
    }
  });
})();
