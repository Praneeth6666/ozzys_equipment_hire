import './service-page.css';
import Breadcrumb from '../components/Breadcrumb';
import RelatedLinks from '../components/RelatedLinks';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';

const GUIDES = [
  ['/guides/vms-sign-hire-cost/', 'How much does VMS sign hire cost?', 'The full rate card and a worked example.'],
  ['/guides/vms-vs-led-trailer-sign/', 'VMS board vs LED trailer sign vs LED screen trailer', 'Which trailer suits which job.'],
  ['/guides/traffic-management-sign-rules-victoria/', 'Traffic management sign rules in Victoria', 'Permits, AS 4852, and who is responsible.'],
];

const CRUMBS = [
  ['Home', '/'],
  ['VMS Sign Hire', '/vms-sign-hire/'],
];

/** Rendered below and turned into FAQPage JSON-LD in src/routes.jsx. */
export const FAQ = [
  {
    q: 'Do I need council or road authority approval?',
    a: 'Usually the approval sits with the traffic management plan for the works or event, not with the board on its own. If your site has a plan, it will specify where signs can go. For works on or beside a road you generally need a permit from the road authority (council or the state road agency). We supply and place the board to match the plan; we do not lodge the permit.',
  },
  {
    q: 'How far ahead should I book?',
    a: 'A week is comfortable for a standard metro hire. For a large board, a regional delivery, or a busy period around major roadworks and events, give us two to three weeks. Short-notice hires are often possible — call and ask.',
  },
  {
    q: 'Can you change the message once it is on site?',
    a: 'Yes. Send the new wording and we update it remotely, usually the same day. There is no charge for message changes within a hire.',
  },
  {
    q: 'Amber or full colour — which should I hire?',
    a: 'Amber for roadwork and traffic messaging: it is brighter for the cost and reads cleanly at distance. Full colour if the message needs a logo, colour coding, or basic imagery — events and advertising, mostly.',
  },
  {
    q: 'Do you deliver outside Melbourne?',
    a: 'Yes — Geelong, Ballarat, Bendigo, Gippsland and regional Victoria. Regional deliveries need a little more lead time and the delivery charge reflects the distance. Tell us the site address for a firm figure.',
  },
  {
    q: 'What power does the board need?',
    a: 'Solar and battery cover short hires. For hires of roughly three weeks or more, or a stretch of overcast weather, plan for a 15A power connection on site that you provide.',
  },
  {
    q: 'What is the shortest hire?',
    a: 'One day. Hires of one to six days are a flat $500 plus 8% insurance, ex GST.',
  },
];

