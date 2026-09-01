import './Hero.css';

/**
 * The hero photo is the LCP element on mobile (it sits above the headline via
 * `order: -1` below 900px), so it gets AVIF/WebP, per-breakpoint candidates,
 * and a matching <link rel="preload"> in index.html.
 *
 * Mobile deliberately tops out at 600w rather than 768w: the rendered box is
 * ~358 CSS px, so 600w is still ~1.7x density and saves ~30 KB on the metric
 * that mobile PageSpeed actually measures.
 */
const MOBILE_MEDIA = '(max-width: 900px)';
const MOBILE_SIZES = 'calc(100vw - 4rem)';
const DESKTOP_SIZES = '(max-width: 1280px) 45vw, 600px';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden />
      <div className="container hero-inner">
        <div className="hero-content">
          <p className="hero-badge">Melbourne &amp; regional Victoria</p>
          <h1 className="hero-title">
            Signs and screens on trailers,
            <span className="hero-title-accent"> delivered and set up</span>
          </h1>
          <p className="hero-desc">
            Ozzy&rsquo;s Equipment Hire runs a full-colour LED trailer for three jobs:{' '}
            <a href="/vms-sign-hire/">VMS message boards</a> for roadworks and traffic,{' '}
            <a href="/led-trailer-sign-hire-melbourne/">LED trailer signs</a> for events and
            advertising, and <a href="/led-screen-trailer-hire/">LED screen trailer</a> hire for
            moving content and sponsor loops. We deliver across Melbourne and Victoria, place it,
            program it, and collect it when you&rsquo;re done. From $45 a day ex GST.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              Get a quote
            </a>
            <a href="/pricing/" className="btn btn-ghost">
              See rates
            </a>
          </div>
        </div>
        <div className="hero-image-wrap">
          <picture>
            <source
              type="image/avif"
              media={MOBILE_MEDIA}
              srcSet="/img/hero-trailer-360.avif 360w, /img/hero-trailer-480.avif 480w, /img/hero-trailer-600.avif 600w"
              sizes={MOBILE_SIZES}
            />
            <source
              type="image/webp"
              media={MOBILE_MEDIA}
              srcSet="/img/hero-trailer-360.webp 360w, /img/hero-trailer-480.webp 480w, /img/hero-trailer-600.webp 600w"
              sizes={MOBILE_SIZES}
            />
            <source
              type="image/avif"
              srcSet="/img/hero-trailer-600.avif 600w, /img/hero-trailer-768.avif 768w"
              sizes={DESKTOP_SIZES}
            />
            <source
              type="image/webp"
              srcSet="/img/hero-trailer-600.webp 600w, /img/hero-trailer-768.webp 768w"
              sizes={DESKTOP_SIZES}
            />
            <img
              src="/img/hero-trailer-600.jpg"
              srcSet="/img/hero-trailer-360.jpg 360w, /img/hero-trailer-480.jpg 480w, /img/hero-trailer-600.jpg 600w, /img/hero-trailer-768.jpg 768w"
              sizes={DESKTOP_SIZES}
              width={768}
              height={1024}
              fetchPriority="high"
              decoding="async"
              alt="LED screen trailer and VMS sign hire in Melbourne — mobile LED trailer display"
              className="hero-image"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
