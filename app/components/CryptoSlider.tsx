import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { CryptoCard } from "./CryptoCard";
import type { Cryptocurrency } from "../store/cryptoSlice";
import { useSlider } from "~/hooks/useSlider";
import { useSwipe } from "~/hooks/useSwipe";
import { useMemo } from "react";

import ArrowActivePrev from "~/assets/arrow-active-prev.svg?react";
import ArrowDisabledPrev from "~/assets/arrow-disabled-prev.svg?react";
import ArrowDisabledNext from "~/assets/arrow-disabled-next.svg?react";

import Icon from "./Icon";

interface CryptoSliderProps {
  /**
   * Array of cryptocurrencies to display
   */
  cryptos: Cryptocurrency[];
  /**
   * When true, each card renders the <CryptoHoldingsForm> component.
   */
  showHoldingsForm?: boolean;
}

export const CryptoSlider = ({
  cryptos,
  showHoldingsForm = false,
}: CryptoSliderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Enable slider only when we have at least 3 items
  const sliderActive = cryptos.length >= 2;

  const { index, handlePrev, handleNext, setIndex } = useSlider(cryptos.length);

  const clampedIndex = Math.min(index, Math.max(cryptos.length - 1, 0));
  if (clampedIndex !== index) {
    setIndex(clampedIndex);
  }

  // Disable prev/next buttons when we're at the first/last item
  const disabledPrev = clampedIndex === 0;
  const disabledNext = clampedIndex === cryptos.length - 1;

  // Enable swipe only when slider is active & we’re on mobile
  const swipeHandlers = useSwipe(
    handleNext,
    handlePrev,
    sliderActive && isMobile
  );

  // Array of indices to render (null for empty slots)
  const slots = useMemo<(number | null)[]>(() => {
    const len = cryptos.length;

    if (len === 1) return [null, 0, null];

    if (len === 2) {
      return clampedIndex === 0 ? [null, 0, 1] : [0, 1, null];
    }

    if (clampedIndex === 0) return [null, 0, 1];
    if (clampedIndex === len - 1) return [len - 2, len - 1, null];

    return [clampedIndex - 1, clampedIndex, clampedIndex + 1];
  }, [cryptos.length, clampedIndex]);

  if (!cryptos.length) {
    return (
      <Box textAlign="center" py={4}>
        No cryptocurrencies to display.
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        my: 4,
        maxWidth: "100vw",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: { xs: 1, sm: 2 },
          width: "100%",
          px: { xs: 1, sm: 2 },
        }}
        {...swipeHandlers}
      >
        {slots.map((i, slotIdx) =>
          i === null ? (
            <Box
              key={`placeholder-${slotIdx}`}
              sx={{
                width: { xs: 320, md: 500 },
                flexShrink: 0,
                visibility: "hidden",
              }}
            />
          ) : (
            <CryptoCard
              key={cryptos[i].id}
              crypto={cryptos[i]}
              isFocused={slotIdx === 1}
              showHoldingsForm={showHoldingsForm}
              onFavoriteToggle={() => setIndex(i)}
            />
          )
        )}
      </Box>

      {sliderActive && (
        <Box display="flex" justifyContent="center" mt={3} gap={4}>
          <IconButton onClick={handlePrev} disabled={disabledPrev}>
            <Icon
              component={disabledPrev ? ArrowDisabledPrev : ArrowActivePrev}
              size={24}
            />
          </IconButton>

          <IconButton onClick={handleNext} disabled={disabledNext}>
            <Icon
              component={disabledNext ? ArrowDisabledNext : ArrowActivePrev}
              size={24}
              sx={{
                transform: disabledNext ? "none" : "rotate(180deg)",
              }}
            />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};
