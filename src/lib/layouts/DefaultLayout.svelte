<script>
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
	import FAB from '$lib/components/layout/FAB.svelte';
</script>

<Navbar />
<main class="min-h-screen pt-16">
    <slot />
    <FAB/>
</main>
