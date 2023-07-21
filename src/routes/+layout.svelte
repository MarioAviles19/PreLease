<script>
	import './styles.css';
	import NavMenu from '../NavMenu.svelte';
	import { onMount } from 'svelte';
	import { auth } from '$lib/firebase/firebase.client';
	import { authState, authHandler } from '../stores/authStore';

	let navMenuOpen = false;

	export let data;
	

	let headerHeight;

	//TODO: Stick menu to top on scroll

	function toggleMenu() {
		navMenuOpen = true;
	}

	onMount(()=>{
		//Once the page is loaded, load the user into the currentUser store
		const unsubscribe = auth.onAuthStateChanged((user)=>{
			authState.update((curr)=>{
				return {...curr, isLoading:false, currentUser: user}
			})
			console.log($authState.currentUser);
			console.log(data.miso);
		})



	})
</script>


<div id="headerBuffer" aria-hidden="true" style="height:{headerHeight - 1}px;"></div>
<header bind:clientHeight={headerHeight}>
	
	<div id="navSelector">
		<button on:click={toggleMenu} id="navIcon"><i class="fas fa-bars fa-xl" /></button>
	</div>
	<a href="/" id="home">
		<h1>PreLease</h1>
	</a>

	{#if  !data.userData}
	<a class="cornerLink" href="/SignIn">Sign In</a>
	{:else}
	
	<a class="cornerLink" href="/Profile"><img id='avatar' src="{data.userData.pfp}" alt="avatar"><h3>{data.userData.displayName ?? 'Profile'}</h3></a>
	{/if}
</header>
<main>
	<slot />
</main>

<footer>

</footer>

{#if navMenuOpen}
	<NavMenu bind:open={navMenuOpen} />
{/if}

<style>
	main{
		width:100vw;
		max-width:100%;
	}
	header {
		width:100vw;
		max-width:100%;
		position: fixed;
		top:0;
		left:0;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		background-color: var(--color-theme-1);
		min-height: 4rem;
		padding: 0.5rem;
		text-align: center;
		color: var(--color-light-text);

		z-index: 5;

		
	}
	footer{
		min-height: 3rem;
	}
	#navSelector {
		display: flex;
		justify-content: left;

		width: 100%;
		height: 100%;
		text-align: left;
	}
	#navIcon {
		background-color: rgba(0, 0, 0, 0);
		border: none;
		color: var(--color-light-text);
		font-size: large;
		margin-left: 2.5%;
		padding: 2rem;
		cursor: pointer;
	}
	#avatar{

		margin-right:1rem;
		background-color: white;
	
		
	}
	#home{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.cornerLink {
		font-size: 1.7rem;

		margin: auto;
		margin-right: 2rem;
		cursor: pointer;

		display:flex;
		align-items: center;
		justify-content: center;
		
	}
	@media only screen and (max-width: 520px){
		header{
			min-height:2rem;
			height:3rem;
		}
		header a h1{
			font-size: 1.5rem;
			margin:0;
		}
		header a{
			height:fit-content;
		}
		#navSelector{
			height:100%;
			width:100%;

		}
		#navIcon{
			padding: 0;
			
			float:left;

		}
		.cornerLink{
			font-size: 1rem;
		}
		.cornerLink h3{
			margin:0;

		}
	}


</style>
