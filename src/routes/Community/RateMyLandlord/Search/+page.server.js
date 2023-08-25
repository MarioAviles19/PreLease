import { SerializeNonPOJOs } from "$lib/helpers.js";
import { redirect } from "@sveltejs/kit";
import * as adminFirestore from "firebase-admin/firestore"
const {getFirestore, Timestamp} = adminFirestore;

export const load = async ({locals, url,cookies})=>{
    //TODO: Rework this to utilize dependency Injection;
    
    const sessionCookie = cookies.get('__session')

    const {user, app} = await locals.GetUserFromSession(sessionCookie || "");

    const address = url.searchParams.get('address');

    if(!address){
        throw redirect(302, "/Community/RateMyLandlord");
    }
    if(!user){
        throw redirect(302, `/SignIn?redirect=/Community/RateMyLandlord/Search?address=${address}`)
    }
    


    
    //TODO: orderby end date after index finishes
    const reviewsQuery = await getFirestore(app).collection('LandlordRatings').where('address', '==', address).limit(25).get();
    const property = await getFirestore(app).collection('Properties').doc(address).get();
    //TODO: check if user's review came up in the initial read
    const userRating =  await getFirestore(app).collection('LandlordRatings').where("address", "==", address).where("author", "==", user.uid).limit(1).get();

    /**@type {Array<import("$lib/Interfaces/databaseTypes.js").LandlordReview>} */
    let reviews = [];
    let propertyPayload = {};

    let userHasMadeReview = false;
    reviewsQuery.forEach((doc)=>{

        /**@type {import("$lib/Interfaces/databaseTypes.js").LandlordReview} */
        const data = doc.data();



        reviews.push({
            ...data, 
            id: doc.id,
            startDate: data.startDate?.toDate(), 
            endDate: data.endDate?.toDate(),
            timestamp: SerializeNonPOJOs(doc.data().timestamp) || null,
            author: ""
            });
        
        if(data.author == user.uid){
            userHasMadeReview = true;
        }


    })

    let userDataPayload = {};



    if(!userRating.empty){

        userDataPayload = {...userRating.docs[0].data() || {}, 
        id: userRating.docs[0]?.id,
        startDate: new Date(userRating.docs[0].data().startDate.toDate()) || null, 
        endDate: new Date(userRating.docs[0].data().endDate.toDate()) || null,
        timestamp: SerializeNonPOJOs(userRating.docs[0].data().timestamp) || null
    }
        
    }

    let propertyData = {};

    if(property.exists){

        propertyData = {...property.data(), id: property.id}
    }

    console.log("user" + userHasMadeReview)
 
    //TODO: Replace the 'author' field with an 'isOwnedByUser' field for strengthened anonymity.
    return {property: propertyData, 
    reviews:reviews, 
    address: address, 
    userReview: userDataPayload,
    userHasMadeReview
}
}