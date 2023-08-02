<script>
	import { fly } from "svelte/transition";

    export let data
</script>


{#key data.url}
<div in:fly={{duration: 500 ,delay: 500, opacity:0, x:'100vw'}}
    out:fly={{duration:500,opacity:0, x: '-100vw'}}
>
    <slot/>
</div>
{/key}


<div class="background">
    <img src="/longBrownstone.jpg" alt="Background of a brownstone building">
    <div class="glassTint overlay"></div>
</div>


<style>
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
</style>