import { type Product, type Rating, ProductSchema, RatingSchema } from '@/lib/schemas/product.schema';
import { addFakeRatingToProducts } from '@/helpers/product';
import { ENV } from '@/env';
import { toErrorWithMessage } from '@/utils/error';

async function getAllProducts(): Promise<{ data: null | (Product & Rating)[]; message: string }> {
  try {
    const response = await fetch(new URL(`${ENV.API_URL}/products`));
    const data = ProductSchema.array().parse(await response.json());
    const products = ProductSchema.merge(RatingSchema).array().parse(addFakeRatingToProducts(data));
    return { data: products, message: response.statusText } as const;
  } catch (error) {
    console.error(error);
    return { data: null, message: toErrorWithMessage(error).message } as const;
  }
}

export { getAllProducts };
