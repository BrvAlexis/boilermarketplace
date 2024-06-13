import { useState, useEffect } from "react";
import { postData } from "../service/apiManager";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { userAtom } from "../atom/atom.js";
import FormProduct from "./FormProduct";

export default function CreateRealEstateAd() {
  const [user] = useAtom(userAtom);
  const [adData, setAdData] = useState({});
  const navigate = useNavigate();

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
        onClose: () => navigate(`/imagenew/${response.id}`),
      });
    } catch (error) {
      console.error("Erreur lors de la publication de l'annonce :", error);
      toast.error("Échec de la création de l'annonce.");
    }
  };

  return <FormProduct onSubmit={handleSubmit} setAdData={setAdData} />;
}
