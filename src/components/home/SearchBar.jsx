import { Grid, styled, Switch, TextField, InputAdornment, Box, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, Button, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchAtom } from '../atom/atom';


function SearchBar() {
  const [city,setCity] = useState("")
  const [typeOfGood,setTypeOfGood] = useState("")
  const [searchArgument, setSearchArgument] = useAtom(searchAtom)
  const [priceMin,setPriceMin] = useState("")
  const [priceMax,setPriceMax] = useState("")
  const [areaMin,setAreaMin] = useState("")
  const [areaMax,setAreaMax] = useState("")
  const [numberOfRoom,setNumberOfRoom] = useState("")
  const [parking,setParking] = useState(false)

  const handlesubmit = (event) => {
    event.preventDefault();

    // Check if value are empty
    if (!city.trim() && !typeOfGood && !priceMin && !priceMax && !areaMin && !areaMax && !numberOfRoom && !parking) {
      toast.error('You need to put at least one element to filter');
      return;
    }
    console.log(city);
    console.log(parking);
    console.log(numberOfRoom);
    //here you must be careful of the name of each attribut, they should have same name with server database (cf schema)
    setSearchArgument(
      {"property_type":typeOfGood,
        "priceMax":priceMax,
        "priceMin":priceMin,
        "areaMax":areaMax,
        "areaMin":areaMin,
        "number_of_rooms":numberOfRoom, //be carefull if value = 5, should show all goods that have at least 5 rooms and plus
        "parking":parking,
        "city":city,
      }
    )
  }

  //toggle switch
  const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

  return (
    <Box component="form" onSubmit={handlesubmit}>
      <Typography variant="p" component="div">
        Filtre
      </Typography>
      <FormControl>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
          <Box sx={{marginRight: 5}}>
            <Box sx={{marginRight: 2}}>
              <FormLabel>Recherche par ville</FormLabel>
              <br />
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
                sx={{ width: '300px' }}
              />
            </Box>          
            <Box>
              <FormLabel>Nombre de piece</FormLabel>
              <br />
              <ToggleButtonGroup
                value={numberOfRoom}
                color="primary"
                exclusive
                onChange={(e, newNumberOfRoom) => setNumberOfRoom(newNumberOfRoom)}
                aria-label="number of room"
              >
              <ToggleButton value={1} aria-label="one room" sx={{ borderRadius: '50%'}}>
                1
              </ToggleButton>
              <ToggleButton value={2} aria-label="two rooms" sx={{ borderRadius: '50%'}}>
                2
              </ToggleButton>
              <ToggleButton value={3} aria-label="three rooms" sx={{ borderRadius: '50%'}}>
                3
              </ToggleButton>
              <ToggleButton value={4} aria-label="four rooms" sx={{ borderRadius: '50%' }}>
                4
              </ToggleButton>
              <ToggleButton value={5} aria-label="five rooms" sx={{ borderRadius: '50%' }}>
                5+
              </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>

          <Box sx={{marginRight: 5}}>
            <FormLabel>Type de logement</FormLabel>
            <RadioGroup
              name="type-of-good"
              value={typeOfGood}
              onChange={(e)=>setTypeOfGood(e.target.value)}
            >
              <FormControlLabel value="maison" control={<Radio />} label="Maison" sx={{ mb: -2 }} />
              <FormControlLabel value="appartement" control={<Radio />} label="Appartement" />
              <Button
                variant="outlined"
                onClick={()=>setTypeOfGood('')}
              >
                Clear
              </Button>
            </RadioGroup>
          </Box>

          <Box sx={{marginRight: 5}}>
            <FormLabel>Prix €</FormLabel>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  placeholder="Min"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  placeholder="Max"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', alignItems:"center", gap: 2 }}>
              <Box sx={{marginRight: 2}}>
                <FormLabel>Surface m²</FormLabel>
                <br />
                <TextField
                  variant="outlined"
                  placeholder="Min"
                  value={areaMin}
                  onChange={(e) => setAreaMin(e.target.value)}
                  sx={{ width: '70px' }}
                />
                <TextField
                  variant="outlined"
                  placeholder="Max"
                  value={areaMax}
                  onChange={(e) => setAreaMax(e.target.value)}
                  sx={{ width: '70px' }}
                />
              </Box>
              <Box>
                <FormControlLabel
                  control={
                    <IOSSwitch 
                      checked={parking} 
                      onChange={(event) => setParking(event.target.checked)} 
                      sx={{ m: 1 }} 
                    />
                  }
                  label="parking"
                />
              </Box>
            </Box>
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