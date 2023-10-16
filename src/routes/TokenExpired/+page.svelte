
<svelte:head>
    <title>Link Expired</title>
    <meta name="description" content="The link you are accessing has already been used">
</svelte:head>

<section>
    <div class="message">
        <h2>Link Expired</h2>
        <span aria-hidden="true" class="fas fa-unlink icon"></span>

        <p>The link you are accessing has already been used</p>
    </div>
</section>

<style>

    .icon{
        display: block;
        font-size: 7rem;
        color:rgba(0, 0, 0, 0.216);
    }

    .message{
        margin:auto;
        margin-top:2rem;
        text-align: center;
    }
</style>