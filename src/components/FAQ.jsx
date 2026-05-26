import { FAQ_ITEMS } from '../data/seo';
import './FAQ.css';

export default function FAQ() {
  return (
    <section id="faq" className="faq" aria-labelledby="faq-heading">
      <div className="container">
        <div className="faq-header">
          <h2 id="faq-heading">LED, VMS &amp; billboard trailer hire — FAQs</h2>
          <p className="faq-sub">
            Common questions about hiring LED trailers, VMS trailers and mobile billboard trailers near you in
            Melbourne and Victoria.
          </p>
        </div>
        <dl className="faq-list">
          {FAQ_ITEMS.map(({ question, answer }) => (
            <div key={question} className="faq-item">
              <dt>{question}</dt>
              <dd>{answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
