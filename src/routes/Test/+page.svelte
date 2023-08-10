<script>
    import FormCarousel from "$lib/Components/FormCarousel.svelte";
</script>

<FormCarousel action="">
    <fieldset   class="selection question">
        <legend>What city do you currently live in?</legend>
        <p class="note">PreLease is currently only serving the Minneapolis, MN metro area</p>
        
        <div class="response">
            <input type="text" placeholder="City">
            
        </div>
    </fieldset>
    

    <fieldset  class="selection question" >
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

    <fieldset   class="selection question">
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
</FormCarousel>

<style>
    fieldset{
        background-color: white;
        padding:1rem;

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
</style>