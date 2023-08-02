import { SerializeNonPOJOs } from "$lib/helpers.js";
import * as adminFirestore from "firebase-admin/firestore"
const {getFirestore} = adminFirestore;

export const load = async ({locals, url,cookies})=>{

    const {user, app} = locals.GetUserFromSession(cookies.get('session'));

    const address = url.searchParams.get('address');

    

    const properties = await getFirestore(app).collection('Properties').where('address', '==', address).get();

    let payload ={};

    properties.forEach((doc)=>{
        payload[doc.id] = doc.data();

    })
    
 

    return {addressInfo: SerializeNonPOJOs(payload), address: address}
}