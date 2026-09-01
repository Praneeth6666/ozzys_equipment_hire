/**
 * Route manifest — the single source of truth for every page on the site.
 *
 * Each entry: { path, Page, seo }. `prerender.js` walks this list to emit one
 * static HTML file per path; `App.jsx` matches `window.location.pathname` to a
 * Page at hydration time. Adding a page = adding an entry here.
 *
 * The `seo` object is consumed by `renderHead()` in entry-server.jsx:
 *   {
 *     title,                        // <=60 chars, target phrase near the front
 *     description,                  // 140-160 chars
 *     h1,                           // target phrase, distinct from title
 *     ogType,                       // 'website' (default) | 'article'
 *     keywords,                     // optional string[] for WebPage schema
 *     primaryImage,                 // optional { url, width, height, caption }
 *     breadcrumb: [[label, path]],  // 1 entry -> no BreadcrumbList emitted
 *     jsonLd: [ ...extra schema.org objects ],
 *   }
 */

import Home from './pages/Home';
import VmsSignHire, { FAQ as VMS_FAQ } from './pages/VmsSignHire';
import LedTrailerSignHireMelbourne, {
  FAQ as LED_SIGN_FAQ,
} from './pages/LedTrailerSignHireMelbourne';
import LedScreenTrailerHire, {
  FAQ as LED_SCREEN_FAQ,
} from './pages/LedScreenTrailerHire';
import PricingPage, { FAQ as PRICING_FAQ } from './pages/Pricing';
import ServiceAreas from './pages/ServiceAreas';
import AreaMelbourne from './pages/areas/Melbourne';
import AreaGeelong from './pages/areas/Geelong';
import AreaBallarat from './pages/areas/Ballarat';
import AreaBendigo from './pages/areas/Bendigo';
import AreaGippsland from './pages/areas/Gippsland';
import GuidesHub from './pages/Guides';
import GalleryPage from './pages/Gallery';
import NotFound from './pages/NotFound';
import { GALLERY } from './data/gallery';
import VmsSignHireCost, { FAQ as COST_FAQ } from './pages/guides/VmsSignHireCost';
import VmsVsLedTrailerSign from './pages/guides/VmsVsLedTrailerSign';
import LedScreenTrailerSizes, {
  FAQ as SIZES_FAQ,
} from './pages/guides/LedScreenTrailerSizes';
import TrafficManagementSignRulesVictoria, {
  FAQ as RULES_FAQ,
} from './pages/guides/TrafficManagementSignRulesVictoria';
import WritingAVmsMessage, {
  FAQ as WRITING_FAQ,
} from './pages/guides/WritingAVmsMessage';
import HiringAnLedScreenForAFestival, {
  FAQ as FESTIVAL_FAQ,
} from './pages/guides/HiringAnLedScreenForAFestival';
import SolarVsMainsPowerForALongHire, {
  FAQ as POWER_FAQ,
} from './pages/guides/SolarVsMainsPowerForALongHire';
import { FAQ_ITEMS } from './data/seo';

export const SITE_URL = 'https://www.ozzysequipmenthire.com.au';

const BUSINESS = { '@id': `${SITE_URL}/#business` };

/** FAQPage object. Accepts {question,answer} or the page-local {q,a} shape. */
function faqPage(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question ?? f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.answer ?? f.a },
    })),
  };
}

/** Service object for a dedicated hire page. */
function serviceLd({ name, serviceType, description, url, areaServed }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType,
    description,
    provider: BUSINESS,
    areaServed: areaServed || ['Melbourne', 'Victoria', 'Australia'],
    url,
  };
}

/** Service scoped to one place, for a location page. */
function areaServiceLd({ areaName, areaType = 'City', url, description }) {
  return serviceLd({
    name: `Sign and screen hire in ${areaName}`,
    serviceType: 'VMS, LED trailer sign and LED screen trailer hire',
    description,
    url,
    areaServed: { '@type': areaType, name: areaName },
  });
}

/** Build a /guides/<slug>/ article route. `Page.name` gives the source file. */
function guideRoute(Page, { slug, h1, title, description, faq }) {
  const path = `/guides/${slug}/`;
  return {
    path,
    Page,
    src: `src/pages/guides/${Page.name}.jsx`,
    seo: {
      title,
      description,
      h1,
      ogType: 'article',
      breadcrumb: [
        ['Home', '/'],
        ['Guides', '/guides/'],
        [h1, path],
      ],
      jsonLd: faq && faq.length ? [faqPage(faq)] : [],
    },
  };
}

