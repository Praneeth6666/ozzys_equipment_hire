import AreaLayout from './AreaLayout';

export default function Gippsland() {
  return (
    <AreaLayout
      name="Gippsland"
      slug="gippsland"
      lead="Ozzy's Equipment Hire covers Gippsland — the Latrobe Valley, South Gippsland and East Gippsland — for VMS boards, LED trailer signs and LED screen trailers. It is the longest run we do regularly, so a Gippsland hire wants two to three weeks of notice and the delivery charge reflects the travel from Melbourne."
      localities={[
        ['Latrobe Valley', 'Traralgon, Morwell, Moe, Churchill'],
        ['West Gippsland', 'Warragul, Drouin, Bunyip, Trafalgar'],
        ['South Gippsland', 'Leongatha, Wonthaggi, Inverloch, Foster'],
        ['East Gippsland', 'Sale, Bairnsdale, Lakes Entrance, Orbost'],
      ]}
      body={[
        'Gippsland hires are weighted toward roads and emergency messaging. VMS boards go out for Princes Highway and South Gippsland Highway works, for the ongoing roadworks around the Latrobe Valley, and for fire-season and flood messaging when routes are affected. Tourism events along the coast and the lakes bring LED trailer signs and screen trailers in over summer for wayfinding and crowd information.',
        'Distance drives the planning. A single delivery run can cover a wide area, so if you have works or an event across more than one town it is worth coordinating the dates. For fire-season standby messaging, talk to us early about a longer-term hire with a mains connection rather than a short solar-only booking.',
        'Sign and road-occupation approvals are handled by the relevant council — Latrobe, Baw Baw, South Gippsland, Wellington or East Gippsland — or the state road authority, and you arrange them. We deliver and place the trailer to match your plan.',
      ]}
    />
  );
}
