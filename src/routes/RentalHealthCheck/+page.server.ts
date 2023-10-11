import type { RentalHealthCheckClient, RentalHealthCheckDB } from '$lib/Interfaces/databaseTypes.js';
import { SerializeNonPOJOs } from '$lib/helpers.js'
import { redirect } from '@sveltejs/kit'
import { getFirestore } from 'firebase-admin/firestore';

export const load = async({locals, url})=>{

    const user = locals.user;
    const firestore = getFirestore(locals.app);
    if(!user){
        throw redirect(302, "/SignIn?redirect=" + url.pathname)
    }
    if(!user.emailVerified){

        throw redirect(302, "/VerifyEmail")
    }

    const getHealthChecks = async()=>{
        const healthCheckSnap = await firestore.collection("RentalHealthChecks").where("owner", "==", user.uid).orderBy("timestamp", "desc").limit(15).get();


        const healthCheckData : Array<RentalHealthCheckClient> = healthCheckSnap.docs.map(doc=>{return {...doc.data() as RentalHealthCheckClient, id: doc.id, timestamp : new Date(doc.data().timestamp._seconds * 1000)}})

        

        return healthCheckData;
    }


    return {streamed: {healthChecks: getHealthChecks()}}
}

