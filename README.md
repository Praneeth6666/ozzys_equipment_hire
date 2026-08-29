# Ozzy's Equipment Hire

Website for **Ozzy's Equipment Hire** – Melbourne-based LED and digital display solutions across Victoria.

## Stack

- React 19 + Vite 7, pre-rendered to static HTML at build time
- CSS (no framework) with custom design tokens
- `sharp` for the build-time image pipeline (dev dependency only)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

This runs three steps:

1. `npm run seo` — writes the static `public/robots.txt`.
2. `vite build` — the client bundle.
3. `node prerender.js` — for every route, renders the page to static HTML,
   inlines the CSS into `<head>` (dropping the render-blocking `<link>`), and
   writes `dist/<path>/index.html`. It then generates `sitemap.xml` and
   `llms.txt` from the real route list (see `scripts/seo-lib.mjs`) into both
   `dist/` and `public/`.

Output is in `dist/`. Every page is fully pre-rendered — the HTML contains the
complete page and the JS bundle only hydrates it.

## Pages and routing

The site is multi-page. There is no router library: each route is prerendered to
its own `index.html`, and on load the client hydrates whichever page matches
`window.location.pathname`. Navigation between pages is a normal full page load.

`src/routes.jsx` is the **single source of truth**. Each entry is
`{ path, Page, seo }`:

- `path` — the URL, e.g. `/vms-sign-hire/` (leading and trailing slash).
- `Page` — the component in `src/pages/` that renders the page body (its own
  `<main>`; `Header`, `Footer` and the breadcrumb are added by the shell).
- `seo` — `{ title, description, h1, ogType?, breadcrumb, jsonLd, hasReviews? }`.
  `renderHead()` in `src/entry-server.jsx` turns this into the per-page
  `<title>`, meta, canonical, OG tags and JSON-LD (`WebPage`/`Article`,
  `BreadcrumbList`, plus whatever objects the route lists in `jsonLd`).

### Adding a page

1. Create `src/pages/MyPage.jsx` (or `src/pages/<group>/MyPage.jsx`). Follow an
   existing one — `src/pages/VmsSignHire.jsx` for a service page,
   `src/pages/guides/GuideLayout.jsx` for a guide, `src/pages/areas/AreaLayout.jsx`
   for a location page. Export a `FAQ` array from the module if the page has an
   FAQ, so the visible FAQ and the `FAQPage` schema come from one place.
2. Add a route to `ROUTES` in `src/routes.jsx` with its `seo` (this is the
   server/prerender manifest — static imports, all pages). Helpers `serviceLd()`,
   `hireProductLd()`, `faqPage()`, `guideRoute()`, `areaRoute()` cover the common
   shapes.
3. Add a matching `'<path>': () => import('./pages/MyPage.jsx')` line to
   `src/client-routes.js` (the browser only downloads the chunk for the page
   being viewed). `prerender.js` fails the build if a route has no loader here.
4. Add it to `src/nav.js` if it belongs in the header/footer nav.

That's it — `prerender.js` emits the HTML, the sitemap and `llms.txt` pick it
up, `entry-server.jsx` renders it and `main.jsx` hydrates it.

### Content rules

Customer-facing copy follows the rules in `SEO-BUILD-PLAN.md` (answer-first, real
numbers only, no invented ABN / address / reviews, no exclamation marks or
emojis). Unknown business facts are left as `{/* TODO(owner): ... */}` markers,
which React strips from the output.

## Images

Originals live in `assets-src/`. Everything the site serves is generated from
them into `public/img/` and committed, so a normal build doesn't have to
re-encode anything:

```bash
npm run images
```

Run that after changing anything in `assets-src/`. It produces:

| Output | What it's for |
| --- | --- |
| `hero-trailer-{360,480,600,768}.{avif,webp,jpg}` | Hero photo, per breakpoint and format |
| `logo-{120,240,360,480}.{webp,png}` | Header and footer wordmark |
| `logo.png` | Stable URL for schema.org |
| `icon-{180,192,512}.png`, `icon-maskable-512.png` | Apple touch icon and manifest icons |
| `og-image.jpg` | 1200×630 social card, composed from the logo and hero photo |

