import { SerializeNonPOJOs } from '$lib/helpers.js'
import { redirect } from '@sveltejs/kit'
import {auth, firestore} from "firebase-admin"
import { Timestamp } from 'firebase-admin/firestore'
import { Interface } from 'readline'



export const load = async({locals, cookies})=>{
    
    const {user, app} = await locals.GetUserFromSession(cookies.get('session'))
    //If there is no user data, redirect to sign in
    if(!user){
        throw redirect(302, '/SignIn?redirect=RentalHealthCheck/Survey')
    }
    
    //const token = auth(app).createCustomToken(user.uid);
    return {userData: SerializeNonPOJOs(user), userToken: ''}
}

export const actions = {
    default : async ({locals, request, cookies})=>{
        const data = await request.formData()

        //Get the user from the session cookie and destructure it into the user and the app
        const {user, app} = await locals.GetUserFromSession(cookies.get('session'));

        let obj = {};

        //TODO: solve the 'Other' radio button issue where there is a value for the "other" option even if it isn't pressed

        //If the "Other" text input has been filled out and the city field is set to 'Other, set the city property to that
        if(data.get('cityOther') && data.get('city') == "Other"){
            data.set('city', data.get('cityOther'))
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

            console.log('Key: ' + key + ' Value: ' + value)
        })
        //Add the userID to the owner field so you can retrieve the user data later
        obj = {owner: user.uid, Timestamp: Timestamp.now(), ...obj}
        console.log(obj)

        //Add the document
        
        //TODO: Add rate limiting by checking the timestamp of the last report associated with each user
        
        firestore(app).collection('RentalHealthChecks').add(obj);

        //Can Delete
        console.log(data)
    }
}