import { useState, useEffect } from 'react';
import { TextField, Button, Container, CssBaseline, Avatar, Typography, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { editUserData } from '../service/apiManager'; 
import { useAtom } from 'jotai';
import { userAtom } from '../atom/atom';
import Cookies from 'js-cookie';

export default function EditUserForm({ userId }) { 
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Charger les données existantes de l'utilisateur ici
    // Exemple : setName(user.name), setEmail(user.email)
  }, [user]);

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = Cookies.get('userId');
    const userData = {
      
      email: email,
      password: password
      
    };

    try {
        const response = await editUserData(`/users/${userId}`, userData);
        toast.success('Profil mis à jour avec succès !', {
          onClose: () => navigate('/')
        });
      } catch (error) {
        toast.error('Échec de la mise à jour du profil.');
      }
    };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Modifier le profil
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
         
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresse email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Mettre à jour
          </Button>
        </Box>
      </Box>
    </Container>
  );
}