### Replacing the hero photo

Drop a new file at `assets-src/trailer.jpg` and run `npm run images`. The
current original is 768×1024, which is the ceiling on how sharp the hero can
get — the script won't upscale past the source, so a 1536×2048 or larger
original is worth supplying. If you change its aspect ratio, update the
`aspect-ratio` in `src/components/Hero.css` and the `width`/`height` on the
`<img>` in `Hero.jsx` to match, or the page will shift as the image loads.

## Fonts

DM Sans and Syne are self-hosted in `public/fonts/` (latin subset, variable
weight — one file each) and declared in `src/fonts.css`, which the prerender
step inlines. They are deliberately *not* loaded from Google Fonts: that cost
two extra DNS + TLS handshakes before the browser could paint.

`src/fonts.css` also defines metric-matched fallback faces so the swap from the
system font doesn't move the layout. If you change either font family, the
`size-adjust` / `ascent-override` / `descent-override` values need recomputing
from the new font's metrics.

## Site map

| Path | Purpose |
| --- | --- |
| `/` | Overview hub — links out to every service page |
| `/vms-sign-hire/` | Cluster A keyword: `vms sign hire` |
| `/led-trailer-sign-hire-melbourne/` | Cluster A: `led trailer sign hire` (+ melbourne, + `trailer led sign hire`) |
| `/led-screen-trailer-hire/` | Cluster B: `led screen trailer`, `led trailer screen hire`, `mobile … melbourne` |
| `/pricing/` | Rate card + calculator |
| `/service-areas/` + `/service-areas/{melbourne,geelong,ballarat,bendigo,gippsland}/` | Location pages |
| `/guides/` + 4 guide articles | Supporting content |

The two keyword clusters are separate pages on purpose: Google ranks roadside
message signs and event LED video screens as different products. See
`SEO-COMPETITOR-ANALYSIS` and `SEO-BUILD-PLAN.md`.

Contact details (phone, email) are set in `Contact.jsx` and `Footer.jsx`.

### Reviews

`src/data/reviews.js` is intentionally empty. Add real, permitted customer
reviews there and the `<Reviews>` section and `AggregateRating` schema light up
automatically on the home and service pages. Never pre-fill it with invented
ratings. `src/data/videos.js` works the same way for a fleet or set-up clip.

## Analytics and Search Console

Both are opt-in; nothing loads or is verified until you add the IDs.

**Google Analytics 4** — add `VITE_GA4_ID=G-XXXXXXXXXX` to `.env` and rebuild.
The gated snippet in `index.html` only runs when that value is set; with no id,
no request is made to Google.

**Search Console verification** — in `index.html`, uncomment the
`google-site-verification` `<meta>` near the top of `<head>` and paste the token
from the "HTML tag" method. Bing Webmaster Tools can import verification from
Search Console, so it usually needs no separate tag.

**After the first deploy:**

1. In Google Search Console: submit `sitemap.xml` (Sitemaps → enter
   `sitemap.xml`), then **URL Inspection → Request indexing** on the home page
   and `/vms-sign-hire/`, `/led-trailer-sign-hire-melbourne/`,
   `/led-screen-trailer-hire/`, `/pricing/`. The site previously served a single
   keyword-stuffed page, so Google's cache needs a recrawl to pick up the new
   URLs and content.
2. In Bing Webmaster Tools: add the site and import the sitemap from Search
   Console.
3. Re-run the same steps whenever a batch of new pages ships.

### Contact form

The form is fully runnable: it uses controlled inputs, shows “Sending…”, then success or error. By default it runs in **demo mode** (no backend); submissions show a success message and the form resets.

To receive enquiries by email, create a form at [Formspree](https://formspree.io), get your form ID, then add to a `.env` file:

```
VITE_FORMSPREE_ID=your_form_id
```

Restart the dev server after adding `.env`. The form will POST to Formspree and you’ll get emails for each submission.
# ozzys_equipment_hire
