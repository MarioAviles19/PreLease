import qrcode from "qrcode"

export const GET = async ({locals, request, cookies,params,url})=>{
    
    let uid = url.searchParams.get("user");
    let dataURL = await qrcode.toString(`${url.origin}/records/${uid}`,{type:"svg", color:{light:"#00000000", dark:"#763946"}})
    
    return new Response(dataURL)
}