import { Typography, Box } from "@mui/material";
import Layout from "../components/Layout";
import { CryptoSlider } from "../components/CryptoSlider";
import { useAppSelector } from "../store";
import { selectFavorites } from "~/store/cryptoSlice";

export default function MyCryptocurrencies() {
  const favoritesCryptocurrencies = useAppSelector(selectFavorites);

  return (
    <Layout>
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography fontWeight={700} fontSize={32} gutterBottom>
          My cryptocurrencies
        </Typography>

        {favoritesCryptocurrencies.length === 0 ? (
          <Typography variant="body1" sx={{ mt: 4 }}>
            You haven't added any favorite cryptocurrencies yet. Go to the home
            page to add some to your favorites.
          </Typography>
        ) : (
          <CryptoSlider
            cryptos={favoritesCryptocurrencies}
            showHoldingsForm={true}
          />
        )}
      </Box>
    </Layout>
  );
}
