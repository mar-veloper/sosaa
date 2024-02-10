<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { cart } from '../../store/cart';
	import { flip } from 'svelte/animate';

	$: productsKeys = Object.keys($cart.products);
	$: cartItems = productsKeys.map((key) => $cart.products[key]);
</script>

<div class="drawer-side z-10">
	<label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
	<ul class="menu p-4 w-200 min-h-full bg-base-200 text-base-content">
		<h3 class="text-2xl w-200 mb-10 font-semibold">My cart</h3>

		{#if !cartItems.length}
			<p>Your cart is empty at the moment.</p>
		{:else}
			{#each cartItems as item (item.product.id)}
				<article
					class="card card-side bg-base-100 shadow-xl mb-5"
					animate:flip={{ delay: 250, duration: 250, easing: quintOut }}
				>
					<figure class="max-w-16">
						<img
							src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
							alt="Album"
						/>
					</figure>
					<div class="card-body p-2 w-64 flex flex-row justify-between">
						<div class="w-3/4">
							<h4 class="text-md">{item.product.name}</h4>
							<div class="card-actions">
								<button
									type="button"
									class="badge badge-outline p-1 hover:bg-error hover:text-neutral"
									on:click={() => cart.removeProduct(item.product.id)}>-</button
								>
								<span>{item.quantity}</span>
								<button
									type="button"
									class="badge badge-outline p-1 hover:bg-dark hover:text-light"
									on:click={() => cart.addProduct(item.product)}>+</button
								>
							</div>
						</div>
						<p class="text-right h-full flex justify-center items-center">
							<span class="text-lg font-semibold mr-1"
								>{(item.product.price * item.quantity).toFixed(2)}</span
							>
							NOK
						</p>
					</div>
				</article>
			{/each}
		{/if}
	</ul>
</div>
