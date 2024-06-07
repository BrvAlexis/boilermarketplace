import * as React from 'react';
import LogOut from '../user/LogOut';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../atom/atom';

export default function ButtonAppBar() {
  const [user] = useAtom(userAtom);
  console.log(user)
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component={RouterLink} to='/' sx={{ flexGrow: 1 }}>
            BoilerFront
          </Typography>
          <Button color="inherit" component={RouterLink} to="/signin">
            Connexion
          </Button>
          <Button color="inherit" component={RouterLink} to="/signup">
            Inscription
          </Button>
          <div><LogOut /></div> 
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}