export const SerializeNonPOJOs = (obj) =>{

    if(!obj){
        console.log("SerializeNonPOJOs was fed an undefined object");
        return null;
    }

    return JSON.parse(JSON.stringify(obj));
}

//Extremely basic filter
//TODO: Improve this
export const bannedWordsRegex =  RegExp("(fuck|shit|bitch)")