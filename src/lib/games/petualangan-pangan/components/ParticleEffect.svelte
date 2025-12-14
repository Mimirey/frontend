<script>
    export let particle;
    export let map;

    $: screenX = particle.x - map.offsetX;
    $: screenY = particle.y - map.offsetY;
</script>

<div
  class="particle"
  style="
    left: {screenX}px;
    top: {screenY}px;
    background: {particle.color};
    --vx: {particle.vx};
    --vy: {particle.vy};
  "
></div>

<style>
  .particle {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 150;
    animation: particleFloat 1s ease-out forwards;
    box-shadow: 0 0 10px currentColor;
  }

  @keyframes particleFloat {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(calc(var(--vx) * 50px), calc(var(--vy) * 50px)) scale(0);
      opacity: 0;
    }
  }
</style>