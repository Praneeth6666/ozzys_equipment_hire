/**
 * Client-side lazy route map.
 *
 * Kept separate from src/routes.jsx on purpose: the browser bundle must NOT pull
 * in every page. Each entry is a dynamic import that Vite splits into its own
 * chunk, fetched only for the page actually being viewed. routes.jsx (with its
 * static page imports) is used only by the SSR/prerender build.
 *
 * Keep the path list in sync with ROUTES in src/routes.jsx — prerender.js checks
 * this at build time and fails the build if a route has no loader here.
 */
const LOADERS = {
  '/': () => import('./pages/Home.jsx'),
  '/vms-sign-hire/': () => import('./pages/VmsSignHire.jsx'),
  '/led-trailer-sign-hire-melbourne/': () => import('./pages/LedTrailerSignHireMelbourne.jsx'),
  '/led-screen-trailer-hire/': () => import('./pages/LedScreenTrailerHire.jsx'),
  '/pricing/': () => import('./pages/Pricing.jsx'),
  '/service-areas/': () => import('./pages/ServiceAreas.jsx'),
  '/service-areas/melbourne/': () => import('./pages/areas/Melbourne.jsx'),
  '/service-areas/geelong/': () => import('./pages/areas/Geelong.jsx'),
  '/service-areas/ballarat/': () => import('./pages/areas/Ballarat.jsx'),
  '/service-areas/bendigo/': () => import('./pages/areas/Bendigo.jsx'),
  '/service-areas/gippsland/': () => import('./pages/areas/Gippsland.jsx'),
  '/gallery/': () => import('./pages/Gallery.jsx'),
  '/guides/': () => import('./pages/Guides.jsx'),
  '/guides/vms-sign-hire-cost/': () => import('./pages/guides/VmsSignHireCost.jsx'),
  '/guides/vms-vs-led-trailer-sign/': () => import('./pages/guides/VmsVsLedTrailerSign.jsx'),
  '/guides/led-screen-trailer-sizes/': () => import('./pages/guides/LedScreenTrailerSizes.jsx'),
  '/guides/traffic-management-sign-rules-victoria/': () =>
    import('./pages/guides/TrafficManagementSignRulesVictoria.jsx'),
};

/** Normalise a path the same way routeFor() does, then return its loader. */
export function clientRouteFor(path) {
  const norm = path && path.length > 1 ? path.replace(/\/+$/, '') + '/' : '/';
  return LOADERS[norm] || LOADERS['/'];
}
