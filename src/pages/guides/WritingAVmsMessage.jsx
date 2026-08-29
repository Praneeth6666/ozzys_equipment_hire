import GuideLayout from './GuideLayout';

export const FAQ = [
  {
    q: 'How many words can a VMS board show at once?',
    a: 'Keep it to three short lines of a few words each, and no more than about eight words a driver has to read in one pass. If the message needs more than that, split it across two frames rather than shrinking the text.',
  },
  {
    q: 'How many frames should a message cycle through?',
    a: 'Two is comfortable, three at most. A driver should be able to read the whole cycle while approaching the board. More frames than that and someone passing at speed sees only part of the message.',
  },
  {
    q: 'Can you change the wording once the board is on site?',
    a: 'Yes. Email the new text and we update it remotely, usually the same day, at no extra charge during the hire.',
  },
];

export default function WritingAVmsMessage() {
  return (
    <GuideLayout
      title="Writing a VMS message that gets read"
      slug="writing-a-vms-message"
      intro="A VMS board works when a driver can read the whole message in one glance at speed. Keep each frame to three short lines, use plain recognised wording, and run no more than two or three frames in a cycle. If your works have a traffic management plan, take the wording from that."
      faq={FAQ}
      related={[
        ['/vms-sign-hire/', 'VMS sign hire', 'Boards, sizes, delivery and remote message changes.'],
        ['/guides/traffic-management-sign-rules-victoria/', 'Traffic management sign rules in Victoria', 'Where the wording and the board size should come from.'],
        ['/guides/vms-sign-hire-cost/', 'How much does VMS sign hire cost?', 'The rate card and a worked example.'],
      ]}
    >
      <h2>One idea per frame</h2>
      <p>
        Each frame should carry a single instruction or fact: the hazard, the action, or the
        distance. Trying to fit the reason, the location and the instruction onto one frame makes
        all three harder to read. If you have more to say, use a second frame.
      </p>

      <h2>Keep the lines short</h2>
      <p>
        Three lines is the working limit, and each line should be a few words. Aim for a driver
        reading no more than about eight words per frame in a single pass. Short words beat long
        ones: <strong>ROAD WORK</strong> reads faster than <strong>ROADWORKS IN PROGRESS</strong>,
        and <strong>MERGE LEFT</strong> faster than <strong>TRAFFIC MERGES TO LEFT LANE</strong>.
      </p>

      <h2>Use wording drivers already know</h2>
      <p>
        Stick to the phrasing used on standard road signs and in traffic management plans:
        PREPARE TO STOP, REDUCE SPEED, FORM ONE LANE, DETOUR AHEAD, EXPECT DELAYS. Recognised
        wording is understood before it is fully read. Avoid abbreviations that are not standard,
        and avoid anything that could be misread at a glance.
      </p>

      <h2>Two frames, not five</h2>
      <p>
        A two-frame cycle lets a driver read the whole message while approaching the board. Three
        frames is the practical maximum. Beyond that, someone passing at speed sees a fragment. If
        the message genuinely needs more, it is usually a sign the works need a second board further
        back rather than a longer cycle.
      </p>

      <h2>Numbers and distances</h2>
      <p>
        Give a distance or a time where it helps a driver plan: ROAD WORK / 2 KM, or DELAYS /
        UNTIL 6 PM. Round to something a driver can act on. A precise figure that changes hourly is
        worse than a clear approximate one.
      </p>

      <h2>Let the plan drive it</h2>
      <p>
        For works on or beside a road, the traffic management plan specifies what the board should
        display and where it goes. Take the wording from the plan rather than writing it fresh on
        the day. If you are not sure, your traffic controller can tell you what the plan calls for,
        and we load exactly that.
      </p>
    </GuideLayout>
  );
}
