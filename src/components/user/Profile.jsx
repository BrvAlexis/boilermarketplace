import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../service/apiManager.js';
import { useAtom } from 'jotai';
import { userAtom } from '../atom/atom.js';
import { Link } from 'react-router-dom';

import { Typography, Paper, Grid, Button  } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Profile = () => {
  const [user] = useAtom(userAtom);
  const [profile,setProfile] = useState("")
  const [profileProducts,setProfileProducts] = useState([])
  //dynamic route
  const { urlprofile } = useParams();
  console.log("user id: ", user.id);

  useEffect(()=> {
    const profileData = async() => {
      try{
        const data = await getData(`/users/${user.id}`);
        console.log("user: ",data)
        setProfile(data);

      }catch(error){
        console.error(error);
      }
    };
    const productsData = async() => {
      try{
        const data = await getData(`/products?user_id=${urlprofile}`);
        // const data = await getData(`/products?user_id=28`);
        console.log("products :", data)
        setProfileProducts(data);

      }catch(error){
        console.error(error);
      }
    };
    profileData();
    productsData();
  },[user, urlprofile])

  return(
    <>
      <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1">
              Profile
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="h2">
              ID: {profile.id}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" component="p">
              Email: {profile.email}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    

    <div>
      <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      {profileProducts.length === 0 ? (
        <h1>You don&apos;t have a product</h1>
      ) : (
        <>
        
          <h2>Voici vos annonces :</h2>
          <Grid container spacing={4}>
            {profileProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.title} {product.price}€
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    </Typography>
                    <Link to={`/product/${product.id}`}>
                      <Button variant="contained" color="primary">SEE</Button>
                    </Link>
                    <Link to="/productnewedit">
                      <Button variant="contained"  color="secondary">EDIT</Button>
                    </Link>
                    
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
        </>
      )}
      </Paper>
    </div>
    

    </>
  )
}

export default Profile