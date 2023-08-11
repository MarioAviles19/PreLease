import { fail, redirect } from '@sveltejs/kit';
import { SerializeNonPOJOs, bannedWordsRegex } from '$lib/helpers.js';
export const actions = {
    upload : async({locals, cookies, request})=>{

        const maxComment = 250;

        const data = await request.formData();

        const overall = data.get('overall');
        const responsiveness = data.get('responsiveness');
        const management = data.get('management');

        /**@type {string} */
        const comments = data.get('comments');

        const reg = new RegExp(bannedWordsRegex)

        if(bannedWordsRegex.exec(comments)){
            console.log("match")
            return fail(400, {comments:"Profanity", message: "Please do not use profanity"});
        }
        if(comments.length > maxComment){
            return fail(400, {comments, message:"Comment too long"})
        }

        throw redirect(302,"/Community/RateMyLandlord")

    }
}