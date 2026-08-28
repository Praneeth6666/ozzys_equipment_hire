import { renderToString } from 'react-dom/server';
import { StrictMode } from 'react';
import App from './App.jsx';
import { ROUTES, SITE_URL, routeFor } from './routes';

export { ROUTES };

/** Render one route's body to an HTML string. */
export function render(path = '/') {
  return renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>
  );
}

/* ------------------------------------------------------------------ <head> */

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function webPageLd(route, url) {
  const s = route.seo;
  const isArticle = s.ogType === 'article';
  const ld = {
    '@context': 'https://schema.org',
    '@type': isArticle ? 'Article' : 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: s.title,
    description: s.description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    inLanguage: 'en-AU',
  };
  if (isArticle) {
    ld.headline = s.h1;
    ld.publisher = { '@id': `${SITE_URL}/#organization` };
  } else {
    ld.about = { '@id': `${SITE_URL}/#business` };
    ld.mainEntity = { '@id': `${SITE_URL}/#business` };
  }
  if (s.primaryImage) ld.primaryImageOfPage = { '@type': 'ImageObject', ...s.primaryImage };
  if (s.keywords) ld.keywords = s.keywords;
  if (s.breadcrumb && s.breadcrumb.length > 1) ld.breadcrumb = { '@id': `${url}#breadcrumb` };
  return ld;
}

function breadcrumbLd(crumbs, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: crumbs.map(([name, p], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: SITE_URL + p,
    })),
  };
}

// Home is the only page whose LCP element is the hero photo.
const HERO_PRELOAD = [
  '<link rel="preload" as="image" type="image/avif" media="(max-width: 900px)" href="/img/hero-trailer-600.avif" imagesrcset="/img/hero-trailer-360.avif 360w, /img/hero-trailer-480.avif 480w, /img/hero-trailer-600.avif 600w" imagesizes="calc(100vw - 4rem)" fetchpriority="high" />',
  '<link rel="preload" as="image" type="image/avif" media="(min-width: 901px)" href="/img/hero-trailer-768.avif" imagesrcset="/img/hero-trailer-600.avif 600w, /img/hero-trailer-768.avif 768w" imagesizes="(max-width: 1280px) 45vw, 600px" fetchpriority="high" />',
];

/**
 * Per-page <head> inner HTML. prerender.js swaps this in at the
 * `<!--ssg:head-->` marker in index.html. Global tags (icons, fonts,
 * OG image, Organization / WebSite / LocalBusiness JSON-LD) stay in the
 * template; everything that varies per URL is built here.
 */
export function renderHead(path = '/') {
  const route = routeFor(path);
  const s = route.seo;
  const url = SITE_URL + route.path;
  const ogType = s.ogType || 'website';

  const tags = [
    `<title>${esc(s.title)}</title>`,
    `<meta name="description" content="${esc(s.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<link rel="alternate" hreflang="en-au" href="${url}" />`,
  ];
  if (route.path === '/') tags.push(`<link rel="alternate" hreflang="x-default" href="${url}" />`);
  tags.push(
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:title" content="${esc(s.title)}" />`,
    `<meta property="og:description" content="${esc(s.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta name="twitter:title" content="${esc(s.title)}" />`,
    `<meta name="twitter:description" content="${esc(s.description)}" />`,
  );
  if (route.path === '/') tags.push(...HERO_PRELOAD);

  const graph = [webPageLd(route, url)];
  if (s.breadcrumb && s.breadcrumb.length > 1) graph.push(breadcrumbLd(s.breadcrumb, url));
  for (const obj of s.jsonLd || []) graph.push(obj);

  for (const obj of graph) {
    tags.push(`<script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n    </script>`);
  }
  return tags.join('\n    ');
}
