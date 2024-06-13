import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getData,
  productUpdateData,
  productDeleteData,
} from "../service/apiManager";
import FormProduct from "./FormProduct";

export default function EditRealEstateAd() {
  const { productId } = useParams();
  const [adData, setAdData] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    area: "",
    number_of_rooms: "",
    number_of_floors: "",
    category: "ancien",
    pool: false,
    balcony: false,
    terrace: false,
    garden: false,
    garage: false,
    parking: false,
    cellar: false,
    basement: false,
    elevator: false,
    disabled_access: false,
    furnished: false,
    caretaker: false,
    energy_performance_diagnostic: "A",
  });
  const [originalData, setOriginalData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productData = await getData(`/products/${productId}`);
        setAdData(productData);
        setOriginalData(productData);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des données du produit :",
          error,
        );
        toast.error("Échec du chargement des données de l'annonce.");
      }
    };
    fetchProductData();
  }, [productId]);

  const handleSubmit = async () => {
    const filteredData = {};
    for (const key in adData) {
      if (adData[key] !== originalData[key]) {
        filteredData[key] = adData[key];
      }
    }
    delete filteredData.id;
    delete filteredData.created_at;
    delete filteredData.updated_at;

    try {
      await productUpdateData(`/products/${productId}`, filteredData);
      toast.success("Annonce mise à jour avec succès.");
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'annonce :", error);
      toast.error("Échec de la mise à jour de l'annonce.");
    }
  };

  const handleDelete = async () => {
    try {
      await productDeleteData(`/products/${productId}`);
      toast.success("Annonce supprimée avec succès.");
      navigate("/"); // Redirection vers la page d'accueil
    } catch (error) {
      console.error("Erreur lors de la suppression de l'annonce :", error);
      toast.error("Échec de la suppression de l'annonce.");
    }
  };

  return (
    <FormProduct
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      productId={productId}
      initialData={adData}
      setAdData={setAdData}
    />
  );
}
