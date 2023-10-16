import {  fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types"
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage, getDownloadURL } from "firebase-admin/storage";
import type { Organization } from "$lib/Interfaces/databaseTypes";

function ValidateData(data : FormData, required : Array<string>){
    let valid = true;
    for (let i = 0; i < required.length; i++) {
        let dataPoint = data.get(required[i]);

        if(!dataPoint){
            valid = false;
        }
        
    }

    return valid;
}

export const load : PageServerLoad = async ({locals, cookies, url})=>{
    cookies.delete('__session');

    const orgID = url.searchParams.get("ref");

    if(orgID){
        const orgSnap = await getFirestore(locals.app).collection("Organizations").doc(orgID).get();

        if(!orgSnap.exists){
            return {orgData : null}
        }

        const iconFile = getStorage(locals.app).bucket("pl-rhc-data.appspot.com").file("Buggy/star2.png");
    
        const iconURL = await getDownloadURL(iconFile);



        return {orgData:{...orgSnap.data() as Organization, id: orgSnap.id, icon : iconURL}};
    } else{
        return {orgData : null}
    }


}

export const actions : Actions = {
    register : async({request, locals, url})=>{
        const data = await request.formData()

        const valid = ValidateData(data, ["firstName", "lastName", "email", "password"])

        if(!valid){
            return fail(400, {message: "Please fill out all fields"})
        }

        const firstName = data.get("firstName") as string;
        const lastName = data.get("lastName") as string;
        const email = data.get("email") as string;
        const password = data.get("password") as string;
        const orgID = url.searchParams.get("org");



        

        //Gonna need to fix this
        const {app} = await locals.GetUserFromSession("");
        const auth = getAuth(app);

        let newUser;
        try{
        newUser = await auth.createUser({email: email, password: password, displayName: firstName});

        } catch (error){
            
            return fail(400, {message: error.message});
        }
        try{
        const userDocSnap = getFirestore(app).collection("Users").doc(newUser.uid).set({firstName, lastName, email, organization : orgID || "PreLease", role : "member"});
        } catch (error){
            return fail(400, {message: error.message});
        }
        throw redirect(302, "/Register/Success?u=" + newUser.uid)
    }
}
