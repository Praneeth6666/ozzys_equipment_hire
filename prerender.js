/**
 * Prerender script — runs after `vite build` to produce static HTML.
 *
 * 1. Builds the server entry (src/entry-server.jsx) via Vite SSR mode.
 * 2. Calls render() to get the full React tree as an HTML string.
 * 3. Injects it into dist/index.html inside <div id="root">.
 *
 * The client bundle produced by the normal `vite build` then hydrates
 * the pre-rendered markup, so interactivity (pricing calc, form, etc.) works.
 */

import { build } from 'vite';
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
  const { render } = await import(resolve(__dirname, 'dist/server/entry-server.js'));
  const appHtml = render();

  // Read the client-built index.html
  const indexPath = resolve(__dirname, 'dist/index.html');
  let html = readFileSync(indexPath, 'utf-8');

  // Inject pre-rendered markup into <div id="root">
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  // Write the final SSG index.html
  writeFileSync(indexPath, html);

  // Clean up the server bundle — it's not needed for deployment
  rmSync(resolve(__dirname, 'dist/server'), { recursive: true, force: true });

  console.log('[SSG] Static HTML generated successfully.');
  console.log('[SSG] dist/index.html now contains pre-rendered content.');
}

prerender().catch((err) => {
  console.error('[SSG] Prerender failed:', err);
  process.exit(1);
});
