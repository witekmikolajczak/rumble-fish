import type { ReactNode } from "react";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./Sidebar";
import { Topbar } from "./Topbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        color: "white",
        overflow: "hidden",
      }}
    >
      <Topbar />

      <Box
        sx={{
          display: "flex",
          height: "100%",
          flexDirection: { xs: "column", sm: "row" },
          overflow: "hidden",
        }}
      >
        <Sidebar />

        <Box
          component="main"
          sx={{
            flex: 1,
            width: "100%",
            height: "100%",
            flexGrow: 1,
            p: 3,
            backgroundColor: "#5C5C5C",
            overflowX: "hidden",
            overflowY: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
