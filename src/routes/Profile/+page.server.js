import { redirect } from '@sveltejs/kit'



export const actions = {
    logout: ({request, cookies}) => {
        cookies.delete('__session')
        throw redirect(302, "/SignIn")
    }
}