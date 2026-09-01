import './service-page.css';
import Breadcrumb from '../components/Breadcrumb';
import RelatedLinks from '../components/RelatedLinks';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';
import { SERVICE_AREAS } from '../data/seo';
import { FLEET_SPECS } from '../data/fleet';

const GUIDES = [
  ['/guides/vms-vs-led-trailer-sign/', 'VMS board vs LED trailer sign vs LED screen trailer', 'Which trailer suits which job.'],
  ['/guides/vms-sign-hire-cost/', 'How much does hire cost?', 'The rate card, what moves the total, a worked example.'],
  ['/guides/led-screen-trailer-sizes/', 'What size LED screen trailer do I need?', 'For when the job is video, not a sign.'],
];

const CRUMBS = [
  ['Home', '/'],
  ['LED Trailer Sign Hire Melbourne', '/led-trailer-sign-hire-melbourne/'],
];

/** Rendered below and turned into FAQPage JSON-LD in src/routes.jsx. */
export const FAQ = [
  {
    q: 'What is the difference between an LED trailer sign and a VMS board?',
    a: 'A VMS board shows text and simple graphics, usually in amber, for roadwork and traffic messaging. An LED trailer sign is a full-colour LED panel on the same kind of trailer, built for advertising and events: logos, brand colours, photos and short animations. If the job is a lane closure, hire a VMS board. If it is a promotion, a launch or a festival, hire an LED trailer sign.',
  },
  {
    q: 'How bright is it, and does it work in daylight?',
    a: 'The screen runs at 7,500 to 8,000 nits, which stays readable in direct sun. An auto-brightness sensor scales it back through dusk and at night so it is not glaring.',
  },
  {
    q: 'Can you supply the artwork, or do I provide it?',
    a: 'Either. Send finished artwork and we load it, or send your logo and the wording and we lay it out. We check the content on the panel before we leave site and can adjust it remotely during the hire.',
  },
  {
    q: 'Is it solar powered?',
    a: 'It runs on battery and solar for short hires. For hires of about three weeks or more, or through overcast weather, plan for a 10A power point on site that you provide.',
  },
  {
    q: 'Which Melbourne suburbs do you deliver to?',
    a: 'All of Greater Melbourne — the CBD, the inner suburbs, and out to Casey, Frankston, the Mornington Peninsula, Melton and the northern and western growth areas. We also run to Geelong, Ballarat, Bendigo and Gippsland. Give us the site address and we confirm delivery and timing.',
  },
  {
    q: 'How quickly can you deliver?',
    a: 'A standard metro hire needs about a week of notice to be comfortable. Short-notice jobs are often possible for a single trailer — call and ask. Regional deliveries and multi-trailer bookings want two to three weeks.',
  },
  {
    q: 'Do I need a permit to put an advertising trailer on the street?',
    a: 'On private land — a shopping centre car park, a dealership forecourt, an event site — usually not, as long as the landholder agrees. On a public road or nature strip you generally need approval from the local council, and rules vary between councils. We can place the trailer where you tell us; the approval is yours to arrange.',
  },
  {
    q: 'What is an LED trailer sign?',
    a: 'An LED trailer sign is a full-colour LED panel mounted on a road-registered trailer. It shows the same range of content a shopfront screen would — logos, brand colours, photos, short animations, a rolling set of messages — but you can place it wherever the audience is and move it between sites. It is also called a trailer LED sign or a mobile billboard.',
  },
  {
    q: 'How much does LED trailer sign hire cost?',
    a: 'From $45 per day ex GST on a 12-month contract, rising to $75 per day for a hire under a month. A hire of one to six days is a flat $500 plus 8% insurance, ex GST. Delivery, setup and installation is a one-off $350 for hires under three months. See the pricing page for the full rate card and a calculator.',
  },
  {
    q: 'What can I display on it?',
    a: 'Anything that reads clearly on an outdoor LED panel: a logo and headline, product images, event details, a rotating set of sponsor frames, or short looping animation. Send finished artwork and we load it, or send your logo and wording and we lay it out. Content can be changed remotely during the hire.',
  },
  {
    q: 'Can I hire an LED trailer sign for a single day?',
    a: 'Yes. Any hire of one to six days is charged at the flat rate of $500 plus 8% insurance, ex GST, whichever day or days you need.',
  },
];

