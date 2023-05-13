import React, { useEffect } from 'react'
import L from "leaflet";
import "leaflet-routing-machine";
import { useMap } from 'react-leaflet';


export default function Routing({waypoints}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
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
      show: false
  }).addTo(map);
    
    return () => map.removeControl(routingControl);
  }, [waypoints]);

  return null;
}