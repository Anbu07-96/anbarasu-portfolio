/* ============================================
   ANBARASU A — Portfolio
   script.js
   ============================================ */


// ── Page Fade In ───────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity    = '1';
  });
});


// ── Typing Animation (index.html only) ─────
const typingEl = document.getElementById('typing');
const roles = [
  'Infrastructure Engineer',
  'Microsoft 365 Architect',
  'Security Operations Engineer',
  'Identity & Cloud Specialist'
];
let roleIndex  = 0;
let charIndex  = 0;
let isDeleting = false;

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
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 38 : 72);
}

if (typingEl) typeEffect();


// ── Active Nav Link ────────────────────────
const navLinks   = document.querySelectorAll('.nav-links a');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('active');
  }
});


// ── Skill Bar Scroll Animation ─────────────
const skillBars = document.querySelectorAll('.skill-bar-fill');

if (skillBars.length > 0) {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  skillBars.forEach(bar => barObserver.observe(bar));
}


// ── Card Scroll Reveal ─────────────────────
const cards = document.querySelectorAll('.card');

cards.forEach((card, i) => {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(18px)';
  card.style.transition =
    `opacity 0.5s ${i * 0.06}s ease,
     transform 0.5s ${i * 0.06}s ease`;
});

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

cards.forEach(card => cardObserver.observe(card));


// ── Rotating Quotes (contact.html only) ────
const quoteEl = document.getElementById('quote-display');
const quotes  = [
  "The best way to predict the future is to invent it. — Alan Kay",
  "Hard work beats talent when talent doesn't work hard. — Tim Notke",
  "Start where you are. Use what you have. Do what you can. — Arthur Ashe",
  "The secret of getting ahead is getting started. — Mark Twain",
  "Great things never come from comfort zones.",
  "Don't wait for opportunity. Create it.",
  "Opportunities don't happen. You create them. — Chris Grosser",
  "Believe you can and you're halfway there. — Theodore Roosevelt",
  "Push yourself, because no one else is going to do it for you.",
  "Success usually comes to those too busy to be looking for it. — Thoreau",
  "Do what you can with all you have, wherever you are. — Roosevelt",
  "Dream big and dare to fail. — Norman Vaughan"
];
let quoteIndex = 0;

function showQuote() {
  if (!quoteEl) return;
  quoteEl.style.opacity = '0';
  setTimeout(() => {
    quoteEl.textContent   = quotes[quoteIndex];
    quoteEl.style.opacity = '1';
    quoteIndex = (quoteIndex + 1) % quotes.length;
  }, 500);
}

if (quoteEl) {
  showQuote();
  setInterval(showQuote, 7000);
}


// ── Nav Shadow on Scroll ───────────────────
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (!nav) return;
  if (window.scrollY > 20) {
    nav.style.boxShadow = '0 4px 28px rgba(0,0,0,0.45)';
  } else {
    nav.style.boxShadow = 'none';
  }
});
