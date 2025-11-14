export default function SelectCurrency({ Ref }) {
  return (
    <select ref={Ref} id="currency-select" name="amount-country">
      <option value="Select">Select</option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="VND">VND</option>
    </select>
  );
}
