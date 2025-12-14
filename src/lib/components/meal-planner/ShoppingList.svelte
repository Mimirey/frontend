<script>
	import { shoppingList } from "$lib/stores/mealPlan";

    let checkedItems= new Set();

    const toggleItem= (name)=>{
        if (checkedItems.has(name)) {
            checkedItems.delete(name);
        } else{
            checkedItems.add(name);
        }
        checkedItems= checkedItems;
    };

    const exportList= ()=>{
        const text= $shoppingList
        .map(item=> `${item.name} - ${item.amount} ${item.unit}`)
        .join ('\n');

        const blob= new Blob([text], {type: 'text/plain'});
        const url= URL.createObjectURL(blob);
        const link= document.createElement('a');
        link.href= url;
        link.download= 'shopping-list.txt';
        link.click();
        URL.revokeObjectURL(url);
    };

    const groupedList = $shoppingList.reduce((acc, item)=>{
        if (!acc[item.category]) {
            acc[item.category]= [];
        }
        acc[item.category].push(item);
        return acc;
    }, {});
</script>

<div class="bg-white rounded-xl shadow-lg p-6">
  <div class="flex items-center justify-between mb-6">
    <h3 class="text-2xl font-bold text-gray-800">🛒 Daftar Belanja</h3>
    <button
      on:click={exportList}
      class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
    >
      📥 Export
    </button>
  </div>

  {#if $shoppingList.length > 0}
    <div class="space-y-6">
      {#each Object.entries(groupedList) as [category, items]}
        <div>
          <h4 class="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              {category}
            </span>
          </h4>
          
          <div class="space-y-2">
            {#each items as item}
              <label class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={checkedItems.has(item.name)}
                  on:change={() => toggleItem(item.name)}
                  class="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                />
                <span class="flex-1 {checkedItems.has(item.name) ? 'line-through text-gray-400' : 'text-gray-700'}">
                  {item.name}
                </span>
                <span class="font-medium text-gray-600">
                  {item.amount.toFixed(0)} {item.unit}
                </span>
              </label>
            {/each}
          </div>
        </div>
      {/each}
    </div>

    <div class="mt-6 p-4 bg-green-50 rounded-lg">
      <p class="text-sm text-green-800">
        ✓ Total {$shoppingList.length} item | 
        ✅ {checkedItems.size} sudah dicentang
      </p>
    </div>
  {:else}
    <div class="text-center py-12 text-gray-400">
      <p class="text-6xl mb-4">🛒</p>
      <p class="text-lg">Daftar belanja kosong</p>
      <p class="text-sm">Tambahkan menu ke meal plan untuk membuat daftar belanja</p>
    </div>
  {/if}
</div>
