const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  navLinks.classList.toggle('open', !open);
});
navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open navigation');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const progress = document.querySelector('.scroll-progress');
function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();
document.querySelector('#year').textContent = new Date().getFullYear();

const form = document.querySelector('#contact-form');
form?.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = `Project inquiry from ${data.get('name')}`;
  const body = `Hello CodeWings,\n\nMy name is ${data.get('name')}.\nEmail: ${data.get('email')}\nService: ${data.get('service')}\n\nProject details:\n${data.get('message')}\n\nThank you.`;
  const mailto = `mailto:info@code-wings.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const status = form.querySelector('.form-status');
  status.textContent = 'Opening your email app with the inquiry prepared…';
  window.location.href = mailto;
});
