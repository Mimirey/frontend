<script>
	import { recipeCategories, recipes } from "$lib/data/recipes";
	import { customRecipes } from "$lib/stores/customRecipes";
    
    export let onSelect = ()=> {};
    export let onClose=()=> {};
    export let onAddCustom=()=>{};

    let selectedCategory= 'Semua';
    let searchQuery= '';
    let showCustomOnly= false;

    $: allRecipes = [...recipes, ...$customRecipes];
    $: filteredRecipes = allRecipes.filter(recipe =>{
        const matchesCategory= selectedCategory === 'Semua' || recipe.category === selectedCategory;
        const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
                            recipe.tags?.some(tag=>tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCustomFilter = !showCustomOnly || recipe.isCustom;
        return matchesCategory && matchesSearch && matchesCustomFilter;                    
    });
</script>
<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
  <div class="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
    <!-- Header -->
    <div class="p-6 border-b flex items-center justify-between">
      <h3 class="text-2xl font-bold text-gray-800">Pilih Resep</h3>
      <button on:click={onClose} class="text-gray-400 hover:text-gray-600 text-2xl">
        ✕
      </button>
    </div>

    <!-- Search & Filter -->
    <div class="p-6 border-b space-y-4">
      <div class="flex gap-3">
        <input
          type="text"
          placeholder="🔍 Cari resep..."
          bind:value={searchQuery}
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          on:click={onAddCustom}
          class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium whitespace-nowrap"
        >
          ➕ Tambah Custom
        </button>
      </div>

      <div class="flex gap-2 flex-wrap">
        {#each recipeCategories as category}
          <button
            on:click={() => selectedCategory = category}
            class="px-4 py-2 rounded-lg transition-colors {selectedCategory === category 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
          >
            {category}
          </button>
        {/each}
        
        <button
          on:click={() => showCustomOnly = !showCustomOnly}
          class="ml-auto px-4 py-2 rounded-lg transition-colors {showCustomOnly 
            ? 'bg-purple-600 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
        >
          {showCustomOnly ? '✓' : ''} My Recipes ({$customRecipes.length})
        </button>
      </div>
    </div>

    <!-- Recipe List -->
    <div class="flex-1 overflow-y-auto p-6">
      {#if filteredRecipes.length > 0}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each filteredRecipes as recipe}
            <button
              on:click={() => onSelect(recipe)}
              class="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-green-500 hover:shadow-lg transition-all text-left"
            >
              <div class="relative">
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  class="w-full h-40 object-cover rounded-lg mb-3"
                  on:error={(e) => e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'}
                />
                {#if recipe.isCustom}
                  <span class="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                    Custom
                  </span>
                {/if}
              </div>
              
              <h4 class="font-semibold text-gray-800 mb-2">{recipe.title}</h4>
              
              <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <span class="bg-green-100 text-green-700 px-2 py-1 rounded">
                  {recipe.difficulty}
                </span>
                <span>⏱️ {recipe.prepTime + recipe.cookTime}m</span>
              </div>

              <div class="grid grid-cols-2 gap-1 text-xs text-gray-600">
                <div>🔥 {recipe.nutrition.calories} kal</div>
                <div>🥩 {recipe.nutrition.protein}g</div>
              </div>

              {#if recipe.tags && recipe.tags.length > 0}
                <div class="flex flex-wrap gap-1 mt-2">
                  {#each recipe.tags.slice(0, 2) as tag}
                    <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {tag}
                    </span>
                  {/each}
                </div>
              {/if}
            </button>
          {/each}
        </div>
      {:else}
        <div class="text-center py-12 text-gray-400">
          <p class="text-xl mb-2">😕</p>
          <p>Tidak ada resep ditemukan</p>
          <button
            on:click={onAddCustom}
            class="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            ➕ Tambah Resep Custom
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>