export default function LedTrailerSignHireMelbourne() {
  return (
    <main id="main-content">
      <Breadcrumb items={CRUMBS} />

      <section className="sp-hero container">
        <span className="sp-eyebrow">LED trailer sign hire · Melbourne &amp; Victoria</span>
        <h1>LED trailer sign hire Melbourne</h1>
        <p className="sp-lead">
          Hire a full-colour LED trailer sign in Melbourne from $45 per day ex GST on a 12-month
          contract, or a flat $500 plus 8% insurance for one to six days. We tow it in, position it,
          load your artwork and collect it after the job. Trailer LED sign hire for festivals, sport,
          retail activations, property campaigns and council works, across Greater Melbourne and
          regional Victoria.
        </p>
        <div className="sp-actions">
          <a href="#contact" className="btn btn-primary">Get a quote</a>
          <a href="/pricing/" className="btn btn-ghost">See all rates</a>
        </div>
      </section>

      <section className="sp-section">
        <div className="container sp-prose">
          <h2>What an LED trailer sign is</h2>
          <p>
            An LED trailer sign is a full-colour LED panel mounted on a road-registered trailer. It
            shows the same range of content a shopfront screen would — logos, brand colours, photos,
            short animations, a rolling set of messages — but you can put it wherever the audience
            is and move it between sites. It runs on battery and solar, with a mains top-up on longer
            hires, and you change what it shows by sending us the content.
          </p>
          <p>
            People also call this trailer LED sign hire or a mobile billboard. It is the middle
            option between a <a href="/vms-sign-hire/">VMS board</a> (amber text, for traffic
            messaging) and an <a href="/led-screen-trailer-hire/">LED screen trailer</a> (the same
            trailer, run as a moving-content screen for events and campaigns).
          </p>
        </div>
      </section>

      <section className="sp-section">
        <div className="container sp-prose">
          <h2>What people hire them for</h2>
          <ul>
            <li>Festivals, shows and community events — arrival info, sponsor messages, programme changes</li>
            <li>Sport and club days — fixtures, scores, gate and parking directions, sponsor rotations</li>
            <li>Retail and shopping centres — sale launches, new-store openings, seasonal campaigns</li>
            <li>Property and development — land releases, display-home directions, auction promotion</li>
            <li>Roadside advertising campaigns — a moving billboard parked where the traffic is</li>
            <li>Council and government campaigns — works notices, public consultation, safety messaging</li>
          </ul>
          <p>
            If the content is mostly plain text for drivers — merge left, road closed, reduce speed —
            a VMS board reads well and costs less. If it is moving content — a sponsor loop,
            animation, short video — the same trailer runs as an{' '}
            <a href="/led-screen-trailer-hire/">LED screen trailer</a>.
          </p>
        </div>
      </section>

      <section className="sp-section">
        <div className="container">
          <div className="sp-prose">
            <h2>The screen</h2>
            <p>
              One full-colour LED screen on a road-registered trailer. It runs branded content —
              logos, photos, animation, short video — and can also show plain text when a job only
              needs a message.
            </p>
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
          <div className="sp-prose">
            <p className="sp-rates-note">
              Send your artwork sized to 600 by 400 pixels for a pixel-perfect result, or send the
              logo and wording and we lay it out.
            </p>
          </div>
        </div>
      </section>

      <section className="sp-section">
        <div className="container">
          <div className="sp-prose">
            <h2>Delivery across Melbourne and Victoria</h2>
            <p>We tow, place and collect. Areas we cover regularly:</p>
          </div>
          <div className="sp-table-wrap">
            <table className="sp-table">
              <thead>
                <tr>
                  <th>Area</th>
                  <th>Typical lead time</th>
                </tr>
              </thead>
              <tbody>
                {SERVICE_AREAS.map((area) => (
                  <tr key={area}>
                    <td>{area}</td>
                    <td>
                      {/Geelong|Ballarat|Bendigo|Gippsland|regional/.test(area)
                        ? 'Allow 2–3 weeks; delivery charged on distance'
                        : 'About 1 week; short notice often possible'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="sp-section">
        <div className="container">
          <div className="sp-prose">
            <h2>LED trailer sign hire rates</h2>
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
              Delivery, setup and installation is a one-off $350 for hires under three months;
              self-pickup is available. <a href="/pricing/">Open the pricing calculator</a> to price
              your dates.
            </p>
          </div>
        </div>
      </section>

      <section className="sp-section">
        <div className="container">
          <div className="sp-notfor">
            <h3>When LED trailer sign hire isn&rsquo;t the right call</h3>
            <ul>
              <li>The message is plain text for drivers — a <a href="/vms-sign-hire/">VMS board</a> is cheaper and clearer.</li>
              <li>You need a large stage screen for a big seated audience — that is a bigger unit than we run.</li>
              <li>The site has no legal place to park and leave a trailer, and no landholder permission.</li>
              <li>It is a one-day job under the $500 minimum plus insurance.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sp-section">
        <div className="container sp-faq">
          <h2>LED trailer sign hire — common questions</h2>
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
              <a href="/led-screen-trailer-hire/">
                LED screen trailer hire
                <span>A mobile LED screen for advertising, events and sponsor content.</span>
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
                <span>Photos of the VMS boards, LED trailer signs and screen trailers.</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <RelatedLinks title="Guides" items={GUIDES} />

      <Reviews />

      <Contact />
    </main>
  );
}
