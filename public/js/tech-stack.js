/* "What We Build With" grid — category filter + spotlight cell.
   Loaded only on the Software Solutions page. Without JS the grid still
   renders every technology; only the filtering and spotlight are lost. */
(function () {
  'use strict';

  var grid = document.getElementById('tech-grid');
  var spotlight = document.getElementById('tech-spotlight');
  if (!grid || !spotlight) return;

  var tiles = Array.prototype.slice.call(grid.querySelectorAll('[data-tech]'));
  var filters = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));

  var idle = spotlight.querySelector('[data-spotlight-idle]');
  var live = spotlight.querySelector('[data-spotlight-live]');
  var iconSlot = spotlight.querySelector('[data-spot-icon]');
  var nameSlot = spotlight.querySelector('[data-spot-name]');
  var blurbSlot = spotlight.querySelector('[data-spot-blurb]');
  var closeButton = spotlight.querySelector('[data-spot-close]');

  var phone = window.matchMedia('(max-width: 767px)');
  var activeTile = null;
  var resetTimer = null;

  /* ---------------------------------------------- phone: follow the selection
     The card keeps its grid-cell look but is positioned over the mosaic, in the
     row directly below the tapped tile (above it when there is no room), so the
     details always appear right where you are looking. */
  function placeNearTile(tile) {
    if (!phone.matches) {
      spotlight.style.removeProperty('top');
      spotlight.style.removeProperty('left');
      spotlight.style.removeProperty('width');
      spotlight.style.removeProperty('height');
      return;
    }

    var gridBox = grid.getBoundingClientRect();
    var tileBox = tile.getBoundingClientRect();
    var gap = 3;
    var cardHeight = tileBox.height * 2 + gap; // same two rows as the desktop cell
    var below = tileBox.bottom - gridBox.top + gap;
    var above = tileBox.top - gridBox.top - cardHeight - gap;

    // Prefer sitting under the tile; flip above it near the end of the mosaic.
    var top = below + cardHeight <= grid.clientHeight ? below : above;

    spotlight.style.top = Math.max(0, Math.round(top)) + 'px';
    spotlight.style.left = '0px';
    spotlight.style.width = grid.clientWidth + 'px';
    spotlight.style.height = Math.round(cardHeight) + 'px';
  }

  /* ------------------------------------------------------------ spotlight */
  function showIdle() {
    if (activeTile) activeTile.classList.remove('is-active');
    activeTile = null;

    // Drop every inline brand colour so the card falls back to its dark class.
    spotlight.classList.remove('is-live');
    spotlight.style.backgroundColor = '';
    nameSlot.style.color = '';
    blurbSlot.style.color = '';
    blurbSlot.style.opacity = '';
    if (closeButton) {
      closeButton.style.backgroundColor = '';
      closeButton.style.color = '';
    }

    idle.classList.remove('hidden');
    idle.classList.add('flex');
    live.classList.add('hidden');
    live.classList.remove('flex');
  }

  function showTech(tile) {
    if (activeTile === tile) return;
    if (activeTile) activeTile.classList.remove('is-active');
    activeTile = tile;
    tile.classList.add('is-active');

    // Clone the tile's own mark rather than rebuilding markup from a string.
    var mark = tile.querySelector('svg, .tech-word');
    iconSlot.textContent = '';

    // The whole card takes the technology's brand colour, with the mark and
    // copy in whichever ink stays readable on it. That also fixes logos that
    // are a solid block with their detail knocked *out* of them (JavaScript,
    // TypeScript) — against a white card the cut-out filled with white and the
    // mark read as a featureless blob.
    var brand = tile.dataset.brand || '#0B1424';
    var onBrand = tile.dataset.onBrand || '#FFFFFF';

    spotlight.style.backgroundColor = brand;
    nameSlot.style.color = onBrand;
    blurbSlot.style.color = onBrand;
    blurbSlot.style.opacity = '0.82';
    if (closeButton) {
      closeButton.style.backgroundColor = 'rgba(0, 0, 0, 0.12)';
      closeButton.style.color = onBrand;
    }

    if (mark) {
      var clone = mark.cloneNode(true);
      if (clone.tagName && clone.tagName.toLowerCase() === 'svg') {
        clone.setAttribute('width', '46');
        clone.setAttribute('height', '46');
        clone.style.fill = onBrand;
      } else {
        clone.style.color = onBrand;
        clone.style.fontSize = '18px';
      }
      iconSlot.appendChild(clone);
    }

    nameSlot.textContent = tile.dataset.name || '';
    blurbSlot.textContent = tile.dataset.blurb || '';

    spotlight.classList.add('is-live');
    idle.classList.add('hidden');
    idle.classList.remove('flex');
    live.classList.remove('hidden');
    live.classList.add('flex');

    placeNearTile(tile);
  }

  tiles.forEach(function (tile) {
    tile.addEventListener('mouseenter', function () {
      window.clearTimeout(resetTimer);
      showTech(tile);
    });
    tile.addEventListener('focus', function () {
      showTech(tile);
    });
    // Tap on touch devices, and keyboard activation. A tap also fires a
    // synthetic mouseenter first, so this must stay idempotent — never a
    // toggle, or the first tap would show the card and then hide it again.
    tile.addEventListener('click', function () {
      showTech(tile);
    });
  });

  grid.addEventListener('mouseleave', function () {
    if (phone.matches) return;
    // Small delay so moving between tiles does not flash the idle state.
    resetTimer = window.setTimeout(showIdle, 220);
  });

  if (closeButton) {
    closeButton.addEventListener('click', showIdle);
  }

  // Tile geometry changes with the viewport, so re-anchor the open card.
  window.addEventListener('resize', function () {
    if (activeTile) placeNearTile(activeTile);
  });

  phone.addEventListener('change', showIdle);

  /* --------------------------------------------------------------- filter */
  function applyFilter(value) {
    tiles.forEach(function (tile) {
      var match = value === 'all' || tile.dataset.category.toLowerCase() === value;
      if (match) {
        tile.removeAttribute('hidden');
      } else {
        tile.setAttribute('hidden', '');
      }
    });

    // A hidden tile must not keep the spotlight; a visible one has moved, so
    // the card has to follow it to its new position in the filtered grid.
    if (activeTile && activeTile.hasAttribute('hidden')) showIdle();
    else if (activeTile) placeNearTile(activeTile);
  }

  filters.forEach(function (button, index) {
    button.addEventListener('click', function () {
      filters.forEach(function (other) {
        other.setAttribute('aria-selected', String(other === button));
      });
      applyFilter(button.dataset.filter);
    });

    button.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      var step = event.key === 'ArrowRight' ? 1 : -1;
      filters[(index + step + filters.length) % filters.length].focus();
    });
  });
})();
