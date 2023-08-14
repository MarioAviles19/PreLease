
<script>
// @ts-nocheck

    export let name;
    export let value = '';
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

        

    }

    function RemoveAllColors(){


        buttons.forEach(el=>{
            if(currentValue < el.dataset.order || answered == false)
            el.classList.remove("checked")
        })
    }

    function ChangeRatingColors(event){



        if(event.target.checked){
            answered = true;
        }


        if(event.type == "change"){
            currentValue = parseInt(event.target.value);
        }

        for(let i = 0; i < buttons.length; i++){
            let targetOrder = parseInt(buttons[i].dataset.order)

            if( targetOrder<= parseInt(event.target.dataset.order)){

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
        <input bind:group={value} data-order="1"  name={name} type="radio" value="1">
        <span data-order="1"   class="radio one">1</span>
    </label>

    <label class="radioLabel">
        <input bind:group={value} data-order="2"  name={name} type="radio" value="2">
        <span data-order="2" class="radio two">2</span>

    </label>

    <label  class="radioLabel">
        <input bind:group={value} data-order="3" name={name} type="radio" value="3">
        <span data-order="3" class="radio three">3</span>
    </label>

    <label class="radioLabel">
        <input bind:group={value} data-order="4" name={name}  type="radio" value="4">
        <span data-order="4" class="radio four">4</span>
    </label>

    <label  class="radioLabel">
        <input bind:group={value} data-order="5"  name={name} type="radio" value="5">
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
        /* box-shadow: 1px 0px 1px var(--color-trim), -1px 0px 1px var(--color-trim); */
        transition:all 100ms ease-out;
    }



    :global(label input ~ span.one){
        color: var(--color-1);
    }
    :global(label input ~ span.two){
        color: var(--color-2);
    }
    :global(label input ~ span.three){
        color: var(--color-3);
    }
    :global(label input ~ span.four){
        color: var(--color-4);
    }
    :global(label input ~ span.five){
        color: var(--color-5);
    }

/*Change the color of the faux button on checked*/
    :global(label input.checked ~ span){
        color: white;
    }
    :global(label input.checked ~ span.one){
        background-color: var(--color-1);

    }
    :global(label input.checked ~ span.two){
        background-color: var(--color-2);
    }
    :global(label input.checked ~ span.three){
        background-color: var(--color-3);
    }
    :global(label input.checked ~ span.four){
        background-color: var(--color-4);
    }
    :global(label input.checked ~ span.five){
        background-color: var(--color-5);
    }
    /*Change the color of the faux button on hover*/

    :global(label input:hover ~ span.one){
        background-color: var(--color-1);
    }
    :global(label input:hover ~ span.two){
        background-color: var(--color-2)
    }
    :global(label input:hover ~ span.three){
        background-color: var(--color-3);
    }
    :global(label input:hover ~ span.four){
        background-color: var(--color-4);
    }
    :global(label input:hover ~ span.five){
        background-color: var(--color-5);
    }

    :global(.checked){

    }
    label span{
        display:flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: bold;
        aspect-ratio: 1/.6;
        width:100%;
        
        background-color: white;
        cursor: pointer;
        
    }
    .rating{

        --color-1: #b1bda0;
        --color-2: #91a277;
        --color-3: #7d9558;
        --color-4: #698738;
        --color-5: #5a8219;

        display:grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

        overflow: hidden;
        width:100%;
        margin: auto;
        border-radius: 100rem;
    }
</style>