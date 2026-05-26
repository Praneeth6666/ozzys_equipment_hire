import { INDUSTRIES, KEYWORD_CLUSTERS } from '../data/seo';
import './IntentContent.css';

export default function IntentContent() {
  return (
    <section id="hire-guide" className="intent-content" aria-labelledby="hire-guide-heading">
      <div className="container">
        <div className="intent-header">
          <h2 id="hire-guide-heading">Your local guide to LED, VMS and mobile billboard trailer hire</h2>
          <p>
            If you are comparing providers for LED trailers near me, VMS trailers near me, billboard
            trailers near me or mobile billboard trailers, this guide explains where each trailer type fits
            best and how to choose the right setup for your site.
          </p>
        </div>

        <div className="intent-grid">
          {KEYWORD_CLUSTERS.map((item) => (
            <article key={item.title} className="intent-card">
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>

        <div className="intent-bottom">
          <h3>Industries we support across Melbourne and Victoria</h3>
          <ul className="intent-list">
            {INDUSTRIES.map((industry) => (
              <li key={industry}>{industry}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
