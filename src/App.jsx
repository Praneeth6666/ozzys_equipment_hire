import Header from './components/Header';
import Footer from './components/Footer';
import { routeFor } from './routes';

/**
 * Shell for every page. `path` comes from the prerenderer (build time) or
 * `window.location.pathname` (hydration). The matched route supplies the page
 * body; Header and Footer are shared.
 */
export default function App({ path = '/' }) {
  const { Page } = routeFor(path);
  return (
    <>
      <Header path={path} />
      <Page />
      <Footer />
    </>
  );
}
