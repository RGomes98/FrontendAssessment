'use client';

import { usePedingState } from '@/hooks/usePendingState.hook';
import { useProductStore } from '@/lib/store/product.store';
import { extractCategoriesFromProducts, narrowProductResponseData } from '@/helpers/product.helpers';
import { FilterBy } from './FilterBy';
import { OrderBy } from './OrderBy';

export function Filter() {
  const { products } = useProductStore();
  const data = narrowProductResponseData({ products });
  const categories = extractCategoriesFromProducts({ products: data });

  const element = usePedingState({
    element: <FilterBy.Root categories={categories} />,
    pendingStates: [
      {
        condition: products.isLoading,
        fallback: <div className='h-[36px] w-[180px] animate-pulse rounded-md bg-gray-200'></div>,
      },
      {
        condition: !categories.length,
        fallback: (
          <span className='h-[36px] w-[180px] rounded-md bg-gray-200 font-medium'>
            Nenhum Categoria Encontrada.
          </span>
        ),
      },
    ],
  });

  return (
    <section className='flex w-full items-center justify-end gap-2 max-sm:flex-col max-sm:items-end max-sm:gap-4'>
      {element}
      <OrderBy.Root />
    </section>
  );
}
