<script>
	import './styles.css';
	import NavMenu from '../NavMenu.svelte';
	import { onMount } from 'svelte';
	import { getAnalytics, isSupported } from 'firebase/analytics';
	import {signInWithCustomToken} from 'firebase/auth'
	import { app, auth } from '$lib/firebase/firebase.client';
	import { analyticsStore } from '$lib/stores/analytics';




	let navMenuOpen = false;

	export let data;
	
	/**@type {number}*/
	let headerHeight;



	//TODO: Stick menu to top on scroll

	async function InitLogging(){
		isSupported().then(val=>{
			if(val){

				analyticsStore.set(getAnalytics(app))
			}
		});
	}

	function toggleMenu() {
		navMenuOpen = true;
	}

	onMount(()=>{


		InitLogging()


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
		
		width: 100%;
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
		background-color: var(--color-gunmetal);
		min-height: 4rem;
		height: fit-content;
		padding: 0.5rem;
		text-align: center;
		color: var(--color-light-text);

		z-index: 5;

		
	}
	footer{
		
	}
	a{
		color:var(--color-light-text);
	}
	h1{
		margin:0;
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
		
		cursor: pointer;
	}
	#avatar{

		margin-right:1rem;
		background-color: white;

		max-width:45px;
	
		
	}
	#home{
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.2rem;
	}
	.cornerLink {
		font-size: 1.7rem;

		margin: auto;
		margin-right: 2%;
		cursor: pointer;

		width:fit-content;

		display:flex;
		align-items: center;
		justify-content: right;

	}
	.cornerLink h3{
		margin:0;
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
			font-size: 1.2rem;
			height:2.25rem;
		}
		.cornerLink img{
			height:100%;
		}
		.cornerLink h3{
			margin:0;

		}
	}


</style>
