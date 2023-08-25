import { redirect } from '@sveltejs/kit';


export const load = async ({locals, cookies, url})=>{

    const {user, app} = await locals.GetUserFromSession(cookies.get('__session'));

    if(!user){
        throw redirect(302, "/SignIn?redirect=Profile/VerifyEmail")
    }
    return {url: url.host}
    

}