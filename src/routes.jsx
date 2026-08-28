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
function serviceLd({ name, serviceType, description, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType,
    description,
    provider: BUSINESS,
    areaServed: ['Melbourne', 'Victoria', 'Australia'],
    url,
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
        'VMS sign hire and LED trailer sign hire Melbourne. Hire LED screen trailers, trailer LED signs and mobile LED screen trailers with delivery and setup. Get a quote from Ozzy’s Equipment Hire.',
      h1: 'VMS sign hire & LED trailer sign hire Melbourne',
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
];

/** Normalise a request path and return its route (falling back to home). */
export function routeFor(path) {
  const norm = path && path.length > 1 ? path.replace(/\/+$/, '') + '/' : '/';
  return ROUTES.find((r) => r.path === norm) || ROUTES[0];
}

export { faqPage };
