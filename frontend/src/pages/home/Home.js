
import RouteMap from "../../components/map/RouteMap";
import SearchForm from "../../components/searchform/SearchForm";
import Topbar from "../../components/topbar/Topbar";
import React, { useState } from "react";
import "./home.css"

export default function Home() {
  // This state is used to the center attribute of MapContainer component
  const [mapCenter, setMapCenter] = useState({lat:42.3754, lng:-72.5193});
  // This state is used to the zoom attribute of MapContainer component
  const [mapZoom, setMapZoom] = useState(20);

  const [startPos, setStartPos] = useState({lat:42.3754, lng:-72.5193});
  const [endPos, setEndPos] = useState({lat:42.3754, lng:-72.5193});
  const [curPosSet, setCurPosSet] = useState(()=> setStartPos);

  return (
    
    <>
      <Topbar/>
      <div className="homeContainer">
        <RouteMap startPos={startPos} endPos={endPos} curPosSet={curPosSet} zoom={mapZoom}/>
        <SearchForm center={mapCenter} setCenter={setMapCenter}/>
      </div>
    </>
    
  )
}
