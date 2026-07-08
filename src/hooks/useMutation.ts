export type MutationFn<T> = () => Promise<T>;

export function useMutation<T, E = Error>(
  mutationFn: MutationFn<T>,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: E) => void;
  }
) {
  const execute = async () => {
    try {
      const data = await mutationFn();
      options?.onSuccess?.(data);
    } catch (error) {
      options?.onError?.(error as E);
    }
  };

  return execute;
}
