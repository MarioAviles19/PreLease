import { redirect } from '@sveltejs/kit';
import {auth} from 'firebase-admin';

export const load = async ({locals, cookies})=>{

    const {user, app} = await locals.GetUserFromSession(cookies.get('session'));

    if(!user){
        throw redirect(302, "/SignIn?redirect=Profile/VerifyEmail")
    }
    

}