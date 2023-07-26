export const SerializeNonPOJOs = (obj) =>{



    return JSON.parse(JSON.stringify(obj));
}