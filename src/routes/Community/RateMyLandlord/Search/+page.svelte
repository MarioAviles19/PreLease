<script>
    import LandlordReviewModal from "$lib/Components/LandlordReviewModal.svelte";
import {Chart} from "chart.js/auto"
	import { onMount } from "svelte";
    export let data
    

    const reviewCommentBreakpoint = 250;

    /**@type {Element}*/
    let rentChart;

    onMount(()=>{
        CreateChart()
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
                        ticks:{
                            color:"rgba(255,255,255,1)"
                        },
                        grid:{
                            color:"rgba(255,255,255,.4)"

                            
                        }
                        
                    },
                    x:{
                        ticks:{
                            color:"rgba(255,255,255,1)"
                        },
                        grid:{
                            color:"rgba(255,255,255,.4)"
                        }
                    }
                    
                },
                plugins:{
                    legend:{
                        display:false
                    }
                }
        }
        })
    }

    /**@param num {number}*/
    function RatingToColorString(num){
        if(num <= 2){
            return "red";
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
        console.log(el)

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
    console.log(data.userData)
    //TODO: Maybe consider Client Side Rendering for this page in particular

</script>
<a href="/Community/RateMyLandlord" class="backButton"><span class="fas fa-chevron-left"></span>Back</a>

<section id="overview">
    <div id="results" class="">
        <div class="roundedContainer heading">
            
            <h1 class="textColorAccent">{data.address}</h1>
            <a href="/Community/RateMyLandlord/Reviews?address={data.address}" class="reviewCount {data.property.reviewCount? "": "linkDisabled"}">{data.property.reviewCount || 0} reviews</a>
        

            <h2>Overall: {data.property.overallRatings || "N/A"}</h2>
            <h3>Management: {data.property.managementRating || "N/A"}</h3>
            <h3>Responsiveness: {data.property.responsivenessRating || "N/A"}</h3>

        </div>
        {#if !data.userHasMadeReview}
        <div class="myReview roundedContainer">
            <h1>Did you rent here?</h1>
            <a class="createButton" href="/Community/RateMyLandlord/Create?address={data.address}">Leave a Review</a>
        </div>
        {/if}

    
    </div>
    <div id="sidePanel">
        
        {#if Object.keys(data.reviews).length == 0}
        <div class="card roundedContainer noResult">
            <h1>No Results</h1>
            <p>It looks like no one has left a review yet!</p>
            <a class="createButton" href="/Community/RateMyLandlord/Create?address={data.address}">Be The First!</a>
        </div>
        {/if}
        
        <div class="rentGraphContainer glassContainer">
            <h2>Rent Over Time</h2>
            <canvas bind:this={rentChart} id="rentOverTime"></canvas>
        </div>
    </div>
</section>

<section id="reviews">
    <div class="reviewList">
        {#each data.reviews as review}

        {#each {length: 1} as _}
            <div class="reviewCard glassContainer">
                <div class="reviewHeader">
                <div class="ratingIndicator" style="background-color:{RatingToColorString(review.overallRating)}"></div>
                <h2 class="date">{review.startDate.getMonth()}/{review.startDate.getFullYear()} - {review.endDate.getMonth()}/{review.endDate.getFullYear()}</h2>
                </div>
                <div class="stars">
                    {#each {length: 5} as _, i}
                    <span class="star {review.overallRating >= i + 1? "filled": "unfilled"} fas fa-star "></span>
                    {/each}
                </div>
                <p>{review.comment}</p>

            </div>
            {/each}
        {/each}
    </div>
</section>
<LandlordReviewModal review={data.reviews[0]}></LandlordReviewModal>
<style>
    #overview{
        display: grid;
        grid-template-columns: 1.25fr .75fr;
        gap:1rem;

        margin-bottom: 1rem;

    }
    #reviews{

    }
    #rentOverTime{
        width:100%;
        background-color: rgba(0, 0, 0, 0.531);

    }

    .rentGraphContainer h2{
        margin:0;
        text-align: center;

    }
    .rentGraphContainer{
        padding:.5rem;
        background-color: rgba(0, 0, 0, 0.531);
    }
    
    .reviewList{
        display: grid;
        grid-template-columns:  1fr 1fr 1fr;
        gap:.5rem;
        width: clamp(10rem, 95%, 60rem)
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
    .star.filled{
        color: var(--color-theme-2);
    }
    .star.unfilled{
        color:grey;
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
        padding:1rem;
        color: white;
        width:100%;
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
    .reviewHeader h2{
        margin:0;
        display: inline-block;
        
    }
    .reviewHeader h1{
        display: inline-block;
    }
    .myReviewStats h2{
        margin:0;
        font-size: 2rem;
        text-align: right;
    }
    .myReviewStats h3{
        margin:0;
        font-size: 1.2rem;
    }
    .twoxgrid{
        display: grid;
        grid-template-columns: 1fr 1fr;
        
    }
    .myReview{
        margin-top:.5rem;
        padding:1rem;
    }
    .myReview .createButton{
        margin-right: 0;
    }
    .myReview h1{
        margin:0;
        font-size: 2rem;
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

        background-color: rgba(238, 238, 238, 0.164);
        border-radius: 0px;

        box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.346);
        color: var(--color-light-text)
    }
    #results{
        
        height: 100%;
    }
    #sidePanel{
        max-height: 100%;
       
    }
    .createButton{
        display: block;
        margin:.5rem auto;

        padding: .2rem 1rem;
        color:var(--color-light-text);
        background-color: var(--color-theme-2);
        border-radius: 1rem;
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


</style>