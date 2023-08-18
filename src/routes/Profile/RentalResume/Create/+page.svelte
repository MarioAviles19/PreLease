<script>
    import FormCarousel from "$lib/Components/FormCarousel.svelte";
    import {FormatPhoneNumberInput } from "$lib/helpers.js";
  

    export let data;

    let workHistoryCount = 1
    let rentalHistoryCount = 1
    let referenceCount = 1;

    /**@type {Array<Element>}*/
    let questions;
    /**@type {number}*/
    let currentQuestionIndex;


    //Form Data for Preview
    let address = '';
    let email = '';
    let phoneNumber = '';

    /**@param {Element} el*/
    function PhoneNumber(el){
        el.addEventListener('keydown', FormatPhoneNumberInput)
    }

    /**@param {number} i The amount to increment the index by*/
    function AddWorkHistory(i){
        if(workHistoryCount + i < 1){
            return
        }
        workHistoryCount = workHistoryCount + i;
    }
    /**@param {number} i The amount to increment the index by*/
    function AddRentalHistory(i){
        if(rentalHistoryCount + i < 1){
            return
        }
        rentalHistoryCount = rentalHistoryCount + i;
    }
    /**@param {number} i The amount to increment the index by*/
    function AddReferenceCount(i){
        if(referenceCount + i < 1){
            return
        }
        referenceCount = referenceCount + i;
    }

