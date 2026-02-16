import './About.css';

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container about-inner">
        <div className="about-content">
          <h2>Expert support. Latest technology.</h2>
          <p className="about-lead">
            Ozzy's Equipment Hire is Melbourne's go-to for mobile LED trailer hire across Victoria.
          </p>
          <p>
            We help businesses stand out with high-impact mobile LED screens for events, launches and
            outdoor campaigns. Backed by expert support and the latest technology, we ensure your message
            reaches the right audience and leaves a lasting impact.
          </p>
          <ul className="about-list">
            <li>Melbourne-based, serving all of Victoria</li>
            <li>Flexible hire terms for events and campaigns</li>
            <li>Full setup, content support and technical assistance</li>
          </ul>
        </div>
        <div className="about-visual" aria-hidden>
          <div className="about-glare" />
          <div className="about-grid" />
        </div>
      </div>
    </section>
  );
}
