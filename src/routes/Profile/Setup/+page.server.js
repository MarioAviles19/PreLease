import { redirect } from '@sveltejs/kit';
import * as adminFirestore from 'firebase-admin/firestore'

const {getFirestore} = adminFirestore;

export const actions = {
    default: async({request, locals, cookies})=>{
        const data = await request.formData();

        const user = locals.user;
        const app = locals.app;

        const gender = data.getAll('gender');
        const birthDate = data.get('birthDate');
        const demographics = data.getAll('demographics');

        //TODO: Ensure all data is valid and that it is all there
        
        await getFirestore(app).doc(`Users/${user.uid}`).set({setupComplete: true, gender: gender, birthDate : birthDate, demographics: demographics, completion: 1}, {merge:true})
        
        throw redirect(302, "/")
    }
}