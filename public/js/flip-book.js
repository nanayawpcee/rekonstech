/* Software Solutions portfolio.
   Desktop (>= 768px): a tilted 3D book whose sheets turn around the spine.
   Phones: the same pages become a pile of documents — tap or swipe the top
   sheet to move through it. Both modes share one DOM. */
(function () {
  'use strict';

  var stage = document.getElementById('flip-book');
  if (!stage) return;

  var book = stage.querySelector('.bk-book');
  var shift = stage.querySelector('.bk-shift');
  var sheets = Array.prototype.slice.call(stage.querySelectorAll('.bk-sheet'));
  var faces = Array.prototype.slice.call(stage.querySelectorAll('.bk-face'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('[data-book-goto]'));
  var counter = document.querySelector('[data-book-counter]');
  var prevButtons = Array.prototype.slice.call(document.querySelectorAll('[data-book-prev]'));
  var nextButtons = Array.prototype.slice.call(document.querySelectorAll('[data-book-next]'));
  var tocLinks = Array.prototype.slice.call(stage.querySelectorAll('[data-goto]'));

  if (!book || !sheets.length) return;

  var SPREADS = sheets.length; // states 0..SPREADS on desktop
  var PAGES = faces.length; // pages 0..PAGES-1 in the phone pile
  var DEPTH = 0.55; // translateZ per sheet, so the block has thickness
  var TURN_MS = 1100;

  var desktop = window.matchMedia('(min-width: 768px)');
  var spread = 0; // sheets turned
  var page = 0; // top sheet of the pile

  /* ------------------------------------------------------ desktop: the book */
  function paintBook(turningIndex) {
    sheets.forEach(function (sheet, i) {
      var flipped = i < spread;
      var turning = i === turningIndex;
      var depth = turning
        ? SPREADS * DEPTH + 6
        : flipped
          ? (i + 1) * DEPTH
          : (SPREADS - i) * DEPTH;

      sheet.style.zIndex = String(turning ? SPREADS + 5 : flipped ? i + 1 : SPREADS - i);
      sheet.style.transform = 'translateZ(' + depth + 'px) rotateY(' + (flipped ? -180 : 0) + 'deg)';
      sheet.classList.toggle('is-turning', turning);

      var front = sheet.querySelector('.bk-face--front');
      var back = sheet.querySelector('.bk-face--back');
      if (front) front.setAttribute('aria-hidden', String(flipped));
      if (back) back.setAttribute('aria-hidden', String(!flipped));
    });

    // Nudge the closed book towards its cover; centre it once open.
    shift.style.setProperty('--bk-shift', spread === 0 ? '-10%' : spread === SPREADS ? '10%' : '0%');
  }

  /* --------------------------------------------------- phone: pile of paper */
  function paintPile() {
    faces.forEach(function (face, i) {
      var offset = i - page;
      var depth;

      if (offset < 0) depth = 'past';
      else if (offset > 3) depth = 'deep';
      else depth = String(offset);

      face.setAttribute('data-depth', depth);
      face.setAttribute('aria-hidden', String(offset !== 0));
      // Clear any inline 3D transform left behind by the desktop renderer.
      face.style.removeProperty('transform');
    });

    sheets.forEach(function (sheet) {
      sheet.style.removeProperty('transform');
      sheet.style.removeProperty('z-index');
      sheet.classList.remove('is-turning');
    });

    if (counter) {
      counter.textContent = String(page + 1).padStart(2, '0') + ' / ' + PAGES;
    }
  }

  function syncControls() {
    var atStart = desktop.matches ? spread === 0 : page === 0;
    var atEnd = desktop.matches ? spread === SPREADS : page === PAGES - 1;

    dots.forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === spread);
    });
    prevButtons.forEach(function (button) {
      button.disabled = atStart;
    });
    nextButtons.forEach(function (button) {
      button.disabled = atEnd;
    });
  }

  var turnTimer = null;

  function render(turningIndex) {
    if (desktop.matches) {
      faces.forEach(function (face) {
        face.removeAttribute('data-depth');
      });
      paintBook(typeof turningIndex === 'number' ? turningIndex : -1);
    } else {
      paintPile();
    }
    syncControls();
  }

  /** Desktop navigation is by spread, the phone pile is by single page. */
  function goTo(target) {
    if (desktop.matches) {
      var nextSpread = Math.max(0, Math.min(SPREADS, target));
      if (nextSpread === spread) return;
      var turningIndex = nextSpread > spread ? spread : nextSpread;
      spread = nextSpread;
      // Keep the pile in step so switching to a phone width lands nearby.
      page = Math.min(PAGES - 1, Math.max(0, spread * 2 - 1));
      render(turningIndex);

      window.clearTimeout(turnTimer);
      turnTimer = window.setTimeout(function () {
        render(-1);
      }, TURN_MS);
      return;
    }

    var nextPage = Math.max(0, Math.min(PAGES - 1, target));
    if (nextPage === page) return;
    page = nextPage;
    spread = Math.max(0, Math.min(SPREADS, Math.ceil((page + 1) / 2)));
    render();
  }

  function step(direction) {
    goTo((desktop.matches ? spread : page) + direction);
  }

  /* -------------------------------------------------------------- controls */
  nextButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      step(1);
    });
  });

  prevButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      step(-1);
    });
  });

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      goTo(desktop.matches ? i : Math.max(0, i * 2 - 1));
    });
  });

  // Contents page: jump straight to a section.
  tocLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.stopPropagation();
      var index = Number(link.dataset.goto || 0);
      goTo(desktop.matches ? 2 + index : 3 + index * 2);
    });
  });

  // Tapping the top sheet of the pile turns it, unless a control was tapped.
  book.addEventListener('click', function (event) {
    if (desktop.matches) return;
    if (event.target.closest('a, button')) return;
    step(1);
  });

  // Horizontal swipe through the pile.
  var touchX = null;
  book.addEventListener(
    'touchstart',
    function (event) {
      touchX = event.changedTouches[0].clientX;
    },
    { passive: true },
  );
  book.addEventListener(
    'touchend',
    function (event) {
      if (desktop.matches || touchX === null) return;
      var delta = event.changedTouches[0].clientX - touchX;
      if (Math.abs(delta) > 45) step(delta < 0 ? 1 : -1);
      touchX = null;
    },
    { passive: true },
  );

  stage.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      step(1);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      step(-1);
    }
  });

  /* ------------------------------------------------------ responsive scale */
  function fit() {
    if (!desktop.matches) {
      stage.style.removeProperty('--bk-scale');
      return;
    }
    // 1000px book plus room for the shift and the tilt's corner overhang.
    var scale = Math.min(stage.clientWidth / 1300, 1);
    stage.style.setProperty('--bk-scale', String(Math.max(scale, 0.5)));
  }

  /* ------------------------------------------------- deep link to a spread */
  // /services/software-solutions#page-3 opens the book on that spread.
  function openFromHash() {
    var match = /^#page-(\d+)$/.exec(window.location.hash);
    if (!match) return;
    spread = Math.max(0, Math.min(SPREADS, Number(match[1])));
    page = Math.min(PAGES - 1, Math.max(0, spread * 2 - 1));
  }

  window.addEventListener('resize', fit);
  desktop.addEventListener('change', function () {
    fit();
    render(-1);
  });

  fit();
  openFromHash();
  render(-1);
})();
