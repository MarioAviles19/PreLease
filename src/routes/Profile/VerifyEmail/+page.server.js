import { redirect } from '@sveltejs/kit';


export const load = async ({locals, cookies})=>{

    const {user, app} = await locals.GetUserFromSession(cookies.get('session'));

    if(!user){
        throw redirect(302, "/SignIn?redirect=Profile/VerifyEmail")
    }
    

}