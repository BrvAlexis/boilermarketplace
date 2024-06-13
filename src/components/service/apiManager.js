import ky from "ky";
import Cookies from "js-cookie";

const baseUrl = "http://localhost:3000";


function getHeaders() {
  const authToken = Cookies.get("token");
  const headers = {};
  if (authToken) {
    headers["Authorization"] = authToken;
  }
  return headers;
}
export async function getData(objectUrl, body) {
  console.log(objectUrl);
  const json = await ky
    .get(baseUrl + objectUrl, {
      headers: getHeaders(),
      //    json: {body},
    })
    .json();
  return json;
}

export async function postData(objectUrl, body) {
  const formData = new FormData();
  for (const key in body) {
    if (body.hasOwnProperty(key)) {
      formData.append(`product[${key}]`, body[key]);
    }
  }

  const json = await ky
    .post(baseUrl + objectUrl, {
      headers: getHeaders(),
      body: formData,
    })
    .json();
  return json;
}

export async function postDataWithFile(objectUrl, data) {
  const authToken = Cookies.get("token")
  console.log(baseUrl + objectUrl, data);
  console.log(authToken);

  // Create a new FormData instance
  const formData = new FormData();

  // Add all properties from data to formData
  for (const property in data) {
    console.log(property);
    // console.log(property, data[property])
    if (property === 'product') {
      for (const subProperty in data[property]) {
        formData.append(`${property}[${subProperty}]`, data[property][subProperty]);
      }
    } else {
      formData.append(property, data[property]);
    }
  }
  //to see what is insid ehte formdata
  // for (var pair of formData.entries()) {
  //   console.log(pair[0]+ ', ' + pair[1]); 
  // }
  const response = await fetch(baseUrl + objectUrl, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${authToken}`,
    },
    body: formData, // Pass formData as body
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const json = await response.json();

  return json;
}

export async function signData(objectUrl,body){
    //console.log(objectUrl,body)
    const json = await ky.post(baseUrl + objectUrl, {
        headers: getHeaders(),
        json: body
    });
    //console.log("json : ",json);
    Cookies.set('token', json.headers.get("Authorization"));
    return json.json();
}

export async function decoData(objectUrl) {
  const json = await ky.delete(baseUrl + objectUrl, {
    headers: getHeaders(),
  });
  Cookies.remove("token");
  return json.json();
}

export async function signUpdateData(objectUrl, body) {
  //console.log(objectUrl,body)
  const json = await ky.patch(baseUrl + objectUrl, {
    headers: getHeaders(),
    json: body,
  });
  //console.log("json : ",json);
  // Cookies.set('token', json.headers.get("Authorization"));
  return json.json();
}

export async function productUpdateData(objectUrl, body) {
  try {
    const response = await ky.patch(baseUrl + objectUrl, {
      headers: getHeaders(),
      json: body,
    });

    if (response.status === 204 || !response.bodyUsed) {
      //If the status code is 204 (No Content),
      return null; // or return a default value
    } else {
      return response.json();
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit :", error);
    throw error;
  }
}

export async function productDeleteData(objectUrl) {
  try {
    const response = await ky.delete(baseUrl + objectUrl, {
      headers: getHeaders(),
    });

    // Si le statut de la réponse indique qu'il n'y a pas de contenu, ne tentez pas de parser le JSON
    if (response.status === 204 || response.status === 200) {
      return null; // ou retournez une valeur appropriée indiquant le succès
    } else {
      // Tentez de parser le JSON seulement si la réponse contient du contenu
      return response.json();
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du produit :", error);
    throw error;
  }
}
