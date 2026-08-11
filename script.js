/**
 * Jayden Samuel Kurniawan - Portfolio Interactivity
 * Features: Light/Dark Theme Switcher, Mobile Nav Menu, Image Carousel, Scroll Reveal
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle Logic
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check persisted preference or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.className = 'fas fa-moon';
      themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
    } else {
      themeIcon.className = 'fas fa-sun';
      themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
    }
  }

  // 2. Mobile Menu Navigation
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  // Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const link = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (link) link.classList.add('active');
      } else {
        if (link) link.classList.remove('active');
      }
    });
  });

  // 3. Scroll Reveal Animation using IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 4. Image Carousels Handler (Supports multiple carousels)
  const activeCarousels = [];

  function initCarousel(container) {
    if (!container) return null;

    const slides = container.querySelectorAll('.carousel-slide');
    const dots = container.querySelectorAll('.carousel-dots .dot');
    const prevBtn = container.querySelector('#carousel-prev, [data-carousel-prev], #iccsci-prev');
    const nextBtn = container.querySelector('#carousel-next, [data-carousel-next], #iccsci-next');
    let currentSlideIndex = 0;
    let carouselTimer = null;

    if (!slides.length) return null;

    function showSlide(index) {
      if (index >= slides.length) currentSlideIndex = 0;
      else if (index < 0) currentSlideIndex = slides.length - 1;
      else currentSlideIndex = index;

      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlideIndex);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlideIndex);
      });
    }

    function startAutoPlay() {
      stopAutoPlay();
      carouselTimer = setInterval(() => {
        showSlide(currentSlideIndex + 1);
      }, 4500);
    }

    function stopAutoPlay() {
      if (carouselTimer) {
        clearInterval(carouselTimer);
        carouselTimer = null;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        showSlide(currentSlideIndex - 1);
        startAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        showSlide(currentSlideIndex + 1);
        startAutoPlay();
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        showSlide(i);
        startAutoPlay();
      });
    });

    // Touch Swipe Support for Mobile
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeDistance = touchEndX - touchStartX;
      if (Math.abs(swipeDistance) > 40) {
        if (swipeDistance < 0) {
          showSlide(currentSlideIndex + 1);
        } else {
          showSlide(currentSlideIndex - 1);
        }
        startAutoPlay();
      }
    }, { passive: true });

    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);

    startAutoPlay();

    return { startAutoPlay, stopAutoPlay };
  }

  document.querySelectorAll('.carousel-container').forEach(container => {
    const instance = initCarousel(container);
    if (instance) activeCarousels.push(instance);
  });

  // 5. Image Lightbox Feature
  initLightbox();

  function initLightbox() {
    // Create lightbox modal elements dynamically if not already in DOM
    let modal = document.getElementById('lightbox-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'lightbox-modal';
      modal.className = 'lightbox-modal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-hidden', 'true');
      modal.innerHTML = `
        <div class="lightbox-backdrop" id="lightbox-backdrop"></div>
        <div class="lightbox-container">
          <button class="lightbox-close-btn" id="lightbox-close" aria-label="Close modal">
            <i class="fas fa-times"></i>
          </button>
          <div class="lightbox-content">
            <img src="" alt="" class="lightbox-img" id="lightbox-img">
            <div class="lightbox-caption" id="lightbox-caption"></div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');
    const backdrop = document.getElementById('lightbox-backdrop');

    function openLightbox(src, altText) {
      activeCarousels.forEach(c => c && c.stopAutoPlay());
      lightboxImg.src = src;
      lightboxImg.alt = altText || '';
      if (altText && altText.trim() !== '') {
        lightboxCaption.textContent = altText;
        lightboxCaption.style.display = 'block';
      } else {
        lightboxCaption.textContent = '';
        lightboxCaption.style.display = 'none';
      }

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      activeCarousels.forEach(c => c && c.startAutoPlay());
    }

    // Event listeners for close triggers
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', closeLightbox);
    }

    // Close when clicking outside image content
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('lightbox-container')) {
        closeLightbox();
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeLightbox();
      }
    });

    // Automatically apply lightbox wrapper & expand button to all content images inside <main>
    const contentImages = document.querySelectorAll('main img');
    contentImages.forEach(img => {
      // Prevent duplicate wrapping
      if (img.parentElement && img.parentElement.classList.contains('lightbox-wrapper')) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'lightbox-wrapper';

      // Replace img with wrapper in DOM and place img inside wrapper
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);

      // Create expand/zoom icon button
      const expandBtn = document.createElement('button');
      expandBtn.className = 'lightbox-expand-btn';
      expandBtn.setAttribute('aria-label', 'Expand image');
      expandBtn.setAttribute('type', 'button');
      expandBtn.innerHTML = '<i class="fas fa-expand-alt"></i>';

      wrapper.appendChild(expandBtn);

      // Trigger lightbox on wrapper/img/button click
      wrapper.addEventListener('click', (e) => {
        openLightbox(img.src, img.alt);
      });
    });
  }
});
