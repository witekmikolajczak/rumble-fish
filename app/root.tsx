import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";
import { loadPersistedState } from "~/store/persistenceListener";

import {
  cryptoActions,
  cryptoSelectors,
  type Cryptocurrency,
} from "./store/cryptoSlice";
import seed from "./data/cryptocurrencies.json";
import { CssBaseline, ThemeProvider } from "@mui/material";

/**
 * Component that initializes cryptocurrency data and sets up the timer
 * for price updates
 */
function CryptoInitializer() {
  const dispatch = useAppDispatch();
  const hasData = useAppSelector(
    (s) => cryptoSelectors.selectAll(s).length > 0
  );
  const { favorites, holdings } = loadPersistedState();

  useEffect(() => {
    if (!hasData) {
      const normalized: Cryptocurrency[] = seed.cryptocurrencies.map((c) => ({
        id: c.id,
        name: c.name,
        symbol: c.symbol,
        priceUsd: c.price,
        image: c.image,
        lastUpdatedIso: c.lastUpdated,
        isFavorite: favorites.includes(c.id),
        holdings: holdings[c.id],
      }));
      dispatch(cryptoActions.upsertMany(normalized));
    }
  }, [hasData, dispatch]);
  return null;
}

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <CryptoInitializer />
      <Outlet />
    </Provider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
