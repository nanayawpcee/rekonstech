/* rekonstech landing page — progressive enhancement only.
   Every feature below degrades to working HTML when JS is unavailable. */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- header */
  var header = document.getElementById('site-header');
  if (header) {
    // Pages with a light hero mark the header solid; it must never revert to
    // its transparent state, or the nav would be white on a white background.
    var alwaysSolid = header.dataset.solid === 'true';
    var applyStuckState = function () {
      header.classList.toggle('is-stuck', alwaysSolid || window.scrollY > 24);
    };
    applyStuckState();
    window.addEventListener('scroll', applyStuckState, { passive: true });
  }

  /* ------------------------------------------------------ side rail spy */
  var railLinks = Array.prototype.slice.call(document.querySelectorAll('[data-rail-link]'));
  if (railLinks.length) {
    var railTargets = [];
    railLinks.forEach(function (link) {
      var id = link.getAttribute('href') || '';
      if (id.charAt(0) !== '#') return;
      var target = document.querySelector(id);
      if (target) railTargets.push({ link: link, target: target });
    });

    // Position-based rather than an IntersectionObserver: some of these anchors
    // are zero-height marker spans (#top), which never "intersect" usefully.
    var syncRail = function () {
      var line = window.scrollY + window.innerHeight * 0.35;
      var activeIndex = 0;
      railTargets.forEach(function (entry, index) {
        if (entry.target.getBoundingClientRect().top + window.scrollY <= line) activeIndex = index;
      });
      railTargets.forEach(function (entry, index) {
        entry.link.setAttribute('aria-current', String(index === activeIndex));
      });
    };

    syncRail();
    window.addEventListener('scroll', syncRail, { passive: true });
    window.addEventListener('resize', syncRail);
  }

  /* ------------------------------------------------- "Services" nav menu */
  // Desktop: :hover/:focus-within in the CSS already open this with no JS at
  // all. This only adds the parts CSS can't do — a click/tap toggle (so it
  // also works with a mouse click and not just hover) and closing it again on
  // outside-click, Escape, or the pointer/focus genuinely leaving.
  var navDrops = Array.prototype.slice.call(document.querySelectorAll('[data-nav-drop]'));

  navDrops.forEach(function (drop) {
    var trigger = drop.querySelector('[data-nav-drop-trigger]');
    if (!trigger) return;

    function setDropOpen(open) {
      drop.classList.toggle('is-open', open);
      trigger.setAttribute('aria-expanded', String(open));
    }

    trigger.addEventListener('click', function () {
      setDropOpen(!drop.classList.contains('is-open'));
    });

    drop.addEventListener('mouseleave', function () {
      setDropOpen(false);
    });

    // Closes once Tab moves focus past the last link, since a lingering
    // `.is-open` class would otherwise keep the panel visible with nothing
    // in it focused.
    drop.addEventListener('focusout', function (event) {
      if (!drop.contains(event.relatedTarget)) setDropOpen(false);
    });

    document.addEventListener('click', function (event) {
      if (!drop.contains(event.target)) setDropOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape' || !drop.classList.contains('is-open')) return;
      setDropOpen(false);
      trigger.focus();
    });
  });

  /* Mobile: no hover, so tapping the row expands an inline list instead. */
  var mobileDrop = document.querySelector('[data-nav-drop-mobile]');
  var mobileDropTrigger = mobileDrop && mobileDrop.querySelector('[data-nav-drop-mobile-trigger]');
  var mobileDropPanel = mobileDrop && mobileDrop.querySelector('[data-nav-drop-mobile-panel]');

  function setMobileDropOpen(open) {
    if (!mobileDrop) return;
    mobileDrop.classList.toggle('is-open', open); // rotates the chevron
    mobileDropPanel.classList.toggle('hidden', !open);
    mobileDropTrigger.setAttribute('aria-expanded', String(open));
  }

  if (mobileDropTrigger && mobileDropPanel) {
    mobileDropTrigger.addEventListener('click', function () {
      setMobileDropOpen(mobileDropPanel.classList.contains('hidden'));
    });
  }

  /* --------------------------------------------------------- mobile menu */
  var toggle = document.getElementById('menu-toggle');
  var menu = document.getElementById('mobile-menu');

  function setMenu(open) {
    if (!menu || !toggle) return;
    menu.classList.toggle('hidden', !open);
    menu.setAttribute('data-open', String(open));
    toggle.setAttribute('aria-expanded', String(open));
    // So the accordion doesn't reopen already-expanded next time the menu does.
    if (!open) setMobileDropOpen(false);
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
