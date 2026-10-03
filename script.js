/**
 * Jayden Samuel Kurniawan - Portfolio Interactivity
 * Features: Mobile Nav Menu, Image Carousel, Scroll Reveal, Text Highlight,
 * Image Lightbox. Dark-only identity, so there is no theme switcher.
 */

// Set as early as possible: CSS keys every reveal/highlight start-state off
// this class, so if the script fails the content stays visible.
document.documentElement.classList.add('js-enabled');

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Navigation
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    const setMenu = (isOpen) => {
      navMenu.classList.toggle('open', isOpen);
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      mobileToggle.innerHTML = isOpen
        ? '<i class="fas fa-times" aria-hidden="true"></i>'
        : '<i class="fas fa-bars" aria-hidden="true"></i>';
    };

    mobileToggle.addEventListener('click', () => {
      setMenu(!navMenu.classList.contains('open'));
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => setMenu(false));
    });
  }

  // Active Link Highlight on Scroll
  // The reference point is a line a third of the way down the viewport, not
  // the scroll offset itself. Comparing against the raw scroll position makes
  // the last section unreachable: its window starts below the maximum scroll,
  // so it could never activate.
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const reference = window.pageYOffset + window.innerHeight / 3;
    let current = null;

    sections.forEach(section => {
      if (reference >= section.offsetTop) current = section;
    });

    // At the very bottom, the shortest last section may still not reach the
    // reference line, so pin it there.
    const atBottom = window.pageYOffset + window.innerHeight
      >= document.documentElement.scrollHeight - 2;
    if (atBottom) current = sections[sections.length - 1];

    const activeId = current ? current.getAttribute('id') : null;
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + activeId);
    });
  });

  // 2. Scroll Reveal + text highlight (IntersectionObserver)
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

  // Text highlight: a signal bar wipes across the line, then retracts from
  // its right edge to uncover the words. CSS owns the timing; this only
  // toggles the class when the line enters view.
  const highlightLines = document.querySelectorAll('.reveal-line');

  if (highlightLines.length) {
    const highlightObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.6,
      rootMargin: '0px 0px -10% 0px'
    });

    highlightLines.forEach(el => highlightObserver.observe(el));
  }

  // 3. Image Carousels Handler (Supports multiple carousels)
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

    // Dots are decorative spans in the markup but behave as controls, so they
    // need a role, a tab stop and key activation to exist for keyboard users.
    dots.forEach((dot, i) => {
      dot.setAttribute('role', 'button');
      dot.setAttribute('tabindex', '0');
      dot.setAttribute('aria-label', 'Show photo ' + (i + 1) + ' of ' + slides.length);

      const select = (e) => {
        e.stopPropagation();
        e.preventDefault();
        showSlide(i);
        startAutoPlay();
      };

      dot.addEventListener('click', select);
      dot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') select(e);
      });
    });

    // Autoplay paused on mouseenter only, which excluded keyboard and touch
    // users. Pause whenever focus enters the carousel as well.
    container.addEventListener('focusin', stopAutoPlay);
    container.addEventListener('focusout', startAutoPlay);

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

  // 4. Image Lightbox Feature
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

    let lastFocused = null;

    function openLightbox(src, altText, trigger) {
      lastFocused = trigger || document.activeElement;
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
      // The modal transitions from visibility:hidden; focus() on a still-hidden
      // element silently fails, so move focus on the next frame.
      requestAnimationFrame(() => {
        if (closeBtn) closeBtn.focus();
      });
    }

    function closeLightbox() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      activeCarousels.forEach(c => c && c.startAutoPlay());
      // Return focus to whatever opened the dialog.
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
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

    // Close on Escape, and keep Tab inside the dialog while it is open:
    // without this, focus walked into the page hidden behind the overlay.
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('active')) return;

      if (e.key === 'Escape') {
        closeLightbox();
        return;
      }

      if (e.key === 'Tab') {
        const focusables = modal.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
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

      // The button is the real control: it is focusable, so putting the handler
      // here makes Enter/Space work. The wrapper keeps a click handler for
      // pointer users clicking the image itself.
      expandBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightbox(img.src, img.alt, expandBtn);
      });

      wrapper.addEventListener('click', () => {
        openLightbox(img.src, img.alt, expandBtn);
      });
    });
  }
});
