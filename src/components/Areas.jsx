import { SERVICE_AREAS, USE_CASES } from '../data/seo';
import './Areas.css';

export default function Areas() {
  return (
    <section id="areas" className="areas" aria-labelledby="areas-heading">
      <div className="container">
        <div className="areas-inner">
          <div className="areas-content">
            <h2 id="areas-heading">VMS sign hire &amp; LED trailer sign hire Melbourne</h2>
            <p className="areas-lead">
              Searching for <strong>VMS sign hire</strong>, <strong>LED trailer sign hire Melbourne</strong> or{' '}
              <strong>mobile LED screen trailer hire Melbourne</strong>? We are based in Melbourne and deliver
              VMS signs, LED trailer signs and LED screen trailers across Victoria.
            </p>
            <p>
              From city activations to regional road campaigns, Ozzy&apos;s Equipment Hire brings high-impact
              mobile LED screens to your location with setup, content support and flexible hire periods.
            </p>
          </div>
          <div className="areas-list-wrap">
            <h3 className="areas-list-title">Areas we service</h3>
            <ul className="areas-list">
              {SERVICE_AREAS.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
          <div className="areas-list-wrap">
            <h3 className="areas-list-title">Common hire uses</h3>
            <ul className="areas-list areas-list--single">
              {USE_CASES.map((useCase) => (
                <li key={useCase}>{useCase}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
