import './About.css';

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container about-inner">
        <div className="about-content">
          <h2>Melbourne VMS sign hire &amp; LED trailer sign specialists</h2>
          <p className="about-lead">
            Ozzy&apos;s Equipment Hire is your local choice for VMS sign hire, LED trailer sign hire and LED
            screen trailer hire across Melbourne and Victoria.
          </p>
          <p>
            Whether you need an LED screen trailer for a festival, VMS sign hire for a worksite, or trailer
            LED sign hire for a roadside campaign, we deliver, set up and support your hire from start to
            finish. LED trailer screen hire and mobile trailer LED screen hire Melbourne give your message
            maximum visibility wherever your audience is.
          </p>
          <p>
            We have run this equipment since 2023, out of a depot in Brighton on Melbourne&apos;s bayside.
            Ozzy&apos;s Equipment Hire — ABN 99 670 872 634.
          </p>
          <ul className="about-list">
            <li>VMS sign hire, LED trailer sign hire &amp; LED screen trailer hire</li>
            <li>Brighton-based — serving Greater Melbourne &amp; all of Victoria</li>
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
