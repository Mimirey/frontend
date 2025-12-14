<script>
  export let title = "Card Title";
  export let description = "Card description";
  export let image = null;
  export let buttonText = "Play";
  export let onClick = () => {};
  export let disabled = false;
  export let horizontal= false;
  export let showButton=true;
  export let cardHeight= null;
  export let minHeight= null;
  
  import comingSoon from '$lib/assets/coming soon.jpg';
  $: displayImage = image || comingSoon;
</script>

<div 
  class="card bg-base-100 w-96 shadow-sm hover:shadow-lg transition-shadow 
    {disabled ? 'opacity-50 cursor-not-allowed hover:shadow-none' : 'cursor-pointer'}
    {horizontal ? 'flex flex-row h-48' : ''}
    {cardHeight}
    {minHeight}"

  on:click={() => !disabled && onClick()}
  on:keypress={(e) => e.key === 'Enter' && !disabled && onClick()}
  role="button"
  tabindex="0"
>
  
  <figure class="{horizontal ? 'w-1/2 h-full' : 'relative'}">
    <img
      src="{displayImage}"
      alt="{title}" 
      class="{horizontal ? 'w-full h-full object-cover' : 'w-full h-48 object-cover'}"/>
    <div class="absolute top-2 right-2">
      <slot name="badge" />
    </div>
  </figure>


  <div class="card-body {horizontal ? 'p-4 w-1/2' : ''}">
    <h2 
      class="card-title">{title}
      <slot name="title-extra" />
    </h2>
    <p>{description}</p>

    {#if showButton}
  <div class="card-actions justify-end mt-4">
    <slot name="actions">
      <button 
        class="btn btn-primary"
        disabled={disabled}
        on:click|stopPropagation={() => !disabled && onClick()}
      >
        {buttonText}
      </button>
    </slot>
  </div>
{/if}
  </div>
</div>

<style>
  .card {
    transition: transform 0.2s;
  }
  
  .card:hover {
    transform: translateY(-4px);
  }
</style>