/**
 * Shared builders for the crawler-facing files. `prerender.js` calls these with
 * the real ROUTES array (imported from the SSR bundle), so the sitemap and
 * llms.txt can never drift from what actually builds.
 */

import { execFileSync } from 'node:child_process';

export const SITE = 'https://www.ozzysequipmenthire.com.au';

/** Last commit date (YYYY-MM-DD) that touched any of `paths`, or today. */
export function lastModified(paths, cwd) {
  try {
    const iso = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...paths], {
      cwd,
      encoding: 'utf-8',
    }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  } catch {
    // Not a git checkout, or no commits — fall through.
  }
  return new Date().toISOString().slice(0, 10);
}

const depthOf = (p) => (p === '/' ? 0 : p.replace(/^\/+|\/+$/g, '').split('/').length);

export function buildSitemap(routes, lastmod) {
  const homeImages = `
    <image:image>
      <image:loc>${SITE}/img/hero-trailer-768.jpg</image:loc>
      <image:title>LED screen trailer hire Melbourne</image:title>
      <image:caption>Mobile LED screen trailer used for VMS sign hire and LED trailer sign hire in Melbourne.</image:caption>
    </image:image>
    <image:image>
      <image:loc>${SITE}/img/og-image.jpg</image:loc>
      <image:title>Ozzy&apos;s Equipment Hire — VMS sign hire Melbourne</image:title>
      <image:caption>VMS sign hire, LED trailer sign hire and LED screen trailer hire across Victoria.</image:caption>
    </image:image>`;

  const urls = routes
    .map((r) => {
      const p = r.path;
      const loc = `${SITE}${p}`;
      const depth = depthOf(p);
      const priority = p === '/' ? '1.0' : Math.max(0.4, 0.9 - depth * 0.1).toFixed(1);
      const changefreq = depth <= 1 ? 'weekly' : 'monthly';
      const xdefault =
        p === '/' ? `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}" />` : '';
      const images = p === '/' ? homeImages : '';
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="en-au" href="${loc}" />${xdefault}${images}
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

export function buildRobots() {
  return `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Assistant crawlers — same access as everyone else.
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;
}

/**
 * llms.txt per llmstxt.org: H1, one blockquote summary, prose, then H2 sections
 * whose bodies are markdown link lists. Sections are derived from the route
 * paths so this stays in step with the site.
 */
export function buildLlmsTxt(routes) {
  const byPath = Object.fromEntries(routes.map((r) => [r.path, r]));
  const link = (path, note) => {
    const r = byPath[path];
    if (!r) return null;
    const name = r.seo.h1 || r.seo.title;
    return `- [${name}](${SITE}${path})${note ? `: ${note}` : r.seo.description ? `: ${r.seo.description}` : ''}`;
  };
  const list = (paths) => paths.map((p) => (Array.isArray(p) ? link(p[0], p[1]) : link(p))).filter(Boolean).join('\n');

  const guidePaths = routes.filter((r) => r.path.startsWith('/guides/') && r.path !== '/guides/').map((r) => r.path);
  const areaPaths = routes
    .filter((r) => r.path.startsWith('/service-areas/') && r.path !== '/service-areas/')
    .map((r) => r.path);

  return `# Ozzy's Equipment Hire

> Melbourne-based hire company: VMS message-sign boards, full-colour LED trailer signs and mobile LED screen trailers, delivered, placed and programmed across Greater Melbourne and regional Victoria. Day rates from $45 per day ex GST; short hires of one to six days are a flat $500 plus 8% insurance.

Enquiries go through the quote form, phone (0469 316 068) or email. There is no online checkout and no account system. Each service below has its own page.

## Services

${list(['/vms-sign-hire/', '/led-trailer-sign-hire-melbourne/', '/led-screen-trailer-hire/'])}

## Pricing

${list(['/pricing/'])}

## Guides

${list(guidePaths)}

## Service areas

${list(['/service-areas/', ...areaPaths])}

## Contact

- [Quote form](${SITE}/#contact): Send dates, site address and which unit you need.
- [Phone](tel:+61469316068): 0469 316 068 — fastest way to reach a human.
- [Email](mailto:ozzysequipmenthire@gmail.com): ozzysequipmenthire@gmail.com

## Optional

- [Sitemap](${SITE}/sitemap.xml): Every indexable URL in XML.
`;
}
