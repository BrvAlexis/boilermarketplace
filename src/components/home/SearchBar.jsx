import { TextField, InputAdornment, Box, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

function SearchBar() {
  const [city,setCity] = useState("")
  const [typeOfGood,setTypeOfGood] = useState("")

  const handlesubmit = (event) => {
    event.preventDefault();
    console.log(city);
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
          <Box >
            <FormLabel>Type de logement</FormLabel>
            <RadioGroup
              name="type-of-good"
              value={typeOfGood}
              onChange={(e)=>setTypeOfGood(e.target.value)}
            >
              <FormControlLabel value="Maison" control={<Radio />} label="Maison" sx={{ mb: -2 }} />
              <FormControlLabel value="Appartement" control={<Radio />} label="Appartement" />
            </RadioGroup>
          </Box>
          
        </Box>
      </FormControl>
    </Box>


  );
}

export default SearchBar;