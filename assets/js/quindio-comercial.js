const commercialHeroItems = [
  {
    type: 'image',
    src: './pautas/p1.png',
    title: 'Cafés especiales y ambiente local',
    subtitle: 'Descubre el mejor café del Quindío con servicio directo por WhatsApp.'
  },
  {
    type: 'image',
    src: './pautas/p2.png',
    title: 'Sabores típicos con historia',
    subtitle: 'Platos, postres y rutas gastronómicas para turistas exigentes.'
  },
  {
    type: 'image',
    src: './pautas/p3.png',
    title: 'Tiendas artesanales vibrantes',
    subtitle: 'Lleva un recuerdo auténtico de la región.'
  }
];

const commercialStories = [
  {
    id: 'story-1',
    title: 'Menú estrella',
    subtitle: 'Sabores del Quindío',
    image: './pautas/p4.png',
    content: '<p>Conoce el menú que más piden los turistas: platos típicos, café artesanal y postres caseros.</p>',
    media: ['./pautas/p4.png', './pautas/p5.png', './pautas/p6.png']
  },
  {
    id: 'story-2',
    title: 'Ambiente ideal',
    subtitle: 'Café y confort',
    image: './pautas/p7.png',
    content: '<p>Ambientes creados para encuentros, trabajo remoto y después de un paseo turístico.</p>',
    media: ['./pautas/p7.png', './pautas/p8.png', './pautas/p9.png']
  },
  {
    id: 'story-3',
    title: 'Compras rápidas',
    subtitle: 'Productos locales',
    image: './pautas/p10.png',
    content: '<p>Encuentra ropa, artesanías y regalos en tiendas que atienden por reserva o WhatsApp.</p>',
    media: ['./pautas/p10.png', './pautas/p11.png', './pautas/p12.png']
  }
];

window.renderCommercialCardHTML = function(n) {
  const mediaExists = Array.isArray(n.media) && n.media.length > 0;
  const instaButton = n.instagram ? `<a href="${n.instagram}" target="_blank" rel="noopener" class="btn-secondary">📸 Instagram</a>` : '';
  const videoButton = n.video ? `<button type="button" class="btn-secondary" onclick="openMediaModal('${n.id}', 'video')">▶ Ver video</button>` : '';
  const galleryButton = mediaExists ? `<button type="button" class="btn-secondary" onclick="openMediaModal('${n.id}', 'gallery')">🖼️ Ver galería</button>` : '';
  const galleryBadge = mediaExists ? `<span class="biz-media-badge">+ Galería</span>` : '';

  return `
    <div class="biz-card-img-wrap">
      <img src="${n.imagen}" alt="${n.nombre}" class="biz-card-img" loading="lazy">
      ${galleryBadge}
      <span class="biz-badge ${n.nivel}">${n.nivel === 'premium' ? '⭐ Premium' : '✓ Verificado'}</span>
    </div>
    <div class="biz-card-body">
      <div class="biz-tipo">${n.tipo} · ${n.municipio}</div>
      <h3>${n.nombre}</h3>
      <p>${n.descripcion || n.desc || ''}</p>
      <div class="biz-servicios">${n.servicios.slice(0,4).map(s => `<span class="biz-tag">${s}</span>`).join('')}</div>
      <div class="biz-meta-row">
        <div class="biz-precio">💰 ${n.precio}</div>
        <div class="biz-actions-row">${galleryButton}${videoButton}${instaButton}</div>
      </div>
      <div class="biz-actions">
        <a href="${generateWhatsAppLink(n)}" target="_blank" rel="noopener" class="btn-wa">💬 Reservar</a>
        <a href="${n.maps}" target="_blank" rel="noopener" class="btn-maps">📍 Llegar</a>
        ${n.telefono ? `<a href="tel:${n.telefono}" class="btn-tel">📞</a>` : ''}
      </div>
    </div>
  `;
};

function initCommercialPage() {
  renderHeroSlider();
  renderStoryStrip();
  initMediaModal();
}

function renderHeroSlider() {
  const slider = document.getElementById('commercial-hero-slider');
  if (!slider) return;
  slider.innerHTML = commercialHeroItems.map((item, index) => {
    return `
      <div class="hero-slide${index === 0 ? ' active' : ''}" data-index="${index}">
        ${item.type === 'video' ? `<video src="${item.src}" autoplay muted loop playsinline poster="${item.poster || ''}" class="hero-slide-video"></video>` : `<img src="${item.src}" alt="${item.title}" loading="lazy">`}
        <div class="hero-slide-copy">
          <strong>${item.title}</strong>
          <p>${item.subtitle}</p>
        </div>
      </div>`;
  }).join('');

  let current = 0;
  const slides = slider.querySelectorAll('.hero-slide');
  if (!slides.length) return;
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 7000);
}

function renderStoryStrip() {
  const strip = document.getElementById('commercial-story-strip');
  if (!strip) return;
  strip.innerHTML = commercialStories.map(story => `
    <button type="button" class="story-item" onclick="openStory('${story.id}')">
      <span class="story-thumb"><img src="${story.image}" alt="${story.title}" loading="lazy"></span>
      <span class="story-copy"><strong>${story.title}</strong><small>${story.subtitle}</small></span>
    </button>`).join('');
}

function openStory(id) {
  const story = commercialStories.find(item => item.id === id);
  if (!story) return;
  openMediaModal(id, 'story', story);
}

function initMediaModal() {
  const modal = document.getElementById('media-modal');
  if (!modal) return;
  modal.addEventListener('click', event => {
    if (event.target === modal) closeMediaModal();
  });
}

window.openMediaModal = function(id, mode, story) {
  const modal = document.getElementById('media-modal');
  const body = document.getElementById('media-modal-body');
  if (!modal || !body) return;
  const item = window.NEGOCIOS && window.NEGOCIOS.find(n => n.id === id);
  let content = '<div class="media-panel">';

  if (mode === 'video' && item && item.video) {
    content += `<video class="media-video" src="${item.video}" autoplay muted loop playsinline controls></video>`;
  } else if (mode === 'gallery' && item && Array.isArray(item.media) && item.media.length) {
    content += '<div class="media-gallery">' + item.media.map(src => `<img src="${src}" loading="lazy" alt="Galería">`).join('') + '</div>';
  } else if (mode === 'story' && story) {
    content += `<div class="story-modal-copy"><h2>${story.title}</h2>${story.content}</div>`;
    if (Array.isArray(story.media) && story.media.length) {
      content += '<div class="media-gallery">' + story.media.map(src => `<img src="${src}" loading="lazy" alt="Historia">`).join('') + '</div>';
    }
  } else {
    content += '<p>No hay medios disponibles.</p>';
  }

  content += '</div>';
  body.innerHTML = content;
  modal.classList.remove('hidden');
};

window.closeMediaModal = function() {
  const modal = document.getElementById('media-modal');
  if (!modal) return;
  modal.classList.add('hidden');
};