export default function VmsSignHire() {
  return (
    <main id="main-content">
      <Breadcrumb items={CRUMBS} />

      <section className="sp-hero container">
        <span className="sp-eyebrow">VMS sign hire · Melbourne &amp; Victoria</span>
        <h1>VMS sign hire in Melbourne</h1>
        <p className="sp-lead">
          VMS sign hire in Melbourne starts at $45 per day ex GST on a 12-month contract, or a
          flat $500 plus 8% insurance for a hire of one to six days. We deliver the variable
          message sign to your site, position it, load your message schedule, and collect it when
          the job is finished.
        </p>
        <div className="sp-actions">
          <a href="#contact" className="btn btn-primary">Get a quote</a>
          <a href="/pricing/" className="btn btn-ghost">See all rates</a>
        </div>
      </section>

      <section className="sp-section">
        <div className="container sp-prose">
          <h2>What a VMS board is</h2>
          <p>
            A VMS board — a variable message sign — is a trailer-mounted LED matrix that displays
            text and simple graphics to drivers and pedestrians. The board runs on a battery bank
            topped up by solar panels and, on longer hires, a mains connection. You change what it
            shows by sending us a message schedule; we can also update it remotely part-way through
            a hire.
          </p>
          <p>
            Boards are either <strong>amber</strong> (single colour, the standard for roadwork and
            traffic messaging) or <strong>full colour</strong>, which adds coloured text and basic
            imagery for events and advertising. Amber is brighter for the money and reads cleanly at
            distance; full colour is worth it when the message needs a logo or colour coding.
          </p>
        </div>
      </section>

      <section className="sp-section">
        <div className="container sp-prose">
          <h2>What people hire a VMS board for</h2>
          <p>The common jobs, in rough order of how often we get asked:</p>
          <ul>
            <li>Roadworks and lane closures — advance warning, merge instructions, speed changes</li>
            <li>Detour and event wayfinding — directing traffic around a closure or to parking</li>
            <li>Construction and civil sites — induction reminders, gate changes, safety messaging</li>
            <li>Council works and community notices — bin changes, water shut-offs, works schedules</li>
            <li>Sporting fixtures and festivals — arrival routes, drop-off points, car park status</li>
            <li>Emergency and weather messaging — road condition alerts, total fire ban notices</li>
          </ul>
          <p>
            If what you actually need is a bright picture or video for an audience — a brand
            activation, an outdoor screening, scoreboard-style content — that is an{' '}
            <a href="/led-screen-trailer-hire/">LED screen trailer</a>, not a VMS board. If you want a
            full-colour advertising sign that still travels on a trailer, look at{' '}
            <a href="/led-trailer-sign-hire-melbourne/">LED trailer sign hire</a>.
          </p>
        </div>
      </section>

      <section className="sp-section">
        <div className="container">
          <div className="sp-prose">
            <h2>Board sizes and where they fit</h2>
            <p>
              Bigger boards carry taller characters, so they can be read from further away at higher
              speeds. Smaller boards are easier to place on a footpath or in a car park. As a guide:
            </p>
          </div>
          <div className="sp-table-wrap">
            <table className="sp-table">
              <thead>
                <tr>
                  <th>Board</th>
                  <th>Typical use</th>
                  <th>Reads clearly at</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Large</td>
                  <td>Freeways, arterials, higher-speed roadworks, major event routes</td>
                  <td>Longer approach distances at highway speeds</td>
                </tr>
                <tr>
                  <td>Mid</td>
                  <td>Suburban streets, council works, festival and stadium precincts</td>
                  <td>Urban approach distances</td>
                </tr>
                <tr>
                  <td>Compact</td>
                  <td>Car parks, shared paths, tight CBD placements, pedestrian messaging</td>
                  <td>Short range, low speed</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="sp-prose">
            <p className="sp-rates-note">
              {/* TODO(owner): replace with exact board models, character heights and screen
                  dimensions once confirmed. */}
              Tell us the road type, speed limit and how far back drivers need to read the message
              and we will bring the right board.
            </p>
          </div>
        </div>
      </section>

      <section className="sp-section">
        <div className="container sp-prose">
          <h2>How programming works</h2>
          <p>
            You send the message schedule — the wording, the order, and when each message should
            show. We load it before delivery and check it on site. Messages can run on a timer
            (different wording for peak and off-peak, for example) or step through up to a few
            frames. During the hire you can ask us to change the wording remotely; there is no need
            to send anyone back to the board.
          </p>
          <p>
            The board itself is our responsibility — supply, placement, power and programming. The{' '}
            <strong>traffic management plan</strong> for the site, and any road-occupation or works
            permits, sit with you or your traffic management contractor. If you are not sure what
            your plan calls for, your traffic controller can tell you the board size and message
            content it specifies, and we will match it.
          </p>
        </div>
      </section>

      <section className="sp-section">
        <div className="container sp-prose">
          <h2>Delivery, setup and power</h2>
          <p>
            We deliver across Greater Melbourne and to Geelong, Ballarat, Bendigo, Gippsland and the
            rest of regional Victoria. On delivery we position and level the trailer, point the
            board, run a display check and hand over the contact for remote changes. Collection is
            arranged for the end of the hire.
          </p>
          <p>
            The board runs on solar and battery for short hires. For hires of about three weeks or
            more, or through a run of overcast weather, plan for a{' '}
            <strong>15A power connection on site</strong> that you provide. Delivery, setup and
            installation is a one-off $350 for hires under three months; self-pickup is available if
            you would rather tow it yourself.
          </p>
        </div>
      </section>

      <section className="sp-section">
        <div className="container">
          <div className="sp-prose">
            <h2>VMS sign hire rates</h2>
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
              Monthly figures assume 30 days. Delivery, setup and installation is a one-off $350 for
              hires under three months. <a href="/pricing/">Open the pricing calculator</a> to price
              your exact dates.
            </p>
          </div>
        </div>
      </section>

      <section className="sp-section">
        <div className="container">
          <div className="sp-notfor">
            <h3>When VMS sign hire isn&rsquo;t the right call</h3>
            <ul>
              <li>You need moving video or photographic images — hire an <a href="/led-screen-trailer-hire/">LED screen trailer</a> instead.</li>
              <li>The message is indoor or short-run promotional — a towable board is overkill.</li>
              <li>There is nowhere legal to place and tow a trailer at the site — a fixed or hand-held sign may be the only option.</li>
              <li>The job is a single day and the budget is below the 1 to 6 day minimum of $500 plus insurance.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sp-section">
        <div className="container sp-faq">
          <h2>VMS sign hire — common questions</h2>
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
                <span>Full-colour trailer signs for events, sport and campaigns.</span>
              </a>
            </li>
            <li>
              <a href="/led-screen-trailer-hire/">
                LED screen trailer hire
                <span>Mobile LED video screens for festivals and outdoor events.</span>
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
