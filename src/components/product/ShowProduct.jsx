import {useEffect, useState} from 'react'
import { getData } from '../service/apiManager.js';
//passer en props le product id, puis après recheck le link
function ShowProduct() {
    const { productId } = match.params;
    const [product,setProduct] = useState([]);
    // Supposons que vous ayez un tableau d'objets représentant vos données de carte
    useEffect(()=> {
    const productData = async() => {
      try{
        const data = await getData("/products/" + {productId});
        console.log(data)
        setProduct(data);
  
      }catch(error){
        console.error(error);
      }
    };
    productData();
  },[])

  return (
    <div>
        <h1>c'est le produit {product.title}</h1>
    </div>
  )
}

export default ShowProduct;