<script>
    import { onMount } from "svelte";
    let currentQuestionIndex = 0;
    /**@type {Element}*/
    let form;

    let questions;
    onMount(()=>{
        
        questions = form.querySelectorAll('fieldset');
        HideOtherElements();
        form.style = '';

    })
    function HideOtherElements(){
        console.log(questions)
        for(let i = 1; i < questions.length; i++){
            console.log(i)
            questions[i].style = "display:none";
            
            console.log(questions[i]);
        }
    }

    function AdvanceForm(index){
        if(currentQuestionIndex + index < 0){
            return
        }
        questions[currentQuestionIndex].style = "display:none";
        currentQuestionIndex += index;
        questions[currentQuestionIndex].style = "";
    }



</script>

<form bind:this={form} method="POST" style="display:none">
	
    <label for="progress">Progress:</label>
    <progress id='Progress' value={currentQuestionIndex + 1} max={questions?.length ?? 0}></progress>



    <fieldset class="selection question" >
        <legend>Please Identify Your Gender</legend>
        
        <div class="response">
            <input type="checkbox" id="man" value="man" name="gender">
            <label for="man">Man</label>
        </div>

        <div class="response">
            <input type="checkbox" id="woman" value="woman" name="gender">
            <label for="woman">Woman</label>
        </div>

        <div class="response">
            <input type="checkbox" id="nonBinary" value="Non-Binary" name="gender">
            <label for="nonBinary">Non-Binary</label>
        </div>

        <div class="response">
            <input type="checkbox" id="noGender" value="n/a" name="gender">
            <label for="noGender">Prefer Not To Say</label>
        </div>
    </fieldset>

    <fieldset class="selection question">
        <legend>What is your Date of Birth?</legend>
        
        <div class="response">
            <label for="man" class="block">Birthday</label>
            <input type="date" id="birthDate" value="" name="birthDate">
            
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
        {#if currentQuestionIndex > 0}
        <button type="button" on:click={()=>{AdvanceForm(-1)}} id="backButton">Back</button>
        {/if}
        {#if currentQuestionIndex + 1 < questions?.length}
        <button type="button" on:click={()=>{AdvanceForm(1)}} class="chunkyButton">Next</button>
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
    label[for='progress']{
        margin:auto;
        font-size: 1rem;
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
		margin-top:5rem;

		padding: 1rem 2.5rem;
		background-color: white;
		box-shadow: 1px 1px 5px grey;
		width: fit-content;
		min-width: 30rem;
		font-size: 1.5rem;
	}
	form input {
		font-size: 1.2rem;
		margin-bottom: 1rem;
		padding: 0.2rem;

		border-style: solid;
		border-radius: 5px;
		
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
        font-size: 1.5rem;
    }
    #buttons button:only-child{
        margin-left:auto;
    }
    #backButton{
        border:none;
        font-size:1.2rem;
        
        color:var(--color-trim);
        background-color: white;

        outline: 2px solid grey;

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
    
    .block{
        display: block;
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