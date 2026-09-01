import GuideLayout from './GuideLayout';

export const FAQ = [
  {
    q: 'What does pixel pitch mean?',
    a: 'Pixel pitch is the distance between the centres of adjacent LEDs, in millimetres. A smaller number means the pixels sit closer together, so the image looks sharp from nearer the screen. Ours is 4 mm.',
  },
  {
    q: 'How close can people stand before it looks blocky?',
    a: 'As a working rule the closest comfortable viewing distance in metres is roughly the pixel pitch in millimetres. At 4 mm the picture is clean from about 4 m and holds up well beyond that for text and simple graphics.',
  },
  {
    q: 'Is one screen enough for my event?',
    a: 'For advertising, wayfinding, schedules, sponsor loops and short video to a crowd gathered around it or to passing traffic, yes. For stage magnification to a large seated audience across a big venue, you want a bigger screen than we run — worth knowing before you book.',
  },
];

export default function LedScreenTrailerSizes() {
  return (
    <GuideLayout
      title="What size LED screen trailer do I need?"
      slug="led-screen-trailer-sizes"
      intro="We run one screen trailer: a 2.4 by 1.6 metre full-colour screen, about 3.8 square metres, at a 4 mm pixel pitch. That suits outdoor advertising, event information and sponsor content. For stage magnification to a large seated crowd you need a bigger screen than we hire."
      faq={FAQ}
      related={[
        ['/led-screen-trailer-hire/', 'LED screen trailer hire', 'The full service page: the screen, setup, power, delivery.'],
        ['/led-trailer-sign-hire-melbourne/', 'LED trailer sign hire', 'The same trailer, for a fixed advert or message.'],
        ['/guides/vms-vs-led-trailer-sign/', 'VMS vs LED sign vs screen trailer', 'Choosing between the three by job type.'],
        ['/pricing/', 'Pricing calculator', 'Price your event dates.'],
      ]}
    >
      <h2>The screen we run</h2>
      <p>
        2.4 m wide, 1.6 m high — about 3.8 square metres — full colour, at a 4 mm pixel pitch
        (roughly 600 by 400 pixels). It sits on a road-registered trailer, runs at 7,500 to 8,000
        nits with an auto-brightness sensor, and takes content over 4G. One size, one trailer.
      </p>

      <h2>What that size is good for</h2>
      <ul>
        <li>A screen beside a road or path for passing traffic to read</li>
        <li>Event and festival information, schedules and wayfinding</li>
        <li>Sponsor and advertising loops at sport, shows and markets</li>
        <li>Retail, dealership and property promotions</li>
        <li>A crowd gathered around the screen, rather than spread across a large venue</li>
      </ul>

      <h2>When you need something bigger</h2>
      <p>
        If the job is stage magnification — the audience seated and spread 30, 50, 100 metres back,
        watching a live feed of the stage — a 3.8 square metre screen is too small to carry it.
        That is a truck-scale or large trailer-mounted video wall, which we do not run. Tell us the
        event and we will be straight about whether our screen fits.
      </p>

      <h2>Check the site first</h2>
      <p>
        The trailer needs a level place to park and position, clear of overhead lines and branches,
        with vehicle access in and out. If the best viewing spot and the only safe parking spot are
        not the same place, that decides where the screen goes. Send a photo or a site plan and we
        will tell you what works.
      </p>

      <h2>Sound is separate</h2>
      <p>
        The trailer is a screen, not a PA. If your content needs audio, run it through your own
        event sound system.
      </p>
    </GuideLayout>
  );
}
