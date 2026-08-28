import '../service-page.css';
import Breadcrumb from '../../components/Breadcrumb';
import Contact from '../../components/Contact';

const CRUMBS = [
  ['Home', '/'],
  ['Service areas', '/service-areas/'],
  ['Melbourne', '/service-areas/melbourne/'],
];

const REGIONS = [
  ['Inner Melbourne', 'CBD, Southbank, Docklands, Carlton, Fitzroy, Richmond, South Yarra, Prahran'],
  ['Northern suburbs', 'Brunswick, Coburg, Preston, Reservoir, Epping, Craigieburn, Mickleham'],
  ['Western suburbs', 'Footscray, Sunshine, Werribee, Point Cook, Melton, Caroline Springs'],
  ['South-eastern suburbs', 'Dandenong, Cranbourne, Berwick, Pakenham, Clayton, Springvale'],
  ['Bayside and peninsula', 'Brighton, Mordialloc, Frankston, Mornington, Rosebud'],
  ['Eastern suburbs', 'Box Hill, Ringwood, Croydon, Lilydale, Knox, Wantirna'],
];

export default function Melbourne() {
  return (
    <main id="main-content">
      <Breadcrumb items={CRUMBS} />

      <section className="sp-hero container">
        <span className="sp-eyebrow">Service area · Greater Melbourne</span>
        <h1>Sign and screen hire in Melbourne</h1>
        <p className="sp-lead">
          We deliver VMS boards, LED trailer signs and LED screen trailers to every part of Greater
          Melbourne — the CBD and inner suburbs, the northern and western growth corridors, the
          south-east out to Pakenham, the bayside and the eastern ranges fringe. A standard metro
          hire needs about a week of notice, and short-notice jobs are often possible for a single
          trailer.
        </p>
        <div className="sp-actions">
          <a href="#contact" className="btn btn-primary">Get a Melbourne quote</a>
          <a href="/pricing/" className="btn btn-ghost">See rates</a>
        </div>
      </section>

      <section className="sp-section">
        <div className="container">
          <div className="sp-prose">
            <h2>Suburbs we cover</h2>
            <p>
              The list below is a guide, not a boundary. If your site is in metropolitan Melbourne we
              deliver to it; tell us the address and we confirm timing and the delivery charge.
            </p>
          </div>
          <div className="sp-table-wrap">
            <table className="sp-table">
              <thead>
                <tr>
                  <th>Region</th>
                  <th>Includes</th>
                </tr>
              </thead>
              <tbody>
                {REGIONS.map(([region, suburbs]) => (
                  <tr key={region}>
                    <td>{region}</td>
                    <td>{suburbs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="sp-section">
        <div className="container sp-prose">
          <h2>How a Melbourne hire runs</h2>
          <p>
            You tell us the dates, the site address and which unit you need. We confirm availability,
            the delivery charge for your suburb, and a delivery window. On the day we tow the trailer
            in, position and level it, load your message or content, run a check, and hand over the
            contact for remote changes. At the end of the hire we collect it.
          </p>
          <p>
            {/* TODO(owner): add the depot suburb and a note on where trailers are stored/serviced. */}
            For CBD and inner-city placements, check ahead that there is somewhere legal to park and
            leave a trailer — a private forecourt or car park is straightforward; a public street or
            nature strip usually needs council approval that you arrange.
          </p>
        </div>
      </section>

      <section className="sp-related">
        <div className="container">
          <h2>Hire in Melbourne</h2>
          <ul>
            <li>
              <a href="/vms-sign-hire/">
                VMS sign hire
                <span>Roadworks, traffic management and site safety messaging.</span>
              </a>
            </li>
            <li>
              <a href="/led-trailer-sign-hire-melbourne/">
                LED trailer sign hire Melbourne
                <span>Full-colour signs for events, sport, retail and property.</span>
              </a>
            </li>
            <li>
              <a href="/led-screen-trailer-hire/">
                LED screen trailer hire
                <span>Mobile video screens for festivals and outdoor cinema.</span>
              </a>
            </li>
            <li>
              <a href="/service-areas/">
                Other service areas
                <span>Geelong, Ballarat, Bendigo and Gippsland.</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <Contact />
    </main>
  );
}
