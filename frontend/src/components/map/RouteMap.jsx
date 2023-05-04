import React, { useEffect, useState } from 'react'
import './routemap.css';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import RoutingMachine from '../routingmachine/RoutingMachine';


const waypoints = [
  {lat:48.99, lng:11},
  {lat:49, lng:11},
  {lat:49.01, lng:11},
]

// the image is not loaded correctly, the folloing lines will fix this problem
// ref: https://github.com/PaulLeCam/react-leaflet/issues/453#issuecomment-541142178https://
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default function RouteMap({center, setCenter, zoom}) {
  const [markPos, setMarkPos] = useState(null);
  const MarkTheClick = () => {
    const map = useMapEvents({
      click(e){
        //setCenter(e.latlng);
        setMarkPos(e.latlng);
        
      },
    });
    return markPos === null? null: (
      <Marker position={markPos}>
        <Popup>It is clicked</Popup>
      </Marker>
    )
  }

  // Update the center
  useEffect(()=>{
    if(markPos !== null)
      setCenter(markPos)
  }, [markPos])

  // MapContainer props are immutable, so we need to add a children
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  return (
    <div className='map'>
      <MapContainer className="mapContainer" center={center} zoom={zoom}>
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a 
                href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <RoutingMachine waypoints={waypoints}/>
      </MapContainer>
    </div>
  )
}
