import { useEffect, useState } from 'react'
import L, { marker } from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { Marker, useMap } from 'react-leaflet';
import { routingPin } from '../CustomIcon';

// Use routing machine to draw the routing
function RoutingMachine({waypoints}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    if (!waypoints) return;
    const routingControl = new L.Routing.control({
      waypoints: waypoints,
      plan: L.Routing.plan(waypoints, {
        createMarker: function(i, wp, n) {
          /*
          if (i == 0 || i == n - 1) {
            return L.marker(wp.latLng, {
              draggable: false // prevent users from changing waypoint position
            });
          } else {
            return false;
          }
          */
         return false;
        }
      }),
      addWaypoints: false, // prevent users from adding new waypoints
      show: false,
      
  }).addTo(map);
    
    return () => map.removeControl(routingControl);
  }, [waypoints]);

  return null;
}

// use marker to display the routing
function RoutingWithMarker({waypoints}){
  /*
  const map = useMap();
  const [markers, setMarkers] = useState([]);
  useEffect(()=>{
    if(!map) return;
    
    setMarkers(waypoints.map((element)=>{
      const mark =  new L.Marker(element, {draggable:false}).addTo(map);
      return mark;
    }))

    return () => markers.forEach((element)=>{
      map.removeLayer(element)
    });
  }, [waypoints])
  */
  if(waypoints.length == 0) return null;

  return waypoints.map((elemment)=>(
        <Marker position={elemment} icon={routingPin}/>
      ))
}

export {RoutingMachine, RoutingWithMarker}