import { useSelector } from "react-redux";

export default function SelectCurrency({ handleSelect, selected }) {
  const dataMoney = useSelector((state) => state.currencyStore.currency);

  return (
    <select
      onChange={handleSelect}
      value={selected || ""}
      id="currency-select"
      name="amount-country"
    >
      <option value="Select">Select</option>
      {dataMoney?.map((item) => {
        return (
          <option key={item.id} value={item.currency_code}>
            {item.currency_code}
          </option>
        );
      })}
    </select>
  );
}
