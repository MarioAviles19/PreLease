<script>
    import FivePointRating from "$lib/Components/FivePointRating.svelte";
    import LandlordReviewModal from "$lib/Components/LandlordReviewModal.svelte";
	import StarRating from "$lib/Components/StarRating.svelte";
    import {Chart} from "chart.js/auto"
	import { onMount } from "svelte";
    export let data
    
    /**@type {import("$lib/Interfaces/databaseTypes.js").LandlordReview}*/
    let currentReviewInModal;
    let reviewModalOpen = false;

    const reviewCommentBreakpoint = 250;

    /**@type {Element}*/
    let rentChart;

    onMount(()=>{
        CreateChart();

    })
    

    function CreateChart(){
        new Chart("rentOverTime",{
            type:"line",
            data:{
                
                labels:[2000,2005,2010,2015, 2020],
                
                datasets:[{
                
                backgroundColor:"#90ee90",
                borderColor: "#90ee90",
                borderWidth:1,
                data:[500, 700, 820, 900, 1100]
                }]
            },
            options: {
                scales:{
                    
                    y:{
                        beginAtZero:true,
                        ticks:{
                            color:"rgba(255,255,255,1)",
                            
                        },
                        grid:{
                            color:"rgba(255,255,255,.4)"

                            
                        }
                        
                    },
                    x:{
                        //TODO: Look into timeseries adapter for chartjs
                        ticks:{
                            color:"rgba(255,255,255,1)"
                        },
                        grid:{
                            color:"rgba(255,255,255,.4)"
                        }
                    }
                    
                },
                
                plugins:{
                    tooltip:{
                        displayColors:false,
                        callbacks:{
                            label: function(tooltipItem){
                                return "$" + tooltipItem.formattedValue;
                            }
                        },
                    },
                    legend:{
                        display:false
                    }
                }
        }
        })
    }
    /**@param review {import("$lib/Interfaces/databaseTypes.js").LandlordReview}*/
    function OpenReviewModal(review){
        currentReviewInModal = review;
        reviewModalOpen = true;
    }

    /**@param num {number}*/
    function RatingToColorString(num){
        if(num <= 2){
            return "var(--color-rating-poor)";
        }
        else if(num <= 3){
            return "orange";
        }
        else if(num <= 5){
            return "lightgreen";
        }
    }
    /**@param el {Element}*/
    function TruncateCommentPreview(el){


        //TODO: change this to innerText
        //Get the innerHTML 
        /**@type {string}*/
        let value = el.innerHTML;
        //Truncate it at character 150
        let truncated = value.slice(0,reviewCommentBreakpoint);

        //Split the array by spaces
        let wordArray = truncated.split(" ")
        //Remove the last bit
        wordArray.pop()

        if(value.length > reviewCommentBreakpoint){
            el.innerHTML = wordArray.join(" ") + " . . . ."
        }
    }

    //TODO: Maybe consider Client Side Rendering for this page in particular

</script>
<a href="/Community/RateMyLandlord" class="backButton"><span class="fas fa-chevron-left"></span>Back</a>

