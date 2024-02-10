<script type="ts">
	import Header from '../lib/Layout/Header.svelte';
	import '../app.css';
	import SidebarCart from '$lib/Cart/SidebarCart.svelte';
</script>

<div class="drawer drawer-end overflow-hidden">
	<input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<Header />
		<main class="max-w-screen-xl mx-auto p-2">
			<slot />
		</main>
		<footer>This is footer</footer>
	</div>

	<SidebarCart />
</div>
