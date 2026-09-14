# rekonstech — Homepage Landing Page

High-converting single-page landing site for **rekonstech Consulting and Trading Services**, built
with **NestJS + Handlebars + Tailwind CSS**. Server-rendered HTML, no client framework — the whole
page is ~40 KB of CSS and ~6 KB of JavaScript, and every interactive feature degrades gracefully
when JavaScript is unavailable.

---

## Quick start

```bash
npm install
```

```bash
npm run start:dev
```

Then open <http://localhost:3000>. `start:dev` runs the Tailwind watcher and the Nest watcher side
by side, so edits to `.hbs`, `.ts` or `.css` files rebuild automatically.

Production:

```bash
npm run build && npm run start:prod
```

`PORT` overrides the default 3000.

---

## Page structure

Each numbered section from the brief maps to one Handlebars partial in `views/partials/`:

| #   | Section                                                           | Partial                  |
| --- | ----------------------------------------------------------------- | ------------------------ |
| 1   | Top bar — phone, email, 24/7 line, emergency CTA pill             | `top-bar.hbs`            |
| 2   | Hero — logo, nav, headline, dual CTAs, social proof, trust badges | `header.hbs`, `hero.hbs` |
| 3   | Quick service request bar (name, phone, category, submit)         | `request-bar.hbs`        |
| 4   | Who We Are — image composition + Mission/Expertise/Values tabs    | `about.hbs`              |
| 5   | Key metrics counter bar                                           | `stats.hbs`              |
| 6   | Services portfolio — all five service lines                       | `services.hbs`           |
| —   | Closing CTA band                                                  | `cta-band.hbs`           |
| —   | Footer with full contact block (`#contact`)                       | `footer.hbs`             |

`views/index.hbs` assembles them; `views/layouts/main.hbs` holds `<head>`, fonts, Open Graph tags
and JSON-LD `ProfessionalService` structured data.

---

## Software Solutions page — `/services/software-solutions`

A second, deliberately darker page for the software service line. Linked from the Software
Solutions card on the homepage and from the footer.

| Section                 | Partial                                             | Notes                                                                                                                                                                                                                                       |
| ----------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Space hero              | `space-backdrop.hbs`                                | Starfield, drifting nebulae, orbiting bodies and shooting stars — CSS animation only. Stars are generated **server-side** from a fixed seed (`src/content/starfield.ts`) so the sky is there on first paint and identical on every request. |
| The portfolio flip-book | `flip-book.hbs`, `book-page.hbs`, `book-mockup.hbs` | See below.                                                                                                                                                                                                                                  |
| How we work             | inline in `software-solutions.hbs`                  | Five-step process.                                                                                                                                                                                                                          |
| What We Build With      | `tech-stack.hbs`                                    | A "sun" with concentric orbit rings behind an oversized heading, then a filterable mosaic of 52 technologies.                                                                                                                               |
| Conversion              | `request-bar.hbs`                                   | The homepage's request form, reused with **Software Solutions** pre-selected.                                                                                                                                                               |

### The flip-book

Content lives in [`src/content/software-book.content.ts`](src/content/software-book.content.ts) as
_sheets_, each holding a front and a back page. Turning a sheet reveals its back on the left and the
next sheet's front on the right — a real printed spread.

- **Desktop** — a tilted 3D book. Click the page edges, use the arrows or dots, or press `←` / `→`.
  `#page-3` in the URL opens the book on that spread, so a specific spread can be shared.
- **Phones** — the same DOM, no 3D: CSS turns the pages into a **pile of documents**, the current
  page on top with the next few peeking out beneath at slight angles. Tap or swipe to leaf through;
  a page counter replaces the dots.
- Each section page prints an **interface mockup** (`dashboard`, `website`, `monitoring`) built
  entirely from markup — no screenshots to go stale or slow the page down. Add a new one by adding a
  branch to `book-mockup.hbs` and setting `mockup:` on the page.

### The technology grid

Brand marks come from the `simple-icons` package, inlined as single-path SVG — accurate logos with
no icon CDN. Hovering (or tapping) a tile turns the **whole spotlight card** that technology's
brand colour — JavaScript yellow, TypeScript blue, AWS orange — with the mark and copy drawn in
whichever ink stays readable on it.

Each item therefore carries three colours, resolved in `tech-stack.ts`:

