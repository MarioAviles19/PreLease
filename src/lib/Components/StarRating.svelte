<script>
    /**@type {number}*/
    export let value;

</script>

<div class="stars">
    {#each {length: 5} as _, i}
    <span class="star {value >= i + 1? "filled": "unfilled"} fas fa-star "></span>
    {/each}
</div>

<style>
    .filled{
        color:lightgreen;
    }
    .unfilled{
        color:grey;
    }
</style>