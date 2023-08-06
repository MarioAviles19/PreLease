<script>
    let workHistoryCount = 1
    let rentalHistoryCount = 1
    let referenceCount = 1;

    function AddWorkHistory(i){
        if(workHistoryCount + i < 1){
            return
        }
        workHistoryCount = workHistoryCount + i;
    }

    function AddRentalHistory(i){
        if(rentalHistoryCount + i < 1){
            return
        }
        rentalHistoryCount = rentalHistoryCount + i;
    }

    function AddReferenceCount(i){
        if(referenceCount + i < 1){
            return
        }
        referenceCount = referenceCount + i;
    }
</script>

<section>
    <form action="upload" method="POST">
        
        <fieldset class="roundedContainer">
            <legend>Personal Info</legend>
            <div class="personalInfoGrid">
                <div class="responseContainer">
                    <label for="address">Address</label>
                    <input id="address" name="address" type="text">
                </div>

                <div class="responseContainer">
                    <label for="preferedEmail">Prefered Email</label>
                    <input id="preferedEmail" name="preferedEmail" type="text">
                </div>

                <div class="responseContainer">
                    <label for="phoneNumber">Phone Number</label>
                    <input id="phoneNumber" name="phoneNumber"type="text">
                </div>
                <div class="responseContainer">
                    <label for="maritalStatus">Marital Status</label>
                    <select name="maritalStatus" id="maritalStatus">
                        <option value="" disabled hidden selected>Select</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                    </select>
                </div>
                <div class="responseContainer">
                    <label for="citizenship">Citizenship</label>
                    <select name="citizenship" id="citizenship">
                        <option value="" disabled hidden selected>Select</option>
                        <option value="citizen">Citizen</option>
                        <option value="nonCitizen">Non-Citizen</option>
                    </select>
                </div>
                <div class="responseContainer">
                    <label for="householdSize">Household Size</label>
                    <input type="number" id="householdSize">
                </div>
            </div>


            <label for="petInfo" class="centered">Pet Information</label>
            <p class="note">Tell us about any pets you may have</p>
            <textarea name="objective" id="petInfo" cols="35" rows="10"></textarea>
            
        </fieldset>

        <fieldset class="roundedContainer">
            <label for="objective" class="centered">Objective</label>
            <p class="note">Tell us a little bit about what you're looking for in your next residence</p>
            <textarea name="objective" id="objective" cols="35" rows="10"></textarea>
        </fieldset>

        <fieldset class="roundedContainer">
            <label for="background" class="centered">Background</label>
            <p class="note">Tell us about your background. Where you grew up, where you've worked, hobbies, and interests. That sort of thing</p>
            <textarea name="background" id="background" cols="35" rows="10"></textarea>
        </fieldset>

        <fieldset class="roundedContainer">
            <legend>Work History</legend>

            <label for="income">Annual Income</label>
            <input id="income" type="text">
            
            {#each {length : workHistoryCount} as _, i}
            <div class="entry">
                <h1>Job {i + 1}</h1>
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
                            <input id="workStartDate" name="workStartDate"type="text">
                        </div>
                        <div class="responseContainer">
                            <label for="workEndDate">End Date</label>
                            <input id="workEndDate" name="workEndDate"type="text">
                        </div>
                </div>
                <h2>Contact</h2>
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
                        <input id="rentalHistoryContactPhoneNumber" type="text">
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

        <fieldset class="roundedContainer">
            <legend>Rental History</legend>
            
            {#each {length : rentalHistoryCount} as _, i}
            <h1>Entry {i + 1}</h1>
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
                        <input id="rentalHistoryStartDate" name="rentalHistoryStartDate"type="text">
                    </div>
                    <div class="responseContainer">
                        <label for="rentalHistoryEndDate">End Date</label>
                        <input id="rentalHistoryEndDate" name="rentalHistoryEndDate"type="text">

                    </div>
                </div>

                <h2>Landlord / Property Manager</h2>
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
                        <input id="rentalHistoryContactPhoneNumber" type="text">
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

        <fieldset class="roundedContainer">
            <legend>References</legend>

            <div class="entry">
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
                        <input id="rentalHistoryContactPhoneNumber" type="text">
                    </div>
                    <div class="responseContainer doubleLengthInGrid">
                        <label for="referenceRelationship">Relationship</label>
                        <input id="referenceRelationship" type="text">
                    </div>
                </div>

            </div>

            <div class="additionButtonsContainer">
                <div class="additionButtons">
                    {#if referenceCount > 0}
                    <button type="button" on:click={()=>{AddReferenceCount(-1)}}><span class="fas fa-minus"></span></button>
                    {/if}
                    <button type="button" on:click={()=>{AddReferenceCount(1)}}><span class="fas fa-plus"></span></button>
                </div>
            </div>
                
        </fieldset>

        <fieldset class="roundedContainer">
            <label for="extraInfo" class="centered">Extra Info</label>
            <p class="note">Anything that hasn't been covered that you'd like to include</p>
            <textarea name="extraInfo" id="extraInfo" cols="35" rows="10"></textarea>
        </fieldset>



    </form>
</section>

<style>
    h1{
        font-weight:normal;
    }
    section{
        width: clamp(15rem, 100%, 60rem);
        margin:auto;
    }
    input[type=text]{
        background-color: rgb(227, 227, 227);
    }
    label{
        font-weight: bold;
    }

    fieldset{
        margin:1rem;
        border:none;
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
    .personalInfoGrid{

        display:grid;
        grid-template-columns: 1fr .6fr .4fr;
        gap:1rem;
        width:100%;
    }
    .doubleLengthInGrid{
        grid-column: 1 / 3;
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
        grid-template-columns: 1fr 2fr .5fr .5fr;
        gap:1.2rem;
    }
    .contactGrid{
        width:100%;
        margin-top:1rem;
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
</style>