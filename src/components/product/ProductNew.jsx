import { useState, useEffect } from "react";
import { postData, postDataWithFile } from "../service/apiManager";
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
    console.log(adData);
    // V├®rifiez si l'utilisateur est connect├® avant de continuer
    if (!user.isLoggedIn) {
      toast.error("Vous devez ├¬tre connect├® pour effectuer cette action.");
      return;
    }
    try {
      const response = await postDataWithFile("/products", adData);
      console.log(response);
      toast.success("Annonce cr├®├®e avec succ├¿s !", {
        onClose: () => navigate("/"),
      });
    } catch (error) {
      console.error("Erreur lors de la publication de l'annonce :", error);
      toast.error("├ëchec de la cr├®ation de l'annonce.");
    }
  };

  return <FormProduct onSubmit={handleSubmit} setAdData={setAdData} />;
}
