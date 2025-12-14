<script>
	import { createEventDispatcher } from "svelte";

    export let currentPage=0;
    export let totalPages= 0;
    export let canGoBack= false;
    export let canGoForward= true;

    const dispatch= createEventDispatcher();

    let showPageJump= false;
    let jumpToPage= 1;

    function handlePrev() {
        dispatch('prev');
    }
    function handleNext() {
        dispatch('next');
    }
    function handleJump() {
        if (jumpToPage >= 1 && jumpToPage<= totalPages) {
            dispatch('goto', {page:jumpToPage -1});
            showPageJump=false;
        }
    }
</script>
<div class="controls-container">
  <!-- Navigation Buttons -->
  <div class="nav-buttons">
    <button
      class="btn-nav btn-prev"
      class:disabled={!canGoBack}
      disabled={!canGoBack}
      on:click={handlePrev}
      title="Halaman sebelumnya (←)"
    >
      <span class="icon">‹</span>
      <span class="label">Sebelumnya</span>
    </button>

    <button
      class="btn-page-jump"
      on:click={() => showPageJump = !showPageJump}
      title="Loncat ke halaman"
    >
      <span class="icon">📖</span>
      <span class="page-text">{currentPage + 1}-{Math.min(currentPage + 2, totalPages)} / {totalPages}</span>
    </button>

    <button
      class="btn-nav btn-next"
      class:disabled={!canGoForward}
      disabled={!canGoForward}
      on:click={handleNext}
      title="Halaman selanjutnya (→)"
    >
      <span class="label">Selanjutnya</span>
      <span class="icon">›</span>
    </button>
  </div>

  <!-- Page Jump Modal -->
  {#if showPageJump}
    <div class="page-jump-modal">
      <div class="modal-content" on:click|stopPropagation>
        <h3>Loncat ke Halaman</h3>
        <div class="input-group">
          <input
            type="number"
            min="1"
            max={totalPages}
            bind:value={jumpToPage}
            placeholder="Nomor halaman"
          />
          <button class="btn-jump" on:click={handleJump}>
            Loncat
          </button>
        </div>
        <button class="btn-close" on:click={() => showPageJump = false}>
          ✕
        </button>
      </div>
    </div>
  {/if}

  <!-- Keyboard Hints -->
  <div class="keyboard-hints">
    <span class="hint">←  Sebelumnya</span>
    <span class="hint">→  Selanjutnya</span>
  </div>
</div>

<style>
  .controls-container {
    position: relative;
    margin-top: 30px;
  }

  .nav-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  .btn-nav {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 24px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  .btn-nav:hover:not(.disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }

  .btn-nav:active:not(.disabled) {
    transform: translateY(0);
  }

  .btn-nav.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #ccc;
    box-shadow: none;
  }

  .btn-nav .icon {
    font-size: 24px;
    font-weight: 700;
  }

  .btn-page-jump {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    background: white;
    border: 2px solid #667eea;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-page-jump:hover {
    background: #f0f4ff;
    transform: scale(1.05);
  }

  .page-text {
    color: #667eea;
    font-size: 14px;
  }

  /* Page Jump Modal */
  .page-jump-modal {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.2s;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .modal-content {
    background: white;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    position: relative;
    animation: slideUp 0.3s;
  }

  @keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .modal-content h3 {
    margin-bottom: 20px;
    font-size: 20px;
    color: #333;
  }

  .input-group {
    display: flex;
    gap: 10px;
  }

  .input-group input {
    flex: 1;
    padding: 10px 15px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 16px;
  }

  .input-group input:focus {
    outline: none;
    border-color: #667eea;
  }

  .btn-jump {
    padding: 10px 20px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-jump:hover {
    background: #5568d3;
  }

  .btn-close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    background: #f3f4f6;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    color: #666;
  }

  .btn-close:hover {
    background: #e5e7eb;
  }

  /* Keyboard Hints */
  .keyboard-hints {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 20px;
  }

  .hint {
    font-size: 12px;
    color: #999;
    font-weight: 600;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .nav-buttons {
      gap: 10px;
    }

    .btn-nav .label {
      display: none;
    }

    .btn-nav {
      padding: 12px 16px;
    }

    .keyboard-hints {
      display: none;
    }
  }
</style>