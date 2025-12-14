<script>
	import { createEventDispatcher } from "svelte";
	import FlipBookPage from "./FlipBookPage.svelte";
	import FlipBookControls from "./FlipBookControls.svelte";
    
    export let pages=[];
    export let initialPage=0;

    let currentPage= initialPage;
    let isFlipping= false;
    let flipDirection= 'forward';

    const dispatch= createEventDispatcher();

    $:leftPage= pages[currentPage];
    $: rightPage= pages[currentPage + 1];
    $:canGoBack= currentPage > 0;
    $:canGoForward= currentPage < pages.length -2;

    function nextPage() {
        if (canGoForward && !isFlipping) {
            flipDirection='forward';
            isFlipping=true;

            setTimeout(() => {
                currentPage+=2;
                isFlipping= false;
                dispatch('pageChange', {page:currentPage});
            }, 600);
        }
    }

    function prevPage() {
        if (canGoBack && !isFlipping) {
            flipDirection='backward';
            isFlipping= true;

            setTimeout(() => {
                currentPage -= 2;
                isFlipping=false;
                dispatch('pageChange', {page:currentPage});
            }, 600);
        }
    }

    function goToPage(pageNumber) {
        if (!isFlipping && pageNumber >= 0 && pageNumber< pages.length) {
            flipDirection= pageNumber > currentPage ? 'forward' : 'backward';
            isFlipping=true;

            setTimeout(() => {
                currentPage= Math.floor(pageNumber/2) *2;
                isFlipping= false;
                dispatch('pageChange', {page:currentPage});
            }, 600);
        }
    }

    function handleKeydown(e) {
        if ( e.key === 'ArrowRight') nextPage();
        if (e.key === 'ArrowLeft') prevPage();
    }
    
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="flipbook-container">
  <div class="book" class:flipping={isFlipping}>
    <!-- Left Page -->
    <div class="page page-left">
      {#if leftPage}
        <FlipBookPage page={leftPage} side="left" />
      {/if}
    </div>

    <!-- Right Page -->
    <div class="page page-right" class:flip-forward={isFlipping && flipDirection === 'forward'} class:flip-backward={isFlipping && flipDirection === 'backward'}>
      {#if rightPage}
        <FlipBookPage page={rightPage} side="right" />
      {/if}
      
      <!-- Flip effect overlay -->
      {#if isFlipping}
        <div class="flip-overlay"></div>
      {/if}
    </div>

    <!-- Book spine -->
    <div class="spine"></div>
  </div>

  <!-- Controls -->
  <FlipBookControls
    {currentPage}
    totalPages={pages.length}
    {canGoBack}
    {canGoForward}
    on:next={nextPage}
    on:prev={prevPage}
    on:goto={(e) => goToPage(e.detail.page)}
  />

  <!-- Page indicator -->
  <div class="page-indicator">
    Halaman {currentPage + 1}-{Math.min(currentPage + 2, pages.length)} / {pages.length}
  </div>
</div>

<style>
  .flipbook-container {
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
    perspective: 2000px;
  }

  .book {
    position: relative;
    width: 100%;
    height: 600px;
    display: flex;
    transform-style: preserve-3d;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  .page {
    position: relative;
    width: 50%;
    height: 100%;
    background: white;
    overflow: hidden;
  }

  .page-left {
    border-right: 1px solid #ddd;
  }

  .page-right {
    transform-origin: left center;
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  }

  .page-right.flip-forward {
    transform: rotateY(-180deg);
  }

  .page-right.flip-backward {
    transform: rotateY(0deg);
  }

  .flip-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, 
      transparent 0%,
      rgba(0, 0, 0, 0.1) 50%,
      rgba(0, 0, 0, 0.2) 100%
    );
    pointer-events: none;
    animation: flipShine 0.6s;
  }

  @keyframes flipShine {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }

  .spine {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 20px;
    background: linear-gradient(90deg, 
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.2)
    );
    transform: translateX(-50%);
    z-index: 10;
    box-shadow: 
      inset 0 0 10px rgba(0, 0, 0, 0.3),
      0 0 10px rgba(0, 0, 0, 0.2);
  }

  .page-indicator {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    color: #666;
    font-weight: 600;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .book {
      height: 500px;
    }

    .flipbook-container {
      padding: 20px 10px;
    }
  }
</style>