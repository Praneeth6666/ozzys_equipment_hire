import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden />
      <div className="container hero-inner">
        <div className="hero-content">
          <p className="hero-badge">LED · VMS · Mobile billboard trailers · Melbourne &amp; Victoria</p>
          <h1 className="hero-title">
            LED, VMS &amp; mobile billboard trailer hire
            <span className="hero-title-accent"> near you</span>
          </h1>
          <p className="hero-desc">
            Looking for LED trailers near me, VMS trailers near me or billboard trailers near me? We deliver
            high-impact mobile screens for events, roadworks and outdoor campaigns across Melbourne and Victoria.
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
            srcSet="/trailer.png 768w, /trailer@2x.png 1536w"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 560px"
            width={768}
            height={1024}
            fetchPriority="high"
            decoding="async"
            alt="Mobile LED billboard trailer with digital display for hire in Melbourne and Victoria"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
}
