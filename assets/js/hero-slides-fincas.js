// Lista generada de imágenes publicitarias de fincas
const HERO_SLIDES = [
  "/pautas_publicitarias/Alquiler_de_fincas_quindio/casa_campestre_lacosecha.png",
  "/pautas_publicitarias/Alquiler_de_fincas_quindio/finca_cafetera_el_ocaso.png",
  "/pautas_publicitarias/Alquiler_de_fincas_quindio/finca_la_floresta.png",
  "/pautas_publicitarias/Alquiler_de_fincas_quindio/hacienda_moraleja.png",
  "/pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_alma_nativa.png",
  "/pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_cafe_cafe_campestre.png",
  "/pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_deliriocampestre.png",
  "/pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_linaje_salvaje.png"
];

// Hero Slider Functionality
let currentSlideIndex = 0;
let slideInterval = null;

function clearAutoplay() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
  }
}

function resolveAssetPath(src) {
  if (!src || typeof src !== 'string') return src;
  const trimmed = src.trim();
  if (/^(https?:)?\/\//i.test(trimmed) || trimmed.startsWith('/')) return trimmed;
  return '/' + trimmed.replace(/^\.?\//, '');
}

function getSafeSlides() {
  return (Array.isArray(HERO_SLIDES) ? HERO_SLIDES : [])
    .filter((item) => typeof item === 'string' && item.trim())
    .map((item) => item.trim());
}

function updateCounter(totalSlides, currentValue) {
  const counterCurrent = document.getElementById('hero-slide-current');
  const counterTotal = document.getElementById('hero-slide-total');

  if (counterCurrent) {
    counterCurrent.textContent = String(currentValue);
  }

  if (counterTotal) {
    counterTotal.textContent = String(totalSlides);
  }
}

function initHeroSlider() {
  try {
    const sliderContainer = document.getElementById('hero-slider');
    const slides = getSafeSlides();

    if (!sliderContainer) return;

    currentSlideIndex = 0;
    clearAutoplay();
    sliderContainer.innerHTML = '';

    if (!slides.length) {
      updateCounter(0, 0);
      return;
    }

    slides.forEach((imageSrc, index) => {
      const slide = document.createElement('div');
      slide.className = `hero-slide ${index === 0 ? 'active' : ''}`;
      slide.setAttribute('aria-hidden', index !== 0);
      slide.innerHTML = `
        <img src="${resolveAssetPath(imageSrc)}" alt="Finca del Quindío - Slide ${index + 1}" loading="${index === 0 ? 'eager' : 'lazy'}" onerror="this.style.display='none';">
        <div class="hero-slide-meta">
          <span>Publicidad destacada</span>
        </div>
      `;
      sliderContainer.appendChild(slide);
    });

    updateCounter(slides.length, 1);
    startAutoplay();
  } catch (error) {
    console.warn('[Hero Slider] No fue posible inicializar el carrusel de fincas.', error);
  }
}

function goToSlide(index) {
  const slides = Array.from(document.querySelectorAll('.hero-slide'));

  if (!slides.length) return;

  const normalizedIndex = Number.isInteger(index)
    ? index
    : currentSlideIndex + 1;

  const nextIndex = normalizedIndex >= slides.length
    ? 0
    : normalizedIndex < 0
      ? slides.length - 1
      : normalizedIndex;

  const currentSlide = slides[currentSlideIndex];
  const nextSlide = slides[nextIndex];

  if (currentSlide) {
    currentSlide.classList.remove('active');
    currentSlide.setAttribute('aria-hidden', 'true');
  }

  if (nextSlide) {
    nextSlide.classList.add('active');
    nextSlide.setAttribute('aria-hidden', 'false');
  }

  currentSlideIndex = nextIndex;
  updateCounter(slides.length, currentSlideIndex + 1);
}

function startAutoplay() {
  clearAutoplay();

  if (typeof window === 'undefined' || !window.setInterval) return;

  slideInterval = window.setInterval(() => {
    goToSlide(currentSlideIndex + 1);
  }, 3000);
}

// Initialize slider when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroSlider);
} else {
  initHeroSlider();
}
