import { useRef } from "react";
import type { TouchEvent } from "react";

export const useSwipe = (
  onLeft: () => void,
  onRight: () => void,
  active = true,
  minMove = 50
) => {
  const startX = useRef<number | undefined>(undefined);
  if (!active) return {};

  return {
    onTouchStart: (e: TouchEvent<Element>) =>
      (startX.current = e.touches[0].clientX),
    onTouchMove: (e: TouchEvent<Element>) => {
      if (startX.current == null) return;
      const delta = startX.current - e.touches[0].clientX;
      if (Math.abs(delta) > minMove) {
        delta > 0 ? onLeft() : onRight();
        startX.current = undefined;
      }
    },
    onTouchEnd: () => (startX.current = undefined),
  } as const;
};
