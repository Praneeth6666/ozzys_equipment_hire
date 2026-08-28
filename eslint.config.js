import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'public']),

  // Application code — runs in the browser.
  {
    files: ['src/**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        // Injected by Vite's `define` (see vite.config.js).
        __BUILD_YEAR__: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // `catch {}` around storage access is deliberate — see Contact/Pricing.
      'no-empty': ['error', { allowEmptyCatch: true }],
    },
  },

  // The routing layer legitimately exports data + helpers alongside pages;
  // it's not part of the HMR component graph.
  {
    files: ['src/routes.jsx', 'src/entry-server.jsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },

  // Build tooling — runs in Node.
  {
    files: ['*.js', 'scripts/**/*.mjs'],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.node,
      parserOptions: { sourceType: 'module' },
    },
  },
])
