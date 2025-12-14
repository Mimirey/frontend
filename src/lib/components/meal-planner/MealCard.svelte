<script>
    export let meal = null;
    export let mealType= '';
    export let day= '';
    export let onRemove= ()=> {};
    export let onClick= ()=>{};

    const mealTypeLabels={
        breakfast: 'Sarapan',
        lunch: 'Makan Siang',
        dinner: 'Makan Malam',
        snacks: 'Camilan'
    };

    const mealTypeEmojis={
        breakfast: '🌅',
        lunch: '☀️',
        dinner: '🌙',
        snacks: '🍪'
    }
</script>

<div class="bg-white rounded-lg border-2 border-gray-200 hover:border-green-400 transition-all p-4">
  <div class="flex items-center justify-between mb-2">
    <h4 class="font-semibold text-gray-700 flex items-center gap-2">
      <span>{mealTypeEmojis[mealType]}</span>
      {mealTypeLabels[mealType]}
    </h4>
  </div>

  {#if meal}
    <div class="space-y-2">
      <div class="relative group">
        <img 
          src={meal.image} 
          alt={meal.title}
          class="w-full h-32 object-cover rounded-lg"
          on:error={(e) => e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'}
        />
        <button
          on:click={onRemove}
          class="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          title="Hapus"
        >
          ✕
        </button>
      </div>
      
      <h5 class="font-medium text-gray-800">{meal.title}</h5>
      
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <span>⏱️ {meal.prepTime + meal.cookTime} menit</span>
        <span>•</span>
        <span>🍽️ {meal.servings} porsi</span>
      </div>

      <div class="grid grid-cols-2 gap-1 text-xs text-gray-600">
        <div>🔥 {meal.nutrition.calories} kal</div>
        <div>🥩 {meal.nutrition.protein}g protein</div>
        <div>🍚 {meal.nutrition.carbs}g karbo</div>
        <div>🌾 {meal.nutrition.fiber}g serat</div>
      </div>
    </div>
  {:else}
    <button
      on:click={onClick}
      class="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-green-600"
    >
      <span class="text-3xl">+</span>
      <span class="text-sm">Tambah Menu</span>
    </button>
  {/if}
</div>