<script lang=ts>
    import { createEventDispatcher } from "svelte";
    export let checked = false;
    export let name = "";

    const dispatch = createEventDispatcher<{change:{value:boolean}}>();

    function Change(ev : any){

        const target = ev.target as HTMLInputElement;

        dispatch("change",{
            value: target.checked
        })
    }

</script>

<label>
    <input on:change={Change} type="checkbox" value="true"  name={name} bind:checked>
    <span class="slider"></span>


</label>

<style>
    input{
        position: absolute;
        opacity: 0;
        top:0;
        left:0;
    }
    label{
        position: relative;
        display: inline-block;
        width:30px;
        height:20px;
        vertical-align: middle;
        border-radius: 99rem;
    }
    span{
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width:100%;
        height:100%;
        background-color: rgba(0, 0, 0, 0.39);
        border-radius: 99rem;

        cursor: pointer;
        transition: all 400ms ease;
    }
    span::before{
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;

        border-radius: 99rem;
    }
    input:checked + span{
        background-color: var(--color-theme-2);
    }
    input:checked + span::before{
        transform: translateX(10px);
    }
</style>