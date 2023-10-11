import { SendResetPasswordEmail } from "prelease";
import type { Actions } from "../$types";
import { fail } from "@sveltejs/kit";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";


export const actions : Actions = {
    ResetPassword : async({request, locals})=>{

        //TODO: Make sure that you delete the old token before making a new one
        
        const data = await request.formData();

        const email = data.get("email") as string | null;

        if(!email){
            return fail(400, {message: "No email supplied"})
        }

        const firestore = getFirestore(locals.app);
        const auth = getAuth(locals.app);

        const potentialTokens = await firestore.collection("Tokens").doc("SingleUse").collection("ResetPassword").where("email", "==", email).limit(5).get();

        //TODO: Probably don't need this if statement actually
        if(potentialTokens.docs.length > 0){

            for (let i = 0; i < potentialTokens.docs.length; i++) {
                await firestore.collection("Tokens").doc("SingleUse").collection("ResetPassword").doc(potentialTokens.docs[i].id).delete();
                
            }

        }
        try{
        const potentialUser = await auth.getUserByEmail(email);

        } catch (error){
            return {status: 200, message: "Email sent"};
        }


        const newToken = await firestore.collection("Tokens").doc("SingleUse").collection("ResetPassword").add({timestamp : FieldValue.serverTimestamp(), used : false, email : email});

        
        const res = await SendResetPasswordEmail(import.meta.env.VITE_EMAIL_PASSWORD, email, newToken.id)
        console.log(res);
        return {status: 200, message: "Email sent"}; 
    }
}