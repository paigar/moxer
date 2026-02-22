/* ============================================================
   MÖXER — Main JavaScript
   ============================================================ */

(function() {
  'use strict';

  // ============================================================
  // 1. HEADER: scroll behaviour + mobile menu
  // ============================================================
  const header   = document.getElementById('site-header');
  const menuBtn  = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-menu');

  // Scroll → add .scrolled class to header
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  // Mobile menu toggle
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = menuBtn.classList.toggle('active');
      mobileNav.classList.toggle('active', isOpen);
      menuBtn.setAttribute('aria-expanded', isOpen);
      mobileNav.setAttribute('aria-hidden', !isOpen);
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && mobileNav.classList.contains('active')) {
        menuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      }
    });
  }


  // ============================================================
  // 2. SCROLL REVEAL (IntersectionObserver)
  // ============================================================
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: just show everything
    revealEls.forEach(el => el.classList.add('visible'));
  }


  // ============================================================
  // 3. COUNTER ANIMATION (Stats section)
  // ============================================================
  const counters = document.querySelectorAll('[data-counter]');

  if (counters.length > 0) {
    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-counter'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      const duration = 1600;
      const start = performance.now();

      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = prefix + current + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  }


  // ============================================================
  // 4. PRODUCT FILTER (Collection pages)
  // ============================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('[data-lens]');

  if (filterBtns.length > 0 && productCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        productCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-lens') === filter) {
            card.style.display = '';
            requestAnimationFrame(() => card.classList.add('visible'));
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }


  // ============================================================
  // 5. SMOOTH ANCHOR SCROLLING (for same-page links)
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80; // header height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // ============================================================
  // 6. ACTIVE NAV LINK (current page highlight)
  // ============================================================
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav__link, .mobile-nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.startsWith(href) && href !== '/') {
      link.classList.add('nav__link--active');
    }
  });

})();