| Field      | Used for                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------ |
| `brandHex` | the true brand colour — fills the spotlight card                                                                   |
| `color`    | the mark on the dark mosaic tiles; near-black brands (Next.js, GitHub) lighten to white so they stay visible there |
| `onBrand`  | ink for text and the mark **on** `brandHex`, picked by luminance                                                   |

Colouring the card also fixes a class of logo that broke on a white card: several marks
(JavaScript, TypeScript) are a solid block with their detail knocked _out_ of the shape, so the
cut-out takes the colour behind it. Against white, JavaScript's letters filled with white and the
mark read as a featureless yellow blob.

On phones the spotlight keeps the same card but stops being the fixed first cell: a single tap
lifts it out of the grid flow and slides it to the row directly **below the tile you tapped** — or
above it for tiles in the last rows — so the details always appear where you are looking instead of
scrolled off the top. Note that a tap fires a synthetic `mouseenter` before `click`, so the tile
handlers must stay idempotent; making the tap a toggle silently costs you the first tap. Two logos (**AWS**, **Slack**) were withdrawn from `simple-icons` for
trademark reasons and render as wordmark tiles instead, as the source design does.

Edit the catalogue in [`src/content/tech-stack.ts`](src/content/tech-stack.ts) — adding an entry
adds the tile and, if it introduces a new category, the filter pill too.

---

## Editing content

**All copy lives in one file: [`src/content/site.content.ts`](src/content/site.content.ts).** Phone
numbers, email, headline, tabs, stats, the whole service catalogue and footer links are typed
objects — no markup editing required.

Adding a service category to `site.services.categories` automatically:

- renders a new card in the services grid, and
- adds an option to the request form's dropdown (`serviceCategoryOptions` is derived from it), and
- extends the server-side whitelist the DTO validates against.

Icons are inline SVGs in [`src/content/icons.ts`](src/content/icons.ts), rendered through the
`{{{icon "name" "h-6 w-6"}}}` Handlebars helper. Add an entry there to use a new one.

### Before launch — placeholder data to replace

| What                                                           | Where                                                                                                                                                    |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Phone, emergency line, email, address, hours                   | `site.company` (marked `TODO`)                                                                                                                           |
| Trust badges (“Certified Engineers”, “Authorised Reseller”, …) | `site.hero.badges` — replace with your real certifications and vendor partnerships                                                                       |
| “10K+ happy clients”, “15+ years”, “99% satisfaction”          | `site.hero.socialProof`, `site.stats`                                                                                                                    |
| Stock photography (Unsplash hotlinks)                          | `site.hero.image`, `site.about.image`, `site.about.insetImage`, `site.ctaBand.image` — drop real photos into `public/img/` and point these at `/img/...` |

---

## Brand assets

The official logo drives both the artwork and the colour system.

| File                         | What it is                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------ |
| `public/img/logo.png`        | The original supplied artwork, untouched (transparent PNG)                           |
| `public/img/logo-mark.png`   | The RK mark alone, trimmed and sized for display — **used in the header and footer** |
| `public/img/logo-full.png`   | The complete stacked lockup, trimmed of empty margin (reference only)                |
| `public/img/favicon-512.png` | The mark on a square canvas, used as favicon and Apple touch icon                    |

The header/footer lockup ([`views/partials/logo.hbs`](views/partials/logo.hbs)) pairs the mark image
with a **live-text** wordmark rather than a flattened image, so the type stays razor sharp at every
size and in every dark/light state. `{{> logo tone="dark"}}` renders the reversed version.

Palette values are sampled from the artwork itself: **blue `#1A75BC`** (`brand-600`), **green
`#66D110`** (`accent-500`), and the mark's chartreuse **`#D3D506`** (available as `spark`).

> **Note:** the site spells the brand **rekonstech**, while the raster wordmark baked into
> `logo.png` / `logo-full.png` reads _Reconstech_. Only the mark is displayed, so the two never
> appear together — but don't swap `logo-full.png` into the header without regenerating that
> artwork with the correct spelling.

---

## Design system

Defined in `tailwind.config.js` and `src/styles/tailwind.css`:

- **`ink`** — deep navy, used for headings, the hero and the footer.
- **`brand`** — rekonstech blue (from the RK mark); primary actions and links.
- **`accent`** — rekonstech lime; high-contrast CTAs, checkmarks and highlights.
- Type: **Plus Jakarta Sans** for headings, **Inter** for body.
- Component classes (`.btn-primary`, `.btn-outline`, `.field`, `.card`, `.eyebrow`, `.tab-btn`)
  keep the markup readable instead of repeating twenty utilities per element.

