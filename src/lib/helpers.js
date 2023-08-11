export const SerializeNonPOJOs = (obj) =>{

    if(!obj){
        console.log("SerializeNonPOJOs was fed an undefined object");
        return null;
    }

    return JSON.parse(JSON.stringify(obj));
}


export const FormatDate = (event)=>{

    const dateRegex =  RegExp("[0-9]|Backspace")
    if(!dateRegex.exec(event.key)){
        event.preventDefault();
    }
    
}


//Extremely basic filter
//TODO: Improve this
export const bannedWordsRegex =  RegExp("(fuck|shit|bitch)")