import type { ZodError } from 'zod';

function extractFormErrors<T>(errors: ZodError<T>) {
  const fieldErrors = errors.flatten().fieldErrors;
  return Object.entries(fieldErrors).reduce<Record<string, string>>((map, [key, messages]) => {
    if (Array.isArray(messages) && messages.length > 0) map[key] = messages[0];
    return map;
  }, {});
}

export { extractFormErrors };
