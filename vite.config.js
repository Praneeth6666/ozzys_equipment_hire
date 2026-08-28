import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Build-time constant so the prerendered HTML and the hydrated tree agree.
    __BUILD_YEAR__: new Date().getFullYear(),
  },
  build: {
    // One CSS file, so prerender.js can inline the whole thing into <head> and
    // drop the render-blocking <link>. It gzips to ~4 KB — cheaper than the
    // round trip it replaces.
    cssCodeSplit: false,
    assetsInlineLimit: 2048,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        // Keep React in its own long-cached chunk so app edits don't invalidate it.
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) {
            return 'react-vendor'
          }
        },
      },
    },
  },
})
