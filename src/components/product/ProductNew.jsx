import { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Typography, Container, Box, FormControl, FormLabel, Checkbox, RadioGroup, FormControlLabel, Radio, FormGroup } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { postData } from '../service/apiManager';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CreateRealEstateAd() {
  const navigate = useNavigate();
  const [adData, setAdData] = useState({
    title: '',
    description: '',
    price: '',
    city: '',
    area: '',
    property_type: '',
    number_of_rooms: '',
    category: '',
    pool: false,
    balcony: false,
    parking: false,
    garage: false,
    cellar: false,
    number_of_floors: '',
    elevator: false,
    disabled_access: false,
    energy_performance_diagnostic: '',
    furnished: false,
    terrace: false,
    garden: false,
    basement: false,
    caretaker: false
  });

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    setAdData({
      ...adData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      
      
      // Ajoutez ici la logique pour envoyer les images si nécessaire
      // images.forEach((image, index) => formData.append(`images[${index}]`, image));

      const response = await postData('/products', adData);
    console.log(response);
    toast.success('Annonce créée avec succès !', {
      onClose: () => navigate('/')
    });
  } catch (error) {
    console.error('Erreur lors de la publication de l\'annonce :', error);
    toast.error('Échec de la création de l\'annonce.');
  }
};


  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <AddPhotoAlternateIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Créer une annonce immobilière
        </Typography>

        <FormControl component="fieldset" sx={{ mt: 2 }}>
  <FormLabel component="legend">Type de bien</FormLabel>
  <RadioGroup row name="property_type" value={adData.property_type} onChange={handleInputChange}>
    
    
    <FormControlLabel value="appartement" control={<Radio />} label="Appartement" />
    <FormControlLabel value="maison" control={<Radio />} label="Maison" />
  </RadioGroup>
</FormControl>
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
          <FormControl component="fieldset" sx={{ mt: 2 }}>
  <FormLabel component="legend">Catégorie</FormLabel>
  <RadioGroup row name="category" value={adData.category} onChange={handleInputChange}>
    <FormControlLabel value="ancien" control={<Radio />} label="Ancien" />
    <FormControlLabel value="neuf" control={<Radio />} label="Neuf" />
    <FormControlLabel value="projet en construction" control={<Radio />} label="Projet de construction" />
  </RadioGroup>
</FormControl>

                  <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel component="legend">Extérieur</FormLabel>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox checked={adData.pool} onChange={handleInputChange} name="pool" />}
            label="Piscine"
          />
          <FormControlLabel
            control={<Checkbox checked={adData.balcony} onChange={handleInputChange} name="balcony" />}
            label="Balcon"
          />
          <FormControlLabel
            control={<Checkbox checked={adData.terrace} onChange={handleInputChange} name="terrace" />}
            label="Terrasse"
          />
          <FormControlLabel
            control={<Checkbox checked={adData.garden} onChange={handleInputChange} name="garden" />}
            label="Jardin"
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel component="legend">Dépendances</FormLabel>
          <FormGroup row>
          <FormControlLabel
            control={<Checkbox checked={adData.garage} onChange={handleInputChange} name="garage" />}
            label="Garage"
          />
          <FormControlLabel
            control={<Checkbox checked={adData.parking} onChange={handleInputChange} name="parking" />}
            label="Parking"
          />
          <FormControlLabel
            control={<Checkbox checked={adData.cellar} onChange={handleInputChange} name="cellar" />}
            label="Cave"
          />
          <FormControlLabel
            control={<Checkbox checked={adData.basement} onChange={handleInputChange} name="basement" />}
            label="Sous-sol"
          />
        </FormGroup>

      </FormControl>

      <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel component="legend">Mobilités</FormLabel>
          <FormGroup row>
          <FormControlLabel
            control={<Checkbox checked={adData.elevator} onChange={handleInputChange} name="elevator" />}
            label="Ascenseur"
          />
          <FormControlLabel
            control={<Checkbox checked={adData.disabled_access} onChange={handleInputChange} name="disabled_access" />}
            label="Accès Handicapé"
          />
        </FormGroup>

      </FormControl>

      <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel component="legend">Autres</FormLabel>
          <FormGroup row>
          <FormControlLabel
            control={<Checkbox checked={adData.furnished} onChange={handleInputChange} name="furnished" />}
            label="Meublé"
          />
          <FormControlLabel
            control={<Checkbox checked={adData.caretaker} onChange={handleInputChange} name="caretaker" />}
            label="Gardien"
          />
        </FormGroup>

      </FormControl>

      <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel component="legend">Diagnostic de Performance Énergétique</FormLabel>
          <RadioGroup row name="energy_performance_diagnostic" value={adData.energy_performance_diagnostic} onChange={handleInputChange}>
            <FormControlLabel value="A" control={<Radio />} label="A" />
            <FormControlLabel value="B" control={<Radio />} label="B" />
            <FormControlLabel value="C" control={<Radio />} label="C" />
            <FormControlLabel value="D" control={<Radio />} label="D" />
            <FormControlLabel value="E" control={<Radio />} label="E" />
            <FormControlLabel value="F" control={<Radio />} label="F" />
            <FormControlLabel value="G" control={<Radio />} label="G" />
          </RadioGroup>
        </FormControl>


          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Publier l'annonce
          </Button>
        </Box>
      </Box>
    </Container>
  );
}