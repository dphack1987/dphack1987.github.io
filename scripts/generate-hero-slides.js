const fs = require('fs');
const path = require('path');

const pautasDir = path.join(__dirname, '..', 'pautas_publicitarias');
const outputFile = path.join(__dirname, '..', 'assets', 'js', 'hero-slides.js');

function gatherImages(dir, relativePath = '') {
  let images = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      images = images.concat(gatherImages(fullPath, path.join(relativePath, entry.name)));
    } else if (/\.(png|jpg|jpeg)$/i.test(entry.name)) {
      images.push('/' + path.posix.join('pautas_publicitarias', relativePath, entry.name).replace(/\\/g, '/'));
    }
  }

  return images;
}

const allImages = gatherImages(pautasDir);
const uniqueImages = Array.from(new Set(allImages));

const outputContent = `(function() {
  const HERO_SLIDES = ${JSON.stringify(uniqueImages, null, 2)};
  let currentSlideIndex = 0;
  let slideInterval = null;
  const AUTOPLAY_INTERVAL = 5000;

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
    const prevBtn = document.getElementById('hero-slide-prev');
    const nextBtn = document.getElementById('hero-slide-next');

    if (!sliderContainer || !HERO_SLIDES.length) return;

    sliderContainer.innerHTML = '';

    HERO_SLIDES.forEach((imageSrc, index) => {
      const slide = document.createElement('div');
      slide.className = 'hero-slide' + (index === 0 ? ' active' : '');
      slide.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
      slide.innerHTML = '<img src="' + resolveAssetPath(imageSrc) + '" alt="Publicidad del Quindío - Slide ' + (index + 1) + '" loading="' + (index === 0 ? 'eager' : 'lazy') + '"><div class="hero-slide-meta"><span>Publicidad destacada</span></div>';
      sliderContainer.appendChild(slide);
    });

    if (counterTotal) counterTotal.textContent = HERO_SLIDES.length;
    if (counterCurrent) counterCurrent.textContent = '1';

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        goToSlide(currentSlideIndex - 1);
        resetAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        goToSlide(currentSlideIndex + 1);
        resetAutoplay();
      });
    }

    sliderContainer.addEventListener('mouseenter', stopAutoplay);
    sliderContainer.addEventListener('mouseleave', startAutoplay);

    document.addEventListener('keydown', function(event) {
      if (event.key === 'ArrowLeft') {
        goToSlide(currentSlideIndex - 1);
        resetAutoplay();
      } else if (event.key === 'ArrowRight') {
        goToSlide(currentSlideIndex + 1);
        resetAutoplay();
      }
    });

    startAutoplay();
  }

  function goToSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const counterCurrent = document.getElementById('hero-slide-current');

    if (!slides.length) return;

    if (slides[currentSlideIndex]) {
      slides[currentSlideIndex].classList.remove('active');
      slides[currentSlideIndex].setAttribute('aria-hidden', 'true');
    }

    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    currentSlideIndex = index;

    if (slides[currentSlideIndex]) {
      slides[currentSlideIndex].classList.add('active');
      slides[currentSlideIndex].setAttribute('aria-hidden', 'false');
    }

    if (counterCurrent) counterCurrent.textContent = currentSlideIndex + 1;
  }

  function startAutoplay() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(function() {
      goToSlide(currentSlideIndex + 1);
    }, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroSlider);
  } else {
    initHeroSlider();
  }
})();
`;

fs.writeFileSync(outputFile, outputContent, 'utf8');
console.log('Generated ' + uniqueImages.length + ' slides at ' + outputFile);
