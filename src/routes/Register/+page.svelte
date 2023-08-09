
<script>
    import { authHandler, authState } from "../../stores/authStore";
    import { updateProfile } from "firebase/auth"
	import { collection, doc, setDoc } from "firebase/firestore";
	import { firestore } from "$lib/firebase/firebase.client";

    let email = '';
    let password = '';
    let firstName = '';
	let lastName = '';
	
    let photo = '';

    async function register(){
        if(!email || !password){
            return
        }
        console.log("Running Register")
        let user = await $authHandler.signUp(email, password);
		
		const response = await setDoc(doc(firestore,'Users', user.user.uid), {firstName: firstName, lastName: lastName, completion:0})
			

		await updateProfile(user.user, {displayName: `${firstName}`})


		window.location.href = "/SignIn"
	
        }
    

</script>


<form id="register" on:submit|preventDefault>
	<h1>Create Account</h1>

	<div class="sideBySide">

		<div class="field">
			<label for="firstName">First Name</label>
			<input bind:value={firstName} id="username" name="firstName" type="text" placeholder="First Name"/>
		</div>

		<div class="field">
			<label for="lastName">Last Name</label>
			<input bind:value={lastName} id="username" name="lastName" type="text" placeholder="Last Name"/>
		</div>

	</div>

	<label for="email">Email</label>
	<input bind:value={email} id="email" name="email" type="text" placeholder="Email"/>

	<label for="password">Password</label>
	<input bind:value={password} id="password" name="password" type="password" placeholder="Password"/>

	<div id="links">
		<a href="/SignIn">Already Have An Account?</a>
	</div>

	<div>
		<button on:click={register} class="chunkyButton">Sign Up</button>
	</div>
</form>
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
