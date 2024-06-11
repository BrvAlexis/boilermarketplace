import { useState } from "react"
import Hero from "./Hero"
import MultiCard from "./MultiCard"
import { Button, Box, Container } from "@mui/material"
import Map from "../product/Map"
import SearchBar from "./SearchBar.jsx";

export default function Home() {
  const [mapIsOpenned, setMapIsOpenned] = useState(false)
  return(
    <Box sx={{ 
      display: 'flex', 
      flexDirection: "column",
      justifyContent: 'center', 
      alignItems: 'center',
    }}>
      <div>
        <Hero />
        <br />
        <Container sx={{ marginBottom: '20px' }}>
          <SearchBar/>
        </Container>
        {
          mapIsOpenned ? <Map/> : <MultiCard />
        }
      </div>
      
        <Button onClick={() => setMapIsOpenned(!mapIsOpenned)} variant="contained" color="secondary" 
        sx={{ 
          position: 'sticky', 
          bottom: "10px",
        }}>{!mapIsOpenned ? "Afficher la carte" : "Afficher la liste"}</Button>
      
    </Box>
  )
}