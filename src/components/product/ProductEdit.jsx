import { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, Typography, Container, Box, Grid } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
//import { updateData } from '../service/apiManager'; // Assurez-vous d'avoir une fonction pour mettre à jour les données
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EditRealEstateAd({ adId }) { // adId est l'identifiant de l'annonce à modifier
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]); // Pour stocker les images existantes

  useEffect(() => {
    // Ici, vous pouvez charger les données existantes de l'annonce à partir de votre API
    // et les définir dans les états appropriés (setTitle, setDescription, setPrice, setExistingImages)
  }, [adId]);

  const handleImageChange = (event) => {
    if (event.target.files.length > 2) {
      toast.error('Vous ne pouvez télécharger que deux images.');
      return;
    }
    setImages([...event.target.files]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    try {
      const response = await updateData(`/real_estate_ads/${adId}`, formData); // Utilisez l'URL relative appropriée
      console.log(response);
      toast.success('Annonce modifiée avec succès !', {
        onClose: () => navigate('/')
      });
    } catch (error) {
      console.error('Erreur lors de la modification de l\'annonce :', error);
      toast.error('Échec de la modification de l\'annonce.');
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
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {existingImages.map((image, index) => (
              <Grid item xs={4} key={index}>
                <img src={image.url} alt={`image-${index}`} style={{ width: '100%' }} />
              </Grid>
            ))}
            {images.map((image, index) => (
              <Grid item xs={4} key={index}>
                <img src={URL.createObjectURL(image)} alt={`image-${index}`} style={{ width: '100%' }} />
              </Grid>
            ))}
          </Grid>
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