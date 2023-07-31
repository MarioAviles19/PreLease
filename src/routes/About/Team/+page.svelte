<script>
</script>

<section id="main">
	<div class="card">
		<div class="pfp"><img src="/Abu.jpg" alt="" /></div>
		<h2>Co-founder/ CEO- Abu Nayeem</h2>
		<br />
		<p>
			Abu Nayeem is a St. Paul resident, community organizer, and a lifelong renter. He has a
			Masters in Agricultural Resource Economics from UC Berkeley. He organized neighborhood
			cleanups in the Midway/Frogtown community, boardmember of Hamline Midway Coalition, and 2021
			St. Paul mayoral candidate. He has engaged with many residents including tenants in both
			public and private housing. He is the founder of the St. Paul Open Data Initiative, which
			takes public open data from local municipalities to create interactive community reports.
			<br />
			<br />
			Abu has been a lifelong renter, and first generation immigrant that grew up in poverty in NYC.
			He has first-hand experience on the importance of housing stability for families and the tense
			relationship between tenants and landlords. For PreLease, we want to increase housing access for
			renters and cultivate a healthy partnership between the landlord, tenants, and the larger community.
		</p>
	</div>
	<div class="card">
		<div class="pfp"><img src="/Zachery.jpg" alt="" /></div>
		<h2>Co-founder/ Developer- Zachery Hurdle</h2>
		<br />
		<p>
			"I am a St. Paul resident, plant-based chef, and community entrepreneur. My experience with
			business building and management stems back to my experience at the University of St. Thomas.
			I was involved in the entrepreneurship program and as a result I decided to start a business
			called Campus Crew. We hired college students to work with residents in the Union Park
			neighborhood around the University, and eventually rebranded to Busy Bee doing the same type
			of work in the Twin Cities.

			<br />
			<br />
			As a result of this work, I have continued to feel a strong draw towards seeing the community around
			me improve. I think this can be done in many ways, and housing is one. With PreLease, I hope to
			add to the conversation around housing, uplift and empower tenants throughout the rental process,
			and create mechanisms of accountability."
		</p>
	</div>
	<div class="card">
		<div class="pfp"><img src="/Liam.jpg" alt="" /></div>
		<h2>Housing Intern- Liam Mueller</h2>
		<br />
		<p>
			I am a recent graduate (Spring 2022) of the University of Minnesota with a degree in Urban
			Studies and a minor in Japanese. I am passionate about Community Development, Transportation,
			Housing, and Planning, with hopes to improve accessibility in and around the Twin Cities area.
			I am excited to be a part of the PreLease team, hoping to further my knowledge of housing laws
			and regulations, get to knowledge specific housing agencies in the area, as well as being a
			part of a project that I believe is going to change the culture of renting and owning
			properties for the better.
		</p>
	</div>
</section>

<style>
	#main {
		padding: 5rem 3rem;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2%;
	}
	h2{
		color:var(--color-theme-2);

	}
	p {
		font-size: 1rem;
	}
	.card {
		width: 100%;
		background-color: white;
		padding:1rem;
		border-radius: 10px;
		box-shadow: 1px 1px 3px var(--color-trim);
		line-height: 2rem;

	}

	.pfp img {
		aspect-ratio: 1/1;
		width: 100%;
		border-radius: 100%;
		object-fit: cover;
	}
	.pfp{
		padding:1rem;
	}
	@media only screen and (max-width:1000px){
		#main{
			grid-template-columns: 1fr;
			padding:1rem 20%;
			margin-top:1rem;
		}
	}
	@media only screen and (max-width: 520px){
		#main{
			grid-template-columns: 1fr;
			padding:1rem 1.5rem;
			margin-top:1rem;
		}
		.card{
			background:none;
			box-shadow: none;
		}
		
	}
</style>
