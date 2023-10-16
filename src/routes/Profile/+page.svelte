<script lang=ts>
import { onMount } from 'svelte';




    export let data;

    let edit = false;
    let QRModalOpen = false;


    let QRContainer;
    let QRModal;

 

    function toggleEdit(){
        edit = !edit;

        
     
    
    }
    function ToggleQrModal(){
        QRModalOpen = !QRModalOpen;
    }




</script>

<svelte:head>
    <title>Profile</title>
</svelte:head>



<section class="content">

    
    <div class="panel">
        <div class="banner">

        </div>
        <div class="profileInfo">
            <div class="profileImageWrapper">
                <img id="pfp" src={data.userData.pfp} alt="Avatar" >
            </div>
            <h2>{data.userData.firstName} {data.userData.lastName} </h2>
            <p class="subtitle">{data.userData.email}</p>



            
        </div>
        <form action="?/logout" method="POST">
            <button class="largeButton logout">Logout</button>
        </form>
    </div>



</section>


<style>
    section{
        margin-top: 2rem;
    }
    h2{
        margin-bottom: 0;
    }
    .content{
        max-width: 60rem;
    }

    #pfp{
        width:150px;

        border:2px solid var(--color-theme-2);
        border-radius: 100%;
    }
    .orgMessage{
        white-space: nowrap;
    }
    .orgIconContainer{
        position: absolute;
        
        right:0;
        bottom:0;
        background-color: white;
        border-radius: 99rem;

        

        border: 3px solid var(--color-theme-2);

    }
    .orgIcon{
        border-radius: 99rem;
    }
    .profileImageWrapper{
        margin-top:-8rem;
        margin-left:1rem;
        position: relative;
        width:fit-content;
    }
    .orgIcon{
        aspect-ratio: 1/1;
        width:40px;
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

    .subtitle{
        margin:0;
        font-size: 1rem;
        color:var(--color-trim);

    }

    .logout{
        border:none;
        margin:auto;
        margin-right:0;
        display:block;
        padding:.3rem;
        border-radius: 3px;
    }
    @media only screen and (max-width: 520px){

    }
</style>