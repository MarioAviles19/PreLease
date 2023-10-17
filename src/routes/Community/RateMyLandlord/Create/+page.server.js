import { fail, redirect } from '@sveltejs/kit';
import { SerializeNonPOJOs, bannedWordsRegex } from '$lib/helpers';
import * as adminFirestore from "firebase-admin/firestore";
import { updatePassword } from 'firebase/auth';

const {getFirestore, FieldValue, Timestamp} = adminFirestore;

export const load = async ({locals, request, cookies, url})=>{
    const user = locals.user;
    const app = locals.app;
    const pathname = url.pathname;
    const address = url.searchParams.get('address');
    if(!user){
        throw redirect(302, `/SignIn?redirect=${pathname + "?address=" + address}`);
    }
    //Check if the user already made a review
    const userReview = await getFirestore(app).collection('LandlordRatings').where("address","==", address).where("author", "==",user.uid).get();

    //May need to validate that there are no reviews from a given user on the form action as well.
    if(!userReview.empty){
        throw redirect(302, `/Community/RateMyLandlord/Search?address=${address}`)
    }
    return {address}
}

export const actions = {
    upload : async({locals, cookies, request, url})=>{

        const user = locals.user;
        const app = locals.app;

        const address = url.searchParams.get("address")
        const pathname = url.pathname;

        //Make sure the user should be creating a review

        //Redirect if there is no address in the search params
        if(!address){
            throw redirect(302, '/Community/RateMyLandlord');
        }

        //Redirect if the user isn't signed in
        if(!user){
            throw redirect(302, `/SignIn?redirect=${pathname+ "?address=" + address}`)
        }




        //Get the data from the form
        const maxComment = 250;

        const data = await request.formData();

     
        const overallRating = parseInt(data.get('overall'));
        const responsivenessRating = parseInt(data.get('responsiveness'));
        const managementRating = parseInt(data.get('management'));
        /**@type {string} */
        const comment = data.get('comments');


        const startMonth = data.get('startMonth');
        const startYear = data.get('startYear');

        const endMonth = data.get('endMonth');
        const endYear = data.get('endYear');

        //Format the dates as Date objects

        const startDate = new Date(startYear, startMonth);

        const endDate = new Date(endYear, endMonth);



        //Make sure the comment meets all of the requirements

        const reg = new RegExp(bannedWordsRegex)

        if(bannedWordsRegex.exec(comment)){
            //No swear words

            return fail(400, {comment, message: "Please do not use profanity"});
        }
        if(comment.length > maxComment){
            //Not longer than max-length
            return fail(400, {comment, message:"Comment too long"})
        }
        if(startDate > endDate){
            //The end date cannot be before the start date
            return fail(400, {comment, message: "Please ensure that start date is before end date"});
        }


        const firestore = getFirestore(app);
        //TODO: Add address validation
        //TODO: Look into promise.all();
        //TODO: Look into firestore Transactions
        const snapshot = await firestore.collection("LandlordRatings").add(
            {address, 
            comments : comment, 
            overallRating, 
            responsivenessRating, 
            managementRating, 
            startDate, 
            endDate, 
            timestamp: FieldValue.serverTimestamp(),
            author: user.uid 
        })

        const propertySnapshot = await firestore.collection("Properties").doc(address).get();

        const reviewCount = await firestore.collection("LandlordRatings").where("address", "==", address).count().get();

        console.log(reviewCount);
        const updatedProperty = await firestore.collection("Properties").doc(address).set({
            reviewCount: reviewCount.data().count,
            overallRating: ((parseInt(propertySnapshot.data()?.overallRating) || 0) + overallRating || 0) / (reviewCount.data().count || 1),
            managementRating: ((parseInt(propertySnapshot.data()?.managementRating) || 0) + managementRating || 0) / (reviewCount.data().count || 1),
            responsivenessRating: ((parseInt(propertySnapshot.data()?.responsivenessRating) || 0) + responsivenessRating || 0) / (reviewCount.data().count + 1 || 1)
            
            },{merge:true});
        
    


        throw redirect(302,`/Community/RateMyLandlord/Search?address=${address}`)

    }
}