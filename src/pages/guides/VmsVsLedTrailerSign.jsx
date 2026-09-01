import GuideLayout from './GuideLayout';

export default function VmsVsLedTrailerSign() {
  return (
    <GuideLayout
      title="VMS board vs LED trailer sign vs LED screen trailer"
      slug="vms-vs-led-trailer-sign"
      intro="These are three jobs for one trailer. We run a single full-colour LED screen on a road-registered trailer: as a VMS board it shows plain text for traffic, as an LED trailer sign it carries a fixed advert, and as an LED screen trailer it runs a rolling set of images and short video. Choose the framing that matches your job."
      related={[
        ['/vms-sign-hire/', 'VMS sign hire', 'Roadworks, traffic management, site safety.'],
        ['/led-trailer-sign-hire-melbourne/', 'LED trailer sign hire', 'Events, sport, retail, property campaigns.'],
        ['/led-screen-trailer-hire/', 'LED screen trailer hire', 'Advertising, event info and sponsor content.'],
      ]}
    >
      <h2>The quick version</h2>
      <div className="sp-table-wrap">
        <table className="sp-table">
          <thead>
            <tr>
              <th scope="col">If the job is</th>
              <th scope="col">Ask for</th>
              <th scope="col">What it does</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Roadworks, a lane closure, a detour, road-condition alerts</td>
              <td>VMS board</td>
              <td>Plain text for drivers, taken from the traffic management plan</td>
            </tr>
            <tr>
              <td>A promotion, a launch, sponsor content, branded event wayfinding</td>
              <td>LED trailer sign</td>
              <td>A fixed full-colour advert — logo, brand colours, a headline, an image</td>
            </tr>
            <tr>
              <td>Advertising or event content that moves — a sponsor loop, animation, short video</td>
              <td>LED screen trailer</td>
              <td>The same screen running a rolling set of content, updated over 4G</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>As a VMS board</h2>
      <p>
        For anything a driver needs to read — merge instructions, speed changes, closure dates,
        weather alerts — the trailer runs plain text. Keep it to three short lines and take the
        wording from the traffic management plan. If a large or high-speed job specifies a
        purpose-built amber board of a particular AS 4852 class or character height, tell us and we
        will confirm whether our trailer meets it.
      </p>

      <h2>As an LED trailer sign</h2>
      <p>
        Set the screen to a fixed full-colour advert and leave it: a logo, a headline, a product
        image, or a small rotating set of frames. This suits retail campaigns, festival and sport
        information with sponsor content, property releases and roadside advertising. It is no more
        readable than plain text for a pure traffic message, so it is the wrong framing for a
        works site.
      </p>

      <h2>As an LED screen trailer</h2>
      <p>
        Same screen, moving content: a sponsor loop, animation, a short video, an event schedule
        that changes through the day. You send the files and we load them; changes during the hire
        go over 4G. It is a screen for a crowd gathered around it or for passing traffic, not a
        stage-magnification wall for a large seated audience — that is a bigger unit than we run.
      </p>

      <h2>Two edge cases</h2>
      <p>
        <strong>Advertising that also needs to be read by drivers.</strong> A full-colour advert
        covers both, as long as the wording stays short. If the priority is drivers reading it at
        speed, plain high-contrast text still wins.
      </p>
      <p>
        <strong>A small, close audience.</strong> If only a few dozen people will watch from close
        range, a large television or a projector often does the job for less.
      </p>
    </GuideLayout>
  );
}
