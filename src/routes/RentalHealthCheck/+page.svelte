<script>
    export let data;

    console.log(data.userData)
</script>

<section>
    <h1>Rental Health Check</h1>

    <p>The Rental Health Check is a diagnostic tool that we at PreLease use to connect you with housing resources based upon various factors including rental history, personal information, demographic information and income.</p>
    <div id="buttons">
    
        <a href="/RentalHealthCheck/Survey" class="continueButton chunkyButton">{!data.userData? "Sign In": "Continue"}</a>

    </div>
</section>









<style>
    section{
        width:85%;
        max-width: 50rem;
        margin:auto;
        margin-top:1rem;
        background-color: white;
        border-radius: 10px;
        box-shadow: 1px 1px 3px var(--color-trim);
        padding:1.5rem;

    }

    #buttons{
        width:100%;
        display: flex;
        align-items: center;
        justify-content: right;
    }
    .continueButton{
        font-size: 1.5rem;

    }
    @media screen and (max-width:520px){
        section{
            line-height: 2rem;
            width:95%;
        }
    }
</style>