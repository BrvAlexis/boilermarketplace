import ky from 'ky';
import Cookies from 'js-cookie';
const baseUrl = 'http://localhost:3000';
const authToken = Cookies.get("token");

const headersData = {
    if(authToken){
        Authorization: `Bearer ${authToken}`
    },
    "Content-Type": "application/json"
}

//export function oldgetData(){
//   const json = await ky(baseUrl, {
//        retry: {
//            limit: 10,
//            methods: ['get'],
//            statusCodes: [413],
//            backoffLimit: 3000
//        }
//        }).json();
//}
// Soit cookie Existe

export async function getData(objectUrl,body){
    const json = await ky.get(baseUrl +objectUrl, 
        {
        //    headers: headersData,
        //    json: {body},
    }).json();
    return json;
}

export async function postData(objectUrl,body){
    const json = await ky.post(baseUrl +objectUrl, {
        headers: headersData,
        json:{body},
    }).json();
    return json;
}