/**
 * Generates the crawler-facing files that have to stay in step with the site:
 * sitemap.xml, robots.txt and llms.txt.
 *
 * Runs before `vite build` so the output lands in public/ and gets copied into
 * dist/ like any other static asset. The files are committed too, so the dev
 * server serves the same thing production does.
 *
 * `lastmod` comes from the last commit that touched the page's own sources —
 * not from the clock. A sitemap that claims "modified today" on every deploy is
 * noise, and Google learns to ignore it.
 */

import { writeFileSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PUBLIC = resolve(ROOT, 'public');

const SITE = 'https://www.ozzysequipmenthire.com.au';

/** Sources that determine the content of the single page. */
const PAGE_SOURCES = ['index.html', 'src'];

function lastModified(paths) {
  try {
    const iso = execFileSync(
      'git',
      ['log', '-1', '--format=%cs', '--', ...paths],
      { cwd: ROOT, encoding: 'utf-8' },
    ).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  } catch {
    // Not a git checkout, or no commits yet — fall through.
  }
  return new Date().toISOString().slice(0, 10);
}

/* ------------------------------------------------------------------ sitemap */

/**
 * One indexable URL. The section anchors are navigation within that page, not
 * separate documents — listing them as <url> entries would be submitting
 * duplicates of the same page, which is what Search Console flags as
 * "Alternate page with proper canonical tag". They belong in llms.txt and the
 * on-page nav instead.
 */
function buildSitemap(lastmod) {
  const images = [
    {
      loc: `${SITE}/img/hero-trailer-768.jpg`,
      title: 'LED screen trailer hire Melbourne',
      caption:
        'Mobile LED screen trailer used for VMS sign hire and LED trailer sign hire in Melbourne.',
    },
    {
      loc: `${SITE}/img/og-image.jpg`,
      title: "Ozzy's Equipment Hire — VMS sign hire Melbourne",
      caption: 'VMS sign hire, LED trailer sign hire and LED screen trailer hire across Victoria.',
    },
  ];

  const imageXml = images
    .map(
      (img) => `    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      <image:caption>${escapeXml(img.caption)}</image:caption>
    </image:image>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${SITE}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en-au" href="${SITE}/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/" />
${imageXml}
  </url>
</urlset>
`;
}

function escapeXml(s) {
  return s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));
}

/* ------------------------------------------------------------------- robots */

function buildRobots() {
  // Deliberately no `Disallow: /*?*` for tracking params: blocking the crawl
  // stops Google reading the canonical tag, which is what actually collapses
  // those duplicates. Disallow would make the problem worse, not better.
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

/* ----------------------------------------------------------------- llms.txt */

/**
 * llms.txt per the llmstxt.org spec: an H1 with the site name, a single
 * blockquote summary, optional free prose, then H2 sections whose bodies are
 * *markdown link lists* — `- [name](url): notes`. The previous file used plain
 * unlinked bullets under its H2s, so a consumer parsing it to spec found zero
 * resolvable resources.
 */
function buildLlmsTxt() {
  return `# Ozzy's Equipment Hire

> Melbourne-based hire company supplying VMS signs, LED trailer signs and LED screen trailers across Victoria, Australia. Delivery, setup and programming are included; day rates start at $60 per day ex GST on longer contracts.

The whole business lives on one page — the links below are section anchors on that page, not separate documents. Enquiries are handled by phone (0469 316 068), email or the quote form; there is no online checkout and no account system.

## Services

- [VMS sign hire](${SITE}/#services): Variable message sign trailers for traffic management, roadworks and construction site safety. Programmed to your schedule.
- [LED trailer sign hire Melbourne](${SITE}/#services): Towable LED trailer signs for festivals, sport, retail activations and roadside campaigns. Also called trailer LED sign hire.
- [LED screen trailer hire](${SITE}/#services): Mobile LED screen trailers for events, outdoor advertising and public messaging. Also called LED trailer screen hire or mobile trailer LED screen hire.

## Key pages

- [Home](${SITE}/): Overview of every hire service, with the enquiry path.
- [Service areas](${SITE}/#areas): Suburbs and regions covered for delivery.
- [Hire guide](${SITE}/#hire-guide): Which trailer suits which job — VMS vs LED sign vs LED screen.
- [Pricing](${SITE}/#pricing): Day-rate calculator; rates scale with hire length.
- [FAQ](${SITE}/#faq): Answers on cost, coverage, delivery and equipment types.
- [About](${SITE}/#about): Who runs the business and how it operates.
- [Contact](${SITE}/#contact): Phone 0469 316 068, email ozzysequipmenthire@gmail.com, or the quote form — send dates, site location and which unit you need.

## Service area

- [Melbourne and Victoria coverage](${SITE}/#areas): Melbourne CBD, Southbank and Docklands, Richmond, South Yarra, Footscray, Dandenong, Frankston and the Mornington Peninsula, plus Geelong, Ballarat, Bendigo, Gippsland and regional Victoria.

## Optional

- [Sitemap](${SITE}/sitemap.xml): Canonical URL list in XML.
- [Phone](tel:+61469316068): 0469 316 068 — fastest way to reach a human.
- [Email](mailto:ozzysequipmenthire@gmail.com): ozzysequipmenthire@gmail.com
`;
}

/* --------------------------------------------------------------------- main */

const lastmod = lastModified(PAGE_SOURCES);

const outputs = {
  'sitemap.xml': buildSitemap(lastmod),
  'robots.txt': buildRobots(),
  'llms.txt': buildLlmsTxt(),
};

for (const [name, content] of Object.entries(outputs)) {
  const path = resolve(PUBLIC, name);
  let changed = true;
  try {
    changed = readFileSync(path, 'utf-8') !== content;
  } catch {
    // New file.
  }
  writeFileSync(path, content);
  console.log(`[seo] ${name}${changed ? '' : ' (unchanged)'}`);
}

console.log(`[seo] sitemap lastmod: ${lastmod}`);
