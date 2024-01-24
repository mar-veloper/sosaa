import { writable } from 'svelte/store';
import type { Product } from '../../routes/products/product.types';
import { v4 as uuidv4 } from 'uuid';

interface Cart {
	id: string;
	userId: string;
	products: {
		[key: string]: CartItem;
	};
}

interface CartItem {
	quantity: number;
	product: Product;
}

interface Props {
	userId: string;
}

const createCart = ({ userId }: Props) => {
	const { subscribe, update } = writable<Cart>({
		id: uuidv4(),
		userId,
		products: {}
	});

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
						[product.id]: updatedProduct
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
					...products,
					[product.id]: newProduct
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

	return {
		subscribe,
		addProduct,
		removeProduct,
		clearCart
	};
};

export const cart = createCart;
