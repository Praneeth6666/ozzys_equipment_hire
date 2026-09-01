import './service-page.css';
import Breadcrumb from '../components/Breadcrumb';
import RelatedLinks from '../components/RelatedLinks';
import Reviews from '../components/Reviews';
import Video from '../components/Video';
import Contact from '../components/Contact';
import { FLEET_SPECS } from '../data/fleet';

const GUIDES = [
  ['/guides/led-screen-trailer-sizes/', 'What size is an LED screen trailer?', 'Ours is 2.4 by 1.6 m — what that suits and when you need bigger.'],
  ['/guides/vms-vs-led-trailer-sign/', 'VMS board vs LED trailer sign vs LED screen trailer', 'Which trailer suits which job.'],
  ['/guides/vms-sign-hire-cost/', 'How much does hire cost?', 'The rate card applies to the screen trailer too.'],
];

const CRUMBS = [
  ['Home', '/'],
  ['LED Screen Trailer Hire', '/led-screen-trailer-hire/'],
];

/** Rendered below and turned into FAQPage JSON-LD in src/routes.jsx. */
export const FAQ = [
  {
    q: 'What is the difference between an LED screen trailer and an LED trailer sign?',
    a: 'They are the same trailer, named for the job. As an LED trailer sign it carries a fixed message or advert; as an LED screen trailer it runs a rolling set of images, animation and short video for an event or campaign. If you drive or walk past and read it, call it a sign; if it plays content to a crowd or passing traffic, call it a screen.',
  },
  {
    q: 'How big is the screen?',
    a: 'The screen is 2.4 metres wide by 1.6 metres high, about 3.8 square metres, at a 4 mm pixel pitch. It is a mobile screen for outdoor advertising, sponsor content and event information — not a stage-magnification video wall for a large seated audience, which is a bigger unit than we run.',
  },
  {
    q: 'How far away can people read it?',
    a: 'At a 4 mm pixel pitch the picture is clean from a few metres and legible well beyond that for text and simple graphics. It suits passing traffic, a market or festival thoroughfare, or a crowd gathered around it, rather than the back of a stadium.',
  },
  {
    q: 'Does it play sound?',
    a: 'No. It is a screen, not a PA. If your content needs audio, run it through your own event sound system.',
  },
  {
    q: 'How is the content updated?',
    a: 'Send video and image files ahead of the hire and we load them. Changes during the hire go over the trailer’s 4G connection, usually the same day. There is no need for an operator on site.',
  },
  {
    q: 'What do you need on site?',
    a: 'A level spot to park and position the trailer, clear of overhead lines and low branches, with vehicle access to bring it in and out. Power runs off solar and battery for short hires, or a standard 10 A point for longer ones.',
  },
  {
    q: 'How long does setup take?',
    a: 'About half an hour once the site is ready. We usually deliver the day before anything with an early start.',
  },
  {
    q: 'Do you hire outside Melbourne?',
    a: 'Yes — Geelong, Ballarat, Bendigo, Gippsland and regional Victoria. Regional bookings want two to three weeks of notice and the delivery charge reflects the distance.',
  },
  {
    q: 'How much does it cost to hire an LED screen trailer?',
    a: 'From $45 per day ex GST on a 12-month contract up to $75 per day for a hire under a month. Most event bookings fall in the one-to-six day band, which is a flat $500 plus 8% insurance, ex GST. Delivery and setup is a one-off $350 for hires under three months. See the pricing page for the full rate card.',
  },
  {
    q: 'Do you need a permit for a mobile LED screen?',
    a: 'On private land — an event site, a car park, a dealership forecourt — you need the landholder’s agreement, not a road permit. On a public road or reserve you generally need approval from the local council, and the rules differ between councils. We deliver and position the trailer; the approval is yours or your event organiser’s to arrange.',
  },
  {
    q: 'How bright is the screen, and does it work in daylight?',
    a: 'It runs at 7,500 to 8,000 nits, which stays readable in direct sun. An auto-brightness sensor scales it back through dusk and at night so it is not glaring. A screen facing low afternoon sun is harder than a shaded or evening position, so tell us the orientation and time of day.',
  },
];

