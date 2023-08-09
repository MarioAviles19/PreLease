<script>
	import { fly } from "svelte/transition";

    //TODO: Page transitions
</script>


<div class="content">
    <slot/>
</div>


<div class="background">
    <img src="/longBrownstone.jpg" alt="Background of a brownstone building">
    <div class="glassTint overlay"></div>
</div>


<style>
    .contentWrapper{
        overflow:none;
        
    }
    .content{
        padding:1rem;
        overflow-x: hidden;
        max-width: 100%;
        
    }
    .background{
    overflow: hidden;
    z-index: -1;
    position: fixed;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
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