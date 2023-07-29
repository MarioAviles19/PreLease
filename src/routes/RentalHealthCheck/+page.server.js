import { SerializeNonPOJOs } from '$lib/helpers.js'
import { redirect } from '@sveltejs/kit'
import * as pkg from 'firebase-admin'; 
const {auth} = pkg;

export const load = async({locals, cookies})=>{
    const {user, app} = await locals.GetUserFromSession(cookies.get('session'))
    
    //const token = auth(app).createCustomToken(user.uid);
    return {userData: SerializeNonPOJOs(user), userToken: ''}
}

