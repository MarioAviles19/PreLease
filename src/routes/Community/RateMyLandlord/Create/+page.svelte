<script>
    import FivePointRating from "$lib/Components/FivePointRating.svelte";

    let ratings = []

    function AttachRatingListeners(element){
        let buttons = element.querySelectorAll("input[type=radio]")
        let icons = element.querySelectorAll("label.radioLabel")

        let ratingIndex = ratings.length;
        ratings[ratingIndex] = buttons

        buttons.forEach(el => {
            el.addEventListener("change", ChangeRatingColors(ratingIndex))
        });
        icons.forEach(el =>{
            //el.addEventListener("mouseover", ChangeRatingColors(ratingIndex))
        })

        
        console.log(ratings)
    }

    function ChangeRatingColors(index){

    
        let buttons = ratings[index] || []

        return function (event){
            if(event.target.checked || true == true){
                console.log(event.target.dataset.order)

                for(let i = 0; i < buttons.length; i++){
                    if(parseInt(buttons[i].dataset.order) <= parseInt(event.target.dataset.order)){
                        console.log("weem")
                        buttons[i].classList.add("checked")
                    }
                    else{
                        buttons[i].classList.remove('checked')
                    }
                }
                
            }
    }

    }

</script>

<section>
    <form action="">
        <fieldset class="fivePoint">
            <label for="overall">Overall</label>
            <FivePointRating name="overall"/> 
        </fieldset>

        <button>submit</button>
    </form>
</section>

<style>
    .fivePoint{
        margin:auto;
        width: clamp(15rem, 40%, 25rem)
    }

</style>