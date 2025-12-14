<script>
	import { onMount } from "svelte";
	import Player from "./Player.svelte";
	import PanganItem from "./PanganItem.svelte";
	import ParticleEffect from "./ParticleEffect.svelte";

    export let map;
    export let player;
    export let items= [];
    export let useImages= false;
    export let backgroundImage='';

    let particles= [];

    export function createParticles(x,y, color='#FFD700') {
        const particleSet= [];
        for (let i = 0; i < 12; i++) {
            const angle = (Math.PI * 2*i)/12;
            const speed= 2 + Math.random() * 2;

            particleSet.push({
                id: Date.now()+ i,
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: color,
                life:1
            });
        }
        particles =[...particles,...particleSet];

        setTimeout(()=>{
            particles=particles.filter(p=> !particleSet.includes(p));
        }, 1000);
    }
</script>

<div
  class="game-map"
  style="
    width: {map.width}px;
    height: {map.height}px;
    transform: translate({-map.offsetX}px, {-map.offsetY}px);
    background-image: {backgroundImage ? `url(${backgroundImage})` : 'none'};
  "
>
  <!-- Background decorations -->
  <!-- <div class="decorations">
    <div class="cloud cloud1"></div>
    <div class="cloud cloud2"></div>
    <div class="cloud cloud3"></div>
    <div class="tree" style="left: 300px; top: 200px;">🌳</div>
    <div class="tree" style="left: 800px; top: 400px;">🌳</div>
    <div class="tree" style="left: 1500px; top: 300px;">🌳</div>
    <div class="tree" style="left: 2000px; top: 600px;">🌳</div>
    
    <div class="house" style="left: 600px; top: 800px;">🏠</div>
    <div class="house" style="left: 1800px; top: 1200px;">🏠</div>
  </div> -->

  <!-- Items -->
  {#each items as item (item.id)}
    <PanganItem {item} {map} {useImages} />
  {/each}

  <!-- Player -->
  <Player {player} {map} useImage={useImages} />

  <!-- Particles -->
  {#each particles as particle (particle.id)}
    <ParticleEffect {particle} {map} />
  {/each}
</div>

<style>
  .game-map {
    position: absolute;
    top: 0;
    left: 0;

    background-size: 100% 100%;       
    background-repeat: no-repeat;
    background-position: center;

    transition: transform 0.05s linear;
    will-change: transform;
  }

  .decorations {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }

  .cloud {
    position: absolute;
    background: white;
    border-radius: 100px;
    opacity: 0.7;
    animation: floatCloud 40s infinite linear;
  }

  .cloud::before,
  .cloud::after {
    content: '';
    position: absolute;
    background: white;
    border-radius: 100px;
  }

  .cloud1 {
    width: 100px;
    height: 50px;
    top: 100px;
    left: -150px;
  }

  .cloud1::before {
    width: 50px;
    height: 50px;
    top: -25px;
    left: 20px;
  }

  .cloud1::after {
    width: 60px;
    height: 40px;
    top: -15px;
    right: 20px;
  }

  .cloud2 {
    width: 120px;
    height: 60px;
    top: 250px;
    left: -200px;
    animation-delay: -20s;
  }

  .cloud2::before {
    width: 60px;
    height: 60px;
    top: -30px;
    left: 25px;
  }

  .cloud2::after {
    width: 70px;
    height: 50px;
    top: -20px;
    right: 25px;
  }

  .cloud3 {
    width: 90px;
    height: 45px;
    top: 450px;
    left: -120px;
    animation-delay: -10s;
  }

  .cloud3::before {
    width: 45px;
    height: 45px;
    top: -22px;
    left: 18px;
  }

  .cloud3::after {
    width: 55px;
    height: 38px;
    top: -15px;
    right: 18px;
  }

  @keyframes floatCloud {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(2600px);
    }
  }

  .tree {
    position: absolute;
    font-size: 60px;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
    animation: sway 4s ease-in-out infinite;
    z-index: 10;
  }

  @keyframes sway {
    0%, 100% {
      transform: rotate(-2deg);
    }
    50% {
      transform: rotate(2deg);
    }
  }

  .house {
    position: absolute;
    font-size: 80px;
    filter: drop-shadow(0 6px 12px rgba(0,0,0,0.3));
    z-index: 10;
  }
</style>