import { getAllProducts } from '@/services/product.service';
import { create } from 'zustand';
import { Product } from '../schemas/product.schema';

export type ProductState = {
  fetchProducts: () => void;
  updateProducts: (products: Product[]) => void;
  products: { isLoading: boolean; response: null | Awaited<ReturnType<typeof getAllProducts>> };
};

const useProductStore = create<ProductState>()((set) => ({
  products: { isLoading: true, response: null },
  fetchProducts: async () => set({ products: { isLoading: false, response: await getAllProducts() } }),
  updateProducts: (products) =>
    set((state) => ({
      products: { isLoading: state.products.isLoading, response: { data: products, message: 'OK' } },
    })),
}));

export { useProductStore };
