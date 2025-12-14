<script>
  import FlipBook from "$lib/components/flipbook/FlipBook.svelte";
  import { katalogPages } from "$lib/data/katalogPanganData";
  import { features } from "$lib/data/katalogFeatures";
  import { onMount } from "svelte";
	import IconImg from "$lib/components/IconImg.svelte";
	import { iconMap } from "$lib/utils/iconMap";
	import { featureIcons } from "$lib/data/featureIcons";

  

  let showWelcome = true;
  let searchQuery = "";
  let currentView = "flipbook";

  const pagesWithNumbers = katalogPages.map((page, index) => ({
    ...page,
    pageNumber: index + 1
  }));

  let filteredPages = pagesWithNumbers;

  function startReading() {
    showWelcome = false;
  }

  function handleSearch() {
    if (!searchQuery.trim()) {
      filteredPages = pagesWithNumbers;
    } else {
      const q = searchQuery.toLowerCase();
      filteredPages = pagesWithNumbers.filter(p =>
        p.nama?.toLowerCase().includes(q) ||
        p.deskripsi?.toLowerCase().includes(q) ||
        p.kategori?.toLowerCase().includes(q) ||
        p.title?.toLowerCase().includes(q)
      );
    }
  }

  function handlePageChange(e) {
    console.log("Changed to page:", e.detail.page);
  }

  onMount(() => {
    pagesWithNumbers
      .filter(p => p.image)
      .forEach(p => {
        const img = new Image();
        img.src = p.image;
      });
  });
</script>

<svelte:head>
  <title>Katalog Pangan Nusantara - PanganMu</title>
  <meta
    name="description"
    content="Jelajahi keanekaragaman pangan lokal Indonesia dalam buku digital interaktif"
  />
</svelte:head>

<div class="min-h-screen">

{#if showWelcome}
<!-- ================= WELCOME ================= -->
<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-base100 to-base200 px-4">
  <div class="max-w-5xl w-full text-center">

    <img
      src="/images/characters/bermain.jpg"
      alt="playing"
      class="w-28 mx-auto mb-8 animate-bounce"
    />

    <h1 class="text-4xl md:text-6xl font-extrabold mb-6">
      Katalog Pangan Nusantara
    </h1>

    <p class="text-lg md:text-xl opacity-80 mb-16">
      Jelajahi keanekaragaman pangan lokal Indonesia <br />
      dalam pengalaman membaca buku digital interaktif
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
      {#each features as feature}
        <div class="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition">
          <img src={feature.icon} alt={feature.title} class="w-16 mx-auto mb-4" />
          <h3 class="font-bold mb-2">{feature.title}</h3>
          <p class="text-sm opacity-70">{feature.desc}</p>
        </div>
      {/each}
    </div>

    <button
      on:click={startReading}
      class="px-10 py-4 rounded-full bg-white font-bold shadow-xl hover:scale-105 transition"
    >
      Mulai Membaca →
    </button>

    <p class="mt-8 text-sm opacity-70">
      💡 Gunakan tombol ← → atau klik halaman untuk membalik
    </p>
  </div>
</div>

{:else}
<!-- ================= MAIN KATALOG ================= -->
<div class="min-h-screen flex flex-col bg-base-100">

  <!-- Header -->
  <header class="sticky top-0 z-50 bg-white shadow">
    <div class="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row gap-4 justify-between">

      <div class="flex items-center gap-4">
        <a href="/" class="px-4 py-2 rounded-lg bg-base-200 hover:bg-base-300">
          ← Beranda
        </a>
        <h1 class="text-xl font-bold">
          <img
              src={featureIcons.buku}
              alt=""
              class="feature-icon-img"
          /> Katalog Pangan</h1>
      </div>

      <div class="flex flex-col sm:flex-row gap-3">

        <!-- Search -->
        <div class="relative">
          <input
            type="text"
            placeholder="Cari pangan..."
            bind:value={searchQuery}
            on:input={handleSearch}
            class="w-full px-4 py-2 pr-10 rounded-xl border focus:ring-2 focus:ring-primary h-10"
          />
        </div>

        <!-- Toggle -->
        <div class="flex bg-base-200 rounded-xl p-1">
          <button
            class="px-4 py-2 rounded-lg"
            class:bg-white={currentView === 'flipbook'}
            on:click={() => currentView = 'flipbook'}
          ><img
            src={featureIcons.buku}
            alt=""
            class="feature-iconn-img"
          /></button>

          <button
            class="px-4 py-2 rounded-lg"
            class:bg-white={currentView === 'grid'}
            on:click={() => currentView = 'grid'}
          >⊞</button>
        </div>

      </div>
    </div>
  </header>

  <!-- Content -->
  <main class="flex-1 max-w-7xl mx-auto w-full px-4 py-10">

    {#if currentView === 'flipbook'}
      {#if filteredPages.length}
        <FlipBook pages={filteredPages} on:pageChange={handlePageChange} />
      {:else}
        <div class="text-center py-24">
          <img
            src={featureIcons.search}
            alt=""
            class="feature-icon-img"
          />
          <p>Tidak ditemukan</p>
        </div>
      {/if}

    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each filteredPages as page (page.id)}
          {#if page.type === 'item'}
            <div class="bg-white rounded-2xl shadow hover:-translate-y-1 transition overflow-hidden">
              {#if page.image}
                <img src={page.image} alt={page.nama} class="h-48 w-full object-cover" />
              {/if}
              <div class="p-5">
                <h3 class="font-bold">{page.nama}</h3>
                <p class="text-sm opacity-70 mb-2">
                  {page.deskripsi?.substring(0,100)}...
                </p>
                
                <span class="text-xs opacity-60"> 
                  <img
                  src={featureIcons.pinpoint}
                  alt=""
                  class="feature-icon-img"
                  />
                  {page.asal}</span>
              </div>
            </div>
          {/if}
        {/each}
      </div>
    {/if}

  </main>
</div>
{/if}



</div>

<script context="module">
  function getCategoryColor(kategori) {
    const colors = {
      'karbohidrat': '#fbbf24',
      'protein': '#ef4444',
      'sayuran': '#10b981',
      'buah': '#8b5cf6'
    };
    return colors[kategori] || '#6b7280';
  }
</script>

<style>
   .feature-icon-img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    filter: drop-shadow(0 2px 6px rgba(255,255,255,0.4));
  }
  .feature-iconn-img {
    width: 20px;
    height: 20px;
    filter: drop-shadow(0 2px 6px rgba(255,255,255,0.4));
  }
</style>
