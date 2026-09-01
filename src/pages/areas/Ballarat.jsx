import AreaLayout from './AreaLayout';

export default function Ballarat() {
  return (
    <AreaLayout
      name="Ballarat"
      slug="ballarat"
      lead="Ozzy's Equipment Hire delivers VMS boards, LED trailer signs and LED screen trailers to Ballarat and the western goldfields. It is a regional run from Melbourne up the Western Highway, so book two to three weeks out and expect a distance-based delivery charge."
      localities={[
        ['Central Ballarat', 'CBD, Ballarat East, Ballarat North, Lake Wendouree, Golden Point'],
        ['Outer suburbs', 'Wendouree, Alfredton, Delacombe, Sebastopol, Mount Clear'],
        ['Surrounding towns', 'Buninyong, Creswick, Clunes, Bacchus Marsh, Ballan'],
      ]}
      body={[
        'The steady demand in Ballarat is roadworks and traffic management. VMS boards go out for works on the Western Highway and the Midland Highway, for council road maintenance across the city, and for winter road-condition messaging when fog and ice close or slow routes through the ranges. Event work picks up around Begonia Festival, the winter light events, and race days at the showgrounds and racecourse, where LED trailer signs and screen trailers handle wayfinding and sponsor content.',
        'Winter is worth planning around. Overcast stretches mean a longer hire should assume a 10A power point on site rather than relying on solar. Tell us the hire length and we will let you know whether to arrange power.',
        'Approvals for signs on a public road sit with the City of Ballarat or the state road authority, and you arrange them. We supply, deliver and place the trailer to match your traffic management plan or permit.',
      ]}
    />
  );
}
