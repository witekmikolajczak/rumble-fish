import { load, save } from "~/utils/storage";
import {
  createSlice,
  createEntityAdapter,
  createSelector,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from ".";
import type { Unit } from "~/utils/conversion";

export interface Holding {
  value: number;
  unit: Unit;
  comment?: string;
}

export interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  priceUsd: number;
  image: string;
  lastUpdatedIso: string;
  isFavorite: boolean;
  holdings?: Holding;
}

const cryptosAdapter = createEntityAdapter<Cryptocurrency>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

type State = ReturnType<typeof cryptosAdapter.getInitialState> & {
  loading: boolean;
  error?: string;
};

type Persisted = { favorites: string[]; holdings: Record<string, Holding> };

const initialState: State = cryptosAdapter.getInitialState({
  loading: false,
});

const persisted: Persisted = load("cryptoState", {
  favorites: [],
  holdings: {},
});

const slice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    upsertMany(state, { payload }: PayloadAction<Cryptocurrency[]>) {
      const withPersist = payload.map((c) => ({
        ...c,
        isFavorite: persisted.favorites.includes(c.id),
        holdings: persisted.holdings[c.id],
      }));
      cryptosAdapter.upsertMany(state, withPersist);
    },

    priceUpdated: cryptosAdapter.updateOne,

    favoriteToggled(state, { payload: id }: PayloadAction<string>) {
      const ent = state.entities[id];
      if (ent) ent.isFavorite = !ent.isFavorite;

      const favorites = Object.values(state.entities)
        .filter((c): c is Cryptocurrency => !!c && c.isFavorite)
        .map((c) => c.id);
      persisted.favorites = favorites;
      save("cryptoState", persisted);
    },

    holdingsUpdated(
      state,
      { payload }: PayloadAction<{ id: string; holdings: Holding }>
    ) {
      const ent = state.entities[payload.id];
      if (ent) ent.holdings = payload.holdings;

      persisted.holdings[payload.id] = payload.holdings;
      save("cryptoState", persisted);
    },
  },
});

export const cryptoActions = slice.actions;
export default slice.reducer;

/** --- Selectors --- */
export const cryptoSelectors = cryptosAdapter.getSelectors<RootState>(
  (s) => s.crypto
);

export const selectFavorites = createSelector(
  cryptoSelectors.selectAll,
  (all) => all.filter((c) => c.isFavorite)
);

export const selectTotalPortfolioUsd = createSelector(
  cryptoSelectors.selectAll,
  (all) =>
    all.reduce(
      (sum, c) =>
        sum + (c.isFavorite && c.holdings ? c.holdings.value * c.priceUsd : 0),
      0
    )
);
