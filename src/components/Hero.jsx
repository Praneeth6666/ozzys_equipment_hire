import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden />
      <div className="container hero-inner">
        <div className="hero-content">
          <p className="hero-badge">Melbourne & Victoria</p>
          <h1 className="hero-title">
            Mobile LED trailers that make your message
            <span className="hero-title-accent"> stand out</span>
          </h1>
          <p className="hero-desc">
            High-impact mobile LED screens for events, launches and outdoor campaigns across Melbourne and Victoria.
          </p>
          <div className="hero-actions">
            <a href="#pricing" className="btn btn-primary">
              Get a quote
            </a>
            <a href="#services" className="btn btn-ghost">
              Find out more
            </a>
          </div>
        </div>
        <div className="hero-image-wrap">
          <img
            src="/trailer.png"
            alt="Mobile LED trailer with digital display at an outdoor event"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
}
