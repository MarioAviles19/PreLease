export const actions = {
    Upload : async ({locals,request, cookies})=>{

        const data = await request.formData()

        console.log(data);
    }
}