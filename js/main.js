// ===== Preloader =====
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => preloader.classList.add('hidden'), 1400);
  }
});

// ===== Language Switching =====
const langBtns = document.querySelectorAll('.lang-btn');
const translatables = document.querySelectorAll('[data-ja]');

function setLang(lang) {
  translatables.forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    }
  });
  document.documentElement.lang = lang === 'cn' ? 'zh-CN' : lang === 'en' ? 'en' : 'ja';
  langBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
  localStorage.setItem('iika-lang', lang);
}

langBtns.forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

const savedLang = localStorage.getItem('iika-lang');
if (savedLang) setLang(savedLang);

// ===== Mobile Menu =====
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
    });
  });
}

// ===== Header Scroll Effect =====
const header = document.getElementById('header');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  header.classList.toggle('scrolled', scrollY > 80);
  lastScrollY = scrollY;
}, { passive: true });

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const pos = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  });
});

// ===== Scroll Animations (Fade Up) =====
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -60px 0px' };
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.vision-card, .service-card, .project-card, .new-service-card, .why-us-item, .why-deliver-item, .contact-item').forEach(el => {
  el.classList.add('fade-up');
  fadeObserver.observe(el);
});

// ===== Counter Animation =====
function animateCounters() {
  document.querySelectorAll('.hero-stat-num[data-count]').forEach(counter => {
    const target = parseInt(counter.dataset.count);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(target * eased);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

// Trigger counters when hero is visible
const heroSection = document.querySelector('.hero');
if (heroSection) {
  const heroObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      heroObserver.unobserve(heroSection);
    }
  }, { threshold: 0.3 });
  heroObserver.observe(heroSection);
}

// ===== Projects Tabs =====
const projectTabs = document.querySelectorAll('.projects-tab');
const projectPanels = document.querySelectorAll('.projects-panel');

projectTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    projectTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    projectPanels.forEach(panel => {
      panel.classList.toggle('active', panel.id === `panel-${target}`);
    });
  });
});

// ===== Back to Top =====
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const company = formData.get('company');
    const message = formData.get('message');

    const subject = encodeURIComponent(`Website Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:info@iika-jp.com?subject=${subject}&body=${body}`;
  });
}

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = '';
        link.style.fontWeight = '700';
      } else {
        link.style.fontWeight = '';
      }
    }
  });
}, { passive: true });

// ===== Parallax Effect on Hero Orbs =====
window.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.hero-gradient-orb');
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;

  orbs.forEach((orb, i) => {
    const speed = (i + 1) * 15;
    orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
}, { passive: true });