const fs = require('fs');
const path = require('path');

const pautasDir = path.join(__dirname, '..', 'pautas_publicitarias', 'Alquiler_de_fincas_quindio');
const outputFile = path.join(__dirname, '..', 'assets', 'js', 'hero-slides-fincas.js');

const allImages = [];

function scanDirectory(dir, relativePath = '') {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDirectory(fullPath, path.join(relativePath, item));
    } else if (
      item.toLowerCase().endsWith('.png') ||
      item.toLowerCase().endsWith('.jpg') ||
      item.toLowerCase().endsWith('.jpeg')
    ) {
      const imagePath = '/' + path.posix.join('pautas_publicitarias', 'Alquiler_de_fincas_quindio', relativePath, item).replace(/\\/g, '/');
      allImages.push(imagePath);
    }
  }
}

console.log('Scanning Alquiler_de_fincas_quindio...');
scanDirectory(pautasDir);
console.log(`Found ${allImages.length} images`);

const outputContent = `// Lista generada de imágenes publicitarias de fincas
const HERO_SLIDES = ${JSON.stringify(allImages, null, 2)};

// Hero Slider Functionality
let currentSlideIndex = 0;
let slideInterval;

function resolveAssetPath(src) {
  if (!src || typeof src !== 'string') return src;
  const trimmed = src.trim();
  if (/^(https?:)?\/\//i.test(trimmed) || trimmed.startsWith('/')) return trimmed;
  return '/' + trimmed.replace(/^\.?\//, '');
}

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
    slide.className = \`hero-slide \${index === 0 ? 'active' : ''}\`;
    slide.setAttribute('aria-hidden', index !== 0);
    slide.innerHTML = \`
      <img src="\${resolveAssetPath(imageSrc)}" alt="Finca del Quindío - Slide \${index + 1}" loading="\${index === 0 ? 'eager' : 'lazy'}">
      <div class="hero-slide-meta">
        <span>Publicidad destacada</span>
      </div>
    \`;
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
`;

fs.writeFileSync(outputFile, outputContent, 'utf8');
console.log('Generated:', outputFile);
