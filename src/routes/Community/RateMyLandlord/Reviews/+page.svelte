<script>
    export let data

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
</script>

<section>
    <div class="reviewList">
        {#each data.reviews as review}
        <div class="card glassContainer">
            <div class="ratingIndicator" style="background-color:{RatingToColorString(review.overallRating)}"></div>
            <h2>{review.startDate.getMonth()}/{review.startDate.getFullYear()} - {review.endDate.getMonth()}/{review.endDate.getFullYear()}</h2>
            <h1>Overall: {review.overallRating}</h1>
            <h1>Management: {review.managementRating}</h1>
            <h1>Responsiveness: {review.responsivenessRating}</h1>
            <p>{review.comment}</p>

        </div>
        {/each}
    </div>
</section>

<style>
    .ratingIndicator{
        aspect-ratio: 1/1;
        width:1rem;
        border-radius: 99rem;
    }
    .card{
        padding:1rem;
    }
    .glassContainer{
        background-color: rgba(238, 238, 238, 0.164);
        border-radius: 0px;

        box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.346);
        color: var(--color-light-text)
    }
</style>