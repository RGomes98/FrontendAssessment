import { Filter } from '@/components/Filter/Filters';
import { Grid } from '@/components/Product/Grid';
import { Actions } from '@/components/Action/Actions';
import { Navbar } from '@/components/Header/Navbar';
import { ProductPagination } from '@/components/Pagination/ProductPagination';

export default async function Home() {
  return (
    <main className='min-h-screen bg-gray-100 font-saira'>
      <Navbar />
      <div className='flex items-end justify-between px-4 pt-10 max-sm:flex-col max-sm:gap-4 sm:px-10 lg:px-20 xl:px-40 2xl:px-60'>
        <Actions />
        <Filter />
      </div>
      <ProductPagination />
      <Grid />
      <ProductPagination />
    </main>
  );
}
