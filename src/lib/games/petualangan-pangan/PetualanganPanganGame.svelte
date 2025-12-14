<script>
	import { onDestroy, onMount } from "svelte";
	import { adventureStore, completedQuests, progress, unlockedAchievements } from "./gameStore";
	import GameMap from "./components/GameMap.svelte";
	import InfoModal from "./components/InfoModal.svelte";
	import QuestPanel from "./components/QuestPanel.svelte";
	import Minimap from "./components/Minimap.svelte";
	// import { formatTime } from "../shared/gameUtils";

    let gameMapComponent;
    let keysPressed= {};
    let showInstructions= true;
    let showVictory= false;
    let useImages= false; 


    $:({
        player,
        map,
        items,
        score,
        combo,
        selectedItem,
        showItemModal,
        showQuestPanel,
        elapsedTime,
        gameComplete,
        powerups,
    }= $adventureStore);

    $: formattedTime= formatTime(elapsedTime);

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    function handleKeyDown(e) {
        const gameKeys = ['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'];
        // keysPressed[e.key.toLowerCase()]=true;

        if (gameKeys.includes(e.key.toLowerCase())) {
        e.preventDefault(); // 👈 INI YANG PENTING - Stop browser scroll
        keysPressed[e.key.toLowerCase()] = true;
        }
    }

    function handleKeyUp(e) {
        const gameKeys = ['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'];
        // keysPressed[e.key.toLowerCase()]=false;

        if (gameKeys.includes(e.key.toLowerCase())) {
        e.preventDefault(); // 👈 Stop browser behavior
        keysPressed[e.key.toLowerCase()] = false;
        }

    }

    function gameLoop() {
        let dx=0;
        let dy=0;

        if (keysPressed['w']|| keysPressed['arrowup']) dy= -1;
        if (keysPressed['s']|| keysPressed['arrowdown']) dy= 1;
        if (keysPressed['a']|| keysPressed['arrowleft']) dx= -1;
        if (keysPressed['d']|| keysPressed['arrowright']) dx= 1;

        if (dx !== 0 || dy !== 0) {
            adventureStore.movePlayer(dx,dy);
        }

        if (!gameComplete) {
            requestAnimationFrame(gameLoop);
        } else if (!showVictory) {
            handleVictory();
        }
        
    }

    function handleVictory() {
        showVictory= true;
    }

    function handleCloseModal() {
        adventureStore.closeItemModal();

        if (selectedItem && gameMapComponent) {
            gameMapComponent.createParticles(
                selectedItem.x,
                selectedItem.y,
                getColorForCategory(selectedItem.kategori)
            );
        }
    }
    
    function getColorForCategory(kategori) {
        const colors = {
        'karbohidrat': '#fbbf24',
        'protein': '#ef4444',
        'sayuran': '#10b981',
        'buah': '#8b5cf6'
        };
        return colors[kategori] ||'#FFD700';
    }

    function handleRestart(p) {
        showVictory=false;
        showInstructions= false;
        adventureStore.restart();
        gameLoop();
    }

    function startGame() {
        showInstructions=false;
        adventureStore.startGame();
        gameLoop();
    }

    onMount(() => {
        if (typeof window !== 'undefined') {
            // Set viewport size based on browser window
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            adventureStore.setViewportSize(viewportWidth, viewportHeight);
            
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);
            document.body.style.overflow = 'hidden';
        }
    });

    onDestroy(()=>{
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup',handleKeyUp);
        adventureStore.cleanup();
    })
</script>

