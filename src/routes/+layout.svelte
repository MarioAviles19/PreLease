<script lang=ts>
	import './styles.css';
	import NavMenu from '../NavMenu.svelte';
	import { onMount } from 'svelte';
	import { getAnalytics, isSupported } from 'firebase/analytics';
	import { app, auth } from '$lib/firebase/firebase.client';
	import { analyticsStore } from '$lib/stores/analytics';


	let screenWidth : number = 1000;

	let navMenuOpen = false;

	export let data;

	let headerHeight : number;



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

		//InitLogging()

	})
</script>

<svelte:window bind:innerWidth={screenWidth}/>

<div id="headerBuffer" aria-hidden="true" style="height:{headerHeight - 1}px;"></div>
<header bind:clientHeight={headerHeight}>
	
	{#if screenWidth > 720}
	<div class="leftCorner">
		<a class="homeLink" href="/">
			<img class="orgIcon" src="/favicon.png" alt="icon">
			PreLease
		</a>

		<nav class="navBar">
			<ul>
					{#if data.userData}
					<li>
						<a href="/RentalHealthCheck">Rental Health Check</a>
					</li>
					<li>
						<a href="/Community">Community</a>
					</li>
					{#if data.userData?.role == "Admin"}
					<li>
						<a href="/Organizations/Add">Add Organization</a>
					</li>
					{/if}
					{:else}
					<li>
						<a href="/">Become a Partner</a>
					</li>
					{/if}
			</ul>
		</nav>
	</div>


	{:else}
		<div id="navSelector">
			<button on:click={toggleMenu} aria-label="Nav Menu" id="navIcon"><i class="fas fa-bars fa-xl" /></button>
		</div>
		<a href="/" id="home">
			<h1>PreLease</h1>
		</a>
	{/if}

	<div class="rightCorner">
		{#if  !data.userData}
		<a class="cornerLink" href="/SignIn">Sign In</a>
		{:else}
		
		<a class="cornerLink" href="/Profile"><img id='avatar' src="{data.userData.pfp}" alt="avatar"><h2>{data.userData.displayName ?? 'Profile'}</h2></a>
		{/if}
	</div>
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
		padding-bottom: 1rem;

		
	}
	header {
		width:100vw;
		max-width:100%;
		position: fixed;
		top:0;
		left:0;
		display: flex;
		justify-content: space-between;
		background-color: white;
		min-height: 4rem;
		height: fit-content;
		padding: 0.5rem;
		text-align: center;
		color: var(--color-theme-2);

		z-index: 5;

		
	}
	footer{
		
	}
	a{
		color:var(--color-theme-2);
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
		color: var(--color-theme-2);
		font-size: 1.5rem;
		margin-left: 2.5%;
		font-weight: bolder;
		
		cursor: pointer;
	}
	#avatar{

		margin-right:1rem;
		background-color: white;
		aspect-ratio: 1/1;
		width:50px;
		border-radius: 99rem;
		border: 2px solid var(--color-theme-2);
		
	}
	#home{
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.2rem;
	}
	.requestNumber{
		display: inline-block;
		background-color: var(--color-theme-2);
		border-radius: 99rem;
		color:white;
		min-width: 1.35rem;
		height: 1.35rem;
		
	}
	.requestNumber p{
		margin:0;
		padding: .2rem;
		color:white;
		font-size: .8rem;
	}
	.orgIcon{
		aspect-ratio: 1/1;
		width:2rem;

		
	}
	.leftCorner{
		display: flex;
		align-items: center;
		margin-left:1rem;
	}
	.homeLink{
		font-size: 1.5rem;
		margin-right:1rem;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		color:rgb(80, 80, 80);
	}
	.navBar ul{
		display: flex;
		padding:0;
		box-shadow: -2px 0 #424242a4;
	}
	.navBar ul li{
		margin:.5rem;
		list-style: none;
	}
	.navBar ul li a{
		color: #424242;
	}
	.navBar ul li a:hover{
		color: var(--color-theme-2)
	}
	.navBar{

	}
	.rightCorner{
		display: flex;
		align-items: center;
	}
	.cornerLink {
		font-size: 1.7rem;
		cursor: pointer;

		display:flex;
		align-items: center;
		justify-content: center;

	}
	.cornerLink h2{
		margin:0;
	}
	@media only screen and (max-width: 720px){
		header{
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
		}
		.rightCorner{
			width: 100%;
			text-align: right;
			display: block;
		}
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
		#avatar{
			height:100%;
			margin-right:.5rem;
			border-radius: 99rem;
			width:auto;

		}
		.rightCorner{
			justify-content: right;
		}
		.cornerLink{
			font-size: 1rem;
			height:2.25rem;
		}
		.cornerLink h2{
			font-size: 1.5rem;
		}
	}


</style>
