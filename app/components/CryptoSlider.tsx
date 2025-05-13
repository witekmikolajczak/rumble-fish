import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { ArrowBackIosNewIcon, ArrowForwardIosIcon } from "./Icons";
import { CryptoCard } from "./CryptoCard";
import type { Cryptocurrency } from "../store/cryptoSlice";
import { useSlider } from "~/hooks/useSlider";
import { useSwipe } from "~/hooks/useSwipe";
import { useMemo } from "react";

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

  // Enable swipe only when slider is active & we’re on mobile
  const swipeHandlers = useSwipe(
    handleNext,
    handlePrev,
    sliderActive && isMobile
  );

  // indices of the cards to display
  const indices = useMemo<number[]>(() => {
    const len = cryptos.length;

    if (len === 1) return [0];

    if (len === 2) return [clampedIndex];

    return [
      (clampedIndex - 1 + len) % len,
      clampedIndex,
      (clampedIndex + 1) % len,
    ];
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
        {indices.map((i) => (
          <CryptoCard
            key={cryptos[i].id}
            crypto={cryptos[i]}
            isFocused={sliderActive ? i === clampedIndex : true}
            showHoldingsForm={showHoldingsForm}
            onFavoriteToggle={() => setIndex(i)}
          />
        ))}
      </Box>

      {sliderActive && (
        <Box display="flex" justifyContent="center" mt={3} gap={4}>
          <IconButton onClick={handlePrev} aria-label="Previous">
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton onClick={handleNext} aria-label="Next">
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};
