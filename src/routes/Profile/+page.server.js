import { redirect } from '@sveltejs/kit'

export const load = async ({locals, cookies})=>{


    console.log('LOCAL')
    console.log(locals.userData)

}

export const actions = {
    logout: ({request, cookies}) => {
        cookies.delete('session')
        throw redirect(302, "/SignIn")
    }
}