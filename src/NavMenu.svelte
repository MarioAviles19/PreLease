<script>
	import { fade, slide } from 'svelte/transition';

	export let open = false;

	function toggleMenu() {
		open = false;
	}
</script>

<div transition:fade={{ duration: 200 }} on:click={toggleMenu} id="underlay" />
<nav transition:slide={{ axis: 'x', duration: 500}} id="navBar">
	<button on:click={toggleMenu} id="closeButton"><span class="fas fa-close fa-lg" /></button>
	<a on:click={toggleMenu} href="/">Home</a>
	<a on:click={toggleMenu} href="/Community">Community</a>
	<a on:click={toggleMenu} href="/RentalHealthCheck">Rental Health Check</a>
	<a on:click={toggleMenu} href="/About">About</a>
</nav>

<style>
	#underlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		max-width:100%;

		background-color: rgba(0, 0, 0, 0.171);
	}
	#navBar {
		position: fixed;
		left: 0;
		top: 0;

		display: flex;
		flex-direction: column;
		height: 100vh;
		
		width: fit-content;


		background-color: white;
		box-shadow: 1px 0px 10px var(--color-trim);

		padding: 1rem;
		padding-top: 0;

		z-index: 100;
	}
	#navBar a {
		height: 3rem;
		margin-bottom: 1rem;
		padding-right:1rem;
		color: var(--color-dark-text);
		font-size: 1.5rem;
		font-weight: bold;
		white-space: nowrap;
	}
	#navBar a:hover {
		box-shadow: 4px 0px var(--color-theme-2);
		color: var(--color-theme-2);
	}
	#closeButton {
		border: none;
		background: none;

		height: 2rem;
		margin: 2rem auto;
		width: 100%;

		cursor: pointer;
		text-align: left;
		color: var(--color-theme-2);
		font-size:2rem;
	}
	#closeButton:hover {
		box-shadow: 1px 0 var(--color-theme-1), -1px 0 var(--color-theme-1), 0 1px var(--color-theme-1),
			0 -1px var(--color-theme-1);
	}
</style>
