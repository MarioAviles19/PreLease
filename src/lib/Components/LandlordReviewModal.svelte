<script>
    import StarRating from "./StarRating.svelte";
    /**@type {import("$lib/Interfaces/databaseTypes.d.ts").LandlordReview}*/
    export let review;
    export let modalOpen = true;

    
    function ToggleModal(){
        modalOpen = !modalOpen;
    }


</script>

{#if modalOpen}
<section class="modalWrapper">
    <div class="modalUnderlay" role="button" tabindex="-1" on:keyup={event=>{if(event.key == "Escape") ToggleModal}} on:click={ToggleModal}></div>
    <div class="modal tint">
        <div class="header">
            <h2>Review</h2>
            <button on:click={ToggleModal} class="closeButton" type="button"><span class="fas fa-close"></span></button>
        </div>
        <div class="info">
            <div class="leftSide">
                <p class="rentalPeriod">Rental Period - {review.startDate?.getMonth() + 1}/{review.startDate?.getFullYear()} - {review.endDate?.getMonth() + 1}/{review.endDate?.getFullYear()}</p>
            </div>
            <div class="rightSide">
                <p class="housingType">Type - 1 bedroom Apartment</p>
                <p class="rent">Average Rent - {review.price ?? "$600"}</p>
            </div>
        </div>
        <div class="ratings">
            <div class="rating">
                <h3>Management</h3>
                <StarRating value={review.managementRating}/>
            </div>
            <div class="rating overallRating">
                <h3>Overall</h3>
                <StarRating value={review.overallRating}/>
            </div>
            <div class="rating">
                <h3>Responsiveness</h3>
                <StarRating value={review.responsivenessRating}/>
            </div>
        </div>
        <h3>Comment</h3>
        <p>{review.comment}</p>


    </div>
</section>
{/if}

<style>
    h2,h3{
        margin: 0;
    }
    h2{
        font-size: 2rem;
        margin-top: 0;
    }
    .modalUnderlay{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
    }
    .header{
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
    }
    .info p{
        margin-top:0;
        text-align: right;
    }
    .info{
        display: flex;
        justify-content: space-between;
    }

    .rentalPeriod{
        font-size: 1rem;
        margin-bottom:1rem;

    }

    .closeButton{
        background: none;
        border:none;
        color:white;
        font-size: 2.5rem;
        margin-top: -.2rem;
        
    }
    .closeButton:hover{
        color:lightgreen;
    }
    .overallRating{
        font-size: 1.6rem;
        margin-top: -1rem;
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
        margin-bottom: 1.5rem;
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

        backdrop-filter: blur(2px);
        background-color: rgba(0, 0, 0, 0.271);

    }
    .tint{
        background-color: rgba(0, 0, 0, 0.685);
        backdrop-filter: blur(7px);

    }
    .modal{
        width:clamp(15rem, 95%, 50rem);
        color:white;
        padding: 1rem;
        margin-top:-3rem;
        padding-bottom: 2rem;
    }
</style>