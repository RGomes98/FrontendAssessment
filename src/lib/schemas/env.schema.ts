import { z } from 'zod';

const envSchema = z.object({
  API_URL: z.string().url(),
});

export { envSchema };
