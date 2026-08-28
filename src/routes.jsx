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
import VmsSignHireCost, { FAQ as COST_FAQ } from './pages/guides/VmsSignHireCost';
import VmsVsLedTrailerSign from './pages/guides/VmsVsLedTrailerSign';
import LedScreenTrailerSizes, {
  FAQ as SIZES_FAQ,
} from './pages/guides/LedScreenTrailerSizes';
import TrafficManagementSignRulesVictoria, {
  FAQ as RULES_FAQ,
} from './pages/guides/TrafficManagementSignRulesVictoria';
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

/** Build a /guides/<slug>/ article route. */
function guideRoute(Page, { slug, h1, title, description, faq }) {
  const path = `/guides/${slug}/`;
  return {
    path,
    Page,
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

/* -------------------------------------------------------------------- routes */

export const ROUTES = [
  {
    path: '/',
    Page: Home,
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
      breadcrumb: [['Home', '/']],
      jsonLd: [HOME_SERVICES, HOME_PRODUCT, faqPage(FAQ_ITEMS)],
    },
  },
  {
    path: '/vms-sign-hire/',
    Page: VmsSignHire,
    seo: {
      title: 'VMS Sign Hire Melbourne | Variable Message Signs',
      description:
        'VMS sign hire in Melbourne from $45/day ex GST. Trailer-mounted variable message signs for roadworks, traffic management and events — delivered, placed and programmed across Victoria.',
      h1: 'VMS sign hire in Melbourne',
      breadcrumb: [
        ['Home', '/'],
        ['VMS Sign Hire', '/vms-sign-hire/'],
      ],
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
    seo: {
      title: 'LED Trailer Sign Hire Melbourne | Trailer LED Signs',
      description:
        'LED trailer sign hire Melbourne from $45/day ex GST. Full-colour trailer LED signs for festivals, sport, retail and campaigns — towed in, positioned and collected across Victoria.',
      h1: 'LED trailer sign hire Melbourne',
      breadcrumb: [
        ['Home', '/'],
        ['LED Trailer Sign Hire Melbourne', '/led-trailer-sign-hire-melbourne/'],
      ],
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
    seo: {
      title: 'LED Screen Trailer Hire Melbourne | Mobile LED Screens',
      description:
        'LED screen trailer hire in Melbourne for festivals, sport and outdoor events. Mobile LED screen trailer hire with onboard sound and power — delivered, set up and operated across Victoria.',
      h1: 'LED screen trailer hire',
      breadcrumb: [
        ['Home', '/'],
        ['LED Screen Trailer Hire', '/led-screen-trailer-hire/'],
      ],
      jsonLd: [
        serviceLd({
          name: 'LED Screen Trailer Hire',
          serviceType: 'LED screen trailer hire',
          description:
            'Mobile LED screen trailer hire for festivals, sport, outdoor cinema and brand activations across Greater Melbourne and regional Victoria. Trailer-mounted LED video wall with onboard sound and power; delivery, setup and operation included.',
          url: `${SITE_URL}/led-screen-trailer-hire/`,
        }),
        hireProductLd({
          name: 'LED Screen Trailer Hire',
          description:
            'Mobile LED screen trailer hire in Melbourne and Victoria — a trailer-mounted LED video wall for events, with onboard PA and generator.',
          url: `${SITE_URL}/led-screen-trailer-hire/`,
        }),
        faqPage(LED_SCREEN_FAQ),
      ],
    },
  },
  {
    path: '/pricing/',
    Page: PricingPage,
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
    path: '/guides/',
    Page: GuidesHub,
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
      'Three trailer-mounted displays, three jobs: amber VMS boards for traffic messaging, full-colour LED trailer signs for advertising, LED screen trailers for event video. How to choose.',
  }),
  guideRoute(LedScreenTrailerSizes, {
    slug: 'led-screen-trailer-sizes',
    h1: 'What size LED screen trailer do I need?',
    title: 'What Size LED Screen Trailer Do I Need? | Sizing Guide',
    description:
      'Match an LED screen trailer to your event by viewing distance and crowd size. Pixel pitch and screen area explained, with a rough sizing guide and site checks.',
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
];

/** Normalise a request path and return its route (falling back to home). */
export function routeFor(path) {
  const norm = path && path.length > 1 ? path.replace(/\/+$/, '') + '/' : '/';
  return ROUTES.find((r) => r.path === norm) || ROUTES[0];
}

export { faqPage };
