import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { cryptoActions, cryptoSelectors } from "../store/cryptoSlice";

export const PRICE_UPDATE_INTERVAL_MS = 30_000;
export const PRICE_INCREMENT_USD = 1;

export const usePriceDemoInflator = () => {
  const dispatch = useAppDispatch();
  const all = useAppSelector(cryptoSelectors.selectAll);

  useEffect(() => {
    if (all.length === 0) return;
    const id = setInterval(() => {
      all.forEach((c) =>
        dispatch(
          cryptoActions.priceUpdated({
            id: c.id,
            changes: {
              priceUsd: c.priceUsd + PRICE_INCREMENT_USD,
              lastUpdatedIso: new Date().toISOString(),
            },
          })
        )
      );
    }, PRICE_UPDATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [all, dispatch]);
};
