import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { formatUSD } from "../utils/format";
import { useAppSelector } from "~/store/hooks";
import { selectTotalPortfolioUsd } from "~/store/selectors";

export const Topbar = () => {
  const total = useAppSelector(selectTotalPortfolioUsd);

  return (
    <AppBar
      position="static"
      sx={{
        width: "100%",
        paddingTop: "20px",
        paddingBottom: "20px",
        paddingLeft: "40px",
        paddingRight: "40px",
        backgroundColor: "#332E2E",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: {
            xs: "center",
            sm: "space-between",
          },
        }}
      >
        <Box
          component="img"
          src="/CryptoWatcher.png"
          alt="logo"
          sx={{ width: 280 }}
        />

        <Typography
          sx={{
            display: { xs: "none", sm: "block" },
            fontSize: "20px",
          }}
        >
          My wallet USD value: {formatUSD(total)}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
