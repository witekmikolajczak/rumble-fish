export type Unit = "main" | "satoshi" | "wei" | "planck" | "lamport";

const UNIT_MAP: Record<string, bigint> = {
  BTC: 100_000_000n,
  ETH: 1_000_000_000_000_000_000n,
  MATIC: 1_000_000_000_000_000_000n,
  DOT: 10_000_000_000n,
  SOL: 1_000_000_000n,
  DEFAULT: 1_000_000n,
};

export const toBaseUnit = (value: number, symbol: string): bigint =>
  (BigInt(Math.round(value * 1e8)) * (UNIT_MAP[symbol] ?? UNIT_MAP.DEFAULT)) /
  100_000_000n;

export const fromBaseUnit = (value: bigint, symbol: string): number =>
  Number(value) / Number(UNIT_MAP[symbol] ?? UNIT_MAP.DEFAULT);
