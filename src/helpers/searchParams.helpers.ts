import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

function updateSearchParams({
  param: { key, value },
  searchParams,
  router,
}: {
  param: { key: string; value: string };
  searchParams: URLSearchParams;
  router: AppRouterInstance;
}) {
  const params = new URLSearchParams(searchParams);
  params.set(key, value);
  router.push(`?${params}`);
}

function deleteSearchParam({
  key,
  searchParams,
  router,
}: {
  key: string;
  searchParams: URLSearchParams;
  router: AppRouterInstance;
}) {
  const params = new URLSearchParams(searchParams);
  params.delete(key);
  router.push(`?${params}`);
}

export { updateSearchParams, deleteSearchParam };
