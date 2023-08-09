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
            <label for="overall">Management</label>
            <FivePointRating name="management"/> 
        </fieldset>
        <fieldset class="fivePoint">
            <label for="overall">Responsiveness</label>
            <FivePointRating name="responsiveness"/> 
        </fieldset>
        <fieldset class="fivePoint">
            <label for="overall">Overall</label>
            <FivePointRating name="overall"/> 
        </fieldset>

        <div class="response">
            <label for="reviewBody">Extra Info</label>
            <textarea name="body" id="reviewBody" cols="30" rows="6"></textarea>
        </div>

        <button>submit</button>
    </form>
</section>

<style>
    label{
        display:block;
        color:white;
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }
    textarea{
        border:none;
        resize: none;
        padding:.5rem;
        font-size: 1.2rem;
        background-color: rgba(255, 255, 255, 0.253);
        width:100%;
        transition: all 200ms ease-out;
    }
    textarea:focus{
        background-color: rgba(255, 255, 255, 0.558);
        border:none;
        outline:none;
    }
    .fivePoint{
        margin: 1rem auto;
        border:none;
        width: clamp(15rem, 40%, 25rem)
    }
    .response{
        margin:1rem auto;
        width: clamp(15rem, 50%, 35rem)
    }
</style>