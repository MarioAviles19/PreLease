import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getAuth } from "firebase-admin/auth";
import { sendEmailVerification } from "firebase/auth";
import { FieldValue, getFirestore } from "firebase-admin/firestore";


export const load : PageServerLoad = async({url, locals})=>{
    
    
    const userID = url.searchParams.get("u");
    if(userID){
        try{
            const userRecord = await getAuth(locals.app).getUser(userID);

            const existingTokensSnap = await getFirestore(locals.app).collection("Tokens").doc("SingleUse").collection("VerifyEmail").where("user", "==", userID).get();

            for(const doc of existingTokensSnap.docs){
                await getFirestore(locals.app).collection("Tokens").doc("SingleUse").collection("VerifyEmail").doc(doc.id).delete();
            }

            const tokenSnap = await getFirestore(locals.app).collection("Tokens").doc("SingleUse").collection("VerifyEmail").add({
                user : userRecord.uid,
                used: false,
                timestamp : FieldValue.serverTimestamp(),
            })
           

            return {userEmail: userRecord.email}
        } catch (error){
            console.log(error);
            return {userEmail:  null};
        }
    } else{
        throw redirect(302, "/SignIn")
    }
}