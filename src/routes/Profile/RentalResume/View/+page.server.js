import { SerializeNonPOJOs } from "$lib/helpers";
import { redirect } from "@sveltejs/kit";
import * as adminFirestore from "firebase-admin/firestore"
const {getFirestore} = adminFirestore

/**@type {import("./$types").PageServerLoad} */
export const load = async({locals, cookies})=>{
    const sessionCookie = cookies.get('session')

    const {user, app} = await locals.GetUserFromSession(sessionCookie || "");

    if(!user){
        throw redirect(302, "/SignIn?redirect=Profile/RentalResume/View")
    }
    const snapshot = await getFirestore(app).collection("RentalResumes").where("author", "==", user.uid).limit(1).get();

    const document = snapshot.docs[0];

    const docData = /**@type {import("$lib/Interfaces/databaseTypes").RentalResume} */({...document.data() });


    
    const data = /**@type {import("$lib/Interfaces/databaseTypes").RentalResume} */ ({id: document.id, ...SerializeNonPOJOs(docData)})

    return {resume: data}
}