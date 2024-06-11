import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../atom/atom';
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {decoData} from '../service/apiManager'
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();
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
    navigate('/'); // Redirect to home page 
  } catch (error) {
    toast.error('Échec de la déconnexion.');
  }
};

  return (
    <Button color="inherit"  onClick={handleLogout}>Déconnexion</Button>
  );
}

export default LogoutButton;