import type { PageServerLoad } from './$types';
import type { Product } from './product.types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch('http://localhost:3030/api/products');
		const products: Product[] = await response.json();
		return {
			products
		};
	} catch (error) {
		console.log(error);
	}
};
