<script>
	import { onMount } from "svelte";
	import { fade, fly } from "svelte/transition";

    let isVisible= false;
    let activeStep= 0;

    const steps=[
        {
        number: 1,
        src: '/images/characters/pilih',
        title: 'Pilih Game',
        description: 'Pilih salah satu dari 4 mini games edukatif yang tersedia',
        color: '#667eea',
        },
        {
        number: 2,
        src: '/images/characters/bermain',
        title: 'Main & Belajar',
        description: 'Nikmati gameplay yang seru sambil belajar tentang pangan lokal',
        color: '#f59e0b',
        },
        {
        number: 3,
         src: '/images/characters/insight',
        title: 'Dapatkan Insight',
        description: 'Raih score tinggi dan pelajari fakta menarik setiap pangan',
        color: '#10b981',
        },
        {
        number: 4,
        src: '/images/characters/eksplor',
        title: 'Eksplor Katalog',
        description: 'Buka katalog digital untuk info lengkap semua pangan',
        color: '#8b5cf6',
        }
    ];

    onMount(()=>{
        const observer = new IntersectionObserver(
            (entries)=>{
                entries.forEach(entry=>{
                    if (entry.isIntersecting) {
                        isVisible=true;
                    }
                });
            },
            {threshold: 0.2}
        );

        const section= document.querySelector('.how-it-works');
        if (section) observer.observe(section);

        const interval = setInterval(() => {
            activeStep= (activeStep + 1) % steps.length;
        }, 3000);

        return ()=>{
            observer.disconnect();
            clearInterval(interval);
        }
    })
</script>

