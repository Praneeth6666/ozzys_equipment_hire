import './service-page.css';
import './gallery.css';
import Breadcrumb from '../components/Breadcrumb';
import Video from '../components/Video';
import Contact from '../components/Contact';
import { GALLERY, CATEGORIES } from '../data/gallery';

const CRUMBS = [
  ['Home', '/'],
  ['Gallery', '/gallery/'],
];

const SIZES = '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 360px';

function Figure({ item }) {
  const { base, widths, w, h, alt, caption } = item;
  const srcSet = (fmt) => widths.map((x) => `/img/${base}-${x}.${fmt} ${x}w`).join(', ');
  const fallback = `/img/${base}-${widths[widths.length - 1]}.jpg`;
  return (
    <figure className="gallery-figure">
      <picture>
        <source type="image/avif" srcSet={srcSet('avif')} sizes={SIZES} />
        <source type="image/webp" srcSet={srcSet('webp')} sizes={SIZES} />
        <img
          src={fallback}
          srcSet={srcSet('jpg')}
          sizes={SIZES}
          width={w}
          height={h}
          loading="lazy"
          decoding="async"
          alt={alt}
        />
      </picture>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function Gallery() {
  const categories = [...new Set(GALLERY.map((g) => g.category))];

  return (
    <main id="main-content">
      <Breadcrumb items={CRUMBS} />

      <section className="sp-hero container">
        <span className="sp-eyebrow">Gallery</span>
        <h1>Our trailer on the job</h1>
        <p className="sp-lead">
          Ozzy&rsquo;s full-colour LED trailer on real Melbourne sites — running retail, hospitality
          and dealership campaigns as a trailer sign, and short video as a screen trailer. The same
          unit also runs plain text as a VMS board.
        </p>
        <div className="sp-actions">
          <a href="#contact" className="btn btn-primary">Get a quote</a>
        </div>
      </section>

      <section className="sp-section">
        <div className="container">
          {categories.map((c) => (
            <div key={c} className="gallery-group">
              <h2>{CATEGORIES[c] || c}</h2>
              <div className="gallery-grid">
                {GALLERY.filter((g) => g.category === c).map((item) => (
                  <Figure key={item.base} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sp-related">
        <div className="container">
          <h2>The equipment</h2>
          <ul>
            <li>
              <a href="/vms-sign-hire/">
                VMS sign hire
                <span>Amber message boards for roadworks and traffic management.</span>
              </a>
            </li>
            <li>
              <a href="/led-trailer-sign-hire-melbourne/">
                LED trailer sign hire
                <span>Full-colour trailer signs for events and campaigns.</span>
              </a>
            </li>
            <li>
              <a href="/led-screen-trailer-hire/">
                LED screen trailer hire
                <span>A mobile LED screen for advertising, events and sponsor content.</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <Video path="/gallery/" />

      <Contact />
    </main>
  );
}
