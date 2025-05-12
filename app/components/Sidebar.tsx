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

export const DRAWER_WIDTH = 240;

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
            <Icon src="/wallet.svg" alt="Wallet icon" width={18} />
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
              src="/dolar.svg"
              alt="Dollar icon"
              width={18}
              isActive={location.pathname === "/"}
              activeColor="black"
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
              src="/heart.svg"
              alt="Heart icon"
              width={18}
              isActive={location.pathname === "/my-cryptocurrencies"}
              activeColor="black"
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
