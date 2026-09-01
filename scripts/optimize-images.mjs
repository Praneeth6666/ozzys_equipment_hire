/**
 * Image pipeline — turns the originals in assets-src/ into the small,
 * responsive files that actually ship in public/img/.
 *
 * Run via `npm run images` (also wired into `npm run build`).
 *
 * Why this exists: the hero photo was a 205 KB JPEG served at every breakpoint
 * (and the "@2x" was a byte-identical copy), and the logo was a 441 KB SVG with
 * two base64 rasters inside it, rendered at 157x90. Both were re-downloaded on
 * mobile before first paint.
 */

import sharp from 'sharp';
import { mkdirSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC = resolve(ROOT, 'assets-src');
const OUT = resolve(ROOT, 'public/img');

// Gallery photos: every assets-src/gallery/*.jpg becomes a responsive set at
// public/img/gallery/<name>-<w>.<fmt>. The <img> is never rendered wider than
// ~100vw on a phone, so 1000 is the ceiling. Keep src/data/gallery.js `widths`
// in sync with this list.
const GALLERY_WIDTHS = [400, 700, 1000];

// Widths the hero <img> actually gets rendered at, across breakpoints and DPRs.
// The original is 768x1024, so 768 is the ceiling — asking for more just
// produced byte-identical duplicates, which is how the fake "@2x" happened.
const HERO_WIDTHS = [360, 480, 600, 768];

// The logo is a wordmark rendered at 157x90 in the header and 56x32 in the
// footer. One 480w file for both meant phones downloading ~3x more pixels than
// they draw, so it gets a srcset too.
const LOGO_WIDTHS = [120, 240, 360, 480];

// Brand colours, kept in sync with src/index.css
const BRAND = { from: '#16244a', to: '#0f1832', blue: '#1685f9' };

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

async function buildHero() {
  const src = resolve(SRC, 'trailer.jpg');
  const results = [];

  for (const w of HERO_WIDTHS) {
    const base = sharp(src).resize({ width: w, withoutEnlargement: true });

    await base
      .clone()
      .avif({ quality: 55, effort: 6 })
      .toFile(resolve(OUT, `hero-trailer-${w}.avif`));

    await base
      .clone()
      .webp({ quality: 68, effort: 6, smartSubsample: true })
      .toFile(resolve(OUT, `hero-trailer-${w}.webp`));

    // Last-resort fallback for anything that supports neither.
    await base
      .clone()
      .jpeg({ quality: 74, progressive: true, mozjpeg: true })
      .toFile(resolve(OUT, `hero-trailer-${w}.jpg`));

    results.push(w);
  }

  return results;
}

async function buildLogo() {
  const src = resolve(SRC, 'logo.svg');

  for (const w of LOGO_WIDTHS) {
    await sharp(src, { density: 600 })
      .resize({ width: w })
      .png({ compressionLevel: 9, palette: true, quality: 90 })
      .toFile(resolve(OUT, `logo-${w}.png`));

    await sharp(src, { density: 600 })
      .resize({ width: w })
      .webp({ quality: 86, effort: 6 })
      .toFile(resolve(OUT, `logo-${w}.webp`));
  }

  // Stable, unversioned URL for schema.org and anything else that wants "the logo".
  await sharp(src, { density: 600 })
    .resize({ width: 480 })
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toFile(resolve(OUT, 'logo.png'));

  // Square icons for the manifest and Apple touch icon. The logo is a wide
  // wordmark, so pad it onto a brand-coloured square instead of cropping.
  for (const size of [180, 192, 512]) {
    await sharp(src, { density: 600 })
      .resize({
        width: Math.round(size * 0.82),
        height: Math.round(size * 0.82),
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .extend({
        top: Math.round(size * 0.09),
        bottom: Math.round(size * 0.09),
        left: Math.round(size * 0.09),
        right: Math.round(size * 0.09),
        background: BRAND.to,
      })
      .flatten({ background: BRAND.to })
      .png({ compressionLevel: 9 })
      .toFile(resolve(OUT, `icon-${size}.png`));
  }

  // Maskable variant: Android crops icons to arbitrary shapes and only the
  // centre 80% is guaranteed visible, so the mark sits inside ~56% of the
  // canvas rather than the 82% the plain icons use.
  await sharp(src, { density: 600 })
    .resize({
      width: 288,
      height: 288,
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .extend({ top: 112, bottom: 112, left: 112, right: 112, background: BRAND.to })
    .flatten({ background: BRAND.to })
    .png({ compressionLevel: 9 })
    .toFile(resolve(OUT, 'icon-maskable-512.png'));

  const meta = await sharp(resolve(OUT, 'logo.png')).metadata();
  return { width: meta.width, height: meta.height };
}

/**
 * 1200x630 Open Graph card. The old og:image was the 768x1024 portrait hero,
 * which every social scaler letterboxes or crops badly.
 */
async function buildOgImage() {
  const W = 1200;
  const H = 630;

  const background = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${BRAND.from}"/>
          <stop offset="100%" stop-color="${BRAND.to}"/>
        </linearGradient>
        <radialGradient id="glow" cx="0.78" cy="0.3" r="0.6">
          <stop offset="0%" stop-color="${BRAND.blue}" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="${BRAND.blue}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#g)"/>
      <rect width="${W}" height="${H}" fill="url(#glow)"/>
    </svg>`,
  );

  const photo = await sharp(resolve(SRC, 'trailer.jpg'))
    .resize({ width: 460, height: 560, fit: 'cover', position: 'centre' })
    .composite([
      {
        input: Buffer.from(
          `<svg xmlns="http://www.w3.org/2000/svg" width="460" height="560">
            <rect width="460" height="560" rx="24" fill="#fff"/>
          </svg>`,
        ),
        blend: 'dest-in',
      },
    ])
    .png()
    .toBuffer();

  const logo = await sharp(resolve(SRC, 'logo.svg'), { density: 600 })
    .resize({ width: 264 })
    .png()
    .toBuffer();

  const text = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="620" height="300">
      <style>
        .h { font: 700 52px 'Helvetica Neue', Helvetica, Arial, sans-serif; fill: #ffffff; }
        .a { fill: ${BRAND.blue}; }
        .s { font: 400 26px 'Helvetica Neue', Helvetica, Arial, sans-serif; fill: rgba(255,255,255,0.8); }
      </style>
      <text class="h" x="0" y="52">VMS Sign Hire &amp;</text>
      <text class="h" x="0" y="116">LED Trailer Sign Hire</text>
      <text class="h a" x="0" y="180">Melbourne</text>
      <text class="s" x="0" y="238">Delivery, setup and programming</text>
      <text class="s" x="0" y="274">across Melbourne &amp; Victoria</text>
    </svg>`,
  );

  await sharp(background)
    .composite([
      { input: photo, left: 660, top: 35 },
      { input: logo, left: 72, top: 58 },
      { input: text, left: 72, top: 258 },
    ])
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(resolve(OUT, 'og-image.jpg'));

  return { width: W, height: H };
}

async function buildGallery() {
  const dir = resolve(SRC, 'gallery');
  if (!existsSync(dir)) return [];
  ensureDir(resolve(OUT, 'gallery'));

  const files = readdirSync(dir).filter((f) => /\.jpe?g$/i.test(f)).sort();
  for (const file of files) {
    const src = resolve(dir, file);
    const name = basename(file).replace(/\.jpe?g$/i, '');

    for (const w of GALLERY_WIDTHS) {
      // .rotate() with no args bakes in EXIF orientation (iPhone photos).
      const base = sharp(src).rotate().resize({ width: w, withoutEnlargement: true });

      await base.clone().avif({ quality: 52, effort: 6 })
        .toFile(resolve(OUT, `gallery/${name}-${w}.avif`));
      await base.clone().webp({ quality: 66, effort: 6, smartSubsample: true })
        .toFile(resolve(OUT, `gallery/${name}-${w}.webp`));
      await base.clone().jpeg({ quality: 72, progressive: true, mozjpeg: true })
        .toFile(resolve(OUT, `gallery/${name}-${w}.jpg`));
    }
  }
  return files.map((f) => basename(f).replace(/\.jpe?g$/i, ''));
}

async function main() {
  ensureDir(OUT);

  const hero = await buildHero();
  const logo = await buildLogo();
  const og = await buildOgImage();
  const gallery = await buildGallery();

  console.log(`[img] hero      ${hero.join('w, ')}w  (avif + webp + jpg)`);
  console.log(`[img] logo      ${logo.width}x${logo.height}  (webp + png) + icons 180/192/512`);
  console.log(`[img] og-image  ${og.width}x${og.height}`);
  console.log(`[img] gallery   ${gallery.length} photo(s) x ${GALLERY_WIDTHS.join('w, ')}w  (avif + webp + jpg)`);
}

main().catch((err) => {
  console.error('[img] failed:', err);
  process.exit(1);
});
