<script>
	import { featureIcons } from "$lib/data/featureIcons";
	import { panganData } from "$lib/data/panganMapData";
	import { onMount } from "svelte";

    let mapContainer;
    let map;
    let selectedRegion=null;

    function getIconForCategory(category) {
      switch (category) {
        case 'karbohidrat':
          return '/images/emojis/beras.png';
        case 'sayur':
          return '/images/emojis/bayam.png';
        case 'buah':
          return '/images/emojis/pepeya.png';
        case 'protein':
          return '/images/emojis/ayam.png';
        default:
          return '/images/emojis/default.png';
      }
    }

    onMount(async () => {
        // Dynamically import Leaflet CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
        
        // Import Leaflet
        const L = (await import('leaflet')).default;
        
        // Fix for default marker icons
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });
        
        // Initialize map centered on Indonesia
        map = L.map(mapContainer, {
        zoomControl: true,
        scrollWheelZoom: true
        }).setView([-2.5489, 118.0149], 5);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
        }).addTo(map);
        
        // Add markers for each region
        panganData.forEach(region => {
        const iconSrc = getIconForCategory(region.category);
        // Create custom icon with color
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `
            <div style="
                background-color: ${region.color};
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 4px 6px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            ">
                <img 
                  src="${iconSrc}"
                  style="width: 26px; height: 26px; object-fit: contain;"
                />
            </div>
        `,
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });
        
        const marker = L.marker([region.lat, region.lng], { icon: customIcon })
            .addTo(map);
        
        // Popup content
        const popupContent = `
            <div style="min-width: 200px;">
            <h3 style="font-weight: bold; font-size: 18px; margin-bottom: 8px; color: ${region.color};">
                ${region.region}
            </h3>
            <p style="margin: 4px 0;"><strong>Pangan Utama:</strong> ${region.mainFood}</p>
            <p style="margin: 4px 0; font-size: 14px;">${region.description}</p>
            </div>
        `;
        
        marker.bindPopup(popupContent);
        
        // Click event
        marker.on('click', () => {
            selectedRegion = region;
            map.flyTo([region.lat, region.lng], 7, {
            duration: 1.5
            });
        });
        });
        
        return () => {
        if (map) map.remove();
        };
    });

    function resetView() {
        if (map) {
            map.flyTo([-2.5489, 118.0149], 5, { duration: 1.5 });
            selectedRegion = null;
        }
    }
</script>

<div class="w-full h-screen bg-base-200 p-4">
  <div class="container mx-auto h-full flex flex-col gap-4">
    <!-- Header -->
    <div class="bg-gradient-to-r from-primary to-secondary p-6 rounded-lg shadow-xl">
          
      <h1 class="text-3xl font-bold text-white mb-2">
        <img
            src={featureIcons.map}
            alt=""
            class="feature-icon-img"
        />
         Peta Pangan Nusantara
      </h1>
      <p class="text-white/90">
        Jelajahi kekayaan pangan lokal Indonesia dari Sabang sampai Merauke
      </p>
    </div>
    
    <div class="flex-1 flex gap-4 flex-col lg:flex-row">
      <!-- Map Container -->
      <div class="flex-1 relative rounded-lg overflow-hidden shadow-xl">
        <div bind:this={mapContainer} class="w-full h-full min-h-[400px]"></div>
        
        {#if selectedRegion}
          <button 
            on:click={resetView}
            class="btn btn-circle btn-primary absolute top-4 right-4 shadow-lg z-[1000]"
          >
            ↩️
          </button>
        {/if}
      </div>
      
      <!-- Info Panel -->
      <div class="lg:w-96 flex flex-col gap-4">
        {#if selectedRegion}
          <!-- Detail Card -->
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title text-2xl" style="color: {selectedRegion.color}">
                {selectedRegion.region}
              </h2>
              
              <div class="divider"></div>
              
              <div class="space-y-3">
                <div>
                  <h3 class="font-bold text-lg mb-2"> Pangan Lokal:</h3>
                  <div class="flex flex-wrap gap-2">
                    {#each selectedRegion.foods as food}
                      <div class="badge badge-primary badge-lg">{food}</div>
                    {/each}
                  </div>
                </div>
                
                <div>
                  <h3 class="font-bold text-lg mb-2">🍳 Resep Tradisional:</h3>
                  <ul class="space-y-1">
                    {#each selectedRegion.recipes as recipe}
                      <li class="flex items-center gap-2">
                        <span class="text-primary">•</span>
                        {recipe}
                      </li>
                    {/each}
                  </ul>
                </div>
                
                <div class="alert alert-info">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span class="text-sm">{selectedRegion.description}</span>
                </div>
              </div>
            </div>
          </div>
        {:else}
          <!-- Welcome Card -->
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Selamat Datang!</h2>
              <p class="text-sm">
                Klik marker pada peta untuk melihat detail pangan lokal dari setiap wilayah di Indonesia.
              </p>
              
              <div class="divider"></div>
              
              <h3 class="font-bold mb-2">Legenda:</h3>
              <div class="space-y-2">
                {#each panganData as region}
                  <div class="flex items-center gap-3">
                    <div 
                      class="w-4 h-4 rounded-full"
                      style="background-color: {region.color}"
                    ></div>
                    <span class="text-sm">{region.region}</span>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        {/if}
        
        <!-- Stats Card -->
        <div class="stats stats-vertical shadow-xl">
          <div class="stat">
            <div class="stat-figure text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
              </svg>
            </div>
            <div class="stat-title">Total Wilayah</div>
            <div class="stat-value text-primary">{panganData.length}</div>
            <div class="stat-desc">Tersebar di Nusantara</div>
          </div>
          
          <div class="stat">
            <div class="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
              </svg>
            </div>
            <div class="stat-title">Jenis Pangan</div>
            <div class="stat-value text-secondary">25+</div>
            <div class="stat-desc">Alternatif pengganti beras</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  :global(.leaflet-popup-content-wrapper) {
    border-radius: 8px;
  }
  
  :global(.leaflet-popup-content) {
    margin: 12px;
  }

  .feature-icon-img{
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
</style>