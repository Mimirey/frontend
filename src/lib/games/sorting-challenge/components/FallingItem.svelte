<script>
    export let item;
    export let onSort= ()=>{}

    let isDragging=false;
    let dragTarget= null;

    function handleDragStart(e) {
        isDragging=true;
        e.dataTransfer.effectAllowed='move';
        e.dataTransfer.setData('itemId', item.id.toString());
    }

    function handleDragEnd(){
        isDragging= false;
    }

    function handleClick(){

    }
</script>

<div
  class="falling-item"
  class:dragging={isDragging}
  style="
    left: {item.x}%;
    top: {item.y}%;
    background-color: {item.color}20;
    border-color: {item.color};
  "
  draggable="true"
  on:dragstart={handleDragStart}
  on:dragend={handleDragEnd}
  on:click={handleClick}
  role="button"
  tabindex="0"
>
  <div class="item-emoji">{item.emoji}</div>
  <div class="item-name">{item.nama}</div>
</div>

<style>
  .falling-item {
    position: absolute;
    width: 80px;
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    background: white;
    border: 3px solid;
    border-radius: 16px;
    box-shadow: 
      0 4px 12px rgba(0, 0, 0, 0.2),
      0 0 20px rgba(255, 255, 255, 0.5);
    cursor: grab;
    transition: transform 0.1s, box-shadow 0.1s;
    user-select: none;
    z-index: 100;
    transform: translate(-50%, -50%);
  }

  .falling-item:hover {
    transform: translate(-50%, -50%) scale(1.1);
    box-shadow: 
      0 6px 16px rgba(0, 0, 0, 0.3),
      0 0 30px rgba(255, 255, 255, 0.7);
  }

  .falling-item.dragging {
    cursor: grabbing;
    opacity: 0.7;
    transform: translate(-50%, -50%) scale(1.15);
  }

  .item-emoji {
    font-size: 32px;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  }

  .item-name {
    font-size: 11px;
    font-weight: 600;
    color: #333;
    text-align: center;
    white-space: nowrap;
  }

  /* Animation */
  @keyframes spawn {
    from {
      transform: translate(-50%, -50%) scale(0) rotate(180deg);
      opacity: 0;
    }
    to {
      transform: translate(-50%, -50%) scale(1) rotate(0deg);
      opacity: 1;
    }
  }

  .falling-item {
    animation: spawn 0.3s ease-out;
  }
</style>