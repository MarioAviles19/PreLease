import { SerializeNonPOJOs } from '$lib/helpers'
import { redirect } from '@sveltejs/kit'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore, FieldValue} from 'firebase-admin/firestore'
import type { PageServerLoad } from './$types.js';
import type { UserInfo } from '$lib/Interfaces/databaseTypes.js';




export const load : PageServerLoad = async({locals, cookies})=>{

    const user = locals.user;
    //If there is no user data, redirect to sign in
    if(!user){
        throw redirect(302, '/SignIn?redirect=RentalHealthCheck/Survey')
    }
    
    
}
export const actions = {
    default : async ({locals, request})=>{
        const data = await request.formData()

        const user = locals.user;
        const app = locals.app;
        if(!user){
            throw redirect(302, '/SignIn?redirect=RentalHealthCheck/Survey');
        }

        const userData = (await getFirestore(app).collection("Users").doc(user.uid).get()).data() as UserInfo;


        let obj : {[key : string] : any} = {};

        //TODO: solve the 'Other' radio button issue where there is a value for the "other" option even if it isn't pressed

        //If the "Other" text input has been filled out and the city field is set to 'Other, set the city property to that
        if(data.get('cityOther') && data.get('city') == "Other"){
            data.set('city', data.get('cityOther') as string)
            data.delete('cityOther')
        }
        //Add the form data to an intermediary object before adding it to the 'RentalHealthChecks' collection
        data.forEach((value, key)=>{
            //If there are more than one pieces of data associated with a key, get all of them instead of just one
            if(data.getAll(key).length > 1){
                obj[key] = data.getAll(key);
            }
            else{
                obj[key] = data.get(key)
            }


        })
        //Add the userID to the owner field so you can retrieve the user data later
        obj = {...obj, owner: user.uid, timestamp: FieldValue.serverTimestamp(), income : parseInt(data.get("income") as string || ""), organization: userData.organization || "PreLease", requestConsult : obj.requestConsult == "on"? true : false }


        //Add the document
        const doc = await getFirestore(app).collection('RentalHealthChecks').add(obj);
        
        //TODO: Add rate limiting by checking the timestamp of the last report associated with each user

        //TODO: Send an email on completion

        //Redirect to success page

        return{status: 200, message: "Your Rental Health Check was successfully uploaded", healthCheckID: doc.id}
    }
}