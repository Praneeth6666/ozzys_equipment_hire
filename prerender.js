/**
 * Prerender — runs after `vite build`.
 *
 * 1. Builds the server entry (src/entry-server.jsx) via Vite SSR mode.
 * 2. Reads dist/index.html as the shared template and inlines the built CSS
 *    into <head> (drops the render-blocking stylesheet <link>).
 * 3. For every route in ROUTES, renders that page to HTML and writes
 *    dist/<path>/index.html (/ -> dist/index.html).
 *
 * The client bundle hydrates whichever page matches window.location.pathname.
 */

import { build } from 'vite';
import { readFileSync, writeFileSync, rmSync, existsSync, unlinkSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSitemap, buildLlmsTxt, lastModified } from './scripts/seo-lib.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, 'dist');
const PUBLIC = resolve(__dirname, 'public');
const ROOT_MARKER = '<div id="root"></div>';
const HEAD_MARKER = '<!--ssg:head-->';

/** Inline the emitted stylesheet and remove its render-blocking <link>. Once. */
function inlineCss(html) {
  const linkRe = /<link[^>]+rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/;
  const match = html.match(linkRe);
  if (!match) {
    console.warn('[SSG] No stylesheet <link> found — leaving HTML as-is.');
    return html;
  }
  const [linkTag, href] = match;
  const cssPath = resolve(DIST, href.replace(/^\//, ''));
  const css = readFileSync(cssPath, 'utf-8');
  console.log(`[SSG] Inlining ${href} (${(css.length / 1024).toFixed(1)} kB) into <head>.`);
  unlinkSync(cssPath); // no longer referenced
  return html.replace(linkTag, `<style>${css}</style>`);
}

/**
 * dist location for a route path.
 *   '/'          -> dist/index.html
 *   '/a/b/'      -> dist/a/b/index.html
 *   '/404.html'  -> dist/404.html   (a file hosts serve for unmatched paths)
 */
function outFileFor(routePath) {
  if (routePath === '/') return resolve(DIST, 'index.html');
  const clean = routePath.replace(/^\/+|\/+$/g, '');
  if (/\.html?$/i.test(clean)) return resolve(DIST, clean);
  return resolve(DIST, clean, 'index.html');
}

async function prerender() {
  console.log('[SSG] Building server bundle…');
  await build({
    build: {
      ssr: true,
      outDir: 'dist/server',
      rollupOptions: { input: resolve(__dirname, 'src/entry-server.jsx') },
    },
    logLevel: 'warn',
  });

  const { render, renderHead, ROUTES } = await import(resolve(DIST, 'server/entry-server.js'));

  // Guard: every route needs a lazy loader in src/client-routes.js, or the page
  // would prerender fine but never hydrate.
  const clientSrc = readFileSync(resolve(__dirname, 'src/client-routes.js'), 'utf-8');
  const clientPaths = new Set(
    [...clientSrc.matchAll(/'(\/[^']*)':\s*\(\)\s*=>/g)].map((m) => m[1]),
  );
  const missing = ROUTES.map((r) => r.path).filter((p) => !clientPaths.has(p));
  if (missing.length) {
    throw new Error(`[SSG] src/client-routes.js has no loader for: ${missing.join(', ')}`);
  }

  const indexPath = resolve(DIST, 'index.html');
  let template = readFileSync(indexPath, 'utf-8');
  for (const marker of [ROOT_MARKER, HEAD_MARKER]) {
    if (!template.includes(marker)) {
      throw new Error(`[SSG] Could not find ${marker} in dist/index.html`);
    }
  }
  template = inlineCss(template);

  console.log(`[SSG] Rendering ${ROUTES.length} route(s)…`);
  for (const route of ROUTES) {
    const appHtml = render(route.path);
    const html = template
      .replace(HEAD_MARKER, () => renderHead(route.path))
      .replace(ROOT_MARKER, () => `<div id="root">${appHtml}</div>`);
    const out = outFileFor(route.path);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, html);
    const kb = (Buffer.byteLength(html) / 1024).toFixed(1);
    console.log(`[SSG]   ${route.path.padEnd(36)} ${kb} kB`);
  }

  rmSync(resolve(DIST, 'server'), { recursive: true, force: true });
  const junk = resolve(DIST, '.DS_Store');
  if (existsSync(junk)) unlinkSync(junk);

  // Crawler files, built from the real route list. Written to dist/ (deployed)
  // and public/ (so the committed copy and the dev server stay accurate).
  const lastmod = lastModified(['src', 'index.html'], __dirname);
  const sitemap = buildSitemap(ROUTES, __dirname, lastmod);
  const llms = buildLlmsTxt(ROUTES);
  for (const dir of [DIST, PUBLIC]) {
    writeFileSync(resolve(dir, 'sitemap.xml'), sitemap);
    writeFileSync(resolve(dir, 'llms.txt'), llms);
  }
  const indexable = ROUTES.filter((r) => !r.seo || !r.seo.noindex).length;
  console.log(`[SSG] sitemap.xml (${indexable} URLs) + llms.txt written; lastmod ${lastmod}.`);

  console.log('[SSG] Done — every route pre-rendered, no blocking CSS.');
}

prerender().catch((err) => {
  console.error('[SSG] Prerender failed:', err);
  process.exit(1);
});
