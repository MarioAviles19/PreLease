<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let textObjects = [{ name: '', text: '', link: '',  linkText: ''}];

	let currentItem = { name: '', text: '', link: '', linkText: ''};
	let currentIndex = 0;

	let visable = true;

	onMount(() => {
		currentItem = textObjects[0];
	});

	function NextItem() {
		if (visable || textObjects.length <= 1) {
			return;
		}
		if (currentIndex + 1 >= textObjects.length) {
			currentIndex = 0;
		} else {
			currentIndex += 1;
		}
		currentItem = textObjects[currentIndex];

		visable = true;
	}

	setInterval(() => {
		visable = false;
	}, 10000);
</script>

{#if visable}
	<div transition:fade={{ duration: 750, delay: 100 }} on:outroend={NextItem} id="text">
		<h1>{currentItem.name}</h1>
		<p>{currentItem.text}<span id="elipses">...</span></p>
		<a href={currentItem.link}>{currentItem.linkText}</a>
	</div>
{/if}

<style>
	* {
		color: var(--color-light-text);
	}
	#text {
		padding: 1rem 10%;

		max-height: 70%;
		font-size: 1.2rem;
	}
	#text a {
		float: right;
		margin-right: 1rem;
		text-decoration: underline;
	}
	#text a:hover {
		color: var(--color-theme-2)
	}
	#elipses {
		letter-spacing: 0.2rem;
		font-size: 1.2rem;
	}
	p {
		letter-spacing: 1px;
	}
	@media only screen and (max-width: 520px){
		p{

			font-size:1rem;
		}
		#text{
			position:relative;
			width:100%;
			height:100%;
			padding:1rem .7rem;
		}
		#text h1{
			margin-top:.5rem;
		}
	}
	@media only screen and (max-width: 650px){
		p{

			font-size:1rem;
		}
		#text{
			position:relative;
			width:100%;
			height:100%;
			padding:1rem .7rem;
		}
		#text h1{
			margin-top:.5rem;
		}
	}
</style>
