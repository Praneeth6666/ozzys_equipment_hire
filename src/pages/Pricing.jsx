import './service-page.css';
import Breadcrumb from '../components/Breadcrumb';
import PricingCalculator from '../components/Pricing';
import Contact from '../components/Contact';

const CRUMBS = [
  ['Home', '/'],
  ['Pricing', '/pricing/'],
];

/** Rendered below and turned into FAQPage JSON-LD in src/routes.jsx. */
export const FAQ = [
  {
    q: 'How much does VMS sign hire or LED trailer sign hire cost in Melbourne?',
    a: 'Day rates run from $45 per day ex GST on a 12-month contract up to $75 per day ex GST for a hire under a month. A hire of one to six days is a flat $500 plus 8% insurance, ex GST. The same rate card covers VMS boards, LED trailer signs and LED screen trailers.',
  },
  {
    q: 'What is included in the day rate?',
    a: 'The trailer, the board or screen, message or content programming, and remote message changes during the hire. Delivery, setup and installation is a separate one-off $350 for hires under three months, or you can self-pickup at no charge.',
  },
  {
    q: 'How does the insurance work?',
    a: 'Insurance is 8% of the total hire price, added on top. It is not optional and it is shown as a separate line so you can see it.',
  },
  {
    q: 'Are the prices GST inclusive?',
    a: 'No. Every figure on this page excludes GST.',
  },
  {
    q: 'What is the shortest hire, and the cheapest way to hire long term?',
    a: 'The shortest hire is one day, charged in the one-to-six day band at a flat $500 plus insurance. The lowest day rate, $45 ex GST, applies on a 12-month contract. The longer the term, the lower the day rate.',
  },
  {
    q: 'Can I extend a hire once it has started?',
    a: 'Yes. Tell us before the end date and we re-rate the whole hire to the band it now falls in, so a hire that runs longer than planned is charged at the longer-term rate, not the short-term one.',
  },
  {
    q: 'Do I need to supply power?',
    a: 'For short hires, no — the trailer runs on solar and battery. For hires of about three weeks or more, or a run of overcast weather, plan for a 15A power connection on site that you provide.',
  },
];

export default function Pricing() {
  return (
    <main id="main-content">
      <Breadcrumb items={CRUMBS} />

      <section className="sp-hero container">
        <span className="sp-eyebrow">Pricing · Melbourne &amp; Victoria</span>
        <h1>VMS and LED trailer hire prices</h1>
        <p className="sp-lead">
          One rate card for VMS boards, LED trailer signs and LED screen trailers: from $45 per day
          ex GST on a 12-month contract, down to a flat $500 plus 8% insurance for one to six days.
          Use the calculator below to price your exact dates, then send the figure straight to a
          quote.
        </p>
        <div className="sp-actions">
          <a href="#pricing" className="btn btn-primary">Open the calculator</a>
          <a href="#contact" className="btn btn-ghost">Ask for a quote</a>
        </div>
      </section>

      <PricingCalculator />

      <section className="sp-section">
        <div className="container sp-faq">
          <h2>Pricing — common questions</h2>
          <dl>
            {FAQ.map(({ q, a }) => (
              <div key={q}>
                <dt>{q}</dt>
                <dd>{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="sp-related">
        <div className="container">
          <h2>Related</h2>
          <ul>
            <li>
              <a href="/vms-sign-hire/">
                VMS sign hire
                <span>Amber message boards for roadworks and traffic management.</span>
              </a>
            </li>
            <li>
              <a href="/led-trailer-sign-hire-melbourne/">
                LED trailer sign hire Melbourne
                <span>Full-colour trailer signs for events and campaigns.</span>
              </a>
            </li>
            <li>
              <a href="/led-screen-trailer-hire/">
                LED screen trailer hire
                <span>Mobile LED video screens for festivals and outdoor events.</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <Contact />
    </main>
  );
}
