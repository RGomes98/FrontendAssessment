import { Product } from '@/lib/schemas/product.schema';
import { useProductStore } from '@/lib/store/product.store';

export function useProductsActions() {
  const { products, updateProducts } = useProductStore();
  const currentProducts = products.response?.data;

  function createProduct(product: Product) {
    if (!currentProducts) return;
    const updatedProducts = structuredClone([...currentProducts, product]);
    updateProducts(updatedProducts);
  }

  function updateProduct(product: Omit<Product, 'category'>) {
    if (!currentProducts) return;
    const productToUpdate = currentProducts.find(({ id }) => id === product.id);

    if (!productToUpdate) return;
    const filteredProducts = currentProducts.filter(({ id }) => id !== product.id);

    const updatedProducts = structuredClone([...filteredProducts, { ...productToUpdate, ...product }]);
    updateProducts(updatedProducts);
  }

  function deleteProduct(productId?: Product['id']) {
    if (!currentProducts) return;
    const productToDelete = currentProducts.filter(({ id }) => id !== productId);
    const updatedProducts = structuredClone([...productToDelete]);
    updateProducts(updatedProducts);
  }

  return { createProduct, updateProduct, deleteProduct };
}