/** Build a regional location route — same shape for every area. */
function areaRoute(Page, { name, slug, areaType, title, description }) {
  const path = `/service-areas/${slug}/`;
  return {
    path,
    Page,
    src: `src/pages/areas/${Page.name}.jsx`,
    seo: {
      title,
      description,
      h1: `Sign and screen hire in ${name}`,
      breadcrumb: [
        ['Home', '/'],
        ['Service areas', '/service-areas/'],
        [name, path],
      ],
      jsonLd: [
        areaServiceLd({
          areaName: name,
          areaType,
          url: `${SITE_URL}${path}`,
          description:
            `VMS sign hire, LED trailer sign hire and LED screen trailer hire delivered to ${name} and the surrounding area, with placement, programming and collection.`,
        }),
      ],
    },
  };
}

/** ImageGallery + ImageObject list for the /gallery/ page. */
function galleryLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: "Ozzy's Equipment Hire fleet gallery",
    url: `${SITE_URL}/gallery/`,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    image: items.map((it) => ({
      '@type': 'ImageObject',
      contentUrl: `${SITE_URL}/img/${it.base}-${it.widths[it.widths.length - 1]}.jpg`,
      caption: it.caption,
      description: it.alt,
    })),
  };
}

/** Product + AggregateOffer for a hire page, priced on the shared day-rate card. */
function hireProductLd({ name, description, url, image }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: image || `${SITE_URL}/img/hero-trailer-768.jpg`,
    brand: { '@type': 'Brand', name: "Ozzy's Equipment Hire" },
    category: 'Equipment Rental',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'AUD',
      lowPrice: '45',
      highPrice: '75',
      offerCount: '6',
      availability: 'https://schema.org/InStock',
      seller: BUSINESS,
      url,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'AUD',
        minPrice: '45',
        maxPrice: '75',
        unitCode: 'DAY',
        unitText: 'per day (ex GST)',
        valueAddedTaxIncluded: false,
      },
    },
  };
}

/* --------------------------------------------------------------- home JSON-LD */

const HOME_SERVICES = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'VMS Sign Hire',
      description:
        'VMS sign hire for traffic management, construction and road safety across Melbourne and Victoria.',
      provider: BUSINESS,
      areaServed: ['Melbourne', 'Victoria', 'Australia'],
      serviceType: 'VMS sign hire',
    },
    {
      '@type': 'Service',
      name: 'LED Trailer Sign Hire Melbourne',
      description:
        'LED trailer sign hire Melbourne and trailer LED sign hire for events, sport, retail and campaigns.',
      provider: BUSINESS,
      areaServed: ['Melbourne', 'Victoria', 'Australia'],
      serviceType: 'LED trailer sign hire',
    },
    {
      '@type': 'Service',
      name: 'LED Screen Trailer Hire',
      description:
        'LED screen trailer, LED trailer screen hire and mobile LED screen trailer hire Melbourne.',
      provider: BUSINESS,
      areaServed: ['Melbourne', 'Victoria', 'Australia'],
      serviceType: 'LED screen trailer hire',
    },
  ],
};

const HOME_PRODUCT = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': `${SITE_URL}/#product`,
  name: 'LED Trailer Sign Hire',
  description:
    'VMS sign hire, LED trailer sign hire and LED screen trailer hire in Melbourne and Victoria.',
  image: `${SITE_URL}/img/hero-trailer-768.jpg`,
  brand: { '@type': 'Brand', name: "Ozzy's Equipment Hire" },
  category: 'Equipment Rental',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'AUD',
    lowPrice: '45',
    highPrice: '75',
    offerCount: '6',
    availability: 'https://schema.org/InStock',
    seller: BUSINESS,
    url: `${SITE_URL}/pricing/`,
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      priceCurrency: 'AUD',
      minPrice: '45',
      maxPrice: '75',
      unitCode: 'DAY',
      unitText: 'per day (ex GST)',
      valueAddedTaxIncluded: false,
    },
  },
};

/* --------------------------------------------------------- sitemap images */

