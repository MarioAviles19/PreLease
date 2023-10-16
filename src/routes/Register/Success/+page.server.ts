import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getAuth } from "firebase-admin/auth";
import {SendVerifyEmail} from "prelease";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

export const load : PageServerLoad = async({url, locals})=>{
    
    
    const userID = url.searchParams.get("u");
    if(userID){
        try{
            const userRecord = await getAuth(locals.app).getUser(userID);

            const tokenSnap = await getFirestore(locals.app).collection("Tokens").doc("SingleUse").collection("VerifyEmail").add({
                user : userRecord.uid,
                used: false,
                timestamp : FieldValue.serverTimestamp(),
            })
            //TODO: SEND EMAIL
            const res = await SendVerifyEmail(import.meta.env.VITE_EMAIL_PASSWORD, userRecord.email || "", tokenSnap.id, userID);
            console.log(res);
            console.log(userRecord.email);
            return {userEmail: userRecord.email}
        } catch{
            return {userEmail:  null};
        }
    } else{
        throw redirect(302, "/SignIn")
    }
}