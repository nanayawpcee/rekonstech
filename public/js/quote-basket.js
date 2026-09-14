/* Quote basket for the Sales & Supply catalogue.
   Collects items in localStorage and attaches them to the existing service
   request as one itemised enquiry. No payments, no checkout — the price is
   confirmed on quotation, so the basket is a shopping list, not an order. */
(function () {
  'use strict';

  var root = document.getElementById('quote-basket');
  var grid = document.getElementById('catalogue-grid');
  if (!root || !grid) return;

  var STORAGE_KEY = 'rk-quote-basket';
  var CURRENCY = 'GH₵';
  // Catalogue prices are placeholders until Sanity supplies real ones — see
  // catalogueMeta.showPricing in src/content/catalogue.content.ts, the single
  // switch that also hides price on the cards and in the drawer's markup.
  var SHOW_PRICING = grid.dataset.showPricing === 'true';

  var drawer = root.querySelector('#qb-drawer');
  var scrim = root.querySelector('.qb-scrim');
  var linesEl = root.querySelector('[data-qb-lines]');
  var emptyEl = root.querySelector('[data-qb-empty]');
  var countEl = root.querySelector('[data-qb-count]');
  var totalEl = root.querySelector('[data-qb-total]');
  var subtitleEl = root.querySelector('[data-qb-subtitle]');
  var openButton = root.querySelector('[data-qb-open]');

  /** Storage can throw in private mode; the basket is a convenience, not state we must keep. */
  function read() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function write(items) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      /* out of quota or blocked — the in-memory basket still works */
    }
  }

  var basket = read();

  function money(amount) {
    return CURRENCY + ' ' + amount.toLocaleString('en-GH');
  }

  function totalOf(items) {
    return items.reduce(function (sum, line) {
      return sum + line.price * line.qty;
    }, 0);
  }

  function countOf(items) {
    return items.reduce(function (sum, line) {
      return sum + line.qty;
    }, 0);
  }

  /** Readable summary posted with the request — this is what lands in your inbox. */
  function summarise(items) {
    if (!items.length) return '';
    var lines = items.map(function (line) {
      var entry = line.qty + ' x ' + line.name + ' (' + line.sku + ')';
      return SHOW_PRICING ? entry + ' @ ' + money(line.price) : entry;
    });
    return SHOW_PRICING ? lines.join('; ') + ' — indicative total ' + money(totalOf(items)) : lines.join('; ');
  }

  /* ---------------------------------------------------------------- render */
  function render() {
    linesEl.textContent = '';

    basket.forEach(function (line, index) {
      var li = document.createElement('li');
      li.className = 'qb-line';

      var info = document.createElement('div');
      info.className = 'min-w-0 flex-1';
      var name = document.createElement('p');
      name.className = 'truncate text-[13px] font-bold text-ink-900';
      name.textContent = line.name;
      info.appendChild(name);

      if (SHOW_PRICING) {
        var price = document.createElement('p');
        price.className = 'mt-0.5 font-mono text-[11px] text-ink-400';
        price.textContent = money(line.price) + ' each';
        info.appendChild(price);
      }

      var controls = document.createElement('div');
      controls.className = 'flex items-center gap-1.5';

      function stepper(label, delta) {
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'qb-step';
        button.textContent = label;
        button.setAttribute('aria-label', (delta > 0 ? 'Increase' : 'Decrease') + ' ' + line.name);
        button.addEventListener('click', function () {
          changeQty(index, delta);
        });
        return button;
      }

      var qty = document.createElement('span');
      qty.className = 'w-6 text-center font-mono text-[13px] font-bold text-ink-800';
      qty.textContent = String(line.qty);

      controls.appendChild(stepper('−', -1));
      controls.appendChild(qty);
      controls.appendChild(stepper('+', 1));

      li.appendChild(info);
      li.appendChild(controls);
      linesEl.appendChild(li);
    });

    var count = countOf(basket);
    countEl.textContent = String(count);
    // totalEl only exists in the DOM when catalogueMeta.showPricing is true.
    if (totalEl) totalEl.textContent = money(totalOf(basket));
    emptyEl.hidden = basket.length > 0;
    subtitleEl.textContent = count
      ? count + (count === 1 ? ' item' : ' items') + ' collected'
      : 'No items yet';
    root.hidden = false;

    syncForm();
  }

  function changeQty(index, delta) {
    var line = basket[index];
    if (!line) return;
    line.qty += delta;
    if (line.qty < 1) basket.splice(index, 1);
    write(basket);
    render();
  }

  /* ------------------------------------------------- attach to the request */
  function syncForm() {
    var field = document.querySelector('[data-basket-field]');
    var note = document.querySelector('[data-basket-note]');
    var summary = summarise(basket);

    if (field) field.value = summary;
    if (note) {
      note.textContent = summary
        ? countOf(basket) + ' item(s) from your quote will be attached to this request.'
        : '';
      note.hidden = !summary;
    }
  }

  /* -------------------------------------------------------------- drawer */
  function setOpen(open) {
    drawer.hidden = !open;
    scrim.hidden = !open;
    openButton.setAttribute('aria-expanded', String(open));
    root.classList.toggle('is-open', open);
  }

  openButton.addEventListener('click', function () {
    setOpen(drawer.hidden);
  });

  root.querySelectorAll('[data-qb-close]').forEach(function (element) {
    element.addEventListener('click', function () {
      setOpen(false);
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') setOpen(false);
  });

  root.querySelector('[data-qb-clear]').addEventListener('click', function () {
    basket = [];
    write(basket);
    render();
  });

  root.querySelector('[data-qb-send]').addEventListener('click', function () {
    setOpen(false);
  });

  /* ------------------------------------------------------ add to the quote */
  grid.querySelectorAll('[data-add-to-quote]').forEach(function (button) {
    button.addEventListener('click', function () {
      var card = button.closest('[data-product]');
      if (!card) return;

      var sku = card.dataset.sku;
      var existing = null;
      basket.forEach(function (line) {
        if (line.sku === sku) existing = line;
      });

      if (existing) {
        existing.qty += 1;
      } else {
        basket.push({
          sku: sku,
          name: card.dataset.name,
          price: Number(card.dataset.price) || 0,
          qty: 1,
        });
      }

      write(basket);
      render();
      setOpen(true);
    });
  });

  /* ------------------------------------------------------ category filter */
  var filters = Array.prototype.slice.call(document.querySelectorAll('[data-cat-filter]'));
  var products = Array.prototype.slice.call(grid.querySelectorAll('[data-product]'));

  filters.forEach(function (button) {
    button.addEventListener('click', function () {
      var value = button.dataset.catFilter;
      filters.forEach(function (other) {
        other.setAttribute('aria-selected', String(other === button));
      });
      products.forEach(function (card) {
        var match = value === 'all' || card.dataset.category.toLowerCase() === value;
        card.hidden = !match;
      });
    });
  });

  render();
})();
