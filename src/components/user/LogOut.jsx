import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../atom/atom';
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';

function LogoutButton() {
  const [, setUser] = useAtom(userAtom);

  const handleLogout = () => {
    setUser({
      id: '',
      isLoggedIn: false,
      token: '',
    });

    Cookies.remove('token');
    Cookies.remove('id');

  };

  return (
    <Button color="inherit"  onClick={handleLogout}>Déconnexion</Button>
  );
}

export default LogoutButton;