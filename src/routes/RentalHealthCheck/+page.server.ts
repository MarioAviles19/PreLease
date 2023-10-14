import type { Organization, RentalHealthCheckClient, RentalHealthCheckDB, Resource, ResourceClient, UserInfo } from '$lib/Interfaces/databaseTypes.js';
import { redirect } from '@sveltejs/kit'
import { getFirestore, Filter} from 'firebase-admin/firestore';
import { getStorage, getDownloadURL } from 'firebase-admin/storage';

export const load = async({locals, url})=>{

    const user = locals.user;
    const firestore = getFirestore(locals.app);
    const storage = getStorage(locals.app);
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
    const GetResources = async()=>{

        const userData = (await firestore.collection('Users').doc(user.uid).get()).data() as UserInfo

        const resourceSnap = await firestore.collection("Resources")
        .where(Filter.or(Filter.where("organization", "==", "PreLease"),Filter.where("organization", "==", userData.organization)))
        .limit(30)
        .get();

        let organizations : {[key : string] : Organization} = {};

        let resourceData : Array<ResourceClient> = []

        for(const doc of resourceSnap.docs){
            const data = doc.data() as Resource;

            data.id = doc.id;


            if(!Object.keys(organizations).includes(data.organization)){
                const orgSnap = await firestore.collection("Organizations").doc(data.organization).get();
                const orgData = orgSnap.data() as Organization;

                try{
                const iconFile = storage.bucket('pl-rhc-data.appspot.com').file(orgData?.iconRef || "null.png");

                const iconURL = await getDownloadURL(iconFile);

                organizations[orgSnap.id] = {...orgSnap.data(), icon: iconURL} as Organization

                } catch{

                }
            }

            resourceData.push({...data, organization: organizations[data.organization]});
        }
        return resourceData;
       
    }


    return {streamed: {healthChecks: getHealthChecks(), resources: GetResources()}}
}

