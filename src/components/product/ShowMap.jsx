import Map from "./Map"
export default function ShowMap({adress}) {
  return(
    <Box>
      <Box sx={{ mb: 3 }}>
        <h2>Position of the good</h2>
        <Button variant="outlined" color="primary" onClick={handleItineraire}>Itinéraire</Button>
      </Box>
      <Box sx={{ mb: 3 }}>
        <Map adress={adress}/>
      </Box>
    </Box>
  )
}