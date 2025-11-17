import type { WalletBalance } from "./WalletPage";

//data used for testing
export const useWalletBalances = (): WalletBalance[] => {
  return [
    { currency: "OSMO", amount: 123.45, blockchain: "Osmosis" },
    { currency: "ETH", amount: 1.2, blockchain: "Ethereum" },
    { currency: "ARB", amount: 50, blockchain: "Arbitrum" },
    { currency: "NEO", amount: 0, blockchain: "Neo" }, 
  ];
};

//data used for testing too
export const usePrices = (): Record<string, number> => {
  return {
    OSMO: 0.8,
    ETH: 3500,
    ARB: 1.2,
    NEO: 10,
  };
};
