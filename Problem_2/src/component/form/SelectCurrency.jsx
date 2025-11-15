import { useSelector } from "react-redux";

export default function SelectCurrency({ handleSelect, selected, iso }) {
  const dataMoney = useSelector((state) => state.currencyStore.currency);

  const isSelected = selected !== "";
  return (
    <>
      <select
        onChange={handleSelect}
        value={selected || ""}
        id="currency-select"
        name="amount-country"
        className={`${isSelected ? "select-country" : "select-widden"}`}
      >
        <option value="">Select</option>
        {dataMoney?.map((item) => {
          return (
            <option key={item.id} value={item.currency_code}>
              {item.currency_code}
            </option>
          );
        })}
      </select>
      {isSelected && <i id="flag-display" className={`fi fi-${iso}`} />}
    </>
  );
}
