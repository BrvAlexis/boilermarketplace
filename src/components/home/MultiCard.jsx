import { useEffect, useState, useRef } from "react";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container, Button, CardActionArea, CardActions, Box } from "@mui/material";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getData } from "../service/apiManager.js";

import { useAtom } from "jotai";
import { searchAtom } from "../atom/atom.js";

const CardGrid = () => {
  const [allProduct,setallProduct] = useState([])
  const [products, setProducts] = useState([]);
  const [page,setPage] = useState(1)
  const [hasMoreProduct, setHasMoreProduct] = useState(true);
  const [searchArgument, setSearchArgument] = useAtom(searchAtom)
  const prevSearchArgumentRef = useRef(searchArgument);

  const filterArgument =() => {
    console.log(searchArgument);
    const queryString = Object.entries(searchArgument)
      .filter(([key, value]) => value)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    return queryString
  }
  //this useEffect is for counting number of products
  useEffect(() => {
    let url;
    let queryString = filterArgument()
    console.log(queryString);
    if(queryString){
      url = `/products?${queryString}`
    } else {
      url = "/products"
    }
    // console.log(url);
    (async () => {
      try {
        const data = await getData(url);
        setallProduct(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [searchArgument]);

  //this useEffect is for showing the list of products
  useEffect(() => {
    let url;
    let queryString = filterArgument()

    console.log(queryString);
    if(queryString){
      url = `/products?_limit=15&page=${page}&${queryString}`
    } else {
      url = `/products?_limit=15&page=${page}`
    }
    console.log(url);
    const cardData = async () => {
      if (searchArgument !== prevSearchArgumentRef.current) {
        setProducts([]); //initialize/empty products array when searchArgument changes
        prevSearchArgumentRef.current = searchArgument;
      }
      try {
        const data = await getData(url);
        setProducts(prevProducts => [...prevProducts, ...data]);
        setHasMoreProduct(data.length > 0); //sets hasMore to true if the length of data is 15 (the limit you requested) and false otherwise. If the length of data is less than 15, that means there is no more data
      } catch (error) {
        console.error(error);
      }
    };
    cardData();
  }, [page,searchArgument]);

  return (
    <Container component="main" maxWidth="xl">
      
      <Box sx={{ marginBottom: '20px' }}>
        <Typography component="p" variant="p">
            Nombre de résultat : {allProduct.length}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
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
                
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" mt={3} mb={2}>
        {hasMoreProduct && 
        <Button variant="contained" onClick={()=>{setPage(prevPage => prevPage + 1)}}>
          More
        </Button>
        }
      </Box>
    </Container>
  );
};

export default CardGrid;
