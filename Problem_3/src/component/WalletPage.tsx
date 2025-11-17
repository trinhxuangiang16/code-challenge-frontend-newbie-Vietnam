//The code which I fixed and added

import { useMemo } from "react";
import WalletRow from "./WalletRow";
import { usePrices, useWalletBalances } from "./useHookData";

type Blockchain =
  | "Osmosis"
  | "Ethereum"
  | "Arbitrum"
  | "Zilliqa"
  | "Neo"
  | string;

//Add blockchain: Blockchain;
export interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

//changed FormattedWalletBalance to extend WalletBalance
export interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

//add type BoxProps to runcode
type BoxProps = React.HTMLAttributes<HTMLDivElement>;

interface Props extends BoxProps {}

// This object stores the priority number for each blockchain.
const BlockchainPriority: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

// This function returns the priority of a given blockchain.
// If the blockchain exist in BlockchainPriority, it returns its number as 100 for Osmosis.
// If it does not exist, it returns -1.
const getPriority = (blockchain: Blockchain): number => {
  return BlockchainPriority[blockchain] ?? -1;
};

//Use function component to easy to write and easy to read. They let you use Hooks, so your React code becomes simple and clean
const WalletPage = ({ children, ...rest }: Props) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  //declare WalletBalance[] for useMemo
  const sortedBalances = useMemo<WalletBalance[]>(() => {
    return (
      balances
        .filter((balance) => {
          const priority = getPriority(balance.blockchain);
          //Fixed logic for condition priority > 0 and balance.amount > 0
          return priority > 0 && balance.amount > 0;
        })
        //easy sort with sort((a,b) => a -b))
        .sort((lhs, rhs) => {
          return getPriority(rhs.blockchain) - getPriority(lhs.blockchain);
        })
    );
  }, [balances]);
  //remove prices dependency

  //declare it with FormattedWalletBalance[]
  const formattedBalances = useMemo<FormattedWalletBalance[]>(() => {
    return sortedBalances.map((balance) => ({
      ...balance,
      formatted: balance.amount.toFixed(2),
      //insert number 2 inside toFixed()
    }));
  }, [sortedBalances]);
  //Add  sortedBalances dependency

  const style = {
    size: "30px",
  };

  const rows = useMemo(
    () =>
      //use formattedBalances and balance.formatted
      formattedBalances.map((balance) => {
        const price = prices[balance.currency] ?? 0;
        const usdValue = price * balance.amount;

        return (
          <WalletRow
            style={style.size}
            key={`${balance.blockchain}-${balance.currency}`}
            //replaced index-based keys with a stable key blockchain và currency
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
            //Can be use balance.formatted here now because use formattedBalances for map
          />
        );
      }),
    [formattedBalances, prices]
    //Add dependency for rows if it changing rows changing then
  );

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
