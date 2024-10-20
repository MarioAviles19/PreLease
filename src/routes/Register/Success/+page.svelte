<script>
    export let data;
</script>

<section class="panel content">
    {#if data.userEmail}
    <h2>Success!</h2>
    <p>Your PreLease account has been successfully created</p>
    <a href="/SignIn" class="largeButton">Return to Sign In</a>

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