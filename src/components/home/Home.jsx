import { useState } from "react"
import Hero from "./Hero"
import MultiCard from "./MultiCard"
import { Button, Box, Container } from "@mui/material"
import MapIndex from "./MapIndex"
import SearchBar from "./SearchBar.jsx";
import "./home.css"
import { useEffect } from "react"
export default function Home() {
  const [mapIsOpenned, setMapIsOpenned] = useState(false)
  useEffect(
    ()=>{console.log(mapIsOpenned)},[mapIsOpenned])
  return(
    <div className="main_home">
      <div>
        <Hero />
        <br />
        <Container sx={{ marginBottom: '20px' }}>
          <SearchBar/>
        </Container>
      </div>
      <div>
        {
          mapIsOpenned? <MapIndex/> : <MultiCard />
        }
      </div>
        <Button onClick={() => setMapIsOpenned(!mapIsOpenned)} variant="contained" color="secondary" 
        sx={{ 
          position: 'fixed', 
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)", // This will shift the button leftwards by half of its width
        }}>{!mapIsOpenned ? "Afficher la carte" : "Afficher la liste"}</Button>
      
    </div>
  )
}