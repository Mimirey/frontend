<script>
    export let category;
    export let onDrop=()=>{};

    let isDragOver= false;

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect='move';
        isDragOver= true;

    }

    function handleDragLeave() {
        isDragOver=false;
    }

    function handleDrop(e) {
        e.preventDefault();
        isDragOver=false;

        const itemId= parseInt(e.dataTransfer.getData('itemId'));
        onDrop(itemId, category.id);
    }
</script>

<div
  class="category-basket"
  class:drag-over={isDragOver}
  style="
    background: {category.color}30;
    border-color: {category.color};
  "
  on:dragover={handleDragOver}
  on:dragleave={handleDragLeave}
  on:drop={handleDrop}
  role="region"
>
  <div class="basket-icon">{category.emoji}</div>
  <div class="basket-name">{category.nama}</div>
  <div class="basket-description">{category.description}</div>
  
  {#if isDragOver}
    <div class="drop-hint">Lepas di sini! 👇</div>
  {/if}
</div>

<style>
  .category-basket {
    position: relative;
    flex: 1;
    min-width: 150px;
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: white;
    border: 4px dashed;
    border-radius: 20px;
    transition: all 0.2s;
    overflow: hidden;
  }

  .category-basket:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  .category-basket.drag-over {
    border-style: solid;
    transform: scale(1.05);
    box-shadow: 
      0 8px 24px rgba(0, 0, 0, 0.3),
      inset 0 0 30px rgba(255, 255, 255, 0.5);
  }

  .basket-icon {
    font-size: 48px;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
  }

  .basket-name {
    font-size: 18px;
    font-weight: 700;
    color: #333;
  }

  .basket-description {
    font-size: 12px;
    color: #666;
    text-align: center;
    padding: 0 10px;
  }

  .drop-hint {
    position: absolute;
    bottom: 10px;
    font-size: 14px;
    font-weight: 700;
    color: #10b981;
    animation: bounce 0.5s infinite;
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }
</style>
