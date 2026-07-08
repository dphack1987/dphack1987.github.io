// Lista generada de imágenes publicitarias de fincas
const HERO_SLIDES = [
  "./pautas_publicitarias/Alquiler_de_fincas_quindio/casa_campestre_lacosecha.png",
  "./pautas_publicitarias/Alquiler_de_fincas_quindio/finca_cafetera_el_ocaso.png",
  "./pautas_publicitarias/Alquiler_de_fincas_quindio/finca_la_floresta.png",
  "./pautas_publicitarias/Alquiler_de_fincas_quindio/hacienda_moraleja.png",
  "./pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_alma_nativa.png",
  "./pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_cafe_cafe_campestre.png",
  "./pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_deliriocampestre.png",
  "./pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_linaje_salvaje.png"
];

// Hero Slider Functionality
let currentSlideIndex = 0;
let slideInterval;

function initHeroSlider() {
  const sliderContainer = document.getElementById('hero-slider');
  const counterCurrent = document.getElementById('hero-slide-current');
  const counterTotal = document.getElementById('hero-slide-total');

  if (!sliderContainer) return;

  // Clear existing slide
  sliderContainer.innerHTML = '';

  // Add all slides from HERO_SLIDES
  HERO_SLIDES.forEach((imageSrc, index) => {
    const slide = document.createElement('div');
    slide.className = `hero-slide ${index === 0 ? 'active' : ''}`;
    slide.setAttribute('aria-hidden', index !== 0);
    slide.innerHTML = `
      <img src="${imageSrc}" alt="Finca del Quindío - Slide ${index + 1}" loading="${index === 0 ? 'eager' : 'lazy'}">
      <div class="hero-slide-meta">
        <span>Publicidad destacada</span>
      </div>
    `;
    sliderContainer.appendChild(slide);
  });

  // Update counter
  counterTotal.textContent = HERO_SLIDES.length;
  counterCurrent.textContent = 1;

  // Start autoplay
  startAutoplay();
}

function goToSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const counterCurrent = document.getElementById('hero-slide-current');

  if (!slides.length) return;

  // Remove active class from current slide
  slides[currentSlideIndex].classList.remove('active');
  slides[currentSlideIndex].setAttribute('aria-hidden', 'true');

  // Calculate new index
  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;

  // Update current index
  currentSlideIndex = index;

  // Add active class to new slide
  slides[currentSlideIndex].classList.add('active');
  slides[currentSlideIndex].setAttribute('aria-hidden', 'false');

  // Update counter
  counterCurrent.textContent = currentSlideIndex + 1;
}

function startAutoplay() {
  // Clear existing interval if any
  if (slideInterval) clearInterval(slideInterval);

  // Start new interval
  slideInterval = setInterval(() => {
    goToSlide(currentSlideIndex + 1);
  }, 3000); // Change slide every 3 seconds
}

// Initialize slider when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroSlider);
} else {
  initHeroSlider();
}
