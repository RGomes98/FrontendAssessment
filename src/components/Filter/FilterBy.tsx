import { useSelect } from '@/hooks/useSelect.hook';
import type { Product } from '@/lib/schemas/product.schema';
import { Button } from '../ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function Root({ categories }: { categories: Product['category'][] }) {
  const { selectValue, selectState, handleSelectValue, handleDeleteValue } = useSelect({ key: 'filter' });

  return (
    <Select
      value={selectValue}
      onValueChange={handleSelectValue}
      open={selectState.isSelectCollapsed}
      onOpenChange={selectState.setIsSelectCollapsed}
    >
      <SelectTrigger className='w-[180px] capitalize max-sm:w-full'>
        <SelectValue placeholder='Filtrar por' />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category, index) => (
          <SelectItem className='cursor-pointer capitalize' value={category} key={`${category}-${index}`}>
            {category}
          </SelectItem>
        ))}
        <SelectSeparator />
        <Button onClick={handleDeleteValue} className='h-8 w-full' variant='secondary'>
          Limpar
        </Button>
      </SelectContent>
    </Select>
  );
}

export const FilterBy = { Root };
