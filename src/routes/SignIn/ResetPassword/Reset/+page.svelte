<script lang=ts>
    import { enhance } from '$app/forms';
    export let data;

    let passwordSubmitting = false
    let passwordSubmitted = false;

    let message : string;

    let success = false;

</script>

<svelte:head>
    <title>Reset Password</title>
    <meta name="description" content="Reset your password.">
</svelte:head>

<form  method="POST" action="?/ResetPassword" use:enhance={async({formData})=>{

    passwordSubmitting = true;
    console.log("wungus")
    formData.set("token", data.token);
    return async({result, update})=>{
        if(result.type == "redirect"){
            await update();
        }

        passwordSubmitting = false;
        passwordSubmitted = true;
        message = result.data.message;

        if(result.type == "success"){
            success = true;
        }

    }
}}>

    {#if !success}
    <h2>Reset Password</h2>
    <p>Enter your new password</p>
    <label for="newPass">New Password</label>
    <input type="password" name="password" id="newPass" placeholder="New Password">
    {#if message}
        <p class="errorText">{message}</p>
    {/if}
    <div class="buttons">
        <button type="submit">Submit</button>
    </div>
    {:else}
    <h2>Success!</h2>
    <p class="afterSuccess">Password successfully updated</p>

    <a href="/SignIn" class="goToLogin">Go To Login</a>
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
	label{
		display: block;
        color:var(--color-theme-2);
	}
    form{
        width:100%;
    }
    p.afterSuccess{
        text-align: center;
    }

    .goToLogin{
        display: block;
        margin:auto;
        padding: .4rem .8rem;
        border-radius: 99rem;
        background-color: var(--color-theme-2);
        color:white;
        font-size: 1.1rem;
        width:fit-content;
        font-weight: bold;
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
	form {
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

