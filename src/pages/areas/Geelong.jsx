import AreaLayout from './AreaLayout';

export default function Geelong() {
  return (
    <AreaLayout
      name="Geelong"
      slug="geelong"
      lead="We deliver VMS boards, LED trailer signs and LED screen trailers to Geelong, the Bellarine Peninsula and the Surf Coast. Trailers run down from Melbourne, so a Geelong hire wants two to three weeks of notice and the delivery charge reflects the distance from the depot."
      localities={[
        ['Central Geelong', 'CBD, Newtown, Geelong West, East Geelong, South Geelong'],
        ['Northern suburbs', 'Norlane, Corio, North Shore, Lara'],
        ['Bellarine Peninsula', 'Ocean Grove, Barwon Heads, Drysdale, Portarlington, Queenscliff'],
        ['Surf Coast', 'Torquay, Jan Juc, Anglesea, Lorne'],
      ]}
      body={[
        'Geelong hires split fairly evenly between roadworks and events. VMS boards go out for arterial works on the Princes Highway and the Ring Road, for council works across the growth areas around Armstrong Creek, and for detour messaging when a level crossing or bridge job closes a route. LED trailer signs and screen trailers head to the waterfront for festivals and markets, to GMHBA Stadium precinct events, and to the Bellarine and Surf Coast for summer activations.',
        'Because everything is delivered from Melbourne, plan the booking around the delivery run rather than same-day availability. Give us the dates and the site address and we will quote the delivery leg along with the hire. For a multi-day event we usually drop the trailer the day before.',
        'For placements on a public road or foreshore reserve, the approval sits with the City of Greater Geelong or the relevant committee of management, and you arrange it. We place the trailer where your plan or permit specifies.',
      ]}
    />
  );
}
