<script>
	import { onMount, onDestroy } from "svelte";
	import { susunPiringStore, composition, isPlateComplete, finalGrade } from "./gameStore";
	import FoodItem from "./components/FoodItem.svelte";
	import PlateSection from "./components/PlateSection.svelte";
	import Pantry from "./components/Pantry.svelte";
	import CompositionChart from "./components/CompositionChart.svelte";
	import { targetComposition } from "$lib/data/foodData";
  import { setupDragScroll } from "$lib/utils/dragScroll";
    

    let dragScrollController;
    let isDragging= false;
    let showInstructions=true;
    let feedbackTimeout;

    $:({
        availableFoods,
        plate,
        selectedFood,
        validationResult,
        showResult,
        feedback
    }= $susunPiringStore);

    $: if (feedback) {
        clearTimeout(feedbackTimeout);
        feedbackTimeout = setTimeout(()=>{
            susunPiringStore.cleadFeedback();

        }, 3000);
    }

    onMount(()=>{
      dragScrollController=setupDragScroll();
      window.addEventListener('drag', handleDrag);
      window.addEventListener('dragend',handleDragEnd);
    })

    onDestroy(()=>{
      if (dragScrollController) {
        dragScrollController.stopAutoScroll();
      }
      window.removeEventListener('drag', handleDrag);
      window.removeEventListener('dragend', handleDragEnd);
    })

    function handleDrag(e) {
      if (e.clientY === 0) return;
      isDragging= true;
      dragScrollController.handleDragMove(e);
    }

    function handleDragEnd() {
      isDragging=false;
      dragScrollController.stopAutoScroll();
    }

    function handleSelectFood(food){
        susunPiringStore.selectedFood(food);
    }

    function handleDropFood(kategori){
        susunPiringStore.dropFood(kategori);
    }

    function handleRemoveFood(foodId, kategori){
        susunPiringStore.removeFood(foodId,kategori);
    }

    function handleCheckComposition(){
        if (!$isPlateComplete){
            alert('Lengkapi semua bagian piring dulu!');
            return;
        }
        susunPiringStore.checkComposition();
    }

    function handleRestart() {
        susunPiringStore.restart
        showInstructions=false;
    }

    onMount(()=> {
        return ()=> {
            clearTimeout(feedbackTimeout);
        };
    });
</script>

