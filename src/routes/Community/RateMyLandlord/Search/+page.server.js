import { SerializeNonPOJOs } from "$lib/helpers.js";
import { redirect } from "@sveltejs/kit";
import * as adminFirestore from "firebase-admin/firestore"
const {getFirestore, Timestamp} = adminFirestore;

export const load = async ({locals, url,cookies})=>{
    //TODO: Rework this to utilize dependency Injection;
    

    const {user, app} = await locals.GetUserFromSession(cookies.get('session'));

    const address = url.searchParams.get('address');

    if(!address){
        throw redirect(302, "Community/RateMyLandlord");
    }


    
    //TODO: orderby end date after index finishes
    const reviews = await getFirestore(app).collection('LandlordRatings').where('address', '==', address).limit(3).get();
    const property = await getFirestore(app).collection('Properties').doc(address).get();
    //TODO: check if user's review came up in the initial read
    const userRating =  await getFirestore(app).collection('LandlordRatings').where("address", "==", address).where("author", "==", user.uid).limit(1).get();

    let reviewPayload = [];
    let propertyPayload = {};

    reviews.forEach((doc)=>{

        const data = doc.data();

        console.log(new Date(data.startDate.toDate()))
        reviewPayload.push({...doc.data(), startDate: new Date(data.startDate.toDate()), endDate: new Date(data.endDate.toDate()),  id: doc.id});


    })

    let userDataPayload = {};



    if(!userRating.empty){

        userDataPayload = {...userRating.docs[0].data() || {}, 
        id: userRating.docs[0]?.id,
        startDate: new Date(userRating.docs[0].data().startDate.toDate()) || null, 
        endDate: new Date(userRating.docs[0].data().endDate.toDate()) || null,
        timestamp: SerializeNonPOJOs(userRating.docs[0].data().timestamp) || null}
    }

    let propertyData = {};

    if(property.exists){

        propertyData = {...property.data(), id: property.id}
    }

    
 
    //TODO: Replace the 'author' field with an 'isOwnedByUser' field for strengthened anonymity.
    return {property: propertyData , 
    reviews: SerializeNonPOJOs(reviewPayload), 
    address: address, 
    userReview: userDataPayload}
}