import { redirect } from '@sveltejs/kit';

export const load = async({locals, cookies})=>{

    const {user, app} = await locals.GetUserFromSession(cookies.get('session'));

    
    if(user && !user.emailVerified){
        throw redirect(302, "/Profile/VerifyEmail");
    }

}