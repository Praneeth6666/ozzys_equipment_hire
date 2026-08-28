import { renderToString } from 'react-dom/server';
import { StrictMode } from 'react';
import App from './App.jsx';

export { ROUTES } from './routes';

/** Render one route's body to an HTML string. */
export function render(path = '/') {
  return renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>
  );
}
