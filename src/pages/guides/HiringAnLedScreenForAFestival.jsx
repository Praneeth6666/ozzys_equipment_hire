import GuideLayout from './GuideLayout';

export const FAQ = [
  {
    q: 'How far ahead should we book a screen for a festival?',
    a: 'Two to three weeks for a Melbourne event, longer for a regional one or a busy summer weekend. Short notice is sometimes possible for a single trailer — call and ask.',
  },
  {
    q: 'Do we need to supply power?',
    a: 'Not necessarily. The trailer can run off its onboard generator, or off a site supply if you have one. Tell us which and we set up accordingly.',
  },
  {
    q: 'Can you run the content on the day, or do we do it?',
    a: 'Either. We can supply an operator to switch between a live feed, replays and sponsor loops, or we set the trailer to loop your file and leave it. Send video ahead of time so we can test it on the screen.',
  },
];

export default function HiringAnLedScreenForAFestival() {
  return (
    <GuideLayout
      title="Hiring an LED screen for a festival: a checklist"
      slug="hiring-an-led-screen-for-a-festival"
      intro="Book two to three weeks out, confirm a level spot clear of overhead lines with vehicle access, decide whether power comes from the onboard generator or a site supply, and have your content ready as video files. Setup of a single screen trailer takes about half an hour, and we usually deliver the day before an early start."
      faq={FAQ}
      related={[
        ['/led-screen-trailer-hire/', 'LED screen trailer hire', 'The full service page: sizes, sound, power, delivery.'],
        ['/guides/led-screen-trailer-sizes/', 'What size LED screen trailer do I need?', 'Matching the screen to your crowd and viewing distance.'],
        ['/guides/vms-sign-hire-cost/', 'How much does hire cost?', 'The rate card, delivery, and the operator line.'],
      ]}
    >
      <h2>The site</h2>
      <p>
        The trailer needs a level area big enough to park and raise the screen, clear of overhead
        power lines and low branches, with a path wide enough to tow it in and out. Walk the ground
        before the event: the best viewing position and the only safe parking spot are not always
        the same place. A photo or a site plan sent ahead lets us tell you what fits.
      </p>

      <h2>Power</h2>
      <p>
        Decide early. The onboard generator makes the trailer self-contained, which suits a paddock
        or a spot with no nearby supply. A site power feed is quieter and avoids refuelling for a
        long day. Either works — we just need to know which so we bring the right leads.
      </p>

      <h2>Content</h2>
      <p>
        Prepare your material as video files and get them to us before the day so we can test them
        on the actual screen. Think about what plays when: a holding loop before doors, live vision
        or image magnification during sets, sponsor frames between acts, and a clear wayfinding or
        safety message you can cut to if needed.
      </p>

      <h2>Crew</h2>
      <p>
        If the running order changes through the day, or you want to switch between a camera feed
        and pre-made content, book an operator. If the screen only ever shows one loop, you do not
        need one and we set it and leave it. The operator is quoted separately from the day rate.
      </p>

      <h2>Timing</h2>
      <p>
        Book two to three weeks ahead for a Melbourne event, more for regional Victoria or a peak
        summer weekend. We deliver the day before anything with an early start, and setup of a
        single screen runs about half an hour once the site is ready.
      </p>

      <h2>Weather and hours</h2>
      <p>
        The screens are built for outdoor events and daylight. A screen facing low afternoon sun is
        harder to read than a shaded or evening position, so factor orientation into where it goes.
        Tell us your bump-in and bump-out windows so delivery and collection fit around them.
      </p>
    </GuideLayout>
  );
}
