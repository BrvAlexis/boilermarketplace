import { useState } from "react";
import LogOut from "../user/LogOut";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link as RouterLink } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../atom/atom";
import logo from '../../assets/images/logoimmothp.png';

export default function ButtonAppBar() {
  const [user] = useAtom(userAtom);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <RouterLink to="/" sx={{ flexGrow: 1 }}>
        <img src={logo} alt="Logo" style={{ marginRight: '20px', height: '50px' }} />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
  
          {user.isLoggedIn ? (
            <>
              <Button color="inherit" onClick={handleMenu}>
                Mon Compte
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={handleClose}
                  component={RouterLink}
                  to={`/profile/${user.id}`}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={RouterLink}
                  to="/productnew"
                >
                  Créer une annonce
                </MenuItem>
              
                <MenuItem onClick={handleClose}>
                  <LogOut />
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/signin">
                Connexion
              </Button>
              <Button color="inherit" component={RouterLink} to="/signup">
                Inscription
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
