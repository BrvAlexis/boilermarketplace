import React from 'react';
import "./hero.css"
import { Typography } from '@mui/material';

const HeroSection = () => {
  return (
      <div className='hero'>
        <div className='text-hero'>
          <Typography
            component="h1"
            variant="h2"
            gutterBottom
            fontWeight="bold"
          >
            Bienvenue sur notre site
          </Typography>
          <Typography variant="h5" paragraph >
            Découvrez nos immobiliers frais et certifiés.
          </Typography>
        </div>
      </div>
  );
};

export default HeroSection;