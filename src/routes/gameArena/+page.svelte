<script>
    import { minigames } from "$lib/data/game";
    import Card from "$lib/components/ui/Card.svelte";

    import { goto } from "$app/navigation";

    function handleGameClick(game){
        goto(game.route);
    }
</script>

<div class="container mx-auto px-4 py-8">
    <div class="hero mb-12">
        <div class="hero-content text-center">
            <div class="max-w-md">
                <h1>Game Arena</h1>
                <p>Pilih minigame untuk kenal tentang diversifikasi pangan!</p>
            </div>
        </div>
    </div>
    

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {#each minigames as game (game.id)}
        <Card
        title={game.title}
        description={game.description}
        image={game.image}
        buttonText={game.available ? "Play" : "Coming Soon"}
        onClick={() => goto(game.route)}/>
        {/each}
    </div>
</div>