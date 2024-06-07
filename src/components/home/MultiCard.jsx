import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getData } from "../service/apiManager.js";

const CardGrid = () => {
  const [products, setProducts] = useState([]);
  // Supposons que vous ayez un tableau d'objets représentant vos données de carte
  useEffect(() => {
    const cardData = async () => {
      try {
        const data = await getData("/products");
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    cardData();
  }, []);
  // ... vos données de carte

  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea component={Link} to={`/product/${product.id}`}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title} {product.price}€
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                component={Link}
                to={`/product/${product.id}`}
              >
                Voir les détails
              </Button>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGrid;
