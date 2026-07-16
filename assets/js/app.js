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
      btn.addEventListener('click', (e) => {
        if (!modal || !form) return;
        e.preventDefault();
        modal.style.display = 'flex';
        
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

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }

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
        const markers = [];

        NEGOCIOS.forEach(biz => {
          if (biz.lat && biz.lng) {
            let iconOptions = {
              iconSize: [32, 32],
              iconAnchor: [16, 32],
              popupAnchor: [0, -32],
            };
            
            if (biz.imagen) {
              iconOptions.iconUrl = biz.imagen;
            }
            
            const customIcon = L.icon(iconOptions);
            const marker = L.marker([biz.lat, biz.lng], { icon: customIcon }).addTo(map);
            markers.push(marker);
            
            const negocioPageUrl = biz.slug ? `./negocios/${biz.slug}.html` : '#';
            marker.bindPopup(`
              <div style="min-width:240px; max-width:300px;">
                ${biz.imagen ? `<img src="${biz.imagen}" alt="${biz.nombre}" style="width:100%; height:120px; object-fit:cover; border-radius:8px; margin-bottom:12px;">` : ''}
                <h3 style="margin:0 0 8px;font-weight:800;color:#064e3b; font-size:18px;">${biz.nombre}</h3>
                <p style="margin:0 0 12px;color:#6b7280; font-size:14px; line-height:1.4;">${biz.desc}</p>
                <div style="display:flex; gap:8px; flex-wrap:wrap;">
                  <a href="${negocioPageUrl}" style="display:inline-flex;align-items:center;gap:6px;background:#059669;color:#fff;padding:8px 14px;border-radius:50px;font-weight:700;text-decoration:none; font-size:14px;">🔗 Ver detalles</a>
                  ${biz.whatsapp ? `<a href="${generateWhatsAppLink(biz)}" target="_blank" style="display:inline-flex;align-items:center;gap:6px;background:#25d366;color:#fff;padding:8px 14px;border-radius:50px;font-weight:700;text-decoration:none; font-size:14px;">💬 Contactar</a>` : ''}
                </div>
              </div>
            `);
          }
        });

        if (markers.length) {
          const validCoords = markers.map(marker => marker.getLatLng());
          const bounds = L.latLngBounds(validCoords);
          if (bounds.isValid()) {
            map.fitBounds(bounds.pad(0.2));
          }
          console.info(`[Mapa] ${markers.length} marcadores cargados desde ${NEGOCIOS.length} pautantes.`);
        }
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
  });
})();
