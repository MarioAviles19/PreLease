<script>
	import { onMount } from 'svelte';
	import TextCarousel from './TextCarousel.svelte';
	import { slide } from 'svelte/transition';

	let db = [
		{
			phoneNumber: '651-555-3254',
			type: 'Eviction',
			region: 'Hennepin',
			description:
				'Hennepin County Adult Representation Services Department is an independent county organization',
			name: 'Hennepin County Adult Representation Services Housing'
		},
		{
			phoneNumber: '763-555-4563',
			type: 'Housing',
			region: 'Anoka',
			description:
				'Judicare of Anoka County is a non-profit legal aid program that provides free legal service to clients',
			name: 'Anoka Judicare Housing Law'
		}
	];

	let previews = [
		{
			name: 'Our Mission',
			text: 'Housing Support: Renters have access to the Rental Health Check, a diagnostic tool that connects tenants to public resources, improves screening health, and comes with a free consultation. For Rental Health Insurance, we assist tenants with early emergency intervention',
			link: '/About'
		},
		{
			name: 'Our Vision',
			text: 'We want to uplift our surrounding partners and create an alternative. When tenants have a rental emergency, they can reach out to legal assistance such as Homeline, and seek out emergency rental assistance. Sometimes there is insufficient time or inadequate documentation for legal action',
			link: '/About/Vision'
		}
	];

	db = [...db, ...db];

	//Logic for searching

	let showAdvanced = false;
	let regions = [];
	let types = [];

	db.forEach((obj) => {
		if (!regions.includes(obj.region)) {
			regions.push(obj.region);
		}
		if (!types.includes(obj.type)) {
			types.push(obj.type);
		}
	});

	let currentResults = [{ phoneNumber: '', type: '', region: '', description: '', name: '' }];
	let searchBar = '';
	let region = '';
	let type = '';

	function ExecuteSearch() {
		let textReg = new RegExp(`${searchBar == '' ? '.' : searchBar}`, 'i');
		let regionReg = new RegExp(`${region == '' ? '.' : region}`, 'i');
		let typeReg = new RegExp(`${type == '' ? '.' : type}`, 'i');
		let temp = [];
		db.forEach((obj) => {
			if (textReg.exec(obj.name) && regionReg.exec(obj.region) && typeReg.exec(obj.type)) {
				temp.push(obj);
			}
			currentResults = temp;
		});
	}
	onMount(() => {
		currentResults = db;
	});
	function toggleAdvanced() {
		showAdvanced = !showAdvanced;
	}
</script>
<svelte:head>
	<title>Home</title>
	
	<meta name="description" content="PreLease SBC builds a mutual partnership between landlords and their tenants. We offer renter support services, tenant placement, and Rental Health Assurance™ to landlords where we assist their tenants BEFORE a rental emergency. Renters can join our renter pool to match with responsive landlords "/>
</svelte:head>

<div id="banner">
	<img src="brownstone2.jpg" alt="Brownstone background" />
	<div id="photoOverlay"><TextCarousel textObjects={previews} /></div>
</div>

<section id="">
	<h2>Rental Health Check</h2>
	<p>Our Rental Health Check is a diagnostic tool that allows you to assess your rental health 
		and helps us connect you with the resources you need.
	</p>
	<h2>Rate My Landlord</h2>
	<p>Help keep landlords and property managers accountable by leaving a review of the places you've rented</p>


	
</section>

<style>

	h1{
		margin:0;
		margin-bottom:1rem;
		font-size: 2rem;
	}
	#banner {
		position: relative;

		width: 100%;
		box-shadow: 0px 1px 5px grey;
		overflow:hidden;
	}
	#banner img {
		display: block;
		width: 100%;

		object-fit: cover;
		height: 20rem;
	}

	#photoOverlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(3px);
	}
	#posts {
		margin: auto;
		margin-top: 1rem;
		width: 70%;
		max-width: 40rem;
		box-shadow: 1px 1px 5px var(--color-trim);
		border-radius: 10px;

		padding: 1.5rem 2rem;
		background-color: white;
	}

	#searchBar {
		height: 2rem;
		border-radius: 10px;
		font-size: 1.2rem;
		border-width: 1px;
		background-color: rgb(234, 234, 234);
		border: none;
		padding-left: 0.2rem;
		margin-right:.5rem;

		outline: solid 1px grey;

		width:50%;
		min-width: 10rem;
	}
	#searchBar:focus {
		outline: solid 1px black;
	}
	#searchForm {
		width: 100%;
		padding: 0 5%;
		margin-bottom: 1rem;
	}
	#searchButton {
		height: 2.2rem;
		


	}

	#advancedOptions {
		box-shadow: 0px -4px 3px -3px rgba(128, 128, 128, 0.514);
		padding-top: 0.5rem;
        
		margin-top: 1rem;
        
	}
	#advancedOptions h3 {
		margin-top: 0.5rem;
	}
	#advancedToggle {
		border: none;
		background-color: white;

		cursor: pointer;
	}
	#advancedToggle:hover {
		color: var(--color-theme-1);
	}
	.optionSelector {
		height: 2rem;
		border-radius: 10px;
		font-size: 1.2rem;
		border: none;
		background-color: rgb(234, 234, 234);
	}
	.infoContainer {
		width: 100%;
	}
	.card {
		box-shadow: 1px 1px 5px var(--color-trim);
		padding: 1.2rem;

		border-radius: 1rem;

		margin: auto;
		margin-bottom: 2rem;
		max-width: 35rem;
	}
	.phoneNumber {
		display: inline-block;
		background-color: var(--color-theme-1);
		width: fit-content;

		margin: 0;
		margin-bottom: 0.2rem;

		color: var(--color-light-text);
		padding: 0.1rem 0.5rem;

		border-radius: 2rem;
		font-size: 0.8rem;
	}
	.region {
		color: var(--color-theme-2);
		font-weight: 200;
		font-size: 1rem;
		margin: 0;
		margin-bottom: 0.3rem;
		width:fit-content;

	}
	
	.type {
		display: inline-block;

		margin: 0;

		font-weight: 100;
		font-size: 1.3rem;
	}
	.description {
		margin-top: 0.2rem;

		font-size: 0.9rem;
		color: grey;
	}
	.name{
		margin:0;
	}

	@media only screen and (max-width: 520px){
		#posts{
			width:100vw;
		}
	}
</style>