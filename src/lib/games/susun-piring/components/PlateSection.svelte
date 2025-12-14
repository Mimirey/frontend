<script>
  export let kategori; // 'karbohidrat', 'protein', 'sayuran', 'buah'
  export let foods = []; // Array makanan di section ini
  export let onDrop = () => {};
  export let onRemove = () => {};
  export let color = 'gray';
  export let position = 'top-left'; // 'top-left', 'top-right', 'bottom-left', 'bottom-right'


  let isDragOver = false;

  const categoryNames = {
    karbohidrat: 'Karbohidrat',
    protein: 'Protein',
    sayuran: 'Sayuran',
    buah: 'Buah'
  };

  const categoryEmojis = {
    karbohidrat: '🍚',
    protein: '🍖',
    sayuran: '🥬',
    buah: '🍎'
  };

  const colors = {
    karbohidrat: 'bg-amber-100 border-amber-300',
    protein: 'bg-rose-100 border-rose-300',
    sayuran: 'bg-green-100 border-green-300',
    buah: 'bg-purple-100 border-purple-300'
  };

  const roundedCorners={
    'top-left': 'rounded-tl-full',
    'top-right': 'rounded-tr-full',
    'bottom-left': 'rounded-bl-full',
    'bottom-right': 'rounded-br-full'
  }

  function handleDragOver(e) {
    e.preventDefault();
    isDragOver = true;
  }

  function handleDragLeave() {
    isDragOver = false;
  }

  function handleDrop(e) {
    e.preventDefault();
    isDragOver = false;
    onDrop(kategori);
  }
</script>

<div
  class="section-wrapper relative overflow-hidden {roundedCorners[position]}"
  on:dragover={handleDragOver}
  on:dragleave={handleDragLeave}
  on:drop={handleDrop}
  on:click={handleClick}
  on:keypress={(e) => e.key === 'Enter' && handleClick()}
  role="button"
  tabindex="0"
>
  <div
    class="section-content absolute inset-0 {colors[kategori]} border-2 flex items-center justify-center transition-all duration-200 cursor-pointer"
    class:drag-over={isDragOver}
  >
    {#if foods.length === 0}
      <!-- Empty state -->
      <div class="text-center">
        <div class="text-4xl mb-2">{categoryEmojis[kategori]}</div>
        <div class="text-sm font-bold">{categoryNames[kategori]}</div>
        <div class="text-xs text-gray-600 mt-1">Drop di sini</div>
      </div>
    {:else}
      <!-- Foods list -->
      <div class="foods-container p-2 max-h-full overflow-y-auto">
        <div class="text-center mb-2">
          <div class="text-2xl">{categoryEmojis[kategori]}</div>
          <div class="text-xs font-bold">{categoryNames[kategori]}</div>
        </div>
        <div class="space-y-1">
          {#each foods as food (food.id)}
            <div class="food-chip">
              <span class="text-xs">{food.nama}</span>
              <button
                class="btn-remove"
                on:click|stopPropagation={() => onRemove(food.id, kategori)}
                aria-label="Hapus {food.nama}"
              >
                ×
              </button>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .section-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .section-content {
    transition: all 0.2s;
  }

  .section-content:hover {
    filter: brightness(1.1);
    transform: scale(1.02);
  }

  .section-content.drag-over {
    filter: brightness(1.2);
    transform: scale(1.05);
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1);
  }

  .foods-container {
    width: 100%;
    max-width: 150px;
  }

  .food-chip {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.25rem;
    background: white;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  .btn-remove {
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 0.875rem;
    line-height: 1;
    flex-shrink: 0;
  }

  .btn-remove:hover {
    background: #dc2626;
  }
</style>