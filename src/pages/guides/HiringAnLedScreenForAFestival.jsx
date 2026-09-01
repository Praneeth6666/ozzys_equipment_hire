import GuideLayout from './GuideLayout';

export const FAQ = [
  {
    q: 'How far ahead should we book a screen for a festival?',
    a: 'Two to three weeks for a Melbourne event, longer for a regional one or a busy summer weekend. Short notice is sometimes possible — call and ask.',
  },
  {
    q: 'Do we need to supply power?',
    a: 'For a short event, no — the trailer runs on solar and battery. For a multi-day booking, or one that starts before three weeks of good sun, plan for a standard 10 A power point near where the trailer sits.',
  },
  {
    q: 'Can you change the content on the day?',
    a: 'Yes. We load your files before the event and it loops. Changes during the hire go over the trailer’s 4G connection, so there is no operator to book.',
  },
];

export default function HiringAnLedScreenForAFestival() {
  return (
    <GuideLayout
      title="Hiring an LED screen for a festival: a checklist"
      slug="hiring-an-led-screen-for-a-festival"
      intro="Book two to three weeks out, confirm a level spot clear of overhead lines with vehicle access, sort power for a multi-day hire, and have your content ready as image and video files sized to 600 by 400 pixels. Setup takes about half an hour, and we usually deliver the day before an early start."
      faq={FAQ}
      related={[
        ['/led-screen-trailer-hire/', 'LED screen trailer hire', 'The full service page: the screen, power, delivery.'],
        ['/guides/led-screen-trailer-sizes/', 'What size LED screen trailer do I need?', 'The one size we run and what it suits.'],
        ['/guides/vms-sign-hire-cost/', 'How much does hire cost?', 'The rate card and delivery.'],
      ]}
    >
      <h2>The site</h2>
      <p>
        The trailer needs a level area to park and position the screen, clear of overhead power
        lines and low branches, with a path wide enough to tow it in and out. Walk the ground
        before the event: the best viewing position and the only safe parking spot are not always
        the same place. A photo or a site plan sent ahead lets us tell you what fits.
      </p>

      <h2>Power</h2>
      <p>
        For a weekend event the trailer runs on its solar and battery with nothing needed from you.
        For a longer booking, or one that runs through a stretch of overcast weather, plan for a
        standard 10 A power point on site within reach of where the trailer sits, and we bring the
        leads.
      </p>

      <h2>Content</h2>
      <p>
        Prepare your material as image and short video files, sized to 600 by 400 pixels, and get
        them to us before the day so we can test them on the actual screen. Think about what plays
        when: a holding loop before gates, event and stage times, sponsor frames between acts, and a
        clear wayfinding or safety message you can point people to. The screen has no sound; run
        audio through your own event PA.
      </p>

      <h2>What the screen suits</h2>
      <p>
        It is a 2.4 by 1.6 metre screen — good for a crowd gathered around it, for a thoroughfare or
        entrance, and for passing traffic. It is not a stage-magnification screen for an audience
        spread across a large arena. If that is the job, you need a bigger unit than we run.
      </p>

      <h2>Timing</h2>
      <p>
        Book two to three weeks ahead for a Melbourne event, more for regional Victoria or a peak
        summer weekend. We deliver the day before anything with an early start, and setup runs about
        half an hour once the site is ready. Tell us your bump-in and bump-out windows so delivery
        and collection fit around them.
      </p>

      <h2>Weather</h2>
      <p>
        The screen is built for outdoor use and daylight, at 7,500 to 8,000 nits with an
        auto-brightness sensor. A screen facing low afternoon sun is harder to read than a shaded or
        evening position, so factor orientation into where it goes.
      </p>
    </GuideLayout>
  );
}
