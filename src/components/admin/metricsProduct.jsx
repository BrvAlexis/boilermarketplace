import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const MetricsProduct = ({ data }) => {
    const [totalProduct, setTotalProduct] = useState(0);
    const [totalProductOwners, setTotalProductOwners] = useState(0);
    const [avgProductPerOwner, setAvgProductPerOwner] = useState(0);
    const [avgPrice, setAvgPrice] = useState(0);

    useEffect(() => {
        if (data) {
            const totalProduct = data.length;
            const totalProductOwners = [...new Set(data.map(product => product.user_id))];
            const totalOwners = totalProductOwners.length;
            const avgProductPerOwner = totalProduct / totalOwners;
            const avgPrice = data.reduce((sum, ad) => sum + parseFloat(ad.price), 0) / totalProduct;

            setTotalProduct(totalProduct);
            setTotalProductOwners(totalOwners);
            setAvgProductPerOwner(avgProductPerOwner.toFixed(2));
            setAvgPrice(avgPrice.toFixed(2));
        }
    }, [data]);

    return (
<>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Nombre total d'annonces</Typography>
            <Typography variant="h4">{totalProduct}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Nombre total de propriétaires</Typography>
            <Typography variant="h4">{totalProductOwners}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Nombre d'annonces moyen par propriétaire</Typography>
            <Typography variant="h4">{avgProductPerOwner}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Prix moyen d'une annonce</Typography>
            <Typography variant="h4">{avgPrice}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
    );
};

export default MetricsProduct;
