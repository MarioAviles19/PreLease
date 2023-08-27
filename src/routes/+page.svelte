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

<section id="info">
	<div class="panel outset">
		<h2>Rental Health Check</h2>
		<p>Our Rental Health Check is a diagnostic tool that allows you to assess your rental health
			and helps us connect you with the resources you need.
		</p>
	</div>

	<div class="panel inset">
		<h2>Rate My Landlord</h2>
		<p>Help keep landlords and property managers accountable by leaving a review of the places you've rented</p>
	</div>

	<div class="panel outset">
		<h2>Rental Resume</h2>
		<p>Improve your chances of finding quality housing and distinguish yourself from other applicants by creating a Rental Resume</p>
	</div>

	
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
	#info{
		

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
	.panel{
		padding:1rem
	}
	.panel.outset{
		background-color: white;
		color:black;
		box-shadow: 0px 2px 7px 5px rgba(0, 0, 0, 0.209),0px -2px 7px 5px rgba(0, 0, 0, 0.209)
	}
	.panel.inset{

	}
	@media only screen and (max-width: 520px){
		#posts{
			width:100vw;
		}
	}
</style>