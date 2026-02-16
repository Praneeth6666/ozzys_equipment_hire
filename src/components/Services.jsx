import './Services.css';

const SERVICE = {
  title: 'Mobile LED Trailers',
  desc: 'High-impact mobile LED screens for events, launches and outdoor campaigns. Deploy anywhere across Victoria. Expert setup, content support and flexible hire terms.',
  icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="8" width="16" height="10" rx="1" />
      <path d="M18 14h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="16" cy="18" r="2" />
    </svg>
  ),
};

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="container">
        <div className="services-header">
          <h2>What we hire</h2>
          <p className="services-sub">
            Mobile LED trailers for events and campaigns across Victoria.
          </p>
        </div>
        <div className="services-grid">
          <article className="service-card">
            <div className="service-icon">{SERVICE.icon}</div>
            <h3>{SERVICE.title}</h3>
            <p>{SERVICE.desc}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
