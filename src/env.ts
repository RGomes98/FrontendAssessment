import { envSchema } from './lib/schemas/env.schema';

export const ENV = envSchema.parse(process.env);
