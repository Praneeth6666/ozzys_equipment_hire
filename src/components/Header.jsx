import { useState } from 'react';
import { NAV } from '../nav';
import './Header.css';

export default function Header({ path = '/' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const onHome = path === '/';

  function handleLogoClick(e) {
    // On the home page the logo just scrolls up; elsewhere it navigates home.
    if (onHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function isActive(href) {
    if (!href.startsWith('/')) return false;
    if (href === '/') return onHome;
    return path === href || path.startsWith(href);
  }

  return (
    <header className="header">
      <div className="header-inner container">
        <a href="/" onClick={handleLogoClick} className="logo" aria-label="Ozzy's Equipment Hire — home">
          <picture>
            <source
              type="image/webp"
              srcSet="/img/logo-240.webp 240w, /img/logo-360.webp 360w, /img/logo-480.webp 480w"
              sizes="136px"
            />
            <img
              src="/img/logo-240.png"
              srcSet="/img/logo-120.png 120w, /img/logo-240.png 240w, /img/logo-360.png 360w, /img/logo-480.png 480w"
              sizes="136px"
              alt="Ozzy's Equipment Hire — VMS sign hire and LED trailer sign hire Melbourne"
              width={136}
              height={78}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </a>
        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Primary">
          {NAV.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="nav-link"
              aria-current={isActive(href) ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="menu-toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
