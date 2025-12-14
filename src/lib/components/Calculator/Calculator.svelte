<script>
	import { foodData } from "$lib/data/foodCalcData";
	import ResultCard from "./ResultCard.svelte";

// State
  let selectedFoodId = foodData[0].id; // Default ke Terigu
  let inputAmount = 100; // Default ke 100 gram
  let results = [];

  // Logic inti
  function calculateSubstitution() {
    results = []; // Reset hasil

    const originalFood = foodData.find(f => f.id === selectedFoodId);
    if (!originalFood || !originalFood.substitutes) return;

    // Data pangan asli untuk perbandingan
    const originalNutrition = originalFood.nutrition;
    const originalAmount = inputAmount;

    // Hitung substitusi untuk setiap alternatif
    originalFood.substitutes.forEach(substitute => {
      const altFoodData = foodData.find(f => f.id === substitute.id);
      if (altFoodData) {
        // 1. Hitung Jumlah yang Dibutuhkan (Conversion)
        const requiredAmount = originalAmount * substitute.ratio;

        // 2. Hitung Estimasi Gizi
        // Asumsi perbandingan gizi bersifat linear berdasarkan jumlah yang dibutuhkan.
        const nutritionRatio = requiredAmount / 100; // Karena nutrisi dalam data per 100g

        const newNutrition = {
          carbs: altFoodData.nutrition.carbs * nutritionRatio,
          protein: altFoodData.nutrition.protein * nutritionRatio,
          fiber: altFoodData.nutrition.fiber * nutritionRatio,
        };

        results.push({
          original: originalFood.name,
          originalAmount,
          substituteName: substitute.name,
          requiredAmount,
          notes: substitute.notes,
          originalNutrition,
          newNutrition,
        });
      }
    });
  }

  // Panggil saat state berubah
  $: calculateSubstitution(selectedFoodId, inputAmount);
</script>

<div class="card w-full bg-base-100 shadow-xl p-6">
    <h2 class="text-2xl font-bold mb-4">Kalkulator Substitusi Pangan</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="form-control">
            <label class="label">
                <span class="label-text">Pangan yang Ingin Diganti</span>
            </label>
            <select bind:value={selectedFoodId} class="select select-bordered w-full">
                {#each foodData.filter(f => f.substitutes) as food}
                    <option value={food.id}>{food.name}</option>
                {/each}
            </select>
        </div>

        <div class="form-control">
            <label class="label">
                <span class="label-text">Jumlah (Gram)</span>
            </label>
            <input 
                type="number" 
                bind:value={inputAmount} 
                min="1" 
                placeholder="cth: 100" 
                class="input input-bordered w-full"
            />
        </div>
    </div>

    {#if results.length > 0}
        <h3 class="text-xl font-semibold mt-6 mb-3">Hasil Alternatif Substitusi Lokal</h3>
        <div class="space-y-4">
            {#each results as result}
                <ResultCard {result} />
            {/each}
        </div>
    {:else}
        <p class="mt-6 text-gray-500">Pilih bahan pangan yang ingin Anda substitusi untuk melihat hasilnya.</p>
    {/if}
</div>