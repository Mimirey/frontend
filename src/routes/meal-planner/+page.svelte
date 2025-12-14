<script>
	import CustomMealForm from "$lib/components/meal-planner/CustomMealForm.svelte";
	import MealCard from "$lib/components/meal-planner/MealCard.svelte";
	// import NutritionSummary from "$lib/components/meal-planner/NutritionSummary.svelte";
	import RecipeSelector from "$lib/components/meal-planner/RecipeSelector.svelte";
	import ShoppingList from "$lib/components/meal-planner/ShoppingList.svelte";
	import { mealPlanService } from "$lib/services/mealPlan.service";
	import { customRecipes } from "$lib/stores/customRecipes";
	import { mealPlan } from "$lib/stores/mealPlan";
	import { onMount } from "svelte";

    const days=['monday', 'tuesday','wednesday', 'thursday', 'friday','saturday','sunday'];
    const dayLabels={
        monday: 'Senin',
        tuesday: 'Selasa', 
        wednesday: 'Rabu',
        thursday: 'Kamis',
        friday: 'Jumat',
        saturday: 'Sabtu',
        sunday: 'Minggu'
    };

    const mealTypes=['breakfast','lunch','dinner'];
    let showRecipeSelector= false;
    let showCustomForm= false;
    let selectedDay='';
    let selectedMealType='';
    let activeTab= 'planner';

    onMount(()=>{
        mealPlan.load();
        customRecipes.load();
    });

    const openRecipeSelector =(day, mealType)=>{
        selectedDay= day;
        selectedMealType= mealType;
        showRecipeSelector= true;
    };

    const handleRecipeSelect= (recipe)=>{
        mealPlan.addMeal(selectedDay,selectedMealType,recipe);
        showRecipeSelector= false;
    };

    const handleRemoveMeal =(day, mealType)=>{
        if (confirm('Hapus menu ini?')) {
            mealPlan.removeMeal(day,mealType);
        }
    };

    const handleClearWeek= ()=>{
        if (confirm('Hapus semua menu minggu ini?')) {
            mealPlan.clearWeek();
        }
    };

    const handleExport= ()=>{
        let currentPlan;
        mealPlan.subscribe(plan=> currentPlan= plan);
        mealPlanService.export(currentPlan);
    };

    const handleOpenCustomForm=()=>{
        showRecipeSelector= false;
        showCustomForm= true;
    };

    const handleCustomMealSave= (customMeal)=>{
        customRecipes.add(customMeal);
        mealPlan.addMeal(selectedDay, selectedMealType, customMeal);
        showCustomForm= false;
    };
</script>

<svelte:head>
  <title>Meal Planner - Edukasi Diversifikasi Pangan</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-8 px-4">
  <div class="container mx-auto max-w-7xl">
    
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">🍽️ Meal Planner</h1>
      <p class="text-gray-600">Rencanakan menu mingguan dengan pangan lokal nusantara</p>
      {#if $customRecipes.length > 0}
        <p class="text-sm text-purple-600 mt-2">
          💜 Kamu punya {$customRecipes.length} resep custom
        </p>
      {/if}
    </div>

    <!-- Tabs -->
    <div class="flex gap-2 mb-6 bg-white rounded-lg p-2 shadow-md">
      <button
        on:click={() => activeTab = 'planner'}
        class="flex-1 px-6 py-3 rounded-lg font-medium transition-all {activeTab === 'planner' 
          ? 'bg-green-600 text-white shadow-md' 
          : 'text-gray-600 hover:bg-gray-100'}"
      >
        📅 Meal Plan
      </button>
      <button
        on:click={() => activeTab = 'shopping'}
        class="flex-1 px-6 py-3 rounded-lg font-medium transition-all {activeTab === 'shopping' 
          ? 'bg-green-600 text-white shadow-md' 
          : 'text-gray-600 hover:bg-gray-100'}"
      >
        🛒 Belanja
      </button>
      <!-- <button
        on:click={() => activeTab = 'nutrition'}
        class="flex-1 px-6 py-3 rounded-lg font-medium transition-all {activeTab === 'nutrition' 
          ? 'bg-green-600 text-white shadow-md' 
          : 'text-gray-600 hover:bg-gray-100'}"
      >
        📊 Nutrisi
      </button> -->
    </div>

    <!-- Meal Planner Tab -->
    {#if activeTab === 'planner'}
      <div class="space-y-4">
        <!-- Actions -->
        <div class="flex gap-3 justify-end">
          <button
            on:click={handleExport}
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            📥 Export Plan
          </button>
          <button
            on:click={handleClearWeek}
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            🗑️ Reset Minggu
          </button>
        </div>

        <!-- Weekly Calendar -->
        <div class="space-y-4">
          {#each days as day}
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span class="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                  {dayLabels[day]}
                </span>
                <button
                  on:click={() => mealPlan.clearDay(day)}
                  class="ml-auto text-sm text-red-600 hover:text-red-700"
                >
                  Hapus Hari
                </button>
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                {#each mealTypes as mealType}
                  <MealCard
                    meal={$mealPlan.currentWeek[day][mealType]}
                    {mealType}
                    {day}
                    onClick={() => openRecipeSelector(day, mealType)}
                    onRemove={() => handleRemoveMeal(day, mealType)}
                  />
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Shopping List Tab -->
    {#if activeTab === 'shopping'}
      <ShoppingList />
    {/if}

    <!-- Nutrition Tab -->
    <!-- {#if activeTab === 'nutrition'}
      <NutritionSummary />
    {/if} -->

  </div>
</div>

<!-- Recipe Selector Modal -->
{#if showRecipeSelector}
  <RecipeSelector
    onSelect={handleRecipeSelect}
    onClose={() => showRecipeSelector = false}
    onAddCustom={handleOpenCustomForm}
  />
{/if}

<!-- Custom Meal Form Modal -->
{#if showCustomForm}
  <CustomMealForm
    onSave={handleCustomMealSave}
    onClose={() => showCustomForm = false}
  />
{/if}

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
</style>