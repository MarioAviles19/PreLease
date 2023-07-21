
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

    function register(){
        if(!email || !password){
            return
        }
        console.log("Running")
        $authHandler.signUp(email, password).then((result)=>{
            
			setDoc(doc(firestore,'Users', result.user.uid), {firstName : firstName, lastName: lastName})
			.then(
				(res)=>{
					console.log(res);
				})


            return updateProfile(result.user,{
                displayName: `${username}`})
            }).then(()=>{window.location.href = '/'})
        }
    

</script>


<form id="register" on:submit|preventDefault>
	<h1>Register</h1>

	<label for="firstName">First Name</label>
	<input bind:value={firstName} id="username" name="FirstName" type="text" placeholder="Username"/>

	<label for="lastName">Last Name</label>
	<input bind:value={lastName} id="username" name="LastName" type="text" placeholder="Username"/>

	<label for="email">Email</label>
	<input bind:value={email} id="email" name="email" type="text" placeholder="Email"/>

	<label for="password">Password</label>
	<input bind:value={password} id="password" name="password" type="password" placeholder="Password"/>

	<div>
		<button on:click={register}>Sign Up</button>
	</div>
</form>
<div id="background">
	<img src="longBrownstone.jpg" alt="" />
	<div id="overlay" />
</div>

<style>
	h1 {
		font-size: 1.7rem;
	}
	#register {
		display: flex;
		flex-direction: column;

		margin: 10% auto;

		padding: 1rem;
		background-color: white;
		box-shadow: 1px 1px 5px grey;
		width: 30%;
		min-width: 20rem;
		font-size: 1.5rem;
	}
	#register input {
		font-size: 1.2rem;
		margin-bottom: 1rem;
		padding: 0.2rem;
	}
	#register button {
		font-size: 1.2rem;
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
</style>
