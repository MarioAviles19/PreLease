<script>
    import {auth} from "$lib/firebase/firebase.client.js"
    import { signInWithCustomToken, sendEmailVerification } from "firebase/auth";
	import { onMount } from "svelte";
    export let data;

    let emailSent = false;
    async function SendEmail(){
        
            signInWithCustomToken(auth, data.userToken).then((res)=>{
            sendEmailVerification(auth.currentUser,{url: 'http://localhost:5173/'});
            emailSent = true;
        })

    }

</script>
<section>
    <p>Click to send verification email to <span style='color:var(--color-theme-2)'>{data.userData.email}</span></p>
    <div id="buttonWrapper">
        
        <button on:click={SendEmail} class="chunkyButton" disabled={emailSent}>{emailSent? "Email Sent!": "Send Email"}</button>
        <button on:click={SendEmail} class="understated" disabled={!emailSent}>Resend Email</button>
    </div>
</section>

<style>
    section{
        margin:auto;
        margin-top:5rem;
        width:fit-content;
        padding:1rem;
        border-radius: 10px;
        background-color: white;
        box-shadow: 1px 1px 5px var(--color-trim);

        font-size: 1.2rem;

    }
    button{
        font-size: 1.3rem;
        
    }
    button:disabled{
        cursor: auto;
        color:lightgray
    }
    
    #buttonWrapper{
        width:100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .understated{
        background:none;
        border:none;
        color:black;
    }
    .understated:disabled{

    }
</style>