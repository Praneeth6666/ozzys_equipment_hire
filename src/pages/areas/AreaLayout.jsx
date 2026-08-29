import '../service-page.css';
import Breadcrumb from '../../components/Breadcrumb';
import Contact from '../../components/Contact';

/**
 * Shared frame for a regional location page. Each page supplies its own local
 * copy through props — the prose differs page to page, only the layout is shared.
 *
 * props:
 *   name        e.g. "Geelong"
 *   slug        e.g. "geelong"  (used for the breadcrumb)
 *   lead        one paragraph, string
 *   localities  [[label, "comma, separated, places"], ...]
 *   body        array of paragraph strings (page-specific detail)
 */
export default function AreaLayout({ name, slug, lead, localities, body }) {
  const crumbs = [
    ['Home', '/'],
    ['Service areas', '/service-areas/'],
    [name, `/service-areas/${slug}/`],
  ];

  return (
    <main id="main-content">
      <Breadcrumb items={crumbs} />

      <section className="sp-hero container">
        <span className="sp-eyebrow">Service area · {name}</span>
        <h1>Sign and screen hire in {name}</h1>
        <p className="sp-lead">{lead}</p>
        <div className="sp-actions">
          <a href="#contact" className="btn btn-primary">Get a {name} quote</a>
          <a href="/pricing/" className="btn btn-ghost">See rates</a>
        </div>
      </section>

      <section className="sp-section">
        <div className="container">
          <div className="sp-prose">
            <h2>Places we cover around {name}</h2>
            <p>
              A guide, not a boundary. Tell us the exact site address and we confirm the delivery
              window and charge.
            </p>
          </div>
          <div className="sp-table-wrap">
            <table className="sp-table">
              <thead>
                <tr>
                  <th>Area</th>
                  <th>Includes</th>
                </tr>
              </thead>
              <tbody>
                {localities.map(([label, places]) => (
                  <tr key={label}>
                    <td>{label}</td>
                    <td>{places}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="sp-section">
        <div className="container sp-prose">
          <h2>Hiring from {name}</h2>
          {body.map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </div>
      </section>

      <section className="sp-related">
        <div className="container">
          <h2>Hire in {name}</h2>
          <ul>
            <li>
              <a href="/vms-sign-hire/">
                VMS sign hire
                <span>Roadworks, traffic management and site safety messaging.</span>
              </a>
            </li>
            <li>
              <a href="/led-trailer-sign-hire-melbourne/">
                LED trailer sign hire
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
                All service areas
                <span>Melbourne, Geelong, Ballarat, Bendigo and Gippsland.</span>
              </a>
            </li>
            <li>
              <a href="/guides/vms-sign-hire-cost/">
                How much does hire cost?
                <span>The rate card, delivery and what moves the total.</span>
              </a>
            </li>
            <li>
              <a href="/guides/vms-vs-led-trailer-sign/">
                Which trailer do I need?
                <span>VMS board vs LED trailer sign vs LED screen trailer.</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <Contact />
    </main>
  );
}
