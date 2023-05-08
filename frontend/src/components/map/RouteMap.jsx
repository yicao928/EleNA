import React, { useEffect, useState } from 'react'
import './routemap.css';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { bounds } from 'leaflet';
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

export default function RouteMap({startPos, endPos, curPosSet, zoom}) {
  const [center, setCenter] = useState({lat: (startPos.lat+endPos.lat)/2, lng: (startPos.lng+endPos.lng)/2})
  
  //The boundary of map
  const bound = L.latLngBounds(
    L.latLng(42.274, -72.629),
    L.latLng(42.451, -72.393)
  );
  

  // If click event occurs on map, it will update the start or end position.
  const ClickAndUpdate = () => {
    const map = useMapEvents({
      click(e){
        if(curPosSet != null)
          curPosSet(e.latlng);
      },
    });
    return null;
  }

  // Update the center
  useEffect(()=>{
    setCenter({lat: (startPos.lat+endPos.lat)/2, lng: (startPos.lng+endPos.lng)/2})
  }, [startPos, endPos])

  
  // MapContainer props are immutable, so we need to add a children
  function ChangeView({ center, zoom, bounds }) {
    const map = useMap();
    map.setView(center, zoom);
    map.setMaxBounds(bounds);
    return null;
  }

  return (
    <div className='map'>
      <MapContainer className="mapContainer" center={center} zoom={zoom} bounds={bound}>
        <ChangeView center={center} zoom={zoom} bounds={bound}/>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a 
                href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={startPos}>
          <Popup>Start point for select</Popup>
        </Marker>
        <Marker position={endPos}>
          <Popup>End point for select</Popup>
        </Marker>
        <ClickAndUpdate/>
      </MapContainer>
    </div>
  )
}
