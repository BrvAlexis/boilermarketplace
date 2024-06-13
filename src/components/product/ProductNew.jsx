import { useState } from "react";
import { postData } from "../service/apiManager";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { userAtom } from "../atom/atom.js";
import FormProduct from "./FormProduct";

export default function CreateRealEstateAd() {
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
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

  const handleSubmit = async () => {
    event.preventDefault();
    // Vérifiez si l'utilisateur est connecté avant de continuer
    if (!user.isLoggedIn) {
      toast.error("Vous devez être connecté pour effectuer cette action.");
      return;
    }

    try {
      const response = await postData("/products", adData);
      console.log(response);
      toast.success("Annonce créée avec succès !", {
        onClose: () => navigate('/'),
      });
    } catch (error) {
      console.error("Erreur lors de la publication de l'annonce :", error);
      toast.error("Échec de la création de l'annonce.");
    }
  };

  return (
    <FormProduct
      onSubmit={handleSubmit}
      setAdData={setAdData}
      initialData={adData}
    />
  );
}
