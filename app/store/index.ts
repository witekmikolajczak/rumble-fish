import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer, { initialCryptoState } from "./cryptoSlice";
import { persistenceListener } from "./persistenceListener";

const preloadedState = {
  crypto: initialCryptoState,
} as const;

export const store = configureStore({
  reducer: { crypto: cryptoReducer },
  middleware: (getDefault) =>
    getDefault().prepend(persistenceListener.middleware),
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
