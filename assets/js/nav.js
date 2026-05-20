/**
 * Navbar universal — se inyecta en todas las páginas
 * Incluye hamburger menu para móvil
 */
(function () {
  const links = [
    { href: "/",                          label: "Inicio" },
    { href: "/mapa-de-circasia-2025.html",label: "🗺️ Mapa" },
    { href: "/municipios-del-quindio.html",label: "Municipios" },
    { href: "/sitios-turisticos.html",    label: "Sitios Turísticos" },
    { href: "/alojamientos.html",         label: "Alojamientos" },
    { href: "/agencias-operadoras-turisticas.html", label: "Agencias" },
    { href: "/empresas-de-transporte.html",label: "Transporte" },
    { href: "/alquiler-finca-hoteles.html",label: "Fincas" },
    { href: "/anunciate.html",            label: "📣 Anúnciate" },
  ];

  const current = window.location.pathname.replace(/\/$/, "") || "/";

  function buildLinks(isMobile) {
    return links.map(l => {
      const active = current === l.href || current.endsWith(l.href) ? ' class="active"' : '';
      return `<a href="${l.href}"${active}>${l.label}</a>`;
    }).join("");
  }

  const nav = document.createElement("nav");
  nav.className = "navbar";
  nav.setAttribute("role", "navigation");
  nav.setAttribute("aria-label", "Navegación principal");
  nav.innerHTML = `
    <div class="navbar-inner">
      <a href="/" class="nav-logo" aria-label="Mapa Turístico del Quindío - Inicio">
        <span aria-hidden="true">🌿</span>
        <span>MAPA TURÍSTICO</span>
      </a>
      <div class="nav-links" role="menubar">
        ${buildLinks(false)}
      </div>
      <button class="nav-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav-drawer">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="nav-drawer" id="nav-drawer" role="menu" aria-hidden="true">
      ${buildLinks(true)}
    </div>
  `;

  // Insert before body content
  document.body.insertBefore(nav, document.body.firstChild);

  // Toggle logic
  const toggle = nav.querySelector(".nav-toggle");
  const drawer = nav.querySelector(".nav-drawer");
  toggle.addEventListener("click", () => {
    const open = drawer.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
    drawer.setAttribute("aria-hidden", !open);
  });

  // Close on link click
  drawer.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      drawer.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      drawer.setAttribute("aria-hidden", "true");
    });
  });

  // Close on outside click
  document.addEventListener("click", e => {
    if (!nav.contains(e.target)) {
      drawer.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
})();