<div class="game-container">
  {#if isDragging}
    <div class="drag-scroll-indicator top">
      <div class="arrow">↑</div>
      <span>Scroll ke atas</span>
    </div>
    <div class="drag-scroll-indicator bottom">
      <div class="arrow">↓</div>
      <span>Scroll ke bawah</span>
    </div>
  {/if}
  {#if showInstructions}
    <div class="modal modal-open">
      <div class="modal-box max-w-2xl">
        <h3 class="font-bold text-2xl mb-4">🍽️ Cara Bermain</h3>
        <div class="space-y-3 text-left">
          <p><strong>Tujuan:</strong> Susun piring dengan komposisi gizi seimbang!</p>
          <div class="divider"></div>
          <p><strong>Komposisi Ideal (Isi Piringku):</strong></p>
          <ul class="list-disc list-inside space-y-1 ml-4">
            <li>🍚 Karbohidrat: <strong>35%</strong></li>
            <li>🍖 Protein: <strong>15%</strong></li>
            <li>🥬 Sayuran: <strong>35%</strong></li>
            <li>🍎 Buah: <strong>15%</strong></li>
          </ul>
          <div class="divider"></div>
          <p><strong>Cara Main:</strong></p>
          <ol class="list-decimal list-inside space-y-1 ml-4">
            <li>Pilih makanan dari dapur dengan <strong>klik</strong> atau <strong>drag</strong></li>
            <li>Klik section di piring atau drag ke section yang sesuai</li>
            <li>Setelah selesai, klik "Cek Gizi"</li>
          </ol>
          <div class="alert alert-info mt-4">
            <span>💡 <strong>Tip:</strong> Gunakan pangan lokal untuk bonus poin!</span>
          </div>
        </div>
        <div class="modal-action">
          <button class="btn btn-primary btn-lg" on:click={() => showInstructions = false}>
            Mulai Main! 🚀
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Feedback Toast -->
  {#if feedback}
    <div class="toast toast-top toast-center z-50">
      <div class="alert {feedback.success ? 'alert-success' : 'alert-error'}">
        <span>{feedback.message}</span>
      </div>
    </div>
  {/if}

  {#if !showResult}
    <!-- Game Play Area -->
    <div class="game-header mb-6">
      <h1 class="text-4xl font-bold text-center mb-2">🍽️ Susun Piring Gizi</h1>
      <p class="text-center text-gray-600">Buat komposisi gizi seimbang dengan pangan beragam!</p>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Left: Pantry -->
      <div class="lg:col-span-1">
        <Pantry 
          foods={availableFoods} 
          {selectedFood}
          onSelectFood={handleSelectFood}
        >
          <svelte:fragment slot="food-item" let:food let:isSelected>
            <FoodItem 
              {food} 
              {isSelected}
              onSelect={handleSelectFood}
            />
          </svelte:fragment>
        </Pantry>

        <!-- Instructions Card -->
        <div class="card bg-base-200 mt-4">
          <div class="card-body">
            <h3 class="font-bold">📋 Panduan Cepat</h3>
            <ul class="text-sm space-y-1">
              <li>✓ Klik makanan lalu klik section piring</li>
              <li>✓ Atau drag & drop langsung</li>
              <li>✓ Klik × untuk hapus makanan</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Right: Circular Plate & Chart -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Circular Plate -->
        <div class="card bg-white shadow-xl">
          <div class="card-body">
            <h2 class="card-title mb-4 justify-center">🍽️ Piring Kamu</h2>
            
            <!-- Circular Plate Container -->
            <div class="circular-plate-container">
              <!-- Plate background -->
              <div class="plate-background"></div>
              
              <!-- Center decoration -->
              <div class="plate-center">
                <span class="text-3xl">🍽️</span>
              </div>
              
              <!-- Divider lines -->
              <div class="divider-vertical"></div>
              <div class="divider-horizontal"></div>
              
              <!-- Plate sections -->
              <div class="plate-sections">
                <!-- Top Left - Sayuran -->
                <div class="section section-tl">
                  <PlateSection
                    kategori="sayuran"
                    foods={plate.sayuran}
                    position="top-left"
                    onDrop={handleDropFood}
                    onRemove={handleRemoveFood}
                  />
                </div>
                
                <!-- Top Right - Karbohidrat -->
                <div class="section section-tr">
                  <PlateSection
                    kategori="karbohidrat"
                    foods={plate.karbohidrat}
                    position="top-right"
                    onDrop={handleDropFood}
                    onRemove={handleRemoveFood}
                  />
                </div>
                
                <!-- Bottom Left - Buah -->
                <div class="section section-bl">
                  <PlateSection
                    kategori="buah"
                    foods={plate.buah}
                    position="bottom-left"
                    onDrop={handleDropFood}
                    onRemove={handleRemoveFood}
                  />
                </div>
                
                <!-- Bottom Right - Protein -->
                <div class="section section-br">
                  <PlateSection
                    kategori="protein"
                    foods={plate.protein}
                    position="bottom-right"
                    onDrop={handleDropFood}
                    onRemove={handleRemoveFood}
                  />
                </div>
              </div>
            </div>

            <div class="card-actions justify-end mt-6">
              <button 
                class="btn btn-outline btn-error"
                on:click={handleRestart}
              >
                🔄 Reset
              </button>
              <button 
                class="btn btn-primary btn-lg"
                on:click={handleCheckComposition}
                disabled={!$isPlateComplete}
              >
                {$isPlateComplete ? '✓ Cek Gizi' : 'Lengkapi Piring Dulu'}
              </button>
            </div>
          </div>
        </div>

        <!-- Live Composition Chart -->
        <CompositionChart 
          composition={$composition}
          targetComposition={targetComposition}
          showTarget={true}
        />
      </div>
    </div>

  {:else}
    
    <div class="result-container">
      <div class="text-center mb-8">
        <h2 class="text-5xl font-bold mb-4">Hasil Penilaian</h2>
        <div class="text-8xl mb-4">{$finalGrade.emoji}</div>
        <h3 class="text-3xl font-bold">Grade: {$finalGrade.grade}</h3>
        <p class="text-xl mt-2">{$finalGrade.message}</p>
      </div>

      <div class="card bg-base-100 shadow-xl max-w-4xl mx-auto mb-6">
        <div class="card-body">
          <div class="stats stats-vertical lg:stats-horizontal shadow">
            <div class="stat">
              <div class="stat-title">Score Total</div>
              <div class="stat-value text-primary">
                {validationResult.totalScore}
              </div>
              <div class="stat-desc">dari {validationResult.maxScore} poin</div>
            </div>

            <div class="stat">
              <div class="stat-title">Bonus Pangan Lokal</div>
              <div class="stat-value text-success">
                +{validationResult.bonusPoints}
              </div>
              <div class="stat-desc">poin</div>
            </div>

            <div class="stat">
              <div class="stat-title">Akurasi</div>
              <div class="stat-value">
                {Math.round(validationResult.percentage)}%
              </div>
            </div>
          </div>

          <div class="divider">Detail Komposisi</div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {#each Object.entries(validationResult.results) as [kategori, result]}
              <div class="card bg-base-200">
                <div class="card-body p-4">
                  <h4 class="font-bold capitalize">{kategori}</h4>
                  <div class="flex justify-between text-sm">
                    <span>Target:</span>
                    <span class="font-bold">{result.target}%</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span>Kamu:</span>
                    <span class="font-bold {result.isCorrect ? 'text-success' : 'text-warning'}">
                      {result.actual}%
                    </span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span>Selisih:</span>
                    <span>{result.difference}%</span>
                  </div>
                  <div class="badge {result.isCorrect ? 'badge-success' : 'badge-warning'} mt-2">
                    {result.isCorrect ? '✓ Sempurna!' : `±${result.difference}%`}
                  </div>
                  <div class="text-right mt-2">
                    <span class="font-bold text-lg">{result.score} poin</span>
                  </div>
                </div>
              </div>
            {/each}
          </div>

          <div class="alert alert-info mt-6">
            <div>
              <span class="font-bold">💡 Tahukah kamu?</span>
              <p class="text-sm mt-1">
                {#if validationResult.bonusPoints > 0}
                  Kamu menggunakan <strong>{validationResult.bonusPoints / 5} pangan lokal</strong>! 
                  Diversifikasi pangan lokal membantu ketahanan pangan nasional. 🌾
                {:else}
                  Coba gunakan lebih banyak pangan lokal untuk mendukung diversifikasi pangan Indonesia! 🇮🇩
                {/if}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex gap-4 justify-center">
        <button 
          class="btn btn-primary btn-lg"
          on:click={handleRestart}
        >
          🔄 Main Lagi
        </button>
        <a href="/game-arena" class="btn btn-outline btn-lg">
          ← Kembali ke Arena
        </a>
      </div>
    </div>
  {/if}
</div>

<style>
  .game-container {
    min-height: 100vh;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-attachment: fixed;
  }

  .game-header {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .result-container {
    background: white;
    border-radius: 1rem;
    padding: 3rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    max-width: 1200px;
    margin: 0 auto;
  }

  /* Circular Plate Styles */
  .circular-plate-container {
    position: relative;
    width: 100%;
    max-width: 500px;
    aspect-ratio: 1;
    margin: 0 auto;
  }

  .plate-background {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border-radius: 50%;
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.15),
      inset 0 2px 10px rgba(255, 255, 255, 0.5);
    border: 8px solid #cbd5e1;
  }

  .plate-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    background: white;
    border-radius: 50%;
    border: 3px solid #94a3b8;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .divider-vertical {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background: #94a3b8;
    transform: translateX(-50%);
    z-index: 5;
  }

  .divider-horizontal {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 2px;
    background: #94a3b8;
    transform: translateY(-50%);
    z-index: 5;
  }

  .plate-sections {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    padding: 10px;
    gap: 4px;
  }

  .section {
    position: relative;
    overflow: hidden;
  }

  .section-tl { grid-area: 1 / 1 / 2 / 2; }
  .section-tr { grid-area: 1 / 2 / 2 / 3; }
  .section-bl { grid-area: 2 / 1 / 3 / 2; }
  .section-br { grid-area: 2 / 2 / 3 / 3; }

  /* Responsive */
  @media (max-width: 768px) {
    .game-container {
      padding: 1rem;
    }

    .circular-plate-container {
      max-width: 350px;
    }

    .result-container {
      padding: 1.5rem;
    }
  }

  .drag-scroll-indicator {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    z-index: 1000;
    pointer-events: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    animation: pulse 1s infinite;
  }

  .drag-scroll-indicator.top {
    top: 20px;
  }

  .drag-scroll-indicator.bottom {
    bottom: 20px;
  }

  .arrow {
    font-size: 1.5rem;
    animation: bounce 1s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
</style>