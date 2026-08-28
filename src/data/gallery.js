/**
 * Fleet photos for the /gallery/ page and the image sitemap.
 *
 * Seeded with the one trailer photo the site already has. Add real photos of
 * Ozzy's own VMS boards, LED trailer signs and LED screen trailers on Melbourne
 * and Victoria job sites. Each needs a descriptive `alt` and a `caption`
 * (suburb + what the job was is ideal). Stock photos do nothing for SEO.
 *
 * To add one:
 *   1. Put the original in assets-src/gallery/<name>.jpg
 *   2. Add a case to scripts/optimize-images.mjs so `npm run images` emits
 *      /img/<name>-{W}.{avif,webp,jpg} for each width you list below
 *   3. Run `npm run images`
 *   4. Add a row here:
 *      { base: '<name>', widths: [640, 960, 1280], w: <px>, h: <px>,
 *        alt: '...', caption: '...', category: 'vms' }
 *
 * `category` is one of the keys in CATEGORIES.
 */
export const GALLERY = [
  {
    base: 'hero-trailer',
    widths: [360, 480, 600, 768],
    w: 768,
    h: 1024,
    alt: 'Mobile LED screen trailer set up beside a road in Melbourne',
    caption: 'LED screen trailer, positioned and running on site.',
    category: 'led-screen',
  },
  // {/* TODO(owner): add VMS board, LED trailer sign, and delivery / set-up photos */}
];

export const CATEGORIES = {
  vms: 'VMS boards',
  'led-sign': 'LED trailer signs',
  'led-screen': 'LED screen trailers',
  delivery: 'Delivery and set-up',
};
