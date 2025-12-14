<script>
    export let item;
    export let map;

    $: screenX= item.x - map.offsetX;
    $: screenY= item.y - map.offsetY;
    $: isVisible = !item.collected;
</script>
{#if isVisible}
  <div
    class="pangan-item"
    class:collected={item.collected}
    style="
      left: {screenX}px;
      top: {screenY}px;
      width: {item.width}px;
      height: {item.height}px;
    "
  >
    <img src={item.emoji} alt={item.nama} class="emoji-icon" />
    
    <!-- Shine effect -->
    <div class="shine"></div>
  </div>
{/if}

<style>
  .pangan-item {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 12px;
    box-shadow: 
      0 4px 12px rgba(0, 0, 0, 0.2),
      0 0 20px rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.2s;
    animation: float 2s ease-in-out infinite;
    z-index: 50;
    overflow: hidden;
  }

  .pangan-item.use-image {
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  .pangan-item:hover {
    transform: scale(1.15) translateY(-5px);
    box-shadow: 
      0 6px 16px rgba(0, 0, 0, 0.3),
      0 0 30px rgba(255, 255, 255, 0.7);
  }

  .emoji-icon {
    width: 1000px;
    height: 1000px;
    object-fit: contain;
  }

  .shine {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transform: rotate(45deg);
    animation: shine 3s infinite;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes shine {
    0% {
      left: -200%;
    }
    100% {
      left: 200%;
    }
  }

  .pangan-item.collected {
    animation: collect 0.5s forwards;
    pointer-events: none;
  }

  @keyframes collect {
    0% {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
    50% {
      transform: scale(1.5) rotate(180deg);
    }
    100% {
      transform: scale(0) rotate(360deg);
      opacity: 0;
    }
  }
</style>