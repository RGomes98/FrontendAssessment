function toErrorWithMessage(error: unknown): Error {
  if (error instanceof Error) return error;

  try {
    return new Error(JSON.stringify(error));
  } catch {
    return new Error(String(error));
  }
}

export { toErrorWithMessage };
