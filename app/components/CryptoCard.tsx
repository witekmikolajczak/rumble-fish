import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import type { Cryptocurrency } from "../store/cryptoSlice";

import { useAppDispatch } from "../store";
import { cryptoActions } from "../store/cryptoSlice";
import { formatUSD } from "~/utils/format";
import CryptoHoldingsForm from "./CryptoHoldingsForm";
import { formatDateTime } from "~/utils/format";
import FavoriteIcon from "~/assets/favorites.svg?react";
import FavoriteFillIcon from "~/assets/favorites-fill.svg?react";
import Icon from "./Icon";

interface CryptoCardProps {
  /**
   * The cryptocurrency data to display
   */
  crypto: Cryptocurrency;

  /**
   * Whether this card is the centred (focused) slide
   */
  isFocused?: boolean;

  /**
   * Render the holdings form inside the card.
   * Enabled only on "My‑Cryptocurrencies" page.
   */
  showHoldingsForm?: boolean;

  onFavoriteToggle?: () => void;
}

export const CryptoCard = ({
  crypto,
  isFocused = false,
  showHoldingsForm = false,
  onFavoriteToggle,
}: CryptoCardProps) => {
  const dispatch = useAppDispatch();

  const handleToggleFavorite = () => {
    dispatch(cryptoActions.favoriteToggled(crypto.id));
    onFavoriteToggle?.();
  };

  // Show "Last Checked" only when not in holdings form mode
  const showLastChecked = !showHoldingsForm;

  return (
    <Card
      sx={{
        width: { xs: 320, md: 500 },
        minHeight: { xs: 400, sm: 460 },
        pt: 6,
        opacity: isFocused ? 1 : 0.6,
        transition: "all .3s ease",
        transform: isFocused ? "scale(1)" : "scale(0.9)",
        boxShadow: isFocused ? 6 : "none",
        position: "relative",
        bgcolor: "#332E2E",
        color: "#FFFFFF",
        flexShrink: 0,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <CardMedia
            component="img"
            image={crypto.image}
            alt={crypto.name}
            sx={{ width: 150, height: 150, objectFit: "contain", mb: 2 }}
          />
          <Typography fontWeight={700} fontSize={24} textAlign="center">
            {crypto.name}
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography fontSize={18}>
              Current Price: {formatUSD(crypto.priceUsd)}
            </Typography>

            {showLastChecked && (
              <Typography fontSize={18}>
                Last Checked: {formatDateTime(crypto.lastUpdatedIso)}
              </Typography>
            )}
          </Box>

          {showHoldingsForm && <CryptoHoldingsForm crypto={crypto} />}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <IconButton
            onClick={handleToggleFavorite}
            aria-label={
              crypto.isFavorite ? "Remove from favourites" : "Add to favourites"
            }
          >
            {crypto.isFavorite ? (
              <Icon component={FavoriteFillIcon} />
            ) : (
              <Icon component={FavoriteIcon} />
            )}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};
