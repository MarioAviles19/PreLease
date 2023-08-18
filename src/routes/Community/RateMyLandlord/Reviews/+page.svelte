<script>
    export let data

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
</script>

<section>
    <h1>{data.address}</h1>
    <div class="reviewList">
        {#each data.reviews as review}

        {#each {length: 1} as _}
            <div class="card glassContainer">
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

<style>
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
    .card{
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
</style>