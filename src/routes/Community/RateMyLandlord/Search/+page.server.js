export const load = async ({locals, url})=>{

    return {address: url.searchParams.get('address')}
}