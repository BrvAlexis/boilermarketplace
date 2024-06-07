import { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Typography, Container, Box, Grid } from '@mui/material';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';



export default function CreateRealEstateAd() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    setImages([...images, ...event.target.files]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Ici, vous pouvez gérer la soumission du formulaire, par exemple en envoyant les données à votre serveur
    console.log({ title, description, price, images });
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
            Créer une annonce immobilière
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
                Télécharger des images
              </Button>
            </label>
            <Grid container spacing={2} sx={{ mt: 2 }}>
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
              Publier l'annonce
            </Button>
          </Box>
        </Box>
      </Container>
    
  );
}