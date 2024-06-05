import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

const HeroSection = () => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Bienvenue sur notre site
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Découvrez nos services et produits innovants. Rejoignez-nous et faites partie de la révolution.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained">Commencer</Button>
          <Button variant="outlined" sx={{ ml: 2 }}>
            En savoir plus
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;