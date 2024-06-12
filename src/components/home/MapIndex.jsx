import { useEffect, useRef, useState } from "react";
import { Container, Card, CardContent,Typography,  Button, CardActionArea, CardActions, Box } from "@mui/material";

import { Link } from "react-router-dom";
//These 2 lines are neccesary to use leaflet map if you don't want ot use CDN stylsheet and script
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'

import { useAtom } from "jotai";
import { productsAtom } from "../atom/atom.js";

export default function MapIndex() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [latitude, setLatitude] = useState(48.8566);
  const [longitude, setLongitude] = useState(2.3522);
  const [productsToAtom,setProductsToAtom] = useAtom(productsAtom);
  
  const getLatLon = async (product) => {
    console.log(product.city);
    const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${product.city}&key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log(data);
      if (data.results[0]) {
        const location = data.results[0].geometry.location;
        console.log(location.lat);
        console.log(location.lng);
        
        updateMap(location.lng, location.lat, product);
      } else {
        console.error('No results found');
      }
    } catch (error) {
      console.error('Fetch failed', error);
    }
  };

   // Keep track of the last marker
  let lastMarker;
  let lastMarkers=[];
  const updateMap = (long, lat, product) => {
    // Create new markers and add it to the map
    lastMarker = L.marker([lat, long])
    .addTo(mapInstanceRef.current)
    .bindPopup(
      `
        <div style="word-wrap: break-word;">
          <h2>${product.title} ${product.price}€</h2>
          <p >${product.description}</p>
          <a href="/product/${product.id}">Voir les détails</a>
        </div>
      `
    );

    lastMarkers.push(lastMarker)
    // Update the map view to center on the new marker
    mapInstanceRef.current.setView([lat, long], 10);
  };

  const mountMap = () => {
    if (mapRef.current && !mapRef.current._leaflet_id && latitude && longitude) {
      mapInstanceRef.current = L.map(mapRef.current).setView([latitude, longitude], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);
    }
  }
  useEffect(() => {
    mountMap();
    
    console.log(productsToAtom);
    productsToAtom.map(product => {
      (async () => {
        await getLatLon(product);
      })();
    })
    
  }, []);

  return(
    <Container component="main" maxWidth={false}>
      <Box>
        <div ref={mapRef} style={{height:"70vh", width:"90vw"}}></div>
      </Box>
    </Container>
  )
}