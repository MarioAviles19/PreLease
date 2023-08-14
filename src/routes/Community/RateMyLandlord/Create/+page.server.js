import { fail, redirect } from '@sveltejs/kit';
import { SerializeNonPOJOs, bannedWordsRegex } from '$lib/helpers.js';

export const load = async ({locals, request, cookies, url})=>{
    const {user, app} = await locals.GetUserFromSession(cookies.get('session'));
    const pathname = url.pathname;
    const address = url.searchParams.get('address');
    if(!user){
        throw redirect(302, `/SignIn?redirect=${pathname + "?address=" + address}`);
    }
    return {address}
}

export const actions = {
    upload : async({locals, cookies, request, url})=>{


        const maxComment = 250;


        const data = await request.formData();

        const overall = data.get('overall');
        const responsiveness = data.get('responsiveness');
        const management = data.get('management');


        const startMonth = data.get('startMonth');
        const startYear = data.get('startYear');

        const endMonth = data.get('endMonth');
        const endYear = data.get('endYear');

        const startDate = new Date(startYear, startMonth);

        const endDate = new Date(endYear, endMonth);





        /**@type {string} */
        const comments = data.get('comments');

        const reg = new RegExp(bannedWordsRegex)

        if(bannedWordsRegex.exec(comments)){
            console.log("match")
            return fail(400, {comments, message: "Please do not use profanity"});
        }
        if(comments.length > maxComment){
            return fail(400, {comments, message:"Comment too long"})
        }
        if(startDate > endDate){
            return fail(400, {comments, message: "Please ensure that start date is before end date"});
        }




        throw redirect(302,"/Community/RateMyLandlord")

    }
}