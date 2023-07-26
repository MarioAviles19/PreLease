
import {auth, firestore} from "firebase-admin"
import { SerializeNonPOJOs } from "$lib/helpers.js";


export const load = async ({locals, cookies})=>{
    if(!cookies.get('session')){
        console.log('no session')
        return {userData : null}
    }
    const {user, app}  = await locals.GetUserFromSession(cookies.get('session'))
    

     if(!user){
        cookies.delete('session')
        return {userData : null}
     }
     let extraData = await firestore(app).doc(`Users/${user.uid}`).get()


    const token = await auth(app).createCustomToken(user.uid)
    return {userData : {...SerializeNonPOJOs(user), ...SerializeNonPOJOs(extraData.data()), pfp : `https://api.dicebear.com/6.x/shapes/svg?seed=${user.uid}`}, userToken: token}
}