<script>
    import StarRating from "./StarRating.svelte";
    /**@type {import("$lib/Interfaces/databaseTypes.d.ts").LandlordReview}*/
    export let review;
    export let modalOpen = true;


</script>

{#if modalOpen}
<section class="modalWrapper ">

    <div class="modal tint">
        <h1>Review</h1>
        <h2>{review.startDate.getMonth()}/{review.startDate.getFullYear()} - {review.endDate.getMonth()}/{review.endDate.getFullYear()}</h2>

        <div class="ratings">
            <div class="rating">
                <h3>Management</h3>
                <StarRating value={review.managementRating}/>
            </div>
            <div class="rating">
                <h3>Responsiveness</h3>
                <StarRating value={review.responsivenessRating}/>
            </div>
            <div class="rating">
                <h3>Overall</h3>
                <StarRating value={review.overallRating}/>
            </div>
        </div>
        <h2>Comment</h2>
        <p>{review.comment}</p>

        <button class="closeButton" type="button"><span class="fas fa-close"></span></button>
    </div>


</section>
{/if}

<style>
    h1,h2,h3{
        margin: 0;
    }
    .closeButton{
        background: none;
        border:none;
        color:white;
        font-size: 2rem;
        position: absolute;
        top:0;
        right:0;
        margin:1rem;
        
    }
    .closeButton:hover{
        color:lightgreen;
    }
    .rating{
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .ratings{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    .modalWrapper{
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        left:0;
        width:100%;
        height: 100%;

    }
    .tint{
        background-color: rgba(0, 0, 0, 0.38);
        backdrop-filter: blur(6px);
    }
    .modal{
        width:clamp(15rem, 95%, 50rem);
        color:white;
        padding: 1rem;
    }
</style>