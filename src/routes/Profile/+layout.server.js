import { redirect } from '@sveltejs/kit'

export const load = async ({locals, cookies})=>{

    const session = cookies.get('session');

    if(!session){
        throw redirect(302,"/SignIn")
        
    }


    const {user, app} = await locals.GetUserFromSession(session)


}