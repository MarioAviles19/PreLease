import { fail, redirect } from '@sveltejs/kit';
import { getAuth, signInWithEmailAndPassword, getIdToken} from 'firebase/auth'
import { getApp, initializeApp, deleteApp, getApps } from 'firebase/app';
import {auth} from "firebase-admin"




const firebaseConfig = {
    apiKey: "AIzaSyDcTQSTUEFxfAHV66vUOIK7fGgCx0Nv-c8",
    authDomain: "prelease-de6cf.firebaseapp.com",
    projectId: "prelease-de6cf",
    storageBucket: "prelease-de6cf.appspot.com",
    messagingSenderId: "890274296307",
    appId: "1:890274296307:web:d4e608ff11ab8d3418a286",
    measurementId: "G-RCKRT6Y9FB"
};




export const actions = {
    login: async({ locals, request,cookies})=>{
        let firebaseApp;

        if(!getApps().length){
            firebaseApp = initializeApp(firebaseConfig)
        } else{
            firebaseApp = getApp();
            deleteApp(firebaseApp);
            firebaseApp = initializeApp(firebaseConfig);
        }
        console.log('Running login')
        let data = await request.formData()

        let email = data.get('email');
        let password = data.get('password');

        

        const _auth = getAuth(firebaseApp)
        try{
        let user = await signInWithEmailAndPassword(_auth, email, password)
        let token = await getIdToken(_auth.currentUser)
        let cookie = await locals.createSessionCookie(token)
        
            cookies.set('session', cookie, {maxAge: 1000 * 60 * 60 * 24 * 5})

        } catch (err) {
            console.log(err)
            return fail(401, {message: err.code});
        }
        throw redirect(302, '/');
    }
}
