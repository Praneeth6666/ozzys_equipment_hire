# SEO multi-page rebuild — build plan

Durable checklist for turning the single-page site into the multi-page structure the
competitor analysis calls for. **Any session (a person, or the resume cron) continues
by doing the next `[ ]` task.** State lives here, in git — not in a scheduler.

- Branch: `seo/multi-page-rebuild`
- Analysis this implements: "Eight Keywords, Two Clusters"
  (https://claude.ai/code/artifact/d9e0eb46-5d5a-4364-a309-2fe3e8bd9ef8)
- Rule: **one task per run.** Do the next `[ ]`, run `npm run build` **and** `npm run lint`
  (both must pass), mark it `[x]` with a one-line note + commit sha, `git commit`
  (local, on this branch — do **not** push). Then stop.
- If a task can't be made to pass, revert its changes, leave it `[ ]`, and add a
  `> blocked:` note explaining why.

---

## Why this work

The 8 target keywords are two products Google ranks separately (roadside message/VMS
signs vs event LED video screens). One URL can't win both. Every ranking competitor
runs a multi-page hub; the current site is one `index.html` targeting all 8 terms with
the same copy reworded — a quality risk in itself. This rebuild gives each cluster its
own dedicated, genuinely distinct page plus the local + supporting pages the
competitors lack.

---

## Architecture (target)

Minimal in-house routing + multi-target prerender. **No React Router.** Full page
loads between routes; each page hydrates itself.

```
src/routes.jsx        ROUTES: [{ path, Page, seo }]  — the single source of truth
src/pages/*.jsx       one component per page; renders <main> content only
src/App.jsx           App({ path }) -> <Header/> <Page/> <Contact/> <Footer/>
src/entry-server.jsx  render(path) -> { appHtml };  renderHead(path) -> <head> inner HTML
src/main.jsx          hydrateRoot(root, <App path={location.pathname} />)
prerender.js          for each ROUTE: write dist/<path>/index.html with per-page
                      <head> (title, description, canonical, OG, JSON-LD) + prerendered body
index.html            global <head> only: charset, viewport, fonts preload, favicon,
                      manifest, theme-color, module script, global JSON-LD
                      (Organization, WebSite+SearchAction)
scripts/generate-seo.mjs   builds sitemap.xml / robots.txt / llms.txt from ROUTES
```

Per-page `seo` object shape:
```js
{
  title: '…',                 // <=60 chars, exact target phrase near the front
  description: '…',            // 140–160 chars
  h1: '…',                     // exact target phrase, distinct from <title>
  path: '/vms-sign-hire/',
  breadcrumb: [['Home','/'], ['VMS Sign Hire','/vms-sign-hire/']],
  jsonLd: [ /* Service, Product/Offer, FAQPage, BreadcrumbList objects */ ],
}
```

Every page: target phrase in URL slug + `<title>` + `<h1>` + first paragraph.
Every money page: specs table, an FAQ rendered as HTML **and** `FAQPage` JSON-LD,
2–4 contextual internal links to sibling pages / guides, a link to `/pricing/`.

---

## Content rules (from CLAUDE.md — non-negotiable)

- Never use: "unlock", "leverage", "seamless", "world-class", "in today's fast-paced
  world". No exclamation marks. No emojis.
- Start with the answer, then context.
- Use the real numbers below, never rounded, never invented.
- Say plainly when NOT to hire us (one honest "not for you if…" line per money page).
- Do not invent: ABN, street/depot address, owner name, years trading, job counts,
  review count or rating, insurer. Where a page wants one, leave
  `{/* TODO(owner): confirm X */}` and omit it from visible copy + schema.
- Re-read your draft and delete anything that reads as AI-written boilerplate.

### Canonical numbers

| Contract length | Per day (ex GST) | Approx. monthly (30 days, ex GST) |
|---|---|---|
| 12 months | $45 | $1,350 |
| 6 months  | $50 | $1,500 |
| 3 months  | $60 | $1,800 |
| 1 month   | $70 | $2,100 |
| Under 1 month | $75 | $2,250 |
| 1–6 days  | flat $500 + 8% insurance | — |

- Insurance: 8% of total hire price. Client supplies a 15A power connection.
- Delivery, setup & installation: one-off $350 for hires under 3 months; self-pickup
  available.
- Phone 0469 316 068 · ozzysequipmenthire@gmail.com
- Service area: Greater Melbourne + Geelong, Ballarat, Bendigo, Gippsland, regional
  Victoria. Suburb list is in `src/data/seo.js` (`SERVICE_AREAS`).

### Keyword → page map

| Page | Primary phrase(s) |
|---|---|
| `/vms-sign-hire/` | vms sign hire (140) |
| `/led-trailer-sign-hire-melbourne/` | led trailer sign hire (110) · led trailer sign hire melbourne (50) · trailer led sign hire (40) |
| `/led-screen-trailer-hire/` | led screen trailer (40) · led trailer screen hire (30) · mobile led screen trailer hire melbourne (30) · mobile trailer led screen hire melbourne (20) |

---

## Tasks

### Group 0 — routing infrastructure (do first; unlocks the rest)

- [x] **0.1 Route manifest + path-aware render.**
  Add `src/routes.jsx` exporting `ROUTES` with a single entry for `/` pointing at a new
  `src/pages/Home.jsx` (move the current `App` body — Hero…Contact — into it).
  `App.jsx` → `App({ path })` looks up the route, renders `<Header/>` + page + `<Footer/>`
  (Contact stays inside Home for now). `entry-server.jsx` → `render(path='/')`.
  `main.jsx` → pass `window.location.pathname`.
  Accept: `npm run build` output is home, still fully pre-rendered, hydrates with no
  console error; `npm run lint` clean.

- [x] **0.2 Multi-target prerender.**
  Rewrite `prerender.js` to import `{ ROUTES }` and loop: for each route write
  `dist/<path>/index.html` (`/` → `dist/index.html`), body from `render(path)`, CSS
  still inlined. With only `/` in ROUTES the output matches 0.1.
  Accept: `dist/index.html` unchanged in substance; build + lint clean.

- [x] **0.3 Per-page `<head>` builder.**
  Add `renderHead(path)` to `entry-server.jsx`: returns title, meta description,
  canonical, OG/Twitter, hreflang, and the route's `jsonLd` as `<script type="application/ld+json">`
  blocks, from the route `seo` + shared constants. `prerender.js` injects it.
  Strip the per-page tags (title, description, canonical, OG, page-level JSON-LD:
  WebPage/Service/Breadcrumb/Product/FAQPage, hero image preload) out of `index.html`;
  leave global ones (Organization, WebSite). Move the hero `<link rel=preload as=image>`
  into `renderHead('/')`.
  Accept: home `<head>` is equivalent to before (diff the JSON-LD); build + lint clean.

### Group 1 — money pages

- [x] **1.1 `/vms-sign-hire/`.**
  New `src/pages/VmsSignHire.jsx` + route + `seo` (Service + Product/AggregateOffer +
  FAQPage + BreadcrumbList JSON-LD). ~1,300–1,700 words, genuinely distinct from the
  other pages. Cover: what a VMS board is, Class A/B/C and sizes, common uses
  (roadworks, traffic management, road closures, events, site safety), programming /
  remote message updates, AS 4852 relevance, delivery + setup + the 15A power note,
  a rendered rate summary linking to `/pricing/`, a 5–7 question FAQ, one honest
  "not the right hire if…" line, 2–3 internal links (led-trailer-sign page, pricing,
  the cost guide once it exists). Add the page to `scripts/generate-seo.mjs` ROUTES /
  sitemap. Real photos: reference `/img/hero-trailer-*` for now + `{/* TODO(owner):
  add VMS board photos */}`.
  Accept: page renders at `/vms-sign-hire/`, valid JSON-LD, build + lint clean.

- [x] **1.2 `/led-trailer-sign-hire-melbourne/`.**
  Page + route + schema. Targets the 3 sign-cluster "led/trailer … sign hire" phrases.
  Event + roadside-advertising framing (festivals, sport, retail activations, campaigns,
  council works). Include: full-colour vs amber, screen sizes, brightness, solar vs
  mains, delivery across the suburb list (pull from `SERVICE_AREAS`), turnaround,
  content/artwork support, rate summary + `/pricing/` link, 5–7 Q FAQ, "not for you
  if…", internal links (VMS page, LED screen page, areas, guides). Sitemap entry.
  Accept: renders, valid JSON-LD, build + lint clean.

- [x] **1.3 `/led-screen-trailer-hire/`.**
  Page + route + schema. The event-video-screen cluster (new territory). Cover: what a
  mobile LED screen trailer is vs a message sign, pixel pitch (Pic the real fleet
  values if known, else describe the range) and what it means for viewing distance,
  screen area in m², daylight brightness / nits, onboard power + audio, hydraulic lift
  if applicable {/* TODO(owner): confirm fleet specs */}, setup time, delivery radius,
  event use-cases (festivals, sport, outdoor cinema, brand activations, community
  events), rate summary + `/pricing/` link, 5–7 Q FAQ, "not for you if…", internal
  links. Sitemap entry.
  Accept: renders, valid JSON-LD, build + lint clean.

- [x] **1.4 `/pricing/`.**
  Move the `Pricing` component + calculator to its own page + route. Add the full rate
  table and notes as crawlable HTML (not only the JS widget). Product/AggregateOffer +
  a "how much does it cost" FAQPage. Link to it from the 3 money pages and the nav.
  Home keeps only a short "from $45/day ex GST" teaser linking here.
  Accept: calculator works on `/pricing/`, rates present in static HTML, build + lint clean.

- [x] **1.5 Rework home `/`.**
  Trim `Home.jsx` to: Hero (copy distinct from the service pages), 3-card Services
  overview linking to the 3 money pages, short About, a Service-areas teaser linking to
  `/service-areas/`, Contact. **Remove `IntentContent`** (its comparison value moves to
  a guide). Rewrite the home `seo` (title/description/H1/JSON-LD) so it's a brand +
  overview page, not a keyword-stuffed one.
  Accept: home no longer repeats the 8 phrases verbatim; build + lint clean.

### Group 2 — local + supporting pages

- [x] **2.1 `/service-areas/` hub + `/service-areas/melbourne/`.**
  Hub lists all areas + links each service page. Melbourne page: ~500 words, named
  suburbs from `SERVICE_AREAS`, delivery/turnaround, LocalBusiness + Service JSON-LD
  with `areaServed`. Sitemap entries.
  Accept: both render, valid JSON-LD, build + lint clean.

- [x] **2.2 Regional location pages.**
  `/service-areas/geelong/`, `/ballarat/`, `/bendigo/`, `/gippsland/` — ~350–500 words
  each, genuinely localised (not find/replace), lead times honest about travel from
  Melbourne, links back to the 3 money pages. One commit. Sitemap entries.
  Accept: 4 pages render, JSON-LD valid, build + lint clean.

- [x] **2.3 `/guides/` hub.**
  Hub page + route listing the 4 guides with summaries. Sitemap entry.
  Accept: renders, build + lint clean.

- [x] **2.4 `/guides/vms-sign-hire-cost/`.**
  Answer-first ("VMS sign hire in Melbourne starts at $45/day ex GST on a 12-month
  contract; short hires of 1–6 days are a flat $500 plus 8% insurance."), then the full
  rate table, what drives price (term, delivery, insurance, power), Article + FAQPage
  JSON-LD. Internal links to `/vms-sign-hire/` and `/pricing/`.
  Accept: renders, valid JSON-LD, build + lint clean.

- [x] **2.5 `/guides/vms-vs-led-trailer-sign/`.**
  The comparison that replaces `IntentContent`: when to use a VMS message board vs a
  full-colour LED trailer sign vs an LED screen trailer, by job type. Article JSON-LD.
  Links to all 3 money pages.
  Accept: renders, build + lint clean.

- [x] **2.6 `/guides/led-screen-trailer-sizes/`.**
  Screen area, pixel pitch and viewing distance explained for event buyers; a sizing
  table; how to pick for a crowd size / venue. Article JSON-LD. Links to
  `/led-screen-trailer-hire/`.
  Accept: renders, build + lint clean.

- [x] **2.7 `/guides/traffic-management-sign-rules-victoria/`.**
  Plain-English overview: where VMS boards may be placed, AS 4852 / VicRoads context,
  who is responsible for approvals, what the hire company does vs the traffic
  management plan. No legal advice; link to the authorities. Article JSON-LD. Links to
  `/vms-sign-hire/`.
  Accept: renders, build + lint clean.

### Group 3 — glue + technical

- [x] **3.1 Navigation + breadcrumbs + internal linking.**
  Header: grouped nav to every page (a "Hire" group with the 3 services + pricing, plus
  Areas, Guides, Contact). Footer: full sitemap-style link list. Add a `<Breadcrumb>`
  component driven by each route's `breadcrumb`, shown on every non-home page. Do a
  pass so each money page and guide has 2–4 contextual in-body links.
  Accept: every page reachable from the nav; breadcrumbs render; build + lint clean.

- [x] **3.2 Reviews scaffold (no fake reviews).**
  `src/data/reviews.js` exporting `REVIEWS = []` with a header comment on how to add
  one. `<Reviews>` component renders nothing when empty. `renderHead` adds
  `AggregateRating` to the business JSON-LD **only when `REVIEWS.length > 0`**. Place
  `<Reviews>` on home + the 3 money pages.
  Accept: nothing visible changes while empty; no `AggregateRating` in output; build + lint clean.

- [x] **3.3 Global JSON-LD graph.**
  In `index.html` keep only `Organization` (+ `logo` ImageObject, `sameAs`,
  `contactPoint` with the phone) and `WebSite` (+ `potentialAction` SearchAction
  pointing at a `/?s=` or omitted if no search). Ensure `@id` references line up across
  per-page graphs. Remove the old single-page `Product` / `BreadcrumbList` / `FAQPage`
  from the global template (now per-page).
  Accept: `Organization` + `WebSite` valid; no duplicate `@id`; build + lint clean.

- [x] **3.4 Generate crawler files from ROUTES.**
  `scripts/generate-seo.mjs`: `sitemap.xml` from `ROUTES` (every path, `lastmod` from
  the last commit touching that page's sources, priority by depth). `robots.txt`
  unchanged bar the sitemap line. Rewrite `llms.txt` to the llmstxt.org shape with the
  new page list (H2 sections: Services, Guides, Service areas, Pricing, Contact — each
  a markdown link list).
  Accept: sitemap lists all routes; `xmllint --noout` passes; build + lint clean.

- [x] **3.5 Final QA.**
  `npm run build` + `npm run lint` clean. Serve `dist/` and run Lighthouse on `/`,
  `/vms-sign-hire/`, `/led-screen-trailer-hire/`: performance ≥ 95, SEO 100,
  accessibility 100, best-practices 100 — fix any regression. Check each page hydrates
  with no console error and internal links resolve. Update `README.md` with the
  multi-page architecture and "how to add a page" (add to `ROUTES`, that's it).
  Accept: scores met, README updated, build + lint clean.

---

## Phase 2 — depth and refinement

Phase 1 built the structure. Phase 2 is the code-side follow-up work: the on-page
things that still move the needle and don't need the owner. Anything that needs a
real business fact (fleet specs, ABN, address, reviews, GA4 id, a real video/photo
file) stays a `{/* TODO(owner): … */}` marker — these tasks build the *slot*, the
owner fills it.

**Phase 2 tasks are independent** — do them in any order, one per run, same rules
(build + lint must pass, one commit each, mark `[x]` + Log line, do not push).

- [x] **P1 `/gallery/` page.**
  New `src/pages/Gallery.jsx` + route. A responsive grid built from a
  `src/data/gallery.js` array of `{ src, alt, caption, category }`. Seed it with
  the existing `/img/hero-trailer-*` renders under a `{/* TODO(owner): replace
  with real fleet photos — VMS boards, LED trailer signs and LED screen trailers
  on Melbourne job sites; descriptive alt + caption per photo */}` note. Each
  image: `loading="lazy"`, `<picture>` with avif/webp, width/height set.
  `ImageGallery` / `ImageObject` JSON-LD from the same array. Link from the nav
  (add to `src/nav.js`), the home page and the 3 service pages. Sitemap picks it
  up automatically; P8 adds its images to the image sitemap.
  Accept: page renders, images lazy-load, JSON-LD valid, build + lint clean.

- [x] **P2 Per-route code-splitting.**
  The client bundle currently ships every page component (routes.jsx statically
  imports all 16). Split so each route loads only its own page chunk: give the
  client a route→`() => import()` map (`src/client-routes.js`), and have
  `main.jsx` `await` the matched page module, then build the shell
  (`<Header/><Page/><Footer/>`) itself instead of importing `App`/`routes.jsx`.
  `entry-server.jsx` keeps using `routes.jsx` (SSR, sync). Hydration must stay
  synchronous — load the chunk before `hydrateRoot`, no Suspense fallback.
  Accept: `dist/assets/` has a chunk per page; each page still hydrates with no
  console error and no visible flash; Lighthouse perf on `/` and a service page
  ≥ 98 on a gzip server; build + lint clean.

- [x] **P3 404 page.**
  `src/pages/NotFound.jsx` + a `'/404.html'` route (most static hosts serve
  `404.html` for unknown paths). Brief copy, links to the 3 services + home +
  contact. `App.jsx` `routeFor()` already falls back to home for unknown client
  paths — leave that, the 404 is for the host. `noindex` via renderHead (add a
  `seo.noindex` flag that emits `<meta name="robots" content="noindex">`).
  Accept: `dist/404.html` exists, renders, is noindex; build + lint clean.

- [x] **P4 Internal-linking depth.**
  Add a small `src/components/RelatedLinks.jsx` (title + list of
  `[href, label, sub]`). Put a "Related guides" block on each of the 3 service
  pages (link the relevant guides), and a "Related services" block on each of the
  4 guides that doesn't already link all three. Add area→guide links on the
  regional pages (e.g. Ballarat → the cost guide). No page should be more than
  two clicks from any other.
  Accept: every service page links ≥ 2 guides and vice versa; build + lint clean.

- [x] **P5 FAQ expansion for People-Also-Ask.**
  Add 3–4 more questions to each of the 3 service pages' `FAQ` arrays, drawn from
  the likely-PAA lists in the SEO SERP recon (e.g. VMS: "What is a variable
  message sign?", "How are VMS messages updated?", "What is the difference
  between a Class A, B and C VMS board?"; LED screen: "How bright are mobile LED
  screens?", "Do you need a permit for a mobile LED billboard?"). Answers must be
  factual and specific — no fluff, no invented specs. They flow into FAQPage
  JSON-LD automatically.
  Accept: each service page has ≥ 10 FAQ items; FAQPage JSON-LD count matches the
  visible `<dt>` count; build + lint clean.

- [x] **P6 Video scaffold (no fake video).**
  `src/data/videos.js` exporting `VIDEOS = {}` keyed by page path, each
  `{ url, thumbnail, name, description, uploadDate }` — empty. A `<Video>`
  component renders a `<video>` (or a linked thumbnail) when its key is set,
  nothing otherwise. `renderHead` emits `VideoObject` JSON-LD only when the
  route's path has an entry. Place `<Video>` on `/led-screen-trailer-hire/` and
  `/gallery/`. Header comment explaining how to add a real clip (setup timelapse,
  fleet walkthrough).
  Accept: nothing renders / no VideoObject while empty; build + lint clean.

- [x] **P7 Three more guides.**
  `guideRoute()` + `GuideLayout`, same standard as the existing four. Suggested:
  `/guides/writing-a-vms-message/` (message design, frame count, recognised
  phrasing, legibility), `/guides/hiring-an-led-screen-for-a-festival/`
  (checklist: site, power, content, crew, lead time),
  `/guides/solar-vs-mains-power-for-a-long-hire/` (when solar is enough, when to
  plan a 15A connection). Add all three to the `/guides/` hub `GUIDES` array.
  Article JSON-LD; internal links to the relevant service page.
  Accept: 3 pages render, Article JSON-LD valid, hub lists them, build + lint clean.

- [x] **P8 Image sitemap + per-page lastmod.**
  `scripts/seo-lib.mjs`: extend `buildSitemap` so each route can carry
  `seo.images: [{ loc, title, caption }]` that become `<image:image>` entries,
  and add per-URL `lastmod` from the last commit that touched that page's source
  file (fall back to the global date). Populate `seo.images` for the home, the 3
  service pages and `/gallery/` from `gallery.js` / the hero renders.
  Accept: sitemap has image entries on ≥ 4 URLs, per-page lastmod varies,
  `xmllint --noout` passes; build + lint clean.

- [x] **P9 Analytics + Search Console slots (owner fills the IDs).**
  Add to `index.html` a commented, ready-to-fill Google Search Console
  verification `<meta>` and a GA4 snippet gated on an env var
  (`VITE_GA4_ID`) so it only loads when set — no tracking by default, no
  hard-coded IDs. Document both in `README.md` along with: submit `sitemap.xml`
  in Search Console and Bing Webmaster Tools after deploy; request indexing on
  the money pages; the old single-page cache needs to be recrawled.
  Accept: no analytics loads without the env var; README section added; build +
  lint clean.

---

## Log

_(append: task id — one-line result — commit sha)_

- 0.0 — plan created
- 0.1 — routes.jsx manifest + App({path}) + pages/Home.jsx; render(path); main passes location.pathname; eslint override for routing layer
- 0.2 — prerender.js loops ROUTES, inlines CSS once, writes dist/<path>/index.html; / output byte-identical (54.0 kB)
- 0.3 — renderHead(path) in entry-server builds per-page title/desc/canonical/OG/JSON-LD; index.html now global-only with <!--ssg:head--> marker; dropped keywords meta + malformed breadcrumb + fabricated geo/postcode; 7 valid JSON-LD blocks on /
- 1.1 — /vms-sign-hire/ page (~1,300 words, 7-Q FAQ, rate table, 'not for you' block); shared src/pages/service-page.css; Breadcrumb component; Service+Product+FAQPage JSON-LD; generate-seo.mjs now enumerates ROUTES for the sitemap; both pages hydrate clean, no console errors
- 1.2 — /led-trailer-sign-hire-melbourne/ page (targets led trailer sign hire / ...melbourne / trailer led sign hire); full-colour vs amber table, per-area delivery table from SERVICE_AREAS, 7-Q FAQ, Service+Product+FAQPage JSON-LD (8/8 valid)
- 1.3 — /led-screen-trailer-hire/ page opens the event-video cluster (led screen trailer / led trailer screen hire / mobile ...melbourne x2); screen-choosing guidance, setup/operation, 7-Q FAQ, Service+Product+FAQPage JSON-LD (8/8)
- 1.4 — /pricing/ page: reuses the <Pricing> calculator component (already renders the full rate table as crawlable HTML), adds a 7-Q pricing FAQ, Product/AggregateOffer + FAQPage JSON-LD; linked from all 3 money pages
- 1.5 — home reworked: IntentContent (8 keyword-stuffed cards) deleted; Hero rewritten as a value prop linking to the 3 service pages; Services cards are now links; home h1 'Signs and screens on trailers, delivered and set up'; home 54.1->50.8 kB; hydrates clean. Group 1 complete.
- 2.1 — /service-areas/ hub (5 areas) + /service-areas/melbourne/ (~500 words, 6-region suburb table, LocalBusiness-scoped Service JSON-LD with areaServed); areaServiceLd() helper; sitemap auto-picks nested paths (7 URLs)
- 2.2 — /service-areas/{geelong,ballarat,bendigo,gippsland}/ via shared AreaLayout + per-page local prose (~450 words each, distinct); areaRoute() route factory; generate-seo.mjs now catches slug-built paths (sitemap = 11 URLs)
- 2.3 — /guides/ hub listing the 4 guides; GUIDES array exported for cross-linking; 12 URLs in sitemap
- 2.4 — /guides/vms-sign-hire-cost/ (answer-first, full rate table, what-moves-the-total, worked example, 4-Q FAQ); GuideLayout component + guideRoute() factory (ogType article -> Article JSON-LD); 13 URLs
- 2.5/2.6/2.7 — three guides: VMS vs LED sign vs screen (decision table + per-type sections), LED screen trailer sizing (crowd/distance guide + 3-Q FAQ), Victorian traffic-management sign rules (responsibilities, permits, AS 4852, 3-Q FAQ). All Article + FAQPage JSON-LD. 16 URLs. Group 2 complete.
- 3.1 — src/nav.js shared NAV + AREA_LINKS; Header nav = real page links with aria-current on the active page (sub-pages match their section); logo scrolls-to-top only on home, navigates home elsewhere; Footer nav rebuilt from NAV + a regional-areas row; breadcrumbs already on every non-home page. All pages reachable, no console errors.
- 3.2 — src/data/reviews.js (REVIEWS = [] + averageRating + how-to comment); <Reviews> renders null while empty; renderHead adds AggregateRating + review[] only when hasReviews && REVIEWS.length; <Reviews> on home + 3 money pages. Nothing visible/schema changes while empty.
- 3.3 — index.html global graph is #business + #website + #organization (all referenced by @id from per-page graphs, all resolve); dropped #business hasOfferCatalog (now per-page Services) and trimmed knowsAbout from 8 verbatim phrases to 4 topics; noscript h1 -> 'Ozzy's Equipment Hire' with real internal links. No SearchAction (no site search). 7/7 JSON-LD on home.
- 3.4 — scripts/seo-lib.mjs (buildSitemap/buildLlmsTxt/buildRobots/lastModified); prerender.js now writes sitemap.xml + llms.txt from the real ROUTES (fixes 4 bogus /service-areas/<guide-slug>/ URLs the regex produced, adds the 4 missing /guides/<slug>/ URLs -> 16 correct URLs); llms.txt rewritten to llmstxt.org multi-page shape; generate-seo.mjs trimmed to robots.txt.
- 3.5 — Lighthouse (gzip server): perf 98-99, SEO 100, a11y 100, best-practices 100 on home + service + guide + area pages. Fixed link-in-text-block (underlined inline prose links across service pages + hero). All 16 pages: 200, one <main> h1, valid JSON-LD, no console errors, internal links resolve. README updated with the multi-page architecture + 'adding a page'.

**PHASE 1 COMPLETE — 20/20 tasks. PHASE 2 COMPLETE — P1–P9 done.**
- P1 — /gallery/ page: responsive grid from src/data/gallery.js (seeded with the 1 real trailer photo + TODO(owner) for fleet shots), <picture> avif/webp/jpg + lazy + dimensions, grouped by category, ImageGallery/ImageObject JSON-LD (galleryLd helper). In nav (nav.js), linked from home Services + all 3 service pages' related lists. 17 sitemap URLs. Hydrates clean.
- P2 — src/client-routes.js (path -> () => import() map); main.jsx loads only the matched page chunk then mounts <Header/><Page/><Footer/> itself; routes.jsx/App.jsx now server-only. Entry chunk 107 KB -> 8.3 KB; one chunk per page + shared Contact/Breadcrumb/Reviews/AreaLayout/GuideLayout chunks. prerender.js guards that every ROUTE has a loader. Lighthouse perf 98 (/) / 99 (service), TBT 0, hydration clean (menu + calculator verified). README updated.
- P3 — src/pages/NotFound.jsx + a /404.html route (prerender writes it as dist/404.html, not a dir). seo.noindex flag: renderHead now emits per-page robots/googlebot/bingbot (index by default, noindex+follow when set), and the 3 static robots metas were removed from index.html so there's no duplication. Sitemap filters noindex routes (still 17). normPath() shared shape in routes.jsx + client-routes.js so /404.html and unknown paths resolve to NotFound on both server and client. /404.html hydrates with no console errors.
- P4 — src/components/RelatedLinks.jsx ({title, items:[[href,label,sub]]}, .sp-related styling). Each of the 3 service pages now has a 'Guides' block linking 3 relevant guides; each guide's related list expanded to link all 3 services; AreaLayout related list gained 2 guide links (covers all 5 area pages). Every service page <-> guide link is >=2 each way. Hydrates clean.
- P5 — +4 questions on each of the 3 service pages (7 -> 11): VMS (what is a VMS / Class A,B,C / how messages update / advertising use), LED trailer sign (what is it / cost / what to display / one-day hire), LED screen (what is it / cost / permit / brightness). All factual, real numbers, no invented specs. Visible <dt> count == FAQPage JSON-LD Question count (11 each). Hydrates clean.
- P6 — src/data/videos.js (VIDEOS = {} keyed by page path + videoFor() + how-to comment); src/components/Video.jsx renders a <video> only when its path has an entry, nothing otherwise; renderHead emits VideoObject only when VIDEOS[path] set. <Video> placed on /led-screen-trailer-hire/ and /gallery/. While empty: 0 rendered video sections, 0 VideoObject, both pages hydrate clean.
- P7 — 3 new guides via guideRoute()+GuideLayout: /guides/writing-a-vms-message/ (one idea per frame, 3 lines, recognised wording, 2-3 frames, take text from the TMP), /guides/hiring-an-led-screen-for-a-festival/ (site/power/content/crew/timing checklist), /guides/solar-vs-mains-power-for-a-long-hire/ (~3 weeks threshold, 15A on site, day rate unchanged). Each Article+FAQPage JSON-LD (6/6), 3-Q FAQ, links to service pages. Hub GUIDES array updated. 20 sitemap URLs. Hydrates clean.
- P8 — buildSitemap now takes (routes, cwd, fallbackLastmod): per-route <lastmod> from `git log` of route.src (factories derive src from Page.name; plain routes set it explicitly), and per-route seo.images -> <image:image> entries. Image entries on 5 URLs (home x2, 3 service + gallery x1); gallery images come from GALLERY. lastmod varies (home 08-28 vs pages touched today). xmllint passes.
- P9 — index.html: commented google-site-verification <meta> to fill; a GA4 bootstrap IIFE gated on %VITE_GA4_ID% (Vite HTML env subst) — inert when unset (guard on leading '%'), loads gtag when set (verified both). README 'Analytics and Search Console' section: VITE_GA4_ID, verification tag, and the post-deploy sitemap/indexing/recrawl steps. 0 GA requests + window.gtag undefined with no env var.

**PHASE 2 COMPLETE — P1-P9. seo/phase-2 ready to review + merge.**
