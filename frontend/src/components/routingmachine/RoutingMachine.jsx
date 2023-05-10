import React from 'react'
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = (props) => {
    
    const instance = L.Routing.control({
        waypoints: props.waypoints,
        plan: L.Routing.plan(props.waypoints, {
          createMarker: function(i, wp, n) {
            if (i == 0 || i == n - 1) {
              return L.marker(wp.latLng, {
                draggable: false // prevent users from changing waypoint position
              });
            } else {
              return false;
            }
          }
        }),
        addWaypoints: false // prevent users from adding new waypoints
    });
  
    return instance;
  };


const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;