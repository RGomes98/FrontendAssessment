import type { Product } from '@/lib/schemas/product.schema';
import { generateRandomNumberFromInterval } from '@/utils/number.utils';
import type { ProductState } from '@/lib/store/product.store';

function addFakeRatingToProducts(products: Omit<Product, 'rating'>[]): Product[] {
  return products.map((product) => {
    const rating = generateRandomNumberFromInterval({ min: 1, max: 5 });
    return { ...product, rating };
  });
}

function sliceProductResponseTitle(products: Product[]): Product[] {
  return products.map((product) => ({ ...product, title: product.title.slice(0, 30).trim() }));
}

function narrowProductResponseData({ products }: { products: ProductState['products'] }) {
  return products.response?.data ?? [];
}

function formatProductPrice({ price }: { price: number }) {
  const formatter = new Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency' });
  return formatter.format(price);
}

function extractCategoriesFromProducts({ products }: { products: Product[] }) {
  const categories = products.map(({ category }) => category) ?? [];
  return [...new Set(categories)];
}

export {
  addFakeRatingToProducts,
  narrowProductResponseData,
  formatProductPrice,
  extractCategoriesFromProducts,
  sliceProductResponseTitle,
};
