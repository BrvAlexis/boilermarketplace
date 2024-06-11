import Hero from "./Hero"
import MultiCard from "./MultiCard"
import { Button, Box } from "@mui/material"

export default function Home() {
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
        <MultiCard />
      </div>
      
        <Button variant="contained" color="secondary" 
        sx={{ 
          position: 'sticky', 
          bottom: "10px",
        }}>Afficher la carte</Button>
      
    </Box>
  )
}