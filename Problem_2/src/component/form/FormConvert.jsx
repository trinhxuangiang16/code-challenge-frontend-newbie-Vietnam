import Button from "../button/Button";
import SelectCurrency from "./SelectCurrency";
import { icon } from "../../assets/svg";
import "./style.css";
import Input from "./Input";
import { useRef } from "react";

export default function FormConvert() {
  const amountRef = useRef();
  const toCurrencyRef = useRef();

  const amountCountryRef = useRef();
  const toCurrencyCountryRef = useRef();
  let handlerConvertCurrency = () => {
    console.log(amountRef.current.value);
    console.log(toCurrencyRef.current.value);
    console.log(toCurrencyCountryRef.current.value);
    console.log(amountCountryRef.current.value);
  };

  return (
    <div className="form-convert">
      <div className="container">
        <form className="form-wrap" onsubmit="return !1">
          <div className="form-title">
            <h2>Real-time exchange rates at your fingertips.</h2>
            <p>Currency exchange rate: 1 USD = 24.500 VND</p>
          </div>
          <div className="form-content">
            <Input Ref={amountRef} typeInput="input-amount" label="Amount">
              <SelectCurrency Ref={amountCountryRef} />
            </Input>
            <Button size="Sm">{icon.arrow}</Button>
            <Input
              Ref={toCurrencyRef}
              typeInput="output-amount"
              label="To currency"
            >
              <SelectCurrency Ref={toCurrencyCountryRef} />
            </Input>
            <br />
            <Button handlerConvert={handlerConvertCurrency} size="Lg">
              CONFIRM SWAP
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
