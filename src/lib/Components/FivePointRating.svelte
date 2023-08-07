
<script>
    export let name;
    let buttons = []

    let currentValue = 0;
    let answered = false;

    function AttachRatingListeners(element){
        buttons = element.querySelectorAll("input[type=radio]")
        let icons = element.querySelectorAll("label.radioLabel")

        element.addEventListener("mouseleave", RemoveAllColors)



        buttons.forEach(el => {
            el.addEventListener("change", ChangeRatingColors)
        });
        icons.forEach(el =>{
            el.addEventListener("mouseover", ChangeRatingColors)
        })

        
        console.log(buttons)
    }

    function RemoveAllColors(){
        if(answered){
            return
        }
        buttons.forEach(el=>{
            el.classList.remove("checked")
        })
    }

    function ChangeRatingColors(event){



        if(event.target.checked){
            answered = true;
        }

        console.log(event.target.dataset.order)
        if(event.type == "change"){
            currentValue = parseInt(event.target.value);
        }

        for(let i = 0; i < buttons.length; i++){
            let targetOrder = parseInt(buttons[i].dataset.order)

            if( targetOrder<= parseInt(event.target.dataset.order)){
                console.log("weem")
                buttons[i].classList.add("checked")
            }
            else if(targetOrder > currentValue){
                buttons[i].classList.remove('checked')
            }
        }
            
            
    

    }

</script>
<div use:AttachRatingListeners class="rating">
                
    <label class="radioLabel">
        <input data-order="1"  name={name} type="radio" value="1">
        <span data-order="1"   class="radio one">1</span>
    </label>

    <label class="radioLabel">
        <input data-order="2"  name={name} type="radio" value="2">
        <span data-order="2" class="radio two">2</span>

    </label>

    <label class="radioLabel">
        <input data-order="3" name={name} type="radio" value="3">
        <span data-order="3" class="radio three">3</span>
    </label>

    <label class="radioLabel">
        <input data-order="4" name={name}  type="radio" value="4">
        <span data-order="4" class="radio four">4</span>
    </label>

    <label  class="radioLabel">
        <input data-order="5"  name={name} type="radio" value="5">
        <span data-order="5" class="radio five">5</span>
    </label>

</div>

<style>
        input[type=radio]{
        position: absolute;
        top:0;
        left:0;
        opacity: 0;
        cursor: pointer;
        pointer-events: none;
    }
    span{
        /*box-shadow: 1px 0px 1px var(--color-trim), -1px 0px 1px var(--color-trim);*/
    }


    :global(input.checked~ span){
        background-color: black;
    }
    :global(label input.checked ~ span.one){
        background-color: #aeb0aa;
    }
    :global(label input.checked ~ span.two){
        background-color: #72805d;
    }
    :global(label input.checked ~ span.three){
        background-color: #677a4a;
    }
    :global(label input.checked ~ span.four){
        background-color: #6e8844;
    }
    :global(label input.checked ~ span.five){
        background-color: #5a8219;
    }

    :global(label input:hover ~ span.one){
        background-color: #aeb0aa;
    }
    :global(label input:hover ~ span.two){
        background-color: #72805d;
    }
    :global(label input:hover ~ span.three){
        background-color: #677a4a;
    }
    :global(label input:hover ~ span.four){
        background-color: #6e8844;
    }
    :global(label input:hover ~ span.five){
        background-color: #5a8219;
    }

    :global(.checked){

    }
    label span{
        display:flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: bold;
        color:white;
        aspect-ratio: 1/1;
        width:100%;
        
        background-color: white;
        
    }
    .rating{
        display:grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

        overflow: hidden;
        width:100%;
        margin: auto;
        border-radius: 100rem;
    }
</style>