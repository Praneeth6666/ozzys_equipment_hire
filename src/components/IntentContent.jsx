import { INDUSTRIES, KEYWORD_CLUSTERS } from '../data/seo';
import './IntentContent.css';

export default function IntentContent() {
  return (
    <section id="hire-guide" className="intent-content" aria-labelledby="hire-guide-heading">
      <div className="container">
        <div className="intent-header">
          <h2 id="hire-guide-heading">Guide to VMS sign hire and LED trailer sign hire</h2>
          <p>
            Comparing VMS sign hire, LED trailer sign hire Melbourne, trailer LED sign hire, LED screen
            trailer or mobile LED screen trailer hire Melbourne? This guide maps each option to the job
            so you can choose the right trailer for your site.
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
