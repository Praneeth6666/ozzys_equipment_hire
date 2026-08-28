import GuideLayout from './GuideLayout';

export default function VmsVsLedTrailerSign() {
  return (
    <GuideLayout
      title="VMS board vs LED trailer sign vs LED screen trailer"
      slug="vms-vs-led-trailer-sign"
      intro="Choose by the job, not the look. A VMS board is for plain-text traffic messaging. An LED trailer sign is for full-colour advertising and event information. An LED screen trailer is a video wall for a crowd. All three travel on a trailer and we deliver, place and program them."
      related={[
        ['/vms-sign-hire/', 'VMS sign hire', 'Roadworks, traffic management, site safety.'],
        ['/led-trailer-sign-hire-melbourne/', 'LED trailer sign hire', 'Events, sport, retail, property campaigns.'],
        ['/led-screen-trailer-hire/', 'LED screen trailer hire', 'Festivals, sport, outdoor cinema.'],
      ]}
    >
      <h2>The quick version</h2>
      <div className="sp-table-wrap">
        <table className="sp-table">
          <thead>
            <tr>
              <th>If the job is</th>
              <th>Hire</th>
              <th>Why</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Roadworks, a lane closure, a detour, road-condition alerts</td>
              <td>VMS board</td>
              <td>Amber text reads furthest for the money and meets traffic-messaging expectations</td>
            </tr>
            <tr>
              <td>A promotion, a launch, sponsor content, event wayfinding with branding</td>
              <td>LED trailer sign</td>
              <td>Full colour carries a logo, brand colours and simple imagery</td>
            </tr>
            <tr>
              <td>A film, a live feed, replays, stage vision for a standing or seated crowd</td>
              <td>LED screen trailer</td>
              <td>A large video wall with the brightness and area to hold a crowd</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>VMS board</h2>
      <p>
        A variable message sign shows text and simple graphics, usually amber. It is the standard
        for anything a driver needs to read: merge instructions, speed changes, closure dates,
        weather alerts. Amber is brighter per dollar than full colour and legible at a longer
        distance, which is what matters at road speeds. Hire a VMS board when the content is words
        for traffic, and skip it when the message needs a picture.
      </p>

      <h2>LED trailer sign</h2>
      <p>
        An LED trailer sign is a full-colour panel on the same class of trailer. It does what a VMS
        board cannot: logos, brand colours, photographs, short animations, a rolling set of frames.
        It suits retail campaigns, festival and sport information with sponsor content, property
        releases and roadside advertising. It costs more than an amber board and is no more readable
        for plain text, so it is the wrong choice for a pure traffic message.
      </p>

      <h2>LED screen trailer</h2>
      <p>
        An LED screen trailer is a large LED video wall that folds for travel and raises on site. It
        is built to play full-motion video to an audience: image magnification of a stage, a
        highlights reel, an outdoor film, a live camera feed. It carries its own sound and power. It
        is a bigger, more involved hire than a sign, so use it only when people will actually stop
        and watch.
      </p>

      <h2>Two edge cases</h2>
      <p>
        <strong>Advertising that also needs to be read by drivers.</strong> A full-colour LED trailer
        sign covers both, as long as the wording stays short. If the priority is drivers reading it
        at speed, an amber VMS board still wins on legibility.
      </p>
      <p>
        <strong>A small, close audience.</strong> If fewer than a few dozen people will watch from
        close range, a large television or a projector often does the job of a screen trailer for
        much less.
      </p>
    </GuideLayout>
  );
}
