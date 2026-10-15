// ============================================
// BASLEL SHIMELS — PORTFOLIO JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- CUSTOM CURSOR ----
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');

  if (window.matchMedia('(pointer:fine)').matches) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
      setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top  = e.clientY + 'px';
      }, 80);
    });

    document.querySelectorAll('a, button, .project-card, .cert-card, .about-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(2)';
        follower.style.transform = 'translate(-50%,-50%) scale(1.5)';
        follower.style.borderColor = 'rgba(245,158,11,0.8)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(1)';
        follower.style.transform = 'translate(-50%,-50%) scale(1)';
        follower.style.borderColor = 'rgba(245,158,11,0.4)';
      });
    });
  } else {
    cursor.style.display = 'none';
    follower.style.display = 'none';
  }

  // ---- NAV SCROLL ----
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // ---- HAMBURGER MENU ----
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  let menuOpen = false;

  hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    const spans = hamburger.querySelectorAll('span');
    if (menuOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  // ---- HERO COUNTER ANIMATION ----
  const counters = document.querySelectorAll('[data-target]');
  let countersStarted = false;

  function startCounters() {
    if (countersStarted) return;
    countersStarted = true;
    counters.forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) { el.textContent = target; clearInterval(timer); }
        else { el.textContent = Math.floor(current); }
      }, 30);
    });
  }
  const heroObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) startCounters();
  }, { threshold: 0.5 });
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) heroObserver.observe(heroStats);

  // ---- SCROLL REVEAL ----
  const reveals = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => revealObserver.observe(el));

  // ---- SKILL BARS ----
  const skillBars = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillBars.forEach(bar => skillObserver.observe(bar));

  // ---- PROJECT FILTER ----
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;

      projectCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.opacity    = '0';
        card.style.transform  = 'scale(0.95)';
        card.style.pointerEvents = 'none';
        setTimeout(() => {
          card.style.display = match ? '' : 'none';
          if (match) {
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.4s, transform 0.4s';
              card.style.opacity    = '1';
              card.style.transform  = '';
              card.style.pointerEvents = '';
            });
          }
        }, 200);
      });
    });
  });

  // ---- TESTIMONIAL SLIDER ----
  const cards = document.querySelectorAll('.testimonial-card');
  const dots  = document.querySelectorAll('.t-dot');
  let current = 0;

  function showTestimonial(idx) {
    cards.forEach(c => c.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    cards[idx].classList.add('active');
    dots[idx].classList.add('active');
    current = idx;
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => showTestimonial(i)));

  let autoSlide = setInterval(() => {
    showTestimonial((current + 1) % cards.length);
  }, 4500);

  document.querySelector('.testimonials')?.addEventListener('mouseenter', () => clearInterval(autoSlide));
  document.querySelector('.testimonials')?.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => showTestimonial((current + 1) % cards.length), 4500);
  });

  // ---- CONTACT FORM ----
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.innerHTML = '<span>Sending...</span>';

      setTimeout(() => {
        form.parentElement.innerHTML = `
          <div class="form-success">
            <div class="check-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h3>Message Sent!</h3>
            <p>Thanks for reaching out. Baslel will get back to you within 24 hours.</p>
          </div>`;
      }, 1200);
    });
  }

  // ---- SMOOTH SCROLL FOR ALL ANCHORS ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- ACTIVE NAV HIGHLIGHT ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 160) current = sec.id;
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
    });
  }, { passive: true });

  // ---- HERO ROLES CYCLING ----
  const roles = document.querySelectorAll('.hero-roles .role');
  let roleIdx = 0;
  setInterval(() => {
    roles.forEach(r => r.classList.remove('active'));
    roleIdx = (roleIdx + 1) % roles.length;
    roles[roleIdx].classList.add('active');
  }, 2500);

});
