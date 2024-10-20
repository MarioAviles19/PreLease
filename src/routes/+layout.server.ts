
import * as admin from 'firebase-admin';
import * as adminAuth from 'firebase-admin/auth';

const {getAuth} = adminAuth;
import * as adminFirestore from 'firebase-admin/firestore';
const {getFirestore} = adminFirestore;
import { SerializeNonPOJOs } from "$lib/helpers";
import { redirect } from '@sveltejs/kit';



/**@type {import("./$types").LayoutServerLoad} */
export const load = async ({locals, cookies, url})=>{

    const user = locals.user;
    const app = locals.app;
    

    if(!user){
        cookies.delete('__session')
        return {userData : null}
     }
    let extraData = await getFirestore(app).doc(`Users/${user.uid}`).get()

    
    const token = await getAuth(app).createCustomToken(user.uid)



    return {userData : {...SerializeNonPOJOs(user), ...SerializeNonPOJOs(extraData.data() ?? {}), pfp : `https://api.dicebear.com/6.x/shapes/svg?seed=${user.uid}`}, userToken: token}
}