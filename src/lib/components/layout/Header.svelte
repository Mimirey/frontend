<script>
	import { goto } from "$app/navigation";

</script>
<div class="navbar bg-base-100 shadow-lg">
    <div class="flex-1">
        <button class="btn btn-ghost" on:click={()=> goto('/gameArena')}>
            ← Kembali ke Arena
        </button>
    </div>
    <div class="flex-none">
      <h2 class="text-xl font-bold">Tebak Pangan Lokal</h2>
    </div>
</div>