import { z } from 'zod';

const ProductSchema = z.object({
  id: z.number().int().or(z.string().uuid()),
  title: z.string().max(30, { message: 'O título deve ter no máximo 30 caracteres.' }),
  price: z
    .number({ message: 'Informe um preço válido.' })
    .positive({ message: 'O preço deve ser maior que zero.' }),
  category: z.string(),
  description: z.string(),
  image: z.string().url({ message: 'Forneça uma URL válida para a imagem.' }),
  rating: z.number().min(1).max(5),
});

type Product = z.infer<typeof ProductSchema>;

export type { Product };
export { ProductSchema };
