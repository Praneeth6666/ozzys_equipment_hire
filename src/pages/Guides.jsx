import './service-page.css';
import Breadcrumb from '../components/Breadcrumb';
import Contact from '../components/Contact';

const CRUMBS = [
  ['Home', '/'],
  ['Guides', '/guides/'],
];

export const GUIDES = [
  {
    href: '/guides/vms-sign-hire-cost/',
    title: 'How much does VMS sign hire cost?',
    blurb:
      'The full rate card in plain numbers: day rates by contract length, the flat short-hire price, insurance, delivery, and what actually moves the total.',
  },
  {
    href: '/guides/vms-vs-led-trailer-sign/',
    title: 'VMS board vs LED trailer sign vs LED screen trailer',
    blurb:
      'Three trailers that look similar and do different jobs. Which one suits roadworks, which suits an advert, and which suits a festival crowd.',
  },
  {
    href: '/guides/led-screen-trailer-sizes/',
    title: 'What size LED screen trailer do I need?',
    blurb:
      'Screen area, pixel pitch and viewing distance explained for event buyers, with a rough sizing guide by crowd depth.',
  },
  {
    href: '/guides/traffic-management-sign-rules-victoria/',
    title: 'Traffic management sign rules in Victoria',
    blurb:
      'Where a VMS board can go, who approves it, how AS 4852 and the road authority fit in, and what the hire company handles versus the traffic management plan.',
  },
  {
    href: '/guides/writing-a-vms-message/',
    title: 'Writing a VMS message that gets read',
    blurb:
      'One idea per frame, three short lines, recognised wording, two or three frames — and take the text from the traffic management plan.',
  },
  {
    href: '/guides/hiring-an-led-screen-for-a-festival/',
    title: 'Hiring an LED screen for a festival: a checklist',
    blurb:
      'Site, power, content, crew and lead time — what to lock in before an event so the screen is running when the gates open.',
  },
  {
    href: '/guides/solar-vs-mains-power-for-a-long-hire/',
    title: 'Solar or mains power for a long hire?',
    blurb:
      'When solar and battery are enough, and when to plan a 15A mains connection on site. The day rate is the same either way.',
  },
];

export default function Guides() {
  return (
    <main id="main-content">
      <Breadcrumb items={CRUMBS} />

      <section className="sp-hero container">
        <span className="sp-eyebrow">Guides</span>
        <h1>Hire guides</h1>
        <p className="sp-lead">
          Short, practical answers to the questions we get asked before a hire — cost, which trailer
          to choose, screen sizing, and how the sign rules work in Victoria.
        </p>
      </section>

      <section className="sp-section">
        <div className="container">
          <ul className="sp-related-list">
            {GUIDES.map(({ href, title, blurb }) => (
              <li key={href} className="sp-area-card">
                <h2><a href={href}>{title}</a></h2>
                <p>{blurb}</p>
                <a href={href} className="service-more">Read the guide</a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Contact />
    </main>
  );
}
