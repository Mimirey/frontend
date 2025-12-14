<script>
import {  recipes, recipeTags } from "$lib/data/recipes.js";

  let searchQuery = '';
  let selectedCategory = 'Semua';
  let selectedTags = [];
  let selectedRecipe = null;
  let showFilters = false;

  function toggleTag(tag) {
    if (selectedTags.includes(tag)) {
      selectedTags = selectedTags.filter(t => t !== tag);
    } else {
      selectedTags = [...selectedTags, tag];
    }
  }

  $: filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'Semua' || recipe.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => recipe.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });

  function openRecipe(recipe) {
    selectedRecipe = recipe;
  }

  function closeModal() {
    selectedRecipe = null;
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
  <!-- Header -->
  <div class="bg-gradient-to-r from-neutral to-neutral text-white py-16">
    <div class="max-w-7xl mx-auto px-4">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">Inspirasi Resep</h1>
      <p class="text-xl text-emerald-50">Diversifikasi Pangan Lokal Indonesia</p>
      <p class="text-emerald-100 mt-2">Temukan resep sehat berbahan pangan lokal</p>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Search and Filter Section -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div class="flex flex-col md:flex-row gap-4 mb-4">
        <div class="flex-1 relative">
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            type="text"
            placeholder="Cari resep atau bahan..."
            bind:value={searchQuery}
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
          />
        </div>
        
      </div>

      
    </div>

    <!-- Results Info -->
    <div class="mb-6">
      <p class="text-gray-600">
        Menampilkan <span class="font-bold text-emerald-700">{filteredRecipes.length}</span> resep
      </p>
    </div>

    <!-- Recipe Grid -->
    {#if filteredRecipes.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filteredRecipes as recipe (recipe.id)}
          <div 
            on:click={() => openRecipe(recipe)}
            on:keydown={(e) => e.key === 'Enter' && openRecipe(recipe)}
            role="button"
            tabindex="0"
            class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <div class="h-48 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center">
              <img
                    src={recipe.image}
                    alt={recipe.title}
                    class="w-full h-full object-cover"
                />
            </div>
            
            <div class="p-5">
              <div class="flex items-start justify-between mb-2">
                <h3 class="text-xl font-bold text-gray-800 flex-1">{recipe.title}</h3>
                <span class="px-2 py-1 rounded-full text-xs font-semibold {recipe.difficulty === 'Mudah' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}">
                  {recipe.difficulty}
                </span>
              </div>
              
              <div class="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>{recipe.prepTime + recipe.cookTime} menit</span>
                </div>
                <div class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                  <span>{recipe.servings} porsi</span>
                </div>
              </div>
              
              <div class="flex flex-wrap gap-1 mb-3">
                {#each recipe.tags.slice(0, 2) as tag}
                  <span class="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs">
                    {tag}
                  </span>
                {/each}
              </div>
              
              <div class="grid grid-cols-4 gap-2 pt-3 border-t border-gray-100 text-center text-xs">
                <div>
                  <div class="font-semibold text-gray-800">{recipe.nutrition.calories}</div>
                  <div class="text-gray-500">kal</div>
                </div>
                <div>
                  <div class="font-semibold text-gray-800">{recipe.nutrition.protein}g</div>
                  <div class="text-gray-500">protein</div>
                </div>
                <div>
                  <div class="font-semibold text-gray-800">{recipe.nutrition.carbs}g</div>
                  <div class="text-gray-500">karbo</div>
                </div>
                <div>
                  <div class="font-semibold text-gray-800">{recipe.nutrition.fiber}g</div>
                  <div class="text-gray-500">serat</div>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <div class="text-center py-16">
        <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
        </svg>
        <h3 class="text-2xl font-bold text-gray-700 mb-2">Tidak ada resep ditemukan</h3>
        <p class="text-gray-500">Coba ubah kata kunci atau filter pencarian Anda</p>
      </div>
    {/if}
  </div>

  <!-- Recipe Detail Modal -->
  {#if selectedRecipe}
    <div 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" 
      on:click={closeModal}
      on:keydown={(e) => e.key === 'Escape' && closeModal()}
      role="button"
      tabindex="0"
    >
      <div 
        class="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" 
        on:click|stopPropagation
        on:keydown|stopPropagation
        role="dialog"
        aria-modal="true"
      >
        <div class="h-64 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center relative">
          <img
            src={selectedRecipe.image}
            alt={selectedRecipe.title}
            class="w-full h-full object-cover"
            />
          <button 
            on:click={closeModal}
            class="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div class="p-6">
          <h2 class="text-3xl font-bold text-gray-800 mb-2">{selectedRecipe.title}</h2>
          <div class="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span class="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-semibold">
              {selectedRecipe.category}
            </span>
            <span class="px-3 py-1 rounded-full font-semibold {selectedRecipe.difficulty === 'Mudah' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}">
              {selectedRecipe.difficulty}
            </span>
          </div>
          
          <div class="flex gap-6 mb-6">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <div class="text-sm text-gray-500">Persiapan</div>
                <div class="font-semibold">{selectedRecipe.prepTime} menit</div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <div class="text-sm text-gray-500">Memasak</div>
                <div class="font-semibold">{selectedRecipe.cookTime} menit</div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <div>
                <div class="text-sm text-gray-500">Porsi</div>
                <div class="font-semibold">{selectedRecipe.servings} orang</div>
              </div>
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="text-xl font-bold text-gray-800 mb-3">Informasi Gizi</h3>
            <div class="grid grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
              <div class="text-center">
                <div class="text-2xl font-bold text-orange-600">{selectedRecipe.nutrition.calories}</div>
                <div class="text-sm text-gray-600">Kalori</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-600">{selectedRecipe.nutrition.protein}g</div>
                <div class="text-sm text-gray-600">Protein</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-amber-600">{selectedRecipe.nutrition.carbs}g</div>
                <div class="text-sm text-gray-600">Karbohidrat</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-red-600">{selectedRecipe.nutrition.fat}g</div>
                <div class="text-sm text-gray-600">Lemak</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-green-600">{selectedRecipe.nutrition.fiber}g</div>
                <div class="text-sm text-gray-600">Serat</div>
              </div>
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="text-xl font-bold text-gray-800 mb-3">Bahan-bahan</h3>
            <div class="space-y-2">
              {#each selectedRecipe.ingredients as ing}
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span class="font-semibold text-gray-800">{ing.name}</span>
                  <span class="text-gray-600">{ing.amount} {ing.unit}</span>
                  <span class="ml-auto text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">{ing.category}</span>
                </div>
              {/each}
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="text-xl font-bold text-gray-800 mb-3">Langkah-langkah</h3>
            <div class="space-y-3">
              {#each selectedRecipe.steps as step, idx}
                <div class="flex gap-4">
                  <div class="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <p class="text-gray-700 pt-1">{step}</p>
                </div>
              {/each}
            </div>
          </div>
          
          <div class="flex flex-wrap gap-2">
            {#each selectedRecipe.tags as tag}
              <span class="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold">
                #{tag}
              </span>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  }
</style>