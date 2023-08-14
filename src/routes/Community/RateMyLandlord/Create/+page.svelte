<script>
    import FivePointRating from "$lib/Components/FivePointRating.svelte";
    import { FormatDate } from "$lib/helpers.js";
	import { onMount } from "svelte";

    export let form;
    export let data;

    let commentValue = form?.comments ?? '';

    const currentDate = new Date();

    let startMonth;
    let startYear;

    let endMonth;
    let endYear;

    let values = [];
    values[3] = '';
    values[4] = '';
    values[5] = currentDate.getMonth() + 1;
    values[6] = currentDate.getFullYear();


    let allAnswered = false;


    onMount(()=>{
        console.log(form);
        console.log(currentDate)
    })


    function StartDate(event){
        const val = parseInt(event.target.value + event.key);




    }
    function monthInput(event){
        const val = parseInt(event.target.value + event.key);

        if(val > 12){
            event.preventDefault();
        }
    }
    function YearFormat(event){
        if(event.target.value > currentDate.getFullYear()){
            event.target.value = currentDate.getFullYear();
        }

    }
    function MonthFormat(event){
        if(event.target.value > 12){
            event.target.value = 12;
        }
        else if(event.target.value < 1 && !event.target.value == ''){
            event.target.value = 1;
        }
    }

    function CheckAllAnswered(event){
        let valid = true;
        console.log(values)
        if(values.length == 0){
            valid = false;
            return
        }
        values.forEach(val=>{
            if(val == ''|| !val){
                valid = false;
            }
        })

        allAnswered = valid;
    }
   
    $: values, CheckAllAnswered()

</script>
<a class="backButton" href="/Community/RateMyLandlord/Search?address={data.address}"><span class="fas fa-chevron-left"></span>back</a>
<section>
    <h1 class="address">{data.address}</h1>
    <form method="POST" action="?/upload&address={data.address}">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div  class="ratings">
            <fieldset class="fivePoint">
                <label for="overall">Management</label>
                <FivePointRating bind:value={values[0]} name="management"/>
            </fieldset>
            <fieldset class="fivePoint">
                <label for="overall">Responsiveness</label>
                <FivePointRating bind:value={values[1]}  name="responsiveness"/>
            </fieldset>
            <fieldset class="fivePoint">
                <label for="overall">Overall</label>
                <FivePointRating bind:value={values[2]}  name="overall"/>
            </fieldset>
        </div>

        <div class="response">
            <div class="dates">
                <div class="dateResponse">
                    <label for="startDay">Start Date</label>
                    <div  role="textbox" tabindex="0" class="customDate">
                        <input on:input={MonthFormat} bind:value={values[3]}  type="number" placeholder="Month" data-form="month" pattern="d*" maxlength="2" name="startMonth" id="endMonth">
                        <span>/</span>
                        <input on:input={YearFormat} bind:value={values[4]} type="number" placeholder="Year"  pattern="d*" maxlength="4" name="startYear" id="endYear">
                    </div>
                </div>
                <div class="dateResponse">
                    <label for="end">End Date</label>
                    <div  class="customDate">
                        <input on:input={MonthFormat} bind:value={values[5]} type="number" placeholder="Month" min=1 max=12 name="endMonth" id="endMonth">
                        <span>/</span>
                        <input on:input={YearFormat} bind:value={values[6]} type="number" placeholder="Year" max={currentDate.getFullYear()}  pattern="d*" maxlength="4" name="endYear" id="endYear">
                    </div>
                </div>

            </div>
            <label for="reviewBody">Comments (optional)</label>
            <div class="commentWrapper">
                <textarea bind:value={commentValue} maxlength=250 name="comments" id="reviewBody" cols="30" rows="6" ></textarea>
                <div class="commentOverlay">
                    <p class="commentCount {commentValue.length > 235? "commentCountWarning": ""}" >{commentValue.length}/250</p>
                </div>
            </div>
            <div class="reference">
                <input type="checkbox" name="willingToReference" id="ref">
                <label class="smallLabel" for="ref">I would like to be a part of the Rental Referal Program <span style="color:var(--color-theme-2)" class="fa fa-info-circle"></span></label>
            </div>
            <button disabled={!allAnswered}>submit</button>
        </div>


    </form>
</section>

<style>
    form{
        margin:auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    input{
        background:none;
    }
    label{
        display:block;
        color:white;
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }
    button{
        display: block;
        border:none;
        outline:none;
        background-color: var(--color-theme-2);
        padding: .2rem 1rem;
        border-radius: 2rem;
        color:white;
        font-size: 2rem;
        font-weight: bold;
        margin:auto;
        margin-top:2rem;

        transition:all 200ms ease-out;
    }
    button:disabled{
        background:none;
        outline: 3px solid white;
        cursor:auto;
    }
    textarea{
        border:none;
        resize: none;
        padding:.5rem;
        font-size: 1.2rem;
        background-color: rgba(255, 255, 255, 0.253);
        width:100%;
        transition: all 200ms ease-out;
    }
    textarea:focus{
        background-color: rgba(255, 255, 255, 0.558);
        border:none;
        outline:none;
    }
    .customDate{
        display: flex;
        align-items: center;
        justify-content: center;
        color:white;
        box-shadow: 0px 2px white;
        
    }
    .customDate span{
        font-size: 1.5rem;
    }
    .customDate input[type=number]{
        border:none;
        width:45%;
        box-shadow: none;
        color:white;
        font-size:1.5rem;
        text-align: center;
    }
    .customDate input[type=number]:focus{
        outline:none;
        border: none;
    }
    .customDate input[type=number]::placeholder{

    }
    
    .customDate input[type=number]::-webkit-outer-spin-button,
    .customDate input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
        margin: 0;
    }
    .dates{
        margin:auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    .dateResponse{
        margin:auto;
        margin-bottom: 1.5rem;
        width:90%;
    }
    .dateResponse label{
        text-align: center;
    }
    .backButton{
    
        color:var(--color-light-text);
        font-size: 2rem;
        margin:1rem;
        margin-top:0;


    }
    .backButton:hover{
        color:lightgreen;
    }
    .address{
        margin-top:0;
        color: lightgreen;
        font-size: 2rem;
        text-align: center;
    }
    
    .smallLabel{
        display: inline;
        font-size: 1rem;
        font-weight: normal;
    }
    .commentOverlay{
        pointer-events: none;
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height:100%;
    }
    .commentWrapper{
        position: relative;
    }
    .commentCount{
        position:absolute;
        bottom:0;
        right:0;
        margin:.5rem;
        color:rgba(0, 0, 0, 0.411);
    }
    .commentCountWarning{
        color:rgb(176, 115, 2);
    }
    .commentCountLimit{

    }

    .ratings{
        width:100%;
    }
    .fivePoint{
        margin: 2rem auto;
        border:none;
        width: clamp(15rem, 100%, 30rem)
    }
    .reference{
        
        text-align: center;
        margin-top:1rem;
    }
    .response{
        margin:1rem auto;
        width: clamp(15rem, 100%, 35rem)
    }
</style>