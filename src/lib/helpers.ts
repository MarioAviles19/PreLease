
export const SerializeNonPOJOs = (obj : Object) =>{

    if(!obj){
        console.log("SerializeNonPOJOs was fed an undefined object");
        return null;
    }

    return JSON.parse(JSON.stringify(obj));
}


export const FormatPhoneNumberInput = (event : KeyboardEvent)=>{
    const maxLength = 13;
    const whitelistReg = RegExp('(Enter|Backspace|Tab|ArrowLeft|ArrowRight|ArrowUp|ArrowDown)')
    const numReg = RegExp('([0-9])')
    const target = /**@type {HTMLInputElement} */(event.target);

    if(!event.key){
        return;
    }
    if(event.key?.match(whitelistReg)){
        return
    }


    if(!event.key.match(numReg)){
    //if the input isn't a number, don't type the letter
    event.preventDefault();
    }

    else{
        if(event.key == "Backspace"){
            return;
        }
        if(target.value == ''){
            target.value = '('
        }
        else if(target.value.length == 4 ){
            target.value = target.value + ")"
        }
        else if(target.value.length == 8){
            target.value = target.value + "-"

        }
        else if(target.value.length == maxLength){
            event.preventDefault();
        }
    }

    
}

export const PhoneNumberAutoComplete = (event : Event)=>{

    //Make sure the autocomplete happened correctly
    const digitsReg = new RegExp("[0-9]+")
    const target = /**@type {HTMLInputElement} */(event.target);
    if(!target){
        return;
    }

    //Ensure that the the autocomplete did what we expect
    if(target.value.match(digitsReg) && target.value.length == 10){
        const value = target.value;
        //Split the value into the digits we need
        const areaCode = value.substring(0,3);
        const firstThree = value.substring(3,6);
        const lastFour = value.substring(6,10)


        target.value = `(${areaCode})${firstThree}-${lastFour}`
    }
}


export const FormatDate = (event : KeyboardEvent)=>{
    const whitelistRegex = RegExp("Backspace|Tab");
    const dateRegex =  RegExp("[0-9]")


    const target = /**@type {HTMLInputElement} */(event.target);
    if(!target){
        return
    }

    if(whitelistRegex.exec(event.key)){
        return;
    }

    if(!dateRegex.exec(event.key)){
        event.preventDefault();
        return;
    }

    

    if(target.dataset.form == "month"){
        const keyAsInt = parseInt(event.key);
        const valueAsInt = parseInt(target.value);

        if(keyAsInt && valueAsInt){
            if(valueAsInt * 10 + keyAsInt > 12){

                event.preventDefault();
                return;
            }
        }


        if(target.value.length == 2 && target.value == "01"){

            target.value = `1${event.key}`
        }
        if(target.value.length == 0){
            target.value = `0${event.key}`;
        }

    }

    
}

export function FormatStringAsPhoneNumber(str : string){


    if(str.length == 10){
        const areaCode = str.slice(0,3);
        const firstThree = str.slice(3,6);
        const lastFour = str.slice(6,11);

        return `(${areaCode})${firstThree}-${lastFour}`;
    }
    if(str.length == 7){
        const firstThree = str.slice(0,3);
        const lastFour = str.slice(3,8);

        return `${firstThree}-${lastFour}`;
    }

    
    return str;
}


//Extremely basic filter
//TODO: Improve this
export const bannedWordsRegex =  RegExp("(fuck|shit|bitch)")

export function Capitalize(text : string){
    const firstLetter = text.charAt(0);
    const headlessString = text.slice(1);

    return firstLetter.toUpperCase() + headlessString;}
