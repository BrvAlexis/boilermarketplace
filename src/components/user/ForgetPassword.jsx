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

const theme = createTheme();

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Ici, vous pouvez intégrer la logique pour envoyer l'email de réinitialisation
    console.log('Réinitialisation du mot de passe demandée pour :', email);
    // Exemple d'envoi d'email (à remplacer par votre API ou service d'email)
    // await sendPasswordResetEmail(email);
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
              Envoyer l'email de réinitialisation
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Retour à la page d'accueil
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Vous avez déjà un compte ? Sign In"}
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
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