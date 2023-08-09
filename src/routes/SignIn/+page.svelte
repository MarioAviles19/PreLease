
<script>
	import { onMount } from "svelte";
	import { authHandler } from "$lib/stores/authStore";


	export let data;
	export let form;


	onMount(()=>{
		$authHandler.signOut();
	})
</script>


<form id="login" method="POST" action="?/login&redirect={data.redirect}">
	<h1>Sign In</h1>

	<div class="field">
		<label for="email">Email</label>
		<input id="email" name="email" type="text" placeholder="Email" value={form?.email ?? ""}/>
	</div>

	<div class="field">
		<label for="password">Password</label>
		<input id="password" name="password" type="password" placeholder="Password" />
	</div>
	{#if form?.message}
		<p class="errorText">{form.message}</p>
	{/if}

	<div id="links">
		<a href="/Register">Create Account</a>
		<a href="/SignIn">Forgot Password?</a>
	</div>
	<div>
		<button type="submit" class='chunkyButton'>Sign In</button>
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
	#login button {
		font-size: 1.5rem;
		float:right;
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
