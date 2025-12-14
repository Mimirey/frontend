<script>
	import { goto } from "$app/navigation";
	import SusunPiringGame from "$lib/games/susun-piring/SusunPiringGame.svelte";

</script>
<svelte:head>
  <title>Susun Piring Gizi - PanganMu</title>
  <meta name="description" content="Belajar menyusun piring dengan komposisi gizi seimbang" />
</svelte:head> 

<div class="navbar bg-base-100 shadow-lg">
  <div class="flex-1">
    <button class="btn btn-ghost" on:click={() => goto('/gameArena')}>
      ← Kembali ke Arena
    </button>
  </div>
  <div class="flex-none">
    <h2 class="text-xl font-bold">Susun Piring Gizi</h2>
  </div>
</div>

<SusunPiringGame/>
