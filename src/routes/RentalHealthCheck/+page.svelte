<script lang=ts>
    import CustomSelect from "$lib/Components/CustomSelect.svelte"
	import type { RentalHealthCheckClient } from "$lib/Interfaces/databaseTypes.js";
    export let data;



    
    let rentalHealthchecks : Array<RentalHealthCheckClient> = [];
    
    let currentHealthCheck : RentalHealthCheckClient;
    

</script>

<section class="content">
    <h1>Rental Health Check</h1>


    <div id="healthChecks">
        <h2>Previous Rental Health Checks</h2>
        {#await data.streamed.healthChecks}
        waiting...
        {:then healthChecks}
        <div class="selectHealthCheck">
            <CustomSelect on:change={ev=>{currentHealthCheck = rentalHealthchecks[parseInt(ev.detail.value)]; console.log(currentHealthCheck);}} name="currentHealthCheck" options={healthChecks.map((doc, i)=>{ rentalHealthchecks.push(doc);return {name: doc.timestamp.toDateString(), value: i.toString()}})}>
            --
            </CustomSelect>
        </div>
        

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