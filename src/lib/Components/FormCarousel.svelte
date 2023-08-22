<script>
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    export let currentQuestionIndex = 0;
    /**@type {NodeListOf<HTMLFieldSetElement>}*/
    export let questions;

    let animate = false;
    let loaded = false;

    //TODO: Name this something better
    let currentQuestion;
    /**@type {HTMLFormElement}*/
    let form;
    /**@type {string}*/
    export let action;

    let nextDisabled = true;

    //Whenever the nextDisabled value is changed, update the data-answered attribute of the fieldset to 'true'
    //So that the nextDisabled value can persist when navigating
 

    //TODO: Add Google Maps API for the Cities field
    //TODO: Prevent default behavior on `enter` until the form is completed

    onMount(()=>{
        
        questions = form.querySelectorAll('fieldset');

        questions.forEach(el=>{
            //
        })

        HideOtherElements();
        form.style.display = '';
        loaded = true;
        currentQuestion = questions[0];



    })

    //use:action for enableing the 'next' button when the fieldset has an answer
    /**@param {HTMLElement} element*/
    function CheckFieldCompleted(element){
        element.addEventListener("input", ev => {CheckInputValue(ev)})
        element.addEventListener("click", ev => {CheckClickValue(ev)})
    }
    //Function to check if an input of a particular type (In this case 'type' and 'date')
    //has a value, and if so, enable the 'next' button by changing the value of 'nextDisabled' to false
    /**@param {Event} event*/
    function CheckInputValue(event){


        let fields = questions[currentQuestionIndex].querySelectorAll("input");

        let allValuesAnswered = true;
        fields.forEach(el=>{

            if(el.value == '' ){

                allValuesAnswered = false;
                //Reset outline color
                el.style.outlineColor = "";
                return;
            }
            //Check if the element has a data-minlength attribute
            
            if(el.dataset.minlength){
                
                if( el.value.length >= parseInt(el.dataset.minlength)){
                //Set the style to change the outline
                    el.style.outlineColor = "var(--color-theme-2)";
                }
                else if(el.dataset.phone && el.value.match("[0-9]+") && el.value.length == 10){
                    //Account for an unformatted phone number in autoComplete
                    //TODO:Fix this
                    el.style.outlineColor = "var(--color-theme-2)";

                }
                //If not, reset the style attribute
                else{
                    el.style.outlineColor = "";
                    allValuesAnswered = false;

                }
            }
            else{
               el.style.outlineColor = "var(--color-theme-2)"
            }

        })

        if(allValuesAnswered){
            nextDisabled = false;

        }
        else{
            nextDisabled = true;
        }
        AddAnsweredAttr()
        
    }
    //Function to check if a fieldset with clickable input has been clicked
    //And to enable the 'next' button
    /**@param {MouseEvent} event*/
    function CheckClickValue(event){
        const target = /**@type {HTMLInputElement}*/ (event.target);
        if(!target){
            return;
        }

        if(target.type == "radio"){

            nextDisabled = false;
            target.dataset.answered = "true";

            AddAnsweredAttr()
        }
    }
    //Hide all but the first fieldsets
    function HideOtherElements(){

        for(let i = 1; i < questions.length; i++){

            questions[i].style.display = "none";

        }
    }

    //Advance the form through the questions
    /**@param {number} index*/
    function AdvanceForm(index){
        if(currentQuestionIndex + index < 0){
            return
        }

        questions[currentQuestionIndex].style.display = "none";
        currentQuestionIndex += index;
        questions[currentQuestionIndex].style.display = "";

    

        //If the fieldset does not have the data-skippable attribute
        //disable the 'next' button
        if(!questions[currentQuestionIndex].dataset.skippable){
            nextDisabled = true;
        
        }
        //If the question has been answered, enable the 'next' button
        if(questions[currentQuestionIndex].dataset.answered){


            
            nextDisabled = false;

        }


    }

     
    function AddAnsweredAttr(){
        
        if(!questions){
            return;
        }
        questions[currentQuestionIndex].dataset.answered = `${!nextDisabled}`;

    }

    /**@param {KeyboardEvent} event*/
    function AdvanceOnEnter(event){
        let key = event.key
        if(key == "Enter" && !nextDisabled){
            AdvanceForm(1);
        }
    }

</script>

{#key animate}
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<form bind:this={form} on:keyup={AdvanceOnEnter}  use:CheckFieldCompleted method="POST" class="" action={action ?? ''} style={loaded? "": "display:none"}>
	


    <slot/>

    <div id="buttons">
        
        <button type="button" on:click={()=>{AdvanceForm(-1)}} id="backButton" disabled={currentQuestionIndex <= 0}>Back</button>
        
        {#if currentQuestionIndex + 1 < questions?.length}
        <button type="button" on:click={()=>{AdvanceForm(1)}} class="nextButton" disabled={nextDisabled}>Next</button>
        {:else}
        <button type="submit" class="nextButton">Finish</button>
        {/if}

    </div>

</form>
{/key}
<style>

	form {
		display: flex;
		flex-direction: column;

		margin:auto;


		width: 100%;
		font-size: 1.5rem;
        padding: 1rem;
        border-radius: 10px;
	}
    #buttons{
        margin:.5rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        padding:0 1rem;
    }
    #buttons button{
        font-size: 1.7rem;
        transition: all 200ms ease-out;
    }
    #buttons button:only-child{
        margin-left:auto;
    }
    #backButton{
        border:none;
        font-size:1.2rem;
        


    }
    #backButton:disabled{
        cursor: auto;
    }
    #backButton:hover{

    }
    
    button{
        background-color: var(--color-theme-2);
        color:white;
        padding: .2rem 1rem;
        border:none;
        border-radius: 5rem;
    }
    button:disabled{
        background: none;
        color:rgb(121, 121, 121);
        outline: 3px solid rgb(121, 121, 121);
    }

    @media only screen and (max-width: 520px){
        form{
            min-width:0;
            padding: 1rem .2rem;
            width:95%;
        }
        #buttons{
            padding:0 .5rem;
            
        }
    }
    </style>