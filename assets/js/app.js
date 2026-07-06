/* ============================================================
   MAPA TURÍSTICO DEL QUINDÍO — App Core v1
   ============================================================ */

(function() {
  // ------------------------------
  // TOASTS DE ESCASEZ Y URGENCIA
  // ------------------------------
  const urgencyMessages = [
    { icon: "🔥", text: "3 personas están viendo este hospedaje ahora" },
    { icon: "⚡", text: "¡Pasadía reservado hace 20 min por un turista!" },
    { icon: "⭐", text: "¡Reserva confirmada hace 15 minutos!" },
    { icon: "📞", text: "¡2 solicitudes de cotización en los últimos 30 minutos!" },
    { icon: "🎉", text: "¡5 turistas visitaron este negocio hoy!" }
  ];

  function showRandomToast() {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const msg = urgencyMessages[Math.floor(Math.random() * urgencyMessages.length)];
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="icon">${msg.icon}</span><span>${msg.text}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 4000);
  }

  // Mostrar toasts aleatorios cada 8-15 segundos
  setTimeout(() => showRandomToast(), 3000);
  setInterval(() => {
    if (Math.random() > 0.4) showRandomToast();
  }, 8000 + Math.random() * 7000);


  // ------------------------------
  // LOCALSTORAGE: PERSISTENCIA GLOBAL
  // ------------------------------
  const Storage = {
    get(key) {
      try {
        const item = localStorage.getItem(`mtq_${key}`);
        return item ? JSON.parse(item) : null;
      } catch (e) { return null; }
    },
    set(key, value) {
      try {
        localStorage.setItem(`mtq_${key}`, JSON.stringify(value));
      } catch (e) { console.error(e); }
    },
    remove(key) {
      try { localStorage.removeItem(`mtq_${key}`); } catch (e) {}
    }
  };


  // ------------------------------
  // GENERADOR DE ENLACES WHATSAPP ULTRA-CALIFICADOS
  // ------------------------------
  function generateWhatsAppLink(negocio, options = {}) {
    const nombre = options.nombre || "Turista";
    const personas = options.personas || "2-4";
    const fecha = options.fecha || "próximos días";
    const presupuesto = options.presupuesto || "consultar";

    const mensaje = encodeURIComponent(
      `Hola ${negocio.nombre},\nvi tu perfil en el Mapa Turístico del Quindío 🗺️.\nMi nombre es ${nombre}, somos ${personas} personas, planeamos ir el ${fecha} y mi presupuesto es ${presupuesto}.`
    );

    const telefono = negocio.whatsapp || negocio.telefono || "";
    const numeroLimpio = String(telefono).replace(/\D/g, "");
    return `https://wa.me/${numeroLimpio}?text=${mensaje}`;
  }


  // ------------------------------
  // COTIZADOR DE VIAJES: "DON CHUCHO"
  // ------------------------------
  function initCotizador() {
    const form = document.getElementById('cotizador-form');
    if (!form) return;

    // Precargar datos desde LocalStorage
    const saved = Storage.get('cotizador');
    if (saved) {
      Object.keys(saved).forEach(key => {
        const input = form.querySelector(`[name="${key}"]`);
        if (input) input.value = saved[key];
      });
    }

    form.addEventListener('input', (e) => {
      const saved = Storage.get('cotizador') || {};
      saved[e.target.name] = e.target.value;
      Storage.set('cotizador', saved);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      alert("¡Gracias! Don Chucho ya está cotizando tu viaje. Te contactaremos pronto.");
    });
  }


  // ------------------------------
  // MÓDULO DE SOLICITUD DE TRANSPORTE
  // ------------------------------
  function initTransporte() {
    const modal = document.getElementById('transporte-modal');
    const openBtn = document.querySelectorAll('.open-transporte-btn');
    const closeBtn = document.getElementById('close-transporte-modal');
    const form = document.getElementById('transporte-form');

    openBtn.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.style.display = 'block';
        
        // Precargar datos
        const saved = Storage.get('transporte') || {};
        const cotizador = Storage.get('cotizador') || {};
        
        const municipio = cotizador.municipio || saved.municipio || "";
        const destino = cotizador.destino || saved.destino || "";
        
        Object.keys({ ...saved, ...cotizador }).forEach(key => {
          const input = form.querySelector(`[name="${key}"]`);
          if (input && input.value === "") input.value = { ...saved, ...cotizador }[key];
        });
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        Storage.set('transporte', data);
        
        // Aquí podrías enviar la orden a la central de transportes aliada
        alert("¡Solicitud de transporte enviada! Un operador se pondrá en contacto contigo pronto.");
        modal.style.display = 'none';
      });
    }
  }


  // ------------------------------
  // CARGA HÍBRIDA DEL MAPA (Leaflet/OpenStreetMap)
  // ------------------------------
  let mapLoaded = false;
  let mapIntersectionObserver = null;

  function loadMapScripts() {
    if (mapLoaded) return;

    const leafletCSS = document.createElement('link');
    leafletCSS.rel = 'stylesheet';
    leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(leafletCSS);

    const leafletJS = document.createElement('script');
    leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    leafletJS.onload = initMap;
    document.head.appendChild(leafletJS);
    
    mapLoaded = true;
  }

  function initMap() {
    const mapElement = document.getElementById('mapa-interactivo');
    if (!mapElement) return;

    if (window.L && typeof window.L.map === 'function') {
      const map = L.map('mapa-interactivo').setView([4.5339, -75.6811], 10); // Centrado en Armenia, Quindío
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      // Agregar marcadores de negocios desde datos.js
      if (typeof NEGOCIOS !== 'undefined') {
        NEGOCIOS.forEach(biz => {
          if (biz.lat && biz.lng) {
            const marker = L.marker([biz.lat, biz.lng]).addTo(map);
            marker.bindPopup(`
              <div style="min-width:200px">
                <h3 style="margin:0 0 8px;font-weight:800;color:#064e3b">${biz.nombre}</h3>
                <p style="margin:0 0 8px;color:#6b7280">${biz.desc}</p>
                <a href="${generateWhatsAppLink(biz)}" target="_blank" style="display:inline-flex;align-items:center;gap:6px;background:#25d366;color:#fff;padding:8px 14px;border-radius:50px;font-weight:700;text-decoration:none">💬 Contactar</a>
              </div>
            `);
          }
        });
      }
    }
  }

  function initMapObserver() {
    const mapElement = document.getElementById('mapa-interactivo');
    if (!mapElement) return;

    mapIntersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadMapScripts();
          mapIntersectionObserver.disconnect();
        }
      });
    }, { rootMargin: '200px' });
    
    mapIntersectionObserver.observe(mapElement);
    
    // Cargar también al hacer hover/toque en móvil
    mapElement.addEventListener('mouseenter', loadMapScripts, { once: true });
    mapElement.addEventListener('touchstart', loadMapScripts, { once: true });
  }


  // ------------------------------
  // BUSCADOR Y FILTROS
  // ------------------------------
  function initBuscador() {
    const searchInput = document.getElementById('search-input');
    const filterBtns = document.querySelectorAll('.filtro-btn');
    const cards = document.querySelectorAll('.biz-card');

    function filterCards() {
      const searchTerm = (searchInput?.value || "").toLowerCase();
      const activeFilter = document.querySelector('.filtro-btn.active');
      const categoria = activeFilter?.dataset.categoria || "";

      cards.forEach(card => {
        const matchesSearch = card.textContent.toLowerCase().includes(searchTerm);
        const matchesCategoria = !categoria || card.dataset.categoria === categoria;
        
        card.style.display = (matchesSearch && matchesCategoria) ? "flex" : "none";
      });
    }

    searchInput?.addEventListener('input', filterCards);

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterCards();
      });
    });
  }


  // ------------------------------
  // SLIDER DEL HERO (PUBLICIDAD)
  // ------------------------------
  function initHeroSlider() {
    const slider = document.getElementById('hero-slider');
    if (!slider) return;

    // Preferir HERO_SLIDES generado desde carpeta pautas_publicitarias
    let slidesData = [];
    if (typeof HERO_SLIDES !== 'undefined' && Array.isArray(HERO_SLIDES) && HERO_SLIDES.length) {
      slidesData = HERO_SLIDES.slice(0, 24).map(p => ({ imagen: p, nombre: '' }));
    } else if (typeof NEGOCIOS !== 'undefined') {
      slidesData = NEGOCIOS.filter(item => item.imagen && String(item.imagen).includes('pautas_publicitarias')).slice(0, 24);
    }

    if (!slidesData.length) return;

    // Preload images and filter out missing/broken ones
    const paths = slidesData.map(item => (item.imagen || item));

    function preload(paths) {
      return Promise.all(paths.map(p => new Promise(resolve => {
        const img = new Image();
        const src = typeof p === 'string' ? encodeURI(p) : p;
        img.onload = () => resolve({ src, ok: true });
        img.onerror = () => resolve({ src, ok: false });
        img.src = src;
      })));
    }

    preload(paths).then(results => {
      const ok = results.filter(r => r.ok).map(r => r.src);
      if (!ok.length) {
        console.warn('Hero slider: ninguna imagen cargó desde pautas_publicitarias', results);
        return;
      }

      slider.innerHTML = '';

      ok.forEach((src, index) => {
        const slide = document.createElement('div');
        slide.className = `hero-slide${index === 0 ? ' active' : ''}`;
        slide.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
        slide.innerHTML = `\n          <img src="${src}" alt="Publicidad del Quindío">\n          <div class="hero-slide-meta">\n            <span>Publicidad recomendada</span>\n          </div>\n        `;
        slider.appendChild(slide);
      });

      const totalEl = document.getElementById('hero-slide-total');
      const currentEl = document.getElementById('hero-slide-current');
      if (totalEl) totalEl.textContent = String(ok.length);
      if (currentEl) currentEl.textContent = '1';

      let currentIndex = 0;
      setInterval(() => {
        const slides = slider.querySelectorAll('.hero-slide');
        if (!slides.length) return;
        slides[currentIndex].classList.remove('active');
        slides[currentIndex].setAttribute('aria-hidden', 'true');
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('active');
        slides[currentIndex].setAttribute('aria-hidden', 'false');
        if (currentEl) currentEl.textContent = String(currentIndex + 1);
      }, 3000);
    });
  }

  // ------------------------------
  // INICIALIZACIÓN DE TODO
  // ------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    // Crear contenedor de toasts
    if (!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    initCotizador();
    initTransporte();
    initMapObserver();
    initBuscador();
    initHeroSlider();
  });
})();
