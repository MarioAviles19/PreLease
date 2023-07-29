
import * as pkg from 'firebase-admin'; 
const {auth} = pkg;

export const load = async ({locals, cookies})=>{
    cookies.delete('session')
}


