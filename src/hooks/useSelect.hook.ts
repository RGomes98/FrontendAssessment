import { deleteSearchParam, updateSearchParams } from '@/helpers/searchParams.helpers';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useSelect({ key }: { key: string }) {
  const [selectValue, setSelectValue] = useState<string | null>(null);
  const [isSelectCollapsed, setIsSelectCollapsed] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultValue = searchParams.get(key);

  function handleSelectValue(option: string) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(1));
    setSelectValue(option);
    updateSearchParams({
      router,
      param: { key, value: option },
      searchParams: params,
    });
  }

  function handleDeleteValue() {
    setSelectValue(null);
    setIsSelectCollapsed(false);
    deleteSearchParam({
      router,
      key,
      searchParams: new URLSearchParams(searchParams),
    });
  }

  return {
    handleSelectValue,
    handleDeleteValue,
    selectValue: selectValue ?? defaultValue ?? '',
    selectState: { isSelectCollapsed, setIsSelectCollapsed },
  };
}
