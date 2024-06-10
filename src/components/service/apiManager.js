import ky from 'ky';
import Cookies from 'js-cookie';

const baseUrl = 'http://localhost:3000';

function getHeaders() {
    const authToken = Cookies.get("token");
    const headers = {
        "Content-Type": "application/json"
    };
    if (authToken) {
        headers['Authorization'] = authToken;
    }
    return headers;
}
export async function getData(objectUrl,body){
    console.log(objectUrl);
    const json = await ky.get(baseUrl + objectUrl, 
        {
           headers: getHeaders(),
        //    json: {body},
    }).json();
    return json;
}

export async function postData(objectUrl,body){
    //console.log(objectUrl,body)
    const json = await ky.post(baseUrl +objectUrl, {
        headers: getHeaders(),
        json: body
    }).json();
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

export async function decoData(objectUrl){
    const json = await ky.delete(baseUrl +objectUrl, {
        headers: getHeaders()
    });
    Cookies.remove('token');
    return json.json();
}

export async function signUpdateData(objectUrl,body){
    //console.log(objectUrl,body)
    const json = await ky.patch(baseUrl +objectUrl, {
        headers: getHeaders(),
        json: body
    });
    //console.log("json : ",json);
    // Cookies.set('token', json.headers.get("Authorization"));
    return json.json();
}