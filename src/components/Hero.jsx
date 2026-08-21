import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden />
      <div className="container hero-inner">
        <div className="hero-content">
          <p className="hero-badge">VMS sign hire · LED trailer sign hire · Melbourne &amp; Victoria</p>
          <h1 className="hero-title">
            VMS sign hire &amp; LED trailer sign hire
            <span className="hero-title-accent"> Melbourne</span>
          </h1>
          <p className="hero-desc">
            Hire VMS signs, LED trailer signs and LED screen trailers for events, roadworks and campaigns.
            Trailer LED sign hire and mobile LED screen trailer hire Melbourne with delivery, setup and
            flexible rates.
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
            alt="LED screen trailer and VMS sign hire in Melbourne — mobile LED trailer display"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
}
