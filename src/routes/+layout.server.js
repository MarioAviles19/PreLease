
import * as admin from 'firebase-admin';
import * as adminAuth from 'firebase-admin/auth';
const {getAuth} = adminAuth;
import * as adminFirestore from 'firebase-admin/firestore';
const {getFirestore} = adminFirestore;
import { SerializeNonPOJOs } from "$lib/helpers.js";


export const load = async ({locals, cookies})=>{
    console.log(import.meta.env.MODE);
    if(!cookies.get('session')){
        console.log('no session')
        return {userData : null}
    }
    const {user, app}  = await locals.GetUserFromSession(cookies.get('session'))
    

     if(!user){
        cookies.delete('session')
        return {userData : null}
     }
     let extraData = await getFirestore(app).doc(`Users/${user.uid}`).get()


    const token = await getAuth(app).createCustomToken(user.uid)

    return {userData : {...SerializeNonPOJOs(user), ...SerializeNonPOJOs(extraData.data()), pfp : `https://api.dicebear.com/6.x/shapes/svg?seed=${user.uid}`}, userToken: token}
}