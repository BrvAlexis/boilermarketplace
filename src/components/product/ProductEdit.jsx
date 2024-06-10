import { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, Typography, Container, Box, Grid } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useAtom } from 'jotai';
import { userAtom } from '../atom/atom.js';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getData, signUpdateData } from '../service/apiManager';


export default function EditRealEstateAd() {
  const [user] = useAtom(userAtom);
  //dynamic route
  const { productId } = useParams();
  
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]); // Pour stocker les images existantes

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        if (user.isLoggedIn && user.id && productId !== 'undefined') {
          const productData = await getData(`/users/${user.id}/products/${productId}`);
          setProduct(productData);
          setTitle(productData.title);
          setDescription(productData.description);
          setPrice(productData.price);
          setExistingImages(productData.images);
        } else {
          toast.error('Vous devez être connecté et avoir un ID de produit valide pour modifier une annonce.');
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données du produit :', error);
        toast.error('Échec du chargement des données de l\'annonce.');
      }
    };
  
    if (user.isLoggedIn && user.id) {
      fetchProductData();
    }
  }, [user, productId]);

  const handleImageChange = (event) => {
    if (event.target.files.length > 2) {
      toast.error('Vous ne pouvez télécharger que deux images.');
      return;
    }
    setImages([...event.target.files]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const productData = {
      title: title,
      description: description,
      price: price
    };
  
    try {
      // Utilisation de la fonction signUpdateData pour envoyer la requête PATCH
      await signUpdateData(`/users/${user.id}/products/${productId}`, { product: productData });
      
      toast.success('Annonce mise à jour avec succès.');
      navigate(`/profile/${user.id}`); // Redirection vers la page de profil de l'utilisateur
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'annonce :', error);
      toast.error('Échec de la mise à jour de l\'annonce.');
    }
  };

    

  return (
    <Container component="main" maxWidth="sm">
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
          <AddPhotoAlternateIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Modifier une annonce immobilière
          </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Titre de l'annonce"
            name="title"
            autoComplete="title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description du bien"
            id="description"
            autoComplete="description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="price"
            label="Prix"
            type="number"
            id="price"
            autoComplete="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span" fullWidth sx={{ mt: 2 }}>
              Rajouter des images
            </Button>
          </label>
          {existingImages && existingImages.length > 0 ? (
                    existingImages.map((image, index) => (
                      <Grid item xs={4} key={index}>
                        <img src={image.url} alt={`image-${index}`} style={{ width: '100%' }} />
                      </Grid>
                    ))
                  ) : (
                    <p>Chargement des images...</p>
                  )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Modifier l'annonce
          </Button>
        </Box>
      </Box>
    </Container>
  );
}