(() => {
  const yearTargets = document.querySelectorAll('[data-current-year]');
  const year = new Date().getFullYear();
  yearTargets.forEach((el) => (el.textContent = year));

  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-list');
  const closeNav = () => {
    if (!navToggle || !navList) return;
    navList.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('open');
    });

    navList.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNav);
    });
  }

  const serviceTriggers = Array.from(document.querySelectorAll('[data-service-trigger]'));
  const servicePanels = Array.from(document.querySelectorAll('[data-service-panel]'));
  const serviceDetailArea = document.getElementById('sluzby-detail');
  const serviceIds = new Set(servicePanels.map((panel) => panel.dataset.servicePanel).filter(Boolean));
  const defaultService = 'servis-elektrokolobeziek';

  const scrollToServiceTarget = (target, behavior = 'smooth') => {
    if (!(target instanceof HTMLElement)) return;

    const headerHeight = document.querySelector('.site-header')?.getBoundingClientRect().height || 0;
    const offset = headerHeight + 24;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior,
    });
  };

  const getServiceFromHash = () => {
    const rawHash = window.location.hash.replace(/^#/, '');
    if (!rawHash) return '';

    try {
      const decodedHash = decodeURIComponent(rawHash);
      return serviceIds.has(decodedHash) ? decodedHash : '';
    } catch (_error) {
      return serviceIds.has(rawHash) ? rawHash : '';
    }
  };

  const setActiveService = (serviceId, options = {}) => {
    const { updateHash = true, scroll = true } = options;
    if (!serviceIds.has(serviceId)) return false;

    servicePanels.forEach((panel) => {
      const isActive = panel.dataset.servicePanel === serviceId;
      panel.hidden = !isActive;
      panel.classList.toggle('is-active', isActive);
      panel.setAttribute('aria-hidden', String(!isActive));
    });

    serviceTriggers.forEach((trigger) => {
      const isActive = trigger.dataset.serviceTrigger === serviceId;
      trigger.classList.toggle('is-active', isActive);
      if (isActive) {
        trigger.setAttribute('aria-current', 'true');
      } else {
        trigger.removeAttribute('aria-current');
      }
    });

    if (updateHash && window.location.hash !== `#${serviceId}`) {
      history.pushState(null, '', `#${serviceId}`);
    }

    if (scroll) {
      const scrollTarget = document.getElementById(serviceId) || serviceDetailArea;
      scrollToServiceTarget(scrollTarget);
    }

    return true;
  };

  if (serviceTriggers.length && servicePanels.length) {
    serviceTriggers.forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        const serviceId = trigger.dataset.serviceTrigger;
        const href = trigger.getAttribute('href') || '';
        if (!serviceId || href !== `#${serviceId}`) return;

        event.preventDefault();
        setActiveService(serviceId, { updateHash: true, scroll: true });
        closeNav();
      });
    });

    const activateFromHash = () => {
      const serviceId = getServiceFromHash();
      if (serviceId) {
        setActiveService(serviceId, { updateHash: false, scroll: true });
      }
    };

    const initialService = getServiceFromHash();
    setActiveService(initialService || defaultService, { updateHash: false, scroll: false });
    if (initialService) {
      window.requestAnimationFrame(() => {
        const scrollTarget = document.getElementById(initialService);
        scrollToServiceTarget(scrollTarget, 'auto');
      });
    }
    window.addEventListener('hashchange', activateFromHash);
    window.addEventListener('popstate', activateFromHash);
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

  const heroCards = document.querySelector('[data-hero-cards]');
  if (heroCards instanceof HTMLElement) {
    const cards = Array.from(heroCards.querySelectorAll('.hero-card'));
    const isMobileView = window.matchMedia('(max-width: 820px), (hover: none), (pointer: coarse)');

    const resetCard = (card, body) => {
      card.classList.remove('is-bouncing');
      body.style.removeProperty('--card-rotate-x');
      body.style.removeProperty('--card-rotate-y');
      body.style.removeProperty('--card-shift-x');
      body.style.removeProperty('--card-shift-y');
    };

    const applyCardsMode = () => {
      heroCards.classList.toggle('is-mobile', isMobileView.matches);
      if (isMobileView.matches) {
        cards.forEach((card) => {
          const body = card.querySelector('.hero-card-body');
          if (!(body instanceof HTMLElement)) return;
          resetCard(card, body);
        });
      }
    };

    applyCardsMode();
    if (typeof isMobileView.addEventListener === 'function') {
      isMobileView.addEventListener('change', applyCardsMode);
    } else if (typeof isMobileView.addListener === 'function') {
      isMobileView.addListener(applyCardsMode);
    }

    cards.forEach((card) => {
      const body = card.querySelector('.hero-card-body');
      if (!(body instanceof HTMLElement)) return;

      card.addEventListener('pointerenter', () => {
        if (heroCards.classList.contains('is-mobile')) return;
        card.classList.remove('is-bouncing');
        void card.offsetWidth;
        card.classList.add('is-bouncing');
      });

      card.addEventListener('pointermove', (event) => {
        if (heroCards.classList.contains('is-mobile')) return;
        const rect = card.getBoundingClientRect();
        const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
        const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

        body.style.setProperty('--card-rotate-x', `${(-offsetY * 3.6).toFixed(2)}deg`);
        body.style.setProperty('--card-rotate-y', `${(offsetX * 4.4).toFixed(2)}deg`);
        body.style.setProperty('--card-shift-x', `${(offsetX * 3.2).toFixed(2)}px`);
        body.style.setProperty('--card-shift-y', `${(offsetY * 2.4).toFixed(2)}px`);
      });

      card.addEventListener('pointerleave', () => resetCard(card, body));
      card.addEventListener('pointercancel', () => resetCard(card, body));
      card.addEventListener('animationend', () => card.classList.remove('is-bouncing'));
    });
  }
})();
