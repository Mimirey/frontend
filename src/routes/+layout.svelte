<script>
	// import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import "../app.css";
	import DefaultLayout from '$lib/layouts/DefaultLayout.svelte';
	
	let { children } = $props();
</script>


<DefaultLayout>
  {@render children()}
</DefaultLayout>


