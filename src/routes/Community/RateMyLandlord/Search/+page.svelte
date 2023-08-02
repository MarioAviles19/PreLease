<script>
    export let data

    

</script>

<section>
    <div id="results" class="roundedContainer">
        <div id="heading">
            
            <h1 class="textColorAccent">{data.address}</h1>
            <p>2 reviews</p>
        

            <h2>Overall: {data.addressInfo.overallRating || "N/A"}</h2>
            <h2>Management: {data.addressInfo.managementRating || "N/A"}</h2>
            <h2>Responsiveness: {data.addressInfo.responsivenessRating || "N/A"}</h2>

        </div>
        

        {#if Object.keys(data.addressInfo).length == 0}
            <div class="noResultsMessage roundedContainer">
                <p>It looks like no one has made an entry for <span class="textColorAccent">{data.address}</span> yet!</p>
                <a href="/">Be The First!</a>
            </div>
        {/if}
    </div>
    <div id="sidePanel">
        
        {#if Object.keys(data.addressInfo).length == 0}
        <div class="card roundedContainer">
            <h1>No Results</h1>
            <p>It looks like no one has left a review yet!</p>
            <a href="/">Be The First!</a>
        </div>
        {/if}
        <div class="card review roundedContainer">
            <h1>2/2023 - 4/2023</h1>
            <p>"Very responsive! When my dishwasher broke, they were able to get it fixed within the day!"</p>
            <h2>Overall Rating: 4/5</h2>
        </div>
    </div>
</section>


<style>
    section{
        display: grid;
        grid-template-columns: 1.25fr .75fr;
        padding:1rem 2rem;
        gap:1.5rem;

        min-height:85vh;

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

    }
    .background{
        z-index: -1;
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
    }
    
    .background img{
        position: absolute;
        display: block;
        top:0;
        left:0;
        width:100%;
        height:100%;
        object-fit: cover;
    }
    .noResultsMessage{
        
        width:80%;
        margin:auto;
        font-size: 1.2rem;
        padding:.5rem 0;
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

    .card{

        padding:1rem;
        width:100%;
        min-height:10rem;
        margin-bottom: 1rem;
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