export default function LedScreenTrailerHire() {
  return (
    <main id="main-content">
      <Breadcrumb items={CRUMBS} />

      <section className="sp-hero container">
        <span className="sp-eyebrow">LED screen trailer hire · Melbourne &amp; Victoria</span>
        <h1>LED screen trailer hire</h1>
        <p className="sp-lead">
          Hire a mobile LED screen trailer in Melbourne for outdoor advertising, event information
          and sponsor content. A 2.4 by 1.6 metre full-colour screen at 4&nbsp;mm pitch, bright
          enough for direct sun and updated over 4G. Day rates and short-term hire, delivered and
          set up across Greater Melbourne and regional Victoria.
        </p>
        <div className="sp-actions">
          <a href="#contact" className="btn btn-primary">Get a quote</a>
          <a href="/pricing/" className="btn btn-ghost">See all rates</a>
        </div>
      </section>

      <section className="sp-section">
        <div className="container sp-prose">
          <h2>What a mobile LED screen trailer is</h2>
          <p>
            A mobile LED screen trailer is a full-colour LED screen on a road-registered trailer. It
            plays images, simple animation and short video — an advert, an event schedule, a sponsor
            loop — and you change what it shows by sending us the files, with updates over 4G during
            the hire. It is also called LED trailer screen hire or a mobile LED screen.
          </p>
          <p>
            It is the same trailer as our{' '}
            <a href="/led-trailer-sign-hire-melbourne/">LED trailer sign</a>, used for moving content
            rather than a fixed message, and a step up from a{' '}
            <a href="/vms-sign-hire/">VMS board</a> (plain text for traffic). It is not a
            stage-magnification video wall for a large seated crowd — that is a bigger unit than we
            run.
          </p>
        </div>
      </section>

      <section className="sp-section">
        <div className="container sp-prose">
          <h2>What people hire it for</h2>
          <ul>
            <li>Outdoor advertising campaigns — a bright screen parked where the traffic is</li>
            <li>Festivals, markets and shows — schedules, wayfinding, sponsor rotations</li>
            <li>Sport and club days — fixtures, results, gate and parking directions</li>
            <li>Retail, shopping centres and dealerships — launches, promotions, seasonal campaigns</li>
            <li>Property and development — land releases, display-home directions, auction promotion</li>
            <li>Council and community events — public notices, consultation, safety messaging</li>
          </ul>
        </div>
      </section>

      <section className="sp-section">
        <div className="container">
          <div className="sp-prose">
            <h2>The screen</h2>
            <p>One trailer, one screen. Send content sized to 600 by 400 pixels for the sharpest result.</p>
          </div>
          <div className="sp-table-wrap">
            <table className="sp-table">
              <thead>
                <tr>
                  <th scope="col">Our trailer</th>
                  <th scope="col">Detail</th>
                </tr>
              </thead>
              <tbody>
                {FLEET_SPECS.map(([label, value]) => (
                  <tr key={label}>
                    <td>{label}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="sp-section">
        <div className="container sp-prose">
          <h2>Delivery and setup</h2>
          <p>
            We deliver across Greater Melbourne and to Geelong, Ballarat, Bendigo, Gippsland and
            regional Victoria, usually the day before an early start. On site we need a level parking
            area clear of overhead lines and vehicle access to bring the trailer in and out. Setup
            runs about half an hour. The screen loops the content you send; changes during the hire
            go over 4G, so there is no operator to book.
          </p>
        </div>
      </section>

      <section className="sp-section">
        <div className="container">
          <div className="sp-prose">
            <h2>LED screen trailer hire rates</h2>
            <p>All prices exclude GST. Insurance is 8% of the total hire.</p>
          </div>
          <div className="sp-rates">
            <ul>
              <li>12 months — $45 per day (about $1,350 a month)</li>
              <li>6 months — $50 per day (about $1,500 a month)</li>
              <li>3 months — $60 per day (about $1,800 a month)</li>
              <li>1 month — $70 per day (about $2,100 a month)</li>
              <li>Under 1 month — $75 per day (about $2,250 a month)</li>
              <li>1 to 6 days — flat $500, plus 8% insurance</li>
            </ul>
            <p className="sp-rates-note">
              Most event bookings fall in the 1 to 6 day band. Delivery, setup and installation is a
              one-off $350 for hires under three months. <a href="/pricing/">Open the pricing
              calculator</a> to price your dates.
            </p>
          </div>
        </div>
      </section>

      <section className="sp-section">
        <div className="container">
          <div className="sp-notfor">
            <h3>When an LED screen trailer isn&rsquo;t the right call</h3>
            <ul>
              <li>You need a large stage screen for a big seated audience — that is a bigger unit than we run.</li>
              <li>The content is a single fixed message for traffic — hire a <a href="/vms-sign-hire/">VMS board</a>.</li>
              <li>The site has no level ground clear of overhead lines, or no way to tow a trailer in.</li>
              <li>The audience is small and close and a large TV or a projector would do the job for less.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sp-section">
        <div className="container sp-faq">
          <h2>LED screen trailer hire — common questions</h2>
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
              <a href="/led-trailer-sign-hire-melbourne/">
                LED trailer sign hire Melbourne
                <span>The same trailer, for a fixed message or advert.</span>
              </a>
            </li>
            <li>
              <a href="/vms-sign-hire/">
                VMS sign hire
                <span>Plain-text message boards for roadworks and traffic.</span>
              </a>
            </li>
            <li>
              <a href="/pricing/">
                Pricing &amp; calculator
                <span>Price your exact hire dates and delivery.</span>
              </a>
            </li>
            <li>
              <a href="/gallery/">
                See the fleet
                <span>Photos of the trailer on job sites.</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <Video path="/led-screen-trailer-hire/" />

      <RelatedLinks title="Guides" items={GUIDES} />

      <Reviews />

      <Contact />
    </main>
  );
}
