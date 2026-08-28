import './service-page.css';
import Breadcrumb from '../components/Breadcrumb';
import Contact from '../components/Contact';

const CRUMBS = [
  ['Home', '/'],
  ['Service areas', '/service-areas/'],
];

const AREAS = [
  {
    href: '/service-areas/melbourne/',
    name: 'Melbourne',
    blurb:
      'Greater Melbourne, from the CBD and inner suburbs out to the northern, western and south-eastern growth corridors. About a week of notice for a standard hire; short notice often possible.',
  },
  {
    href: '/service-areas/geelong/',
    name: 'Geelong',
    blurb:
      'Geelong, the Bellarine and the Surf Coast. Delivered from Melbourne, so allow two to three weeks and expect a distance-based delivery charge.',
  },
  {
    href: '/service-areas/ballarat/',
    name: 'Ballarat',
    blurb:
      'Ballarat and the western goldfields. A regional run from Melbourne — book two to three weeks out for events and roadworks.',
  },
  {
    href: '/service-areas/bendigo/',
    name: 'Bendigo',
    blurb:
      'Bendigo and central Victoria. Regional delivery from Melbourne; give us the dates and site address for a firm delivery figure.',
  },
  {
    href: '/service-areas/gippsland/',
    name: 'Gippsland',
    blurb:
      'Latrobe Valley, South and East Gippsland. The longest run we do regularly — two to three weeks of notice and travel reflected in the delivery cost.',
  },
];

export default function ServiceAreas() {
  return (
    <main id="main-content">
      <Breadcrumb items={CRUMBS} />

      <section className="sp-hero container">
        <span className="sp-eyebrow">Where we deliver</span>
        <h1>Service areas</h1>
        <p className="sp-lead">
          Ozzy&rsquo;s Equipment Hire is based in Melbourne and delivers VMS boards, LED trailer
          signs and LED screen trailers across Greater Melbourne and regional Victoria. Metro hires
          need about a week of notice; regional deliveries want two to three weeks and carry a
          distance-based delivery charge.
        </p>
        <div className="sp-actions">
          <a href="#contact" className="btn btn-primary">Check your location</a>
        </div>
      </section>

      <section className="sp-section">
        <div className="container">
          <ul className="sp-related-list">
            {AREAS.map(({ href, name, blurb }) => (
              <li key={href} className="sp-area-card">
                <h2><a href={href}>{name}</a></h2>
                <p>{blurb}</p>
                <a href={href} className="service-more">Hire in {name}</a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sp-related">
        <div className="container">
          <h2>What we deliver</h2>
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
