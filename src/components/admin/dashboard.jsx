import React,{useEffect, useState} from 'react'
import MetricsProduct from './metricsProduct';
import { getData } from "../service/apiManager.js";

function dashboard() {
  const[user, setUser] = useState([]);
  const[product,setProduct] = useState([]);

  useEffect(() => {
    const productData = async () => {
      try {
        const data = await getData(`/products`);
        console.log(data);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };
    const profileData = async() => {
      try{
        const data = await getData(`/users`);
        console.log("user: ", data)
        setUser(data);

      }catch(error){
        console.error(error);
      }
    };
    productData();
  }, [])
  
  

  return (
    <div>
      <h1>dashboard</h1>
      <h2>Métriques globale</h2>
      {product && <MetricsProduct data={product} />}
      <h2>Créations d'annonces semaine par semaine</h2>
      <h2>Graphique des prix des annonces</h2>
      </div>
  )
}

export default dashboard
