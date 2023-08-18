<script>
    /**@type {number}*/
    export let value;

    /**@param {number} num*/
    function RatingToColorString(num){
        if(num <= 2){
            return "var(--color-rating-poor)";
        }
        else if(num <= 3){
            return "orange";
        }
        else if(num <= 5){
            return "lightgreen";
        }
    }
</script>

<div class="stars">
    {#each {length: 5} as _, i}
    <span class="star fas fa-star" style="color:{value >= i + 1? RatingToColorString(value): "grey"}"></span>
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