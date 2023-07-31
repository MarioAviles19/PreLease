import { redirect } from '@sveltejs/kit';
import * as adminFirestore from 'firebase-admin/firestore'

const {getFirestore} = adminFirestore;

export const actions = {
    default: async({request, locals, cookies})=>{
        const data = await request.formData();

        const {user, app} = await locals.GetUserFromSession(cookies.get('session'));

        const gender = data.getAll('gender');
        const birthDate = data.get('birthDate');
        const demographics = data.getAll('demographics');

        
        await getFirestore(app).doc(`Users/${user.uid}`).set({setupComplete: true, gender: gender, birthDate : birthDate, demographics: demographics}, {merge:true})
        
        throw redirect(302, "/Profile/CompletedSetup")
    }
}