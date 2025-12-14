<script>
	import { characters } from "$lib/data/characters";
	import Card from "../ui/Card.svelte";
</script>

<div class="container mx-auto px-4 py-8">
	<!-- Header Section -->
	<div class="text-center mb-12">
		<h2 class="text-4xl font-bold text-gray-800 mb-3">Meet Our Characters</h2>
		<p class="text-gray-600 max-w-2xl mx-auto">Discover the unique personalities that bring our story to life</p>
	</div>

	<!-- Cards Grid -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
		{#each characters as character, index (character.id)}
			<div 
				class="group"
				style="animation: fadeInUp 0.6s ease-out {index * 0.1}s both;"
			>
				<Card
					title={character.title}
					description={character.description}
					image={character.image}
					horizontal={true}
					showButton={false}
					class="h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50"
					minHeight="min-h-[240px]"
					imagePosition="right"
				/>
			</div>
		{/each}
	</div>
</div>

<style>
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.container {
		max-width: 1280px;
	}

	:global(.group:hover .card-image) {
		transform: scale(1.05);
	}
</style>