<section id="overview">
    <div id="results" class="">
        <div class="roundedContainer heading">
            
            <h1 class="textColorAccent">{data.address}</h1>
            <a href="/Community/RateMyLandlord/Reviews?address={data.address}" class="reviewCount {data.property.reviewCount? "": "linkDisabled"}">{data.property.reviewCount || 0} reviews</a>
        

            <h2>Overall: 
                <span>
                {#if data.property.overallRatings}
                <StarRating value= {data.property.overallRatings}/>
                {:else}
                N/A
                {/if}
                </span>
            </h2>
            <h3>Management: 
                <span>
                    {#if data.property.managementRating}
                    <StarRating value= {data.property.managementRating}/>
                    {:else}
                    N/A
                    {/if}
                    </span>
            </h3>
            <h3>Responsiveness: 
                <span>
                    {#if data.property.responsivenessRating}
                    <StarRating value= {data.property.responsivenessRating}/>
                    {:else}
                    N/A
                    {/if}
                    </span>
            </h3>

        </div>


    
    </div>
    <div id="sidePanel">
        
        <div class="rentGraphContainer glassContainer">
            <h2>Rent Over Time</h2>
            <canvas bind:this={rentChart} style="width:100% !important" id="rentOverTime"></canvas>
        </div>
    </div>

    {#if !data.userHasMadeReview}
    <div class="leaveReview roundedContainer">
        <h2>Did you rent here?</h2>
        <a class="createButton" href="/Community/RateMyLandlord/Create?address={data.address}">Leave a Review</a>
    </div>

    <div class="landlordQuestion roundedContainer">
        <h2>Own This Property?</h2>
        <a class="createButton" href="">I'm a landlord</a>
    </div>
    {/if}

</section>

<section id="reviews">
    <h2>Reviews</h2>
    <div class="reviewList">
        {#each data.reviews as review}

        {#each {length: 1} as _}
            <div class="reviewCard glassContainer">
                <div class="reviewHeader">
                <div class="ratingIndicator" style="background-color:{RatingToColorString(review.overallRating)}"></div>
                <h3 class="date">{review.startDate?.getMonth() + 1}/{review.startDate?.getFullYear()} - {review.endDate?.getMonth() + 1}/{review.endDate?.getFullYear()}</h3>
                </div>
                <div class="stars">
                    {#each {length: 5} as _, i}
                    <span class="star fas fa-star " style={review.overallRating >= i + 1? `color:${RatingToColorString(review.overallRating)}`: "color:grey"}></span>
                    {/each}
                </div>
                <p>{review.comments}</p>
                <button on:click={()=>{OpenReviewModal(review)}} class="overlay modalToggleButton" type="button"></button>

            </div>
            {/each}
        {/each}
    </div>
</section>
<LandlordReviewModal bind:modalOpen={reviewModalOpen} review={currentReviewInModal}></LandlordReviewModal>
<style>
    #overview{
        display: grid;
        grid-template-columns: 1.2fr .8fr;
        gap:1rem;

        margin:auto;
        margin-bottom: 1rem;
        width:clamp(15rem, 100%, 75rem);
        
    }
    #reviews{
        width:clamp(15rem, 100%, 75rem);
        margin:auto;
    }
    #reviews h2{
        color:white;
        font-size: 2rem;
        margin-bottom: .5rem;
    }
    #rentOverTime{
        /*overrides the chartjs styling which was breaking the css*/
        width:100% !important;
        background-color: rgba(0, 0, 0, 0.531);

    }
    .modalToggleButton{
        background:none;
        border:none;
        outline:none;
    }
    .rentGraphContainer h2{
        margin:0;
        text-align: center;
        margin-bottom: 1rem;

    }
    .rentGraphContainer{
        padding:.5rem;
        background-color: rgba(0, 0, 0, 0.531);
    }
    
    
    .reviewList{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap:3rem;
        width:100%;
        margin:auto;
    }
    .date{
        margin:0;
        font-size: 1rem;
    }
    .reviewHeader{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: .5rem;
    }

    .stars{
        font-size: 1.2rem;
    }
    .ratingIndicator{
        aspect-ratio: 1/1;
        width:1rem;
        border-radius: 99rem;
    }
    .reviewCard{
        position: relative;
        padding:1rem;
        color: white;
        width:100%;
        transition: all 100ms ease-out;
    }
    .reviewCard:hover{
        background-color: rgba(238, 238, 238, 0.257);
        transform: translateY(-3px);
    }
    .glassContainer{
        background-color: rgba(238, 238, 238, 0.164);
        border-radius: 0px;

        box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.346);
        color: var(--color-light-text)
    }
    .reviewHeader{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .landlordQuestion h2{
        margin-top:0;
        font-size: 1.8rem;
    }
    .landlordQuestion a{
        margin-right:0;
        font-size: 1.5rem;
    }
    .leaveReview{

        padding:1rem;
        grid-column: 1/2;
    }
    .leaveReview h2{
        font-size: 1.8rem;
        margin-top:0;
    }
    .leaveReview .createButton{
        margin-right: 0;
        font-size: 1.5rem;
    }
    .linkDisabled{
        pointer-events: none;
    }
    .heading{
        padding:1rem;
    }
    .heading h1{
        margin-top:0;
        font-size: 2rem;
    }
    .heading h2{
        
        font-size: 2rem;
    }
    .stat{
        margin:0;
        font-weight: normal;
        font-size: 1.4rem;
    }
    .heading a{
        color:white;
        text-decoration: underline;
    }
    .heading a:hover{
        color:#90ee90;
    }
    .backButton{
        display: block;
        width:fit-content;
        color:var(--color-light-text);
        font-size: 2rem;
        padding:1rem;
        padding-top:0;
    }
    .textColorAccent{

        color:lightgreen;
    }
    .roundedContainer {
        padding:1rem;
        background-color: rgba(238, 238, 238, 0.164);
        border-radius: 0px;

        box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.346);
        color: var(--color-light-text)
    }
    #results{
        
        height: 100%;
    }
    #sidePanel{
        height: 100%;
        
       
    }
    .createButton{
        display: block;
        margin:.5rem auto;

        padding: .2rem 1rem;
        color:var(--color-light-text);
        background-color: var(--color-theme-2);
        border-radius: 99rem;
        width:fit-content;

        font-size: 1.2rem;

    }
    .card p{
        min-height: 40%;
        overflow:hidden;
        
        margin-bottom: 0;
    }

    .card{
        position: relative;
        padding:1rem;
        width:100%;
        height:10rem;
        margin-bottom: 1rem;

        transition: all 150ms ease-out;
    }
    .card:hover{
        background-color: rgba(238, 238, 238, 0.257);
        transform: translateY(-3px);
    }
    .noResult h1{
        margin:0;
    }
    .card.review h1{
        margin:0;
        font-size: 1rem;
        color:var(--color-trim)
    }
    .card.review h2{

        font-size: 1.2rem;
        
    }
    @media (prefers-color-scheme: dark) {

}

@media only screen and (max-width: 900px){
        .reviewList{
            grid-template-columns: 1fr 1fr;
            gap:.5rem
        }
        #overview{
            grid-template-columns: 1fr;
        }
    }
    @media only screen and (max-width: 520px){
        .reviewList{
            grid-template-columns: 1fr;
        }
    }


</style>