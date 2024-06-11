import Hero from "./Hero"
import MultiCard from "./MultiCard"
import { Button, Box } from "@mui/material"

export default function Home() {
  return(
    <>
      <Hero />
      <br />
      <MultiCard />
      <div className="showMapButton">
        <Button>Afficher la carte</Button>
      </div>
      
    </>
  )
}