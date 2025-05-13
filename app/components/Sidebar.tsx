import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router";
import Icon from "./Icon";
import { useAppSelector } from "~/store";
import { selectTotalPortfolioUsd } from "~/store/cryptoSlice";
import { formatUSD } from "~/utils/format";
import HeartIcon from "~/assets/heart.svg?react";
import HeartIconBlack from "~/assets/heart-black.svg?react";
import DolarIcon from "~/assets/dolar.svg?react";
import DolarIconBlack from "~/assets/dolar-black.svg?react";
import WalletIcon from "~/assets/wallet.svg?react";

/**
 * Sidebar component that contains navigation links
 */
export default function Sidebar() {
  const location = useLocation();
  const total = useAppSelector(selectTotalPortfolioUsd);

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #332E2E, #515151)",
      }}
    >
      <List
        sx={{
          padding: 0,
        }}
      >
        <ListItem disablePadding>
          <Box
            sx={{
              display: { xs: "flex", sm: "none" },
              alignItems: "center",
              height: "67px",
              gap: "15px",
              paddingTop: "8px",
              paddingBottom: "8px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            <Icon component={WalletIcon} size={18} />
            <Typography
              sx={{
                color: "white",

                fontWeight: 600,
                fontSize: "16px",
              }}
              noWrap
              component="div"
            >
              My wallet USD value: {formatUSD(total)}
            </Typography>
          </Box>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/"
            selected={location.pathname === "/"}
            sx={{
              height: "67px",
              gap: "15px",

              "&.Mui-selected": {
                background: "linear-gradient(to right, #8A8A8A, #E0E0E0)",
                color: "black",
              },
            }}
          >
            <Icon
              component={location.pathname === "/" ? DolarIconBlack : DolarIcon}
              size={18}
            />
            <ListItemText
              primary="Pick Favorites"
              slotProps={{
                primary: {
                  fontWeight: 700,
                },
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/my-cryptocurrencies"
            selected={location.pathname === "/my-cryptocurrencies"}
            sx={{
              gap: "15px",
              height: "67px",
              "&.Mui-selected": {
                background: "linear-gradient(to right, #8A8A8A, #E0E0E0)",
                color: "black",
              },
            }}
          >
            <Icon
              component={
                location.pathname === "/my-cryptocurrencies"
                  ? HeartIconBlack
                  : HeartIcon
              }
              size={18}
            />
            <ListItemText
              primary="My Cryptocurrencies"
              slotProps={{
                primary: {
                  fontWeight: 700,
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
