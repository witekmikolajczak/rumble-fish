import { useCallback, useEffect, useState } from "react";

export const useSlider = (total: number) => {
  const [index, set] = useState(0);

  useEffect(() => {
    set((i) => {
      if (total === 0) return 0;
      return i >= total ? total - 1 : i;
    });
  }, [total]);

  const handlePrev = useCallback(
    () => set((i) => (total ? (i ? i - 1 : total - 1) : 0)),
    [total]
  );

  const handleNext = useCallback(
    () => set((i) => (total ? (i + 1) % total : 0)),
    [total]
  );

  return { index, handlePrev, handleNext, setIndex: set };
};
