import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Container,
  Box,
  FormControl,
  FormLabel,
  Checkbox,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

export default function FormProduct({
  onSubmit,
  onDelete,
  productId,
  initialData,
  setAdData,
}) {
  const [adData, setAdDataState] = useState(initialData || {});
  console.log(initialData);

  useEffect(() => {
    setAdDataState(initialData || {});
  }, [initialData]);

  const isEditing = !!productId;

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newAdData = {
      ...adData,
      [name]: type === "checkbox" ? checked : value,
    };
    setAdData(newAdData);
    setAdDataState(newAdData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAdData({ ...adData, image: file });
    setAdDataState({ ...adData, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ product: adData });
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AddPhotoAlternateIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isEditing
            ? "Modifier une annonce immobilière"
            : "Créer une annonce immobilière"}
        </Typography>

        {!isEditing && (
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Type de bien</FormLabel>
            <RadioGroup
              row
              name="property_type"
              value={adData.property_type}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="appartement"
                control={<Radio />}
                label="Appartement"
              />
              <FormControlLabel
                value="maison"
                control={<Radio />}
                label="Maison"
              />
            </RadioGroup>
          </FormControl>
        )}
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
            value={adData.title}
            onChange={handleInputChange}
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
            value={adData.description}
            onChange={handleInputChange}
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
            value={adData.price}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="city"
            label="Ville"
            id="city"
            autoComplete="city"
            value={adData.city}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="area"
            label="Superficie (m²)"
            type="number"
            id="area"
            autoComplete="area"
            value={adData.area}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="number_of_rooms"
            label="Nombre de pièces"
            type="number"
            id="number_of_rooms"
            autoComplete="number_of_rooms"
            value={adData.number_of_rooms}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="number_of_floors"
            label="Nombre d'étages"
            type="number"
            id="number_of_floors"
            autoComplete="number_of_floors"
            value={adData.number_of_floors}
            onChange={handleInputChange}
          />
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Catégorie</FormLabel>
            <RadioGroup
              row
              name="category"
              value={adData.category}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="ancien"
                control={<Radio />}
                label="Ancien"
              />
              <FormControlLabel value="neuf" control={<Radio />} label="Neuf" />
              <FormControlLabel
                value="projet en construction"
                control={<Radio />}
                label="Projet de construction"
              />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Extérieur</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={adData.pool}
                    onChange={handleInputChange}
                    name="pool"
                  />
                }
                label="Piscine"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={adData.balcony}
                    onChange={handleInputChange}
                    name="balcony"
                  />
                }
                label="Balcon"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={adData.terrace}
                    onChange={handleInputChange}
                    name="terrace"
                  />
                }
                label="Terrasse"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={adData.garden}
                    onChange={handleInputChange}
                    name="garden"
                  />
                }
                label="Jardin"
              />
            </FormGroup>
          </FormControl>

          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Dépendances</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={adData.garage}
                    onChange={handleInputChange}
                    name="garage"
                  />
                }
                label="Garage"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={adData.parking}
                    onChange={handleInputChange}
                    name="parking"
                  />
                }
                label="Parking"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={adData.cellar}
                    onChange={handleInputChange}
                    name="cellar"
                  />
                }
                label="Cave"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={adData.basement}
                    onChange={handleInputChange}
                    name="basement"
                  />
                }
                label="Sous-sol"
              />
            </FormGroup>
          </FormControl>

          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Mobilités</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={adData.elevator}
                    onChange={handleInputChange}
                    name="elevator"
                  />
                }
                label="Ascenseur"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={adData.disabled_access}
                    onChange={handleInputChange}
                    name="disabled_access"
                  />
                }
                label="Accès Handicapé"
              />
            </FormGroup>
          </FormControl>

          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Autres</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={adData.furnished}
                    onChange={handleInputChange}
                    name="furnished"
                  />
                }
                label="Meublé"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={adData.caretaker}
                    onChange={handleInputChange}
                    name="caretaker"
                  />
                }
                label="Gardien"
              />
            </FormGroup>
          </FormControl>

          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">
              Diagnostic de Performance Énergétique
            </FormLabel>
            <RadioGroup
              row
              name="energy_performance_diagnostic"
              value={adData.energy_performance_diagnostic}
              onChange={handleInputChange}
            >
              <FormControlLabel value="A" control={<Radio />} label="A" />
              <FormControlLabel value="B" control={<Radio />} label="B" />
              <FormControlLabel value="C" control={<Radio />} label="C" />
              <FormControlLabel value="D" control={<Radio />} label="D" />
              <FormControlLabel value="E" control={<Radio />} label="E" />
              <FormControlLabel value="F" control={<Radio />} label="F" />
              <FormControlLabel value="G" control={<Radio />} label="G" />
            </RadioGroup>
          </FormControl>

          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />

            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            {isEditing ? "Modifier l'annonce" : "Publier l'annonce"}
          </Button>
          {isEditing && (
            <>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
                onClick={() => navigate(`/imagenew/${productId}`)} // Utilisez l'ID du produit pour naviguer
              >
                Modifier les images
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="error"
                sx={{ mb: 2 }}
                onClick={onDelete}
              >
                Supprimer l'annonce
              </Button>
                            {adData.image_url && (
                <Box sx={{ my: 2 }}>
                  <img src={`http://localhost:3000${adData.image_url}`} alt="Image du produit" style={{ maxWidth: '100%', height: 'auto' }} />
                </Box>
              )}
              
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}
