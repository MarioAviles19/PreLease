<script>
    export let data;

    
</script>

<section>
    <h1>Rental Health Check</h1>

    <p>The Rental Health Check is a diagnostic tool that we at PreLease use to connect you with housing resources based upon various factors including rental history, personal information, demographic information and income.</p>
    <div id="buttons">
    
        <a href="/RentalHealthCheck/Survey" class="continueButton">{data.userData? "Continue": "Sign In"}</a>

    </div>
</section>









<style>
    section{
        width:65%;
        margin:auto;

    }

    #buttons{
        width:100%;

    }
    .continueButton{
        padding:1rem;
        background-color: var(--color-theme-1);
        float:right;

        border-radius: 3px;
    }
</style>