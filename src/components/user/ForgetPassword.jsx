import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { postData } from '../service/apiManager';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await postData("/users/password",{
        user: {
        email: email,
      }}
    )
    console.log(response); // url /users/password endpoint in Devise, it triggers a password reset process. This process typically involves sending an email to the user with a reset password link. The server doesn't usually respond with a message in the HTTP response body (make sure you have configure Mailer)
    toast.success('If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.');
    } catch (error) {
      setError('Une erreur s\'est produite');
      toast.error('Échec de la connexion.');
    }
      
  };

  return (
    <ThemeProvider theme={theme}>
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Mot de passe oublié
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Envoyer l&apos;email de réinitialisation
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2">
                  Retour à la page d&apos;accueil
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signin" variant="body2">
                  {"Vous avez déjà un compte ? Sign In"}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Pas de compte ? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}