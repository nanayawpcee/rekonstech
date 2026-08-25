/* rekonstech landing page — progressive enhancement only.
   Every feature below degrades to working HTML when JS is unavailable. */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- header */
  var header = document.getElementById('site-header');
  if (header) {
    var applyStuckState = function () {
      header.classList.toggle('is-stuck', window.scrollY > 24);
    };
    applyStuckState();
    window.addEventListener('scroll', applyStuckState, { passive: true });
  }

  /* --------------------------------------------------------- mobile menu */
  var toggle = document.getElementById('menu-toggle');
  var menu = document.getElementById('mobile-menu');

  function setMenu(open) {
    if (!menu || !toggle) return;
    menu.classList.toggle('hidden', !open);
    menu.setAttribute('data-open', String(open));
    toggle.setAttribute('aria-expanded', String(open));
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      setMenu(menu.classList.contains('hidden'));
    });

    menu.querySelectorAll('[data-mobile-link]').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenu(false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setMenu(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) setMenu(false);
    });
  }

  /* ----------------------------------------------------------- about tabs */
  var tabButtons = Array.prototype.slice.call(document.querySelectorAll('[data-tab]'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('[data-panel]'));

  function selectTab(id) {
    tabButtons.forEach(function (button) {
      button.setAttribute('aria-selected', String(button.dataset.tab === id));
    });
    panels.forEach(function (panel) {
      panel.classList.toggle('hidden', panel.dataset.panel !== id);
    });
  }

  tabButtons.forEach(function (button, index) {
    button.addEventListener('click', function () {
      selectTab(button.dataset.tab);
    });

    // Roving arrow-key navigation, per the WAI-ARIA tabs pattern.
    button.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      var offset = event.key === 'ArrowRight' ? 1 : -1;
      var next = tabButtons[(index + offset + tabButtons.length) % tabButtons.length];
      next.focus();
      selectTab(next.dataset.tab);
    });
  });

  /* -------------------------------------------------------- scroll reveal */
  var revealables = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
    revealables.forEach(function (element) {
      element.classList.add('is-visible');
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var siblings = Array.prototype.slice.call(
            entry.target.parentElement ? entry.target.parentElement.children : [],
          );
          var order = Math.max(0, siblings.indexOf(entry.target));
          entry.target.style.transitionDelay = Math.min(order * 80, 320) + 'ms';
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    );

    revealables.forEach(function (element) {
      revealObserver.observe(element);
    });
  }

  /* ------------------------------------------------------ stat count-up */
  var counters = document.querySelectorAll('[data-count-to]');

  function runCounter(element) {
    var target = Number(element.dataset.countTo);
    var suffix = element.dataset.suffix || '';
    if (!isFinite(target)) return;
    if (prefersReducedMotion) {
      element.textContent = target + suffix;
      return;
    }

    var duration = 1400;
    var start = null;

    var step = function (timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      // easeOutCubic
      var eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
  }

  if (counters.length && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          runCounter(entry.target);
          counterObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.5 },
    );
    counters.forEach(function (counter) {
      counterObserver.observe(counter);
    });
  }

  /* ------------------------------------- service card -> preselect category */
  var categorySelect = document.getElementById('serviceCategory');

  document.querySelectorAll('[data-service]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (!categorySelect) return;
      categorySelect.value = link.dataset.service;
      categorySelect.classList.add('ring-2', 'ring-brand-500/40');
      window.setTimeout(function () {
        categorySelect.classList.remove('ring-2', 'ring-brand-500/40');
      }, 1600);
    });
  });

  /* --------------------------------------------------------- request form */
  var form = document.getElementById('request-form');
  var status = document.getElementById('request-status');

  function showStatus(message, tone) {
    if (!status) return;
    status.textContent = message;
    status.classList.remove('hidden', 'text-accent-700', 'text-red-600', 'text-ink-400');
    status.classList.add(
      tone === 'success' ? 'text-accent-700' : tone === 'error' ? 'text-red-600' : 'text-ink-400',
    );
  }

  if (form) {
    var submitButton = form.querySelector('[data-submit]');
    var submitLabel = form.querySelector('[data-submit-label]');
    var defaultLabel = submitLabel ? submitLabel.textContent : '';

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var payload = {};
      new FormData(form).forEach(function (value, key) {
        payload[key] = typeof value === 'string' ? value.trim() : value;
      });

      if (submitButton) submitButton.disabled = true;
      if (submitLabel) submitLabel.textContent = 'Sending…';
      showStatus('Sending your request…', 'neutral');

      fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(function (response) {
          return response.json().then(function (body) {
            return { ok: response.ok, status: response.status, body: body };
          });
        })
        .then(function (result) {
          if (result.ok) {
            form.reset();
            showStatus(
              result.body.reference
                ? result.body.message + ' Reference: ' + result.body.reference
                : result.body.message,
              'success',
            );
            return;
          }
          if (result.status === 429) {
            showStatus('Too many requests. Please try again in a minute.', 'error');
            return;
          }
          var errors = result.body && result.body.errors;
          showStatus(
            errors && errors.length ? errors[0] : 'Something went wrong. Please try again.',
            'error',
          );
        })
        .catch(function () {
          showStatus(
            'We could not reach the server. Please call us instead — we answer 24/7.',
            'error',
          );
        })
        .finally(function () {
          if (submitButton) submitButton.disabled = false;
          if (submitLabel) submitLabel.textContent = defaultLabel;
        });
    });
  }

  /* -------------------------------------------- image loading resilience */
  document.querySelectorAll('img').forEach(function (image) {
    image.addEventListener('error', function () {
      // Remote photo unavailable: fall back to a brand gradient instead of a broken icon.
      image.style.visibility = 'hidden';
      if (image.parentElement) {
        image.parentElement.classList.add('bg-gradient-to-br', 'from-ink-800', 'to-brand-800');
      }
    });
  });
})();
