import React, { useEffect, useState } from 'react';

const MetricsProduct = ({ data }) => {
    const [totalProduct, setTotalProduct] = useState(0);
    const [totalProductOwners, setTotalProductOwners] = useState(0);
    const [avgProductPerOwner, setAvgProductPerOwner] = useState(0);
    const [avgPrice, setAvgPrice] = useState(0);

    useEffect(() => {
        if (data) {
            const totalProduct = data.length;
            const totalProductOwners = [...new Set(data.map(product => product.user_id))];
            const totalOwners = totalProductOwners.length;
            const avgProductPerOwner = totalProduct / totalOwners;
            const avgPrice = data.reduce((sum, ad) => sum + parseFloat(ad.price), 0) / totalProduct;

            setTotalProduct(totalProduct);
            setTotalProductOwners(totalOwners);
            setAvgProductPerOwner(avgProductPerOwner.toFixed(2));
            setAvgPrice(avgPrice.toFixed(2));
        }
    }, [data]);

    return (
        <div id="metrics">
            <p>Nombre total d'annonces : {totalProduct}</p>
            <p>Nombre total de propriétaires : {totalProductOwners}</p>
            <p>Nombre d'annonces moyen par propriétaire : {avgProductPerOwner}</p>
            <p>Prix moyen d'une annonce : {avgPrice}</p>
        </div>
    );
};

export default MetricsProduct;
