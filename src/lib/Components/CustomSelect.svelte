<script lang=ts>
	import { Capitalize } from "$lib/helpers";
    import { slide } from "svelte/transition";
    import { createEventDispatcher, onMount } from "svelte";


    const dispatch = createEventDispatcher();

    export let selectFirst = false;

    export let options : Array<{name: string, value : string}> = [];

    export let value : string | null = null;

    export let currentOption : {name: string, value : string} | null = null;

    export let name : string;

    let open = false;

    let slotHeight : number;

    let currentSelectedIndex : number;

    function ValueChange(val : string){

        dispatch("change", {
            value : val
        })

    }



    //TODO: Fix this because it is icky

    onMount(()=>{
        if(selectFirst){
        currentOption = options[0];
        value = options[0].value;
        currentSelectedIndex = 0;

        ValueChange(options[0].value)
    }
    })
</script>

<div class="select">
    {#if open}
    <div transition:slide class="menu" style="top:{slotHeight + 1|| 0}px">
        {#each options as option, i}
            <label style={currentSelectedIndex == i? "display:none": ""}>
                <p>{Capitalize(option.name)}</p>
                <input  on:input={()=>{value = option.value; open = false; currentOption = option; ValueChange(option.value); currentSelectedIndex = i}} class="hiddenInput" type="radio" name={name}>
            </label>
        {/each}
    </div>
    {/if}
    <div role="button" on:click={()=>{open = !open; }} on:keyup={ev=>{if(ev.key == "Space") open = true}} tabindex="0" bind:clientHeight={slotHeight} class="slotWrapper">
        {#if !currentOption}
        <p><slot/></p>
        <span class="indicator subtleText fas fa-chevron-{open?"up": "down"}"></span>
        {:else}
        <p>{Capitalize(currentOption.name)}</p>
        <span class="indicator subtleText fas fa-chevron-{open?"up": "down"}"></span>
        {/if}
    </div>



</div>

<style>
    p{
        margin:0;
    }
    label{
        display: block;
        padding:.5rem;
       cursor: pointer;
    }
    label:hover,
    label:focus{
        background-color: rgb(222, 222, 222);
    }
    .slotWrapper{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding:.5rem;
    }
    .indicator{
        font-size: .7rem;

    }
    .select{
        position: relative;
        outline:1px solid var(--color-soft-black);
        background-color: white;
        min-width: 10rem;
        cursor: pointer;
    }
    .menu{
        position:absolute;
        width: 100%;
        background-color: white;
        outline:1px solid var(--color-soft-black);
    }
    
</style>