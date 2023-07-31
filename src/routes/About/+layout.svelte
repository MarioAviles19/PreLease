<script>
	import { page } from '$app/stores';

	//TODO: add page transitions
</script>

<div id="banner"><img src="/longBrownstone.jpg" /></div>
<section id="content" class="glassTint">
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

	<div id="slot">
		<slot />
	</div>
</section>

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
		font-size: 1.5rem;
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
			margin-top:0;
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
		.glassTint{
			width:fit-content;
			background-color: rgba(0, 0, 0, 0.688);
			backdrop-filter: blur(2px);

		}
	}
</style>
