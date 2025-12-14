<script>
    export let quests=[];
    export let show= true;
    export let onToggle= ()=>{};
</script>
<div class="quest-panel" class:collapsed={!show}>
  <button class="toggle-btn" on:click={onToggle}>
    {show ? '◀' : '▶'}
  </button>

  {#if show}
    <div class="panel-content">
      <h3 class="panel-title">📋 Quest</h3>
      
      <div class="quests-list">
        {#each quests as quest (quest.id)}
          <div class="quest-item" class:completed={quest.completed}>
            <div class="quest-header">
              <span class="quest-icon">
                {quest.completed ? '✅' : '📌'}
              </span>
              <h4 class="quest-title">{quest.title}</h4>
            </div>
            
            <p class="quest-description">{quest.description}</p>
            
            {#if quest.completed}
              <div class="quest-reward">
                <span class="reward-badge">{quest.reward.badge}</span>
                <span class="reward-points">+{quest.reward.points} poin</span>
              </div>
            {:else}
              <div class="quest-progress">
                <span class="progress-text">Target:</span>
                <div class="target-items">
                  {#each quest.target as targetId}
                    <span class="target-item">{targetId}</span>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .quest-panel {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 320px;
    max-height: 80vh;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    z-index: 500;
    overflow: hidden;
  }

  .quest-panel.collapsed {
    width: 50px;
  }

  .toggle-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    height: 30px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    transition: all 0.2s;
    z-index: 10;
  }

  .toggle-btn:hover {
    transform: scale(1.1);
  }

  .panel-content {
    padding: 20px;
  }

  .panel-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 16px;
    color: #333;
  }

  .quests-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 60vh;
    overflow-y: auto;
  }

  .quests-list::-webkit-scrollbar {
    width: 6px;
  }

  .quests-list::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 10px;
  }

  .quests-list::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }

  .quest-item {
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    padding: 12px;
    transition: all 0.2s;
  }

  .quest-item.completed {
    border-color: #10b981;
    background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  }

  .quest-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  .quest-icon {
    font-size: 20px;
  }

  .quest-title {
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }

  .quest-description {
    font-size: 12px;
    color: #666;
    margin-bottom: 10px;
    line-height: 1.4;
  }

  .quest-reward {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
  }

  .reward-badge {
    font-size: 20px;
  }

  .reward-points {
    font-size: 12px;
    font-weight: 600;
    color: #10b981;
  }

  .quest-progress {
    font-size: 11px;
    color: #666;
  }

  .progress-text {
    font-weight: 600;
    display: block;
    margin-bottom: 4px;
  }

  .target-items {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .target-item {
    background: #f3f4f6;
    padding: 2px 8px;
    border-radius: 6px;
    font-size: 10px;
    font-weight: 500;
  }
</style>