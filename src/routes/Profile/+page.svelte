<script>
	import { onMount } from 'svelte';




    export let data;

    let edit = false;
    let QRModalOpen = false;

    
    let focusedElement;

    /**@type {Element}*/
    let QRContainer;
    let QRModal;

    console.log(data.userData)

    function toggleEdit(){
        edit = !edit;

        
        focusedElement.focus();
    
    }
    function ToggleQrModal(){
        QRModalOpen = !QRModalOpen;
    }

    onMount(()=>{
        fetch(`/api/qrcode?user=${data.userData.uid}`).then((res)=>{
            
            res.text().then((res)=>{
                QRContainer.innerHTML = res;
            })
        })
    })


</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialogue style="display:{QRModalOpen? "flex": "none"}" id="QRCodeModalUnderlay" tabindex="0" role="button" on:click={ToggleQrModal} bind:this={QRModal}>

    <div id="QRCodeModal">
        <div id="TopBar"><button on:click={ToggleQrModal} class="fas fa-close iconButton closeButton"></button>
            <h1>{data.userData.firstName} {data.userData.lastName}</h1>
        </div>

        <div bind:this={QRContainer} id="QRCodeWrapper"></div>
        <a href="/Records/{data.userData.uid}" id="viewReportsButton" class="chunkyButton">View Report</a>
    </div>

</dialogue>

<form style="pointer-events:{edit? 'auto': 'none'}; --local-text:{edit? "black": "grey"};" class="profile">
    <div id="banner">
        <button on:click={ToggleQrModal} id="QRButton" class="ignoreEditState iconButton"><span class="fas fa-qrcode"></span></button>
        <img src={data.userData.pfp} id="pfp" alt="Profile">
        <button on:click={toggleEdit} id="editButton" class="ignoreEditState iconButton"><span class="fas fa-edit"></span></button>
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
    #QRCodeModalUnderlay{

        z-index: 100;
        position: fixed;
        width:100%;
        height:100%;
        top:0;
        left:0;

        display: flex;
        align-items: center;
        justify-content: center;

        
    }
    #QRCodeModal{
        width:60%;
        max-width:40rem;
        height:fit-content;
        background-color: white;
        box-shadow:1px 1px 5px grey;
        padding-bottom: 1rem;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        
    }
    #QRCodeWrapper{
        margin:auto;
        margin-top:1rem;
        width:50%;

        border: 7px dashed var(--color-theme-2);
        border-radius: 2rem;
    }
    #viewReportsButton{
        display: block;
        width:fit-content;
        margin:auto;
        margin-top:1rem;
    }
    #TopBar{
        position: relative;
        width:100%;
        font-size: 1.4rem;
        padding:.5rem;

        min-height: 2rem;
        background-color: var(--color-theme-1);
        color:var(--color-light-text);
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    #TopBar h1{
        margin:0;
        width:100%;
        text-align: center;
        font-size: 1.2rem;
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
    .closeButton{
        position: absolute;
        top:.2rem;
        left:0;
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
    .iconButton{
        background: none;
        border:none;
        color:var(--color-light-text);
        font-size: 1.5rem;
    }
    #editButton{

        position: absolute;
        right:.2rem;
        bottom:.2rem;
    }
    #email{
        width:100%;
    }
</style>