import { useEffect, useRef, useState } from "react";
import { Button, Box } from '@mui/material';
//These 2 lines are neccesary to use leaflet map if you don't want ot use CDN stylsheet and script
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'

export default function Map({adress}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [latitude, setLatitude] = useState(48.8566)
  const [longitude, setLongitude] = useState(2.3522)
  //use this functoin if need a pop up on click
  // function onMapClick(e) {
  //   L.popup()
  //     .setLatLng(e.latlng)
  //     .setContent("You clicked the map at " + e.latlng.toString())
  //     .openOn(mapInstanceRef.current);
  // }
  
  const getLatLon = async () => {
    const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${adress}&key=${apiKey}`;
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      // console.log(data);
      if (data.results[0]) {
        const location = data.results[0].geometry.location;
        setLatitude(location.lat);
        setLongitude(location.lng);
        console.log(location.lat);
        console.log(location.lng);
        updateMap(location.lng,location.lat);
      } else {
        console.error('No results found');
      }
    } catch (error) {
      console.error('Fetch failed', error);
    }
  };

   // Keep track of the last marker
  let lastMarker;

  const updateMap = (long, lat) => {
    // Remove the previous marker, if there is one
    if (lastMarker) {
    mapInstanceRef.current.removeLayer(lastMarker);
    }
    // Create a new marker and add it to the map
    lastMarker = L.marker([lat, long]).addTo(mapInstanceRef.current);
    // Update the map view to center on the new marker
    mapInstanceRef.current.setView([lat, long], 13);
    setMarkerPosition(lastMarker)
  };

  useEffect(() => {

    console.log(adress);
    (async () => {
      await getLatLon();
    })();

    if (mapRef.current && !mapRef.current._leaflet_id && latitude && longitude) {

      mapInstanceRef.current = L.map(mapRef.current).setView([latitude, longitude], 13);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);
  
      // mapInstanceRef.current.on('click', function(e) {
      //   // Remove previous marker
      //   if (markerPosition) {
      //     mapInstanceRef.current.removeLayer(markerPosition);
      //   }
  
      //   // Add new marker and save it in state
      //   const newMarker = L.marker(e.latlng).addTo(mapInstanceRef.current);
      //   setMarkerPosition(newMarker);
      // });
      //use this functoin if need a pop up on click
      // mapInstanceRef.current.on('click', onMapClick);
    }
  }, []);

  const handleItineraire = () => {
    if (markerPosition) {
      const { lat, lng } = markerPosition.getLatLng();
      // Open Google Maps with the destination pre-filled
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank'); //note: the user location is not sent from here, google maps does it by itself with the browser when the google maps is open
    }
  };


  return(
    <>
      <Box sx={{ mb: 3 }}>
        <h2>Position of the good</h2>
        <Button variant="outlined" color="primary" onClick={handleItineraire}>Itinéraire</Button>
      </Box>
      <Box sx={{ mb: 3 }}>
        <div ref={mapRef} style={{height:"300px"}}></div>
      </Box>
    </>
  )
}