import { redirect } from '@sveltejs/kit';

import * as adminFirestore from 'firebase-admin/firestore';

const {getFirestore} = adminFirestore;

export const load = async({locals, cookies})=>{

    const {user, app} = await locals.GetUserFromSession(cookies.get('__session'));
    
    if(user){
        const userDoc = await getFirestore(app).doc(`Users/${user.uid}`).get();

        const userDocData = userDoc.data();
        
        if(!user.emailVerified){
            throw redirect(302, "/Profile/VerifyEmail");
        }
        if (!userDocData?.setupComplete){
            throw redirect(302, "/Profile/Setup")
        }
    }

}