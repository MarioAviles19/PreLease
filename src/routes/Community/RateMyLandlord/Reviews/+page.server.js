import { redirect } from '@sveltejs/kit';
import * as firestoreAdmin from 'firebase-admin/firestore';
import { SerializeNonPOJOs } from '$lib/helpers.js';


const {getFirestore} = firestoreAdmin;

export const load = async ({cookies, locals, url})=>{

    const address = url.searchParams.get("address");

    if(!address){
        //If there is no address, redirect back to the search page
        throw redirect(302, "/Community/RateMyLandlord");
    }


    const {user, app} = await locals.GetUserFromSession(cookies.get('__session'));

    //Get the reviews for the supplied address
    //TODO: Paginate query
    const query = await getFirestore(app).collection("LandlordRatings").where("address", "==", address).limit(25).get();

    /**@type {Array<import("$lib/Interfaces/databaseTypes.js").LandlordReview>} */
    let reviews = [];

    if(!query.empty){        
        query.forEach(doc=>{
            /**@type {import("$lib/Interfaces/databaseTypes.js").LandlordReview} */
            const data = doc.data();
            reviews.push({
                ...data, 
                id: doc.id,
                startDate: new Date(doc.data().startDate.toDate()) || null, 
                endDate: new Date(doc.data().endDate.toDate()) || null,
                timestamp: SerializeNonPOJOs(doc.data().timestamp) || null
                });
        })}

    return {reviews, address}
}