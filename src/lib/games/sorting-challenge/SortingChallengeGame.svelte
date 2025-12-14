<script>
	import { onDestroy, onMount } from "svelte";
	import { sortingStore, stast } from "./gameStore";
	import { categories, difficultyLevels } from "$lib/data/sortingData";
	import FallingItem from "./components/FallingItem.svelte";
	import CategoryBasket from "./components/CategoryBasket.svelte";
	import ScoreBoard from "./components/ScoreBoard.svelte";
	import GameOverModal from "./components/GameOverModal.svelte";
	import { preventDefault } from "svelte/legacy";

    let showInstructions= true;
    let showPauseModal= false;

    $:({
        fallingItems,
        score,
        lives,
        combo,
        level, 
        isGameOver,
        isPaused,
        feedback
    }= $sortingStore);

    function handleSort(itemId, categoryId) {
        sortingStore.sortItem(itemId,categoryId);
    }

    function handlePause() {
        sortingStore.pause();
        showPauseModal= true;
    }

    function handleResume(){
        showPauseModal= false;
        sortingStore.resume();
    }

    function handleRestart() {
        showInstructions= false;
        showPauseModal=false;
        sortingStore.restart();
    }

    function startGame() {
        showInstructions=false;
        sortingStore.startGame();
    }

    function handleExit() {
        window.location.href= '/gameArena'
    }

    onMount(()=>{
        document.addEventListener('dragover', (e)=> e,preventDefault());
        document.addEventListener('drop', (e)=> e.preventDefault());
    });

    onDestroy(()=>{
        sortingStore.cleanup();
    })

</script>


