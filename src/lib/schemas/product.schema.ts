import { z } from 'zod';

const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number().positive(),
  category: z.string(),
  description: z.string(),
  image: z.string(),
});

const RatingSchema = z.object({ rating: z.number().min(1).max(5) });

type Rating = z.infer<typeof RatingSchema>;
type Product = z.infer<typeof ProductSchema>;

export type { Product, Rating };
export { ProductSchema, RatingSchema };
