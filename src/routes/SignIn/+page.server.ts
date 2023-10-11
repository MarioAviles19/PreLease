import { fail, redirect } from '@sveltejs/kit';
import * as adminAuth from 'firebase-admin/auth'; 
import type { PageServerLoad } from './$types.js';

export const load : PageServerLoad = async ({locals, url, request})=> {
    const redirect = url.searchParams.get('redirect')
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

        const data = await request.formData()
        const token = data.get("token") as string | null;
        const email = data.get("email");
        try{
            if(!token){
                return fail(403, {message:"Authentication Error: Please ensure that JavaScript is enabled"})
            }
        
        let cookie = await locals.CreateSessionCookie(token)
        
            cookies.set('__session', cookie, {maxAge: 1000 * 60 * 60 * 24 * 5, path:'/', secure:true})

        } catch (err) {

            return fail(401, {message: "invalid username or password", email});
        }
        throw redirect(302, redirectPath || '/');
    }
}
