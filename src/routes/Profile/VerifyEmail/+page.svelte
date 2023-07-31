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
        <button on:click={SendEmail} class="chunkyButton">{emailSent? "Email Sent!": "Send Email"}</button>
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

    }
    button{
        margin:auto;
        margin-right:0;
    }
    #buttonWrapper{
        width:100%;
    }
</style>