import { ReactNode } from 'react';

type UsePendingState = {
  element: ReactNode;
  pendingStates: { condition: boolean; fallback: ReactNode }[];
};

export function usePedingState({ element, pendingStates }: UsePendingState) {
  const pendingState = pendingStates.find((state) => Boolean(state.condition));
  if (pendingState) return pendingState.fallback;
  return element;
}
