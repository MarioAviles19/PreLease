import { redirect } from '@sveltejs/kit'

export const load = async ({locals, cookies})=>{

    const session = cookies.get('__session');
    const {user, app} = await locals.GetUserFromSession(session || "")
    if(!user){
        throw redirect(302,"/SignIn")
        
    }





}