<div class="game-wrapper">
  <!-- Instructions Modal -->
  {#if showInstructions}
    <div class="modal modal-open">
      <div class="modal-box max-w-2xl">
        <h2 class="text-3xl font-bold mb-6 text-center">
          🎯 Sorting Challenge
        </h2>

        <div class="instructions-content">
          <div class="instruction-section">
            <h3 class="font-bold text-lg mb-3">📋 Cara Main</h3>
            <ol class="list-decimal list-inside space-y-2">
              <li>Pangan akan jatuh dari atas</li>
              <li><strong>Drag & drop</strong> item ke basket kategori yang benar</li>
              <li>Jangan sampai item jatuh ke bawah!</li>
              <li>Salah sort atau item jatuh = kehilangan nyawa ❤️</li>
              <li>Game over kalau nyawa habis</li>
            </ol>
          </div>

          <div class="instruction-section">
            <h3 class="font-bold text-lg mb-3">🎯 Kategori</h3>
            <div class="categories-preview">
              {#each categories as cat}
                <div class="category-preview" style="background: {cat.color}30; border-color: {cat.color};">
                  <span class="preview-emoji">{cat.emoji}</span>
                  <span class="preview-name">{cat.nama}</span>
                </div>
              {/each}
            </div>
          </div>

          <div class="instruction-section">
            <h3 class="font-bold text-lg mb-3">⚡ Tips</h3>
            <ul class="list-disc list-inside space-y-2">
              <li><strong>Kombo:</strong> Sort berturut-turut tanpa salah untuk bonus poin!</li>
              <li><strong>Prioritas:</strong> Tangani item yang paling dekat bawah dulu</li>
              <li><strong>Speed:</strong> Game makin cepat setiap naik level</li>
            </ul>
          </div>

          <div class="alert alert-warning mt-4">
            <span>⚠️ <strong>Perhatian:</strong> Kamu punya 3 nyawa. Gunakan dengan bijak!</span>
          </div>
        </div>

        <div class="modal-action justify-center">
          <button class="btn btn-primary btn-lg" on:click={startGame}>
            🚀 Mulai Game!
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Pause Modal -->
  {#if showPauseModal && !isGameOver}
    <div class="modal modal-open">
      <div class="modal-box">
        <h3 class="font-bold text-2xl mb-4 text-center">⏸️ Pause</h3>
        <p class="text-center mb-6">Game dijeda. Siap lanjut?</p>

        <div class="stats-preview">
          <div class="stat-item">
            <span class="stat-label">Score</span>
            <span class="stat-value">{score}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Level</span>
            <span class="stat-value">{level}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Nyawa</span>
            <span class="stat-value">{'❤️'.repeat(lives)}</span>
          </div>
        </div>

        <div class="modal-action justify-center gap-4">
          <button class="btn btn-primary" on:click={handleResume}>
            ▶️ Lanjut
          </button>
          <button class="btn btn-outline" on:click={handleRestart}>
            🔄 Restart
          </button>
          <button class="btn btn-ghost" on:click={handleExit}>
            ← Exit
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Game Over Modal -->
  <GameOverModal
    show={isGameOver}
    stats={globalThis.$stats}
    onRestart={handleRestart}
    onExit={handleExit}
  />

  <!-- Main Game -->
  {#if !showInstructions}
    <div class="game-container">
      <!-- ScoreBoard -->
      <ScoreBoard
        {score}
        {lives}
        {combo}
        {level}
        {isPaused}
        onPause={handlePause}
        onResume={handleResume}
      />

      <!-- Game Area -->
      <div class="game-area">
        <!-- Falling Items -->
        <div class="items-container">
          {#each fallingItems as item (item.id)}
            {#if item.active}
              <FallingItem
                {item}
                onSort={handleSort}
              />
            {/if}
          {/each}
        </div>

        <!-- Feedback Overlay -->
        {#if feedback}
          <div class="feedback-overlay {feedback.type}">
            <div class="feedback-message">
              {#if feedback.type === 'correct'}
                <div class="feedback-icon">✅</div>
                <div class="feedback-text">{feedback.message}</div>
                {#if feedback.combo > 1}
                  <div class="feedback-combo">🔥 Kombo x{feedback.combo}!</div>
                {/if}
              {:else}
                <div class="feedback-icon">❌</div>
                <div class="feedback-text">{feedback.message}</div>
              {/if}
            </div>
          </div>
        {/if}

        <!-- Warning Line (80% height) -->
        <div class="warning-line">
          <div class="warning-text">⚠️ DANGER ZONE ⚠️</div>
        </div>
      </div>

      <!-- Category Baskets -->
      <div class="baskets-container">
        {#each categories as category (category.id)}
          <CategoryBasket
            {category}
            onDrop={handleSort}
          />
        {/each}
      </div>

      <!-- Level indicator -->
      <div class="level-indicator">
        <span class="level-text">Level {level}</span>
        {#if level > 1}
          <span class="level-speed">Speed: {level}x</span>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .game-wrapper {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
  }

  /* Instructions */
  .instructions-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    text-align: left;
  }

  .instruction-section {
    background: #f9fafb;
    padding: 20px;
    border-radius: 12px;
  }

  .categories-preview {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-top: 10px;
  }

  .category-preview {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px;
    border: 3px solid;
    border-radius: 12px;
    font-weight: 600;
  }

  .preview-emoji {
    font-size: 32px;
  }

  .preview-name {
    font-size: 16px;
  }

  /* Pause Modal */
  .stats-preview {
    display: flex;
    justify-content: space-around;
    padding: 20px;
    background: #f9fafb;
    border-radius: 12px;
    margin-bottom: 20px;
  }

  .stats-preview .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .stats-preview .stat-label {
    font-size: 12px;
    color: #666;
    font-weight: 600;
  }

  .stats-preview .stat-value {
    font-size: 24px;
    font-weight: 700;
    color: #333;
  }

  /* Main Game */
  .game-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .game-area {
    flex: 1;
    position: relative;
    background: linear-gradient(180deg, 
      rgba(135, 206, 235, 0.3) 0%, 
      rgba(144, 238, 144, 0.2) 50%,
      rgba(255, 200, 200, 0.4) 100%
    );
    overflow: hidden;
  }

  .items-container {
    position: absolute;
    inset: 0;
  }

  /* Feedback Overlay */
  .feedback-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 500;
    animation: feedbackPop 0.5s ease;
    pointer-events: none;
  }

  @keyframes feedbackPop {
    0% {
      transform: translate(-50%, -50%) scale(0.5);
      opacity: 0;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }

  .feedback-message {
    background: white;
    padding: 30px 40px;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    text-align: center;
  }

  .feedback-overlay.correct .feedback-message {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
  }

  .feedback-overlay.wrong .feedback-message {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
  }

  .feedback-icon {
    font-size: 60px;
    margin-bottom: 10px;
  }

  .feedback-text {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .feedback-combo {
    font-size: 18px;
    font-weight: 600;
    animation: pulse 0.3s infinite;
  }

  /* Warning Line */
  .warning-line {
    position: absolute;
    bottom: 20%;
    left: 0;
    right: 0;
    height: 3px;
    background: repeating-linear-gradient(
      90deg,
      #ef4444,
      #ef4444 20px,
      transparent 20px,
      transparent 40px
    );
    display: flex;
    align-items: center;
    justify-content: center;
    animation: warningBlink 1s infinite;
  }

  @keyframes warningBlink {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }

  .warning-text {
    background: #ef4444;
    color: white;
    padding: 4px 16px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.5);
  }

  /* Baskets */
  .baskets-container {
    display: flex;
    gap: 15px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  }

  /* Level Indicator */
  .level-indicator {
    position: fixed;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    color: white;
    padding: 15px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 400;
  }

  .level-text {
    display: block;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .level-speed {
    display: block;
    font-size: 12px;
    opacity: 0.8;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .baskets-container {
      flex-wrap: wrap;
      gap: 10px;
      padding: 15px;
    }

    .categories-preview {
      grid-template-columns: 1fr;
    }

    .level-indicator {
      top: 80px;
      right: 10px;
      padding: 10px;
    }

    .level-text {
      font-size: 16px;
    }

    .warning-text {
      font-size: 10px;
      padding: 3px 12px;
    }
  }

  /* Animations */
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
</style>