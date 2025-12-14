<script>
	import CharactersSheet from "$lib/components/home/CharactersSheet.svelte";
	import HeroSection from "$lib/components/home/HeroSection.svelte";
	import HowItWorks from "$lib/components/home/HowItWorks.svelte";
	import Accordion from "$lib/components/ui/Accordion.svelte";
	import Badges from "$lib/components/ui/Badges.svelte";
	import Card from "$lib/components/ui/Card.svelte";
	import Carousel from "$lib/components/ui/Carousel.svelte";
	import Hero from "$lib/components/ui/Hero.svelte";
	import RightHero from "$lib/components/ui/RightHero.svelte";
	
	
</script>
<svelte:head>
	<title>PanganMu - Jelajahi Kekayaan Pangan Indonesia</title>
  	<meta name="description" content="Platform edukasi interaktif untuk mengenal keanekaragaman pangan lokal Indonesia melalui game dan katalog digital" />
	<!-- <script src="/dist/assets/index-CPScPeSq.js"></script> -->
</svelte:head>


<div class="homepage">
  <HeroSection />
  <HowItWorks />
  <CharactersSheet/>
</div>

<style>
  .homepage {
    overflow-x: hidden;
  }
</style>

