<script>
	import { div } from "motion/react-client";
import ScoreDisplay from "../shared/ScoreDisplay.svelte";
	import { tebakPanganStore,finalGrade,progress } from "./gameStore";
	import { Result } from "postcss";
    $:({
        currentQuestion,
        shuffledOptions,
        selectedAnswer,
        showResult,
        result,
        gameFinished,
        gameInstance
    } = $tebakPanganStore);
</script>

<div class="game-wrapper p-6 max-w-2xl mx-auto">
    {#if !gameFinished}
    <!-- Ini Header -->
    <div class="flex justify-between items-center mb-6">
        <div class="text-lg font-bold">
            Soal {$progress.current}/{$progress.total}
        </div>
        <ScoreDisplay score={gameInstance.score}/>
    </div>
    <!-- Ini Proress Bar -->
     <progress
        class="progress progress-primary w-full mb-6"
        value={$progress.percentage}
        max="100"
     />

    <!-- Question Image -->
     <div class="card bg-base-100 shadow-xl mb-6">
        <figure class="px-10 pt-10">
            <img src={currentQuestion.gambar} alt="Pangan" class="rounded-xl h-64 w-full object-cover">
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title text-2xl">Pangan apakah ini?</h2>
        </div>
     </div>

     <!-- Opsi jawaban -->
      {#if !showResult}
      <div class="grid grid-cols-2 gap-4">
        {#each shuffledOptions as option (option)}
        <button
            class="btn btn-outline btn-lg hover:btn-primary transition-all"
            on:click={()=> tebakPanganStore.selectAnswer(option)}
        >
            {option}
        </button>
        {/each}
      </div>
      {:else}
        <!-- Hasil card -->
        <div class="alert {result.isCorrect ? 'alert-success': 'alert-error'} mb-4">
            <div class="flex items-center gap-2">
                <span class="text-3xl">{result.isCorrect ? '✅' : '❌'}</span>
            <div>
            <p class="font-bold text-lg">
              {result.isCorrect ? 'Benar!' : 'Salah!'}
            </p>
            {#if !result.isCorrect}
              <p class="text-sm">Jawabannya: {result.correctAnswer}</p>
            {/if}
          </div>
        </div>
      </div>
      
      <!-- Fun Fact -->
      <div class="card bg-base-200 mb-4">
        <div class="card-body">
          <h3 class="font-bold flex items-center gap-2">
            <span>💡</span> Tahukah kamu?
          </h3>
          <p>{currentQuestion.funFact}</p>
          <div class="badge badge-outline">📍 {currentQuestion.asal}</div>
        </div>
      </div>
      
      <button 
        class="btn btn-primary btn-block btn-lg" 
        on:click={() => tebakPanganStore.nextQuestion()}
      >
        {gameInstance.hasMoreQuestions() ? 'Soal Berikutnya →' : 'Lihat Hasil'}
      </button>
    {/if}
    
  {:else}
    <!-- Game Finished Screen -->
    <div class="text-center space-y-6">
      <h2 class="text-5xl font-bold">🎉 Selesai!</h2>
      
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body items-center">
          <div class="text-6xl mb-4">{$finalGrade.emoji}</div>
          <h3 class="text-3xl font-bold">Grade: {$finalGrade.grade}</h3>
          <p class="text-xl">{$finalGrade.message}</p>
          
          <div class="stats stats-vertical lg:stats-horizontal shadow mt-6">
            <div class="stat">
              <div class="stat-title">Score</div>
              <div class="stat-value text-primary">{gameInstance.score}</div>
              <div class="stat-desc">dari {gameInstance.maxScore}</div>
            </div>
            
            <div class="stat">
              <div class="stat-title">Benar</div>
              <div class="stat-value text-success">
                {gameInstance.score / 10}
              </div>
              <div class="stat-desc">soal</div>
            </div>
            
            <div class="stat">
              <div class="stat-title">Akurasi</div>
              <div class="stat-value">
                {Math.round((gameInstance.score / gameInstance.maxScore) * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex gap-4 justify-center">
        <button 
          class="btn btn-primary btn-lg" 
          on:click={() => tebakPanganStore.restart()}
        >
          🔄 Main Lagi
        </button>
        <a href="/gameArena" class="btn btn-outline btn-lg">
          ← Kembali ke Arena
        </a>
      </div>
    </div>
  {/if}
</div>