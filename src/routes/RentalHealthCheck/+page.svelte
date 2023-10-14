<script lang=ts>
    import CustomSelect from "$lib/Components/CustomSelect.svelte"
	import type { RentalHealthCheckClient, ResourceClient, ResourceRequirmentList } from "$lib/Interfaces/databaseTypes.js";
	import { FormatStringAsPhoneNumber } from "$lib/helpers";

    import {RentalHealthCheck, RequirementList} from "prelease/HealthChecks";
    export let data;



    
    let rentalHealthchecks : Array<RentalHealthCheckClient> = [];
    
    let currentHealthCheck : RentalHealthCheck;


    //TODO: Sort the resources by eligability before resolving
    let resources : Promise<Array<ResourceClient>> = data.streamed.resources;
    
    function ScoreToRating(score : number){

        if(score <= 14){
            return "Poor";
        } else if(score <= 18){
            return "Okay";
        } else{
            return "Good";
        }
    }
    function RatingToColor(rating : string){

        switch (rating){

            case "Poor":
                return "var(--color-rating-poor)"
                break;
            case "Okay":
                return "var(--color-rating-medium)";
                break;
            case "Good":
                return "var(--color-theme-2)"
                break;
            default:
                
                break;
        }
    }
    
    function CheckEligability(healthCheck : RentalHealthCheckClient){

        if(!currentHealthCheck){
            return;
        }
        resources.then(val=>{

            val.forEach(rs=>{
                const list = new RequirementList(rs.requirements);
                console.log(currentHealthCheck.healthCheck.id);
                console.log(list.CheckEligability(currentHealthCheck.healthCheck, true))
            })
        })

    }
    $: CheckEligability(currentHealthCheck);

</script>

<section class="content">
    <h1>Rental Health Check</h1>


    <div class="healthChecks">
        <h2>Previous Rental Health Checks</h2>
        {#await data.streamed.healthChecks}
        waiting...
        {:then healthChecks}
        <div class="selectHealthCheck">
            <CustomSelect selectFirst on:change={ev=>{currentHealthCheck = new RentalHealthCheck(rentalHealthchecks[parseInt(ev.detail.value)]);}} name="currentHealthCheck" options={healthChecks.map((doc, i)=>{rentalHealthchecks.push(doc);return {name: doc.timestamp.toDateString(), value: i.toString()}})}>
            --
            </CustomSelect>
            
        </div>
        <div class="healthCheckContent">
            {#if currentHealthCheck}
                <div class="headerInfo">
                    <div>
                        <h3 class="rating">Rental Health Rating:</h3>
                        <p class="score" style="color:{RatingToColor(ScoreToRating(currentHealthCheck.GetScore().score))}">{ScoreToRating(currentHealthCheck.GetScore().score)}</p>
                    </div>
                    <div class="rightCorner">
                        <p class="subtleText">ID:{currentHealthCheck.healthCheck.id}</p>
                    </div>
                </div>{#if ScoreToRating(currentHealthCheck.GetScore().score) == "Poor"}
                <p>Your Rental Health score could use some work.</p>
                {:else if ScoreToRating(currentHealthCheck.GetScore().score) == "Okay"}
                <p>Your Rental Health is pretty good! However, there are still some areas that could be improved</p>
                {:else if ScoreToRating(currentHealthCheck.GetScore().score) == "Good"}
                <p>Your Rental Health is doing well! There may still be an area or two that aren't perfect, but you're doing good overall</p>
                {/if}
                <h4>Concern Areas:</h4>
                <p>
                    {#each currentHealthCheck.GetScore().penalties as penalty}
                        <span class="tag" style={penalty.penalty > 2? "background-color: var(--color-rating-poor)": "background-color:var(--color-rating-medium)"}> {penalty.name}</span>
                    {/each}
                    {#if currentHealthCheck.GetScore().penalties.length == 0}
                    <p class="flavorText">No Areas of Concern</p>
                    {/if}
                </p>
                <h4>Resources</h4>
                {#await resources}
                <p>Loading resources</p>

                {:then resourceList}
                {#each resourceList as resource, i}
                <div class="resourceCard">
                    <div class="headerInfo">
                        <div class="resourceHead">
                            <img src={resource.organization.icon} alt="Organization Icon">
                            <h5>{resource.name}</h5>
                            <p class="subtleText">{FormatStringAsPhoneNumber(resource.phoneNumber?.toString() || "")}</p>
                        </div>
                        {#if resource.link}
                        <a class="largeButton" target="_blank" href={resource.link}>Apply <span aria-hidden="true" class="fas fa-external-link"></span></a>
                        {/if}

                    </div>
                    <h6>Eligability:</h6>
                    <p style="color:{new RequirementList(resource.requirements).CheckEligability(currentHealthCheck.healthCheck).eligable? "var(--color-rating-good)": "var(--color-rating-poor)"}">{new RequirementList(resource.requirements).CheckEligability(currentHealthCheck.healthCheck).eligable? "Eligable": "Ineligable"}</p>
                    <p>{resource.description}</p>
                </div>
                {/each}
                {/await}
                {#if currentHealthCheck.seen}
                Your health check has been seen
                {:else if currentHealthCheck.seen === false}
                <p>Your health check has not yet been viewed by your organization's housing navigator</p>
                {/if}
            {:else}
            <h3>No Rental Health Checks</h3>
            <p class="flavorText">You have not yet completed a Rental Health Check</p>
            {/if}
        </div>

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
    h2{
        font-size: 1.2rem;
    }
    h3{
        font-size: 2rem;
        margin:0;
    }
    p{
        margin-top:.5rem;
        margin-bottom: 1rem;
    }
    .fullWidth{
        width:100%;
    }
    .score{
        margin-top: .5rem;
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }
    
    h4{
        margin-bottom: 0;
        font-size: 1.2rem;
    }
    h5,
    h6{
        margin:0;
    }
    .resourceCard{
        padding:1rem;
        box-shadow: 1px 1px 2px 2px var(--color-soft-black);
        margin-bottom: 1rem;
        border-radius: 5px;
    }
    .resourceHead img{
        width:3rem;
    }
    .resourceHead{
        display: flex;
        align-items: center;
        gap:1rem;
    }
    .resourceHead h5{
        font-size: 1.2rem;
    }
    .resourceHead p{
        margin: 0;
    }
    .headerInfo{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .headerInfo p{
        margin:0;
    }
    .rightCorner{
        text-align: right;
    }
    .healthCheckContent{
        box-shadow: 0 3px 3px -3px var(--color-soft-black),  0 -3px 3px -3px var(--color-soft-black);
        padding : 1rem;
        margin: 1rem 0;
    }
    .tag{
        display: inline-block;
        border-radius: 99rem;
        color:white;
        margin: 0 .5rem;
        padding: .2rem .4rem;
        font-size: .8rem;
        white-space: nowrap;
    }
    .selectHealthCheck{
        width:10rem;
    }



</style>