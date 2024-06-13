import React,{useEffect, useState} from 'react'
import MetricsProduct from './metricsProduct';
import WeeklyCreationsChart from './weeklyCreationsChart.jsx'
import PriceChart from './PriceChart.jsx'

import { getData } from "../service/apiManager.js";

import { Grid, Card, CardContent, Typography, Container } from '@mui/material';

function dashboard() {
  const[user, setUser] = useState([]);
  const[product,setProduct] = useState([]);

  useEffect(() => {
    const productData = async () => {
      try {
        const data = await getData(`/products`);
        console.log(data);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };
    // For the moment i dont use it
    const profileData = async() => {
      try{
        const data = await getData(`/users`);
        console.log("user: ", data)
        setUser(data);

      }catch(error){
        console.error(error);
      }
    };
    productData();
  }, [])
  
const sortByDate = (a, b) => {
    return new Date(a.created_at) - new Date(b.created_at);
};

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Métriques globales
      </Typography>
      <Grid container spacing={2}>
        <MetricsProduct data={product} />
      </Grid>
      <Typography variant="h3" gutterBottom>
        Créations d'annonces semaine par semaine
      </Typography>
      <Card>
        <CardContent>
          <WeeklyCreationsChart data={product.sort(sortByDate)} />
        </CardContent>
      </Card>
      <Typography variant="h3" gutterBottom>
        Graphique des prix des annonces
      </Typography>
      <Card>
        <CardContent>
          <PriceChart data={product} />
        </CardContent>
      </Card>
    </Container>
  )
}

export default dashboard
