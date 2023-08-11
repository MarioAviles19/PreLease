<script>
    import FivePointRating from "$lib/Components/FivePointRating.svelte";
	import { onMount } from "svelte";


    let values = [];

    let allAnswered = false;

    export let form;
    onMount(()=>{
        console.log(form);
    })
    function CheckAllAnswered(event){
        let valid = true;
        if(values.length == 0){
            valid = false;
            return
        }
        values.forEach(val=>{
            if(val == ''){
                valid = false;
            }
        })

        allAnswered = valid;
    }
   
    $: values, CheckAllAnswered()
</script>

<section>
    <form method="POST" action="?/upload">
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
            <label for="reviewBody">Comments (optional)</label>
            <textarea name="comments" id="reviewBody" cols="30" rows="6" value={form?.comments ?? ''}></textarea>
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
    
    .smallLabel{
        display: inline;
        font-size: 1rem;
        font-weight: normal;
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