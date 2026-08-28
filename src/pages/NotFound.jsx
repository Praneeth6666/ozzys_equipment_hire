import './service-page.css';
import Contact from '../components/Contact';

export default function NotFound() {
  return (
    <main id="main-content">
      <section className="sp-hero container">
        <span className="sp-eyebrow">Page not found</span>
        <h1>That page isn&rsquo;t here</h1>
        <p className="sp-lead">
          The link may be old or mistyped. Everything Ozzy&rsquo;s Equipment Hire does is on one of
          the pages below.
        </p>
        <div className="sp-actions">
          <a href="/" className="btn btn-primary">Go to the home page</a>
          <a href="#contact" className="btn btn-ghost">Get in touch</a>
        </div>
      </section>

      <section className="sp-related">
        <div className="container">
          <h2>Where you might have been headed</h2>
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
                Pricing
                <span>The rate card and the day-rate calculator.</span>
              </a>
            </li>
            <li>
              <a href="/service-areas/">
                Service areas
                <span>Melbourne, Geelong, Ballarat, Bendigo and Gippsland.</span>
              </a>
            </li>
            <li>
              <a href="/guides/">
                Guides
                <span>Cost, sizing, choosing a trailer, and the Victorian sign rules.</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <Contact />
    </main>
  );
}
