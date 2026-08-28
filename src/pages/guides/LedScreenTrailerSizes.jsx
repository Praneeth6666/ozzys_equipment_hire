import GuideLayout from './GuideLayout';

export const FAQ = [
  {
    q: 'What does pixel pitch mean?',
    a: 'Pixel pitch is the distance between the centres of adjacent LEDs, measured in millimetres. A smaller number means the pixels are closer together, so the image looks sharp from nearer the screen. A larger number is coarser but usually brighter and cheaper, and it looks fine once the audience is further back.',
  },
  {
    q: 'How far back can people sit or stand?',
    a: 'As a working rule the closest comfortable viewing distance in metres is roughly the pixel pitch in millimetres, and the screen stays readable well past a hundred metres. So a 4 mm screen looks clean from about 4 m; a 6 mm screen from about 6 m. The far limit is set by the screen area, not the pitch.',
  },
  {
    q: 'Does the screen need to be bigger for daytime events?',
    a: 'Not bigger, but bright enough. Screen trailers are built for daylight, but a west-facing screen in afternoon sun is a harder ask than a shaded or evening position. Tell us the orientation and time of day and we factor it in.',
  },
];

export default function LedScreenTrailerSizes() {
  return (
    <GuideLayout
      title="What size LED screen trailer do I need?"
      slug="led-screen-trailer-sizes"
      intro="Match the screen to how far back your audience is and how many of them there are. Two numbers decide it: the screen area, and the pixel pitch. Tell us the crowd size and the depth of the viewing area and we bring the right trailer."
      faq={FAQ}
      related={[
        ['/led-screen-trailer-hire/', 'LED screen trailer hire', 'The full service page: setup, sound, power, delivery.'],
        ['/pricing/', 'Pricing calculator', 'Price your event dates.'],
      ]}
    >
      <h2>Start with the viewing area</h2>
      <p>
        Stand where the furthest viewer will be and look back at where the screen will go. That
        distance, and how wide the crowd spreads, is what sets the size. A screen that is right for a
        20-metre-deep marquee is lost on a football oval, and a screen built for the oval is overkill
        indoors.
      </p>

      <h2>A rough guide by crowd</h2>
      <div className="sp-table-wrap">
        <table className="sp-table">
          <thead>
            <tr>
              <th>Audience</th>
              <th>Viewing depth</th>
              <th>Aim for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Up to ~200, seated or close</td>
              <td>To about 20 m</td>
              <td>A smaller screen area, finer pixel pitch</td>
            </tr>
            <tr>
              <td>A few hundred to a couple of thousand</td>
              <td>20–60 m</td>
              <td>A mid screen area and pixel pitch — the common event setup</td>
            </tr>
            <tr>
              <td>A large festival or sport crowd</td>
              <td>60 m and beyond</td>
              <td>The largest screen area available; a coarser pitch is fine at that range</td>
            </tr>
          </tbody>
        </table>
        {/* TODO(owner): replace the guide bands with the actual screen areas and pixel pitches
            of each trailer in the fleet. */}
      </div>

      <h2>Then check the site</h2>
      <p>
        A big screen needs a level place to park and raise, clear of overhead lines and branches,
        with vehicle access to bring the trailer in and out. If the ideal viewing position and the
        only safe parking spot are not the same place, that can decide the size for you. Send a photo
        or a site plan and we will tell you what fits.
      </p>

      <h2>Sound and power come with it</h2>
      <p>
        The trailers carry an onboard PA that covers a modest crowd, and we can feed the screen
        audio into a larger event PA. Power runs off an onboard generator or a site supply. None of
        that changes the screen size you need, but it is worth knowing you are not hiring those
        separately.
      </p>
    </GuideLayout>
  );
}
