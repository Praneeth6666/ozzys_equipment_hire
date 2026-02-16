# Ozzy's Equipment Hire

Website for **Ozzy's Equipment Hire** – Melbourne-based LED and digital display solutions across Victoria.

## Stack

- React 19 + Vite 7
- CSS (no framework) with custom design tokens

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

Output is in `dist/`.

## Hero image (high quality)

The hero uses `public/trailer.png` (768×1024). To get a **sharp image** on all screens:

1. **Use a high-resolution photo** – Export your trailer image at **1536×2048px** or larger (e.g. 2400×3200). Use PNG or high-quality JPG (quality 90+).
2. **Replace the files:**
   - Replace `public/trailer.png` with your high-res image (same name).
   - Replace `public/trailer@2x.png` with the same high-res image (or a 1536px-wide version for retina). The site uses `trailer@2x.png` for sharper display on high-DPI screens.

If you only have one file, replace both `trailer.png` and `trailer@2x.png` with it. The current low quality is because the source is 768×1024; replacing with 1536px+ will fix it.

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
