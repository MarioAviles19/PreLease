<script>
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';

	export let data;
	//TODO: add page transitions
</script>

<div id="banner"><img src="/longBrownstone.jpg" /></div>
<div id="backgroundOverlay" class="glassTint"></div>
	<nav >
		<a href="/About" aria-current={$page.url.pathname === '/About' ? 'page' : undefined}
			>Our Mission</a
		>
		<a href="/About/Team" aria-current={$page.url.pathname === '/About/Team' ? 'page' : undefined}
			>Meet the Team</a
		>
		<a href="/About/Vision" aria-current={$page.url.pathname === '/About/Vision' ? 'page' : undefined}
			>Our Vision</a
		>
	</nav>

	{#key data.url}
		<div id="slot" in:fly={{x:'100vw', duration: 400, delay: 600}} 
		out:fly={{x:'-100vw', duration:400}}>
			<slot />
		</div>
	{/key}

<style>
	* {
		color: var(--color-dark-text);
	}
	nav {
		width: 100%;
		margin: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2rem;

		margin-top: 2rem;
	}
	nav a {
		font-size: 1.8rem;
	}
	nav a:hover {
		color: var(--color-theme-2);
		box-shadow: 0px 2px var(--color-theme-2);
	}
	#banner {
		height: fit-content;
		box-shadow: 0px 1px 5px var(--color-trim);
	}
	#banner img {
		height: 15rem;
		width: 100%;
		margin: auto;
		object-fit: cover;
		object-position: 0% 50%;

		display: block;
	}
	#slot{
		line-height: 2rem;
	}
	a[aria-current='page'] {
		color: var(--color-theme-2);
		box-shadow: 0px 2px var(--color-theme-2);
	}

	@media only screen and (max-width: 520px){
		nav a{
			font-size: 1.5rem;
			color: var(--color-light-text);
			box-shadow: 0px 2px var(--color-trim);
			
		}
		nav{
			margin-top:1rem;
			padding-bottom: .2rem;
			margin-bottom:3rem;
		
			display: flex;
			flex-direction: column;
			
		}
		#banner{
			position:fixed;
			top:0;
			left:0;
			z-index: -1;

			height:100%;
			width:100%;
			
		}
		#banner img{
			height:100%;
		}
		#slot{
			
			color:var(--color-light-text)

		}
		#backgroundOverlay{
			z-index: -1;
			position:fixed;
			top:0;
			left:0;
			height:100%;
			width:100%;

		}

	}
</style>
