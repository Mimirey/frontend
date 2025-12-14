<script>
  export let foods = [];
  export let selectedFood = null;
  export let onSelectFood = () => {};

  // Group foods by category
  $: groupedFoods = foods.reduce((acc, food) => {
    if (!acc[food.kategori]) {
      acc[food.kategori] = [];
    }
    acc[food.kategori].push(food);
    return acc;
  }, {});

  const categoryNames = {
    karbohidrat: '🍚 Karbohidrat',
    protein: '🍖 Protein',
    sayuran: '🥬 Sayuran',
    buah: '🍎 Buah'
  };
</script>

<div class="pantry">
  <h3 class="pantry-title">Dapur</h3>
  <p class="pantry-subtitle">Pilih atau tarik makanan ke piring</p>

  <div class="pantry-content">
    {#each Object.entries(groupedFoods) as [kategori, items]}
      <div class="category-group">
        <h4 class="category-title">{categoryNames[kategori]}</h4>
        <div class="foods-grid">
          {#each items as food (food.id)}
            <div on:dragstart={() => onSelectFood(food)}>
              <slot name="food-item" {food} isSelected={selectedFood?.id === food.id}>
                <!-- Default fallback jika slot tidak diisi -->
                <div class="simple-food-item">
                  {food.nama}
                </div>
              </slot>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .pantry {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .pantry-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }

  .pantry-subtitle {
    color: #6b7280;
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
  }

  .pantry-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .category-group {
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 1rem;
  }

  .category-group:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .category-title {
    font-weight: 600;
    margin-bottom: 0.75rem;
    font-size: 1rem;
  }

  .foods-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.75rem;
  }

  .simple-food-item {
    padding: 0.5rem;
    background: #f3f4f6;
    border-radius: 0.5rem;
    text-align: center;
  }
</style>