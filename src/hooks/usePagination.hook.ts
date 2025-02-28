import { useSearchParams } from 'next/navigation';
import { Product } from '@/lib/schemas/product.schema';

const PRODUCTS_PER_PAGE = 10;

export function usePagination(products: Product[]) {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;

  return products.slice(startIndex, endIndex);
}
