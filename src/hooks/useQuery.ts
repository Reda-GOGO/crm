import { useCallback, useEffect, useState } from "react";

export type queryResponse<T> = {
  products: T[];
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasMore: boolean;
};

export function useQuery<T>(queryFn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    queryFn()
      .then(res => {
        if (!cancelled) setData(res);
      })
      .catch(err => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [queryFn]);

  useEffect(() => {
    const cleanup = execute();
    return cleanup;
  }, [execute]);

  return {
    data,
    loading,
    error,
    refetch: execute,
  };
}
