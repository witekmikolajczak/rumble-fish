import React from "react";
import { SvgIcon } from "@mui/material";
import type { SvgIconProps } from "@mui/material";

/**
 * Custom icon components to avoid external dependencies
 * These are simplified versions of Material UI icons
 */

export function FavoriteIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </SvgIcon>
  );
}

export function FavoriteBorderIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
    </SvgIcon>
  );
}

export function ArrowBackIosNewIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M17.77 3.77L16 2 6 12l10 10 1.77-1.77L9.54 12z" />
    </SvgIcon>
  );
}

export function ArrowForwardIosIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M6.23 20.23L8 22l10-10L8 2 6.23 3.77 14.46 12z" />
    </SvgIcon>
  );
}

export function MenuIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </SvgIcon>
  );
}

export function MoneyIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
    </SvgIcon>
  );
}
