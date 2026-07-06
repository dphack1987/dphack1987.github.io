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

  // Menu ordered exactly as requested by the user
  const MENU_ITEMS = [
    { label: 'Home', url: 'index.html' },
    { label: 'Mapa de Circasia 2025', url: 'mapa-de-circasia-2025.html' },
    { label: 'Alquiler Finca hoteles', url: 'alquiler-finca-hoteles.html' },
    { label: 'Mapa del Quindío', url: 'mapa-del-quindio.html' },
    { label: 'Quindío Comercial', url: 'quindio-comercial.html' },
    { label: 'Municipios del Quindío', url: 'municipios-del-quindio.html' },
    { label: 'Agencias Operadoras Turísticas', url: 'agencias-operadoras-turisticas.html' },
    { label: 'Atractivos Turísticos', url: 'sitios-turisticos.html' },
    { label: 'Alojamientos', url: 'alojamientos.html' },
    { label: 'Reservar hotel Quindío', url: 'reservar-hotel-quindio.html' },
    { label: 'Hospedaje Armenia', url: 'hospedaje-armenia.html' },
    { label: 'Finca Quindío', url: 'finca-para-alquilar-quindio.html' },
    { label: 'Transporte aeropuerto Armenia', url: 'transporte-aeropuerto-armenia.html' },
    { label: 'Mapa Calarcá 2026', url: 'mapa-de-calarca-2026.html' },
    { label: 'Anúnciate', url: 'anunciate.html' }
  ];

  const renderPrimaryMenu = () => MENU_ITEMS.map(item => `<a href="${p}${item.url}"${active(item.url)}>${item.label}</a>`).join('');

  const renderDrawerMenu = () => MENU_ITEMS.map(item => `<a href="${p}${item.url}">${item.label}</a>`).join('');

  const html = `
    <div class="site-header">
      <div class="header-top">
        <a href="${p}index.html" class="nav-logo">
          <img src="${p}logo_mapa/logo.png" srcset="${p}logo_mapa/logo@2x.png 2x" alt="Mapa Turístico del Quindío">
        </a>
        <button class="nav-toggle" id="navToggle" aria-label="Menú">
          <span></span><span></span><span></span>
        </button>
      </div>
      <nav class="menu-bar" role="navigation" aria-label="Menú principal">
        <div class="menu-bar-inner">
          ${renderPrimaryMenu()}
        </div>
      </nav>
    </div>
    <div class="nav-drawer" id="navDrawer">
      ${renderDrawerMenu()}
      
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

  document.addEventListener('click', (event) => {
    if (!drawer.contains(event.target) && !toggle.contains(event.target) && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      toggle.classList.remove('open');
    }
  });

// load optional Don Chucho config (so you can set window.DON_CHUCHO_API_URL)
const configScript = document.createElement('script'); configScript.src = p + 'assets/js/don-chucho-config.js'; configScript.defer = true; document.body.appendChild(configScript);
// load Don Chucho widget script if exists
const script = document.createElement('script'); script.src = p + 'assets/js/don-chucho.js'; script.defer = true; document.body.appendChild(script);
})();
