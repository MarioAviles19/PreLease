export const SerializeNonPOJOs = (obj) =>{

    if(!obj){
        console.log("SerializeNonPOJOs was fed an undefined object");
        return null;
    }

    return JSON.parse(JSON.stringify(obj));
}
export const FormatPhoneNumberInput = (event)=>{
    const maxLength = 13;
    const numReg = RegExp('([0-9]|Enter|Backspace)')


    if(!event.key.match(numReg)){
    //if the input isn't a number, don't type the letter
    event.preventDefault();
    }

    else{
        if(event.key == "Backspace"){
            return;
        }
        if(event.target.value == ''){
            event.target.value = '('
        }
        else if(event.target.value.length == 4 ){
            event.target.value = event.target.value + ")"
        }
        else if(event.target.value.length == 8){
            event.target.value = event.target.value + "-"

        }
        else if(event.target.value.length == maxLength){
            event.preventDefault();
        }
    }

    
}