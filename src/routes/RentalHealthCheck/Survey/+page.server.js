import { SerializeNonPOJOs } from '$lib/helpers.js'
import { redirect } from '@sveltejs/kit'
import * as adminAuth from 'firebase-admin/auth'; 
const {getAuth} = adminAuth;
import * as adminFirestore from 'firebase-admin/firestore'
const{ getFirestore,Timestamp} = adminFirestore

import * as admin from 'firebase-admin';


import { Interface } from 'readline'
import { fail } from 'assert';


/**@type {import('./$types').PageServerLoad} */
export const load = async({locals, cookies})=>{

    const sessionCookie = cookies.get('__session')
    
    const {user, app} = await locals.GetUserFromSession(sessionCookie || "")
    //If there is no user data, redirect to sign in
    if(!user){
        throw redirect(302, '/SignIn?redirect=RentalHealthCheck/Survey')
    }
    
    //const token = auth(app).createCustomToken(user.uid);
    return {userData: SerializeNonPOJOs(user)}
}
/**@type {import('./$types').Actions} */
export const actions = {
    default : async ({locals, request, cookies})=>{
        const data = await request.formData()
        const sessionCookie = cookies.get('__session')

        //Get the user from the session cookie and destructure it into the user and the app
        const {user, app} = await locals.GetUserFromSession(sessionCookie || "");
        if(!user){
            //Handle this;
            return;
        }

        /**@type {{[key: string] : any}} */
        let obj;

        //TODO: solve the 'Other' radio button issue where there is a value for the "other" option even if it isn't pressed

        //If the "Other" text input has been filled out and the city field is set to 'Other, set the city property to that
        if(data.get('cityOther') && data.get('city') == "Other"){
            data.set('city', /**@type {string}*/(data.get('cityOther')))
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
        obj = {owner: user.uid, Timestamp: Timestamp.now(), ...obj}


        //Add the document
        await getFirestore(app).collection('RentalHealthChecks').add(obj);
        
        //TODO: Add rate limiting by checking the timestamp of the last report associated with each user



        //Redirect to success page

        throw redirect(302,'/RentalHealthCheck/Success')
    }
}