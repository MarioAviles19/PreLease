import type { FirebaseTimestamp } from "$lib/Interfaces/databaseTypes.js";
import { redirect } from "@sveltejs/kit";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

export const GET = async({request,url, locals, cookies})=>{
    
    const userID = url.searchParams.get("u");
    const token = url.searchParams.get("token");

    if(!token || !userID){
        return new Response(null, {headers: {Location: "/TokenExpired"}, status : 302});
    }


    const tokenSnap = await getFirestore(locals.app).collection("Tokens").doc("SingleUse").collection("VerifyEmail").doc(token).get();

    const tokenData = tokenSnap.data() as {timestamp : FirebaseTimestamp, used : boolean, user: string};


    if(!tokenSnap.exists){
        return new Response(null, {headers: {Location: "/TokenExpired"}, status : 302});
    }
    if(tokenData.user != userID || tokenData.used == true){
        return new Response(null, {headers: {Location: "/TokenExpired"}, status : 302});
    }
    const auth = getAuth(locals.app);
    try{
        await auth.updateUser(tokenData.user, {
            emailVerified : true
        })
    } catch (error){
        console.error(error);
        return new Response(null, {headers: {Location: "/TokenExpired"}, status : 302});
    }

    const res = new Response(null, {headers: {Location: locals.user? "/": "/SignIn"}, status : 302});
    
    return res;
}

