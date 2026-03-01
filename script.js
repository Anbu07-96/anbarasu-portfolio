/* ============================================
   ANBARASU A — Portfolio
   script.js
   ============================================ */

// ── Custom Cursor ──────────────────────────
const cursor     = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  }
});

// Smooth ring follows cursor with slight lag
function animateRing() {
  ringX += (mouseX - ringX) * 0.1;
  ringY += (mouseY - ringY) * 0.1;
  if (cursorRing) {
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
  }
  requestAnimationFrame(animateRing);
}
animateRing();

// Cursor grows on hoverable elements
document.querySelectorAll('a, button, .card, .btn, .contact-link').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor)     { cursor.style.width = '16px'; cursor.style.height = '16px'; }
    if (cursorRing) { cursorRing.style.width = '50px'; cursorRing.style.height = '50px'; }
  });
  el.addEventListener('mouseleave', () => {
    if (cursor)     { cursor.style.width = '8px'; cursor.style.height = '8px'; }
    if (cursorRing) { cursorRing.style.width = '34px'; cursorRing.style.height = '34px'; }
  });
});


// ── Page Fade In ───────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity    = '1';
  });
});


// ── Typing Animation (index.html hero only) ─
const typingEl = document.getElementById('typing');
const roles = [
  'Infrastructure Engineer',
  'Microsoft 365 Architect',
  'Security Operations Engineer',
  'Identity & Cloud Specialist'
];
let roleIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  if (!typingEl) return;
  const current = roles[roleIndex];

  if (!isDeleting) {
    typingEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting  = false;
      roleIndex   = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 38 : 72);
}

if (typingEl) typeEffect();


// ── Active Nav Link ────────────────────────
const navLinks = document.querySelectorAll('.nav-links a');
const current  = window.location.pathname.split('/').pop() || 'index.html';

navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href === current) {
    link.classList.add('active');
  }
});


// ── Skill Bar Animation ────────────────────
// Bars animate when they scroll into view
const skillBars = document.querySelectorAll('.skill-bar-fill');

if (skillBars.length > 0) {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => barObserver.observe(bar));
}


// ── Card Scroll Reveal ─────────────────────
const cards = document.querySelectorAll('.card');

cards.forEach((card, i) => {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = `opacity 0.5s ${i * 0.07}s ease, transform 0.5s ${i * 0.07}s ease`;
});

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => cardObserver.observe(card));


// ── Rotating Quotes (contact.html only) ───
const quoteEl = document.getElementById('quote-display');
const quotes  = [
  "The best way to predict the future is to invent it. — Alan Kay",
  "Hard work beats talent when talent doesn't work hard. — Tim Notke",
  "Start where you are. Use what you have. Do what you can. — Arthur Ashe",
  "The secret of getting ahead is getting started. — Mark Twain",
  "Great things never come from comfort zones.",
  "Don't wait for opportunity. Create it.",
  "Opportunities don't happen. You create them. — Chris Grosser",
  "Success usually comes to those too busy to be looking for it. — Thoreau",
  "Believe you can and you're halfway there. — Theodore Roosevelt",
  "Push yourself, because no one else is going to do it for you.",
];
let quoteIndex = 0;

function showQuote() {
  if (!quoteEl) return;
  quoteEl.style.opacity = '0';
  setTimeout(() => {
    quoteEl.textContent  = quotes[quoteIndex];
    quoteEl.style.opacity = '1';
    quoteIndex = (quoteIndex + 1) % quotes.length;
  }, 500);
}

if (quoteEl) {
  showQuote();
  setInterval(showQuote, 7000);
}


// ── Nav scroll shadow ──────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (!nav) return;
  if (window.scrollY > 20) {
    nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
  } else {
    nav.style.boxShadow = 'none';
  }
});
