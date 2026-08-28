import { NAV, AREA_LINKS } from '../nav';
import './Footer.css';

// Baked in at build time. Reading the clock here would make the prerendered
// HTML and the hydration pass disagree across a new year, and React answers a
// mismatch by re-rendering the whole tree on the client.
const year = __BUILD_YEAR__;

export default function Footer() {

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="/" className="footer-logo" aria-label="Ozzy's Equipment Hire — home">
            <picture>
              <source
                type="image/webp"
                srcSet="/img/logo-240.webp 240w, /img/logo-360.webp 360w, /img/logo-480.webp 480w"
                sizes="122px"
              />
              <img
                src="/img/logo-240.png"
                srcSet="/img/logo-120.png 120w, /img/logo-240.png 240w, /img/logo-360.png 360w"
                sizes="122px"
                alt="Ozzy's Equipment Hire — VMS sign hire and LED trailer sign hire Melbourne"
                className="footer-logo-img"
                width={122}
                height={70}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </a>
          <p>
            VMS sign hire, LED trailer sign hire &amp; LED screen trailer hire — Melbourne &amp; Victoria.
          </p>
          <p className="footer-contact">
            <a href="tel:+61469316068">0469 316 068</a>
            <span aria-hidden="true"> · </span>
            <a href="mailto:ozzysequipmenthire@gmail.com">ozzysequipmenthire@gmail.com</a>
          </p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          {NAV.map(({ href, label }) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <nav className="footer-nav footer-nav--areas" aria-label="Service areas">
          {AREA_LINKS.map(({ href, label }) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <div className="footer-bottom">
          <p>&copy; {year} Ozzy's Equipment Hire. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
