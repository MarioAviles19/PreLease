import * as adminFirestore from 'firebase-admin/firestore'; 
const {getFirestore} = adminFirestore;
import { SerializeNonPOJOs } from '$lib/helpers.js';

export const load = async ({locals, params, cookies})=>{
    console.log(params.user);

    const {user, app} =  await locals.GetUserFromSession(cookies.get('session'))

    //TO5DO: Add Orderby Timestamp once index is built in console
    let reportsRaw = await getFirestore(app).collection('RentalHealthChecks').where('owner','==', params.user).orderBy('Timestamp', 'desc').get();
    
    
    let reports = [];

    reportsRaw.forEach((doc)=>{
        reports.push(doc.data());
    })

    return {reports: SerializeNonPOJOs(reports)};
}