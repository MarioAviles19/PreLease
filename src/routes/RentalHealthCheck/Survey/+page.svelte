<script>
    import { auth, firestore } from "$lib/firebase/firebase.client";
    import { signInWithCustomToken } from "firebase/auth";
    import { addDoc, collection} from "firebase/firestore";
	import { onMount } from "svelte";
    import { logEvent } from "firebase/analytics";
    import { analyticsStore} from "$lib/stores/analytics.js";
    

    export let data;

    let cityOtherInput;

    let cityOtherSelected;



    let moneyInputs = '';

   

    function styleMoney(){

        if(!moneyInputs.startsWith('$')){
            moneyInputs = `\$${moneyInputs}`
        }
    }
    

    onMount(()=>{

        signInWithCustomToken(auth, data.userToken).then((res)=>{logEvent($analyticsStore, "begin_health_check");})



        
    })


    $: cityOtherSelected, toggleOtherBox();

    function toggleOtherBox(){
        if(!cityOtherInput){
            return;
        }
        if(cityOtherSelected === "Other"){
            cityOtherInput.disabled = false
            cityOtherInput.focus();
        }else{
            cityOtherInput.disabled = true;
        }
    }


</script>

<section>
    <form id="healthCheckForm" method="POST">
        <h1>Rental Health Check</h1>

        <fieldset class="radioSelection question">
            <legend>Are you currently experiencing a housing emergency? (i.e., threat of eviction,
                or need immediate housing)</legend>
            <div class="response">
                <input type="radio" id="emergencyYes" value="Yes" name="emergency" required>
                <label class='required' for="emergencyYes">Yes</label>
            </div>

            <div class="response">
                <input type="radio" id="emergencyNo" value='No' name="emergency" required>
                <label class='required' for="emergencyNo">No</label>
            </div>
        </fieldset>

        <fieldset class="radioSelection question">
            <legend>Are you planning to move to a new rental property soon?</legend>
            <div class="response">
                <input type="radio" id="planningToMoveYes" value="Yes" name="planningToMove" required>
                <label class='required' for="planningToMoveYes">Yes</label>
            </div>

            <div class="response">
                <input type="radio" id="planningToMoveNo" value='No' name="planningToMove"required>
                <label class='required' for="planningToMoveNo">No</label>
            </div>
        </fieldset>

        <fieldset class="radioSelection question">
            <legend>Are you currently a tenant?</legend>
            <div class="response">
                <input type="radio" id="currentTennentYes" value="Yes" name="currentTenant" required>
                <label class='required' for="currentTennentYes">Yes</label>
            </div>

            <div class="response">
                <input type="radio" id="currentTennentNo" value='No' name="currentTenant"required>
                <label class='required' for="currentTennentNo">No</label>
            </div>
        </fieldset>


        <fieldset class="radioSelection question">
            <legend>What city do you reside in?</legend>
            <div class="response">
                <input bind:group={cityOtherSelected} type="radio" id="Minneapolis" value="Minneapolis" name="city" required>
                <label class='required' for="Minneapolis">Minneapolis</label>
            </div>

            <div class="response">
                <input bind:group={cityOtherSelected} type="radio" id="St.Paul" value='St.Paul' name="city" required>
                <label class='required' for="St.Paul">St. Paul</label>
            </div>

            <div class="response">
                <input bind:group={cityOtherSelected} type="radio" id="CityOther" value='Other' name="city" required>
                <label class='required' for="CityOther">Other</label>
                <input  bind:this={cityOtherInput} type="text" name="cityOther" disabled>
            </div>


        </fieldset>

        <!--Other Info-->
        <fieldset class="radioSelection question">
            <legend>What is your current lease?</legend>
            <div class="response">
                <input type="radio" id="OralAgreement" value="Oral" name="currentLease" required>
                <label class='' for="OralAgreement">Oral Agreement</label>
            </div>

            <div class="response">
                <input type="radio" id="WrittenAgreement" value='Written' name="currentLease" required>
                <label class='' for="WrittenAgreement">Written Agreement</label>
            </div>

        </fieldset>

        <fieldset class="radioSelection question">
            <legend>Do you have any non-related housemates signed to your lease,
                and face any conflict with them?</legend>
            <div class="response">
                <input type="radio" id="cosignerSmallConflict" value="Yes" name="cosigners" required>
                <label class='required' for="cosignerSmallConflict">Yes with minimal to no conflict</label>
            </div>

            <div class="response">
                <input type="radio" id="cosignerMajorConflict" value='No' name="cosigners"required>
                <label class='required' for="cosignerMajorConflict">Yes with major conflict</label>
            </div>

            <div class="response">
                <input type="radio" id="noCosigner" value='No' name="cosigners"required>
                <label class='required' for="noCosigner">No</label>
            </div>
        </fieldset>

        <fieldset class="radioSelection question">
            <legend>Does your landlord or property manager live in the rental building?</legend>
            <div class="response">
                <input type="radio" id="liveInLandlordYes" value="Yes" name="liveInLandlord" required>
                <label class='required' for="liveInLandlordYes">Yes</label>
            </div>

            <div class="response">
                <input type="radio" id="liveInLandlordNo" value='No' name="liveInLandlord"required>
                <label class='required' for="liveInLandlordNo">No</label>
            </div>
        </fieldset>

        <fieldset class="radioSelection question">
            <legend>What type of rental building do you live in?</legend>
            <div class="response">
                <input type="radio" id="apartment" value="Apartment" name="buildingType" required>
                <label class='required' for="apartment">Yes</label>
            </div>

            <div class="response">
                <input type="radio" id="home" value='Home' name="buildingType"required>
                <label class='required' for="home">Townhome | Home</label>
            </div>

            <div class="response">
                <input type="radio" id="plex" value='N-plex' name="buildingType"required>
                <label class='required' for="plex">Duplex | Triplex | Quadplex</label>
            </div>
        </fieldset>

        <fieldset class="radioSelection question">
            <legend>What type of rental building do you live in?</legend>
            <div class="response">
                <input type="radio" id="check" value="Check" name="paymentType" required>
                <label class='required' for="check">Check</label>
            </div>

            <div class="response">
                <input type="radio" id="app" value="Credit Card or App" name="paymentType" required>
                <label class='required' for="app">Credit Card | App (i.e., Venmo, CashApp, etc.)</label>
            </div>

            <div class="response">
                <input type="radio" id="cashierCheck" value="Cashier Check" name="paymentType" required>
                <label class='required' for="cashierCheck">Cashier Check</label>
            </div>

            <div class="response">
                <input type="radio" id="paymentOther" value="Cashier Check" name="paymentType" required>
                <label class='required' for="paymentOther">Other</label>
            </div>

        </fieldset>

        <fieldset class="radioSelection question">
            <legend>Are you behind or struggling to pay for utility bills?</legend>
            <div class="response">
                <input type="radio" id="utilityStruggleYes" value="Yes" name="utilityStruggle" required>
                <label class='required' for="utilityStruggleYes">Yes</label>
            </div>
            
            <div class="response">
                <input type="radio" id="utilityStruggleNo" value="No" name="utilityStruggle" required>
                <label class='required' for="utilityStruggleNo">No</label>
            </div>

        </fieldset>

        <fieldset class="radioSelection question">
            <legend>Have you filed a renter credit refund (Property Tax Refund Form M-1PR) in the previous year?</legend>
            <div class="response">
                <input type="radio" id="creditRefundFiledYes" value="Yes" name="creditRefundFiled" required>
                <label class='required' for="creditRefundFiledYes">Yes</label>
            </div>
            
            <div class="response">
                <input type="radio" id="creditRefundFiledNo" value="No" name="creditRefundFiled" required>
                <label class='required' for="creditRefundFiledNo">No</label>
            </div>

        </fieldset>

        <fieldset class="radioSelection question">
            <legend>How would you rate your relationship with your landlord?</legend>
            <div class="response">
                <input type="radio" id="landlordRelationShipFavorable" value="Favorable" name="landlordRelationShip" required>
                <label class='required' for="landlordRelationShipFavorable">Favorable</label>
            </div>
            
            <div class="response">
                <input type="radio" id="landlordRelationShipNeutral" value="Neutral" name="landlordRelationShip" required>
                <label class='required' for="landlordRelationShipNeutral">Neutral</label>
            </div>
            
            <div class="response">
                <input type="radio" id="landlordRelationShipUnfavorable" value="Unfavorable" name="landlordRelationShip" required>
                <label class='required' for="landlordRelationShipUnfavorable">Unfavorable</label>
            </div>
            
            <div class="response">
                <input type="radio" id="landlordRelationShipCombative" value="Combative" name="landlordRelationShip" required>
                <label class='required' for="landlordRelationShipCombative">Combative</label>
            </div>

        </fieldset>

        <!--Rate Satisfaction with landlord or property management-->
        

        <!--Peronal Info-->

        <fieldset class="question">
            <legend>Rate your credit rating</legend>
            <select name="creditRating" required>
                <option value="" disabled selected hidden>Select</option>
                <option value="Poor">Poor</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
                <option value="Don't Wish To Disclose">Don't Wish To Disclose</option>
                <option value="Don't Know">Don't Know</option>
            </select>
        </fieldset>


        <fieldset class="radioSelection question">
            <legend>Do you have a criminal background?</legend>
            <div class="response">
                <input type="radio" id="criminalBackgroundYes" value="Yes" name="criminalBackground"required>
                <label class='' for="criminalBackgroundYes">Yes</label>
            </div>

            <div class="response">
                <input type="radio" id="criminalBackgroundNo" value='No' name="criminalBackground" required>
                <label class='' for="criminalBackgroundNo">No</label>
            </div>

            <div class="response">
                <input type="radio" id="criminalBackgroundDontKnow" value='Would Like To Check' name="criminalBackground" required>
                <label class='' for="criminalBackgroundDontKnow">I don't know but I would like to check</label>
            </div>

            <div class="response">
                <input type="radio" id="criminalBackgroundNoDisclose" value='Prefer Not To Disclose' name="criminalBackground" required>
                <label class='' for="criminalBackgroundNoDisclose">I don't want to disclose</label>
            </div>

        </fieldset>

        
        <fieldset class="radioSelection question">
            <legend>Have you ever been evicted?</legend>
            <div class="response">
                <input type="radio" id="evictedYes" value="Yes" name="evicted"required>
                <label class='' for="evictedYes">Yes</label>
            </div>

            <div class="response">
                <input type="radio" id="evictedNo" value="No" name="evicted"required>
                <label class='' for="evictedNo">No</label>
            </div>

            <div class="response">
                <input type="radio" id="evictedDontKnow" value="Don't Know" name="evicted"required>
                <label class='' for="evictedDontKnow">I Don't Know</label>
            </div>

        </fieldset>

        <fieldset class="radioSelection question">
            <legend>Do you have a negative relationship with your previous landlord?</legend>
            <div class="response">
                <input type="radio" id="negativeRelationshipYes" value="Yes" name="negativeRelationship"required>
                <label class='' for="negativeRelationshipYes">Yes</label>
            </div>

            <div class="response">
                <input type="radio" id="negativeRelationshipNo" value="No" name="negativeRelationship"required>
                <label class='' for="negativeRelationshipNo">No</label>
            </div>

        </fieldset>

        
        <fieldset class="radioSelection question">
            <legend>Have you recently been denied housing due to low credit, criminal background,
                or recent eviction?</legend>
            <div class="response">
                <input type="radio" id="recentlyDeniedHousingYes" value="Yes" name="recentlyDeniedHousing"required>
                <label class='' for="recentlyDeniedHousingYes">Yes</label>
            </div>

            <div class="response">
                <input type="radio" id="recentlyDeniedHousingNo" value="No" name="recentlyDeniedHousing"required>
                <label class='' for="recentlyDeniedHousingNo">No</label>
            </div>

            <div class="response">
                <input type="radio" id="recentlyDeniedHousingDontKnow" value="I Don't Know" name="recentlyDeniedHousing"required>
                <label class='' for="recentlyDeniedHousingDontKnow">I'm Not Sure</label>
            </div>

        </fieldset>

        <!---Tenent's rights Knowledge Test-->


        <!--demos-->

        <fieldset class="question">
            <legend>Please Indicate Your Annual Household Income</legend>
            
            <div class="moneyWrapper">
            <input class="money" type="number" placeholder="(e.g., $15000)" name="income" required>
            </div>
        </fieldset>

        <fieldset class="radioSelection question">
            <legend>Please Identify Your Gender</legend>
            
            <div class="response">
                <input type="radio" id="man" value="man" name="gender" >
                <label for="man">Man</label>
            </div>

            <div class="response">
                <input type="radio" id="woman" value="woman" name="gender" >
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

        <fieldset class="selection question">
            <legend>Please Identify Your Race or Ethnicity [Check all that apply]</legend>
            
            <div class="response">
                <input type="checkbox" id="native" value="native" name="race" >
                <label for="native">American Indian or Alaskan Native</label>
            </div>

            <div class="response">
                <input type="checkbox" id="asianPI" value="asian/pacific islander" name="race" >
                <label for="asianPI">Asian / Pacific Islander</label>
            </div>

            <div class="response">
                <input type="checkbox" id="black" value="Black / African American" name="race" >
                <label for="black">Black or African American</label>
            </div>

            <div class="response">
                <input type="checkbox" id="white" value="White / Caucasian" name="race" >
                <label for="white">White / Caucasian</label>
            </div>

            <div class="response">
                <input type="checkbox" id="raceNotDisclosing" value="Not Disclosing" name="race">
                <label for="raceNotDisclosing">Not Disclosing</label>
            </div>
        </fieldset>

        <fieldset class="radioSelection question">
            <legend>Are any household members under the age of 18?</legend>
            <div class="response">
                <input type="radio" id="minorsInHouseYes" value="Yes" name="minorsInHouse"required>
                <label for="minorsInHouseYes">Yes</label>
            </div>

            <div class="response">
                <input type="radio" id="minorsInHouseNo" value="No" name="minorsInHouse"required>
                <label for="minorsInHouseNo">No</label>
            </div>

        </fieldset>

        <fieldset class="radioSelection question">
            <legend>Are you or any household member currently pregnant or planning to be pregnant soon?</legend>
            <div class="response">
                <input type="radio" id="preganancyYes" value="Yes" name="preganancy"required>
                <label for="preganancyYes">Yes</label>
            </div>

            <div class="response">
                <input type="radio" id="preganancyNo" value="No" name="preganancy"required>
                <label for="preganancyNo">No</label>
            </div>
        </fieldset>

        <fieldset class="radioSelection question">
            <legend>Do you take public transit regularly and receive a discount fare?</legend>
            <div class="response">
                <input type="radio" id="transitYesReg" value="regular rate" name="transit"required>
                <label for="transitYes">Yes and pay regular price</label>
            </div>

            <div class="response">
                <input type="radio" id="transitYesDiscount" value="discount rate" name="transit"required>
                <label for="transitYesDiscount">Yes and receive a discount</label>
            </div>

            <div class="response">
                <input type="radio" id="transitYesDiscount" value="no transit" name="transit"required>
                <label for="transitNo">I Do Not Use Public Transit Regularly</label>
            </div>
        </fieldset>

        <fieldset class="selection question">
            <legend>Do you identify with any of these categories? [Check all that apply]</legend>
            
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
                <input type="checkbox" id="youth" value="Youth" name="demographics">
                <label for="youth">Youth (24 and younger)</label>
            </div>
            
            <div class="response">
                <input type="checkbox" id="senior" value="Senior" name="demographics">
                <label for="senior">Senior (60 and older)</label>
            </div>
            
            <div class="response">
                <input type="checkbox" id="disability" value="Disability" name="demographics">
                <label for="disability">Disability (Physical or Mental)</label>
            </div>
            
            <div class="response">
                <input type="checkbox" id="language" value="language placeholder" name="demographics">
                <label for="language">Non-English Speaker (TODO: Add language selector)</label>
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

        <fieldset class="selection question">
            <legend>Are you currently enrolled in any of these support programs? [Check all that apply]</legend>
            
            <div class="response">
                <input type="checkbox" id="foodAssistance" value="Food Asistance" name="supportPrograms">
                <label for="foodAssistance">Food Assistance (SNAP)</label>
            </div>
            
            <div class="response">
                <input type="checkbox" id="socialSecurity" value="Social Security Income" name="supportPrograms">
                <label for="socialSecurity">Social Security Income (SSI)</label>
            </div>
            
            <div class="response">
                <input type="checkbox" id="energy" value="Energy & Heating" name="supportPrograms">
                <label for="energy">Social Security Income (SSI)</label>
            </div>
            
            <div class="response">
                <input type="checkbox" id="internet" value="Broadband Internet" name="supportPrograms">
                <label for="internet">Broadband Internet Assistance</label>
            </div>
            
            <div class="response">
                <input type="checkbox" id="minnMedical" value="Minnesota Medical" name="supportPrograms">
                <label for="minnMedical">Minnesota Medical Assistance</label>
            </div>
            
            <div class="response">
                <input type="checkbox" id="minnCare" value="Minnesota Care" name="supportPrograms">
                <label for="minnCare">Minnesota Care</label>
            </div>
            
            <div class="response">
                <input type="checkbox" id="lunch" value="Free & Reduced Lunch" name="supportPrograms">
                <label for="lunch">Free & Reduce Lunch (applicable for children)</label>
            </div>
            
            <div class="response">
                <input type="checkbox" id="childcare" value="Childcare" name="supportPrograms">
                <label for="childcare">Childcare Assistance</label>
            </div>
            
            <div class="response">
                <input type="checkbox" id="CE" value="Coordinated Entry" name="supportPrograms">
                <label for="CE">Coordinated Entry (CE)</label>
            </div>

        </fieldset>

        <fieldset class="radioSelection question">
            <legend>Do you have an active case manager for housing, health, and/or social needs?</legend>
            <div class="response">
                <input type="radio" id="caseManagerYes" value="Yes" name="caseManager" required>
                <label for="caseManagerYes">Yes</label>
            </div>
            
            <div class="response">
                <input type="radio" id="caseManagerNo" value="No" name="caseManager" required>
                <label for="caseManagerNo">No</label>
            </div>

        </fieldset>

        <fieldset class="selection question">
            <legend>Would you like more information on any of the following topics?</legend>
            
            <div class="response">
                <input type="checkbox" id="affordableHousing" value="Applying for Affordable Housing" name="moreInfo">
                <label for="affordableHousing">Applying for Affordable Housing</label>
            </div>
            
            <div class="response">
                <input type="checkbox" id="financialPlanning" value="Financial Planning and Budgeting" name="moreInfo">
                <label for="financialPlanning">Financial Planning and Budgeting</label>
            </div>
            
            <div class="response">
                <input type="checkbox" id="homeOwnership" value="Home Ownership" name="moreInfo">
                <label for="homeOwnership">Home Ownership</label>
            </div>
            
            <div class="response">
                <input type="checkbox" id="tenantOrg" value="Tenant Organization" name="moreInfo">
                <label for="tenantOrg">Tenant Organization</label>
            </div>
            
            <div class="response">
                <input type="checkbox" id="peerEngagement" value="Peer Engagement or Social Activities" name="moreInfo">
                <label for="peerEngagement">Peer Engagement or Social Activities</label>
            </div>

        </fieldset>

        <fieldset class="radioSelection question">
            <legend>Would you like us to follow up with your Rental Health Check??</legend>
            <div class="response">
                <input type="radio" id="followUpYes" value="Yes" name="followUp" required>
                <label for="followUpYes">Yes</label>
            </div>
            
            <div class="response">
                <input type="radio" id="caseManagerNo" value="No" name="followUp" required>
                <label for="followUpYes">No</label>
            </div>

        </fieldset>

        <div id="submitionWrapper">
            <button type="submit">Submit</button>
        </div>


    </form>
