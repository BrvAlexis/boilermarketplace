import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  Typography,
  Container,
  Box,
  FormControl,
  TextField,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { imageUpdate } from "../service/apiManager"; // Assurez-vous que le chemin d'importation est correct

const ImageNew = () => {
const [openModal, setOpenModal] = useState(false);
  const { productId } = useParams(); // Récupère l'ID du produit depuis l'URL
  const navigate = useNavigate(); // Hook pour naviguer programmablement
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');


 // Gère la sélection de l'image et met à jour l'aperçu
 const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Met à jour l'état de l'image
    setPreview(URL.createObjectURL(file)); // Met à jour l'aperçu de l'image
  };

  // Gère l'envoi de l'image au serveur
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    try {
      // Utilisez l'ID du produit pour construire l'URL de mise à jour de l'image
      const response = await imageUpdate(`/products/${productId}/image`, image);
      if (response) {
        console.log('Image téléchargée avec succès');
        setOpenModal(true); // Redirige vers la page du produit après la mise à jour
      }
    } catch (error) {
      console.error('Erreur lors de l\'upload de l\'image :', error);
    }
  };

  const handleCloseModal = (redirectTo) => {
    setOpenModal(false); // Ferme la modale
    if (redirectTo === 'edit') {
      navigate(`/edit/${productId}`);
    } else if (redirectTo === 'view') {
      navigate(`/product/${productId}`);
    }
  };

  return (
    <>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Ajouter une nouvelle image pour le produit
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  name="image"
                  type="file"
                  onChange={handleImageChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {preview && (
                <Avatar
                  src={preview}
                  alt="Aperçu de l'image"
                  sx={{ width: 100, height: 100 }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                startIcon={<AddPhotoAlternateIcon />}
              >
                Télécharger
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
     <Dialog
     open={openModal}
     onClose={() => setOpenModal(false)}
     aria-labelledby="alert-dialog-title"
     aria-describedby="alert-dialog-description"
   >
    <DialogTitle id="alert-dialog-title">{"Mise à jour réussie"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            L'image a été mise à jour avec succès. Que souhaitez-vous faire ensuite ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseModal('edit')} color="primary">
            Modifier l'annonce
          </Button>
          <Button onClick={() => handleCloseModal('view')} color="primary" autoFocus>
            Voir l'annonce
          </Button>
        </DialogActions>
      </Dialog>
   </>
  );
};

export default ImageNew;