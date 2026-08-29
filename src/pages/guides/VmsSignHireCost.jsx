import GuideLayout from './GuideLayout';

export const FAQ = [
  {
    q: 'Is there a minimum hire?',
    a: 'One day. Any hire of one to six days is charged at the flat rate of $500 plus 8% insurance, ex GST, regardless of which board or screen you take.',
  },
  {
    q: 'Does the price change between a VMS board, an LED trailer sign and an LED screen trailer?',
    a: 'The day-rate card is the same for all three. What changes the total is the hire length, the delivery distance, and whether you need an event operator for a screen trailer.',
  },
  {
    q: 'How is insurance calculated?',
    a: 'Insurance is 8% of the total hire price and is added as a separate line. It is not optional.',
  },
  {
    q: 'What does delivery cost?',
    a: 'Delivery, setup and installation is a one-off $350 for hires under three months, or nothing if you self-pickup. Regional deliveries beyond Melbourne carry a distance-based charge on top, quoted against the site address.',
  },
];

export default function VmsSignHireCost() {
  return (
    <GuideLayout
      title="How much does VMS sign hire cost?"
      slug="vms-sign-hire-cost"
      intro="VMS sign hire in Melbourne starts at $45 per day ex GST on a 12-month contract and rises to $75 per day ex GST for a hire under a month. Any hire of one to six days is a flat $500 plus 8% insurance. The same rates apply to LED trailer signs and LED screen trailers."
      faq={FAQ}
      related={[
        ['/vms-sign-hire/', 'VMS sign hire', 'The full service page: boards, sizes, programming, delivery.'],
        ['/led-trailer-sign-hire-melbourne/', 'LED trailer sign hire', 'Same rate card, full-colour signs for events.'],
        ['/led-screen-trailer-hire/', 'LED screen trailer hire', 'Same rate card, event video screens.'],
        ['/pricing/', 'Pricing calculator', 'Price your exact dates and see the insurance and delivery lines.'],
      ]}
    >
      <h2>The rate card</h2>
      <p>All figures exclude GST. Insurance is 8% of the total hire, added separately.</p>
      <div className="sp-table-wrap">
        <table className="sp-table">
          <thead>
            <tr>
              <th>Contract length</th>
              <th>Per day</th>
              <th>Approx. per month (30 days)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>12 months</td><td>$45</td><td>$1,350</td></tr>
            <tr><td>6 months</td><td>$50</td><td>$1,500</td></tr>
            <tr><td>3 months</td><td>$60</td><td>$1,800</td></tr>
            <tr><td>1 month</td><td>$70</td><td>$2,100</td></tr>
            <tr><td>Under 1 month</td><td>$75</td><td>$2,250</td></tr>
            <tr><td>1 to 6 days</td><td colSpan={2}>Flat $500, plus 8% insurance</td></tr>
          </tbody>
        </table>
      </div>

      <h2>What moves the total</h2>
      <p>
        <strong>Hire length.</strong> The day rate drops as the term gets longer. A board you keep
        for a year costs $45 a day; the same board for three weeks costs $75 a day. If a hire runs
        longer than booked, tell us before the end date and we re-rate the whole hire to the band it
        now falls in.
      </p>
      <p>
        <strong>Delivery.</strong> Setup and installation is a one-off $350 for hires under three
        months across Melbourne, or free if you tow it yourself. Deliveries to Geelong, Ballarat,
        Bendigo and Gippsland add a distance-based charge on top, quoted against the site address.
      </p>
      <p>
        <strong>Insurance.</strong> Always 8% of the total hire. On a one-week job at $75 a day that
        is about $42; on a three-month job it is a larger line, which is part of why longer terms
        work out cheaper per day.
      </p>
      <p>
        <strong>Power.</strong> Short hires run on solar and battery at no extra cost. Hires of
        about three weeks or more should assume a 15A mains connection that you provide on site.
      </p>
      <p>
        <strong>An operator, for screen trailers.</strong> If you want someone to run content live at
        an event rather than looping a file, that is quoted separately from the day rate.
      </p>

      <h2>A worked example</h2>
      <p>
        A council needs a VMS board for a four-week roadwork in Melbourne. That is the "1 month" band
        at $70 a day, so 30 days is $2,100. Insurance at 8% is $168. Delivery and setup is $350. The
        total is $2,618 ex GST. Self-pickup would take it to $2,268.
      </p>
    </GuideLayout>
  );
}
