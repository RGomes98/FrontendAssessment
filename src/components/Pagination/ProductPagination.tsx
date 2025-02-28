'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useProductStore } from '@/lib/store/product.store';
import { narrowProductResponseData } from '@/helpers/product.helpers';
import { useSortProducts } from '@/hooks/useSortProducts.hook';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const PRODUCTS_PER_PAGE = 10;
const MAX_VISIBLE_PAGES = 5;

export function ProductPagination() {
  const { products } = useProductStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const data = narrowProductResponseData({ products });
  const sortedProducts = useSortProducts({ data });

  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPages = Math.ceil(Number(sortedProducts.length) / PRODUCTS_PER_PAGE);

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const half = Math.floor(MAX_VISIBLE_PAGES / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + MAX_VISIBLE_PAGES - 1);

    if (end - start < MAX_VISIBLE_PAGES - 1) {
      start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);
    }

    if (start > 1) {
      pages.push(
        <PaginationItem className='cursor-pointer' key={1}>
          <PaginationLink onClick={() => goToPage(1)}>1</PaginationLink>
        </PaginationItem>,
      );
      if (start > 2) {
        pages.push(
          <PaginationItem className='cursor-pointer' key='ellipsis-start'>
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <PaginationItem className='cursor-pointer' key={i}>
          <PaginationLink isActive={i === currentPage} onClick={() => goToPage(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push(
          <PaginationItem className='cursor-pointer' key='ellipsis-end'>
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink onClick={() => goToPage(totalPages)}>{totalPages}</PaginationLink>
        </PaginationItem>,
      );
    }

    return pages;
  };

  return (
    <Pagination
      className={`flex select-none justify-end px-4 py-10 sm:px-10 lg:px-20 xl:px-40 2xl:px-60 ${totalPages <= 1 && 'pointer-events-none opacity-70'}`}
    >
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className='cursor-pointer'
            onClick={() => goToPage(Math.max(1, currentPage - 1))}
          />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext
            className='cursor-pointer'
            onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
