import { useEffect, useRef } from "react";
//These 2 lines are neccesary to use leaflet map if you don't want ot use CDN stylsheet and script
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'

export default function Map() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  function onMapClick(e) {
    L.popup()
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(mapInstanceRef.current);
  }
  
  useEffect(() => {
    if (mapRef.current && !mapRef.current._leaflet_id) {
      mapInstanceRef.current = L.map(mapRef.current).setView([51.505, -0.09], 13);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);
  
      mapInstanceRef.current.on('click', onMapClick);
    }
  }, []);

  // Keep track of the last marker
  // let lastMarker;
  // let lastMarkers=[];

  // const updateMap = (long, lat) => {
  //   // Remove the previous marker, if there is one
  //   if (lastMarker) {
  //     mapInstance.current.removeLayer(lastMarker);
  //   }
  
  //   // Create a new marker and add it to the map
  //   lastMarker = L.marker([lat, long]).addTo(mapInstance.current);
  
  //   // Update the map view to center on the new marker
  //   mapInstance.current.setView([lat, long], 13);
  // };

  return(
    <div ref={mapRef} style={{height:"300px"}}>
      <h2>Position of the good</h2>
    </div>
  )
}