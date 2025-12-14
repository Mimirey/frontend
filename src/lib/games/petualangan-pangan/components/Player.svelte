<script>
    export let player;
    export let map;
    export let playerImage = '/images/characters/mascots.jpg'; // Default image

    $: screenX = player.x - map.offsetX;
    $: screenY = player.y - map.offsetY;
    $: directionClass = `facing-${player.direction}`;
    $: isImagePlayer = playerImage && playerImage.length > 0;
</script>

<div
  class="player {directionClass}"
  class:use-image={isImagePlayer}
  style="
    left: {screenX}px;
    top: {screenY}px;
    width: {player.width}px;
    height: {player.height}px;
  "
>
  {#if isImagePlayer}
    <img src={playerImage} alt="Player" class="player-img" />
  {:else}
    <span class="player-emoji">🧑</span>
  {/if}
</div>

<style>
  .player {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #FFD700;
    border-radius: 50%;
    border: 3px solid #FFA500;
    transition: all 0.05s linear;
    z-index: 100;
    box-shadow: 
      0 4px 10px rgba(0, 0, 0, 0.3),
      0 0 20px rgba(255, 215, 0, 0.4);
    pointer-events: none;
    animation: shadowPulse 2s infinite;
  }

  .player.use-image {
    background: transparent;
    border: none;
    box-shadow: none;
  }

  .player-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.05s linear;
  }

  .player-emoji {
    font-size: 30px;
    user-select: none;
  }

  /* Direction animations */
  .player.facing-right .player-img {
    transform: scaleX(1);
  }

  .player.facing-left .player-img {
    transform: scaleX(-1);
  }

  .player.facing-up .player-img {
    /* Bisa tambahkan rotasi atau sprite yang beda */
  }

  .player.facing-down .player-img {
    /* Bisa tambahkan rotasi atau sprite yang beda */
  }

  /* Walking animation */
  @keyframes walk {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-3px);
    }
  }

  /* Add pulsing shadow */
  @keyframes shadowPulse {
    0%, 100% {
      box-shadow: 
        0 4px 10px rgba(0, 0, 0, 0.3),
        0 0 20px rgba(255, 215, 0, 0.4);
    }
    50% {
      box-shadow: 
        0 4px 10px rgba(0, 0, 0, 0.3),
        0 0 30px rgba(255, 215, 0, 0.6);
    }
  }
</style>