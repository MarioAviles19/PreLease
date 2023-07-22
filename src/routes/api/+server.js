
export const GET = async ({locals, request, cookies})=>{
    console.log(request)

    console.log(cookies.get('session'))
    return new Response("Thanks for the request")
}