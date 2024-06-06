import {useEffect, useState} from 'react';
import { Grid } from '@mui/material';
import Card from '../Card.jsx';
import { getData } from '../service/apiManager.js';

const CardGrid = () => {
  const [products,setProducts] = useState([]);
  // Supposons que vous ayez un tableau d'objets représentant vos données de carte
  useEffect(()=> {
  const cardData = async() => {
    try{
      const data = await getData("/products");
      console.log(data)
      setProducts(data);

    }catch(error){
      console.error(error);
    }
  };
  cardData();
},[])
    // ... vos données de carte


  return (
    <Grid container spacing={4}>
      {products.map((data, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Card {...data} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGrid;