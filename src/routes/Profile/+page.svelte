<script>
	import { onMount } from 'svelte';




    export let data;

    let edit = false;
    let QRModalOpen = false;

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
<dialogue style="display:{QRModalOpen? "flex": "none"}" id="QRCodeModalWrapper" bind:this={QRModal}>
    <div id="QRCodeModalUnderlay" role="button" tabindex="0" on:click={ToggleQrModal}></div>
    <div id="QRCodeModal">
        <div id="TopBar"><button on:click={ToggleQrModal} class="fas fa-close iconButton closeButton"></button>
            <h1>{data.userData.firstName} {data.userData.lastName}</h1>
        </div>

        <div bind:this={QRContainer} id="QRCodeWrapper"></div>
        <a href="/Records/{data.userData.uid}" id="viewReportsButton" class="chunkyButton">View Report</a>
    </div>

</dialogue>

<section class="profile">
    <div class="card roundedContainer">
        <div class="banner">

        </div>
        <div class="profileInfo">
            <img id="pfp" src={data.userData.pfp} alt="Avatar" >
            <h1>{data.userData.firstName} {data.userData.lastName} <span class="subtitle" style="color:{data.userData.verified?"var(--color-theme-2)": ""}">{data.userData.verified? "verified": "unverified"}</span></h1>
            <h2 class="subtitle">{data.userData.email}</h2>

            <nav><a href="/" class="filledLink">Complete Your Rental Resume</a> <a href="/">Update Info</a></nav>

        </div>
    </div>
    {#if !data.userData.setUpComplete}
    <div class="card roundedContainer" id="setupMessage">

        <label for="profileCompletion">{data.userData.completion ?? "0"} Out of 4 Items Completed</label>
        <progress id="profileCompletion" value={data.userData.completion ?? 0} max="4"></progress>

        
        <a class="filledLink completeSetup" href="/">Complete Setup!</a>

     </div>
    {/if}
    <div class="card roundedContainer" id="rentalResume">
        {#if !data.userData.rentalResumeCompleted}
            <h1>No Rental Resume</h1>
            <a href="/Profile/RentalResume/Create">Create</a>
        {/if}
    </div>
    <div class="card roundedContainer" id="rentalHealthCheck">
        <h1>Take A Rental Health Check</h1>
        <a href="/">Get Started</a>
    </div>


    <div class="card roundedContainer">

        <form action="?/logout" method="POST">
            <button>Logout</button>
        </form>
    </div>


</section>


<style>
    nav{

    }
    nav a {
        color:var(--color-theme-2);
        font-weight: bold;
        font-size:1.2rem;
        padding:.1rem;
        border-radius: 1.2rem;
        border: 2px solid var(--color-theme-2)
    }
    #QRCodeModalUnderlay{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        
    }
    
    #QRCodeModalWrapper{
        z-index: 5;
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
        z-index: 3;
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
    #pfp{
        width:clamp(8rem, 25%, 10rem);
        margin-top:-8rem;
        margin-left:1rem;
        border:2px solid var(--color-theme-1);
        border-radius: 100%;
    }
    #setupMessage{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    #setupMessage label{
        display:block;
        width:fit-content;
    }
    #setupMessage progress{
        width:60%;
        margin-bottom: 1rem;
        
    }
    #setupMessage a{
        display:block;
        width:50%;
        margin:auto;
        font-size:1.5rem;
        padding: .2rem 0;
        text-align: center;
        border-radius: 1.5rem;

    }
    .filledLink{
        background-color: var(--color-theme-2);
        color: white
    }
    .banner{

        width:100%;
        height:10rem;
        
        background-size: 25%;
        
        background-color: #f1ffda;
background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235a8219' fill-opacity='0.68'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        

    }
    .profile{
        width: clamp(15rem, 100%, 50rem);
        margin:auto;
        padding:1rem;
        min-height: 70vh;
    }
    .card{
        padding:1rem;
        margin-bottom:.5rem;
        
    }
    .profile h1{
        margin:0;
        letter-spacing: 1px;
        font-size: 2rem;
    }
    .subtitle{
        font-size: 1rem;
        color:var(--color-trim);

    }
    .iconButton{
        background: none;
        border:none;
        color:var(--color-theme-2);
        font-size: 1.5rem;
    }
    .closeButton{
        position: absolute;
        top: 20%;
        left:0;
        color:var(--color-light-text);
    }
    @media only screen and (max-width: 520px){
		#QRCodeModal{
            max-width: none;
            width:90%;
            height:70%;
        }
        #QRCodeWrapper{
            width:70%;
        }
    }
</style>