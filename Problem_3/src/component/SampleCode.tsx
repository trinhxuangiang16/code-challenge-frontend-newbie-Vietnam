//The sample code with errors or the somthing i think it not good
interface WalletBalance {
  currency: string;
  amount: number;
  //Error: using balance.blockchain below but this no have blockchain field
}

//The two interfaces are almost similar, so we can make the code shorter.
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;

  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    //ANTI-PATTERN: Using 'any' makes TypeScript not useful.
    //Maybe declare string or type Blockchain = 'Osmosis' | 'Ethereum' | ...
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    //ANTI-PATTERN: Lack of generic cho useMemo
    return (
      balances

        .filter((balance: WalletBalance) => {
          const balancePriority = getPriority(balance.blockchain);
          //ERROR: Variable is balancePriority but use lhsPriority to check
          //LOGIC ERROR: return true when balance.amount <= 0
          if (lhsPriority > -99) {
            if (balance.amount <= 0) {
              return true;
            }
          }
          return false;
        })
        //the sort function can sort without if/else condition
        .sort((lhs: WalletBalance, rhs: WalletBalance) => {
          const leftPriority = getPriority(lhs.blockchain);
          const rightPriority = getPriority(rhs.blockchain);
          if (leftPriority > rightPriority) {
            return -1;
          } else if (rightPriority > leftPriority) {
            return 1;
          }
          //ERROR:lack of condition if it equal
        })
    );
  }, [balances, prices]);
  //ANTI-PATTERN: dependency prices no related

  // ANTI-PATTERN: Excess logic declare but never use, maybe confused with another variable
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
      //ERROR: Because it is formatted, declare it with FormattedWalletBalance[]
      //NOTE:  no number inside toFixed() synonymous is 0
    };
  });
  //lask of sortedBalances dependency

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      //ERROR TYPE: sortedBalances does not have a formatted field, so declaring the FormattedWalletBalance is no need in here
      const usdValue = prices[balance.currency] * balance.amount;

      return (
        <WalletRow
          className={classes.row}
          key={index}
          //The key as the index ​​can easily cause errors when changing the list  for adding/deleting/sorting
          amount={balance.amount}
          //sortedBalances chỉ là WalletBalance không có field formatted, mà rows lại map từ sortedBalances. so `balance.formatted` can be undefined
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
