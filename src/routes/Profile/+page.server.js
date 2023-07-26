import { redirect } from '@sveltejs/kit'



export const actions = {
    logout: ({request, cookies}) => {
        cookies.delete('session')
        throw redirect(302, "/SignIn")
    }
}