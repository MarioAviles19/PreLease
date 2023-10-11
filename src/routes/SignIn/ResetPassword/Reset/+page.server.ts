import { error, fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import type { Actions } from "./$types";
import type { ResetPasswordToken } from "$lib/Interfaces/databaseTypes";

export const load : PageServerLoad = async({url, locals})=>{

    const token = url.searchParams.get("token");

    if(!token){
        throw redirect(302, "/SignIn")
    }

    const firestore = getFirestore(locals.app);
    const tokenSnap = await firestore.collection("Tokens").doc("SingleUse").collection("ResetPassword").doc(token).get();

    if(!tokenSnap.exists){
        throw redirect(302, "/TokenExpired");
    }
    if(tokenSnap.data()?.used){
        throw redirect(302, "/TokenExpired");
    }

    return {token : tokenSnap.id};
}

export const actions : Actions = {

    ResetPassword : async({request, locals})=>{
        const data = await request.formData()

        const token = data.get("token") as string|null;
        const newPassword = data.get("password") as string|null;

        if(!newPassword){
            return fail(400, {message: "Please enter all required fields"})
        }
        if(!token){
            return fail(400, {message: "An Error Occured: Please ensure JavaScript is enabled"});
        }
        const firestore = getFirestore(locals.app);

        const tokenSnap = await firestore.collection("Tokens").doc("SingleUse").collection("ResetPassword").doc(token).get();

        if(!tokenSnap.exists){
            throw redirect(302, "/TokenExpired");
        }
        
        const tokenData = tokenSnap.data() as ResetPasswordToken;

        if(tokenData.used){
            throw redirect(302, "/TokenExpired");
        }

        //Reset the password
        try{
            const auth = getAuth(locals.app);
            const userRecord = await auth.getUserByEmail(tokenData.email);

            const result = await auth.updateUser(userRecord.uid,{
                password: newPassword,
            })

        } catch (error){

            if(error.code == "auth/invalid-password"){
                return fail(400, {message:error.message || "Unknown error"})
            }

            throw redirect(302, "/TokenExpired");
        }
        await firestore.collection("Tokens").doc("SingleUse").collection("ResetPassword").doc(tokenSnap.id).set(
            {used: true, usedTime: FieldValue.serverTimestamp()}, {merge:true});
            
            return {status : 200}
        }


}