import { createSelector } from "@reduxjs/toolkit";
import { cryptoSelectors } from "./cryptoSlice";

export const selectAllCryptos = cryptoSelectors.selectAll;
export const selectCryptoById = cryptoSelectors.selectById;

export const selectFavorites = createSelector(selectAllCryptos, (all) =>
  all.filter((c) => c.isFavorite)
);

export const selectTotalPortfolioUsd = createSelector(selectAllCryptos, (all) =>
  all.reduce(
    (sum, c) =>
      sum + (c.isFavorite && c.holdings ? c.holdings.value * c.priceUsd : 0),
    0
  )
);
