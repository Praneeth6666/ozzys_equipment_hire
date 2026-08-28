import AreaLayout from './AreaLayout';

export default function Bendigo() {
  return (
    <AreaLayout
      name="Bendigo"
      slug="bendigo"
      lead="We deliver VMS boards, LED trailer signs and LED screen trailers to Bendigo and central Victoria. Trailers come up from Melbourne via the Calder Highway, so a Bendigo hire needs two to three weeks of notice and carries a delivery charge based on the distance."
      localities={[
        ['Central Bendigo', 'CBD, Bendigo East, Kennington, Flora Hill, Golden Square'],
        ['Outer suburbs', 'Kangaroo Flat, Eaglehawk, Strathdale, Epsom, Maiden Gully'],
        ['Surrounding towns', 'Castlemaine, Heathcote, Elmore, Marong, Axedale'],
      ]}
      body={[
        'Bendigo hires are led by infrastructure and civil works. VMS boards go out for Calder Highway upgrades, for the level-crossing and rail works around the city, and for council roadworks across the growth corridors at Marong and Huntly. Events add a seasonal layer: the Easter Festival, the Bendigo Writers Festival and race meetings bring LED trailer signs and screen trailers in for crowd information and sponsor content.',
        'The distance from Melbourne is the main planning constraint. We schedule the delivery leg into the run rather than promising same-day turnaround, and for anything with an early start we deliver the day before. Give us the dates and site address and the quote covers both the hire and the delivery.',
        'Road-occupation and sign approvals in the region sit with the City of Greater Bendigo or the state road authority, and you arrange them. We deliver and position the trailer to your plan.',
      ]}
    />
  );
}
