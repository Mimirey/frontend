<script>
    export let show= false;
    export let stats= {};
    export let onRestart= ()=>{};
    export let onExit= ()=>{};

    $: grade = stats.grade || { grade: 'D', emoji: '💪', color: '#6b7280' };
</script>

{#if show}
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="game-over-header">
        <h2 class="game-over-title">Game Over!</h2>
        <div class="grade-display" style="background: {grade.color};">
          <div class="grade-emoji">{grade.emoji}</div>
          <div class="grade-letter">Grade {grade.grade}</div>
        </div>
      </div>

      <div class="stats-container">
        <div class="stat-row main-stat">
          <span class="stat-label">Final Score</span>
          <span class="stat-value">{stats.score || 0}</span>
        </div>

        <div class="divider"></div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-number">{stats.correctSorts || 0}</div>
            <div class="stat-name">Benar</div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">❌</div>
            <div class="stat-number">{stats.wrongSorts || 0}</div>
            <div class="stat-name">Salah</div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">🎯</div>
            <div class="stat-number">{stats.accuracy || 0}%</div>
            <div class="stat-name">Akurasi</div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">🔥</div>
            <div class="stat-number">{stats.maxCombo || 0}x</div>
            <div class="stat-name">Max Kombo</div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">📦</div>
            <div class="stat-number">{stats.itemsSorted || 0}</div>
            <div class="stat-name">Item Sorted</div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">⏱️</div>
            <div class="stat-number">{Math.floor((stats.elapsedTime || 0) / 60)}:{((stats.elapsedTime || 0) % 60).toString().padStart(2, '0')}</div>
            <div class="stat-name">Waktu</div>
          </div>
        </div>

        <div class="performance-message">
          {#if stats.accuracy >= 90}
            <p class="message success">🌟 Luar biasa! Kamu master sorting!</p>
          {:else if stats.accuracy >= 75}
            <p class="message good">🎉 Bagus sekali! Terus tingkatkan!</p>
          {:else if stats.accuracy >= 60}
            <p class="message okay">👍 Lumayan! Latihan lagi ya!</p>
          {:else}
            <p class="message try-again">💪 Jangan menyerah! Coba lagi!</p>
          {/if}
        </div>

        <div class="tips-box">
          <div class="tips-title">💡 Tips:</div>
          <ul class="tips-list">
            <li>Fokus pada item yang paling dekat dengan bawah</li>
            <li>Jaga kombo untuk bonus poin maksimal</li>
            <li>Semakin tinggi level, semakin cepat item jatuh</li>
          </ul>
        </div>
      </div>

      <div class="modal-actions">
        <button class="btn btn-primary btn-lg" on:click={onRestart}>
          🔄 Main Lagi
        </button>
        <button class="btn btn-outline btn-lg" on:click={onExit}>
          ← Kembali ke Arena
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .modal-content {
    background: white;
    border-radius: 24px;
    padding: 40px;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    animation: slideUp 0.4s ease;
  }

  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .game-over-header {
    text-align: center;
    margin-bottom: 30px;
  }

  .game-over-title {
    font-size: 36px;
    font-weight: 700;
    color: #333;
    margin-bottom: 20px;
  }

  .grade-display {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 40px;
    border-radius: 20px;
    color: white;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  .grade-emoji {
    font-size: 60px;
    margin-bottom: 10px;
  }

  .grade-letter {
    font-size: 28px;
    font-weight: 700;
  }

  .stats-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .stat-row.main-stat {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  }

  .stat-row .stat-label {
    font-size: 18px;
    font-weight: 600;
  }

  .stat-row .stat-value {
    font-size: 36px;
    font-weight: 700;
  }

  .divider {
    height: 2px;
    background: linear-gradient(90deg, transparent, #ddd, transparent);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }

  .stat-card {
    background: #f9fafb;
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    transition: all 0.2s;
  }

  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .stat-icon {
    font-size: 32px;
    margin-bottom: 8px;
  }

  .stat-number {
    font-size: 24px;
    font-weight: 700;
    color: #333;
    margin-bottom: 4px;
  }

  .stat-name {
    font-size: 12px;
    color: #666;
    font-weight: 600;
  }

  .performance-message {
    text-align: center;
    padding: 20px;
    border-radius: 12px;
    background: #f3f4f6;
  }

  .message {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }

  .message.success { color: #10b981; }
  .message.good { color: #3b82f6; }
  .message.okay { color: #f59e0b; }
  .message.try-again { color: #ef4444; }

  .tips-box {
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    padding: 20px;
    border-radius: 12px;
    border-left: 4px solid #f59e0b;
  }

  .tips-title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
    color: #333;
  }

  .tips-list {
    margin: 0;
    padding-left: 20px;
    color: #666;
  }

  .tips-list li {
    margin-bottom: 6px;
    font-size: 14px;
    line-height: 1.5;
  }

  .modal-actions {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 30px;
  }

  .btn {
    padding: 12px 32px;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .btn-primary {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }

  .btn-outline {
    background: white;
    border: 2px solid #667eea;
    color: #667eea;
  }

  .btn-outline:hover {
    background: #667eea;
    color: white;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .modal-content {
      padding: 25px;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    .modal-actions {
      flex-direction: column;
    }

    .btn {
      width: 100%;
    }
  }
</style>