import GuideLayout from './GuideLayout';

export const FAQ = [
  {
    q: 'Does Ozzy’s Equipment Hire arrange the permits?',
    a: 'No. We supply, deliver, place and program the board. The traffic management plan, the road-occupation permit and any council approval are arranged by you or your traffic management contractor. We place the board to match what the plan and permit specify.',
  },
  {
    q: 'What is AS 4852?',
    a: 'AS 4852 is the Australian Standard for portable variable message signs. It covers things like character size, brightness and legibility. It matters because a road authority or a traffic management plan will often specify a board that meets it. If your plan calls for an AS 4852 board, tell us and we supply one.',
  },
  {
    q: 'Can I put a VMS board on a nature strip or footpath?',
    a: 'On a public road reserve — which includes the nature strip and footpath — you generally need approval from the road authority, usually the local council. Rules and lead times vary by council. On private land with the landholder’s permission, it is straightforward.',
  },
];

export default function TrafficManagementSignRulesVictoria() {
  return (
    <GuideLayout
      title="Traffic management sign rules in Victoria"
      slug="traffic-management-sign-rules-victoria"
      intro="A VMS board on or beside a road in Victoria sits under a traffic management plan and, on a public road, a permit from the road authority. The hire company supplies and places the board; the plan and the approvals are the customer’s responsibility. This is general information, not legal or traffic-engineering advice."
      faq={FAQ}
      related={[
        ['/vms-sign-hire/', 'VMS sign hire', 'Boards, sizes, programming, delivery and setup.'],
        ['/service-areas/melbourne/', 'Melbourne service area', 'Where we deliver and how a hire runs.'],
      ]}
    >
      <h2>Who is responsible for what</h2>
      <p>
        For works on or near a road, the party doing the works prepares a traffic management plan. It
        sets out signage, including any variable message signs: where they go, what they show and
        what class of board is required. A qualified traffic management provider usually writes and
        implements it. Ozzy&rsquo;s Equipment Hire supplies the board and places it where the plan
        says. We do not write the plan and we do not lodge the permits.
      </p>

      <h2>Permits and approvals</h2>
      <p>
        Placing equipment on a public road reserve — the carriageway, the shoulder, the nature strip
        or the footpath — generally needs a road-occupation or works-within-road-reserve permit from
        the road authority. For local roads that is the council; for arterials and freeways it is the
        state road authority. Each council runs its own process and lead time, so start early. On
        private land, an event site or a car park, you need the landholder&rsquo;s agreement rather
        than a road permit.
      </p>

      <h2>Where AS 4852 fits</h2>
      <p>
        AS 4852.1 is the Australian Standard for portable variable message signs. It governs
        character height, brightness, viewing angle and legibility. Road authorities and traffic
        management plans often specify a board that complies with it, especially for higher-speed
        roads. If your plan or permit calls for an AS 4852 board, say so when you book and we supply
        one that meets it.
      </p>

      <h2>Message content</h2>
      <p>
        Message wording for a works site should come from the traffic management plan, not be made up
        on the day. Keep each frame short, use recognised phrasing, and avoid running more than a few
        frames in a cycle so a driver can read the whole message in one pass. We load the schedule
        you provide and can adjust it remotely during the hire.
      </p>

      <h2>Where to check</h2>
      <p>
        For the current rules, go to the source: your local council for local-road permits, the
        Victorian state road authority for arterial roads and freeways, and a licensed traffic
        management provider for the plan itself. This guide is a starting point, not a substitute for
        those.
      </p>
    </GuideLayout>
  );
}
