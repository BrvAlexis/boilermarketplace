import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../atom/atom';
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {decoData} from '../service/apiManager'

function LogoutButton() {
  const [user, setUser] = useAtom(userAtom);

  const handleLogout = () => {
    try {
     decoData("/users/sign_out");
      setUser({
        email: "",
        id: "",
        isLoggedIn: false,
      });
    toast.success('Déconnexion réussie !');
  } catch (error) {
    toast.error('Échec de la déconnexion.');
  }
};

  return (
    <Button color="inherit"  onClick={handleLogout}>Déconnexion</Button>
  );
}

export default LogoutButton;