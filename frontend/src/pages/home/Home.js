
import RouteMap from "../../components/map/RouteMap";
import SearchForm from "../../components/searchform/SearchForm";
import Topbar from "../../components/topbar/Topbar";
import React, { useState } from "react";
import "./home.css"

export default function Home() {
  // This state is used to the center attribute of MapContainer component
  const [mapCenter, setMapCenter] = useState({lat:49, lng:11});
  // This state is used to the zoom attribute of MapContainer component
  const [mapZoom, setMapZoom] = useState(4);

  return (
    
    <>
      <Topbar/>
      <div className="homeContainer">
        <RouteMap center={mapCenter} setCenter={setMapCenter} zoom={mapZoom}/>
        <SearchForm />
      </div>
    </>
    
  )
}