</script>

    
<section class="form">
    <div id="progressContainer">
        <label for="progress">Progress:</label>
        <progress id='Progress' value={currentQuestionIndex ?? 0} max={questions?.length - 1 ?? 0}></progress>
    </div>
    <FormCarousel action="/api/getResume" bind:questions bind:currentQuestionIndex>

        <fieldset class="small">
            <legend>Personal Info</legend>
            <div class="personalInfoGrid">
                <div class="responseContainer address">
                    <label for="address">Address</label>
                    <input bind:value={address} id="address" placeholder="Address" name="userAddress" type="text">
                </div>

                <div class="responseContainer">
                    <label for="preferedEmail">Prefered Email</label>
                    <input bind:value={email} id="preferedEmail" name="userEmail" placeholder="Email" type="text">
                </div>

                <div class="responseContainer">
                    <label for="phoneNumber">Phone</label>
                    <input use:PhoneNumber bind:value={phoneNumber} id="phoneNumber" name="userPhone" placeholder="Phone" type="text">
                </div>


        </fieldset>

        <fieldset class="medium">
            <label for="objective" class="centered">Objective</label>
            <p class="note">Tell us a little bit about what you're looking for in your next residence</p>
            <textarea name="objective" id="objective" cols="35" rows="10"></textarea>
        </fieldset>

        <fieldset class="medium">
            <label for="background" class="centered">Background</label>
            <p class="note">Tell us about your background. Where you grew up, where you've worked, hobbies, and interests. That sort of thing</p>
            <textarea name="background" id="background" cols="35" rows="10"></textarea>
        </fieldset>

        <fieldset class="large">
            <legend>Work History</legend>

            <label for="income">Annual Income</label>
            <input id="income" type="text">

            {#each {length : workHistoryCount} as _, i}
            <div class="entry">
                <h2 class="multifieldEntry">Job {i + 1}</h2>
                <div class="workHistoryEntryGrid">
                    <div class="responseContainer">
                        <label for="workTitle">Title</label>
                        <input id="workTitle" name="workTitle" type="text">
                    </div>
                    <div class="responseContainer">
                        <label for="employer">Employer</label>
                        <input id="employer" name="employer" type="text">
                    </div>
                        <div class="responseContainer">
                            <label for="workStartDate">Start Date</label>
                            <input id="workStartDate" name="workStartDate"type="date">
                        </div>
                        <div class="responseContainer">
                            <label for="workEndDate">End Date</label>
                            <input id="workEndDate" name="workEndDate"type="date">
                        </div>
                </div>
                
                <h2 class="multifieldEntry">Contact</h2>
                <div class="contactGrid">
                    <div class="responseContainer">
                        <label for="rentalHistoryContactName">Name</label>
                        <input id="rentalHistoryContactName" type="text">
                    </div>
                    <div class="responseContainer">
                        <label for="rentalHistoryContactTitle">Title</label>
                        <input id="rentalHistoryContactTitle" type="text">
                    </div>
                    <div class="responseContainer">
                        <label for="rentalHistoryContactPhoneNumber">Phone Number</label>
                        <input use:PhoneNumber id="rentalHistoryContactPhoneNumber" type="text">
                    </div>

                </div>

            </div>
            {/each}
            <div class="additionButtonsContainer">
                <div class="additionButtons">
                    {#if workHistoryCount > 1}
                    <button type="button" on:click={()=>{AddWorkHistory(-1)}}><span class="fas fa-minus"></span></button>
                    {/if}
                    <button type="button" on:click={()=>{AddWorkHistory(1)}}><span class="fas fa-plus"></span></button>
                </div>
            </div>

        </fieldset>

        <fieldset class="large">
            <legend>Rental History</legend>

            {#each {length : rentalHistoryCount} as _, i}
            <h2 class="multifieldEntry">Entry {i + 1}</h2>
            <div class="entry">
                <div class="rentalHistoryGrid">
                    <div class="responseContainer">
                        <label for="rentalHistoryAddress">Address</label>
                        <input id="rentalHistoryAddress" name="rentalHistoryAddress" type="text">
                    </div>
                    <div class="responseContainer">
                        <label for="rentalHistoryRent">Rent</label>
                        <input id="rentalHistoryRent"type="text">
                    </div>

                    <div class="responseContainer">
                        <label for="rentalHistoryStartDate">Start Date</label>
                        <input id="rentalHistoryStartDate" name="rentalHistoryStartDate"type="date">
                    </div>
                    <div class="responseContainer">
                        <label for="rentalHistoryEndDate">End Date</label>
                        <input id="rentalHistoryEndDate" name="rentalHistoryEndDate"type="date">

                    </div>
                </div>

                <h2 class="multifieldEntry">Landlord / Property Manager</h2>
                <div class="contactGrid">
                    <div class="responseContainer">
                        <label for="rentalHistoryContactName">Name</label>
                        <input id="rentalHistoryContactName" type="text">
                    </div>
                    <div class="responseContainer">

                        <label for="rentalHistoryContactTitle">Title</label>
                        <input id="rentalHistoryContactTitle" type="text">
                    </div>

                    <div class="responseContainer">
                        <label for="rentalHistoryContactPhoneNumber">Phone Number</label>
                        <input use:PhoneNumber id="rentalHistoryContactPhoneNumber" type="text">
                    </div>
                </div>
                <h2>Reason for Leaving</h2>
                <textarea></textarea>
            </div>
            {/each}
            <div class="additionButtonsContainer">
                <div class="additionButtons">
                    {#if rentalHistoryCount > 1}
                    <button type="button" on:click={()=>{AddRentalHistory(-1)}}><span class="fas fa-minus"></span></button>
                    {/if}
                    <button type="button" on:click={()=>{AddRentalHistory(1)}}><span class="fas fa-plus"></span></button>
                </div>
            </div>
        </fieldset>

        <fieldset class="small">
            <legend>References</legend>

            {#each {length: referenceCount} as _, i}
            <div class="entry">
                <h2>Reference {i + 1}</h2>
                <div class="contactGrid">
                    <div class="responseContainer">
                        <label for="rentalHistoryContactName">Name</label>
                        <input id="rentalHistoryContactName" type="text">
                    </div>
                    <div class="responseContainer">
                        <label for="rentalHistoryContactTitle">Title</label>
                        <input id="rentalHistoryContactTitle" type="text">
                    </div>
                    <div class="responseContainer">
                        <label for="rentalHistoryContactPhoneNumber">Phone Number</label>
                        <input use:PhoneNumber id="rentalHistoryContactPhoneNumber" type="text">
                    </div>
                    <div class="responseContainer doubleLengthInGrid">
                        <label for="referenceRelationship">Relationship</label>
                        <input id="referenceRelationship" type="text">
                    </div>
                </div>

            </div>
            {/each}

            <div class="additionButtonsContainer">
                <div class="additionButtons">
                    {#if referenceCount > 0}
                    <button type="button" on:click={()=>{AddReferenceCount(-1)}}><span class="fas fa-minus"></span></button>
                    {/if}
                    <button type="button" on:click={()=>{AddReferenceCount(1)}}><span class="fas fa-plus"></span></button>
                </div>
            </div>

        </fieldset>

        <fieldset class="medium">
            <label for="extraInfo" class="centered">Extra Info</label>
            <p class="note">Anything that hasn't been covered that you'd like to include</p>
            <textarea name="extraInfo" id="extraInfo" cols="35" rows="10"></textarea>
        </fieldset>



    </FormCarousel>
</section>

<div class="background glassTint">
    <img src="/longBrownstone.jpg" alt="brownstone">
    <div class="overlay glassTint"></div>
</div>

<style>


    h1{
        font-weight:normal;
    }
    section.form{
        height: 100%;
        width: fit-content;
        margin:auto;
    }
    fieldset.small{
        width:clamp(15rem, 95vw, 40rem)
    }
    fieldset.medium{
        width:clamp(15rem, 95vw, 60rem)
    }
    fieldset.large{
        width:clamp(15rem, 95vw, 65rem)
    }
    input[type=date]{
        font-family: lexend;
        font-size: 1.2rem;
        border-radius: 3px;
        border:none;
        outline: solid 2px rgb(96, 96, 96);
    }
    input[type=text]{
        
        outline: solid 2px rgb(96, 96, 96);
        border-radius: 3px;
    }
    input[type=text]::placeholder{

    }
    label{
        font-weight: bold;
    }

    fieldset{
        margin:1rem;
        margin:auto;
        border:none;

        
    }
    label[for=progress]{
        color:white;
        display:block;
    }
    progress {
    border-radius: 7px; 
    width: clamp(15rem, 95%, 30rem);
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

    legend{
        float:left;
        display:block;
        width:100%;
        font-size: 1.6rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }
    textarea{
        width:100%;
        resize: none;
        font-size: 1.2rem;
    }
    label.centered{
        display: block;
        width:100%;
        text-align: center;
        font-size: 1.3rem;
        font-weight: bold;
        text-decoration: underline;
    }
    h2{
        font-size: 1.2rem;
    }
    #progressContainer{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .address{
        grid-column: 1/3;
    }
    :global(.big){
        max-width: 55rem;
    }
    .multifieldEntry{
        margin-bottom: 0;
    }
    .entry.label{
        font-size: 1.2rem;
    }
    .resume{
        background-color: white;
        aspect-ratio: 8.3 / 11.7 ;

        width:70%;
        padding:.5rem;
        margin:auto;
        overflow: hidden;
    }
    .resumeName{
        text-align: center;
        font-size: calc(1rem * 1vw);
        margin:0;
    }
    .resumeContactInfo{
        font-size: .6rem;
        text-align: center;
        text-overflow: elipsis;
        white-space: nowrap;

        box-shadow: 0 1px black;
    }
    .preview{
        
    }

    .wrapper{
        display: grid;
        grid-template-columns: 1fr 1fr;
        
        padding:2rem;
    }
    .personalInfoGrid{

        display:grid;
        grid-template-columns: 1.4fr .6fr;
        gap:1rem;
        width:100%;
    }
    .doubleLengthInGrid{
        grid-column: 1 / 4;
    }
    .entry{
        border-bottom: dotted 1px var(--color-trim);
        padding-bottom:1rem;
    }
    .rentalHistoryEntry{
        border-bottom: dotted 1px var(--color-trim);
        padding-bottom: 1rem;
    }
    .rentalHistoryGrid{
        display: grid;
        grid-template-columns: 2fr 1fr .5fr .5fr;
        gap:1.2rem;
    }
    .workHistoryEntryGrid{
        display: grid;
        grid-template-columns: 1fr 1.8fr .6fr .6fr;
        gap:1.2rem;
    }
    .contactGrid{
        width:100%;
        margin-top:0;
        display: grid;
        grid-template-columns: 1.5fr 1.5fr 1fr;
        gap:1rem;
    }
    .additionButtons{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .additionButtons button{
        font-size: 1.5rem;
        margin:1rem;
        background:none;
        border:none;
    }
    .responseContainer{
        margin-top:auto;
    }
    .responseContainer label{
        display: block;
    }
    .responseContainer input{
        display:block;
        width:100%;
    }

    .note{
        text-align: center;
        font-size: 1.2rem;
    }
</style>