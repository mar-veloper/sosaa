<script type="ts">
	import Header from '$lib/Layout/Header.svelte';
	import '../app.css';
</script>

<Header />
<main class="max-w-screen-xl mx-auto p-2">
	<slot />
</main>
<footer>This is footer</footer>
