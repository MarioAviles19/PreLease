<script lang=ts>
	import { fade } from "svelte/transition";


    export let open = true;



    
</script>


{#if open}
<div role="dialog" transition:fade={{duration: 100}} class="container">


    <slot/>


</div>

{/if}

<style>
    .container{
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height: 100%;
        z-index: 100;
        background-color: rgba(0, 0, 0, 0.558);
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>