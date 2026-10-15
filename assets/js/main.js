const menu = document.getElementById('nav-menu');
const openButton = document.getElementById('nav-toggle');
const closeButton = document.getElementById('nav-close');

function setMenuOpen(open) {
  const wasOpen = menu?.classList.contains('is-open');
  menu?.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
  openButton?.setAttribute('aria-expanded', String(open));
  openButton?.setAttribute('aria-label', open ? 'Fechar navegação' : 'Abrir navegação');
  if (open) menu?.querySelector('a')?.focus();
  else if (wasOpen) openButton?.focus();
}

openButton?.addEventListener('click', () => setMenuOpen(!menu?.classList.contains('is-open')));
closeButton?.addEventListener('click', () => setMenuOpen(false));
menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu?.classList.contains('is-open')) setMenuOpen(false);
});

const header = document.getElementById('header');
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav__link')];
function updatePageState() {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
  const current = sections.filter((section) => section.getBoundingClientRect().top <= 140).at(-1);
  navLinks.forEach((link) => {
    const active = link.hash === `#${current?.id}`;
    link.classList.toggle('active-link', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
window.addEventListener('scroll', updatePageState, { passive: true });
updatePageState();

document.querySelectorAll('[data-year]').forEach((year) => {
  year.textContent = new Date().getFullYear();
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reduceMotion) {
  const revealTargets = document.querySelectorAll(
    '.section__intro, .about__image, .about__content, .work__grid figure, .service__inner > *, .expert__grid article, .contact__content, .contact__image',
  );
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach((target) => {
    target.classList.add('reveal-ready');
    revealObserver.observe(target);
  });
}
