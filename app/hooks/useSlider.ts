import { useCallback, useEffect, useState } from "react";

export const useSlider = (total: number) => {
  const [index, set] = useState(0);

  useEffect(() => {
    set((i) => Math.min(i, Math.max(total - 1, 0)));
  }, [total]);

  const handlePrev = useCallback(() => set((i) => (i > 0 ? i - 1 : i)), []);

  const handleNext = useCallback(
    () => set((i) => (i < total - 1 ? i + 1 : i)),
    [total]
  );

  return { index, handlePrev, handleNext, setIndex: set };
};
