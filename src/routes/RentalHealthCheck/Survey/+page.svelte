<script>
    import { auth, firestore } from "$lib/firebase/firebase.client";
    import { signInWithCustomToken } from "firebase/auth";
    import { addDoc, collection} from "firebase/firestore";
	import { onMount } from "svelte";

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
        signInWithCustomToken(auth, data.userToken).then((res)=>{console.log(res)})

  
        
    })
    async function UploadDocument(){
        let col = collection(firestore, 'HealthCheckReports')
        let doc = await addDoc(col, {Test: data.userData.uid, urgency: "Very"})
        console.log("Success");

    }

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

        <div class="radioSelection question">
            <h1>Are you currently experiencing a housing emergency? (i.e., threat of eviction,
                or need immediate housing)</h1>
            <div class="response">
                <input type="radio" id="emergencyYes" value="Yes" name="emergency" required>
                <label class='required' for="emergencyYes">Yes</label>
            </div>

            <div class="response">
                <input type="radio" id="emergencyNo" value='No' name="emergency" required>
                <label class='required' for="emergencyNo">No</label>
            </div>
        </div>

        <div class="radioSelection question">
            <h1>Are you planning to move to a new rental property soon?</h1>
            <div class="response">
                <input type="radio" id="planningToMoveYes" value="Yes" name="planningToMove" required>
                <label class='required' for="planningToMoveYes">Yes</label>
            </div>

            <div class="response">
                <input type="radio" id="planningToMoveNo" value='No' name="planningToMove"required>
                <label class='required' for="planningToMoveNo">No</label>
            </div>
        </div>

        <div class="radioSelection question">
            <h1>Are you currently a tenant?</h1>
            <div class="response">
                <input type="radio" id="currentTennentYes" value="Yes" name="currentTenant" required>
                <label class='required' for="currentTennentYes">Yes</label>
            </div>

            <div class="response">
                <input type="radio" id="currentTennentNo" value='No' name="currentTenant"required>
                <label class='required' for="currentTennentNo">No</label>
            </div>
        </div>


        <div class="radioSelection question">
            <h1>What city do you reside in?</h1>
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


        </div>

        <!--Other Info-->
        <div class="radioSelection question">
            <h1>What is your current lease?</h1>
            <div class="response">
                <input type="radio" id="OralAgreement" value="Oral" name="currentLease" required>
                <label class='' for="OralAgreement">Oral Agreement</label>
            </div>

            <div class="response">
                <input type="radio" id="WrittenAgreement" value='Written' name="currentLease" required>
                <label class='' for="WrittenAgreement">Written Agreement</label>
            </div>

        </div>

        <div class="radioSelection question">
            <h1>Do you have any non-related housemates signed to your lease,
                and face any conflict with them?</h1>
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
        </div>

        <div class="radioSelection question">
            <h1>Does your landlord or property manager live in the rental building?</h1>
            <div class="response">
                <input type="radio" id="liveInLandlordYes" value="Yes" name="liveInLandlord" required>
                <label class='required' for="liveInLandlordYes">Yes</label>
            </div>

            <div class="response">
                <input type="radio" id="liveInLandlordNo" value='No' name="liveInLandlord"required>
                <label class='required' for="liveInLandlordNo">No</label>
            </div>
        </div>

        <div class="radioSelection question">
            <h1>What type of rental building do you live in?</h1>
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
        </div>

        <div class="radioSelection question">
            <h1>What type of rental building do you live in?</h1>
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

        </div>

        <div class="radioSelection question">
            <h1>Are you behind or struggling to pay for utility bills?</h1>
            <div class="response">
                <input type="radio" id="utilityStruggleYes" value="Yes" name="utilityStruggle" required>
                <label class='required' for="utilityStruggleYes">Yes</label>
            </div>
            
            <div class="response">
                <input type="radio" id="utilityStruggleNo" value="No" name="utilityStruggle" required>
                <label class='required' for="utilityStruggleNo">No</label>
            </div>

        </div>

        <div class="radioSelection question">
            <h1>Have you filed a renter credit refund (Property Tax Refund Form M-1PR) in the previous year?</h1>
            <div class="response">
                <input type="radio" id="creditRefundFiledYes" value="Yes" name="creditRefundFiled" required>
                <label class='required' for="creditRefundFiledYes">Yes</label>
            </div>
            
            <div class="response">
                <input type="radio" id="creditRefundFiledNo" value="No" name="creditRefundFiled" required>
                <label class='required' for="creditRefundFiledNo">No</label>
            </div>

        </div>

        <div class="radioSelection question">
            <h1>How would you rate your relationship with your landlord?</h1>
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

        </div>

        <!--Rate Satisfaction with landlord or property management-->
        

        <!--Peronal Info-->

        <div class="question">
            <h1>Rate your credit rating</h1>
            <select name="creditRating">
                <option value="" disabled selected hidden>Select</option>
                <option value="Poor">Poor</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
                <option value="Don't Wish To Disclose">Don't Wish To Disclose</option>
                <option value="Don't Know">Don't Know</option>
            </select>
        </div>


        <div class="radioSelection question">
            <h1>Do you have a criminal background?</h1>
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

        </div>

        
        <div class="radioSelection question">
            <h1>Have you ever been evicted?</h1>
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

        </div>

        <div class="radioSelection question">
            <h1>Do you have a negative relationship with your previous landlord?</h1>
            <div class="response">
                <input type="radio" id="negativeRelationshipYes" value="Yes" name="negativeRelationship"required>
                <label class='' for="negativeRelationshipYes">Yes</label>
            </div>

            <div class="response">
                <input type="radio" id="negativeRelationshipNo" value="No" name="negativeRelationship"required>
                <label class='' for="negativeRelationshipNo">No</label>
            </div>

        </div>

        
        <div class="radioSelection question">
            <h1>Have you recently been denied housing due to low credit, criminal background,
                or recent eviction?</h1>
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

        </div>

        <!---Tenent's rights Knowledge Test-->


        <!--demos-->

        <div class="question">
            <h1>Please Indicate Your Annual Household Income</h1>
            
            <div class="moneyWrapper">
            <input class="money" type="number" placeholder="(e.g., $15000)" name="income">
            </div>
        </div>

        <div class="selection question">
            <h1>Please Identify Your Gender</h1>
            
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
        </div>

        <div class="selection question">
            <h1>Please Identify Your Race or Ethnicity [Check all that apply]</h1>
            
            <div class="response">
                <input type="checkbox" id="native" value="native" name="race">
                <label for="native">American Indian or Alaskan Native</label>
            </div>

            <div class="response">
                <input type="checkbox" id="asianPI" value="asian/pacific islander" name="race">
                <label for="asianPI">Asian / Pacific Islander</label>
            </div>

            <div class="response">
                <input type="checkbox" id="black" value="Black / African American" name="race">
                <label for="black">Black or African American</label>
            </div>

            <div class="response">
                <input type="checkbox" id="white" value="White / Caucasian" name="race">
                <label for="white">White / Caucasian</label>
            </div>

            <div class="response">
                <input type="checkbox" id="raceNotDisclosing" value="Not Disclosing" name="race">
                <label for="raceNotDisclosing">Not Disclosing</label>
            </div>
        </div>

        <div class="radioSelection question">
            <h1>Are any household members under the age of 18?</h1>
            <div class="response">
                <input type="radio" id="minorsInHouseYes" value="Yes" name="minorsInHouse"required>
                <label for="minorsInHouseYes">Yes</label>
            </div>

            <div class="response">
                <input type="radio" id="minorsInHouseNo" value="No" name="minorsInHouse"required>
                <label for="minorsInHouseNo">No</label>
            </div>

        </div>

        <div class="radioSelection question">
            <h1>Are you or any household member currently pregnant or planning to be pregnant soon?</h1>
            <div class="response">
                <input type="radio" id="preganancyYes" value="Yes" name="preganancy"required>
                <label for="preganancyYes">Yes</label>
            </div>

            <div class="response">
                <input type="radio" id="preganancyNo" value="No" name="preganancy"required>
                <label for="preganancyNo">No</label>
            </div>
        </div>

        <div class="radioSelection question">
            <h1>Do you take public transit regularly and receive a discount fare?</h1>
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
        </div>

        <div class="selection question">
            <h1>Do you identify with any of these categories? [Check all that apply]</h1>
            
            <div class="response">
                <input type="checkbox" id="homeless" value="Homeless" name="demographic">
                <label for="homeless">Homeless or Imminent Homelessness</label>
            </div>
            
            <div class="response">
                <input type="checkbox" id="substanceAbuse" value="In Recovery From Substance Abuse" name="demographic">
                <label for="substanceAbuse">In Recovery From Substance Abuse</label>
            </div>
            
            <div class="response">
                <input type="checkbox" id="student" value="University Student" name="demographic">
                <label for="student">University Student</label>
            </div>
            
            <div class="response">
                <input type="checkbox" id="nonCitizen" value="Non-Citizen" name="demographic">
                <label for="nonCitizen">Non-US Citizen</label>
            </div>
            
            <div class="response">
                <input type="checkbox" id="veteran" value="Veteran" name="demographic">
                <label for="veteran">Veteran</label>
            </div>
            
            <div class="response">
                <input type="checkbox" id="youth" value="Youth" name="demographic">
                <label for="youth">Youth (24 and younger)</label>
            </div>
            
            <div class="response">
                <input type="checkbox" id="senior" value="Senior" name="demographic">
                <label for="senior">Senior (60 and older)</label>
            </div>
            
            <div class="response">
                <input type="checkbox" id="disability" value="Disability" name="demographic">
                <label for="disability">Disability (Physical or Mental)</label>
            </div>
            
            <div class="response">
                <input type="checkbox" id="disability" value="Disability" name="demographic">
                <label for="disability">Disability (Physical or Mental)</label>
            </div>
            
            <div class="response">
                <input type="checkbox" id="language" value="language placeholder" name="demographic">
                <label for="language">Non-English Speaker (TODO: Add language selector)</label>
            </div>
            
            <div class="response">
                <input type="checkbox" id="activeMilitary" value="Active Military" name="demographic">
                <label for="activeMilitary">Active Military</label>
            </div>
            
            <div class="response">
                <input type="checkbox" id="refugee" value="Refugee" name="demographic">
                <label for="refugee">Refugee</label>
            </div>

        </div>

        <div class="selection question">
            <h1>Are you currently enrolled in any of these support programs? [Check all that apply]</h1>
            
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

        </div>

        <div class="radioSelection question">
            <h1>Do you have an active case manager for housing, health, and/or social needs?</h1>
            <div class="response">
                <input type="radio" id="caseManagerYes" value="Yes" name="caseManager" required>
                <label for="caseManagerYes">Yes</label>
            </div>
            
            <div class="response">
                <input type="radio" id="caseManagerNo" value="No" name="caseManager" required>
                <label for="caseManagerNo">No</label>
            </div>

        </div>

        <div class="selection question">
            <h1>Would you like more information on the following topics?</h1>
            
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

        </div>

        <div class="radioSelection question">
            <h1>Would you like us to follow up with your Rental Health Check??</h1>
            <div class="response">
                <input type="radio" id="followUpYes" value="Yes" name="followUp" required>
                <label for="followUpYes">Yes</label>
            </div>
            
            <div class="response">
                <input type="radio" id="caseManagerNo" value="No" name="followUp" required>
                <label for="followUpYes">No</label>
            </div>

        </div>

        <div id="submitionWrapper">
            <button type="submit">Submit</button>
        </div>


    </form>
</section> 

<style>
    label{
        cursor:pointer;
    }
    input[type='text']{
        border:none;
        box-shadow: 0px 1px grey;

        font-size: 1.2rem;
    }
    input[type='text']:focus{
        outline:none;
        box-shadow: 0px 2px var(--color-theme-1);

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
        width:60%;
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

        border-radius: 5px;
        
    }
    .question h1{
        font-size:1.1rem;
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