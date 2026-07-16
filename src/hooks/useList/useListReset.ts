import { useEffect, useRef, useState } from "react";

export function useListReset(queryKey: string) {
  const activeQueryKey = useRef(queryKey);
  const [resetCount, setResetCount] = useState(0);

  useEffect(() => {
    if (activeQueryKey.current === queryKey) {
      return;
    }

    activeQueryKey.current = queryKey;
    setResetCount((count) => count + 1);
  }, [queryKey]);

  return {
    activeQueryKey,
    resetCount,
  };
}
