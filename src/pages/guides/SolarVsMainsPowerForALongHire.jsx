import GuideLayout from './GuideLayout';

export const FAQ = [
  {
    q: 'At what point do I need to arrange mains power?',
    a: 'As a rule of thumb, around three weeks. Shorter hires run on solar and battery with no site power. From about three weeks, or through a run of overcast weather, plan for a 15A connection you provide.',
  },
  {
    q: 'What connection does the trailer need?',
    a: 'A standard 15A power outlet on site. You arrange it; we bring the leads. If a 15A point is not available near where the trailer sits, tell us when you book so we can plan around it.',
  },
  {
    q: 'Does mains power cost more?',
    a: 'The day rate is the same either way. The cost is whatever it takes you to make a 15A point available at the site.',
  },
];

export default function SolarVsMainsPowerForALongHire() {
  return (
    <GuideLayout
      title="Solar or mains power for a long hire?"
      slug="solar-vs-mains-power-for-a-long-hire"
      intro="Short hires run on solar and battery with nothing needed from you. From about three weeks, or through sustained overcast weather, plan for a 15A mains connection on site that you provide. The day rate does not change; the difference is whether the trailer can keep its batteries charged from daylight alone."
      faq={FAQ}
      related={[
        ['/vms-sign-hire/', 'VMS sign hire', 'Boards, delivery, and the power note in context.'],
        ['/led-screen-trailer-hire/', 'LED screen trailer hire', 'Screen trailers can also run off an onboard generator.'],
        ['/guides/vms-sign-hire-cost/', 'How much does hire cost?', 'Power is a site cost, not a line on the rate card.'],
      ]}
    >
      <h2>How the power works</h2>
      <p>
        A VMS board or LED trailer sign carries a battery bank and solar panels. In good light the
        panels keep the batteries topped up and the sign runs indefinitely with nothing plugged in.
        The batteries are the buffer for nights and cloudy spells.
      </p>

      <h2>When solar alone is enough</h2>
      <p>
        For a hire of up to about two to three weeks in normal Melbourne weather, solar and battery
        cover it. This is the usual case for events, short roadworks and campaigns. You do not need
        to organise anything on site, and there is no power to pay for.
      </p>

      <h2>When to plan for mains</h2>
      <p>
        Two things push a hire toward a mains connection: <strong>duration</strong> and
        <strong> weather</strong>. From roughly three weeks, the odds of a long overcast stretch
        that outpaces the panels go up, and a flat battery means a dark sign. Winter, and any hire
        with the panels shaded by buildings or trees, brings that point forward. In those cases plan
        for a 15A connection on site that you provide, and we bring the leads.
      </p>

      <h2>What a mains connection means for you</h2>
      <p>
        A standard 15A power point within reach of where the trailer sits. On a council or civil
        site that is usually straightforward; in a car park or a nature strip it may need a
        temporary supply or a lead from a nearby building. Sort this out when you book, not on the
        day, and tell us if a 15A point is not available near the trailer&rsquo;s position.
      </p>

      <h2>Screen trailers are different</h2>
      <p>
        LED screen trailers draw far more power than a sign and are not solar-run. They use an
        onboard generator or a site power feed. If you are hiring a screen trailer for a long
        run rather than an event, talk to us about which suits the site.
      </p>
    </GuideLayout>
  );
}
