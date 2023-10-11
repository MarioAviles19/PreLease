
<script lang=ts>
	import { enhance } from "$app/forms";


    let emailSent = false;
    let emailSending = false;
    let resent = false;

    let email : string;
</script>

<svelte:head>
    <title>Forgot Password</title>
    <meta name="description" content="Enter your email to reset password.">
</svelte:head>

<form id="login" method="POST" action="?/ResetPassword" use:enhance={async()=>{
    emailSending = true;
    return async()=>{
        if(emailSent){
            resent = true;
        }
        emailSending = false;
        emailSent = true;

    }
}}>
    <h2>Forgot Password</h2>
    {#if !emailSent}
    <p>If your email is connected to an account, we'll send you an email to reset your password.</p>

    <label for="email">Email</label>
    <input bind:value={email} class={emailSent? "sent": ""} type="email" placeholder="Enter Email" name="email" id="email" disabled={emailSent} required>

    <div class="buttons"><button type="submit" disabled={emailSending}>Send Email</button></div>
    {:else}
    <p class="afterSend">Email has been sent to</p>
    <input type="email" name="email" value={email} class="afterSend" disabled>
    {#if resent}
    <p class="sentMessage">{emailSending?"Sending Email": "Email Sent!"}</p>
    {/if}
    <div class="buttons resendEmail">
    <a on:click={()=>{window.location.reload()}} href="/SignIn/ResetPassword" class="revert">Choose a different email</a>

        <button type="submit" class="resendEmail">Resend Email</button>
    </div>
    {/if}

</form>
<div id="background">
	<img src="/longBrownstone.jpg" alt="" />
	<div id="overlay" />
</div>

<style>
	h2 {
		font-size: 1.7rem;
		width:100%;
		text-align: center;
        margin-bottom:0;
	}
    p{
        font-size: 1rem;
        text-align: left;
    }
	label{
		display: block;
        color:var(--color-theme-2);
	}
    form{
        width:100%;
    }
    input.afterSend{
        box-shadow: none;
        font-weight: bold;
        margin-bottom: 0;
        width:100%;
        text-align: center;
    }
    p.afterSend{
        margin-bottom: 0;
        text-align: center;
    }
    a.revert{
        text-decoration: underline;
        font-size: .7rem;
        color:var(--color-theme-2);
        display:block;
        margin-bottom: .5rem;
    }
    .sentMessage{
        font-size: .8rem;
        color:var(--color-theme-2);
        text-align: center;
        margin:0;
    }
    .buttons .resendEmail{
        padding:.4rem .8rem;
        border-radius: 99rem;
        margin:auto;
        font-size: 1.1rem;
    }
    .buttons.resendEmail{
        text-align: center;
    }
    .buttons{
        width:100%;
        text-align: right;
        padding: .5rem 0;
    }
    .buttons button{
		font-size: 1.5rem;

		color:white;
		background-color: var(--color-theme-2);
		border-radius: 9px;
		padding: .5rem;
		border:none;
    }
	#login {



		margin: auto;
		margin-top:5rem;

		padding: 1rem 1.5rem;
		background-color: white;
		box-shadow: 1px 1px 5px grey;


        max-width: 25rem;
        min-width: 15rem;
	}
	input {
		font-size: 1.2rem;
		margin-bottom: 1rem;
		padding: 0.2rem;
		width:100%;
		
	}
	#background {
		z-index: -1;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	#background img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	#overlay {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}
	
	#links{
		margin-bottom:1rem;
	}
	#links a{
		display:block;
		color: var(--color-theme-2);
		font-size: 1rem;
		width:100%;
		margin:.2rem auto;
		text-align: center;
	}
	.errorText{
		color:red;
		font-size: .8rem;
		width:100%;
		margin-top:0;
	}
	.errorText::before{
		content:"*";
	}

	.field{
		width:100%;
	}
	@media only screen and (max-width: 520px){
		#login{
			min-width: 0;
			max-width: 400px;
			padding:1rem 1rem;
			width:95%;
		}
	}
</style>

