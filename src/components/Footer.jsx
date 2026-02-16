import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="https://www.ozzysequipmenthire.com.au" className="footer-logo" target="_blank" rel="noopener noreferrer">
            Ozzy's <span className="logo-accent">Equipment Hire</span>
          </a>
          <p>Mobile LED trailer hire across Melbourne and Victoria.</p>
        </div>
        <nav className="footer-nav">
          <a href="#services">Services</a>
          <a href="#pricing">Pricing</a>
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
