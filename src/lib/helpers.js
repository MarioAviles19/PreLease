export const SerializeNonPOJOs = (obj) =>{

    if(!obj){
        console.log("SerializeNonPOJOs was fed an undefined object");
        return null;
    }

    return JSON.parse(JSON.stringify(obj));
}


export const FormatDate = (event)=>{
    const whitelistRegex = RegExp("Backspace|Tab");
    const dateRegex =  RegExp("[0-9]")

    if(whitelistRegex.exec(event.key)){
        return;
    }

    if(!dateRegex.exec(event.key)){
        event.preventDefault();
        return;
    }

    if(event.target.dataset.form == "month"){
        const keyAsInt = parseInt(event.key);
        const valueAsInt = parseInt(event.target.value);

        if(keyAsInt && valueAsInt){
            if(valueAsInt * 10 + keyAsInt > 12){
                console.log("Prevent")
                event.preventDefault();
                return;
            }
        }
        console.log(event.target.value.length)

        if(event.target.value.length == 2 && event.target.value == "01"){

            event.target.value = `1${event.key}`
        }
        if(event.target.value.length == 0){
            event.target.value = `0${event.key}`;
        }

    }

    
}


//Extremely basic filter
//TODO: Improve this
export const bannedWordsRegex =  RegExp("(fuck|shit|bitch)")