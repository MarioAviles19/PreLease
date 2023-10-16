<script>
    export let data;
</script>

<section class="panel content">
    {#if data.userEmail}
    <h2>Verify Your Email!</h2>
    <p>An email has been sent to <span class="highlightedText">{data.userEmail}</span> asking you to verify your email. 
        Once you've done that, you can sign in and enjoy using PreLease</p>
    <p class="smallText">You may close this tab</p>
    {:else}
    <h2>Error!</h2>
    <p>An unknown error occured!</p>
    <a href="/SignIn" class="largeButton">Return to Sign In</a>
    {/if}

</section>

<style>
    section{
        margin-top: 1rem;
        max-width: 50rem;
        border-radius: 3px;
        box-shadow: 1px 1px 3px var(--color-soft-black);
    }
    h2{
        margin: 0;
    }
    .highlightedText{
        color:var(--color-theme-2);
        font-weight: bold;
    }
    .smallText{
        font-size: .8rem;
    }
</style>