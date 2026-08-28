import './service-page.css';
import Breadcrumb from '../components/Breadcrumb';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';

const CRUMBS = [
  ['Home', '/'],
  ['LED Screen Trailer Hire', '/led-screen-trailer-hire/'],
];

/** Rendered below and turned into FAQPage JSON-LD in src/routes.jsx. */
export const FAQ = [
  {
    q: 'What is the difference between an LED screen trailer and an LED trailer sign?',
    a: 'An LED trailer sign is built to carry a message or an advert — a logo, a headline, a rolling set of frames. An LED screen trailer is a large video wall on a trailer, built to play full-motion video to a crowd: a live camera feed, a highlights reel, a film. If people will stand or sit and watch it, you want a screen trailer. If they will drive or walk past and read it, you want a sign.',
  },
  {
    q: 'How big is the screen, and how far back can people watch from?',
    a: 'Screen area and pixel pitch set the useful viewing distance. A finer pixel pitch looks sharp from close up; a coarser pitch is made for a crowd further back. As a rule of thumb the minimum comfortable viewing distance in metres is close to the pixel pitch in millimetres, and the screen stays readable to well over a hundred metres. Tell us the crowd size and the depth of the viewing area and we match the trailer to it.',
  },
  {
    q: 'Does it play sound?',
    a: 'Yes. The trailers carry an onboard PA that covers a modest crowd on their own, and we can feed the screen audio into a larger event PA if you have one.',
  },
  {
    q: 'What do you need on site?',
    a: 'A level area big enough to park the trailer and raise the screen, clear of overhead lines and low branches, with vehicle access to get it in and out. Power can come from an onboard generator or a site supply. We handle setup, operation and pack-down.',
  },
  {
    q: 'How long does setup take?',
    a: 'A single screen trailer is running within about half an hour of arriving on a prepared site. We usually deliver the day before for anything with an early start.',
  },
  {
    q: 'Can you run our content, or do we need an operator?',
    a: 'We can supply an operator for the event, or set the trailer to loop your content and leave it. Send video files ahead of time and we test them on the screen before the day.',
  },
  {
    q: 'Do you hire screen trailers outside Melbourne?',
    a: 'Yes — Geelong, Ballarat, Bendigo, Gippsland and regional Victoria. Regional bookings want two to three weeks of notice and the delivery charge reflects the distance.',
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
          Hire a mobile LED screen trailer in Melbourne for festivals, sport, outdoor cinema and
          brand activations. The screen folds down for travel and raises on site in about half an
          hour, with onboard sound and power. Day rates and short-term hire; delivery, setup and
          operation across Greater Melbourne and regional Victoria.
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
            A mobile LED screen trailer is a large LED video wall built onto a road-registered
            trailer. It travels folded, then hydraulics raise and angle the screen once the trailer
            is parked and levelled. It plays anything a big screen would — a live camera feed, a
            replay reel, a sponsor loop, a movie — and carries its own sound and power so it can run
            in a paddock with nothing else on site.
          </p>
          <p>
            This is also called LED trailer screen hire, mobile LED screen trailer hire, or a mobile
            big screen. It is a different job from a{' '}
            <a href="/led-trailer-sign-hire-melbourne/">LED trailer sign</a> (a smaller panel for
            messages and adverts) and from a <a href="/vms-sign-hire/">VMS board</a> (amber text for
            traffic).
          </p>
        </div>
      </section>

      <section className="sp-section">
        <div className="container sp-prose">
          <h2>What people hire them for</h2>
          <ul>
            <li>Festivals and concerts — image magnification of the stage, artist visuals, sponsor content</li>
            <li>Sport — replays, scores, live coverage, crowd cameras at grounds without a fixed screen</li>
            <li>Outdoor cinema and community screenings — films, presentations, remembrance events</li>
            <li>Brand activations and launches — showreels and interactive content where the audience is</li>
            <li>Race days, shows and expos — schedules, results, wayfinding, live feeds from other areas</li>
            <li>Public events and civic ceremonies — speeches, live relay, information for large crowds</li>
          </ul>
        </div>
      </section>

      <section className="sp-section">
        <div className="container">
          <div className="sp-prose">
            <h2>Choosing a screen</h2>
            <p>
              Two numbers decide which trailer suits your event: the screen area, and the pixel
              pitch (the gap between LEDs, in millimetres — smaller is sharper up close).
            </p>
          </div>
          <div className="sp-table-wrap">
            <table className="sp-table">
              <thead>
                <tr>
                  <th>If your event is</th>
                  <th>You want</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Close-up, seated, presentation-style</td>
                  <td>A finer pixel pitch; screen size matched to the room or marquee</td>
                </tr>
                <tr>
                  <td>A standing festival or sport crowd, viewers spread back 20–100 m</td>
                  <td>A mid pixel pitch and the largest screen area that fits the site</td>
                </tr>
                <tr>
                  <td>Wayfinding or sponsor content for passing crowds</td>
                  <td>A coarser pitch is fine; brightness and placement matter more than sharpness</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="sp-prose">
            {/* TODO(owner): list each screen trailer in the fleet with screen size (m and m²),
                pixel pitch, resolution, brightness in nits, trailer footprint and weight,
                and onboard generator / PA details. */}
            <p className="sp-rates-note">
              Give us the crowd size, how far back the furthest viewers stand, and whether the event
              runs in daylight, and we match the trailer to it.
            </p>
          </div>
        </div>
      </section>

      <section className="sp-section">
        <div className="container sp-prose">
          <h2>Delivery, setup and operation</h2>
          <p>
            We deliver across Greater Melbourne and to Geelong, Ballarat, Bendigo, Gippsland and
            regional Victoria, usually the day before an early start. On site we need a level parking
            area clear of overhead lines, and vehicle access to bring the trailer in and out. Setup
            of a single screen runs about half an hour. Power comes from the onboard generator or a
            site supply. We can leave the trailer looping your content, or provide an operator for
            the event.
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
              one-off $350 for hires under three months. An event operator, if you need one, is
              quoted separately. <a href="/pricing/">Open the pricing calculator</a> to price your
              dates.
            </p>
          </div>
        </div>
      </section>

      <section className="sp-section">
        <div className="container">
          <div className="sp-notfor">
            <h3>When an LED screen trailer isn&rsquo;t the right call</h3>
            <ul>
              <li>The content is a message or an advert, not video — hire an <a href="/led-trailer-sign-hire-melbourne/">LED trailer sign</a>.</li>
              <li>It is traffic or works messaging — hire a <a href="/vms-sign-hire/">VMS board</a>.</li>
              <li>The site has no level ground clear of overhead lines, or no way to tow a trailer in.</li>
              <li>The audience is small and close and a large TV or projector would do the job for less.</li>
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
                <span>Full-colour trailer signs for messages and advertising.</span>
              </a>
            </li>
            <li>
              <a href="/vms-sign-hire/">
                VMS sign hire
                <span>Amber message boards for roadworks and traffic management.</span>
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

      <Reviews />

      <Contact />
    </main>
  );
}
