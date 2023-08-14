import { SerializeNonPOJOs } from "$lib/helpers.js";
import { redirect } from "@sveltejs/kit";
import * as adminFirestore from "firebase-admin/firestore"
const {getFirestore, Timestamp} = adminFirestore;

export const load = async ({locals, url,cookies})=>{

    const {user, app} = locals.GetUserFromSession(cookies.get('session'));

    const address = url.searchParams.get('address');
    if(!address){
        throw redirect(302, "Community/RateMyLandlord");
    }

    
    //TODO: orderby end date after index finishes
    const reviews = await getFirestore(app).collection('LandlordRatings').where('address', '==', address).limit(3).get();
    const property = await getFirestore(app).collection('Properties').doc(address).get();

    let reviewPayload = [];
    let propertyPayload = {};

    reviews.forEach((doc)=>{
        const data = doc.data();

        console.log(new Date(data.startDate.toDate()))
        reviewPayload.push({...doc.data(),startDate: new Date(data.startDate.toDate()), endDate: new Date(data.endDate.toDate()),  id: doc.id});


    })


    console.log(reviewPayload);
 

    return {property: {...property.data(), id: property.id} , reviews: SerializeNonPOJOs(reviewPayload), address: address}
}