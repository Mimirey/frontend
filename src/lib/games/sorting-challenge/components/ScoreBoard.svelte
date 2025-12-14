<script>
    export let score=0;
    export let lives= 3;
    export let combo=0;
    export let level=1;
    export let isPaused=false;

    export let onPause=()=>{};
    export let onResume=()=>{};
</script>

<div class="scoreboard">
  <div class="score-section">
    <div class="stat-item highlight">
      <span class="stat-label">Score</span>
      <span class="stat-value">{score}</span>
    </div>

    <div class="stat-item">
      <span class="stat-label">Level</span>
      <span class="stat-value">{level}</span>
    </div>
  </div>

  <div class="center-section">
    {#if combo > 1}
      <div class="combo-display">
        <span class="combo-icon">🔥</span>
        <span class="combo-text">KOMBO x{combo}</span>
      </div>
    {/if}
  </div>

  <div class="right-section">
    <div class="lives-display">
      <span class="lives-label">Nyawa:</span>
      <div class="hearts">
        {#each Array(3) as _, i}
          <span class="heart" class:lost={i >= lives}>
            {i < lives ? '❤️' : '🖤'}
          </span>
        {/each}
      </div>
    </div>

    <button class="btn-pause" on:click={isPaused ? onResume : onPause}>
      {isPaused ? '▶️' : '⏸️'}
    </button>
  </div>
</div>

<style>
  .scoreboard {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 20px 20px;
  }

  .score-section,
  .right-section {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    min-width: 80px;
  }

  .stat-item.highlight {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 10px 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  .stat-label {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    opacity: 0.8;
  }

  .stat-value {
    font-size: 28px;
    font-weight: 700;
    line-height: 1;
  }

  .center-section {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .combo-display {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    border-radius: 30px;
    box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
    animation: comboScale 0.3s ease;
  }

  @keyframes comboScale {
    0% { transform: scale(0.9); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }

  .combo-icon {
    font-size: 24px;
    animation: pulse 0.5s infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }

  .combo-text {
    font-size: 18px;
    font-weight: 700;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .lives-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .lives-label {
    font-size: 12px;
    font-weight: 600;
    color: #666;
  }

  .hearts {
    display: flex;
    gap: 4px;
  }

  .heart {
    font-size: 24px;
    transition: all 0.3s;
  }

  .heart.lost {
    filter: grayscale(1);
    opacity: 0.3;
  }

  .btn-pause {
    width: 50px;
    height: 50px;
    border: none;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    font-size: 20px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  .btn-pause:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.6);
  }

  .btn-pause:active {
    transform: scale(0.95);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .scoreboard {
      flex-wrap: wrap;
      gap: 15px;
      padding: 15px;
    }

    .center-section {
      order: -1;
      width: 100%;
    }

    .stat-value {
      font-size: 24px;
    }
  }
</style>