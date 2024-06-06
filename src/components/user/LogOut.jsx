import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../atom/atom';
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import {decoData} from '../service/apiManager'

function LogoutButton() {
  const [user, setUser] = useAtom(userAtom);

  const handleLogout = () => {
    decoData("/users/sign_out");
    setUser({
      email: "",
      id: "",
      isLoggedIn: false,
    });
  };

  return (
    <Button color="inherit"  onClick={handleLogout}>Déconnexion</Button>
  );
}

export default LogoutButton;