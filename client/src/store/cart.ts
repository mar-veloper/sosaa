import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import { getLocalStorage, setLocalStorage } from '../helpers/localStorage';
import type { Product } from '../routes/products/product.types';

interface Cart {
	id: string;
	sessionId?: string;
	userId?: string;
	products: {
		[key: string]: CartItem;
	};
}

interface CartItem {
	quantity: number;
	product: Product;
}

const createCart = () => {
	const localCart = getLocalStorage('localCart');
	const newCart = {
		id: uuidv4(),
		sessionId: uuidv4(),
		products: {}
	};

	let cartProps = localCart ? localCart : newCart;

	const { subscribe, update } = writable<Cart>(cartProps);

	function addProduct(product: Product) {
		return update((cart) => {
			const { products } = cart;
			const existingProduct = products[product.id];

			if (existingProduct) {
				const updatedProduct = {
					...existingProduct,
					quantity: existingProduct.quantity + 1
				};

				return {
					...cart,
					products: {
						...products,
						[product.id]: { ...updatedProduct }
					}
				};
			}

			const newProduct = {
				quantity: 1,
				product
			};

			return {
				...cart,
				products: {
					[product.id]: { ...newProduct },
					...products
				}
			};
		});
	}

	function removeProduct(productId: string) {
		return update((cart) => {
			const { products } = cart;
			const existingProduct = products[productId];

			if (existingProduct && existingProduct.quantity > 1) {
				const updatedProduct = {
					...existingProduct,
					quantity: existingProduct.quantity - 1
				};

				return {
					...cart,
					products: {
						...products,
						[productId]: updatedProduct
					}
				};
			}

			const newProducts = {
				...products
			};

			delete newProducts[productId];

			return {
				...cart,
				products: newProducts
			};
		});
	}

	function clearCart() {
		return update((cart) => ({
			...cart,
			products: {}
		}));
	}

	subscribe((cart) => {
		setLocalStorage('localCart', cart);
		3;
	});

	return {
		subscribe,
		addProduct,
		removeProduct,
		clearCart
	};
};

export const cart = createCart();
