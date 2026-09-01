/**
 * Fleet photos for the /gallery/ page and the image sitemap.
 *
 * These are Ozzy's own trailer on real Melbourne sites. Every entry needs a
 * descriptive `alt` and a `caption`.
 *
 * To add one:
 *   1. Put the original in assets-src/gallery/<name>.jpg (iPhone HEIC is fine to
 *      convert first; EXIF rotation is baked in by the pipeline).
 *   2. Run `npm run images` — scripts/optimize-images.mjs turns every
 *      assets-src/gallery/*.jpg into /img/gallery/<name>-{400,700,1000}.{avif,webp,jpg}.
 *   3. Add a row here:
 *      { base: 'gallery/<name>', widths: [400, 700, 1000], w: <px>, h: <px>,
 *        alt: '...', caption: '...', category: 'led-sign' }
 *
 * `w`/`h` are the intrinsic size at the largest width, so the grid can reserve
 * space before the image loads. Portrait phone photos are 1000x1333; the one
 * landscape shot is 1000x750. `category` is a key in CATEGORIES.
 */
const WIDTHS = [400, 700, 1000];
const PORTRAIT = { widths: WIDTHS, w: 1000, h: 1333 };
const LANDSCAPE = { widths: WIDTHS, w: 1000, h: 750 };

export const GALLERY = [
  {
    ...LANDSCAPE,
    base: 'gallery/trailer-sign-storefront-day',
    alt: "Ozzy's full-colour LED trailer sign parked kerbside outside a Forty Winks store in daylight, showing a blue 'Birthday Sale' promotion",
    caption: 'LED trailer sign running a retailer’s sale campaign kerbside in Melbourne.',
    category: 'led-sign',
  },
  {
    ...PORTRAIT,
    base: 'gallery/trailer-sign-storefront-night',
    alt: "The same LED trailer sign lit up after dark outside the store, the 'Birthday Sale' artwork still clearly readable at night",
    caption: 'After dark — the auto-brightness sensor keeps it readable without glare.',
    category: 'led-sign',
  },
  {
    ...PORTRAIT,
    base: 'gallery/trailer-sign-cafe-day',
    alt: 'Side view of the LED trailer sign in a car park showing a full-colour restaurant advertisement with opening hours',
    caption: 'Trailer sign side-on, running a café’s “Fine & Dine” advert.',
    category: 'led-sign',
  },
  {
    ...PORTRAIT,
    base: 'gallery/trailer-sign-cafe-dusk',
    alt: 'Rear three-quarter view of the LED trailer sign at dusk showing the same full-colour café advertisement',
    caption: 'The same café campaign, shown at golden hour.',
    category: 'led-sign',
  },
  {
    ...PORTRAIT,
    base: 'gallery/trailer-sign-black-friday',
    alt: "LED trailer sign displaying a full-colour 'Black Friday Sale' retail promotion with a shopping-bag graphic",
    caption: 'Retail campaign — a Black Friday sale frame.',
    category: 'led-sign',
  },
  {
    ...PORTRAIT,
    base: 'gallery/trailer-sign-car-dealer',
    alt: "LED trailer sign showing a car-dealership advertisement with a vehicle image, price and a 'Book Now' call to action",
    caption: 'Dealership advertising — stock and pricing on the trailer sign.',
    category: 'led-sign',
  },
  {
    ...PORTRAIT,
    base: 'gallery/trailer-sign-food-special',
    alt: 'LED trailer sign showing a full-colour fast-food promotion for a burger meal deal with free delivery',
    caption: 'Food and takeaway promotion at golden hour.',
    category: 'led-sign',
  },
  {
    ...PORTRAIT,
    base: 'gallery/trailer-sign-resort-promo',
    alt: "LED trailer sign showing a travel resort's 'Summer Holiday Giveaway' campaign with a beach image",
    caption: 'A resort’s giveaway campaign on the trailer sign.',
    category: 'led-sign',
  },
  {
    ...PORTRAIT,
    base: 'gallery/trailer-sign-appliance-sale',
    alt: "LED trailer sign in a car park showing a blue 'Winter Mega Sale' home-appliance advertisement",
    caption: 'Home-appliance retailer’s winter sale.',
    category: 'led-sign',
  },
  {
    ...PORTRAIT,
    base: 'gallery/trailer-sign-appliance-rear',
    alt: "Rear three-quarter view of the LED trailer sign showing a 'Winter Mega Sale' appliance promotion with product images",
    caption: 'The same winter-sale campaign from the rear.',
    category: 'led-sign',
  },
  {
    ...PORTRAIT,
    base: 'gallery/trailer-screen-video',
    alt: 'The trailer running as an LED screen, playing a short video of a car driving through open countryside',
    caption: 'Run as a screen trailer — playing short video content.',
    category: 'led-screen',
  },
];

export const CATEGORIES = {
  vms: 'VMS boards',
  'led-sign': 'LED trailer signs',
  'led-screen': 'LED screen trailer',
  delivery: 'Delivery and set-up',
};