<section class="how-it-works">
  <div class="container">
    <div class="section-header" class:visible={isVisible}>
      <span class="section-badge">
        <span>Cara Kerja</span>
      </span>
      <h2 class="section-title">
        Mulai Petualangan dalam <span class="highlight">4 Langkah</span>
      </h2>
      <p class="section-subtitle">
        Belajar tentang diversifikasi pangan belum pernah semudah ini!
      </p>

    <div class="steps-container" class:visible={isVisible}>
      {#each steps as step, index (step.number)}
        <div 
          class="step-card"
          class:active={activeStep === index}
          style="--step-color: {step.color}; --delay: {index * 0.1}s"
        >
          <div class="step-number">
            <span>{step.number}</span>
          </div>
          <div class="step-icon">
            <img
              src="{step.src}.jpg"
              alt={step.title}
              class="step-image"
              loading="lazy"
            />
          </div>
          <div class="step-content">
            <h3 class="step-title">{step.title}</h3>
            <p class="step-description">{step.description}</p>
          </div>
          {#if index < steps.length - 1}
            <div class="step-arrow">
              <svg width="40" height="40" viewBox="0 0 40 40">
                <path d="M 10 20 L 30 20 M 30 20 L 25 15 M 30 20 L 25 25" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  fill="none"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          {/if}
        </div>
      {/each}
    </div>
    </div>
  </div>
</section>

<style>
  .how-it-works {
    padding: 100px 20px;
    background: linear-gradient(180deg, oklch(98% 0.016 73.684), oklch(98% 0.016 73.684));
    position: relative;
    overflow: hidden;
  }

  /* Background Pattern */
  .how-it-works::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* Section Header */
  .section-header {
    text-align: center;
    margin-bottom: 80px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .section-header.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .section-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 20px;
    background: linear-gradient(135deg, oklch(82% 0.189 84.429), oklch(65.386% 0.13406 82.693));
    color: white;
    border-radius: 30px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 20px;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  .badge-icon {
    font-size: 18px;
  }

  .section-title {
    font-size: clamp(32px, 4vw, 48px);
    font-weight: 800;
    color: #1f2937;
    margin-bottom: 16px;
    line-height: 1.3;
  }

  .highlight {
    background: linear-gradient(135deg, oklch(40% 0.101 131.063), oklch(62% 0.194 149.214));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .section-subtitle {
    font-size: 18px;
    color: #6b7280;
    max-width: 600px;
    margin: 0 auto;
  }

  /* Steps Container */
  .steps-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    margin-bottom: 80px;
    position: relative;
  }

  .steps-container.visible .step-card {
    animation: slideInUp 0.6s ease-out both;
    animation-delay: var(--delay);
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Step Card */
  .step-card {
    position: relative;
    background: white;
    border-radius: 24px;
    padding: 32px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    cursor: pointer;
    border: 2px solid transparent;
  }

  .step-card:hover {
    transform: translateY(-12px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    border-color: var(--step-color);
  }

  .step-card.active {
    border-color: var(--step-color);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.12),
      0 0 0 4px var(--step-color)20;
  }

  /* Step Number */
  .step-number {
    position: absolute;
    top: -15px;
    left: 32px;
    width: 40px;
    height: 40px;
    background: var(--step-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 20px;
    box-shadow: 0 4px 12px var(--step-color)40;
  }

  /* Step Icon */
  .step-icon {
    position: relative;
    width: 100px;
    height: 100px;
    margin: 0 auto 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-main {
    font-size: 56px;
    position: relative;
    z-index: 2;
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1));
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .icon-illustration {
    position: absolute;
    font-size: 32px;
    opacity: 0.3;
    animation: rotate 4s linear infinite;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Step Content */
  .step-content {
    text-align: center;
  }

  .step-title {
    font-size: 22px;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 12px;
  }

  .step-description {
    font-size: 15px;
    color: #6b7280;
    line-height: 1.6;
  }

  /* Step Arrow */
  .step-arrow {
    position: absolute;
    right: -30px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--step-color);
    opacity: 0.4;
    display: none;
  }

  @media (min-width: 1024px) {
    .steps-container {
      grid-template-columns: repeat(4, 1fr);
    }
    
    .step-arrow {
      display: block;
    }
  }

  /* Demo Section */
  .demo-section {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 32px;
    padding: 60px 40px;
    text-align: center;
    box-shadow: 0 20px 60px rgba(102, 126, 234, 0.4);
    opacity: 0;
    transform: scale(0.95);
    transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .demo-section.visible {
    opacity: 1;
    transform: scale(1);
  }

  .demo-title {
    font-size: 32px;
    font-weight: 700;
    color: white;
    margin-bottom: 12px;
  }

  .demo-text {
    color: rgba(255, 255, 255, 0.9);
    font-size: 16px;
    margin-bottom: 40px;
  }

  /* Demo Preview */
  .demo-preview {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 32px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    gap: 24px;
    text-align: left;
    transition: all 0.3s;
  }

  .preview-icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    flex-shrink: 0;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.3);
  }

  .preview-content h4 {
    font-size: 24px;
    font-weight: 700;
    color: white;
    margin-bottom: 8px;
  }

  .preview-content p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 15px;
    line-height: 1.6;
  }

  /* Progress Dots */
  .progress-dots {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-bottom: 40px;
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    border: none;
    cursor: pointer;
    transition: all 0.3s;
    padding: 0;
  }

  .dot.active {
    background: var(--dot-color);
    width: 32px;
    border-radius: 6px;
    box-shadow: 0 0 20px var(--dot-color);
  }

  .dot:hover:not(.active) {
    background: rgba(255, 255, 255, 0.5);
    transform: scale(1.2);
  }

  /* CTA Button */
  .demo-cta {
    margin-top: 40px;
  }

  .btn-demo {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 16px 40px;
    background: white;
    color: #667eea;
    border-radius: 50px;
    font-size: 18px;
    font-weight: 700;
    text-decoration: none;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .btn-demo:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  }

  .btn-icon {
    font-size: 24px;
    transition: transform 0.3s;
  }

  .btn-demo:hover .btn-icon {
    transform: rotate(15deg) scale(1.2);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .how-it-works {
      padding: 60px 20px;
    }

    .section-header {
      margin-bottom: 50px;
    }

    .steps-container {
      gap: 30px;
      margin-bottom: 50px;
    }

    .step-card {
      padding: 24px;
    }

    .step-icon {
      width: 80px;
      height: 80px;
    }

    .icon-main {
      font-size: 48px;
    }

    .demo-section {
      padding: 40px 24px;
      border-radius: 24px;
    }

    .demo-preview {
      flex-direction: column;
      text-align: center;
    }

    .preview-content {
      text-align: center;
    }
  }
</style>