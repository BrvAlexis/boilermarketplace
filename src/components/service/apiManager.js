import ky from 'ky';
import Cookies from 'js-cookie';
const baseUrl = 'http://localhost:3000';
const authToken = Cookies.get("token");

const headersData = {
    //if(authToken){
     //   Authorization: `Bearer ${authToken}`
   // },
    "Content-Type": "application/json"
}

export async function getData(objectUrl,body){
    const json = await ky.get(baseUrl +objectUrl, 
        {
        //    headers: headersData,
        //    json: {body},
    }).json();
    return json;
}

export async function postData(objectUrl,body){
    console.log(objectUrl,body)
    const json = await ky.post(baseUrl +objectUrl, {
        headers: headersData,
        json: body
    }).json();
    return json;
}

export async function signData(objectUrl,body){
    console.log(objectUrl,body)
    const json = await ky.post(baseUrl +objectUrl, {
        headers: headersData,
        json: body
    });
    //console.log("json : ",json);
    Cookies.set('token', json.headers.get("Authorization"));
    return json.json();
}