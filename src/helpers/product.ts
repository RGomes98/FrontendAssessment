import type { Product, Rating } from '@/lib/schemas/product.schema';
import { generateRandomNumberFromInterval } from '../utils/number';

function addFakeRatingToProducts(products: Product[]): (Product & Rating)[] {
  return products.map((product) => {
    const rating = generateRandomNumberFromInterval({ min: 1, max: 5 });
    return { ...product, rating };
  });
}

export { addFakeRatingToProducts };
