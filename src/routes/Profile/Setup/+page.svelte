<script>
    import { onMount } from "svelte";
    let currentQuestionIndex = 0;
    /**@type {HTMLElement}*/
    let form;

    /**@type {NodeListOf<HTMLFieldSetElement>}*/
    let questions;

    let nextDisabled = true;

    //Whenever the nextDisabled value is changed, update the data-answered attribute of the fieldset to 'true'
    //So that the nextDisabled value can persist when navigating
 

    //TODO: Add Google Maps API for the Cities field
    //TODO: Prevent default behavior on `enter` until the form is completed

    onMount(()=>{
        
        questions = form.querySelectorAll('fieldset');
        HideOtherElements();
        form.style = '';

    })

    //use:action for enableing the 'next' button when the fieldset has an answer
    /**@param {Element} element*/
    function CheckFieldCompleted(element){
        element.addEventListener("input", ev => {CheckInputValue(ev)})
        element.addEventListener("click", ev => {CheckClickValue(ev)})
    }
    //Function to check if an input of a particular type (In this case 'type' and 'date')
    //has a value, and if so, enable the 'next' button by changing the value of 'nextDisabled' to false
    /**@param {Event} event*/
    function CheckInputValue(event){
        if(event.target.type == "text" || event.target.type == "date"){
            if(event.target.value != ""){
                nextDisabled = false;
            }
            else{
                nextDisabled = true;
            }
            AddAnsweredAttr()
        }
    }
    //Function to check if a fieldset with clickable input has been clicked
    //And to enable the 'next' button
    /**@param {Event} event*/
    function CheckClickValue(event){
        if(event.target.type == "radio"){

            nextDisabled = false;
            event.target.dataset.answered = true

            AddAnsweredAttr()
        }
    }
    //Hide all but the first fieldsets
    function HideOtherElements(){

        for(let i = 1; i < questions.length; i++){

            questions[i].style = "display:none";

        }
    }

    //Advance the form through the questions
    /**@param {number} index*/
    function AdvanceForm(index){
        if(currentQuestionIndex + index < 0){
            return
        }
        questions[currentQuestionIndex].style = "display:none";
        currentQuestionIndex += index;
        questions[currentQuestionIndex].style = "";

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
        questions[currentQuestionIndex].dataset.answered = !nextDisabled;

    }

</script>

<h1>Complete Account Setup</h1>

