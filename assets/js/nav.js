/**
 * Navbar universal con logo — se inyecta en todas las páginas internas
 * El index.html tiene su propio navbar inline
 */
(function () {
  const base = document.querySelector('base')?.href || '/';
  const isRoot = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
  if (isRoot) return; // index.html tiene su propio navbar

  // Detectar profundidad de ruta para rutas relativas
  const depth = (window.location.pathname.match(/\//g) || []).length - 1;
  const prefix = depth > 1 ? '../'.repeat(depth - 1) : './';

  const links = [
    { href: prefix + 'index.html',                              label: 'Inicio' },
    { href: 'https://mapaquindio.vercel.app/',                  label: '🗺️ Mapa Quindío', ext: true },
    { href: 'https://mapa-circasia-digital-2.vercel.app/',      label: '🗺️ Circasia', ext: true },
    { href: 'https://mapa-calarca-2026.vercel.app/',            label: '🗺️ Calarcá', ext: true },
    { href: prefix + 'municipios-del-quindio.html',             label: 'Municipios' },
    { href: prefix + 'sitios-turisticos.html',                  label: 'Sitios' },
    { href: prefix + 'alojamientos.html',                       label: 'Alojamientos' },
    { href: prefix + 'anunciate.html',                          label: '📣 Anúnciate', cta: true },
  ];

  const current = window.location.pathname;

  const navHTML = `
    <nav class="navbar" role="navigation" aria-label="Navegación principal">
      <div class="nav-inner">
        <a href="${prefix}index.html" class="nav-logo" aria-label="Inicio">
          <img src="${prefix}media/logo.jpg" alt="Mapa Turístico del Quindío">
        </a>
        <div class="nav-links" role="menubar">
          ${links.map(l => `<a href="${l.href}"${l.cta ? ' class="nav-cta"' : ''}${l.ext ? ' target="_blank" rel="noopener"' : ''}${current.includes(l.href.replace('./', '')) ? ' aria-current="page"' : ''}>${l.label}</a>`).join('')}
        </div>
        <button class="nav-toggle" id="navToggle" aria-label="Abrir menú" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="nav-drawer" id="navDrawer" role="menu" aria-hidden="true">
        <a href="${prefix}index.html">🏠 Inicio</a>
        <a href="https://mapaquindio.vercel.app/" target="_blank" rel="noopener">🗺️ Mapa del Quindío</a>
        <a href="https://mapa-circasia-digital-2.vercel.app/" target="_blank" rel="noopener">🗺️ Mapa Circasia</a>
        <a href="https://mapa-calarca-2026.vercel.app/" target="_blank" rel="noopener">🗺️ Mapa Calarcá</a>
        <a href="${prefix}municipios-del-quindio.html">🏘️ Municipios</a>
        <a href="${prefix}sitios-turisticos.html">🎡 Sitios Turísticos</a>
        <a href="${prefix}alojamientos.html">🏨 Alojamientos</a>
        <a href="${prefix}agencias-operadoras-turisticas.html">🧭 Agencias</a>
        <a href="${prefix}empresas-de-transporte.html">🚍 Transporte</a>
        <a href="${prefix}alquiler-finca-hoteles.html">🏡 Fincas</a>
        <a href="${prefix}centros-comerciales.html">🛒 Centros Comerciales</a>
        <a href="${prefix}anunciate.html">📣 Anúnciate</a>
      </div>
    </nav>`;

  document.body.insertAdjacentHTML('afterbegin', navHTML);

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