<div class="game-wrapper">
  <!-- Instructions Modal -->
  {#if showInstructions}
    <div class="modal modal-open">
      <div class="modal-box max-w-3xl">
        <h2 class="text-3xl font-bold mb-6 text-center">
          🗺️ Petualangan Pangan Nusantara
        </h2>
        
        <div class="instructions-content">
          <div class="instruction-section">
            <h3 class="font-bold text-lg mb-3">🎯 Tujuan</h3>
            <p>Jelajahi peta dan kumpulkan semua pangan lokal Indonesia!</p>
          </div>

          <div class="instruction-section">
            <h3 class="font-bold text-lg mb-3">🎮 Cara Main</h3>
            <div class="controls-grid">
              <div class="control-item">
                <div class="keys">
                  <kbd>W</kbd>
                  <kbd>A</kbd>
                  <kbd>S</kbd>
                  <kbd>D</kbd>
                </div>
                <span>atau Arrow Keys untuk bergerak</span>
              </div>
            </div>
            <ul class="list-disc list-inside space-y-2 mt-4">
              <li>Gerakkan karakter dengan WASD atau Arrow Keys</li>
              <li>Sentuh item pangan untuk mengumpulkannya</li>
              <li>Baca informasi tentang setiap pangan yang kamu temukan</li>
              <li>Selesaikan quest untuk bonus poin!</li>
            </ul>
          </div>

          <div class="instruction-section">
            <h3 class="font-bold text-lg mb-3">🏆 Fitur</h3>
            <div class="features-grid">
              <div class="feature">
                <span class="feature-icon">🔥</span>
                <span>Sistem Kombo</span>
              </div>
              <div class="feature">
                <span class="feature-icon">📋</span>
                <span>Quest System</span>
              </div>
              <div class="feature">
                <span class="feature-icon">🏅</span>
                <span>Achievement</span>
              </div>
              <div class="feature">
                <span class="feature-icon">🗺️</span>
                <span>Minimap</span>
              </div>
            </div>
          </div>

          <div class="alert alert-info mt-4">
            <span>💡 <strong>Tips:</strong> Kumpulkan item secara beruntun untuk mendapat kombo bonus!</span>
          </div>
        </div>

        <div class="modal-action justify-center">
          <button class="btn btn-primary btn-lg" on:click={startGame}>
            🚀 Mulai Petualangan!
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Victory Modal -->
  {#if showVictory}
    <div class="modal modal-open">
      <div class="modal-box max-w-2xl">
        <div class="victory-content text-center">
          <div class="victory-icon">🎉</div>
          <h2 class="text-4xl font-bold mb-4">Selamat!</h2>
          <p class="text-xl mb-6">Kamu berhasil mengumpulkan semua pangan lokal!</p>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-value">{score}</div>
              <div class="stat-label">Total Poin</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{formattedTime}</div>
              <div class="stat-label">Waktu</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{$progress.collected}/{$progress.total}</div>
              <div class="stat-label">Item Terkumpul</div>
            </div>
          </div>

          {#if $completedQuests.length > 0}
            <div class="completed-quests">
              <h3 class="font-bold text-lg mb-3">✅ Quest Selesai</h3>
              <div class="quest-badges">
                {#each $completedQuests as quest}
                  <div class="quest-badge">
                    <span class="badge-icon">{quest.reward.badge}</span>
                    <span class="badge-name">{quest.title}</span>
                  </div>
                {/each}
              </div>
            </div>
          {/if}

          {#if $unlockedAchievements.length > 0}
            <div class="achievements">
              <h3 class="font-bold text-lg mb-3">🏆 Achievement Unlocked</h3>
              <div class="achievement-badges">
                {#each $unlockedAchievements as achievement}
                  <div class="achievement-badge">
                    <span class="achievement-icon">{achievement.icon}</span>
                    <div class="achievement-info">
                      <div class="achievement-name">{achievement.name}</div>
                      <div class="achievement-desc">{achievement.description}</div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/if}

          <div class="alert alert-success mt-6">
            <span>🌾 <strong>Diversifikasi Pangan</strong> membantu ketahanan pangan nasional dan mendukung petani lokal Indonesia!</span>
          </div>
        </div>

        <div class="modal-action justify-center gap-4">
          <button class="btn btn-primary btn-lg" on:click={handleRestart}>
            🔄 Main Lagi
          </button>
          <a href="/gameArena" class="btn btn-outline btn-lg">
            ← Kembali ke Arena
          </a>
        </div>
      </div>
    </div>
  {/if}

  <!-- Main Game -->
  {#if !showInstructions && !showVictory}
    <div class="game-container">
      <!-- HUD -->
      <div class="hud">
        <div class="hud-left">
          <div class="hud-item">
            <span class="hud-label">🎯 Terkumpul:</span>
            <span class="hud-value">{$progress.collected}/{$progress.total}</span>
          </div>
          <div class="hud-item">
            <span class="hud-label">⭐ Score:</span>
            <span class="hud-value">{score}</span>
          </div>
          {#if combo > 1}
            <div class="combo-display">
              <span class="combo-text">🔥 KOMBO x{combo}</span>
            </div>
          {/if}
        </div>

        <div class="hud-center">
          <h1 class="game-title">🗺️ Petualangan Pangan</h1>
        </div>

        <div class="hud-right">
          <div class="hud-item">
            <span class="hud-label">⏱️</span>
            <span class="hud-value">{formattedTime}</span>
          </div>
        </div>
      </div>

      <!-- Powerup indicators -->
      {#if powerups.speed || powerups.magnet}
        <div class="powerup-indicators">
          {#if powerups.speed}
            <div class="powerup-indicator">👟 Speed Boost</div>
          {/if}
          {#if powerups.magnet}
            <div class="powerup-indicator">🧲 Item Magnet</div>
          {/if}
        </div>
      {/if}

      <!-- Game viewport -->
      <div class="game-viewport">
        <GameMap
          bind:this={gameMapComponent}
          {map}
          {player}
          {items}
          {useImages}
          backgroundImage="/images/games/maps.jpg"
        />
      </div>

      <!-- Controls hint -->
      <div class="controls-hint">
        <div class="hint-keys">
          <kbd>W</kbd>
          <kbd>A</kbd>
          <kbd>S</kbd>
          <kbd>D</kbd>
        </div>
        <span>untuk bergerak</span>
      </div>

      <!-- Quest Panel -->
      <QuestPanel
        quests={$adventureStore.quests}
        show={showQuestPanel}
        onToggle={() => adventureStore.toggleQuestPanel()}
      />

      <!-- Minimap -->
      <Minimap {player} {items} {map} />

      <!-- Info Modal -->
      <InfoModal
        item={selectedItem}
        show={showItemModal}
        onClose={handleCloseModal}
      />
    </div>
  {/if}
</div>

<style>
  .game-wrapper {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
  }

  /* Instructions Modal Styles */
  .instructions-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .instruction-section {
    text-align: left;
  }

  .controls-grid {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .control-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .keys {
    display: flex;
    gap: 5px;
  }

  kbd {
    background: #f3f4f6;
    border: 2px solid #d1d5db;
    border-radius: 6px;
    padding: 6px 12px;
    font-family: monospace;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .feature {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f9fafb;
    padding: 10px;
    border-radius: 8px;
  }

  .feature-icon {
    font-size: 24px;
  }

  /* Victory Modal Styles */
  .victory-content {
    padding: 20px;
  }

  .victory-icon {
    font-size: 80px;
    margin-bottom: 20px;
    animation: celebrate 1s ease infinite;
  }

  @keyframes celebrate {
    0%, 100% { transform: scale(1) rotate(0deg); }
    25% { transform: scale(1.1) rotate(-10deg); }
    75% { transform: scale(1.1) rotate(10deg); }
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin: 30px 0;
  }

  .stat-card {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }

  .stat-value {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .stat-label {
    font-size: 14px;
    opacity: 0.9;
  }

  .completed-quests,
  .achievements {
    margin-top: 30px;
    text-align: left;
  }

  .quest-badges,
  .achievement-badges {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .quest-badge {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #f9fafb;
    padding: 12px;
    border-radius: 10px;
  }

  .badge-icon {
    font-size: 32px;
  }

  .badge-name {
    font-weight: 600;
  }

  .achievement-badge {
    display: flex;
    align-items: center;
    gap: 12px;
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    padding: 12px;
    border-radius: 10px;
  }

  .achievement-icon {
    font-size: 32px;
  }

  .achievement-info {
    flex: 1;
    text-align: left;
  }

  .achievement-name {
    font-weight: 700;
    color: #333;
  }

  .achievement-desc {
    font-size: 12px;
    color: #666;
  }

  /* Main Game Styles */
  .game-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .hud {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    z-index: 400;
  }

  .hud-left,
  .hud-right {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .hud-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .hud-label {
    font-size: 14px;
    font-weight: 600;
  }

  .hud-value {
    font-size: 18px;
    font-weight: 700;
    color: #667eea;
  }

  .game-title {
    font-size: 24px;
    font-weight: 700;
    color: #333;
  }

  .combo-display {
    animation: comboScale 0.3s ease;
  }

  @keyframes comboScale {
    0% { transform: scale(0.8); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }

  .combo-text {
    font-size: 16px;
    font-weight: 700;
    color: #ef4444;
    text-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
    animation: pulse 0.5s ease infinite;
  }

  .powerup-indicators {
    position: fixed;
    top: 80px;
    left: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 500;
  }

  .powerup-indicator {
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    color: white;
    padding: 10px 15px;
    border-radius: 10px;
    font-weight: 700;
    box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
    animation: pulse 1s ease infinite;
  }

  .game-viewport {
    flex: 1;
    position: relative;
    overflow: hidden;
    background: #000;
  }

  .controls-hint {
    position: fixed;
    bottom: 160px;
    left: 20px;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    color: white;
    padding: 12px 16px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    z-index: 500;
  }

  .hint-keys {
    display: flex;
    gap: 4px;
  }

  .hint-keys kbd {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 4px 8px;
    font-size: 12px;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .hud {
      padding: 10px 15px;
      flex-wrap: wrap;
    }

    .game-title {
      font-size: 18px;
    }

    .hud-value {
      font-size: 16px;
    }

    .stats-grid {
      grid-template-columns: 1fr;
    }

    .features-grid {
      grid-template-columns: 1fr;
    }
  }
</style>