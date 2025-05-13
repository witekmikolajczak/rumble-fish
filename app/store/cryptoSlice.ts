import {
  createSlice,
  createEntityAdapter,
  type PayloadAction,
  type EntityState,
} from "@reduxjs/toolkit";
import type { RootState } from ".";

export interface Holding {
  value: number;
  unit: "main" | "satoshi" | "wei" | "planck" | "lamport";
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

export const cryptoSelectors = cryptosAdapter.getSelectors<RootState>(
  (s) => s.crypto
);

export const initialCryptoState: EntityState<Cryptocurrency, string> =
  cryptosAdapter.getInitialState();

const slice = createSlice({
  name: "crypto",
  initialState: initialCryptoState,
  reducers: {
    upsertMany: cryptosAdapter.upsertMany,

    toggleFavorite(state, { payload: id }: PayloadAction<string>) {
      const ent = state.entities[id];
      if (ent) ent.isFavorite = !ent.isFavorite;
    },

    updateHoldings(
      state,
      { payload }: PayloadAction<{ id: string; holdings: Holding }>
    ) {
      const ent = state.entities[payload.id];
      if (ent) ent.holdings = payload.holdings;
    },

    priceUpdated: {
      reducer: cryptosAdapter.updateOne,
      prepare: (id: string, priceUsd: number) => ({
        payload: {
          id,
          changes: {
            priceUsd,
            lastUpdatedIso: new Date().toISOString(),
          },
        },
      }),
    },
  },
});

export const cryptoActions = slice.actions;
export default slice.reducer;
