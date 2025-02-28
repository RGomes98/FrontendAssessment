import { extractCategoriesFromProducts } from '@/helpers/product.helpers';
import { Product } from '@/lib/schemas/product.schema';
import { useSearchParams } from 'next/navigation';

const MINIMUN_RATING = 4.5;

export function useSortProducts({ data }: { data: Product[] }) {
  const searchParams = useSearchParams();
  const order = searchParams.get('order');
  const filter = searchParams.get('filter');

  const categories = extractCategoriesFromProducts({ products: data });
  const isCategoryValid = categories.includes(String(filter));

  const filteredProducts = data.filter(({ category }) => {
    if (!filter || !isCategoryValid) return true;
    return category === filter;
  });

  return filteredProducts.sort((a, b) => {
    if (a.rating >= MINIMUN_RATING && b.rating < MINIMUN_RATING) return -1;
    if (b.rating >= MINIMUN_RATING && a.rating < MINIMUN_RATING) return 1;

    if (order === 'asc') return a.price - b.price;
    if (order === 'desc') return b.price - a.price;

    return 0;
  });
}
