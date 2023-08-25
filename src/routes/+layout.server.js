
import * as admin from 'firebase-admin';
import * as adminAuth from 'firebase-admin/auth';

const {getAuth} = adminAuth;
import * as adminFirestore from 'firebase-admin/firestore';
const {getFirestore} = adminFirestore;
import { SerializeNonPOJOs } from "$lib/helpers.js";
import { redirect } from '@sveltejs/kit';




export const load = async ({locals, cookies, url})=>{
    if(!cookies.get("__session")){
    
        
        return {userData : null, cookie: cookies.get("__session")}
    }
    const {user, app}  = await locals.GetUserFromSession(cookies.get('__session'))
    

    if(!user){
        cookies.delete('__session')
        return {userData : null}
     }
    let extraData = await getFirestore(app).doc(`Users/${user.uid}`).get()

    
    const token = await getAuth(app).createCustomToken(user.uid)



    return {userData : {...SerializeNonPOJOs(user), ...SerializeNonPOJOs(extraData.data() ?? null), pfp : `https://api.dicebear.com/6.x/shapes/svg?seed=${user.uid}`}, userToken: token}
}