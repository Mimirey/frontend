<script>
    export let player;
    export let items=[];
    export let map;

    const minimapWidth = 150;
    const minimapHeight=120;

    $: scaleX= minimapWidth/ map.width;
    $: scaleY= minimapHeight/map.height;

    $: playerX = player.x * scaleX;
    $: playerY = player.y * scaleY;
</script>

<div class="minimap-container">
  <div class="minimap" style="width: {minimapWidth}px; height: {minimapHeight}px;">
    <!-- Background -->
    <div class="minimap-bg"></div>
    
    <!-- Items -->
    {#each items as item (item.id)}
      {#if !item.collected}
        <div
          class="minimap-item"
          style="
            left: {item.x * scaleX}px;
            top: {item.y * scaleY}px;
          "
        ></div>
      {/if}
    {/each}
    
    <!-- Player -->
    <div
      class="minimap-player"
      style="
        left: {playerX}px;
        top: {playerY}px;
      "
    ></div>
    
    <!-- Viewport indicator -->
    <div
      class="minimap-viewport"
      style="
        left: {map.offsetX * scaleX}px;
        top: {map.offsetY * scaleY}px;
        width: {800 * scaleX}px;
        height: {600 * scaleY}px;
      "
    ></div>
  </div>
  
  <div class="minimap-label">🗺️ Peta</div>
</div>

<style>
  .minimap-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 500;
  }

  .minimap {
    position: relative;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border: 3px solid #667eea;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    overflow: hidden;
  }

  .minimap-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, #87CEEB 0%, #90EE90 60%, #8B7355 100%);
    opacity: 0.5;
  }

  .minimap-item {
    position: absolute;
    width: 4px;
    height: 4px;
    background: #fbbf24;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 4px #fbbf24;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.3);
      opacity: 0.7;
    }
  }

  .minimap-player {
    position: absolute;
    width: 6px;
    height: 6px;
    background: #ef4444;
    border: 2px solid white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 8px #ef4444;
    z-index: 10;
    }
    .minimap-viewport {
    position: absolute;
    border: 1px solid rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.1);
    pointer-events: none;
    }
    .minimap-label {
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    color: white;
    margin-top: 6px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
</style>

