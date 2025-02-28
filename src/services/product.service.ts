'use server';

import { type Product, ProductSchema } from '@/lib/schemas/product.schema';
import { addFakeRatingToProducts, sliceProductResponseTitle } from '@/helpers/product.helpers';
import { ENV } from '@/env';
import { toErrorWithMessage } from '@/utils/error.utils';

async function getAllProducts(): Promise<{ data: null | Product[]; message: string }> {
  try {
    const response = await fetch(new URL(`${ENV.API_URL}/products`), { cache: 'force-cache' });
    const productsWithFakeRatings: Product[] = addFakeRatingToProducts(await response.json());
    const productsWithSlicedTitles = sliceProductResponseTitle(productsWithFakeRatings);
    const products = ProductSchema.array().parse(productsWithSlicedTitles);
    return { data: products, message: response.statusText } as const;
  } catch (error) {
    console.error(error);
    return { data: null, message: toErrorWithMessage(error).message } as const;
  }
}

export { getAllProducts };
