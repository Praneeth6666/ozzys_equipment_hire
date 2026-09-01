import GuideLayout from './GuideLayout';

export const FAQ = [
  {
    q: 'At what point do I need to arrange mains power?',
    a: 'As a rule of thumb, around three weeks. Shorter hires run on solar and battery with no site power. From about three weeks, or through a run of overcast weather, plan for a 10A power point you provide.',
  },
  {
    q: 'What connection does the trailer need?',
    a: 'A standard 10A power point on site. You arrange it; we bring the leads. If a 10A power point is not available near where the trailer sits, tell us when you book so we can plan around it.',
  },
  {
    q: 'Does mains power cost more?',
    a: 'The day rate is the same either way. The cost is whatever it takes you to make a 10A power point available at the site.',
  },
];

export default function SolarVsMainsPowerForALongHire() {
  return (
    <GuideLayout
      title="Solar or mains power for a long hire?"
      slug="solar-vs-mains-power-for-a-long-hire"
      intro="Short hires run on solar and battery with nothing needed from you. From about three weeks, or through sustained overcast weather, plan for a 10A power point on site that you provide. The day rate does not change; the difference is whether the trailer can keep its batteries charged from daylight alone."
      faq={FAQ}
      related={[
        ['/vms-sign-hire/', 'VMS sign hire', 'Boards, delivery, and the power note in context.'],
        ['/led-screen-trailer-hire/', 'LED screen trailer hire', 'The same trailer, run as a moving-content screen.'],
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
        for a 10A power point on site that you provide, and we bring the leads.
      </p>

      <h2>What a mains connection means for you</h2>
      <p>
        A standard 10A power point within reach of where the trailer sits. On a council or civil
        site that is usually straightforward; in a car park or a nature strip it may need a
        temporary supply or a lead from a nearby building. Sort this out when you book, not on the
        day, and tell us if a 10A power point is not available near the trailer&rsquo;s position.
      </p>

      <h2>Running it as a screen trailer</h2>
      <p>
        It is the same trailer whether you hire it as a sign or as a moving-content screen, and the
        power works the same way: solar and battery for a short hire, a 10A point for a long one.
        Continuous full-brightness video does draw more than a static message, so for a long screen
        run tell us the content and we will confirm whether the site needs mains power.
      </p>
    </GuideLayout>
  );
}
