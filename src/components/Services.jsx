import { HIRE_SERVICES } from '../data/seo';
import './Services.css';

const ICONS = {
  led: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="8" width="16" height="10" rx="1" />
      <path d="M18 14h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="16" cy="18" r="2" />
    </svg>
  ),
  vms: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6h16v8H4z" />
      <path d="M8 10h8M8 13h5" />
      <path d="M6 18h12" />
      <circle cx="8" cy="18" r="1" />
      <circle cx="16" cy="18" r="1" />
    </svg>
  ),
  screen: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="11" rx="1" />
      <path d="M12 16v3M8 21h8" />
      <path d="M7 9h10M7 12h7" />
    </svg>
  ),
};

export default function Services() {
  return (
    <section id="services" className="services" aria-labelledby="services-heading">
      <div className="container">
        <div className="services-header">
          <h2 id="services-heading">Three trailers, one hire company</h2>
          <p className="services-sub">
            We run message boards, advertising signs and event screens across Greater Melbourne and
            regional Victoria. Pick the one that matches your job, or{' '}
            <a href="/gallery/">see the fleet on the job</a>.
          </p>
        </div>
        <div className="services-grid">
          {HIRE_SERVICES.map(({ id, title, href, desc }) => (
            <article key={id} className="service-card">
              <div className="service-icon">{ICONS[id]}</div>
              <h3><a href={href}>{title}</a></h3>
              <p>{desc}</p>
              <a href={href} className="service-more">See {title.toLowerCase()}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
