
<script>
	import { onMount } from "svelte";
	import { authHandler } from "$lib/stores/authStore";
	import { enhance } from "$app/forms";
	import { signInWithEmailAndPassword, getIdToken } from "firebase/auth";
	import { auth } from "$lib/firebase/firebase.client.js";


	export let data;
	export let form;

	let message = form?.message;

	let submitting = false;
	let submitted = false;


</script>

<svelte:head>
    <title>Sign In</title>
    <meta name="description" content="Sign into PreLease">
</svelte:head>

<form id="login" method="POST" action="?/login&redirect={data.redirect}" use:enhance={
	async ({formData,cancel})=>{
		submitting = true;
		
		const email = formData.get("email");
		const password = formData.get("password");

		if(!email || !password){
			cancel();
			message = "Please enter required fields";
			submitting = false;
			return
		}

		try{
		const userRecord = await signInWithEmailAndPassword(auth, email.toString(), password.toString());

		const token = await getIdToken(userRecord.user, true)

		formData.set("token", token);
		} catch (error){
			message = "Invalid credentials";
			submitting = false;
			cancel();
		}
		return async({result, update})=>{
			submitting = false;
			submitted = true;
			if(result.type == "redirect"){
				update();
			}
			
			message = result.data?.message;
		}
		


	}
}>
	<h1>Sign In</h1>

	<div class="field">
		<label for="email">Email</label>
		<input id="email" name="email" type="text" placeholder="Email" value={form?.email ?? ""}/>
	</div>

	<div class="field">
		<label for="password">Password</label>
		<input id="password" name="password" type="password" placeholder="Password" />
	</div>
	{#if message}
		<p class="errorText">{message}</p>
	{/if}

	<div id="links">
		<a href="/Register">Create an Account</a>
		<a href="/SignIn/ResetPassword">Forgot Password?</a>
	</div>
	<div class="buttons">
		<button type="submit">Sign In
			{#if submitting}
			<span aria-hidden="true" class="fas fa-spinner fa-spinn"></span>
			{/if}

		</button>
	</div>
</form>
<div id="background">
	<img src="longBrownstone.jpg" alt="" />
	<div id="overlay" />
</div>

<style>
	h1 {
		font-size: 1.7rem;
		width:100%;
		text-align: center;
	}
	label{
		display: block;
	}
	.buttons{
		text-align: right;
	}
	#login {
		display: flex;
		flex-direction: column;
		align-items: center;

		margin: auto;
		margin-top:5rem;

		padding: 1rem 2.5rem;
		background-color: white;
		box-shadow: 1px 1px 5px grey;
		width: fit-content;
		min-width: 25rem;
		font-size: 1.5rem;
	}
	#login input {
		font-size: 1.2rem;
		margin-bottom: 1rem;
		padding: 0.2rem;
		width:100%;
		
	}
	form button {
		font-size: 1.5rem;

		color:white;
		background-color: var(--color-theme-2);
		border-radius: 9px;
		padding: .5rem;
		border:none;
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
