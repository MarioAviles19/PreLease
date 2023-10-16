import * as adminFirestore from 'firebase-admin/firestore'; 
const {getFirestore} = adminFirestore;
import { SerializeNonPOJOs } from '$lib/helpers';

/**@type {import('./$types').PageServerLoad} */
export const load = async ({locals, params, cookies})=>{

    const sessionCookie = cookies.get('__session');


    const {user, app} =  await locals.GetUserFromSession(sessionCookie || "")

    //TODO: Add Orderby Timestamp once index is built in console
    let reportsRaw = await getFirestore(app).collection('RentalHealthChecks').where('owner','==', params.user).orderBy('Timestamp', 'desc').get();
    
    /**@type {Array<Object>} */
    let reports = [];

    reportsRaw.forEach((doc)=>{
        reports.push(doc.data());
    })

    return {reports: SerializeNonPOJOs(reports)};
}