<script>
    export let onSave= ()=>{};
    export let onClose= ()=>{};

    let formData={
        title:'',
        category: 'Sarapan',
        servings: 1,
        prepTime: 15,
        cookTime:15,
        image:'',
        nutrition:{
            calories: 0,
            protein:0,
            carbs:0,
            fat:0,
            fiber: 0
        }, ingredients: []
    };

    let newIngredient={name: '', amount: '', unit: 'gram', category: 'Lainnya'};

    const categories= ['Sarapan', 'Makan Siang', 'Makan Malam', 'Snack', 'Minuman'];
    const units = ['gram', 'ml', 'sdt', 'sdm', 'buah', 'potong', 'lembar', 'butir'];
    const ingredientCategories = ['Sayuran', 'Protein', 'Biji-bijian', 'Umbi-umbian', 'Bumbu', 'Dairy', 'Lainnya'];

    const addIngredient=()=>{
        if (newIngredient.name && newIngredient.amount) {
            formData.ingredients=[...formData.ingredients, {...newIngredient}];
            newIngredient={name: '', amount:'', unit: 'gram', category :'lainnya'};
        }
    };

    const removeIngredient=(index)=>{
        formData.ingredients= formData.ingredients.filter((_,i)=> i !== index);
    };

    const handleSubmit=()=>{
        if (!formData.title) {
            alert('Nama makanan harus diisi!');
            return;
        }
        const customRecipe ={
            ...formData,
            id:'custom_' + Date.now(),
            difficulty: 'Custom',
            tags: ['Custom Recipe', 'My Recipe'],
            image: formData.image, 
            isCustom: true,
            createdAt: new Date().toISOString()
        };
        onSave(customRecipe);
    };

    const useQuickPreset= (preset)=>{
        const presets={
            sarapan: { calories: 350, protein: 12, carbs: 45, fat: 10, fiber: 5 },
            makan: { calories: 600, protein: 25, carbs: 70, fat: 20, fiber: 8 },
            snack: { calories: 200, protein: 5, carbs: 30, fat: 8, fiber: 3 }
        }
        formData.nutrition= presets[preset];
    }

    
    
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
  <div class="bg-white rounded-xl max-w-2xl w-full my-8">
    <!-- Header -->
    <div class="p-6 border-b flex items-center justify-between sticky top-0 bg-white rounded-t-xl">
      <h3 class="text-2xl font-bold text-gray-800">➕ Tambah Makanan Custom</h3>
      <button on:click={onClose} class="text-gray-400 hover:text-gray-600 text-2xl">
        ✕
      </button>
    </div>

    <!-- Form -->
    <div class="p-6 space-y-6">
      
      <!-- Basic Info -->
      <div class="space-y-4">
        <h4 class="font-semibold text-gray-700 flex items-center gap-2">
          📝 Informasi Dasar
        </h4>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Nama Makanan *
          </label>
          <input
            type="text"
            bind:value={formData.title}
            placeholder="e.g. Nasi Goreng Rumahan"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Kategori
            </label>
            <select
              bind:value={formData.category}
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {#each categories as cat}
                <option value={cat}>{cat}</option>
              {/each}
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Porsi
            </label>
            <input
              type="number"
              bind:value={formData.servings}
              min="1"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Waktu Prep (menit)
            </label>
            <input
              type="number"
              bind:value={formData.prepTime}
              min="0"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Waktu Masak (menit)
            </label>
            <input
              type="number"
              bind:value={formData.cookTime}
              min="0"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            URL Gambar (opsional)
          </label>
          <input
            type="url"
            bind:value={formData.image}
            placeholder="https://example.com/image.jpg"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <!-- Nutrition -->
      <!-- <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h4 class="font-semibold text-gray-700 flex items-center gap-2">
            🥗 Informasi Nutrisi *
          </h4>
          <div class="flex gap-2">
            <button
              on:click={() => useQuickPreset('sarapan')}
              class="text-xs px-3 py-1 bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200"
            >
              Sarapan
            </button>
            <button
              on:click={() => useQuickPreset('makan')}
              class="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
            >
              Makan Berat
            </button>
            <button
              on:click={() => useQuickPreset('snack')}
              class="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full hover:bg-green-200"
            >
              Snack
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Kalori (kal)
            </label>
            <input
              type="number"
              bind:value={formData.nutrition.calories}
              min="0"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Protein (g)
            </label>
            <input
              type="number"
              bind:value={formData.nutrition.protein}
              min="0"
              step="0.1"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Karbohidrat (g)
            </label>
            <input
              type="number"
              bind:value={formData.nutrition.carbs}
              min="0"
              step="0.1"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Lemak (g)
            </label>
            <input
              type="number"
              bind:value={formData.nutrition.fat}
              min="0"
              step="0.1"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Serat (g)
            </label>
            <input
              type="number"
              bind:value={formData.nutrition.fiber}
              min="0"
              step="0.1"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div> -->

      <!-- Ingredients (Optional) -->
      <div class="space-y-4">
        <h4 class="font-semibold text-gray-700 flex items-center gap-2">
          🥕 Bahan-bahan (opsional)
        </h4>

        {#if formData.ingredients.length > 0}
          <div class="space-y-2 max-h-40 overflow-y-auto">
            {#each formData.ingredients as ingredient, i}
              <div class="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <span class="flex-1 text-sm text-gray-700">
                  {ingredient.name} - {ingredient.amount} {ingredient.unit}
                </span>
                <button
                  on:click={() => removeIngredient(i)}
                  class="text-red-500 hover:text-red-700 text-sm"
                >
                  ✕
                </button>
              </div>
            {/each}
          </div>
        {/if}

        <div class="grid grid-cols-12 gap-2">
          <input
            type="text"
            bind:value={newIngredient.name}
            placeholder="Nama bahan"
            class="col-span-5 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            bind:value={newIngredient.amount}
            placeholder="Jumlah"
            class="col-span-3 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <select
            bind:value={newIngredient.unit}
            class="col-span-3 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {#each units as unit}
              <option value={unit}>{unit}</option>
            {/each}
          </select>
          <button
            on:click={addIngredient}
            class="col-span-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-xl"
          >
            +
          </button>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <div class="p-6 border-t bg-gray-50 flex gap-3 justify-end rounded-b-xl">
      <button
        on:click={onClose}
        class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
      >
        Batal
      </button>
      <button
        on:click={handleSubmit}
        class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        💾 Simpan Makanan
      </button>
    </div>
  </div>
</div>
