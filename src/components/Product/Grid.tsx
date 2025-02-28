'use client';

import { useProductStore } from '@/lib/store/product.store';
import { Card } from './Card';
import { usePedingState } from '@/hooks/usePendingState.hook';
import { narrowProductResponseData } from '@/helpers/product.helpers';
import { useEffect } from 'react';
import { useSortProducts } from '@/hooks/useSortProducts.hook';
import { usePagination } from '@/hooks/usePagination.hook';
import { Spinner } from '../LoadingState/Spinner';

export function Grid() {
  const { products, fetchProducts } = useProductStore();

  // Não é necessário usar "useCallback", pois o React 19 já realiza otimizações automáticas
  // para evitar recriação desnecessária de funções em re-renderizações.
  useEffect(() => {
    if (Boolean(products.response?.data)) return;
    fetchProducts();
  }, [fetchProducts, products.response?.data]);

  const data = narrowProductResponseData({ products });
  const sortedProducts = useSortProducts({ data });
  const paginatedProducts = usePagination(sortedProducts);

  const element = usePedingState({
    element: <Card.Root products={paginatedProducts} />,
    pendingStates: [
      {
        condition: products.isLoading,
        fallback: (
          <span className='col-span-5 flex aspect-video h-full animate-pulse items-center justify-center rounded-md bg-gray-200'>
            <Spinner className='size-12' />
          </span>
        ),
      },
      {
        condition: !paginatedProducts.length,
        fallback: (
          <span className='col-span-5 flex aspect-video items-center justify-center rounded-md bg-gray-200'>
            Nenhum Produto Encontrado.
          </span>
        ),
      },
    ],
  });

  return (
    <section className='grid grid-cols-1 gap-x-8 gap-y-6 px-4 sm:grid-cols-2 sm:px-10 lg:grid-cols-3 lg:px-20 xl:grid-cols-4 xl:px-40 2xl:grid-cols-5 2xl:px-60'>
      {element}
    </section>
  );
}
