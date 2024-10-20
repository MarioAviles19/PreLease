import { redirect } from '@sveltejs/kit';

import * as adminFirestore from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const {getFirestore} = adminFirestore;

export const load = async({locals, cookies})=>{

    const user = locals.user;
    const app = locals.app;


    if(user){
        const userDoc = await getFirestore(app).doc(`Users/${user.uid}`).get();

        const userDocData = userDoc.data();
        

    }


}