// Sistema de Multiidioma - i18n
const TRANSLATIONS = {
  es: {
    lang_es: 'Español',
    lang_en: 'English',
    lang_fr: 'Français',
    lang_pt: 'Português',
    hero_badge: '🌿 El Mapa Turístico del Quindío',
    hero_title: 'El Mapa Turístico del Quindío',
    hero_title_em: 'La Guía Oficial 2026',
    hero_desc: 'Descubre alojamientos, sitios turísticos, gastronomía y transporte sin intermediarios en el Eje Cafetero. Más de 70 negocios del Quindío listos para atender tu viaje.',
    btn_reserve: '🏨 Reservar hospedaje',
    btn_transport: '🚍 Solicitar transporte',
    stat_advertisers: 'Anunciantes directos',
    stat_commissions: 'Comisiones',
    stat_whatsapp: 'WhatsApp directo',
    stat_safe: 'Reserve seguro',
    explore_title: 'Mapa Interactivo del Quindío',
    explore_desc: 'Navega por el departamento, descubre municipios, atractivos y servicios turísticos',
    scroll_text: 'Descubre más'
  },
  en: {
    lang_es: 'Spanish',
    lang_en: 'English',
    lang_fr: 'French',
    lang_pt: 'Portuguese',
    hero_badge: '🌿 The Quindío Tourist Map',
    hero_title: 'The Quindío Tourist Map',
    hero_title_em: 'The Official Guide 2026',
    hero_desc: 'Discover accommodations, tourist sites, gastronomy and transportation without intermediaries in the Coffee Axis. More than 70 Quindío businesses ready to serve your trip.',
    btn_reserve: '🏨 Book accommodation',
    btn_transport: '🚍 Request transport',
    stat_advertisers: 'Direct advertisers',
    stat_commissions: 'Commissions',
    stat_whatsapp: 'WhatsApp 24/7',
    stat_safe: 'Safe booking',
    explore_title: 'Interactive Map of Quindío',
    explore_desc: 'Navigate the department, discover municipalities, attractions and tourist services',
    scroll_text: 'Discover more'
  },
  fr: {
    lang_es: 'Espagnol',
    lang_en: 'Anglais',
    lang_fr: 'Français',
    lang_pt: 'Portugais',
    hero_badge: '🌿 La Carte Touristique du Quindío',
    hero_title: 'La Carte Touristique du Quindío',
    hero_title_em: 'Le Guide Officiel 2026',
    hero_desc: 'Découvrez des hébergements, des sites touristiques, la gastronomie et les transports sans intermédiaires dans l\'Axe du Café. Plus de 70 entreprises du Quindío prêtes à servir votre voyage.',
    btn_reserve: '🏨 Réserver un hébergement',
    btn_transport: '🚍 Demander un transport',
    stat_advertisers: 'Annonceurs directs',
    stat_commissions: 'Commissions',
    stat_whatsapp: 'WhatsApp 24/7',
    stat_safe: 'Réservation sécurisée',
    explore_title: 'Carte Interactive du Quindío',
    explore_desc: 'Naviguez dans le département, découvrez les municipalités, attractions et services touristiques',
    scroll_text: 'Découvrez plus'
  },
  pt: {
    lang_es: 'Espanhol',
    lang_en: 'Inglês',
    lang_fr: 'Francês',
    lang_pt: 'Português',
    hero_badge: '🌿 O Mapa Turístico do Quindío',
    hero_title: 'O Mapa Turístico do Quindío',
    hero_title_em: 'O Guia Oficial 2026',
    hero_desc: 'Descubra acomodações, pontos turísticos, gastronomia e transporte sem intermediários no Eixo do Café. Mais de 70 negócios de Quindío prontos para servir sua viagem.',
    btn_reserve: '🏨 Reservar hospedagem',
    btn_transport: '🚍 Solicitar transporte',
    stat_advertisers: 'Anunciantes diretos',
    stat_commissions: 'Comissões',
    stat_whatsapp: 'WhatsApp 24/7',
    stat_safe: 'Reserva segura',
    explore_title: 'Mapa Interativo do Quindío',
    explore_desc: 'Navegue pelo departamento, descubra municípios, atrações e serviços turísticos',
    scroll_text: 'Descubra mais'
  }
};

class i18n {
  constructor() {
    this.currentLang = localStorage.getItem('language') || 'es';
    this.init();
  }

  init() {
    // Detectar idioma del navegador si no hay preferencia guardada
    if (!localStorage.getItem('language')) {
      const browserLang = navigator.language.split('-')[0];
      if (Object.keys(TRANSLATIONS).includes(browserLang)) {
        this.currentLang = browserLang;
      }
    }
    
    this.applyTranslations();
    this.createLanguageSwitcher();
  }

  t(key) {
    return TRANSLATIONS[this.currentLang]?.[key] || TRANSLATIONS['es'][key] || key;
  }

  setLanguage(lang) {
    if (TRANSLATIONS[lang]) {
      this.currentLang = lang;
      localStorage.setItem('language', lang);
      this.applyTranslations();
    }
  }

  createLanguageSwitcher() {
    // Evitar crear duplicados
    if (document.getElementById('lang-switcher')) return;

    const switcher = document.createElement('div');
    switcher.id = 'lang-switcher';
    switcher.className = 'lang-switcher';
    
    switcher.innerHTML = `
      <div class="lang-buttons">
        <button class="lang-btn ${this.currentLang === 'es' ? 'active' : ''}" data-lang="es">ES</button>
        <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
        <button class="lang-btn ${this.currentLang === 'fr' ? 'active' : ''}" data-lang="fr">FR</button>
        <button class="lang-btn ${this.currentLang === 'pt' ? 'active' : ''}" data-lang="pt">PT</button>
      </div>
    `;

    // Insertar antes del header
    const header = document.querySelector('.site-header');
    if (header) {
      header.parentNode.insertBefore(switcher, header);
    }

    // Event listeners
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.target.dataset.lang;
        this.setLanguage(lang);
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
      });
    });
  }

  applyTranslations() {
    // Hero section
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) heroBadge.textContent = this.t('hero_badge');

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      const em = heroTitle.querySelector('em');
      if (em) {
        em.textContent = this.t('hero_title_em');
      }
    }

    const heroDesc = document.querySelector('.hero-desc');
    if (heroDesc) heroDesc.textContent = this.t('hero_desc');

    // Buttons
    const btnHero = document.querySelector('.btn-hero');
    if (btnHero) btnHero.textContent = this.t('btn_reserve');

    const btnHeroOutline = document.querySelector('.btn-hero-outline');
    if (btnHeroOutline) btnHeroOutline.textContent = this.t('btn_transport');

    // Stats
    const stats = document.querySelectorAll('.hero-stat-label');
    if (stats.length >= 4) {
      stats[0].textContent = this.t('stat_advertisers');
      stats[1].textContent = this.t('stat_commissions');
      stats[2].textContent = this.t('stat_whatsapp');
      stats[3].textContent = this.t('stat_safe');
    }

    // Scroll text
    const scrollText = document.querySelector('.hero-scroll');
    if (scrollText) {
      scrollText.innerHTML = '<div class="hero-scroll-arrow"></div>' + this.t('scroll_text');
    }

    // Section headers
    const secHeads = document.querySelectorAll('.sec-h2');
    if (secHeads.length > 0) {
      secHeads[0].textContent = this.t('explore_title');
    }

    const secSubs = document.querySelectorAll('.sec-sub');
    if (secSubs.length > 0) {
      secSubs[0].textContent = this.t('explore_desc');
    }
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new i18n();
  });
} else {
  window.i18n = new i18n();
}
