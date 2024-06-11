import Link from '@mui/material/Link';
import { Box, TextField, Typography, Paper, Grid, Button, IconButton  } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAtom } from 'jotai';
import { userAtom } from '../atom/atom';
import { useState, useEffect } from 'react';
import { signUpdateData, getData } from '../service/apiManager';

export default function EditProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation,setNewPasswordConfirmation] = useState('')
  const [error, setError] = useState('');
  const [profile,setProfile] = useState("")

  useEffect(()=> {
    const profileData = async() => {
      try{
        const data = await getData(`/users/${user.id}`);
        console.log("user: ", data)
        setProfile(data)

        //set all user data here in order to see them at the opening of the page
        setEmail(data.email)
      }catch(error){
        console.error(error);
      }
    };
    profileData();
  },[user])

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Effectuer la requête fetch vers le backend Rails pour modifier le profil

    if (password === "" ){
      toast.error('password must not be empty');
      return
    }

    try {
      const response = await signUpdateData(`/users`,{
        user: {
        email: email,
        password: newPassword,
        password_confirmation: newPasswordConfirmation,
        current_password: password,
      }}
    )
    console.log(response);
    setUser({
      email: response.user.email,
      id:response.user.id,
      isLoggedIn: true,
    })
    toast.success('Modifications sauvegardées !');
    navigate(`/profile/${user.id}`); // Redirige vers la page d'accueil
    } catch (error) {
      setError('Une erreur s\'est produite');
      toast.error('Échec de sauvegarde.');
      
    }
  };



  return (
    
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <IconButton onClick={() => navigate(`/profile/${user.id}`)}>
        <ArrowBack />
      </IconButton>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1">
          Profile
        </Typography>
      </Grid>
      <Box elevation={3} style={{ padding: '20px', margin: '20px' }} component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="newPassword"
              label="new password if you want to change only (it is not mandatory)"
              type="newPassword"
              id="newPassword"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="newPasswordConfirmation"
              label="new password confirmation if you want to change only (it is not mandatory)"
              type="newPasswordConfirmation"
              id="newPasswordConfirmation"
              autoComplete="new-password-confirmatin"
              value={newPasswordConfirmation}
              onChange={(e) => setNewPasswordConfirmation(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  </Paper>
    
  );
}