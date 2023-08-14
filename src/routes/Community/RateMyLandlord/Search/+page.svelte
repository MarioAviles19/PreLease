<script>
    export let data

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
    //TODO: Maybe consider Client Side Rendering for this page in particular

</script>
<a href="/Community/RateMyLandlord" class="backButton"><span class="fas fa-chevron-left"></span>Back</a>

<section>
    <div id="results" class="roundedContainer">
        <div class="heading">
            
            <h1 class="textColorAccent">{data.address}</h1>
            <a href="/Community/RateMyLandlord/{data.address}" class="reviewCount {data.property.reviewCount? "": "linkDisabled"}">{data.property.reviewCount || 0} reviews</a>
        

            <h2>Overall: {data.property.overallRatings || "N/A"}</h2>
            <h3>Management: {data.property.managementRating || "N/A"}</h3>
            <h3>Responsiveness: {data.property.responsivenessRating || "N/A"}</h3>

        </div>
    </div>
    <div id="sidePanel">
        
        {#if Object.keys(data.reviews).length == 0}
        <div class="card roundedContainer noResult">
            <h1>No Results</h1>
            <p>It looks like no one has left a review yet!</p>
            <a href="/Community/RateMyLandlord/Create?address={data.address}">Be The First!</a>
        </div>
        {/if}
        
        {#each data.reviews as review}
        <div class="card review roundedContainer">
            <h1>{new Date(review.startDate).getMonth()}/{new Date(review.startDate).getFullYear()} - {new Date(review.endDate).getMonth()}/{new Date(review.endDate).getFullYear()}</h1>
            <p>{review.comments}</p>
            <h2>Overall Rating: <span style="color:{RatingToColorString(review.overall)}">{review.overall}/5</span></h2>
        </div>
        {/each}
    </div>
</section>


<style>
    section{
        display: grid;
        grid-template-columns: 1.25fr .75fr;
        gap:1.5rem;

        height:75vh;

    }
    .linkDisabled{
        pointer-events: none;
    }
    .heading h1{
        
        font-size: 2rem;
    }
    .heading h2{
        
        font-size: 2rem;
    }
    .heading h3{
        font-weight: normal;
        font-size: 1.4rem;
    }
    .heading a{
        color:white;
        text-decoration: underline;
    }
    .heading a:hover{
        color:lightgreen;
    }
    .backButton{
        display: block;
        color:var(--color-light-text);
        font-size: 2rem;
        margin:1rem;
        margin-top:0;
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
        padding:1rem;
        height: 100%;
    }
    #sidePanel{
        max-height: 100%;
       
    }
    .card a{
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
        height: 40%;
        margin-bottom: 0;
    }

    .card{

        padding:1rem;
        width:100%;
        height:10rem;
        margin-bottom: 1rem;
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
        margin:0;
        font-size: 1.2rem;
        
    }
    @media (prefers-color-scheme: dark) {

}


</style>