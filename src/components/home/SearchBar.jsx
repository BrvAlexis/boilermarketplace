import { TextField, InputAdornment, Box, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchAtom } from '../atom/atom';


function SearchBar() {
  const [city,setCity] = useState("")
  const [typeOfGood,setTypeOfGood] = useState("")
  const [searchArgument, setSearchArgument] = useAtom(searchAtom)
  const [price,setPrice] = useState("")
  const [area,setArea] = useState("")
  const [numberOfRoom,setNumberOfRoom] = useState("")
  const [parking,setParking] = useState("")

  const handlesubmit = (event) => {
    event.preventDefault();
    console.log(city);
    //here you must be careful of the name of each attribut, they should have same name with server database (cf schema)
    setSearchArgument(
      {"property_type":typeOfGood,
        "price":price,
        "area":area,
        "number_of_rooms":numberOfRoom,
        "parking":parking,
        "city":city,
      }
    )
  }

  return (
    <Box component="form" onSubmit={handlesubmit}>
      <FormControl>
        <Box sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
          <Box sx={{marginRight: 2}}>
            <TextField
              variant="outlined"
              placeholder="Search city"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setCity(e.target.value)}
            />
          </Box>
          <Box sx={{marginRight: 2}}>
            <FormLabel>Type de logement</FormLabel>
            <RadioGroup
              name="type-of-good"
              value={typeOfGood}
              onChange={(e)=>setTypeOfGood(e.target.value)}
            >
              <FormControlLabel value="maison" control={<Radio />} label="Maison" sx={{ mb: -2 }} />
              <FormControlLabel value="appartement" control={<Radio />} label="Appartement" />
            </RadioGroup>
          </Box>
          <Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </FormControl>
    </Box>


  );
}

export default SearchBar;