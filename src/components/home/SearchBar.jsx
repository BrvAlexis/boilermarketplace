import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

function SearchBar() {
  const [city,setCity] = useState("")

  const handlesubmit = () => {
    event.preventDefault();
    console.log(city);
  }

  return (
    <Box component="form" onSubmit={handlesubmit}>
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


  );
}

export default SearchBar;