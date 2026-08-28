/**
 * Prerender script — runs after `vite build` to produce static HTML.
 *
 * 1. Builds the server entry (src/entry-server.jsx) via Vite SSR mode.
 * 2. Calls render() to get the full React tree as an HTML string.
 * 3. Injects it into dist/index.html inside <div id="root">.
 * 4. Inlines the built CSS into <head> and drops the stylesheet <link>.
 *
 * The client bundle produced by the normal `vite build` then hydrates
 * the pre-rendered markup, so interactivity (pricing calc, form, etc.) works.
 *
 * Step 4 is the FCP fix: with the CSS in the document, a mobile browser can
 * paint straight off the HTML response instead of waiting on a second
 * round trip. The whole sheet gzips to a few KB — less than the request it
 * replaces — and the fonts it references are same-origin and preloaded.
 */

import { build } from 'vite';
import { readFileSync, writeFileSync, rmSync, existsSync, unlinkSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, 'dist');

/** Inline the emitted stylesheet and remove its render-blocking <link>. */
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

  // The file is no longer referenced by anything — don't ship it.
  unlinkSync(cssPath);

  return html.replace(linkTag, `<style>${css}</style>`);
}

async function prerender() {
  console.log('[SSG] Building server bundle…');

  // Build the SSR bundle into a temp directory
  await build({
    build: {
      ssr: true,
      outDir: 'dist/server',
      rollupOptions: {
        input: resolve(__dirname, 'src/entry-server.jsx'),
      },
    },
    // Suppress most logs during SSR build
    logLevel: 'warn',
  });

  console.log('[SSG] Rendering app to static HTML…');

  // Import the server bundle and call render()
  const { render } = await import(resolve(DIST, 'server/entry-server.js'));
  const appHtml = render();

  // Read the client-built index.html
  const indexPath = resolve(DIST, 'index.html');
  let html = readFileSync(indexPath, 'utf-8');

  // Inject pre-rendered markup into <div id="root">
  if (!html.includes('<div id="root"></div>')) {
    throw new Error('[SSG] Could not find <div id="root"></div> in dist/index.html');
  }
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  html = inlineCss(html);

  // Write the final SSG index.html
  writeFileSync(indexPath, html);

  // Clean up the server bundle — it's not needed for deployment
  rmSync(resolve(DIST, 'server'), { recursive: true, force: true });

  // Stray macOS metadata that `vite build` happily copies out of public/
  const junk = resolve(DIST, '.DS_Store');
  if (existsSync(junk)) unlinkSync(junk);

  const kb = (readFileSync(indexPath).length / 1024).toFixed(1);
  console.log(`[SSG] dist/index.html written — ${kb} kB, fully pre-rendered, no blocking CSS.`);
}

prerender().catch((err) => {
  console.error('[SSG] Prerender failed:', err);
  process.exit(1);
});
