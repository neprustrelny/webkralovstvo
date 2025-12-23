(() => {
  const yearTargets = document.querySelectorAll('[data-current-year]');
  const year = new Date().getFullYear();
  yearTargets.forEach((el) => (el.textContent = year));

  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('open');
    });

    navList.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navList.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const heroCta = document.querySelector('.hero-cta');
  if (heroCta) {
    heroCta.addEventListener('click', (event) => {
      const targetId = heroCta.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  }
})();