Responsive at 375 / 768 / 1024 / 1440+, with no horizontal overflow at any width.

---

## Deploying to Vercel

The project is configured for Vercel out of the box. Import the repository and
deploy — [`vercel.json`](vercel.json) supplies the build command, the static
root and the function config, so there is nothing to set in the dashboard.

**Set one environment variable before launch:**

| Variable | Why |
|---|---|
| `SERVICE_REQUEST_WEBHOOK_URL` | Where quote requests are delivered. Any endpoint accepting a JSON POST — Zapier, Make, Formspree, n8n, your own inbox service. |

Without it, enquiries are only written to the function logs. See *Where requests
go* below.

### How it fits together

- **`api/index.ts`** is the serverless entry. It boots Nest once per warm
  instance behind an Express adapter and caches the promise, so concurrent
  requests during a cold start share one initialisation.
- It imports from **`dist/`, not `src/`**. Vercel compiles this directory with
  esbuild, which does not support `emitDecoratorMetadata` — and Nest's
  constructor injection depends on that metadata. `npm run build` compiles the
  app with tsc, leaving esbuild only this thin adapter. Do not "simplify" the
  import to `../src`: DI will fail at runtime, not at build time.
- **Static assets are served by the CDN**, not the function: `outputDirectory`
  is `public`, so `/css`, `/js` and `/img` are matched on the filesystem before
  the rewrite sends anything else to the function.
- **`views/**` is bundled with the function** via `includeFiles`, because the
  templates are read from disk at runtime rather than imported.
- `resolveProjectRoot()` in [`src/bootstrap.ts`](src/bootstrap.ts) probes for the
  views directory instead of assuming a layout, so the same code runs under
  `npm start`, on Vercel, and from any working directory.

### Where requests go

Serverless filesystems are read-only apart from an ephemeral `/tmp`, so the
JSONL file used in development is not a durable sink in production. The service
picks one at boot:

1. `SERVICE_REQUEST_WEBHOOK_URL` if set — POSTs the record as JSON.
2. Otherwise a local `data/service-requests.jsonl`, when the directory is
   writable (development).
3. Otherwise the enquiry is logged **in full**, tagged `UNDELIVERED SERVICE
   REQUEST`, and a warning at boot says how to fix it. Losing a customer's
   request is worse than putting their details in an access-controlled log.

A submission never fails because the sink is down — a webhook error is logged
and the record falls through to the log, so the visitor still gets their
confirmation.

### Two caveats

- **Rate limiting is per instance.** The throttler keeps its counters in memory,
  so the 5-per-minute cap applies per warm lambda rather than globally. It still
  stops casual abuse; for a hard limit, move the throttler to Redis.
- **Cold starts.** The first request after idle pays the Nest bootstrap. It is a
  small app, but expect a slower first paint.

---

## Service request API

`POST /api/service-requests`

```json
{
  "fullName": "Ama Mensah",
  "phone": "+233 24 111 2222",
  "serviceCategory": "security-systems",
  "email": "ama@example.com",
  "message": "optional"
}
```

Responses: `201 { ok, reference, message }` · `400 { ok: false, errors: [...] }` ·
`429` when rate limited.

- **Validation** — `class-validator` DTO; `serviceCategory` must match a slug from the catalogue.
- **Rate limiting** — 5 submissions per minute per IP (`@nestjs/throttler`).
- **Honeypot** — a hidden `company` field; filled means bot, so the request is discarded and a
  success response is returned anyway.
- **No-JavaScript path** — the same endpoint accepts a normal form post and answers with
  `303 See Other` back to `/?submitted=1#request` (or `/?error=…` on validation failure), which the
  page renders as an inline banner.
- **Storage** — appended to `data/service-requests.jsonl` (git-ignored). Swap
  `ServiceRequestsService.persist()` for your CRM, mailer or database; nothing else changes.

`GET /healthz` returns `{ status, uptime }` for uptime checks.

---

## Progressive enhancement

`public/js/site.js` adds, and the page works without: sticky/solid header on scroll, mobile menu,
Mission/Expertise/Values tabs (arrow-key navigable, WAI-ARIA tabs pattern), scroll reveals, stat
count-ups, service-card → dropdown preselection, and async form submission. Without JavaScript the
header simply is not sticky, the three tab panels stack (a `<noscript>` rule un-hides them so no
content becomes unreachable), content is visible immediately, and the form posts normally. `prefers-reduced-motion` disables reveals, count-up and smooth scrolling.
