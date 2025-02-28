import { useSelect } from '@/hooks/useSelect.hook';
import { Button } from '../ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const orderByOptions = [
  { order: 'desc', placeholder: 'Maior Preço' },
  { order: 'asc', placeholder: 'Menor Preço' },
];

function Root() {
  const { selectValue, selectState, handleSelectValue, handleDeleteValue } = useSelect({ key: 'order' });

  return (
    <Select
      value={selectValue}
      onValueChange={handleSelectValue}
      open={selectState.isSelectCollapsed}
      onOpenChange={selectState.setIsSelectCollapsed}
    >
      <SelectTrigger className='w-[180px] max-sm:w-full'>
        <SelectValue placeholder='Ordenar por' />
      </SelectTrigger>
      <SelectContent>
        {orderByOptions.map(({ order, placeholder }) => (
          <SelectItem className='cursor-pointer' value={order} key={`${order}-${placeholder}`}>
            {placeholder}
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

export const OrderBy = { Root };
