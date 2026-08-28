import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import './fonts.css'
import './index.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { clientRouteFor } from './client-routes'

// Load only the chunk for this page, then mount the shell. Header and Footer
// are in the entry chunk (small, shared by every page); the page component is a
// per-route chunk. routes.jsx / App.jsx stay server-only so the browser never
// downloads all 17 pages.
const root = document.getElementById('root');
const path = window.location.pathname;

clientRouteFor(path)().then((mod) => {
  const Page = mod.default;
  const app = (
    <StrictMode>
      <Header path={path} />
      <Page />
      <Footer />
    </StrictMode>
  );
  // Production: #root already holds the prerendered markup → hydrate.
  // Dev / empty root → client render.
  if (root.innerHTML.trim().length > 0) {
    hydrateRoot(root, app);
  } else {
    createRoot(root).render(app);
  }
});
