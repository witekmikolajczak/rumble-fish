import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { cryptoActions, type Holding } from "./cryptoSlice";
import { save, load } from "~/utils/storage";
import type { RootState } from "./index";

const KEY = "cryptoState";

export interface Persisted {
  favorites: string[];
  holdings: Record<string, Holding>;
}

// re-hydrate from localStorage
export const loadPersistedState = (): Persisted =>
  load(KEY, { favorites: [], holdings: {} });

// save to localStorage on crypto actions
export const persistenceListener = createListenerMiddleware();

persistenceListener.startListening({
  matcher: isAnyOf(cryptoActions.toggleFavorite, cryptoActions.updateHoldings),
  effect: (_action, api) => {
    const state = api.getState() as RootState;

    const favorites = Object.values(state.crypto.entities)
      .filter(Boolean)
      .filter((c) => c!.isFavorite)
      .map((c) => c!.id);

    const holdings = Object.fromEntries(
      Object.values(state.crypto.entities)
        .filter(Boolean)
        .filter((c) => c!.holdings)
        .map((c) => [c!.id, c!.holdings])
    );

    save(KEY, { favorites, holdings });
  },
});
