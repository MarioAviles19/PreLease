import qrcode from "qrcode"

export const GET = async ({locals, request, cookies,params,url})=>{
    
    let uid = url.searchParams.get("user");
    let SVG = await qrcode.toString(`${url.origin}/Records/${uid}`,{type:"svg", color:{light:"#00000000", dark:"#611e2c"}})
    
    return new Response(SVG)
}