import L from 'leaflet';

const myCustomColour = '#583470'

const markerHtmlStyles = `
  background-color: ${myCustomColour};
  width: 1rem;
  height: 1rem;
  display: block;
  left: -0.5rem;
  top: -0.5rem;
  position: relative;
  border-radius: 1rem 1rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`

const routingPin = L.divIcon({
  className: "my-custom-pin",
  iconAnchor: [0, 8],
  labelAnchor: [-2, 0],
  popupAnchor: [0, -12],
  html: `<span style="${markerHtmlStyles}" />`
})

export { routingPin };