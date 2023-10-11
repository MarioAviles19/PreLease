<script lang=ts>
    import { fly } from "svelte/transition";
    export let open : boolean = false;
</script>
{#if open}
<div transition:fly={{}} on:mouseleave={()=>{open=false}} role="dialog" class="menu">
    <slot/>
</div>
{/if}

<style>
     :global(.menu button:hover, .menu a:hover){
        background-color: rgba(0, 0, 0, 0.068);
    }
    :global(.menu){
        z-index: 100;
        padding: .5rem 0;
        border-radius: 4px;
        top: 0;
        right:0;
        background-color: white;
        position: absolute;
        box-shadow: 2px 2px 5px black;

    }
    :global(.menu a,
    .menu button) {
        background:none;
        margin:0;
        display: block;
        text-align: left;
        font-size: 1rem;
        padding:.5rem;
        width:100%;
        white-space: nowrap;

    }
</style>