<script>
	import { nutritionGoals } from "$lib/data/nutritionGoals";
	import { weeklyNutrition } from "$lib/stores/mealPlan";
	import { calculatePercentage, getNutritionColor } from "$lib/utils/nutrition";
  

    let selectedProfile = 'default';

    $: goals = selectedProfile ==='default'
        ? nutritionGoals.default
        : nutritionGoals.profiles[selectedProfile];
    $: daily= $weeklyNutrition.daily;

    const nutrients=[
        { key: 'calories', label: 'Kalori', unit: 'kal', color: 'bg-red-500' },
        { key: 'protein', label: 'Protein', unit: 'g', color: 'bg-blue-500' },
        { key: 'carbs', label: 'Karbohidrat', unit: 'g', color: 'bg-yellow-500' },
        { key: 'fat', label: 'Lemak', unit: 'g', color: 'bg-purple-500' },
        { key: 'fiber', label: 'Serat', unit: 'g', color: 'bg-green-500' }
    ]
</script>

<div class="bg-white rounded-xl shadow-lg p-6">
  <div class="flex items-center justify-between mb-6">
    <h3 class="text-2xl font-bold text-gray-800">📊 Ringkasan Nutrisi</h3>
    
    <select 
      bind:value={selectedProfile}
      class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      <option value="default">Target Default</option>
      {#each Object.keys(nutritionGoals.profiles) as profile}
        <option value={profile}>{profile}</option>
      {/each}
    </select>
  </div>

  <div class="space-y-4">
    {#each nutrients as nutrient}
      {@const value = daily[nutrient.key]}
      {@const goal = goals[nutrient.key]}
      {@const percentage = calculatePercentage(value, goal)}
      
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="font-medium text-gray-700">{nutrient.label}</span>
          <span class="text-sm {getNutritionColor(percentage)}">
            {value} / {goal} {nutrient.unit} ({percentage}%)
          </span>
        </div>
        
        <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            class="{nutrient.color} h-full rounded-full transition-all duration-500"
            style="width: {Math.min(percentage, 100)}%"
          ></div>
        </div>
      </div>
    {/each}
  </div>

  <div class="mt-6 grid grid-cols-2 gap-4">
    <div class="bg-green-50 p-4 rounded-lg">
      <p class="text-sm text-green-800 font-medium mb-1">Rata-rata Harian</p>
      <p class="text-2xl font-bold text-green-600">{daily.calories} kal</p>
    </div>
    
    <div class="bg-blue-50 p-4 rounded-lg">
      <p class="text-sm text-blue-800 font-medium mb-1">Total Mingguan</p>
      <p class="text-2xl font-bold text-blue-600">{$weeklyNutrition.calories} kal</p>
    </div>
  </div>
</div>