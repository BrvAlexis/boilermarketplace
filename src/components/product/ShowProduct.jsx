import { useEffect, useState } from "react";
import { getData } from "../service/apiManager.js";
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { BrowserRouter as Router, Route, Link, useParams } from "react-router-dom";
import { useAtom } from 'jotai';
import { userAtom } from '../atom/atom.js';
import Map from "./Map.jsx";

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
          <Typography variant="body2" color="text.secondary">
          Type de bien: {product.property_type}
        </Typography>
          
          <Typography variant="body2" color="text.secondary">
            Ville: {product.city}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Superficie: {product.area} m²
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Nombre de pièces: {product.number_of_rooms}
          </Typography>
          {product.old && <Typography variant="body2" color="text.secondary">Ancien</Typography>}
          {product.new && <Typography variant="body2" color="text.secondary">Neuf</Typography>}
          {product.construction_project && <Typography variant="body2" color="text.secondary">Projet de construction</Typography>}
          {product.pool && <Typography variant="body2" color="text.secondary">Piscine</Typography>}
          {product.balcony && <Typography variant="body2" color="text.secondary">Balcon</Typography>}
          {product.parking && <Typography variant="body2" color="text.secondary">Parking</Typography>}
          {product.garage && <Typography variant="body2" color="text.secondary">Garage</Typography>}
          {product.cellar && <Typography variant="body2" color="text.secondary">Cave</Typography>}
          <Typography variant="body2" color="text.secondary">
            Nombre d'étages: {product.number_of_floors}
          </Typography>
          {product.elevator && <Typography variant="body2" color="text.secondary">Ascenseur</Typography>}
          {product.disabled_access && <Typography variant="body2" color="text.secondary">Accès handicapé</Typography>}
          <Typography variant="body2" color="text.secondary">
            Diagnostic de performance énergétique: {product.energy_performance_diagnostic}
          </Typography>
          {product.furnished && <Typography variant="body2" color="text.secondary">Meublé</Typography>}
          {product.terrace && <Typography variant="body2" color="text.secondary">Terrasse</Typography>}
          {product.garden && <Typography variant="body2" color="text.secondary">Jardin</Typography>}
          {product.basement && <Typography variant="body2" color="text.secondary">Sous-sol</Typography>}
          {product.caretaker && <Typography variant="body2" color="text.secondary">Gardien</Typography>}
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
