import { fail, redirect } from '@sveltejs/kit';
import { getAuth, signInWithEmailAndPassword, getIdToken} from 'firebase/auth'
import { getApp, initializeApp, deleteApp, getApps } from 'firebase/app';
import * as adminAuth from 'firebase-admin/auth'; 
const auth = adminAuth.getAuth;




const firebaseConfig = {
    apiKey: "AIzaSyD4h3h71nGHXhJcdd7BI7CTPPd2JIvMnyg",
    authDomain: "pl-rhc-data.firebaseapp.com",
    projectId: "pl-rhc-data",
    storageBucket: "pl-rhc-data.appspot.com",
    messagingSenderId: "464747479294",
    appId: "1:464747479294:web:c71cb642fd7e036fbe65af",
    measurementId: "G-WH8NV1E5LR"
};

export const load = async ({locals, url, request})=> {
    let redirect = url.searchParams.get('redirect')
    //If there is a 'redirect' searchParam return it
    //If not return home
    if(redirect){
        return {redirect: redirect}
    }
    else{
        return {redirect: '/'}
    }
}




export const actions = {
    login: async({ locals, request,cookies,url})=>{

        let redirectPath = url.searchParams.get('redirect');

        let firebaseApp;

        if(!getApps().length){
            firebaseApp = initializeApp(firebaseConfig)
        } else{
            firebaseApp = getApp();
            deleteApp(firebaseApp);
            firebaseApp = initializeApp(firebaseConfig);
        }

        let data = await request.formData()

        const email = data.get('email');
        const password = data.get('password');

        

        const _auth = getAuth(firebaseApp)
        try{
        let user = await signInWithEmailAndPassword(_auth, email, password)
        let token = await getIdToken(_auth.currentUser)
        let cookie = await locals.CreateSessionCookie(token)
        
            cookies.set('__session', cookie, {maxAge: 1000 * 60 * 60 * 24 * 5, path:'/', secure:true})

        } catch (err) {

           
        
            console.log(err)
            return fail(401, {message: "invalid username or password", email});
        }
        throw redirect(302, redirectPath || '/');
    }
}
