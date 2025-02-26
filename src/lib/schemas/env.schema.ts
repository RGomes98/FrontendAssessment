import { z } from 'zod';

const EnvSchema = z.object({
  API_URL: z.string().url(),
});

export { EnvSchema };