<form bind:this={form} method="POST" style="display:none">
	
    <label for="progress">Progress:</label>
    <progress id='Progress' value={currentQuestionIndex} max={questions?.length - 1 ?? 0}></progress>

    <fieldset use:CheckFieldCompleted  class="selection question">
        <legend>What city do you currently live in?</legend>
        <p class="note">PreLease is currently only serving the Minneapolis, MN metro area</p>
        
        <div class="response">
            <input type="text" placeholder="City">
            
        </div>
    </fieldset>
    

    <fieldset use:CheckFieldCompleted class="selection question" >
        <legend>Please Identify Your Gender</legend>
        
        <div class="response">
            <input type="radio" id="man" value="man" name="gender" >
            <label for="man">Man</label>
        </div>

        <div class="response">
            <input type="radio" id="woman" value="woman" name="gender">
            <label for="woman">Woman</label>
        </div>

        <div class="response">
            <input type="radio" id="nonBinary" value="Non-Binary" name="gender">
            <label for="nonBinary">Non-Binary</label>
        </div>

        <div class="response">
            <input type="radio" id="noGender" value="n/a" name="gender">
            <label for="noGender">Prefer Not To Say</label>
        </div>
    </fieldset>

    <fieldset use:CheckFieldCompleted  class="selection question">
        <legend>What is your Date of Birth?</legend>
        
        <div class="response">
            <label for="birthDate" class="block">Birthday</label>
            <input type="date" id="birthDate" name="birthDate">
            
        </div>
    </fieldset>

    

    <fieldset class="selection question sideBySide">
        <legend class="smallText">Do you identify with any of these categories? [Check all that apply]</legend>
        
        <div class="response">
            <input type="checkbox" id="homeless" value="Homeless" name="demographics">
            <label for="homeless">Homeless or Imminent Homelessness</label>
        </div>
        
        <div class="response">
            <input type="checkbox" id="substanceAbuse" value="In Recovery From Substance Abuse" name="demographics">
            <label for="substanceAbuse">In Recovery From Substance Abuse</label>
        </div>
        
        <div class="response">
            <input type="checkbox" id="student" value="University Student" name="demographics">
            <label for="student">University Student</label>
        </div>
        
        <div class="response">
            <input type="checkbox" id="nonCitizen" value="Non-Citizen" name="demographics">
            <label for="nonCitizen">Non-US Citizen</label>
        </div>
        
        <div class="response">
            <input type="checkbox" id="veteran" value="Veteran" name="demographics">
            <label for="veteran">Veteran</label>
        </div>
    
    
        <div class="response">
            <input type="checkbox" id="disability" value="Disability" name="demographics">
            <label for="disability">Disability (Physical or Mental)</label>
        </div>
        
        <div class="response">
            <input type="checkbox" id="language" value="language placeholder" name="demographics">
            <label for="language">Non-English Speaker</label>
        </div>
        
        <div class="response">
            <input type="checkbox" id="activeMilitary" value="Active Military" name="demographics">
            <label for="activeMilitary">Active Military</label>
        </div>
        
        <div class="response">
            <input type="checkbox" id="refugee" value="Refugee" name="demographics">
            <label for="refugee">Refugee</label>
        </div>

    </fieldset>
    <div id="buttons">
        
        <button type="button" on:click={()=>{AdvanceForm(-1)}} id="backButton" disabled={currentQuestionIndex <= 0}>Back</button>
        
        {#if currentQuestionIndex + 1 < questions?.length}
        <button type="button" on:click={()=>{AdvanceForm(1)}} class="chunkyButton" disabled={nextDisabled}>Next</button>
        {:else}
        <button type="submit" class="chunkyButton">Finish</button>
        {/if}

    </div>

</form>
<div id="background">
	<img src="/longBrownstone.jpg" alt="" />
	<div id="overlay" />
</div>

<style>
    h1{
        display: block;
        color:var(--color-light-text);
        text-align: center;
        margin-bottom:0;
    }
    label[for='progress']{
        cursor: auto;
        margin:auto;
        font-size: 1rem;
    }
    label{
        cursor: pointer;
    }
    progress {
    border-radius: 7px; 
    width: 15rem;
    margin:auto;
    margin-bottom:1rem;
    height:.5rem;
    box-shadow: 1px 1px 4px rgba( 0, 0, 0, 0.2 );


    }
    progress[value]::-webkit-progress-value {
    transition: width 0.5s;
    background: var(--color-theme-2);
}
    progress::-webkit-progress-bar {
    
    border-radius: 7px;
    background-color: lightgrey;
    }
    progress::-webkit-progress-value {
    background-color: var(--color-theme-2);
    border-radius: 10px; 
    }

	legend {
		font-size: 1.7rem;
		width: 100%;
		text-align: center;
	}
    fieldset{
        overflow: hidden;
    }
	form {
		display: flex;
		flex-direction: column;

		margin:auto;
		margin-top:2rem;

		padding: 1rem 2.5rem;
		background-color: white;
		box-shadow: 1px 1px 5px grey;
		width: fit-content;
		min-width: 40rem;
		font-size: 1.5rem;
        border-radius: 10px;
	}
	form input {
		font-size: 1.2rem;
		margin-bottom: 1rem;
		padding: 0.2rem;

		
	}
	#background {
		z-index: -1;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	#background img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	#overlay {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}
    #buttons{
        margin:.5rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;


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
        
        color:black;
        background-color: white;

        outline: 2px solid grey;

    }
    #backButton:disabled{
        cursor: auto;
	    background-color: white;
	    color: lightgrey;
	    outline:2px solid lightgray;
    }
    #backButton:hover{

    }
    
    legend.smallText{
        font-size:1.5rem;
    }
    input[type='radio'], 
    input[type='checkbox']{
        cursor:pointer;

        -ms-transform: scale(1.5); /* IE 9 */
        -webkit-transform: scale(1.5); /* Chrome, Safari, Opera */
        transform: scale(1.5);

        accent-color: var(--color-theme-2);
    }
    .sideBySide{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap:1rem;
        
    }
    .sideBySide .response label{
        font-size: 1rem;
    }
    .response label{
        font-size: 1.2rem;
    }
    
 
    .note{
        width:100%;
        text-align: center;
        font-size:.8rem;
        margin-top:0;

    }

    @media only screen and (max-width: 520px){
        form{
            min-width:0;
            padding: 1rem .2rem;
            width:95%;
        }
        fieldset legend{
            font-size: 1.4rem;
        }
        fieldset.sideBySide{
            display: flex;
            flex-direction: column;
        }
        #buttons{
            padding:0 .5rem;
            
        }
    }
    </style>