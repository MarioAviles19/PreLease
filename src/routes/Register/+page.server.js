
import {auth} from "firebase-admin"

export const load = async ({locals, cookies})=>{
    cookies.delete('session')
}


