<script>
	import { onMount } from 'svelte';




    export let data;

    let edit = false;

    let focusedElement

    let qrcodeurl;
    let qrobj;

    console.log(data.userData)

    function toggleEdit(){
        edit = !edit;

        focusedElement.tabIndex = 0;
        focusedElement.focus();
    
    }
    onMount(()=>{
        fetch(`/api/qrcode?user=${data.userData.uid}`).then((res)=>{
            
            res.text().then((res)=>{
                qrobj.innerHTML = res;
            })
        })
    })


</script>

<div id="qr" bind:this={qrobj}>

</div>

<form style="pointer-events:{edit? 'auto': 'none'}; --local-text:{edit? "black": "grey"};" class="profile">
    <div id="banner">
        <img src={data.userData.pfp} id="pfp" alt="Profile">
        <button on:click={toggleEdit} id="editButton" class="ignoreEditState"><span class="fas fa-edit"></span></button>
    </div>

    <div class="sideInput">
        <div class="field">
            <label for='firstName'>First Name</label>
            <input bind:this={focusedElement}  type="text" id="firstName" value="{data.userData.firstName ?? ''}">
        </div>

        <div class="field">
            <label for='lastName'>Last Name</label>
            <input type="text" id="lastName" value="{data.userData.lastName ?? ''}">
        </div>
    </div>

    <div class="field">
        <label for="email">Email</label>
        <input type="text" id="email" value="{data.userData.email ?? ''}">
    </div>
    
    <div class="buttons">
        <form method="POST" class="bottomButton" action="?/logout">
            <button  type="submit">Log Out</button>
        </form>
    </div>
</form>


<style>
    
    label{
        display: block;
        font-size:1.2rem;
    }
    input[type="text"]{
        display:block;
        font-size:1.5rem;
        background-color: lightgrey;
        border:none;

        color: var(--local-text);

        padding:.5rem;
        border-radius: 5px;
    }
    #qr{
        width:50%;
        background-color: pink;
    }
    .profile{
        margin:auto;
        margin-top:1.2rem;
        width:fit-content;

        box-shadow: 1px 1px 15px var(--color-trim);

        padding:1.2rem;

        border-radius: 5px;
    }
    .sideInput{
        display: grid;
        grid-template-columns: 1fr 1fr;

        
        gap: 1rem;
    }
    .field{
        margin: .5rem 0;
    }
    .buttons{
        padding:.5rem 0;
        width:100%;

        display:flex;
        align-items: center;
        justify-content: right;
    }
    .bottomButton button{
        background-color: var(--color-theme-1);
        color: var(--color-light-text);

        border:none;

        font-size:1.2rem;
        padding:.5rem;
        border-radius:6px;

        pointer-events: all;
        cursor: pointer;
    }
    .ignoreEditState{
        pointer-events: all;
    }
    #pfp{
        aspect-ratio: 1/1;
        height:8rem;
        margin:auto;
    }
    #banner{
        width:100%;
        position: relative;

        min-width: 4rem;
        padding: 1rem;

        display: flex;
        align-items: center;
        justify-content: center;

        background-color: var(--color-theme-1-sub);
    }
    #editButton{
        background: none;
        border:none;
        color:var(--color-light-text);
        font-size: 1.5rem;

        position: absolute;
        right:.2rem;
        bottom:.2rem;
    }
    #email{
        width:100%;
    }
</style>