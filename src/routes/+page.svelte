<script>
	import { onMount } from 'svelte';
	import TextCarousel from './TextCarousel.svelte';
	import { slide } from 'svelte/transition';

	let previews = [
		{
			name: 'Our Mission',
			text: 'Housing Support: Renters have access to the Rental Health Check, a diagnostic tool that connects tenants to public resources, improves screening health, and comes with a free consultation. For Rental Health Insurance, we assist tenants with early emergency intervention',
			link: '/About',
			linkText: 'About Us'
		},
		{
			name: 'Our Vision',
			text: 'We want to uplift our surrounding partners and create an alternative. When tenants have a rental emergency, they can reach out to legal assistance such as Homeline, and seek out emergency rental assistance. Sometimes there is insufficient time or inadequate documentation for legal action',
			link: '/About/Vision',
			linkText: 'Our Vision'
		}
	];

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
	<div class="panel textWithImage">
		<div class="textWrapper">
			<h2>Rental Health Check</h2>
			<p>The rental market is similar to the job market. It is competitive and landlords will scrutinize your rental resume. Our free, comprehensive survey, Rental Health Check™,  assess renter screening health, address renter current issues, and determine resource savings. It comes with a free consultation, and may lead to referrals from our housing partners! By working with PreLease, we want you to be informed, confident, and match you with responsive landlords.
			</p>

		</div>
		<div class="imageWrapper">
			<div class="circularBackground"></div>
			<img src="/front_RHC-ad1.jpg" alt="Prelease chart. It showcases a stylized">


		</div>
		<a class="navigationButton" href="/RentalHealthCheck">Take a Rental Health Check</a>
	</div>

	<div class="panel ">
		<h2>Rate My Landlord</h2>
		<p>Help keep landlords and property managers accountable by leaving a review of the places you've rented</p>
		<a class="navigationButton" href="/Community/RateMyLandlord">Rate Your Landlord</a>
	</div>

	<div class="panel ">
		<h2 class="smallerText">Landlords: Evictions are expensive, time-consuming, and emotionally exhausting</h2>
		<p>With our Rental Health Assurance™, we regularly check-in with your tenants, collect tenant feedback, and provide them assistance during an emergency. Our service reduces hassle, increases payment stability, and builds friendlier relationships with your tenants.
		</p>
		<div class="centerFlex">
			<div class="imageWrapper rentalHealthInsuranceInfographic">
				<img  src="/Rental-Health-Insurance-Infographic.jpg" alt="An infographic">
			</div>
			<ul class="perklist">
				<li>✔️ Collect tenant feedback and increase tenant engagement</li>
				<li>✔️ Reduce rent burden by accessing government resources</li>
				<li>✔️ Early Emergency Relief for your tenants</li>
				<li>✔️ Tenant education</li>
				<li>✔️ Send notifications to your tenants</li>
			</ul>
		</div>

		<p>Landlords can access our pre-assured tenant pool to fill vacant rental units with a quality responsive tenant that is supported for the duration of the lease. </p>
		<a class="navigationButton" href="/">Sign Up as Landlord</a>
	</div>

	
</section>

<style>

	.perklist li:first-child{
		margin-top:0;
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
		padding:1rem;
	}
	#info h2{
		color:var(--color-theme-2);
		font-size: 2rem;
	}
	#info p{
		font-size: 1.2rem;
		line-height: 2rem;
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

	.textWrapper{
		padding:1rem;
	}
	.centerFlex{
		display: flex;
		align-items: flex-start;
		justify-content: space-around;
	}
	.rentalHealthInsuranceInfographic{
		width:clamp(15rem, 50%, 30rem);
		margin-right: 1rem;
	}
	.textWithImage{
		display:grid;
		grid-template-columns: 1fr 1fr;
		gap:1rem;
	}
	.imageWrapper{

		position:relative;
	}
	.imageWrapper img{

		width:100%;
		margin: auto;
	}
	.imageWrapper .circularBackground{
		display: none;
		position: absolute;
		bottom:0;
		left:0;
		z-index: -1;
		aspect-ratio: 1/1;
		width:100%;
		border-radius: 99rem;
		background-color: grey;
	}
	.panel{
		padding:1rem 3rem;
		width: clamp(15rem, 100%, 75rem);
		background-color: white;
		border-radius: 5px;
		margin: 1rem auto;
		
	}
	.panel .navigationButton{

	}
	.navigationButton{
		display: block;
		background-color: var(--color-theme-2);
		color:white;
		width:fit-content;
		padding:.8rem 1rem;
		font-size:1.2rem;
		border-radius: 12px;
		font-weight: bold;


	}
	.perklist{
		padding:0;
	}
	.perklist li{
		list-style: none;
		font-size: 1.2rem;
		font-weight: lighter;
		margin:1.8rem 0;
	}
	@media only screen and (max-width: 520px){
		.textWithImage{
			grid-template-columns: 1fr;
			
		}
		.centerFlex{
			flex-wrap: wrap;
		}
		.panel{
			padding: 1rem .5rem;
		}
		.panel h2{
			margin-top:0;
		}
		#info .panel .smallerText{
			font-size: 1.5rem;
		}
	}
</style>