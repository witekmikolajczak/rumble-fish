import { Typography, Box } from "@mui/material";
import Layout from "../components/Layout";
import { CryptoSlider } from "../components/CryptoSlider";
import { useAppSelector } from "../store/hooks";
import { cryptoSelectors } from "../store/cryptoSlice";

export default function Index() {
  const cryptocurrencies = useAppSelector(cryptoSelectors.selectAll);

  return (
    <Layout>
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography fontWeight={700} fontSize={32} gutterBottom>
          Pick favourites
        </Typography>

        <CryptoSlider cryptos={cryptocurrencies} />
      </Box>
    </Layout>
  );
}
