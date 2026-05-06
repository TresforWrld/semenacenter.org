/* ========================================
   SEMENA CENTER — Main JavaScript
   ======================================== */

// Mark JS as loaded so reveal animations activate
document.documentElement.classList.add('js-loaded');

// NAV SCROLL EFFECT
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
});

// HAMBURGER MENU
const ham = document.getElementById('hamburger');
const drop = document.getElementById('navDropdown');
const navClose = document.getElementById('navClose');

if (ham && drop) {
  ham.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  if (navClose) {
    navClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMenu();
    });
  }

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drop.classList.contains('open')) {
      closeMenu();
    }
  });
}

function toggleMenu() {
  ham.classList.toggle('active');
  drop.classList.toggle('open');
  document.body.style.overflow = drop.classList.contains('open') ? 'hidden' : '';
}

function closeMenu() {
  ham.classList.remove('active');
  drop.classList.remove('open');
  document.body.style.overflow = '';
}

// REVEAL ON SCROLL
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// COUNTER ANIMATION
function animateCounter(el, target) {
  let current = 0;
  const duration = 2000;
  const step = target / duration * 16;
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.round(current);
    if (current >= target) clearInterval(interval);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-target]').forEach(el => {
        animateCounter(el, +el.dataset.target);
      });
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.impact-bar').forEach(el => counterObserver.observe(el));

// CONTACT FORM — mailto handler
function handleContactSubmit(event) {
  if (event) event.preventDefault();

  const name = document.getElementById('fName');
  const email = document.getElementById('fEmail');
  const subject = document.getElementById('fSubject');
  const message = document.getElementById('fMessage');

  if (!name || !email || !message) return;

  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    alert('Please fill in all required fields.');
    return;
  }

  const mailSubject = subject && subject.value ? subject.value : 'General Inquiry';
  const mailBody = `Name: ${name.value}\nEmail: ${email.value}\n\n${message.value}`;
  const mailtoLink = `mailto:info@semenacenter.org?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

  window.location.href = mailtoLink;
}