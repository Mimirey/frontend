<script>
	import { featureIcons } from "$lib/data/featureIcons";
	import { onMount } from "svelte";

    let floatingEmojis=[
        { src: '/images/emojis/jagung.png', x: 10, y: 20, delay: 0, duration: 6 },
        { src: '/images/emojis/beras.png', x: 80, y: 30, delay: 1, duration: 7 },
        { src: '/images/emojis/pisang.png', x: 15, y: 60, delay: 2, duration: 8 },
        { src: '/images/emojis/rebung.png', x: 85, y: 70, delay: 1.5, duration: 6.5 },
        { src: '/images/emojis/kembung.png', x: 50, y: 15, delay: 0.5, duration: 7.5 },
        { src: '/images/emojis/bayam.png', x: 25, y: 80, delay: 2.5, duration: 6.8 },
        { src: '/images/emojis/ikan.png', x: 70, y: 50, delay: 1.8, duration: 7.2 }
    ];

    let isVisible= false;

    onMount(()=>{
        setTimeout(() => {
            isVisible= true;
        }, 100);
    })
</script>
<section class="hero-section">
  <!-- Floating Background Emojis -->
  <div class="floating-emojis">
    {#each floatingEmojis as item}
      <div 
        class="floating-emoji"
        style="
          left: {item.x}%;
          top: {item.y}%;
          animation-delay: {item.delay}s;
          animation-duration: {item.duration}s;
        "
      >
        {#if item.src}
          <img src={item.src} alt="" class="emoji-img" />
        {:else}
          {item.emoji}
        {/if}
      </div>
    {/each}
  </div>

  <!-- Gradient Overlay -->
  <div class="gradient-overlay"></div>

  <!-- Hero Content -->
  <div class="hero-content" class:visible={isVisible}>
      <h1 class="hero-title">
        <span class="title-line">Jelajahi Kekayaan</span>
        <span class="title-highlight">Pangan Nusantara</span>
      </h1>

      <p class="hero-subtitle">
        Belajar tentang diversifikasi pangan lokal Indonesia melalui<br/>
        <strong>game interaktif</strong> dan <strong>katalog digital</strong> yang menyenangkan!
      </p>

      <div class="hero-features">
        <div class="feature-item">
          <img
            src={featureIcons.sun}
            alt=""
            class="feature-icon-img"
          />
          <span>Gratis & Interaktif</span>
        </div>
        <div class="feature-item">
          <img
            src={featureIcons.bright}
            alt=""
            class="feature-icon-img"
          />
          <span>3 Mini Games</span>
        </div>
        <div class="feature-item">
          <img
            src={featureIcons.moon}
            alt=""
            class="feature-icon-img"
          />
          <span>50+ Pangan Lokal</span>
        </div>
      </div>
  </div>


</section>

<style>
  .emoji-img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    opacity: 0.7;
  }
  .hero-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, oklch(64% 0.2 131.684), oklch(94% 0.129 101.54));
    overflow: hidden;
    padding: 40px 20px;
  }

  /* Floating Emojis */
  .floating-emojis {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
  }

  .floating-emoji {
    position: absolute;
    font-size: 48px;
    opacity: 0.3;
    animation: float infinite ease-in-out;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-30px) rotate(10deg);
    }
  }

  /* Gradient Overlay */
  .gradient-overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 30% 50%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    );
    z-index: 2;
  }

  /* Hero Content */
  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 2rem;
    padding: 2rem;
  }

  .hero-content.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Badge */
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 20px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 30px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    color: white;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 30px;
    animation: fadeInDown 0.6s ease-out 0.2s both;
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .badge-icon {
    font-size: 20px;
  }

  /* Title */
  .hero-title {
    font-size: clamp(40px, 6vw, 72px);
    font-weight: 800;
    color: white;
    margin-bottom: 25px;
    line-height: 1.2;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    animation: fadeInUp 0.8s ease-out 0.4s both;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .title-line {
    display: block;
  }

  .title-highlight {
    display: block;
    background: linear-gradient(90deg,oklch(30% 0.056 229.695), oklch(30% 0.056 229.695));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Subtitle */
  .hero-subtitle {
    font-size: clamp(16px, 2vw, 20px);
    color: rgba(255, 255, 255, 0.95);
    line-height: 1.8;
    margin-bottom: 40px;
    animation: fadeInUp 0.8s ease-out 0.6s both;
  }

  .hero-subtitle strong {
    color: oklch(30% 0.056 229.695);
    font-weight: 700;
  }

  /* Buttons */
  .hero-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 50px;
    animation: fadeInUp 0.8s ease-out 0.8s both;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 16px 32px;
    border-radius: 50px;
    font-size: 18px;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
    overflow: hidden;
  }

  .btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  .btn:hover::before {
    width: 300px;
    height: 300px;
  }

  .btn-primary {
    background: white;
    color: #667eea;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  .btn-primary:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.4);
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-4px);
  }

  .btn-icon {
    font-size: 24px;
  }

  .btn-arrow {
    font-size: 20px;
    transition: transform 0.3s;
  }

  .btn:hover .btn-arrow {
    transform: translateX(5px);
  }

  /* Features */
  .hero-features {
    display: flex;
    gap: 30px;
    justify-content: center;
    flex-wrap: wrap;
    animation: fadeInUp 0.8s ease-out 1s both;
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: white;
    font-size: 14px;
    font-weight: 600;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .feature-icon {
    font-size: 18px;
  }

  .feature-icon-img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    filter: drop-shadow(0 2px 6px rgba(255,255,255,0.4));
  }

  /* Scroll Indicator */
  .scroll-indicator {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: white;
    font-size: 12px;
    font-weight: 600;
    opacity: 0.7;
    animation: bounce 2s infinite;
    z-index: 10;
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    50% {
      transform: translateX(-50%) translateY(-10px);
    }
  }

  .scroll-arrow {
    font-size: 20px;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .hero-section {
      min-height: 90vh;
    }

    .hero-buttons {
      flex-direction: column;
      align-items: stretch;
    }

    .btn {
      justify-content: center;
    }

    .hero-features {
      flex-direction: column;
      align-items: center;
    }

    .floating-emoji {
      font-size: 32px;
    }
  }
</style>