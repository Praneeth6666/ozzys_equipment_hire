/**
 * Route manifest — the single source of truth for every page on the site.
 *
 * Each entry: { path, Page, seo }. `prerender.js` walks this list to emit one
 * static HTML file per path; `App.jsx` matches `window.location.pathname` to a
 * Page at hydration time. Adding a page = adding an entry here.
 *
 * The `seo` object is consumed by `renderHead()` in entry-server.jsx (added in
 * task 0.3). Shape:
 *   {
 *     title,                        // <=60 chars, target phrase near the front
 *     description,                  // 140-160 chars
 *     h1,                           // target phrase, distinct from title
 *     breadcrumb: [[label, path]],
 *     jsonLd: [ ...schema.org objects ],
 *   }
 */

import Home from './pages/Home';

export const SITE_URL = 'https://www.ozzysequipmenthire.com.au';

export const ROUTES = [
  {
    path: '/',
    Page: Home,
    seo: {
      title: 'VMS Sign Hire | LED Trailer Sign Hire Melbourne',
      description:
        'VMS sign hire and LED trailer sign hire Melbourne. Hire LED screen trailers, trailer LED signs and mobile LED screen trailers with delivery and setup. Get a quote from Ozzy’s Equipment Hire.',
      h1: 'VMS sign hire & LED trailer sign hire Melbourne',
      breadcrumb: [['Home', '/']],
      jsonLd: [],
    },
  },
];

/** Normalise a request path and return its route (falling back to home). */
export function routeFor(path) {
  const norm = path && path.length > 1 ? path.replace(/\/+$/, '') + '/' : '/';
  return ROUTES.find((r) => r.path === norm) || ROUTES[0];
}
