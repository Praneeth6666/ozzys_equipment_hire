import { useState } from 'react';
import './Header.css';

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#areas', label: 'Areas' },
  { href: '#hire-guide', label: 'Guide' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogoClick(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <header className="header">
      <div className="header-inner container">
        <a href="/" onClick={handleLogoClick} className="logo">
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
        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="nav-link"
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
