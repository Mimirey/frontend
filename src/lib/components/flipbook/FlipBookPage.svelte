<script>
    export let page;
    export let side= 'left';

    $: pageNumber= page.pageNumber || '';
</script>
<div class="flipbook-page {page.type}" class:left={side === 'left'} class:right={side === 'right'}>
  {#if page.type === 'cover'}
    <!-- Cover Page -->
    <div class="cover-page">
      <div class="cover-decoration">
        <div class="pattern"></div>
      </div>
      <div class="cover-content">
        <div class="cover-icon">📚</div>
        <h1 class="cover-title">{page.title}</h1>
        <p class="cover-subtitle">{page.subtitle}</p>
        <div class="cover-badge">PanganMu</div>
      </div>
    </div>

  {:else if page.type === 'toc'}
    <!-- Table of Contents -->
    <div class="toc-page">
      <h2 class="toc-title">{page.title}</h2>
      <div class="toc-divider"></div>
      <ul class="toc-list">
        {#each page.sections as section}
          <li class="toc-item">
            <span class="toc-name">{section.name}</span>
            <span class="toc-dots"></span>
            <span class="toc-page-num">{section.page}</span>
          </li>
        {/each}
      </ul>
    </div>

  {:else if page.type === 'section-intro'}
  <div class="section-intro" style="--section-color: {page.color}">
    
    {#if page.icon}
      <div class="section-icon">
        <img
          src={page.icon}
          alt={page.title}
          class="section-icon-img"
        />
      </div>
    {/if}

    <h2 class="section-title">{page.title}</h2>
    <p class="section-subtitle">{page.subtitle}</p>
    <div class="section-divider"></div>
    <p class="section-description">{page.description}</p>
  </div>

  {:else if page.type === 'item'}
    <!-- Pangan Item Detail -->
    <div class="item-page">
      <div class="item-header">
        <h3 class="item-nama">{page.nama}</h3>
        <p class="item-ilmiah">{page.namaIlmiah}</p>
        <span class="item-badge" style="background: {getCategoryColor(page.kategori)}">
          {page.kategori}
        </span>
      </div>

      {#if page.image}
        <div class="item-image">
          <img src={page.image} alt={page.nama} />
        </div>
      {/if}

      <div class="item-content">
        <div class="item-section">
          <h4 class="section-heading">📍 Asal</h4>
          <p>{page.asal}</p>
        </div>

        <div class="item-section">
          <h4 class="section-heading"> Deskripsi</h4>
          <p class="item-description">{page.deskripsi}</p>
        </div>

        {#if page.kandunganGizi}
          <div class="item-section">
            <h4 class="section-heading"> Kandungan Gizi (per 100g)</h4>
            <div class="nutrition-grid">
              {#each Object.entries(page.kandunganGizi) as [key, value]}
                <div class="nutrition-item">
                  <span class="nutrition-label">{formatLabel(key)}</span>
                  <span class="nutrition-value">{value}</span>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        {#if page.manfaat && page.manfaat.length > 0}
          <div class="item-section">
            <h4 class="section-heading"> Manfaat</h4>
            <ul class="benefits-list">
              {#each page.manfaat as manfaat}
                <li>✓ {manfaat}</li>
              {/each}
            </ul>
          </div>
        {/if}

        {#if page.olahanPopuler && page.olahanPopuler.length > 0}
          <div class="item-section">
            <h4 class="section-heading"> Olahan Populer</h4>
            <div class="olahan-tags">
              {#each page.olahanPopuler as olahan}
                <span class="olahan-tag">{olahan}</span>
              {/each}
            </div>
          </div>
        {/if}

        {#if page.funFact}
          <div class="fun-fact">
            <span class="fun-fact-icon">💡</span>
            <p class="fun-fact-text">{page.funFact}</p>
          </div>
        {/if}
      </div>
    </div>

  {:else if page.type === 'back-cover'}
    <!-- Back Cover -->
    <div class="back-cover">
      <div class="back-cover-content">
        <div class="back-icon">🌾</div>
        <p class="back-message">{page.message}</p>
        {#if page.qr}
          <div class="qr-code">
            <img src={page.qr} alt="QR Code" />
            <p class="qr-label">Scan untuk info lebih lanjut</p>
          </div>
        {/if}
      </div>
    </div>

  {:else}
    <!-- Blank Page -->
    <div class="blank-page">
      <p class="blank-text">Halaman kosong</p>
    </div>
  {/if}

  <!-- Page Number -->
  {#if pageNumber && page.type !== 'cover' && page.type !== 'back-cover'}
    <div class="page-number">{pageNumber}</div>
  {/if}
</div>

<script context="module">
    function getCategoryColor(kategori) {
        const colors={
            'karbohidrat': '#fbbf24',
            'protein': '#ef4444',
            'sayuran': '#10b981',
            'buah': '#8b5cf6'
        };
        return colors[kategori] || '#6b7280';
    }
    function formatLabel(key) {
        const labels={
            'kalori':'Kalori',
            'karbohidrat':'Karbohidrat',
            'protein':'Protein',
            'lemak':'Lemak',
            'serat':'Serat',
            'vitaminA':'Vitamin A',
            'vitaminB':'Vitamin B',
            'vitaminC':'Vitamin C',
            'antosianin':'Antosianin',
            'probiotik':'Probiotik'
        };
        return labels[key] || key;
    }
</script>

<style>
  .flipbook-page {
    width: 100%;
    height: 100%;
    padding: 40px;
    box-sizing: border-box;
    background: #fefefe;
    position: relative;
    overflow-y: auto;
  }

  .flipbook-page::-webkit-scrollbar {
    width: 6px;
  }

  .flipbook-page::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  .flipbook-page::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }

  /* Page Number */
  .page-number {
    position: absolute;
    bottom: 20px;
    font-size: 12px;
    color: #999;
    font-weight: 600;
  }

  .flipbook-page.left .page-number {
    left: 40px;
  }

  .flipbook-page.right .page-number {
    right: 40px;
  }

  /* ===== COVER PAGE ===== */
  .cover-page {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .cover-decoration {
    position: absolute;
    inset: 0;
    opacity: 0.1;
  }

  .pattern {
    width: 100%;
    height: 100%;
    background-image: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 20px,
      rgba(255,255,255,0.1) 20px,
      rgba(255,255,255,0.1) 40px
    );
  }

  .cover-content {
    position: relative;
    z-index: 1;
  }

  .cover-icon {
    font-size: 80px;
    margin-bottom: 20px;
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .cover-title {
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 16px;
    text-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }

  .cover-subtitle {
    font-size: 20px;
    opacity: 0.9;
    margin-bottom: 40px;
  }

  .cover-badge {
    display: inline-block;
    padding: 10px 30px;
    background: rgba(255,255,255,0.2);
    backdrop-filter: blur(10px);
    border-radius: 30px;
    font-weight: 700;
    border: 2px solid rgba(255,255,255,0.3);
  }

  /* ===== TABLE OF CONTENTS ===== */
  .toc-page {
    padding: 20px 0;
  }

  .toc-title {
    font-size: 36px;
    font-weight: 700;
    color: #333;
    margin-bottom: 10px;
    text-align: center;
  }

  .toc-divider {
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    margin: 0 auto 30px;
    border-radius: 2px;
  }

  .toc-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .toc-item {
    display: flex;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
    font-size: 18px;
  }

  .toc-name {
    font-weight: 600;
    color: #333;
  }

  .toc-dots {
    flex: 1;
    border-bottom: 2px dotted #ddd;
    margin: 0 15px;
  }

  .toc-page-num {
    font-weight: 700;
    color: #667eea;
    min-width: 40px;
    text-align: right;
  }

  /* ===== SECTION INTRO ===== */
  .section-intro {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: linear-gradient(135deg, var(--section-color), transparent);
  }

  .section-icon {
    font-size: 100px;
    margin-bottom: 20px;
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2));
  }

  .section-title {
    font-size: 48px;
    font-weight: 700;
    color: #333;
    margin-bottom: 10px;
  }

  .section-subtitle {
    font-size: 24px;
    color: #666;
    margin-bottom: 30px;
  }

  .section-divider {
    width: 150px;
    height: 3px;
    background: var(--section-color);
    margin-bottom: 30px;
    border-radius: 2px;
  }

  .section-description {
    max-width: 400px;
    font-size: 16px;
    line-height: 1.8;
    color: #555;
  }

  /* ===== ITEM PAGE ===== */
  .item-page {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .item-header {
    border-bottom: 3px solid #667eea;
    padding-bottom: 15px;
  }

  .item-nama {
    font-size: 32px;
    font-weight: 700;
    color: #333;
    margin-bottom: 5px;
  }

  .item-ilmiah {
    font-size: 16px;
    font-style: italic;
    color: #666;
    margin-bottom: 10px;
  }

  .item-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    color: white;
    text-transform: uppercase;
  }

  .item-image {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  }

  .item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .item-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .item-section {
    background: #f9fafb;
    padding: 15px;
    border-radius: 8px;
  }

  .section-heading {
    font-size: 16px;
    font-weight: 700;
    color: #333;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .item-description {
    font-size: 14px;
    line-height: 1.8;
    color: #555;
  }

  .nutrition-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .nutrition-item {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    padding: 8px;
    background: white;
    border-radius: 6px;
  }

  .nutrition-label {
    color: #666;
  }

  .nutrition-value {
    font-weight: 700;
    color: #333;
  }

  .benefits-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .benefits-list li {
    font-size: 14px;
    color: #555;
    line-height: 1.6;
    padding-left: 5px;
  }

  .olahan-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .olahan-tag {
    padding: 6px 12px;
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    color: #555;
  }

  .fun-fact {
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    padding: 15px;
    border-radius: 8px;
    border-left: 4px solid #f59e0b;
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }

  .fun-fact-icon {
    font-size: 24px;
    flex-shrink: 0;
  }

  .fun-fact-text {
    font-size: 13px;
    line-height: 1.6;
    color: #555;
    font-style: italic;
  }

  /* ===== BACK COVER ===== */
  .back-cover {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
    color: white;
  }

  .back-cover-content {
    text-align: center;
  }

  .back-icon {
    font-size: 80px;
    margin-bottom: 20px;
  }

  .back-message {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 40px;
  }

  .qr-code {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .qr-code img {
    width: 150px;
    height: 150px;
    background: white;
    padding: 10px;
    border-radius: 12px;
    margin-bottom: 15px;
  }

  .qr-label {
    font-size: 14px;
    opacity: 0.9;
  }

  /* ===== BLANK PAGE ===== */
  .blank-page {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .blank-text {
    color: #ccc;
    font-style: italic;
  }

  .section-icon-img {
    width: 96px;
    height: 96px;
    object-fit: contain;
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2));
  }

  /* Responsive */
  @media (max-width: 768px) {
    .flipbook-page {
      padding: 20px;
    }

    .cover-title {
      font-size: 32px;
    }

    .item-nama {
      font-size: 24px;
    }

    .section-title {
      font-size: 36px;
    }
  }
</style>