</section> 

<style>
    h1{
        width:100%;
        text-align: center;
        font-size: 2.5rem;
    }
    label{
        cursor:pointer;
    }
    input[type='text']{
        border:none;
        background-color: white;
        box-shadow: 0px 2px darkgrey;

        font-size: 1.2rem;
    }
    input[type='text']:disabled{
        color:lightgrey;
        box-shadow: 0px 2px lightgrey;
    }
    input[type='text']:focus{
        outline:none;
        box-shadow: 0px 2px var(--color-theme-2);

    }
    input[type='radio'], 
    input[type='checkbox']{
        cursor:pointer;

        -ms-transform: scale(1.5); /* IE 9 */
        -webkit-transform: scale(1.5); /* Chrome, Safari, Opera */
        transform: scale(1.5);

        accent-color: var(--color-theme-2);
    }
    select{
        font-size:1.2rem;
        max-width:100%;
    }
    button[type='submit']{
        display: block;
        width:fit-content;
        margin:0;
        float:right;

        height:2rem;

        font-size: 1.2rem;
        margin-top:1rem;
    }
    #submitionWrapper{
        width:100%;

    }
    #submitionWrapper button{
        background-color: var(--color-theme-1);

        border:none;
        color: var(--color-light-text);
        width:fit-content;
        height:fit-content;
        font-size: 1.5rem;

        border-radius: 5px;
    }
    #healthCheckForm{
        display:flex;
        flex-direction: column;
        width:80%;
        max-width:800px;
        margin:auto;
    }
    .moneyWrapper::before {
        content: "$";
        font-size:1.2;
        text-align: center;
        position: relative;
        
      }

    .money{
    border:none;
    box-shadow: 0px 1px var(--color-trim);
    font-size:1.2rem;
    }
    .money:focus{
    outline:none;
    border:none;
    box-shadow: 0px 2px var(--color-theme-1);
    }
    .question{
    
        background-color: white;
        margin: .2rem 0;

        margin-top:2rem;

        padding:1rem;

        border-radius: 10px;

        box-shadow: 1px 1px 3px var(--color-trim);
        border:none;
        display: block;

        
    }
    .question legend{
        display: block;
        width:100%;
        float:left;
        font-size:1.1rem;
        font-weight: bold;
        margin:0;
        margin-bottom:1rem;
    }

    .response{
        margin-top:.5rem;
    }

    
    .money::-webkit-outer-spin-button,
    .money::-webkit-inner-spin-button {
    -webkit-appearance: none;
        margin: 0;
    }


    /* Firefox */
    input[type=number] {
    -moz-appearance: textfield;
    }

    @media screen and (max-width: 520px) {

        section{
            width:100%;
        }
        #healthCheckForm{
            width:95vw;
            margin:auto;
        }
    }

    
</style>