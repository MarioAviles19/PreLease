export const SerializeNonPOJOs = (obj) =>{

    if(!obj){
        console.log("SerializeNonPOJOs was fed an undefined object");
        return {}
    }

    return JSON.parse(JSON.stringify(obj));
}