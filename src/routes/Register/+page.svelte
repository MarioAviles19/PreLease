
<script lang=ts>
  	import { enhance} from "$app/forms";
	import Modal from "$lib/Components/Modal.svelte";
	import { Capitalize } from "$lib/helpers";

	export let data;

    let email = '';
    let password = '';
    let firstName = '';
	let lastName = '';

	let formBusy = false;
	
    let photo = '';
    
	export let form;

	let message = form?.message ?? "" as string;

	let formResultType : string;
	let formResultMessage : string;
	let modalOpen = false;

</script>


<form id="register" method="POST" action="?/register&org={data.orgData?.id || ""}" use:enhance={async()=>{
	formBusy = true;
	return async({result, update})=>{
		if(result.type == "failure"){
			message = result.data?.message ?? "";
			
		}
		await update({reset: !(result.type == "failure")});
		formBusy = false;
		formResultType = result.type;
		formResultMessage = result.data.message;
		modalOpen = true;


	}
	}}>

	<img class="orgIcon" src={data.orgData?.icon || "/favicon.png"} alt="Org Icon">
	<h1>Create Account</h1>

	<div class="sideBySide">

		<div class="field">
			<label for="firstName">First Name</label>
			<input bind:value={firstName} id="firstName" name="firstName" type="text" placeholder="First Name"/>
		</div>

		<div class="field">
			<label for="lastName">Last Name</label>
			<input bind:value={lastName} id="lastName" name="lastName" type="text" placeholder="Last Name"/>
		</div>

	</div>

	<label for="email">Email</label>
	<input bind:value={email} id="email" name="email" type="text" placeholder="Email"/>

	<label for="password">Password</label>
	<input bind:value={password} id="password" name="password" type="password" placeholder="Password"/>

	{#if message}
		<p class="message">{message}</p>
	{/if}

	<div id="links">
		<a href="/SignIn">Already Have An Account?</a>
	</div>

	<div class="controls">
		<button type="submit" class="largeButton" disabled={formBusy}>Sign Up</button>
		{#if formBusy}
		<span class="fas fa-spinner fa-spin"></span>
		{/if}
	</div>
</form>
<Modal bind:open={modalOpen}>
	<div class="dialog">
		<h2>{Capitalize(formResultType)}!</h2>
		<p>{formResultMessage}</p>
		<div class="controls">
			{#if formResultType == "success"}
			<a class="largeButton" href="/SignIn">Return to Sign In</a>
			{:else}
			<button class="secondaryButton" type="button">Close</button>
			{/if}
		</div>
	</div>
</Modal>
<div id="background">
	<img src="longBrownstone.jpg" alt="" />
	<div id="overlay" />
</div>

<style>
	h1 {
		font-size: 1.7rem;
		width: 100%;
		text-align: center;
	}
	#register {
		display: flex;
		flex-direction: column;

		margin:auto;
		margin-top:5rem;

		padding: 1rem 2.5rem;
		background-color: white;
		box-shadow: 1px 1px 5px grey;
		width: 40%;
		min-width: 30rem;
		font-size: 1.5rem;
	}
	#register input {
		font-size: 1.2rem;
		margin-bottom: 1rem;
		padding: 0.2rem;

		border:none;
		border-radius: 0px;
		
	}
	#register button {
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
		width:fit-content;
	}
	#links a{
		display:block;
		color: var(--color-theme-2);
		font-size: 1rem;
		width:100%;
		margin-top:.2rem;
	}
	.dialog{
		background-color: white;
		padding:1rem;
		width: clamp(15rem, 100%, 30rem);
	}
	.dialog h2{
		margin:0;
	}
	.orgIcon{
		display: block;
		margin:.5rem auto;
		height:3rem;
	}
	.controls{
		text-align: right;
	}
	.message{
		color:red;
		font-size: .8rem;
		margin-top:0;
	}
	.field{
		width:100%;
	}
	.field input{
		width:100%;
	}
	.sideBySide{
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
	@media only screen and (max-width: 520px){
		#register{
			min-width: 0;
			max-width: 400px;
			padding:1rem 1rem;
			width:95%;
		}
	}
</style>
