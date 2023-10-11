<script lang=ts>
    import CustomSelect from "$lib/Components/CustomSelect.svelte"
	import type { RentalHealthCheckClient } from "$lib/Interfaces/databaseTypes.js";

    import {RentalHealthCheck} from "prelease/HealthChecks";
    export let data;



    
    let rentalHealthchecks : Array<RentalHealthCheckClient> = [];
    
    let currentHealthCheck : RentalHealthCheck;
    
    

</script>

<section class="content">
    <h1>Rental Health Check</h1>


    <div id="healthChecks">
        <h2>Previous Rental Health Checks</h2>
        {#await data.streamed.healthChecks}
        waiting...
        {:then healthChecks}
        <div class="selectHealthCheck">
            <CustomSelect selectFirst on:change={ev=>{currentHealthCheck = new RentalHealthCheck(rentalHealthchecks[parseInt(ev.detail.value)]); console.log(currentHealthCheck);}} name="currentHealthCheck" options={healthChecks.map((doc, i)=>{rentalHealthchecks.push(doc);return {name: doc.timestamp.toDateString(), value: i.toString()}})}>
            --
            </CustomSelect>
            
        </div>
        {#if currentHealthCheck}

            <h4>Rental Health Rating:</h4>
            <p>{currentHealthCheck.GetScore().score}/{currentHealthCheck.GetScore().totalScore}</p>

            <h4>Problem Areas</h4>
            <p>
                {#each currentHealthCheck.GetScore().penalties as penalty}

                    <span class="tag" style={penalty.penalty > 2? "background-color: red": "background-color:orange"}> {penalty.name} </span>

                {/each}
            </p>

            {#if currentHealthCheck?.seen}
            Your health check has been seen
            {:else}
            <p>Your health check has not yet been viewed by your organization's housing navigator</p>
            {/if}

        {:else}

        <h3>No Rental Health Checks</h3>
        <p>You have not yet completed a Rental Health Check</p>
        {/if}

        <a href="/RentalHealthCheck/Survey" class="largeButton">Take A Rental Health Check</a>

        {/await}


    </div>
</section>









<style>
    section{
        margin:auto;
        margin-top:1rem;
        background-color: white;
        border-radius: 10px;
        box-shadow: 1px 1px 3px var(--color-trim);
        padding:1.5rem;

    }
    .tag{
        display: inline-block;
        border-radius: 99rem;
        color:white;
        margin: 0 .5rem;
        padding: .2rem .4rem;

        white-space: nowrap;
    }
    .selectHealthCheck{
        width:10rem;
    }


    @media screen and (max-width:520px){
        section{
            line-height: 2rem;
            width:95%;
        }
    }
</style>