// The stock trailer photo, for pages without a dedicated shot of their own
// (currently the VMS page — there is no amber road-works photo yet).
const heroImage = (title, caption) => ({
  loc: `${SITE_URL}/img/hero-trailer-768.jpg`,
  title,
  caption,
});

// A real fleet photo from src/data/gallery.js, at its largest built width.
const galleryImage = (base, title, caption) => ({
  loc: `${SITE_URL}/img/${base}-1000.jpg`,
  title,
  caption,
});

const GALLERY_IMAGES = GALLERY.map((g) => ({
  loc: `${SITE_URL}/img/${g.base}-${g.widths[g.widths.length - 1]}.jpg`,
  title: g.alt,
  caption: g.caption,
}));

/* -------------------------------------------------------------------- routes */

export const ROUTES = [
  {
    path: '/',
    Page: Home,
    src: 'src/pages/Home.jsx',
    seo: {
      title: 'VMS Sign Hire | LED Trailer Sign Hire Melbourne',
      description:
        'Ozzy’s Equipment Hire: VMS sign hire, LED trailer sign hire and LED screen trailer hire across Melbourne and Victoria. Delivered, placed and programmed. Day rates from $45 ex GST.',
      h1: 'Signs and screens on trailers, delivered and set up',
      primaryImage: {
        url: `${SITE_URL}/img/hero-trailer-768.jpg`,
        width: 768,
        height: 1024,
        caption: 'LED screen trailer and VMS sign hire in Melbourne',
      },
      images: [
        heroImage(
          'LED screen trailer hire Melbourne',
          'Mobile LED screen trailer used for VMS sign hire and LED trailer sign hire in Melbourne.',
        ),
        {
          loc: `${SITE_URL}/img/og-image.jpg`,
          title: "Ozzy's Equipment Hire — VMS sign hire Melbourne",
          caption:
            'VMS sign hire, LED trailer sign hire and LED screen trailer hire across Victoria.',
        },
      ],
      breadcrumb: [['Home', '/']],
      hasReviews: true,
      jsonLd: [HOME_SERVICES, HOME_PRODUCT, faqPage(FAQ_ITEMS)],
    },
  },
  {
    path: '/vms-sign-hire/',
    Page: VmsSignHire,
    src: 'src/pages/VmsSignHire.jsx',
    seo: {
      title: 'VMS Sign Hire Melbourne | Variable Message Signs',
      description:
        'VMS sign hire in Melbourne from $45/day ex GST. Trailer-mounted variable message signs for roadworks, traffic management and events — delivered, placed and programmed across Victoria.',
      h1: 'VMS sign hire in Melbourne',
      images: [heroImage('VMS sign hire in Melbourne', 'A variable message sign trailer on a Melbourne road-work site.')],
      breadcrumb: [
        ['Home', '/'],
        ['VMS Sign Hire', '/vms-sign-hire/'],
      ],
      hasReviews: true,
      jsonLd: [
        serviceLd({
          name: 'VMS Sign Hire',
          serviceType: 'VMS sign hire',
          description:
            'Trailer-mounted variable message sign hire for roadworks, traffic management, construction sites and events across Melbourne and Victoria. Delivery, placement and message programming included.',
          url: `${SITE_URL}/vms-sign-hire/`,
        }),
        hireProductLd({
          name: 'VMS Sign Hire',
          description:
            'Variable message sign (VMS board) hire in Melbourne and Victoria — amber and full-colour, solar assisted, remotely programmable.',
          url: `${SITE_URL}/vms-sign-hire/`,
        }),
        faqPage(VMS_FAQ),
      ],
    },
  },
  {
    path: '/led-trailer-sign-hire-melbourne/',
    Page: LedTrailerSignHireMelbourne,
    src: 'src/pages/LedTrailerSignHireMelbourne.jsx',
    seo: {
      title: 'LED Trailer Sign Hire Melbourne | Trailer LED Signs',
      description:
        'LED trailer sign hire Melbourne from $45/day ex GST. Full-colour trailer LED signs for festivals, sport, retail and campaigns — towed in, positioned and collected across Victoria.',
      h1: 'LED trailer sign hire Melbourne',
      images: [galleryImage('gallery/trailer-sign-storefront-day', 'LED trailer sign hire Melbourne', 'A full-colour LED trailer sign running a retailer sale campaign kerbside in Melbourne.')],
      breadcrumb: [
        ['Home', '/'],
        ['LED Trailer Sign Hire Melbourne', '/led-trailer-sign-hire-melbourne/'],
      ],
      hasReviews: true,
      jsonLd: [
        serviceLd({
          name: 'LED Trailer Sign Hire Melbourne',
          serviceType: 'LED trailer sign hire',
          description:
            'Full-colour LED trailer sign hire and trailer LED sign hire across Greater Melbourne and regional Victoria for events, sport, retail activations, property campaigns and council works. Delivery, placement and content support included.',
          url: `${SITE_URL}/led-trailer-sign-hire-melbourne/`,
        }),
        hireProductLd({
          name: 'LED Trailer Sign Hire',
          description:
            'Full-colour LED trailer sign hire in Melbourne and Victoria — trailer-mounted, solar assisted, artwork loaded and updated remotely.',
          url: `${SITE_URL}/led-trailer-sign-hire-melbourne/`,
        }),
        faqPage(LED_SIGN_FAQ),
      ],
    },
  },
  {
    path: '/led-screen-trailer-hire/',
    Page: LedScreenTrailerHire,
    src: 'src/pages/LedScreenTrailerHire.jsx',
    seo: {
      title: 'LED Screen Trailer Hire Melbourne | Mobile LED Screens',
      description:
        'LED screen trailer hire in Melbourne for outdoor advertising, event information and sponsor content. A 2.4 by 1.6 m full-colour mobile LED screen, delivered and set up across Victoria.',
      h1: 'LED screen trailer hire',
      images: [galleryImage('gallery/trailer-screen-video', 'LED screen trailer hire Melbourne', 'A mobile LED screen trailer playing short video content on site.')],
      breadcrumb: [
        ['Home', '/'],
        ['LED Screen Trailer Hire', '/led-screen-trailer-hire/'],
      ],
      hasReviews: true,
      jsonLd: [
        serviceLd({
          name: 'LED Screen Trailer Hire',
          serviceType: 'LED screen trailer hire',
          description:
            'Mobile LED screen trailer hire for outdoor advertising, festivals, sport and brand campaigns across Greater Melbourne and regional Victoria. A 2.4 by 1.6 m full-colour screen on a trailer; delivery and setup included.',
          url: `${SITE_URL}/led-screen-trailer-hire/`,
        }),
        hireProductLd({
          name: 'LED Screen Trailer Hire',
          description:
            'Mobile LED screen trailer hire in Melbourne and Victoria — a 2.4 by 1.6 m full-colour LED screen on a trailer, updated over 4G.',
          url: `${SITE_URL}/led-screen-trailer-hire/`,
        }),
        faqPage(LED_SCREEN_FAQ),
      ],
    },
  },
  {
    path: '/pricing/',
    Page: PricingPage,
    src: 'src/pages/Pricing.jsx',
    seo: {
      title: 'VMS & LED Trailer Hire Prices Melbourne | Rate Card',
      description:
        'VMS sign hire and LED trailer sign hire prices in Melbourne: from $45/day ex GST on a 12-month contract, or a flat $500 plus 8% insurance for one to six days. Live pricing calculator.',
      h1: 'VMS and LED trailer hire prices',
      breadcrumb: [
        ['Home', '/'],
        ['Pricing', '/pricing/'],
      ],
      jsonLd: [
        hireProductLd({
          name: 'VMS, LED Trailer Sign and LED Screen Trailer Hire',
          description:
            'One day-rate card for VMS boards, LED trailer signs and LED screen trailers in Melbourne and Victoria — $45 to $75 per day ex GST by term, or a flat $500 plus 8% insurance for one to six days.',
          url: `${SITE_URL}/pricing/`,
        }),
        faqPage(PRICING_FAQ),
      ],
    },
  },
  {
    path: '/service-areas/',
    Page: ServiceAreas,
    src: 'src/pages/ServiceAreas.jsx',
    seo: {
      title: 'Service Areas | Sign & Screen Hire Across Victoria',
      description:
        'Where Ozzy’s Equipment Hire delivers VMS boards, LED trailer signs and LED screen trailers: Greater Melbourne plus Geelong, Ballarat, Bendigo and Gippsland.',
      h1: 'Service areas',
      breadcrumb: [
        ['Home', '/'],
        ['Service areas', '/service-areas/'],
      ],
      jsonLd: [],
    },
  },
  {
    path: '/service-areas/melbourne/',
    Page: AreaMelbourne,
    src: 'src/pages/areas/Melbourne.jsx',
    seo: {
      title: 'Sign & Screen Hire Melbourne | VMS, LED Trailer, Screens',
      description:
        'VMS board, LED trailer sign and LED screen trailer hire delivered across Greater Melbourne — inner suburbs to the northern, western and south-eastern growth corridors. From $45/day ex GST.',
      h1: 'Sign and screen hire in Melbourne',
      breadcrumb: [
        ['Home', '/'],
        ['Service areas', '/service-areas/'],
        ['Melbourne', '/service-areas/melbourne/'],
      ],
      jsonLd: [
        areaServiceLd({
          areaName: 'Melbourne',
          areaType: 'City',
          url: `${SITE_URL}/service-areas/melbourne/`,
          description:
            'VMS sign hire, LED trailer sign hire and LED screen trailer hire delivered across Greater Melbourne, with placement, programming and collection.',
        }),
      ],
    },
  },
  areaRoute(AreaGeelong, {
    name: 'Geelong',
    slug: 'geelong',
    areaType: 'City',
    title: 'Sign & Screen Hire Geelong | VMS, LED Trailer, Screens',
    description:
      'VMS board, LED trailer sign and LED screen trailer hire delivered to Geelong, the Bellarine and the Surf Coast from Melbourne. Book two to three weeks ahead. From $45/day ex GST.',
  }),
  areaRoute(AreaBallarat, {
    name: 'Ballarat',
    slug: 'ballarat',
    areaType: 'City',
    title: 'Sign & Screen Hire Ballarat | VMS, LED Trailer, Screens',
    description:
      'VMS board, LED trailer sign and LED screen trailer hire delivered to Ballarat and the western goldfields from Melbourne. Regional lead time two to three weeks. From $45/day ex GST.',
  }),
  areaRoute(AreaBendigo, {
    name: 'Bendigo',
    slug: 'bendigo',
    areaType: 'City',
    title: 'Sign & Screen Hire Bendigo | VMS, LED Trailer, Screens',
    description:
      'VMS board, LED trailer sign and LED screen trailer hire delivered to Bendigo and central Victoria from Melbourne. Book two to three weeks ahead. From $45/day ex GST.',
  }),
  areaRoute(AreaGippsland, {
    name: 'Gippsland',
    slug: 'gippsland',
    areaType: 'AdministrativeArea',
    title: 'Sign & Screen Hire Gippsland | VMS, LED Trailer, Screens',
    description:
      'VMS board, LED trailer sign and LED screen trailer hire delivered across Gippsland — Latrobe Valley, South and East Gippsland — from Melbourne. From $45/day ex GST.',
  }),
  {
    path: '/gallery/',
    Page: GalleryPage,
    src: 'src/pages/Gallery.jsx',
    seo: {
      title: 'Fleet Gallery | VMS, LED Trailer Sign & Screen Hire',
      description:
        'Photos of Ozzy’s Equipment Hire VMS boards, LED trailer signs and LED screen trailers on job sites across Melbourne and Victoria.',
      h1: 'Our fleet on the job',
      images: GALLERY_IMAGES,
      breadcrumb: [
        ['Home', '/'],
        ['Gallery', '/gallery/'],
      ],
      jsonLd: [galleryLd(GALLERY)],
    },
  },
  {
    path: '/guides/',
    Page: GuidesHub,
    src: 'src/pages/Guides.jsx',
    seo: {
      title: 'Hire Guides | VMS, LED Trailer Sign & Screen Hire',
      description:
        'Practical guides to VMS board, LED trailer sign and LED screen trailer hire in Victoria: what it costs, which trailer to choose, screen sizing, and the sign rules.',
      h1: 'Hire guides',
      breadcrumb: [
        ['Home', '/'],
        ['Guides', '/guides/'],
      ],
      jsonLd: [],
    },
  },
  guideRoute(VmsSignHireCost, {
    slug: 'vms-sign-hire-cost',
    h1: 'How much does VMS sign hire cost?',
    title: 'How Much Does VMS Sign Hire Cost? | Melbourne Rates',
    description:
      'VMS sign hire in Melbourne runs from $45/day ex GST on a 12-month contract to $75/day under a month, or a flat $500 plus 8% insurance for one to six days. Full rate card and a worked example.',
    faq: COST_FAQ,
  }),
  guideRoute(VmsVsLedTrailerSign, {
    slug: 'vms-vs-led-trailer-sign',
    h1: 'VMS board vs LED trailer sign vs LED screen trailer',
    title: 'VMS Board vs LED Trailer Sign vs LED Screen Trailer',
    description:
      'Three jobs for one trailer: plain text as a VMS board for traffic, a fixed full-colour advert as an LED trailer sign, and moving content as an LED screen trailer. How to choose the right framing.',
  }),
  guideRoute(LedScreenTrailerSizes, {
    slug: 'led-screen-trailer-sizes',
    h1: 'What size LED screen trailer do I need?',
    title: 'What Size LED Screen Trailer Do I Need? | Sizing Guide',
    description:
      'We run one screen trailer: a 2.4 by 1.6 metre full-colour screen at 4 mm pitch. What that size suits, how pixel pitch affects viewing distance, and when you need a bigger unit.',
    faq: SIZES_FAQ,
  }),
  guideRoute(TrafficManagementSignRulesVictoria, {
    slug: 'traffic-management-sign-rules-victoria',
    h1: 'Traffic management sign rules in Victoria',
    title: 'Traffic Management Sign Rules in Victoria | VMS Hire',
    description:
      'How VMS boards are governed on Victorian roads: the traffic management plan, road-authority permits, AS 4852, and what the hire company handles versus the customer.',
    faq: RULES_FAQ,
  }),
  guideRoute(WritingAVmsMessage, {
    slug: 'writing-a-vms-message',
    h1: 'Writing a VMS message that gets read',
    title: 'Writing a VMS Message That Gets Read | Ozzy’s Hire',
    description:
      'A driver has to read a VMS board in one glance at speed. Keep frames to three short lines, use recognised wording, run two or three frames, and take the text from the traffic management plan.',
    faq: WRITING_FAQ,
  }),
  guideRoute(HiringAnLedScreenForAFestival, {
    slug: 'hiring-an-led-screen-for-a-festival',
    h1: 'Hiring an LED screen for a festival: a checklist',
    title: 'Hiring an LED Screen for a Festival: Checklist',
    description:
      'Book two to three weeks out, confirm a level site clear of overhead lines with vehicle access, sort power for a longer hire, and have your content ready as image and video files.',
    faq: FESTIVAL_FAQ,
  }),
  guideRoute(SolarVsMainsPowerForALongHire, {
    slug: 'solar-vs-mains-power-for-a-long-hire',
    h1: 'Solar or mains power for a long hire?',
    title: 'Solar or Mains Power for a Long Sign Hire? | Ozzy’s Hire',
    description:
      'Short sign hires run on solar and battery. From about three weeks, or through overcast weather, plan for a 10A power point on site. The day rate does not change either way.',
    faq: POWER_FAQ,
  }),
  {
    // Most static hosts serve dist/404.html for any unmatched path.
    path: '/404.html',
    Page: NotFound,
    src: 'src/pages/NotFound.jsx',
    seo: {
      title: 'Page not found | Ozzy’s Equipment Hire',
      description:
        'That page could not be found. Browse VMS sign hire, LED trailer sign hire and LED screen trailer hire in Melbourne, or get in touch.',
      h1: 'That page isn’t here',
      noindex: true,
      breadcrumb: [['Home', '/']],
      jsonLd: [],
    },
  },
];

/**
 * Normalise a request path: strip a trailing slash, then add one back unless the
 * last segment has a file extension (e.g. `/404.html`). Kept in sync with the
 * same helper in src/client-routes.js.
 */
export function normPath(path) {
  if (!path || path === '/') return '/';
  const p = path.replace(/\/+$/, '');
  return /\.[a-z0-9]+$/i.test(p) ? p : `${p}/`;
}

/** Return the route for a path, falling back to the 404 route, then home. */
export function routeFor(path) {
  const norm = normPath(path);
  return (
    ROUTES.find((r) => r.path === norm) ||
    ROUTES.find((r) => r.path === '/404.html') ||
    ROUTES[0]
  );
}

export { faqPage };
