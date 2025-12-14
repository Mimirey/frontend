<script>
  export let composition = {
    karbohidrat: 0,
    protein: 0,
    sayuran: 0,
    buah: 0
  };
  export let targetComposition = {
    karbohidrat: 35,
    protein: 15,
    sayuran: 35,
    buah: 15
  };
  export let showTarget = true;

  const categories = [
    { key: 'karbohidrat', label: 'Karbohidrat', color: '#f59e0b' },
    { key: 'protein', label: 'Protein', color: '#ef4444' },
    { key: 'sayuran', label: 'Sayuran', color: '#10b981' },
    { key: 'buah', label: 'Buah', color: '#8b5cf6' }
  ];
</script>

<div class="composition-chart">
  <h4 class="chart-title">Komposisi Piring</h4>

  <div class="chart-bars">
    {#each categories as cat}
      <div class="bar-group">
        <div class="bar-label">
          <span>{cat.label}</span>
          <span class="percentage">{Math.round(composition[cat.key])}%</span>
        </div>

        <div class="bar-container">
          <!-- Bar aktual -->
          <div
            class="bar-fill"
            style="width: {composition[cat.key]}%; background-color: {cat.color};"
          />

          <!-- Target marker -->
          {#if showTarget}
            <div
              class="target-marker"
              style="left: {targetComposition[cat.key]}%;"
              title="Target: {targetComposition[cat.key]}%"
            />
          {/if}
        </div>

        {#if showTarget}
          <div class="target-label">
            Target: {targetComposition[cat.key]}%
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .composition-chart {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .chart-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  .chart-bars {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .bar-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .bar-label {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .percentage {
    color: #6b7280;
  }

  .bar-container {
    position: relative;
    width: 100%;
    height: 24px;
    background: #e5e7eb;
    border-radius: 9999px;
    overflow: hidden;
  }

  .bar-fill {
    height: 100%;
    border-radius: 9999px;
    transition: width 0.3s ease;
  }

  .target-marker {
    position: absolute;
    top: -2px;
    bottom: -2px;
    width: 3px;
    background: #1f2937;
    border-radius: 2px;
    transform: translateX(-50%);
  }

  .target-marker::after {
    content: '▼';
    position: absolute;
    top: -16px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 10px;
    color: #1f2937;
  }

  .target-label {
    font-size: 0.75rem;
    color: #6b7280;
    text-align: right;
  }
</style>