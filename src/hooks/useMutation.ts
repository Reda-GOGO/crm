import { useState } from "react";

export function useMutation<E = Error>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<E | null>(null);

  const execute = async <T>(
    mutationFn: () => Promise<T>,
    options?: {
      onSuccess?: (data: T) => void;
      onError?: (error: E) => void;
    }
  ) => {
    setLoading(true);
    setError(null);

    try {
      const data = await mutationFn();

      options?.onSuccess?.(data);

      return data;
    } catch (err) {
      const e = err as E;

      setError(e);

      options?.onError?.(e);

      throw e;
    } finally {
      setLoading(false);
    }
  };

  return {
    execute,
    loading,
    error,
  };
}
