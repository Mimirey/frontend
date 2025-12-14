<script>
    export let item= null;
    export let show= false;
    export let onClose=()=>{};
</script>
{#if show && item}
  <div class="modal-overlay" on:click={onClose} on:keypress={(e) => e.key === 'Enter' && onClose()}>
    <div class="modal-content" on:click|stopPropagation on:keypress|stopPropagation>
      <div class="modal-header">
        <div class="modal-icon">
          {#if item.image}
            <img src={item.image} alt={item.nama} />
          {:else}
            <span class="emoji">{item.emoji}</span>
          {/if}
        </div>
        <div class="modal-title-section">
          <h2 class="modal-title">{item.nama}</h2>
          <div class="badges">
            <span class="badge badge-category">{item.kategori}</span>
            <span class="badge badge-points">+{item.points} poin</span>
          </div>
        </div>
      </div>

      <div class="modal-body">
        <div class="info-section">
          <div class="info-item">
            <span class="info-label">📍 Asal:</span>
            <span class="info-value">{item.asal}</span>
          </div>
          
          <div class="info-item">
            <span class="info-label"> Manfaat:</span>
            <span class="info-value">{item.manfaat}</span>
          </div>
          
          <div class="info-item fun-fact">
            <span class="info-label"> Fakta Menarik:</span>
            <span class="info-value">{item.funFact}</span>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-primary" on:click={onClose}>
          Lanjutkan! 
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
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .modal-content {
    background: white;
    border-radius: 20px;
    padding: 30px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    animation: slideUp 0.3s ease;
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

  .modal-header {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 25px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f0f0f0;
  }

  .modal-icon {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 20px;
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }

  .modal-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .modal-icon .emoji {
    font-size: 50px;
  }

  .modal-title-section {
    flex: 1;
  }

  .modal-title {
    font-size: 28px;
    font-weight: 700;
    color: #333;
    margin-bottom: 10px;
  }

  .badges {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .badge {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
  }

  .badge-category {
    background: #e0e7ff;
    color: #4f46e5;
  }

  .badge-points {
    background: #fef3c7;
    color: #d97706;
  }

  .modal-body {
    margin-bottom: 25px;
  }

  .info-section {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .info-label {
    font-size: 14px;
    font-weight: 600;
    color: #666;
  }

  .info-value {
    font-size: 16px;
    line-height: 1.6;
    color: #333;
  }

  .fun-fact {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    padding: 15px;
    border-radius: 12px;
    border-left: 4px solid #f59e0b;
  }

  .fun-fact .info-value {
    font-style: italic;
  }

  .modal-footer {
    display: flex;
    justify-content: center;
    padding-top: 20px;
    border-top: 2px solid #f0f0f0;
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

  .btn-primary:active {
    transform: translateY(0);
  }
</style>