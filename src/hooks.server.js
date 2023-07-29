// @ts-nocheck

import * as admin from 'firebase-admin'; 
import * as adminApp from 'firebase-admin/app'
import * as auth from 'firebase-admin/auth'
const {cert, initializeApp} = adminApp;
const {getAuth} = auth;






import { getApps, getApp, deleteApp} from "firebase-admin/app"
import {key} from "$lib/firebase/ServiceAccountKey"
import { redirect } from "@sveltejs/kit";



/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({event, resolve})=>{

    //Parse Cookies for use later on
    let rawCookies = event.request.headers.get('cookie') || '';

    let cookies = {};

    rawCookies.split(";").forEach(cookie =>{
        let [name, ...rest] = cookie.split("=");
        name = name?.trim();
        if(!name) return;
        const value = rest.join("=").trim()

        cookies[name] = decodeURIComponent(value);
        
    })
    //Function for getting user from session cookie used in .server.js files
    event.locals.GetUserFromSession = async (cookie)=>{

        let app;

        //if no firebaseApp entitled auth exists, initialize one
        try {
            app = getApp('auth');

        } catch (error) {
            if(error.errorInfo.code = 'app/no-app'){
                console.log(admin.credential)
                app = initializeApp({credential: cert(key)},'auth')
            }
        }

        if(!cookie){
            return {user: null, app: app}
        }


        let user = await getAuth(app).verifySessionCookie(cookie).then(async (decodedIdToken)=>{
            let user = await getAuth(app).getUser(decodedIdToken.uid)
           
            return user
        }).catch(err=>{
            if(err.errorInfo.code = 'auth/session-cookie-expired'){
                console.log("Session Expired")
            }
            console.log(err); return null
        });

        return {user: user, app : app}

    }
    //Function for creating session cookie used in .server.js files
    event.locals.createSessionCookie = async (token)=>{
        let app;

        try {
            getApp('alt');

        } catch (error) {
            if(error.errorInfo.code = 'app/no-app'){
                app = initializeApp({credential: credential.cert(key)},'alt')
            }
        }
    if(!getApps().length){
        app = initializeApp({credential: credential.cert(key)},'alt')
    } else{
        app = getApp('alt');
        deleteApp(app);
        app = initializeApp({credential: credential.cert(key)},'alt')

    }
        return await auth(app).createSessionCookie(token, {expiresIn: 1000 * 60 * 60 * 24 * 5})
    }

    
    

    return await resolve(event)

    
    
}