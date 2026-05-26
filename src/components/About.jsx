import './About.css';

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container about-inner">
        <div className="about-content">
          <h2>Melbourne&apos;s LED, VMS &amp; billboard trailer specialists</h2>
          <p className="about-lead">
            Ozzy&apos;s Equipment Hire is your local choice for LED trailers, VMS trailers and mobile billboard
            trailers across Melbourne and Victoria.
          </p>
          <p>
            Whether you need a mobile LED screen for a festival, a variable message sign trailer for a
            worksite, or a billboard trailer for a roadside campaign, we deliver, set up and support your
            hire from start to finish. Our mobile billboard trailers and LED billboard trailers give your
            brand maximum visibility wherever your audience is.
          </p>
          <ul className="about-list">
            <li>LED trailer hire, VMS trailer hire &amp; billboard trailer hire</li>
            <li>Melbourne-based — serving Greater Melbourne &amp; all of Victoria</li>
            <li>Delivery, setup, content support &amp; flexible hire terms</li>
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
