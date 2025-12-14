<script>
  export let food;
  export let onSelect = () => {};
  export let isSelected = false;
  export let size = 'normal'; // 'normal' atau 'small'
</script>

<div
  class="food-item {size} {isSelected ? 'selected' : ''}"
  class:local={food.isLocal}
  on:click={() => onSelect(food)}
  on:keypress={(e) => e.key === 'Enter' && onSelect(food)}
  role="button"
  tabindex="0"
  draggable="true"
>
  <div class="food-image">
    <img src={food.gambar} alt={food.nama} />
    {#if food.isLocal}
      <div class="badge badge-success badge-sm">Lokal 🌾</div>
    {/if}
  </div>
  <div class="food-info">
    <p class="food-name">{food.nama}</p>
    <p class="food-portion">{food.porsi}g</p>
  </div>
</div>

<style>
  .food-item {
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 0.75rem;
    cursor: grab;
    transition: all 0.2s;
    user-select: none;
  }

  .food-item:hover {
    border-color: #3b82f6;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .food-item.selected {
    border-color: #3b82f6;
    background: #eff6ff;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }

  .food-item.local {
    border-color: #10b981;
  }

  .food-item:active {
    cursor: grabbing;
  }

  .food-image {
    position: relative;
    width: 100%;
    height: 100%;
    margin-bottom: 0.5rem;
  }

  .food-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.375rem;
  }

  .badge {
    position: absolute;
    top: 4px;
    right: 4px;
  }

  .food-info {
    text-align: center;
  }

  .food-name {
    font-weight: 600;
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
  }

  .food-portion {
    font-size: 0.75rem;
    color: #6b7280;
  }

  .food-item.small {
    padding: 0.5rem;
  }

  .food-item.small .food-image {
    height: 50px;
  }

  .food-item.small .food-name {
    font-size: 0.75rem;
  }
</style>