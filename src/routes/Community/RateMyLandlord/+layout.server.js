import { redirect } from '@sveltejs/kit'

export const load = async({url, locals, cookies})=>{
    
    if(!locals.user){
        throw redirect(302, "/SignIn?redirect="+ url.pathname)
    }
    return {url: url.pathname}
}