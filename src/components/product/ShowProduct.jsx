import { useEffect, useState } from "react";
import { getData } from "../service/apiManager.js";
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { BrowserRouter as Router, Route, Link, useParams } from "react-router-dom";
<<<<<<< HEAD
import { useAtom } from 'jotai';
import { userAtom } from '../atom/atom.js';
=======
import Map from "./Map.jsx";

>>>>>>> master
//passer en props le product id, puis après recheck le link
function ShowProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [user] = useAtom(userAtom);

  // Supposons que vous ayez un tableau d'objets représentant vos données de carte
  useEffect(() => {
    const productData = async () => {
      try {
        const data = await getData(`/products/${productId}`);
        console.log(data);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };
    productData();
  }, [productId]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {product.price}€
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {product.description}
          </Typography>
          {user.isLoggedIn ? 
            <Typography variant="body1" color="text.secondary">
            {product.user?.email ? product.user.email : "Pas d'email"}
            </Typography>
          : ""}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {user.isLoggedIn ?           
          <Button variant="contained" color="primary" component={Link} to={`/profile/${product.user_id}`}>
            Voir le profil / Contactez le propriétaire
          </Button>
          :
          <Button variant="contained" color="primary" component={Link} to={`/profile/${product.user_id}`}disabled>
            Voir le profil / Contactez le propriétaire
          </Button>
          }
          <Button variant="outlined" color="secondary" component={Link} to={"/"}>
            Retour à la liste des produits
          </Button>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Map adress={"14 Rue de l'Ange Gardien, 17000 La Rochelle"}/>
        </Box>
      </Paper>

    </Container>
  );
}

export default ShowProduct;
