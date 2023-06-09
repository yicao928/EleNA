
import RouteMap from "../../components/map/RouteMap";
import SearchForm from "../../components/searchform/SearchForm";
import Topbar from "../../components/topbar/Topbar";
import React, { useEffect, useState } from "react";
import "./home.css"
import SearchBar from "../../components/searchbar/SearchBar";

export default function Home() {
  // This state is used to the center attribute of MapContainer component
  const [mapCenter, setMapCenter] = useState({lat:42.3754, lng:-72.5193});
  // This state is used to the zoom attribute of MapContainer component
  const [mapZoom, setMapZoom] = useState(20);

  const [startPos, setStartPos] = useState({lat:42.3754, lng:-72.5193});
  const [endPos, setEndPos] = useState({lat:42.3754, lng:-72.5193});
  const [curPosSet, setCurPosSet] = useState(()=> setStartPos);
  const [wayPoints, setWayPoints] = useState([]);

  

  return (
    
    <>
      <Topbar/>
      <div className="homeContainer">
        <RouteMap startPos={startPos} endPos={endPos} curPosSet={curPosSet} zoom={mapZoom} wayPoints={wayPoints}/>
        <SearchForm startPos={startPos} setStartPos={setStartPos} endPos={endPos} setEndPos={setEndPos} setCurPosSet={setCurPosSet} setWayPoints={setWayPoints}/>
      </div>
    </>
    /*
    <>
      <Topbar/>
      <div className="homeContainer">
        <RouteMap startPos={startPos} endPos={endPos} curPosSet={curPosSet} zoom={mapZoom} wayPoints={wayPoints}/>
        <SearchBar id="start" position={startPos} setCurPosSet={setCurPosSet} posSetFunc={setStartPos}/>
      </div>
    </>
    */
  )
}
