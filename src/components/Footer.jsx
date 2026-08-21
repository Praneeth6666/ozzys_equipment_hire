import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a
            href="https://www.ozzysequipmenthire.com.au"
            className="footer-logo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ozzy's Equipment Hire"
          >
            <img src="/logo.svg" alt="Ozzy's Equipment Hire — VMS sign hire and LED trailer sign hire Melbourne" className="footer-logo-img" width={160} height={80} />
          </a>
          <p>
            VMS sign hire, LED trailer sign hire &amp; LED screen trailer hire — Melbourne &amp; Victoria.
          </p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          <a href="#services">Services</a>
          <a href="#areas">Areas</a>
          <a href="#hire-guide">Guide</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="https://www.ozzysequipmenthire.com.au" target="_blank" rel="noopener noreferrer">Website</a>
        </nav>
        <div className="footer-bottom">
          <p>&copy; {year} Ozzy's Equipment Hire. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
