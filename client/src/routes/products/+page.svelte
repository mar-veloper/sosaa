<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	<h1>Products available:</h1>

	{#if data.products}
		{#each data.products as product}
			<h3>{product.name}</h3>
			<p>{product.description}</p>
			<p>Price: {product.price}</p>
		{/each}
	{/if}
</main>
