import '../service-page.css';
import Breadcrumb from '../../components/Breadcrumb';
import Contact from '../../components/Contact';

/**
 * Shared frame for a guide article.
 *
 * props:
 *   title    the H1
 *   slug     path segment under /guides/
 *   intro    string — the answer-first opening paragraph
 *   children the body (sections of prose / tables)
 *   faq      optional [{ q, a }] — rendered, and turned into FAQPage JSON-LD in routes.jsx
 *   related  optional [[href, label, sub], ...]
 */
export default function GuideLayout({ title, slug, intro, children, faq, related }) {
  const crumbs = [
    ['Home', '/'],
    ['Guides', '/guides/'],
    [title, `/guides/${slug}/`],
  ];

  return (
    <main id="main-content">
      <Breadcrumb items={crumbs} />

      <article>
        <section className="sp-hero container">
          <span className="sp-eyebrow">Guide</span>
          <h1>{title}</h1>
          <p className="sp-lead">{intro}</p>
        </section>

        <section className="sp-section">
          <div className="container sp-prose">{children}</div>
        </section>

        {faq && faq.length > 0 && (
          <section className="sp-section">
            <div className="container sp-faq">
              <h2>Related questions</h2>
              <dl>
                {faq.map(({ q, a }) => (
                  <div key={q}>
                    <dt>{q}</dt>
                    <dd>{a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        )}
      </article>

      {related && related.length > 0 && (
        <section className="sp-related">
          <div className="container">
            <h2>Next</h2>
            <ul>
              {related.map(([href, label, sub]) => (
                <li key={href}>
                  <a href={href}>
                    {label}
                    <span>{sub}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Contact />
    </main>
  );
}
