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
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1 }}
          >
            BoilerFront
          </Typography>
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
                  to="/profile"
                >
                  Profil
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={RouterLink}
                  to="/productnewedit"
                >
                  Créer une annonce
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={RouterLink}
                  to="/edit-ad"
                >
                  Modifier une annonce
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
