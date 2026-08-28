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

1. `npm run seo` — regenerates `public/sitemap.xml`, `robots.txt` and `llms.txt`
   from `scripts/generate-seo.mjs`. Edit that script, not the output files.
2. `vite build` — the client bundle.
3. `node prerender.js` — renders the React tree to static HTML, inlines the CSS
   into `<head>`, and drops the render-blocking stylesheet `<link>`.

Output is in `dist/`. It is fully pre-rendered: the HTML contains the complete
page, and the JS bundle only hydrates it.

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

## Sections

- **Hero** – Headline and primary CTA
- **Services** – Mobile LED trailers, VMS boards, solar screens, custom units, outdoor signage, shop-front monitors
- **About** – Company summary and differentiators
- **Contact** – Enquiry form and contact details

Contact details (email and website) are set in `Contact.jsx` and `Footer.jsx`.

### Contact form

The form is fully runnable: it uses controlled inputs, shows “Sending…”, then success or error. By default it runs in **demo mode** (no backend); submissions show a success message and the form resets.

To receive enquiries by email, create a form at [Formspree](https://formspree.io), get your form ID, then add to a `.env` file:

```
VITE_FORMSPREE_ID=your_form_id
```

Restart the dev server after adding `.env`. The form will POST to Formspree and you’ll get emails for each submission.
# ozzys_equipment_hire
