import { redirect } from "@sveltejs/kit"
import * as adminFirebase from "firebase-admin/firestore"
const {getFirestore} = adminFirebase



export const load = async ({locals, cookies})=>{
    const {user, app} = await locals.GetUserFromSession(cookies.get('session')|| "")

    if(!user){
        throw redirect(302, "/SignIn?redirect/Profile/RentalResume")
    }

    const userSnapshot = await getFirestore(app).collection('Users').doc(user.uid).get()

    const userData = userSnapshot.data()

    if(!userData?.rentalResumeCompleted){
        throw redirect(302, "/Profile/RentalResume/Create")
    }

}