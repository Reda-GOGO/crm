import { useCallback, useEffect, useRef, useState } from "react";

export type queryResponse<T> = {
  items: T[];
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasMore: boolean;
};

export function useQuery<T>(
  queryFn: () => Promise<T>,
  options?: {
    enabled?: boolean;
  }
) {
  const enabled = options?.enabled ?? true;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const requestId = useRef(0);

  const execute = useCallback(async () => {
    if (!enabled) return;

    const id = ++requestId.current;

    setLoading(true);
    setError(null);

    try {
      const result = await queryFn();

      if (id !== requestId.current) return;

      setData(result);
    } catch (err) {
      if (id !== requestId.current) return;

      setError(err as Error);
    } finally {
      if (id === requestId.current) {
        setLoading(false);
      }
    }
  }, [queryFn, enabled]);

  useEffect(() => {
    execute();
  }, [execute]);

  return {
    data,
    loading,
    error,
    refetch: execute,
  };
}

// export function useQuery<T>(
//   queryFn: () => Promise<T>,
//   options?: {
//     enabled?: boolean;
//   }
// ) {
//   const [data, setData] = useState<T | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<Error | null>(null);
//   const enabled = options?.enabled ?? true;
//
//   const execute = useCallback(() => {
//     let cancelled = false;
//     if (!enabled) return;
//
//     setLoading(true);
//     setError(null);
//
//     queryFn()
//       .then(res => {
//         if (!cancelled) setData(res);
//       })
//       .catch(err => {
//         if (!cancelled) setError(err);
//       })
//       .finally(() => {
//         if (!cancelled) setLoading(false);
//       });
//
//     return () => {
//       cancelled = true;
//     };
//   }, [queryFn, enabled]);
//
//   useEffect(() => {
//     if (!enabled) return;
//     const cleanup = execute();
//     return cleanup;
//   }, [execute, enabled]);
//
//   return {
//     data,
//     loading,
//     error,
//     refetch: execute,
//   };
// }
