interface WalletRowProps {
  style?: string;
  amount: number;
  usdValue: number;
  formattedAmount: string;
}

//create a WallRow for test
const WalletRow = ({
  style,
  amount,
  usdValue,
  formattedAmount,
}: WalletRowProps) => {
  return (
    <>
      <div style={{ fontSize: style }}>
        <div>Amount: {formattedAmount}</div>
        <div>USD Value: {usdValue.toFixed(2)}</div>
      </div>
      <br />
    </>
  );
};

export default WalletRow;
