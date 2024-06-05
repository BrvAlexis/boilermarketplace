import React from 'react';
import { Grid } from '@mui/material';
import Card from '../components/Card.jsx';

const CardGrid = () => {
  // Supposons que vous ayez un tableau d'objets représentant vos données de carte
  const cardData = [
    // ... vos données de carte
  ];

  return (
    <Grid container spacing={4}>
      {cardData.map((data, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Card {...data} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGrid;