<script lang="ts">
	import { cart } from '../../store/cart';
	import type { PageData } from './$types';

	export let data: PageData;

	let totalProduct: number;
	let productsIds: string[];
	$: productsIds = Object.keys($cart.products);
	$: totalProduct = productsIds.reduce((acc, id) => acc + $cart.products[id].quantity, 0);
</script>

<section>
	<h1 class="text-default font-bold text-3xl mt-10 mb-10">Products</h1>

	<h2>{totalProduct}</h2>
	{#if data.products}
		<div class="flex justify-center flex-wrap gap-5">
			{#each data.products as product, index}
				<div class="card w-72 bg-base-100 shadow-xl">
					<figure class="w-full image-full max-w-full">
						<img src={`https://picsum.photos/300/200?random=${index}`} alt="Shoes" />
					</figure>
					<div class="card-body">
						<h2 class="card-title">{product.name}</h2>
						<p>{product.description}</p>
						<div class="divider"></div>
						<div class="card-actions justify-end">
							{#if productsIds.includes(product.id)}
								<button class="btn btn-primary" on:click={() => cart.removeProduct(product.id)}
									>Remove</button
								>
							{/if}
							<button class="btn btn-primary" on:click={() => cart.addProduct(product)}
								>Add to cart</button
							>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</section>
