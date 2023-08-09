import { writable } from "svelte/store";
import { auth } from "$lib/firebase/firebase.client"
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, sendPasswordResetEmail, updateEmail, updatePassword} from "firebase/auth";




export const authState = writable({
    isLoading:true,
    currentUser:null,

})

export const authHandler = writable({
    //Sign User in Using Email and Password
    signUp: async (email, password)=>{

        return await createUserWithEmailAndPassword(auth, email, password);
    },
    //Sign Out User
    signOut: ()=>{
        signOut(auth)
    },
    resetPassword: async (email)=>{
        await sendPasswordResetEmail(auth, email)
    },
    updateEmail: async (email)=>{
        if(auth.currentUser == null){
            return;
        }
        updateEmail(auth.currentUser, email);
    },
    updatePassword: async(password)=>{
        if(auth.currentUser == null){
            return;
        }
        updatePassword(auth.currentUser, password)
    },
    signIn: async(email, password)=>{
        signInWithEmailAndPassword(auth, email, password);

    }
})